zk.load('zul.mesh,zul.menu',function(){zk._p=zkpi('zul.grid',true);try{

zul.grid.Column = zk.$extends(zul.mesh.SortWidget, {
	
	getGrid: zul.mesh.HeaderWidget.prototype.getMeshWidget,

	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onGroup: this}, -1000);
	},
	
	getMeshBody: function () {
		var grid = this.getGrid();
		return grid ? grid.rows : null;  
	},
	checkClientSort_: function (ascending) {
		var body;
		return !(!(body = this.getMeshBody()) || body.hasGroup()) &&
			this.$supers('checkClientSort_', arguments);
	},
	
	group: function (ascending, evt) {
		var dir = this.getSortDirection();
		if (ascending) {
			if ("ascending" == dir) return false;
		} else {
			if ("descending" == dir) return false;
		}

		var sorter = ascending ? this._sortAscending: this._sortDescending;
		if (sorter == "fromServer")
			return false;
		else if (sorter == "none") {
			evt.stop();
			return false;
		}
		
		var mesh = this.getMeshWidget();
		if (!mesh || mesh.isModel() || !zk.feature.pe || !zk.isLoaded('zkex.grid')) return false;
			
			
		var	body = this.getMeshBody();
		if (!body) return false;
		evt.stop();
		
		var desktop = body.desktop,
			node = body.$n();
		try {
			body.unbind();
			if (body.hasGroup()) {
				for (var gs = body.getGroups(), len = gs.length; --len >= 0;) 
					body.removeChild(gs[len]);
			}
			
			var d = [], col = this.getChildIndex();
			for (var i = 0, z = 0, it = mesh.getBodyWidgetIterator(), w; (w = it.next()); z++) 
				for (var k = 0, cell = w.firstChild; cell; cell = cell.nextSibling, k++) 
					if (k == col) {
						d[i++] = {
							wgt: cell,
							index: z
						};
					}
			
			var dsc = dir == "ascending" ? -1 : 1, fn = this.sorting, isNumber = sorter == "client(number)";
			d.sort(function(a, b) {
				var v = fn(a.wgt, b.wgt, isNumber) * dsc;
				if (v == 0) {
					v = (a.index < b.index ? -1 : 1);
				}
				return v;
			});
			
			
			for (;body.firstChild;)
				body.removeChild(body.firstChild);
			
			for (var previous, row, index = this.getChildIndex(), i = 0, k = d.length; i < k; i++) {
				row = d[i];
				if (!previous || fn(previous.wgt, row.wgt, isNumber) != 0) {
					
					var group, cell = row.wgt.parent.getChildAt(index);
					if (cell && cell.$instanceof(zul.wgt.Label)) {
						group = new zkex.grid.Group();
						group.appendChild(new zul.wgt.Label({
							value: cell.getValue()
						}));
					} else {
						var cc = cell.firstChild;
						if (cc && cc.$instanceof(zul.wgt.Label)) {
							group = new zkex.grid.Group();
							group.appendChild(new zul.wgt.Label({
								value: cc.getValue()
							}));
						} else {
							group = new zkex.grid.Group();
							group.appendChild(new zul.wgt.Label({
								value: msgzul.GRID_OTHER
							}));
						}
					}
					body.appendChild(group);
				}
				body.appendChild(row.wgt.parent);
				previous = row;
			}
			this._fixDirection(ascending);
		} finally {
			body.replaceHTML(node, desktop);
		}
		return true;
	},
	setLabel: function (label) {
		this.$supers('setLabel', arguments);
		if (this.parent)
			this.parent._syncColMenu();
	},
	setVisible: function (visible) {
		if (this.isVisible() != visible) {
			this.$supers('setVisible', arguments);
			if (this.parent)
				this.parent._syncColMenu();
		}
	},
	
	onGroup: function (evt) {
		var dir = this.getSortDirection();
		if ("ascending" == dir) this.group(false, evt);
		else if ("descending" == dir) this.group(true, evt);
		else if (!this.group(true, evt)) this.group(false, evt);
	},
	getZclass: function () {
		return this._zclass == null ? "z-column" : this._zclass;
	},
	bind_: function () {
		this.$supers(zul.grid.Column, 'bind_', arguments);
		var n = this.$n();
		this.domListen_(n, "onMouseOver")
			.domListen_(n, "onMouseOut");
		var btn = this.$n('btn');
		if (btn)
			this.domListen_(btn, "onClick");
	},
	unbind_: function () {
		var n = this.$n();
		this.domUnlisten_(n, "onMouseOver")
			.domUnlisten_(n, "onMouseOut");
		var btn = this.$n('btn');
		if (btn)
			this.domUnlisten_(btn, "onClick");
		this.$supers(zul.grid.Column, 'unbind_', arguments);
	},
	_doMouseOver: function(evt) {
		if (this.isSortable_() || (this.parent._menupopup && this.parent._menupopup != 'none')) {
			jq(this.$n()).addClass(this.getZclass() + "-over");
			zul.grid.Renderer.updateColumnMenuButton(this);
		}
	},
	_doMouseOut: function (evt) {
		if (this.isSortable_() || (this.parent._menupopup && this.parent._menupopup != 'none')) {
			var n = this.$n(), $n = jq(n),
				zcls = this.getZclass();
			if (!$n.hasClass(zcls + "-visi") &&
				(!zk.ie || !jq.isAncestor(n, evt.domEvent.relatedTarget || evt.domEvent.toElement)))
					$n.removeClass(zcls + "-over");
		}
	},
	_doClick: function (evt) {
		if (this.parent._menupopup && this.parent._menupopup != 'none') {
			var pp = this.parent._menupopup,
				n = this.$n(),
				btn = this.$n('btn'),
				zcls = this.getZclass();
				
			jq(n).addClass(zcls + "-visi");
			
			if (pp == 'auto' && this.parent._mpop)
				pp = this.parent._mpop;
			else
				pp = this.$f(this.parent._menupopup);

			if (zul.menu.Menupopup.isInstance(pp)) {
				var ofs = zk(btn).revisedOffset(),
					asc = this.getSortAscending() != 'none',
					desc = this.getSortDescending() != 'none';
				if (pp.$instanceof(zul.grid.ColumnMenupopup)) {
					pp.getAscitem().setVisible(asc);
					pp.getDescitem().setVisible(desc);
					if (pp.getGroupitem()) 
						pp.getGroupitem().setVisible((asc || desc));
					
					var sep = pp.getDescitem().nextSibling;
					if (sep) 
						sep.setVisible((asc || desc));
				} else {
					pp.listen({onOpen: [this.parent, this.parent._onMenuPopup]});
				}
				pp.open(btn, [ofs[0], ofs[1] + btn.offsetHeight - 4], null, {sendOnOpen: true});
			}
			evt.stop(); 
		}
	}
});

zkreg('zul.grid.Column',true);zk._m={};
zk._m['default']=

zul.mesh.HeaderWidget.redraw
;zkmld(zk._p.p.Column,zk._m);


zul.grid.Columns = zk.$extends(zul.mesh.HeadWidget, {
	_menupopup: "none",
	_columnshide: true,
	_columnsgroup: true,

	$define: {
		
		
		columnshide: _zkf = function () {
			if (this.desktop)
				this._initColMenu();
		},
		
		
		columnsgroup: _zkf,
		
		
		menupopup: function () {
			if (this._menupopup != 'auto')
				this._mpop = null;
			this.rerender();		
		}
	},
	
	getGrid: function () {
		return this.parent;
	},
	rerender: function () {
		if (this.desktop) {
			if (this.parent)
				this.parent.rerender();
			else 
				this.$supers('rerender', arguments);
		}
		return this;
	},
	
	setPopup: function (mpop) {
		if (zk.Widget.isInstance(mpop)) {
			this._menupopup = mpop;
			this._mpop = null;
		}
		return this;
	},
	getZclass: function () {
		return this._zclass == null ? "z-columns" : this._zclass;
	},
	bind_: function (dt, skipper, after) {
		this.$supers(zul.grid.Columns, 'bind_', arguments);
		zWatch.listen({onResponse: this});
		var w = this;
		if (this._menupopup == 'auto') {
			after.push(function() {
				w._initColMenu();
			});
		}
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		if (this._mpop) {
			this._mpop.parent.removeChild(this._mpop);
			this._shallSync = this._mpop = null;			
		}
		this.$supers(zul.grid.Columns, 'unbind_', arguments);
	},
	onResponse: function () {
		if (this._shallSync)
			this.syncColMenu();
	},
	_syncColMenu: function () {
		this._shallSync = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		this._syncColMenu();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (!this.childReplacing_)
			this._syncColMenu();
	},
	_initColMenu: function () {
		if (this._mpop)
			this._mpop.parent.removeChild(this._mpop);
		this._mpop = new zul.grid.ColumnMenupopup({columns: this});
	},
	
	syncColMenu: function () {
		this._shallSync = false;
		if (this._mpop)
			this._mpop.syncColMenu();
		return this;
	},
	_onColVisi: function (evt) {
		var item = evt.currentTarget,
			pp = item.parent;
			
		pp.close({sendOnOpen: true});
		var checked = 0;
		for (var w = pp.firstChild; w; w = w.nextSibling) {
			if (w.$instanceof(zul.menu.Menuitem) && w.isChecked())
				checked++;
		}
		if (checked == 0)
			item.setChecked(true);
			
		var col = zk.Widget.$(item._col);
		if (col && col.parent == this)
			col.setVisible(item.isChecked());
	},
	_onGroup: function (evt) {
		this._mref.fire('onGroup');
	},
	_onAsc: function (evt) {
		if (this._mref.getSortDirection() != 'ascending')
			this._mref.fire('onSort');
	},
	_onDesc: function (evt) {
		if (this._mref.getSortDirection() != 'descending')
			this._mref.fire('onSort');
	},
	_onMenuPopup: function (evt) {
		if (this._mref) {
			var zcls = this._mref.getZclass(),
				n = this._mref.$n();
			jq(n).removeClass(zcls + '-visi').removeClass(zcls + '-over');
		}
		this._mref = evt.data.reference; 
	}
});

zul.grid.ColumnMenupopup = zk.$extends(zul.menu.Menupopup, {
	$define: {
		columns: null
	},
	
	$init: function () {
		this.$supers('$init', arguments);
		this.afterInit(this._init);
	},
	
	getAscitem: function () {
		return this._asc;
	},
	
	getDescitem: function () {
		return this._desc;
	},
	
	getGroupitem: function () {
		return this._group;
	},
	_init: function () {
		var w = this._columns,
			zcls = w.getZclass();

		this.listen({onOpen: [w, w._onMenuPopup]});
		
		if (zk.feature.pe && w.isColumnsgroup()) {
			if (!zk.isLoaded('zkex.grid'))
				zk.load('zkex.grid');
			var group = new zul.menu.Menuitem({label: msgzul.GRID_GROUP});
				group.setSclass(zcls + '-menu-grouping');
				group.listen({onClick: [w, w._onGroup]});
			this.appendChild(group);
			this._group = group;
		}
		var asc = new zul.menu.Menuitem({label: msgzul.GRID_ASC});
			asc.setSclass(zcls + '-menu-asc');
			asc.listen({onClick: [w, w._onAsc]});
		this._asc = asc;
		this.appendChild(asc);
		
		var desc = new zul.menu.Menuitem({label: msgzul.GRID_DESC});
		desc.setSclass(zcls + '-menu-dsc');
		desc.listen({onClick: [w, w._onDesc]});
		this._desc = desc;
		this.appendChild(desc);
		this.syncColMenu();
		w.getPage().appendChild(this);
	},
	
	syncColMenu: function () {
		var w = this._columns;
		for (var c = this.lastChild, p; c != this._desc;) {
			p = c.previousSibling;
			this.removeChild(c);
			c = p;
		}
		if (w && w.isColumnshide()) {
			var sep = new zul.menu.Menuseparator();
			this.appendChild(sep);
			for (var item, c = w.firstChild; c; c = c.nextSibling) {
				item = new zul.menu.Menuitem({
					label: c.getLabel(),
					autocheck: true,
					checkmark: true,
					checked: c.isVisible()
				});
				item._col = c.uuid;
				item.listen({onClick: [w, w._onColVisi]});
				this.appendChild(item);
			}
		}
	}
});
zkreg('zul.grid.Columns');zk._m={};
zk._m['default']=

zul.mesh.HeadWidget.redraw

;zkmld(zk._p.p.Columns,zk._m);





zul.grid.Renderer = {
	
	updateColumnMenuButton: function (col) {
		var btn;
		if (btn = col.$n('btn')) btn.style.height = col.$n().offsetHeight - 1 + "px";
	}
};


zul.grid.Grid = zk.$extends(zul.mesh.MeshWidget, {
	$define:{
		emptyMessage:function(msg){
			if(this.desktop) jq("td",this.$n("empty")).html(msg);
		}
	},
		
	getCell: function (row, col) {
		var rows;
		if (!(rows = this.rows)) return null;
		if (rows.nChildren <= row) return null;

		var row = rows.getChildAt(row);
		return row.nChildren <= col ? null: row.getChildAt(col);
	},
	
	getOddRowSclass: function () {
		return this._scOddRow == null ? this.getZclass() + "-odd" : this._scOddRow;
	},
	
	setOddRowSclass: function (scls) {
		if (!scls) scls = null;
		if (this._scOddRow != scls) {
			this._scOddRow = scls;
			var n = this.$n();
			if (n && this.rows)
				this.rows.stripe();
		}
		return this;
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		if (this.rows)
			this.rows._syncStripe();
		return this;
	},
	
	getFocusCell: function (el) {
		var tbody = this.rows.$n();
		if (jq.isAncestor(tbody, el)) {
			var tds = jq(el).parents('td'), td;
			for (var i = 0, j = tds.length; i < j; i++) {
				td = tds[i];
				if (td.parentNode.parentNode == tbody) {
					return td;
				}
			}
		}
	},
	getZclass: function () {
		return this._zclass == null ? "z-grid" : this._zclass;
	},
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling, !this.z_rod)) {
			this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child, !this.z_rod)) {
			if (!this.insertingBefore_)
				this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom, _noSync) {
		var isRows;
		if (child.$instanceof(zul.grid.Rows)) {
			this.rows = child;
			isRows = true;
		} else if (child.$instanceof(zul.grid.Columns)) 
			this.columns = child;
		else if (child.$instanceof(zul.grid.Foot)) 
			this.foot = child;
		else if (child.$instanceof(zul.mesh.Paging)) 
			this.paging = child;
		else if (child.$instanceof(zul.mesh.Frozen)) 
			this.frozen = child;

		if (!ignoreDom)
			this.rerender();
		if (!isRows && !_noSync)
			this._syncSize();  
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);

		var isRows;
		if (child == this.rows) {
			this.rows = null;
			isRows = true;
		} else if (child == this.columns) 
			this.columns = null;
		else if (child == this.foot) 
			this.foot = null;
		else if (child == this.paging) 
			this.paging = null;
		else if (child == this.frozen) 
			this.frozen = null;

		if (!isRows && !this.childReplacing_) 
			this._syncSize();
	},
	
	_isEmpty: function () {
		return this.rows ? this.rows.nChildren : false; 
	},
	
	redrawEmpty_: function (out) {
		var cols = this.columns ? this.columns.nChildren : 1,
			uuid = this.uuid, zcls = this.getZclass();
		out.push('<tbody id="',uuid,'-empty" class="',zcls,'-empty-body" ', 
		( !this._emptyMessage || this._isEmpty()  ? ' style="display:none"' : '' ),
			'><tr><td colspan="', cols ,'">' , this._emptyMessage ,'</td></tr></tbody>');
	},
	
	fixForEmpty_: function () {
		if (this.desktop) {
			if(this._isEmpty())
				jq(this.$n("empty")).hide();
			else
				jq(this.$n("empty")).show();
		}
	},	
	onChildAdded_: function(child) {
		this.$supers('onChildAdded_', arguments);
		if (this.childReplacing_) 
			this._fixOnAdd(child, true); 
		
	},
	insertChildHTML_: function (child, before, desktop) {
		if (child.$instanceof(zul.grid.Rows)) {
			this.rows = child;
			var fakerows = this.$n('rows');
			if (fakerows) {
				jq(fakerows).replaceWith(child.redrawHTML_());
				child.bind(desktop);
				this.ebodyrows = child.$n().rows;
				return;
			} else {
				var tpad = this.$n('tpad');
				if (tpad) {
					jq(tpad).after(child.redrawHTML_());
					child.bind(desktop);
					this.ebodyrows = child.$n().rows;
					return;
				} else if (this.ebodytbl) {
					jq(this.ebodytbl).append(child.redrawHTML_());
					child.bind(desktop);
					this.ebodyrows = child.$n().rows;
					return;
				}
			}
		}

		this.rerender();
	},
	
	getHeadWidgetClass: function () {
		return zul.grid.Columns;
	},
	
	getBodyWidgetIterator: function () {
		return new zul.grid.RowIter(this);
	}
});

zul.grid.RowIter = zk.$extends(zk.Object, {
	
	$init: function (grid) {
		this.grid = grid;
	},
	_init: function () {
		if (!this._isInit) {
			this._isInit = true;
			this.p = this.grid.rows ? this.grid.rows.firstChild: null;
		}
	},
	 
	hasNext: function () {
		this._init();
		return this.p;
	},
	
	next: function () {
		this._init();
		var p = this.p;
		if (p) this.p = p.nextSibling;
		return p;
	}
});
zkreg('zul.grid.Grid');zk._m={};
zk._m['paging']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		wdAttr = innerWidth == '100%' ? ' width="100%"' : '', 
		wdStyle = innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos;

	out.push('<div', this.domAttrs_(), '>');

	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}

	if (this.columns) {
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
			'<table', wdAttr, zUtl.cellps0,
			' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div><div class="', zcls, '-header-bg"></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');

	var hgh = this.getHeight();
	if (hgh) out.push(' style="height:', hgh, '"');
	
	out.push('><table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'"');		
	out.push('>');
	
	if (this.columns)
		this.domFaker_(out, '-bdfaker', zcls);

	if (this.rows) {
		if (this.domPad_ && !this.inPagingMold())
			this.domPad_(out, '-tpad');
		this.rows.redraw(out);
		if (this.domPad_ && !this.inPagingMold())
			this.domPad_(out, '-bpad');
	}
	
	this.redrawEmpty_(out);
	
	out.push('</table></div>');
	
	if (this.foot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
			'<table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.columns) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.foot.redraw(out);
		out.push('</table></div>');
	}
	
	if (this.frozen) {
		out.push('<div id="', uuid, '-frozen" class="', zcls, '-frozen">');
		this.frozen.redraw(out);
		out.push('</div>');
	}
	
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}

;zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		wdAttr = innerWidth == '100%' ? ' width="100%"' : '', 
		wdStyle = innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos;

	out.push('<div', this.domAttrs_(), '>');

	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}

	if (this.columns) {
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
			'<table', wdAttr, zUtl.cellps0,
			' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div><div class="', zcls, '-header-bg"></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');

	var hgh = this.getHeight();
	if (hgh) out.push(' style="height:', hgh, '"');
	
	out.push('><table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'"');		
	out.push('>');
	
	if (this.columns)
		this.domFaker_(out, '-bdfaker', zcls);

	if (this.rows) {
		if (this.domPad_ && !this.inPagingMold())
			this.domPad_(out, '-tpad');
		this.rows.redraw(out);
		if (this.domPad_ && !this.inPagingMold())
			this.domPad_(out, '-bpad');
	}
	
	this.redrawEmpty_(out);
	
	out.push('</table></div>');
	
	if (this.foot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
			'<table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.columns) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.foot.redraw(out);
		out.push('</table></div>');
	}
	
	if (this.frozen) {
		out.push('<div id="', uuid, '-frozen" class="', zcls, '-frozen">');
		this.frozen.redraw(out);
		out.push('</div>');
	}
	
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}

;zkmld(zk._p.p.Grid,zk._m);

(function () {
	function _isPE() {
		return zk.feature.pe && zk.isLoaded('zkex.grid');
	}

	function _toggleEffect(wgt, undo) {
		var self = wgt;
		setTimeout(function () {
			var $n = jq(self.$n()),
				zcls = self.getZclass() + '-over';
			if (undo) {
   				$n.removeClass(zcls);
			} else if (self._musin) {
				$n.addClass(zcls);
				
				var musout = self.parent._musout;
				
				if (musout && $n[0] != musout.$n()) {
					jq(musout.$n()).removeClass(zcls);
					musout._musin = false;
					self.parent._musout = null;
				}
			}
		});
	}

zul.grid.Row = zk.$extends(zul.Widget, {
	$define: {
		
		
		align: function (v) {
			var n = this.$n();
			if (n)
				n.align = v;
		},
		
		
		nowrap: function (v) {
			var cells = this.$n();
			if (cells && (cells = cells.cells))
				for (var j = cells.length; j--;)
					cells[j].noWrap = v;
		},
		
		
		valign: function (v) {
			var n = this.$n();
			if (n)
				n.vAlign = v;
		}
	},
	
	getGrid: function () {
		return this.parent ? this.parent.parent : null;
	},	
	setVisible: function (visible) {
		if (this.isVisible() != visible) {
			this.$supers('setVisible', arguments);
			if (visible && this.isStripeable_() && this.parent)
				this.parent.stripe();
		}
	},
	
	getSpans: function () {
		return zUtl.intsToString(this._spans);
	},
	
	setSpans: function (spans) {
		if (this.getSpans() != spans) {
			this._spans = zUtl.stringToInts(spans, 1);
			this.rerender();
		}
	},
	_getIndex: function () {
		return this.parent ? this.getChildIndex() : -1;
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass : "z-row";
	},
	
	getGroup: function () {
		
		if (_isPE() && this.parent && this.parent.hasGroup())
			for (var w = this; w; w = w.previousSibling)
				if (w.$instanceof(zkex.grid.Group)) return w;
				
		return null;
	},	
	setStyle: function (style) {
		if (this._style != style) {
			if (!zk._rowTime) zk._rowTime = jq.now();
			this._style = style;
			this.rerender();
		}
	},
	rerender: function () {
		if (this.desktop) {
			this.$supers('rerender', arguments);
			if (this.parent)
				this.parent._syncStripe();
		}
	},
	getSclass: function () {
		var sclass = this.$supers('getSclass', arguments);
		if (sclass != null) return sclass;

		var grid = this.getGrid();
		return grid ? grid.getSclass(): sclass;
	},
	_getChdextr: function (child) {
		return child.$n('chdextr') || child.$n();
	},
	insertChildHTML_: function (child, before, desktop) {
		var cls = !this.getGrid().isSizedByContent() ? 'z-overflow-hidden' : '';
		if (before)
			jq(this._getChdextr(before)).before(
				this.encloseChildHTML_({child: child, index: child.getChildIndex(),
						zclass: this.getZclass(), cls: cls}));
		else
			jq(this).append(
				this.encloseChildHTML_({child: child, index: child.getChildIndex(),
						zclass: this.getZclass(), cls: cls}));
		
		child.bind(desktop);
	},
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		jq(child.uuid + '-chdextr', zk).remove();
	},
	
	encloseChildHTML_: function (opts) {
		var out = opts.out || [],
			child = opts.child,
			isCell = child.$instanceof(zul.wgt.Cell);
		if (!isCell) {
			out.push('<td id="', child.uuid, '-chdextr"', this._childAttrs(child, opts.index),
				'>', '<div id="', child.uuid, '-cell" class="', opts.zclass, '-cnt ',
				opts.cls, '">');
		}
		child.redraw(out);
		if (!isCell) out.push('</div></td>');
		if (!opts.out) return out.join('');
	},
	_childAttrs: function (child, index) {
		var realIndex = index, span = 1;
		if (this._spans) {
			for (var j = 0, k = this._spans.length; j < k; ++j) {
				if (j == index) {
					span = this._spans[j];
					break;
				}
				realIndex += this._spans[j] - 1;
			}
		}

		var colattrs, visible, hgh,
			grid = this.getGrid();
		
		if (grid) {
			var cols = grid.columns;
			if (cols) {
				if (realIndex < cols.nChildren) {
					var col = cols.getChildAt(realIndex);
					colattrs = col.getColAttrs();
					visible = col.isVisible() ? '' : 'display:none';
					hgh = col.getHeight();
				}
			}
		}

		var style = this.domStyle_({visible:1, width:1, height:1}),
			isDetail = zk.isLoaded('zkex.grid') && child.$instanceof(zkex.grid.Detail);
		if (isDetail) {
			var wd = child.getWidth();
			if (wd) 
				style += "width:" + wd + ";";
		}

		if (visible || hgh) {
			style += visible;
			if (hgh)
				style += 'height:' + hgh + ';';
		}
		
		var clx = isDetail ? child.getZclass() + "-outer" : this.getZclass() + "-inner",
			attrs = colattrs || '';
		
		if (span !== 1)
			attrs += ' colspan="' + span + '"';
		if (this._nowrap)
			attrs += ' nowrap="nowrap"';
		if (style)
			attrs += ' style="' + style + '"'
		return attrs + ' class="' + clx + '"';
	},
	
	isStripeable_: function () {
		return true;
	},
	
	domStyle_: function (no) {
		if ((_isPE() && (this.$instanceof(zkex.grid.Group) || this.$instanceof(zkex.grid.Groupfoot)))
				|| (no && no.visible))
			return this.$supers('domStyle_', arguments);
			
		var style = this.$supers('domStyle_', arguments),
			group = this.getGroup();
		return group && !group.isOpen() ? style + "display:none;" : style;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.grid.Detail))
			this.detail = child;
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.detail)
			this.detail = null;
	},
	doFocus_: function (evt) {
		this.$supers('doFocus_', arguments);
		
		var grid, frozen, tbody, td, tds;
		if ((grid = this.getGrid()) && grid.efrozen && 
			(frozen = zk.Widget.$(grid.efrozen.firstChild)) &&
			grid.rows && (tbody = grid.rows.$n())) {
			tds = jq(evt.domTarget).parents('td')
			for (var i = 0, j = tds.length; i < j; i++) {
				td = tds[i];
				if (td.parentNode.parentNode == tbody) {
					grid._moveToHidingFocusCell(td.cellIndex);
					break;
				}
			}
		}
	},
	doMouseOver_: function(evt) {
		if (this._musin) return;
		this._musin = true;
		var n = this.$n();
		if (n && zk.gecko && this._draggable
		&& !jq.nodeName(evt.domTarget, "input", "textarea"))
			n.firstChild.style.MozUserSelect = "none";
		
		
		_toggleEffect(this);
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function(evt) {
		var n = this.$n();
		if ((this._musin && jq.isAncestor(n,
				evt.domEvent.relatedTarget || evt.domEvent.toElement))) {
			
			this.parent._musout = this;
			return;
		}
		this._musin = false;
		if (n && zk.gecko && this._draggable)
			n.firstChild.style.MozUserSelect = "none";
		
		
		_toggleEffect(this, true);
		this.$supers('doMouseOut_', arguments);
	},
	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments);
		if (this._align)
			attr += ' align="' + this._align + '"';
		if (this._valign)
			attr += ' valign="' + this._valign + '"';
		return attr;
	},
	domClass_: function () {
		var cls = this.$supers('domClass_', arguments),
			grid = this.getGrid();
		if (grid && jq(this.$n()).hasClass(grid = grid.getOddRowSclass()))
			return cls + ' ' + grid; 
		return cls;
	},
	deferRedrawHTML_: function (out) {
		out.push('<tr', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tr>');
	}
});
})();
zkreg('zul.grid.Row');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	var	zcls = this.getZclass(),
		overflow = !this.getGrid().isSizedByContent() ? 'z-overflow-hidden' : '' ;
	for (var j = 0, w = this.firstChild; w; w = w.nextSibling, j++)
		this.encloseChildHTML_({child:w, index: j, zclass: zcls, cls: overflow, out: out});
	out.push('</tr>');	
}

;zkmld(zk._p.p.Row,zk._m);

(function () {

	function _isPE() {
		return zk.feature.pe && zk.isLoaded('zkex.grid');
	}
	function _syncFrozen(wgt) {
		if ((wgt = wgt.getGrid()) && (wgt = wgt.frozen))
			wgt._syncFrozen();
	}

var Rows =

zul.grid.Rows = zk.$extends(zul.Widget, {
	_visibleItemCount: 0,
	$init: function () {
		this.$supers('$init', arguments);
		this._groupsInfo = [];
	},
	$define: {
		
		visibleItemCount: null
	},
	
	getGrid: function () {
		return this.parent;
	},
	
	getGroupCount: function () {
		return this._groupsInfo.length;
	},
	
	getGroups: function () {
		return this._groupsInfo.$clone();
	},
	
	hasGroup: function () {
		return this._groupsInfo.length;
	},
	getZclass: function () {
		return this._zclass == null ? "z-rows" : this._zclass;
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(Rows, 'bind_', arguments);
		zWatch.listen({onResponse: this});
		var w = this;
		after.push(zk.booted ? function(){setTimeout( function(){w.onResponse();},0)}: this.proxy(this.stripe));

		
		after.push(function () {
			_syncFrozen(w);
		});
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		this.$supers(Rows, 'unbind_', arguments);
	},
	onResponse: function () {
		if (this.desktop){
			if (this._shallStripe) { 
				this.stripe();
				this.getGrid().onSize();
			}
			if(this._shallFixEmpty)
				this.getGrid().fixForEmpty_();			
		}
	},
	_syncStripe: function () {
		this._shallStripe = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	_syncEmptyState: function () {
		this._shallFixEmpty = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	
	stripe: function () {
		var grid = this.getGrid(),
			scOdd = grid.getOddRowSclass();
		if (!scOdd) return;
		var n = this.$n();
		if (!n) return; 

		for (var j = 0, w = this.firstChild, even = !(this._offset & 1); w; w = w.nextSibling, ++j) {
			if (w.isVisible() && w.isStripeable_()) {
				
				for (;n.rows[j] && n.rows[j].id != w.uuid;++j);

				jq(n.rows[j])[even ? 'removeClass' : 'addClass'](scOdd);
				w.fire("onStripe");
				even = !even;
			}
		}
		this._shallStripe = false;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (_isPE() && child.$instanceof(zkex.grid.Group))
			this._groupsInfo.push(child);
		if(this.getGrid() && this.getGrid().fixForRowAdd_) 
			this.getGrid().fixForRowAdd_();
		this._syncStripe();
		this._syncEmptyState();
		if (this.desktop)
			_syncFrozen(this);
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (_isPE() && child.$instanceof(zkex.grid.Group))
			this._groupsInfo.$remove(child);
		if (!this.childReplacing_)
			this._syncStripe();
		this._syncEmptyState();
	},
	deferRedrawHTML_: function (out) {
		out.push('<tbody', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tbody>');
	}
});
})();
zkreg('zul.grid.Rows');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tbody', this.domAttrs_() , '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tbody>');	
}

;zkmld(zk._p.p.Rows,zk._m);


zul.grid.Foot = zk.$extends(zul.Widget, {
	
	getGrid: function () {
		return this.parent;
	},
	getZclass: function () {
		return this._zclass == null ? "z-foot" : _zclass;
	},
	
	setVflex: function (v) { 
		v = false;
		this.$super(zul.grid.Foot, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(zul.grid.Foot, 'setHflex', v);
	},
	deferRedrawHTML_: function (out) {
		out.push('<tr', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tr>');
	}
});
zkreg('zul.grid.Foot');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Foot,zk._m);


zul.grid.Footer = zk.$extends(zul.mesh.FooterWidget, {
	
	
	getGrid: function () {
		return this.getMeshWidget();
	},
	
	getColumn: function () {
		return this.getHeaderWidget();
	},
	getZclass: function () {
		return this._zclass == null ? "z-footer" : this._zclass;
	}
});
zkreg('zul.grid.Footer',true);zk._m={};
zk._m['default']=

function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass(), '-cnt">', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Footer,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.grid',1);