	zk.load('zul',function(){zk._p=zkpi('zul.mesh',true);try{



	(function () {
		var _shellFocusBack;
		
		function _setFakerWd(i, wd, hdfaker, bdfaker, ftfaker, headn) {
			bdfaker.cells[i].style.width = zk(bdfaker.cells[i]).revisedWidth(wd) + "px";
			hdfaker.cells[i].style.width = bdfaker.cells[i].style.width;
			if (ftfaker) ftfaker.cells[i].style.width = bdfaker.cells[i].style.width;
			if (headn) {
				var cpwd = zk(headn.cells[i]).revisedWidth(zk.parseInt(hdfaker.cells[i].style.width));
				headn.cells[i].style.width = cpwd + "px";
				var cell = headn.cells[i].firstChild;
				cell.style.width = zk(cell).revisedWidth(cpwd) + "px";
			}
		}
		function _calcMinWd(wgt) {
			var wgtn = wgt.$n(),
				ws = wgtn ? wgtn.style.whiteSpace : ""; 
			if (wgtn)
				wgtn.style.whiteSpace = 'pre';
			var eheadtblw,
				efoottblw,
				ebodytblw,
				eheadtblfix,
				efoottblfix,
				ebodytblfix,
				hdfaker = wgt.ehdfaker,
				bdfaker = wgt.ebdfaker,
				ftfaker = wgt.eftfaker,
				head = wgt.head,
				headn = head ? head.$n() : null,
				fakerflex = head ? head.$n('hdfakerflex') : null,
				hdfakerws = [],
				bdfakerws = [],
				ftfakerws = [],
				hdws = [],
				hdcavews = [];
				
			if (wgt.eheadtbl) {
				wgt.ehead.style.width = '';
				eheadtblw = wgt.eheadtbl.width;
				wgt.eheadtbl.width = '';
				wgt.eheadtbl.style.width = '';
				eheadtblfix = wgt.eheadtbl.style.tableLayout;
				wgt.eheadtbl.style.tableLayout = '';
				for (var i = hdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
					var hdfakercell = hdfaker.cells[i],
						headcell = headn.cells[i],
						headcave = headcell.firstChild;
					hdfakerws[i] = hdfakercell.style.width;
					hdfakercell.style.width = '';
					hdws[i] = headcell.style.width;
					headcell.style.width = '';
					hdcavews[i] = headcave.style.width;
					headcave.style.width = '';
				}
			}
			if (wgt.head && wgt.head.$n())
				wgt.head.$n().style.width = '';
			if (wgt.efoottbl) {
				wgt.efoot.style.width = '';
				efoottblw = wgt.efoottbl.width;
				wgt.efoottbl.width = '';
				wgt.efoottbl.style.width = '';
				efoottblfix = wgt.efoottbl.style.tableLayout;
				wgt.efoottbl.style.tableLayout = '';
				for (var i = ftfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
					var ftcell = ftfaker.cells[i];
					ftfakerws[i] = ftcell.style.width;
					ftcell.style.width = '';
				}
			}
			if (wgt.ebodytbl) {
				wgt.ebody.style.width = '';
				ebodytblw = wgt.ebodytbl.width;
				wgt.ebodytbl.width = '';
				wgt.ebodytbl.style.width = '';
				ebodytblfix = wgt.ebodytbl.style.tableLayout;
				wgt.ebodytbl.style.tableLayout = '';
				if (bdfaker)
					for (var i = bdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
						var bdcell = bdfaker.cells[i];
						bdfakerws[i] = bdcell.style.width;
						bdcell.style.width = '';
					}
			}

			
			var	wds = [],
				width = 0,
				w = head ? head = head.lastChild : null,
				headWgt = wgt.getHeadWidget(),
				max = 0, maxj;
			if (bdfaker) {
				for (var i = bdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
					var wd = bdwd = bdfaker.cells[i].offsetWidth,
						$cv = zk(w.$n('cave')),
						hdwd = w && w.isVisible() ? ($cv.textSize()[0] + $cv.padBorderWidth() + zk(w.$n()).padBorderWidth()) : 0,
						ftwd = ftfaker && zk(ftfaker.cells[i]).isVisible() ? ftfaker.cells[i].offsetWidth : 0,
						header;
					if ((header = headWgt.getChildAt(i)) && header.getWidth())
						hdwd = Math.max(hdwd, hdfaker.cells[i].offsetWidth);
					if (hdwd > wd) wd = hdwd;
					if (ftwd > wd) wd = ftwd;
					wds[i] = wd;
					if (zk.ie < 8 && max < wd) {
						max = wd;
						maxj = i;
					} else if (zk.ff == 4 || zk.ie == 9) {
						++wds[i];
					}
					width += wd;
					if (w) w = w.previousSibling;
				}
				if (zk.ie < 8) 
					--wds[maxj];
			}

			if (wgt.eheadtbl) {
				wgt.eheadtbl.width = eheadtblw||'';
				wgt.eheadtbl.style.tableLayout = eheadtblfix||'';
				for (var i = hdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
					hdfaker.cells[i].style.width = hdfakerws[i];
					var headcell = headn.cells[i],
						headcave = headcell.firstChild;
					headcell.style.width = hdws[i];
					headcave.style.width = hdcavews[i];
				}
			}
			if (wgt.efoottbl) {
				wgt.efoottbl.width = efoottblw||'';
				wgt.efoottbl.style.tableLayout = efoottblfix||'';
				for (var i = ftfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
					ftfaker.cells[i].style.width = ftfakerws[i];
				}
			}
			if (wgt.ebodytbl) {
				wgt.ebodytbl.width = ebodytblw||'';
				wgt.ebodytbl.style.tableLayout = ebodytblfix||'';
				if (bdfaker)
					for (var i = bdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
						bdfaker.cells[i].style.width = bdfakerws[i];
					}
			}

			if (wgtn)
				wgtn.style.whiteSpace = ws;
			return {width: width, wds: wds};
		}


	zul.mesh.MeshWidget = zk.$extends(zul.Widget, {
		_pagingPosition: "bottom",
		_prehgh: -1,
		_minWd: null, 
		$init: function () {
			this.$supers('$init', arguments);
			this.heads = [];
		},

		_innerWidth: "100%",
		_currentTop: 0,
		_currentLeft: 0,

		$define: {
			
			
			pagingPosition: _zkf = function () {
				this.rerender();
			},
			
			
			sizedByContent: _zkf,
			
			
			span: function(v) {
				var x = (true === v || 'true' == v) ? -65500 : (false === v || 'false' == v) ? 0 : (zk.parseInt(v) + 1);
				this._nspan = x < 0 && x != -65500 ? 0 : x;
				this.rerender();
			},
			
			
			autopaging: _zkf,
			
			
			model: null,
			
			
			innerWidth: function (v) {
				if (v == null) this._innerWidth = v = "100%";
				if (this.eheadtbl) this.eheadtbl.style.width = v;
				if (this.ebodytbl) this.ebodytbl.style.width = v;
				if (this.efoottbl) this.efoottbl.style.width = v;
			}
		},
		
		getPageSize: function () {
			return this.paging.getPageSize();
		},
		
		setPageSize: function (pgsz) {
			this.paging.setPageSize(pgsz);
		},
		
		getPageCount: function () {
			return this.paging.getPageCount();
		},
		
		getActivePage: function () {
			return this.paging.getActivePage();
		},
		
		setActivePage: function (pg) {
			this.paging.setActivePage(pg);
		},
		
		inPagingMold: function () {
			return "paging" == this.getMold();
		},

		setHeight: function (height) {
			this.$supers('setHeight', arguments);
			if (this.desktop) {
				if (zk.ie6_ && this.ebody)
					this.ebody.style.height = height;
				
				this._setHgh(height);
				this.onSize();
			}
		},
		setWidth: function (width) {
			this.$supers('setWidth', arguments);
			if (this.eheadtbl) this.eheadtbl.style.width = "";
			if (this.efoottbl) this.efoottbl.style.width = "";
			if (this.desktop)
				this.onSize();
		},
		setStyle: function (style) {
			if (this._style != style) {
				this.$supers('setStyle', arguments);
				if (this.desktop)
					this.onSize();
			}
		},

		
		getHeadWidget: function () {
			return this.head;
		},
		
		getFocusCell: function (el) {
		},
		_moveToHidingFocusCell: function (index) {
			
			var td, frozen;
			if (this.head && (td = this.head.getChildAt(index).$n()) && parseInt(td.style.width) == 0 && 
				(frozen = zk.Widget.$(this.efrozen.firstChild)) &&
				(index = index - frozen.getColumns()) >= 0) {
				frozen.setStart(index);
				_shellFocusBack = true;
			}
		},
		_restoreFocus: function () {
			if (_shellFocusBack && zk.currentFocus) {
				_shellFocusBack = false;
				zk.currentFocus.focus();
			}
		},

		bind_: function () {
			this.$supers(zul.mesh.MeshWidget, 'bind_', arguments);
			if (this.isVflex()) {
				
				
				var hgh = this.$n().style.height;
				if (!hgh || hgh == "auto") this.$n().style.height = "99%"; 
			}
			this._bindDomNode();
			this._fixHeaders();
			if (this.ebody) {
				this.domListen_(this.ebody, 'onScroll');
				this.ebody.style.overflow = ''; 
				if (this.efrozen)
					jq(this.ebody).addClass('z-word-nowrap').css('overflow-x', 'hidden');
			}
			zWatch.listen({onSize: this, onShow: this, beforeSize: this, onResponse: this});
			var paging;
			if (zk.ie7_ && (paging = this.$n('pgib')))
				zk(paging).redoCSS();
		},
		unbind_: function () {
			if (this.ebody)
				this.domUnlisten_(this.ebody, 'onScroll');

			zWatch.unlisten({onSize: this, onShow: this, beforeSize: this, onResponse: this});
			
			this.$supers(zul.mesh.MeshWidget, 'unbind_', arguments);
		},
		clearCache: function () {
			this.$supers('clearCache', arguments);
			this.ebody = this.ehead = this.efoot = this.efrozen = this.ebodytbl
				= this.eheadtbl = this.efoottbl = this.ebodyrows
				= this.ehdfaker = this.ebdfaker = null;
		},

		onResponse: function () {
			if (this.desktop && this._shallSize) {
				this.$n()._lastsz = null; 
				this.onSize();
			}
		},
		_syncSize: function () {
			this._shallSize = true;
			if (!this.inServer && this.desktop)
				this.onResponse();
		},
		_fixHeaders: function () {
			if (this.head && this.ehead) {
				var empty = true;
				var flex = false;
				for (var i = this.heads.length; i-- > 0;) {
					for (var w = this.heads[i].firstChild; w; w = w.nextSibling) {
						if (!flex && w._nhflex)
							flex = true;
						if (w.getLabel() || w.getImage()
								|| w.nChildren) {
							empty = false;
							break;
						}
					}
					if (!empty) break;
				}
				var old = this.ehead.style.display; 
				this.ehead.style.display = empty ? 'none' : '';
				
				if (empty && flex && this.isRealVisible()) 
					for (var w = this.head.firstChild; w; w = w.nextSibling)
						if (w._nhflex) w.fixFlex_();
				return old != this.ehead.style.display;
			}
		},
		_adjFlexWd: function () { 
			var head = this.head;
			if (!head) return;
			var hdfaker = this.ehdfaker,
				bdfaker = this.ebdfaker,
				ftfaker = this.eftfaker,
				headn = head.$n(),
				i = 0;
			for (var w = head.firstChild, wd; w; w = w.nextSibling) {
				if ((wd = w._hflexWidth) !== undefined)
					_setFakerWd(i, wd, hdfaker, bdfaker, ftfaker, headn);
				++i;
			}
			this._adjMinWd();
		},
		_adjMinWd: function () {
			if (this._hflex == 'min') {
				this._hflexsz = this._getMinWd(); 
				this.$n().style.width = jq.px0(this._hflexsz);
			}
		},
		_getMinWd: function () {
			this._calcMinWds();
			var bdfaker = this.ebdfaker,
				hdtable = this.eheadtbl,
				bdtable = this.ebodytbl,
				wd,
				wds = [],
				width,
				_minwds = this._minWd.wds;
			if (this.head && bdfaker) {
				width = 0;
				for (var w = this.head.firstChild, i = 0; w; w = w.nextSibling) {
					if (zk(bdfaker.cells[i]).isVisible()) {
						wd = wds[i] = w._hflex == 'min' ? _minwds[i] : (w._width && w._width.indexOf('px') > 0) ? zk.parseInt(w._width) : bdfaker.cells[i].offsetWidth;
						width += wd;
					}
					++i;
				}
			}
			return width + (zk.ie && !zk.ie8 ? 1 : 0);
		},
		_bindDomNode: function () {
			for (var n = this.$n().firstChild; n; n = n.nextSibling)
				switch(n.id) {
				case this.uuid + '-head':
					this.ehead = n;
					this.eheadtbl = jq(n).find('>table:first')[0];
					break;
				case this.uuid + '-body':
					this.ebody = n;
					this.ebodytbl = jq(n).find('>table:first')[0];
					break;
				case this.uuid + '-foot':
					this.efoot = n;
					this.efoottbl = jq(n).find('>table:first')[0];
					break;
				case this.uuid + '-frozen':
					this.efrozen = n;
					break;
				}

			if (this.ebody) {
				
				var bds = this.ebodytbl.tBodies,
					ie7special = zk.ie7_ && bds && bds.length == 1 && !this.ehead && !bds[0].id;
				if (!bds || !bds.length || (this.ehead && bds.length < 2 || ie7special)) {
					if (ie7special) 
						jq(bds[0]).remove();
					var out = [];
					if (this.domPad_ && !this.inPagingMold() && this._mold != 'select') this.domPad_(out, '-tpad');
					out.push('<tbody id="',this.uuid,'-rows"/>');
					if (this.domPad_ && !this.inPagingMold() && this._mold != 'select') this.domPad_(out, '-bpad');
					jq(this.ebodytbl ).append(out.join(''));
				}
				this._syncbodyrows();
			}
			if (this.ehead) {
				this.ehdfaker = this.eheadtbl.tBodies[0].rows[0];
				this.ebdfaker = this.ebodytbl.tBodies[0].rows[0];
				if (this.efoottbl)
					this.eftfaker = this.efoottbl.tBodies[0].rows[0];
			}
		},
		_syncbodyrows: function() {
			var bds = this.ebodytbl.tBodies;
			this.ebodyrows = this.ebodytbl.tBodies[bds.length > 3 ? this.ehead ? 2 : 1 : this.ehead ? 1 : 0].rows;
			
		},
		replaceHTML: function() { 
			var old = this._syncingbodyrows;
			this._syncingbodyrows = true;
			try {
				
				
				
				
				
				
				
				
				this.$supers(zul.mesh.MeshWidget, 'replaceHTML', arguments);
			} finally {
				this._syncingbodyrows = old;
			}
		},
		replaceChildHTML_: function() { 
			var old = this._syncingbodyrows;
			this._syncingbodyrows = true;
			try {
				this.$supers('replaceChildHTML_', arguments);
				this._syncbodyrows();
			} finally {
				this._syncingbodyrows = old;
			}
		},
		fireOnRender: function (timeout) {
			if (!this._pendOnRender) {
				this._pendOnRender = true;
				setTimeout(this.proxy(this._onRender), timeout ? timeout : 100);
			}
		},
		_doScroll: function () {
			
			
			
			if (zk.safari && this._ignoreDoScroll) 
				return;
			
			if (!(this.fire('onScroll', this.ebody.scrollLeft).stopped)) {
				if (this._currentLeft != this.ebody.scrollLeft) { 
					if (this.ehead) {
						this.ehead.scrollLeft = this.ebody.scrollLeft;
						
						var diff = this.ebody.scrollLeft - this.ehead.scrollLeft;
						var hdflex = jq(this.ehead).find('table>tbody>tr>th:last-child')[0];
						if (diff) { 
							hdflex.style.width = (hdflex.offsetWidth + diff) + 'px';
							this.ehead.scrollLeft = this.ebody.scrollLeft;
						} else if (parseInt(hdflex.style.width) != 0 && this.ebody.scrollLeft == 0) {
							hdflex.style.width = '';
						}
					}
					if (this.efoot) 
						this.efoot.scrollLeft = this.ebody.scrollLeft;
				}
			}
			
			var t = this.ebody.scrollTop,
				l = this.ebody.scrollLeft,
				scrolled = (t != this._currentTop || l != this._currentLeft);
			if (scrolled) {
				this._currentTop = t; 
				this._currentLeft = l;
			}
			
			if (!this.paging)
				this.fireOnRender(zk.gecko ? 200 : 60);

			if (scrolled)
				this._fireOnScrollPos();
		},
		_timeoutId: null,
		_fireOnScrollPos: function (time) {
			clearTimeout(this._timeoutId);
			this._timeoutId = setTimeout(this.proxy(this._onScrollPos), time >= 0 ? time : zk.gecko ? 200 : 60);
		},
		_onScrollPos: function () {
			this._currentTop = this.ebody.scrollTop; 
			this._currentLeft = this.ebody.scrollLeft;
			this.fire('onScrollPos', {top: this._currentTop, left: this._currentLeft});
		},
		_onRender: function () {
			this._pendOnRender = false;
			//if (this._syncingbodyrows || zAu.processing()) { 
			if (this._syncingbodyrows) { 
			this.fireOnRender(zk.gecko ? 200 : 60); 
			return true;
		}

		var rows = this.ebodyrows;
		if (this.inPagingMold() && this._autopaging && rows && rows.length)
			if (this._fixPageSize(rows)) return; 
		
		if (!this.desktop || !this._model || !rows || !rows.length) return;

		
		
		var items = [],
			min = this.ebody.scrollTop, max = min + this.ebody.offsetHeight;
		for (var j = 0, it = this.getBodyWidgetIterator(), len = rows.length, w; (w = it.next()) && j < len; j++) {
			if (w.isVisible() && !w._loaded) {
				var row = rows[j], $row = zk(row),
					top = $row.offsetTop();
				
				if (top + $row.offsetHeight() < min) continue;
				if (top > max) break; 
				items.push(w);
			}
		}
		if (items.length)
			this.fire('onRender', {items: items}, {implicit:true});
	},
	_fixPageSize: function(rows) {
		var ebody = this.ebody;
		if (!ebody) return; 
		var max = ebody.offsetHeight;
		if (max - ebody.clientHeight > 11)
			max -= jq.scrollbarWidth();
		if (max == this._prehgh) return false; 
		this._prehgh = max;
		var ebodytbl = this.ebodytbl,
			etbparent = ebodytbl.offsetParent,
			etbtop = ebodytbl.offsetTop,
			hgh = 0, 
			row,
			j = 0;
		for (var it = this.getBodyWidgetIterator(), len = rows.length, w; (w = it.next()) && j < len; j++) {
			if (w.isVisible()) {
				row = rows[j];
				var top = row.offsetTop - (row.offsetParent == etbparent ? etbtop : 0);
				if (top > max) {
					--j;
					break;
				}
				hgh = top;
			}
		}
		if (row) { 
			if (top <= max) { 
				hgh = hgh + row.offsetHeight;
				j = Math.floor(j * max / hgh);
			}
			
			if (j == 0) j = 1; 
			if (j != this.getPageSize()) {
				this.fire('onPageSize', {size: j});
				return true;
			}
		}
		return false;
	},
	
	
	

	
	beforeSize: function () {
		
		var wd = zk.ie6_ ? this.getWidth() : this.$n().style.width;
		if (!wd || wd == "auto" || wd.indexOf('%') >= 0) {
			var n = this.$n();
			
			if (!zk.ie6_ && n._lastsz && n._lastsz.height == n.offsetHeight && n._lastsz.width == n.offsetWidth)
				return; 
				
			if (this.ebody) 
				this.ebody.style.width = "";
			if (this.ehead) 
				this.ehead.style.width = "";
			if (this.efoot) 
				this.efoot.style.width = "";
				
			n._lastsz = null;
		}
		
		
		if (zk.ie6_ && this._vflex) {
			var hgh = this.getHeight();
			if (!hgh || hgh == "auto" || hgh.indexOf('%') >= 0) {
				var n = this.$n();
				
				n.style.height = '';
				if (this.ebody) {
					
					this.ebody.style.height = (this._vflex != 'min' && (!this.parent || this.parent._vflex != 'min')) ? '0px' : '';
				}
				n._lastsz = null;
			}
		}
		
	},
	onSize: _zkf = function () {
		if (this.isRealVisible()) { 
			var n = this.$n();
			if (n._lastsz && n._lastsz.height == n.offsetHeight && n._lastsz.width == n.offsetWidth) {
				this.fireOnRender(155); 
				return; 
			}
				
			this._calcSize();
			
			
			if (zk.safari && this.ebodytbl) {
				this._ignoreDoScroll = true; 
				try {
					var oldCSS = this.ebodytbl.style.display,
						bd = jq('body'),
						st = bd.scrollTop();
					zk(this.ebodytbl).redoCSS(-1); 
					
					
					bd.scrollTop(st);
					
					oldCss = this.ebody.style.height;
					this.ebody.style.height = jq.px0(this.ebodytbl.offsetHeight);
					dummy = this.ebody.offsetHeight; 
					this.ebody.style.height = oldCss;
					dummy = this.ebody.offsetHeight; 
				} finally {
					delete this._ignoreDoScroll;
				}
			}
			
			this.fireOnRender(155);
			this.ebody.scrollTop = this._currentTop;
			this.ebody.scrollLeft = this._currentLeft;
			if (this.ehead)
				this.ehead.scrollLeft = this._currentLeft;
			if (this.efoot) 
				this.efoot.scrollLeft = this._currentLeft;
			this._shallSize = false;
		}
	},
	onShow: _zkf,
	_vflexSize: function (hgh) {
		var n = this.$n();
		if (zk.ie6_) { 
			
			
			n.style.height = "";
			n.style.height = hgh;
		}
		
		var pgHgh = 0
		if (this.paging) {
			var pgit = this.$n('pgit'),
				pgib = this.$n('pgib');
			if (pgit) pgHgh += pgit.offsetHeight;
			if (pgib) pgHgh += pgib.offsetHeight;
		}
		return zk(n).revisedHeight(n.offsetHeight) - (this.ehead ? this.ehead.offsetHeight : 0)
			- (this.efoot ? this.efoot.offsetHeight : 0)
			- (this.efrozen ? this.efrozen.offsetHeight : 0)
			- pgHgh; 
	},
	setFlexSize_: function(sz) {
		var n = this.$n(),
			head = this.$n('head');
		if (sz.height !== undefined) {
			if (sz.height == 'auto') {
				n.style.height = '';
				if (head) head.style.height = '';
			} else {
				if (zk.ie && !zk.ie8 && this._vflex == 'min' && this._vflexsz === undefined)
					sz.height += 1;
				return this.$supers('setFlexSize_', arguments);
			}
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto') {
				if (this._hflex != 'min') n.style.width = '';
				if (head) head.style.width = '';
			} else {
				if (zk.ie && !zk.ie8 && this._hflex == 'min' && this._hflexsz === undefined)
					sz.width += 1;
				return this.$supers('setFlexSize_', arguments);
			}
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	},
	
	_setHgh: function (hgh) {
		if (this.isVflex() || (hgh && hgh != "auto" && hgh.indexOf('%') < 0)) {
			this.ebody.style.height = ''; 
			var h = this._vflexSize(hgh); 
			if (h < 0) h = 0;

			if (!zk.ie || zk.ie8 || this._vflex != "min")
				this.ebody.style.height = h + "px";
			
			if (zk.ie && this.ebody.offsetHeight) {} 
			
			
		} else {
			
			
			
			this.ebody.style.height = "";
			this.$n().style.height = hgh;
		}
	},
	_ignoreHghExt: function () {
		return false;
	},
	
	_calcSize: function () {
		this._beforeCalcSize();
		
		
		
		
		
		var n = this.$n(),
			wd = n.style.width;
		if (!wd || wd == "auto" || wd.indexOf('%') >= 0) {
			wd = zk(n).revisedWidth(n.offsetWidth);
			if (wd < 0) 
				wd = 0;
			if (wd) 
				wd += "px";
		}
		if (wd) {
			this.ebody.style.width = wd;
			if (this.ehead) 
				this.ehead.style.width = wd;
			if (this.efoot) 
				this.efoot.style.width = wd;
		}
		
		
		var tblwd = this._getEbodyWd();
		var hgh = this.getHeight() || n.style.height; 
		if (zk.ie) {
			if (this.eheadtbl &&
			this.eheadtbl.offsetWidth !=
			this.ebodytbl.offsetWidth) 
				this.ebodytbl.style.width = ""; 
			if (tblwd && 
					
					(!this.eheadtbl || !this.ebodytbl || !this.eheadtbl.style.width ||
					this.eheadtbl.style.width != this.ebodytbl.style.width
					|| this.ebody.offsetWidth == this.ebodytbl.offsetWidth) &&
					
					this.ebody.offsetWidth - tblwd > 11) { 
				if (--tblwd < 0) 
					tblwd = 0;
				this.ebodytbl.style.width = tblwd + "px";
			}
			
			if (!zk.ie8 && !this.isVflex() && (!hgh || hgh == "auto") && !this._ignoreHghExt()) {
				var scroll = this.ebody.offsetWidth - this.ebody.clientWidth;
				if (this.ebody.clientWidth && scroll > 11) 
					this.ebody.style.height = jq.px0(this.ebodytbl.offsetHeight); 
				
				tblwd = this.ebody.clientWidth;
			}
		}
		if (this.ehead) {
			if (tblwd) this.ehead.style.width = tblwd + 'px';
			if (this.isSizedByContent() && this.ebodyrows && this.ebodyrows.length)
				this._adjHeadWd();
			else if (tblwd && this.efoot) this.efoot.style.width = tblwd + 'px';
		} else if (this.efoot) {
			if (tblwd) this.efoot.style.width = tblwd + 'px';
			if (this.efoottbl.rows.length && this.ebodyrows && this.ebodyrows.length)
				this._cpCellWd();
		}
		
		
		this._adjSpanWd();

		
		if (this._hflexsz === undefined && this._hflex == 'min' && this._width === undefined && n.offsetWidth > this.ebodytbl.offsetWidth) {
			n.style.width = this.ebodytbl.offsetWidth + 'px';
			this._hflexsz = n.offsetWidth;
		}
		
		n._lastsz = {height: n.offsetHeight, width: n.offsetWidth}; 
		
		this._afterCalcSize();
	},
	_getEbodyWd: function () {
		return this.ebody.clientWidth;
	},
	_beforeCalcSize: function () {
		this._setHgh(this.$n().style.height);
	},
	_afterCalcSize: function () {
		
		if (zk.ie8 && this.isModel() && this.inPagingMold())
			zk(this).redoCSS();

		
		this._removeScrollbar();
	},
	_removeScrollbar: function() { 
		var hgh = this.getHeight() || this.$n().style.height || (this.getRows && this.getRows()); 
		if (zk.ie && !this.isVflex() && (!hgh || hgh == "auto")) {
			if(!zk.ie8) { 
				var scroll = this.ebody.offsetWidth - this.ebody.clientWidth;
				if (this.ebody.clientWidth && scroll > 11) { 
					this.ebody.style.height = jq.px0(this.ebodytbl.offsetHeight);
					if ((this.ebody.offsetWidth - this.ebody.clientWidth) > 11) 
						this.ebody.style.height = jq.px0(this.ebodytbl.offsetHeight+jq.scrollbarWidth());
				}
			} else if (!this.efrozen) {
				
				this.ebody.style.overflowX = 
					this.ebodytbl.offsetWidth > this.ebody.offsetWidth ?
					'scroll': '';
			}
		}
	},
	
	_isAllWidths: function() {
		if (this.isSizedByContent())
			return true;
		else if (!this.head)
			return false;
		var allwidths = true;
		for (var w = this.head.firstChild; w; w = w.nextSibling) {
			if (allwidths && (w._width === undefined || w._width.indexOf('px') <= 0) && (w._hflex != 'min' || w._hflexsz === undefined) && w.isVisible()) {
				allwidths = false;
				break;
			}
		}
		return allwidths;
	},	
	domFaker_: function (out, fakeId, zcls) { 
		var head = this.head;
		out.push('<tbody style="visibility:hidden;height:0px"><tr id="',
				head.uuid, fakeId, '" class="', zcls, '-faker">');
		var allwidths = true,
			
			totalWidth = 0, shallCheckSize = zk.ie && !zk.ie8;
		
		for (var w = head.firstChild; w; w = w.nextSibling) {
			out.push('<th id="', w.uuid, fakeId, '"', w.domAttrs_(),
				 	'><div style="overflow:hidden"></div></th>');
			if (allwidths && w._width === undefined && w._hflex === undefined && w.isVisible()) {
				allwidths = false;
				shallCheckSize = false;
			} else if (shallCheckSize) {
				var width = w._width;
				if (width && width.indexOf('px') != -1)
					totalWidth += zk.parseInt(width);
				else shallCheckSize = false;
			}
		}
		
		if (shallCheckSize) {
			var w = this._width;
			if (w && w.indexOf('px') != -1)
				allwidths = zk.parseInt(w) != totalWidth;
		}
		
		
		out.push('<th id="', head.uuid, fakeId, 'flex"', (allwidths || this.isSizedByContent() ? '' : ' style="width:0px"'), '></th></tr></tbody>');
	},

	
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);

		if (child.$instanceof(this.getHeadWidgetClass())) {
			this.head = child;
			this._minWd = null;
		} else if (!child.$instanceof(zul.mesh.Auxhead)) 
				return;

		var nsib = child.nextSibling;
		if (nsib)
			for (var hds = this.heads, j = 0, len = hds.length; j < len; ++j)
				if (hds[j] == nsib) {
					hds.splice(j, 0, child);
					return; 
				}
		this.heads.push(child);
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);

		if (child == this.head) {
			this._minWd = this.head = null;
			this.heads.$remove(child);
		} else if (child.$instanceof(zul.mesh.Auxhead))
			this.heads.$remove(child);
	},
	
	beforeMinFlex_: function (orient) {
		if (this._hflexsz === undefined && orient == 'w' && this._width === undefined) {
			if (this.isSizedByContent())
				this._calcSize();
			if (this.head)
				for(var w = this.head.firstChild; w; w = w.nextSibling) 
					if (w._hflex == 'min' && w.hflexsz === undefined) 
						return null;
			return this._getMinWd(); 
		}
		return null;
	},
	_calcMinWds: function () {
		if (!this._minWd)
			this._minWd = _calcMinWd(this); 
		return this._minWd;
	},
	_adjSpanWd: function () {
		if (!this._isAllWidths())
			return;
		var isSpan = this.isSpan();
		if (!isSpan)
			return;
		var hdfaker = this.ehdfaker,
			bdfaker = this.ebdfaker,
			ftfaker = this.eftfaker;
		if (!hdfaker || !bdfaker || !hdfaker.cells.length
		|| !bdfaker.cells.length)
			return;
		
		var head = this.head.$n();
		if (!head) return; 
		this._calcMinWds();
		var hdtable = this.eheadtbl,
			bdtable = this.ebodytbl,
			wd,
			wds = [],
			width = 0,
			fakerflex = this.head.$n('hdfakerflex'),
			hdfakervisible = zk(hdfaker).isRealVisible(true),
			_minwds = this._minWd.wds;
		for (var w = this.head.firstChild, i = 0; w; w = w.nextSibling) {
			if (zk(hdfaker.cells[i]).isVisible()) {
				wd = wds[i] = w._hflex == 'min' ? _minwds[i] : (w._width && w._width.indexOf('px') > 0) ? zk.parseInt(w._width) : hdfakervisible ? hdfaker.cells[i].offsetWidth : bdfaker.cells[i].offsetWidth;
				width += wd;
			}
			++i;
		}
		var hgh = zk.ie && !zk.ie8 ? (this.getHeight() || this.$n().style.height) : true; 
		var	total = (hgh ? bdtable.parentNode.clientWidth : bdtable.parentNode.offsetWidth) - (zk.ie && !zk.ie8 ? 1 : 0), 
			extSum = total - width; 
		
		var count = total,
			visj = -1;
		if (this._nspan < 0) { 
			for (var i = hdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
				if (!zk(hdfaker.cells[i]).isVisible()) continue;
				wds[i] = wd = extSum <= 0 ? wds[i] : (((wds[i] * total / width) + 0.5) | 0);
				var rwd = zk(bdfaker.cells[i]).revisedWidth(wd),
					stylew = jq.px0(rwd);
				count -= wd;
				visj = i;
				if (bdfaker.cells[i].style.width == stylew)
					continue;
				bdfaker.cells[i].style.width = stylew; 
				hdfaker.cells[i].style.width = stylew;
				if (ftfaker) ftfaker.cells[i].style.width = stylew;
				var cpwd = zk(head.cells[i]).revisedWidth(rwd);
				head.cells[i].style.width = jq.px0(cpwd);
				var cell = head.cells[i].firstChild;
				cell.style.width = zk(cell).revisedWidth(cpwd) + "px";
			}
			
			if (extSum > 0 && count != 0 && visj >= 0) {
				wd = wds[visj] + count;
				var rwd = zk(bdfaker.cells[visj]).revisedWidth(wd),
					stylew = jq.px0(rwd);
				bdfaker.cells[visj].style.width = stylew; 
				hdfaker.cells[visj].style.width = stylew;
				if (ftfaker) ftfaker.cells[visj].style.width = stylew;
				var cpwd = zk(head.cells[visj]).revisedWidth(rwd);
				head.cells[visj].style.width = jq.px0(cpwd);
				var cell = head.cells[visj].firstChild;
				cell.style.width = zk(cell).revisedWidth(cpwd) + "px";
			}
		} else { 
			visj = this._nspan - 1;
			for (var i = hdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
				if (!zk(hdfaker.cells[i]).isVisible()) continue;
				wd = visj == i && extSum > 0 ? (wds[visj] + extSum) : wds[i];
				var rwd = zk(bdfaker.cells[i]).revisedWidth(wd),
					stylew = jq.px0(rwd);
				if (bdfaker.cells[i].style.width == stylew)
					continue;
				bdfaker.cells[i].style.width = stylew; 
				hdfaker.cells[i].style.width = stylew;
				if (ftfaker) ftfaker.cells[i].style.width = stylew;
				var cpwd = zk(head.cells[i]).revisedWidth(rwd);
				head.cells[i].style.width = jq.px0(cpwd);
				var cell = head.cells[i].firstChild;
				cell.style.width = zk(cell).revisedWidth(cpwd) + "px";
			}
		}
		
		if (zk.opera) 
			zk(this.$n()).redoCSS();
		
	},
	_adjHeadWd: function () {
		var hdfaker = this.ehdfaker,
			bdfaker = this.ebdfaker,
			ftfaker = this.eftfaker,
			fakerflex = this.head ? this.head.$n('hdfakerflex') : null;
		if (!hdfaker || !bdfaker || !hdfaker.cells.length
		|| !bdfaker.cells.length || !zk(hdfaker).isRealVisible()
		|| !this.getBodyWidgetIterator().hasNext()) return;
		
		var hdtable = this.ehead.firstChild, head = this.head.$n();
		if (!head) return;
		
		
		var bdtable = this.ebody.firstChild;
		
		var	total = Math.max(hdtable.offsetWidth, bdtable.offsetWidth), 
			tblwd = Math.min(bdtable.parentNode.clientWidth, bdtable.offsetWidth);
			
		if (total == this.ebody.offsetWidth && 
			this.ebody.offsetWidth > tblwd && this.ebody.offsetWidth - tblwd < 20)
			total = tblwd;
		this._calcMinWds(); 
		var xwds = this._minWd,
			wds = xwds.wds,
			width = xwds.width;

		for (var i = bdfaker.cells.length - (fakerflex ? 1 : 0); i--;) {
			if (!zk(hdfaker.cells[i]).isVisible()) continue;
			var wd = wds[i];
			bdfaker.cells[i].style.width = zk(bdfaker.cells[i]).revisedWidth(wd) + "px";
			hdfaker.cells[i].style.width = bdfaker.cells[i].style.width;
			if (ftfaker) ftfaker.cells[i].style.width = bdfaker.cells[i].style.width;
			var cpwd = zk(head.cells[i]).revisedWidth(zk.parseInt(hdfaker.cells[i].style.width));
			head.cells[i].style.width = cpwd + "px";
			var cell = head.cells[i].firstChild;
			cell.style.width = zk(cell).revisedWidth(cpwd) + "px";
		}
		
		
		if (total != hdtable.offsetWidth) {
			total = hdtable.offsetWidth;
			tblwd = Math.min(this.ebody.clientWidth, bdtable.offsetWidth);
			if (total == this.ebody.offsetWidth && 
				this.ebody.offsetWidth > tblwd && this.ebody.offsetWidth - tblwd < 20)
				total = tblwd;
		}
		
		this._adjMinWd();
	},
	_cpCellWd: function () {
		var dst = this.efoot.firstChild.rows[0],
			srcrows = this.ebodyrows;
		if (!dst || !srcrows || !srcrows.length || !dst.cells.length)
			return;
		var ncols = dst.cells.length,
			src, maxnc = 0;
		for (var j = 0, it = this.getBodyWidgetIterator(), w; (w = it.next());) {
			if (!w.isVisible() || (this._modal && !w._loaded)) continue;

			var row = srcrows[j++], $row = zk(row),
				cells = row.cells, nc = $row.ncols(),
				valid = cells.length == nc && $row.isVisible();
				
			if (valid && nc >= ncols) {
				maxnc = ncols;
				src = row;
				break;
			}
			if (nc > maxnc) {
				src = valid ? row: null;
				maxnc = nc;
			} else if (nc == maxnc && !src && valid) {
				src = row;
			}
		}
		if (!maxnc) return;
	
		var fakeRow = !src;
		if (fakeRow) { 
			src = document.createElement("TR");
			src.style.height = "0px";
				
			for (var j = 0; j < maxnc; ++j)
				src.appendChild(document.createElement("TD"));
			srcrows[0].parentNode.appendChild(src);
		}
	
		
		
		for (var j = maxnc; j--;)
			dst.cells[j].style.width = "";
	
		var sum = 0;
		for (var j = maxnc; j--;) {
			var d = dst.cells[j], s = src.cells[j];
			if (zk.opera) {
				sum += s.offsetWidth;
				d.style.width = zk(s).revisedWidth(s.offsetWidth);
			} else {
				d.style.width = s.offsetWidth + "px";
				if (maxnc > 1) { 
					var v = s.offsetWidth - d.offsetWidth;
					if (v != 0) {
						v += s.offsetWidth;
						if (v < 0) v = 0;
						d.style.width = v + "px";
					}
				}
			}
		}
	
		if (zk.opera && this.isSizedByContent())
			dst.parentNode.parentNode.style.width = sum + "px";
	
		if (fakeRow)
			src.parentNode.removeChild(src);
	}
});
})();

(function () {
	
	var _fixOnChildChanged = zk.opera ? function (head) {
		return (head = head.parent) && head.rerender(0); 
	}: zk.$void;

	function _syncFrozen(wgt) {
		if ((wgt = wgt.getMeshWidget()) && (wgt = wgt.frozen))
			wgt._syncFrozen();
	}

var HeadWidget =

zul.mesh.HeadWidget = zk.$extends(zul.Widget, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onColSize: this}, -1000);
	},

	$define: {
		
		
		sizable: function () {
			this.rerender(0);
		}
	},

	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		if (!this.$instanceof(zul.mesh.Auxhead))
			for (var faker, fs = child.$class._faker, i = fs.length; i--;)
				jq(child.uuid + '-' + fs[i], zk).remove();
	},
	
	
	setVflex: function (v) { 
		v = false;
		this.$super(HeadWidget, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(HeadWidget, 'setHflex', v);
	},

	
	getMeshWidget: function () {
		return this.parent;
	},

	onColSize: function (evt) {
		var owner = this.parent;
		if (owner.isSizedByContent()) owner._adjHeadWd(owner);
		evt.column._width = evt.width;
		owner._innerWidth = owner.eheadtbl.width || owner.eheadtbl.style.width;
		owner.fire('onInnerWidth', owner._innerWidth);
		owner.fireOnRender(zk.gecko ? 200 : 60);
	},

	bind_: function (desktop, skipper, after) {
		this.$supers(HeadWidget, 'bind_', arguments);
		var w = this;
		after.push(function () {
			_syncFrozen(w);
		});
	},
	unbind_: function () {
		jq(this.hdfaker).remove();
		jq(this.bdfaker).remove();
		jq(this.ftfaker).remove();
		this.$supers(HeadWidget, 'unbind_', arguments);
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (this.desktop) {
			if (!_fixOnChildChanged(this) && this.parent._fixHeaders())
				this.parent.onSize();
			_syncFrozen(this);
			this.parent._minWd = null;
		}
	},
	onChildRemoved_: function () {
		this.$supers('onChildRemoved_', arguments);
		if (this.desktop) {
			if (!_fixOnChildChanged(this) && !this.childReplacing_ &&
				this.parent._fixHeaders()) 
				this.parent.onSize();
			this.parent._minWd = null;
		}
	},
	beforeChildrenFlex_: function (hwgt) { 
		if (hwgt && !hwgt._flexFixed) {
			
			
			var wgt = this.parent,
				hdfaker = wgt.ehdfaker,
				bdfaker = wgt.ebdfaker,
				hdf = hdfaker ? hdfaker.firstChild : null,
				bdf = bdfaker ? bdfaker.firstChild : null,
				everFlex = false; 
			for(var h = this.firstChild; h; h = h.nextSibling) {
				if (h._nhflex > 0) { 
					everFlex = true;
					if (hdf) hdf.style.width = '';
					if (bdf) bdf.style.width = '';
				}
				if (hdf) hdf = hdf.nextSibling;
				if (bdf) bdf = bdf.nextSibling;
			}
			if (zk.ie && everFlex) { 
				if (hdf) hdf.style.width='0px';
				if (bdf) bdf.style.width='0px';
			}
		}
		return true;
	},
	afterChildrenFlex_: function (hwgt) { 
		var wgt = this.parent;
		if (wgt && !wgt.isSizedByContent()) {
			wgt._adjFlexWd();
			wgt._adjSpanWd(); 
		}
		
		wgt._removeScrollbar();
	},
	deferRedrawHTML_: function (out) {
		out.push('<tr', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tr>');
	}
},{ 
	redraw: function (out) {
		out.push('<tr', this.domAttrs_(), ' align="left">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</tr>');
	}
});

})();


zul.mesh.HeaderWidget = zk.$extends(zul.LabelImageWidget, {
	_sumWidth: true, 
	$define: {
    	
    	
		align: function (v) {
			this.updateMesh_('align', v);
		},
		
		
		valign: function (v) {
			this.updateMesh_('valign', v);
		},
		width: _zkf = function () {
			this.updateMesh_();
		},
		height: _zkf
	},
	
	updateMesh_: function (nm, val) { 
		if (this.desktop) {
			var wgt = this.getMeshWidget();
			if (wgt) {
				if (wgt._inUpdateMesh) {
					wgt._flexRerender = true; 
					return;
				}
				wgt._inUpdateMesh = true;
				try {
					for(var kid = this.parent.firstChild; kid; kid = kid.nextSibling)
						delete kid._hflexWidth;
					wgt.rerender(); 
					if (wgt._flexRerender) {
						try {
							wgt.rerender();
						} finally {
							delete wgt._flexRerender;
						}
					}
				} finally {
					delete wgt._inUpdateMesh;
				}
			}
		}
	},
	setFlexSize_: function (sz) {
		if ((sz.width !== undefined && sz.width != 'auto' && sz.width != '') || sz.width == 0) { 
			
			
			this._hflexWidth = sz.width;
			return {width: sz.width};
		} else
			return this.$supers('setFlexSize_', arguments);
	},
	domStyle_: function (no) {
		var style = '';
		if (this._hflexWidth) { 
			style = 'width:'+ this._hflexWidth+';';
			
			if (no) no.width = true;
			else no = {width:true};
		}
		if (zk.ie8 && this._align)
			style += 'text-align:' + this._align + ';';
		
		return style + this.$super('domStyle_', no);
	},
	
	getMeshWidget: function () {
		return this.parent ? this.parent.parent : null;
	},
	
	isSortable_: function () {
		return false;
	},
	
	getColAttrs: function () {
		return (this._align ? ' align="' + this._align + '"' : '')
			+ (this._valign ? ' valign="' + this._valign + '"' : '') ;
	},
	setVisible: function (visible) {
		if (this.isVisible() != visible) {
			this.$supers('setVisible', arguments);
			this.updateMesh_('visible', visible);
		}
	},
	domAttrs_: function (no) {
		var attrs = this.$supers('domAttrs_', arguments);
		return attrs + this.getColAttrs();
	},
	getTextNode: function () {
		return jq(this.$n()).find('>div:first')[0];
	},
	bind_: function () {
		this.$supers(zul.mesh.HeaderWidget, 'bind_', arguments);
		if (this.parent.isSizable()) this._initsz();
		this.fixFaker_();
	},
	unbind_: function () {
		if (this._dragsz) {
			this._dragsz.destroy();
			this._dragsz = null;
		}
		this.$supers(zul.mesh.HeaderWidget, 'unbind_', arguments);
	},
	_initsz: function () {
		var n = this.$n();
		if (n && !this._dragsz) {
			var $Header = this.$class;
			this._dragsz = new zk.Draggable(this, null, {
				revert: true, constraint: "horizontal",
				ghosting: $Header._ghostsizing,
				endghosting: $Header._endghostsizing,
				snap: $Header._snapsizing,
				ignoredrag: $Header._ignoresizing,
				zIndex: 99999, 
				endeffect: $Header._aftersizing
			});
		}
	},
	
	fixFaker_: function () {
		var n = this.$n(),
			index = zk(n).cellIndex(),
			owner = this.getMeshWidget();
		for (var faker, fs = this.$class._faker, i = fs.length; i--;) {
			faker = owner['e' + fs[i]]; 
			if (faker && !this.$n(fs[i])) 
				faker[faker.cells.length > index ? "insertBefore" : "appendChild"]
					(this._createFaker(n, fs[i]), faker.cells[index]);
		}
	},
	_createFaker: function (n, postfix) {
		var t = document.createElement("th"), 
			d = document.createElement("div");
		t.id = n.id + "-" + postfix;
		t.className = n.className;
		t.style.cssText = n.style.cssText;
		d.style.overflow = "hidden";
		t.appendChild(d);
		return t;
	},
	doClick_: function (evt) {
		var wgt = zk.Widget.$(evt.domTarget),
			n = this.$n(),
			ofs = this._dragsz ? zk(n).revisedOffset() : false;
		if (!zk.dragging && (wgt == this || wgt.$instanceof(zul.wgt.Label)) && this.isSortable_() &&
		!jq.nodeName(evt.domTarget, "input") && (!this._dragsz || !this._insizer(evt.pageX - ofs[0]))) {
			this.fire('onSort');
			evt.stop();
		} else {
			if (jq.nodeName(evt.domTarget, "input"))
				evt.stop({propagation: true});
			this.$supers('doClick_', arguments);
		}
	},
	doDoubleClick_: function (evt) {
		if (this._dragsz) {
			var n = this.$n(),
				$n = zk(n),
				ofs = $n.revisedOffset();
			if (this._insizer(evt.pageX - ofs[0])) {
				var mesh = this.getMeshWidget(),
					max = zk(this.$n('cave')).textSize()[0],
					cIndex = $n.cellIndex();
				mesh._calcMinWds();
				var sz = mesh._minWd.wds[cIndex];
				this.$class._aftersizing({control: this, _zszofs: sz}, evt);
			} else
				this.$supers('doDoubleClick_', arguments);
		} else
			this.$supers('doDoubleClick_', arguments);
	},
	doMouseMove_: function (evt) {
		if (zk.dragging || !this.parent.isSizable()) return;
		var n = this.$n(),
			ofs = zk(n).revisedOffset(); 
		if (this._insizer(evt.pageX - ofs[0])) {
			jq(n).addClass(this.getZclass() + "-sizing");
		} else {
			jq(n).removeClass(this.getZclass() + "-sizing");
		}
	},
	doMouseOut_: function (evt) {
		if (this.parent.isSizable()) {
			var n = this.$n()
			jq(n).removeClass(this.getZclass() + "-sizing");
		}
	},
	ignoreDrag_: function (pt) {
		if (this.parent.isSizable()) {
			var n = this.$n(),
				ofs = zk(n).revisedOffset();
			return this._insizer(pt[0] - ofs[0]);
		}
		return false;
	},
	
	ignoreChildNodeOffset_: function(attr) {
		return true;
	},
	
	beforeMinFlex_: function(o) {
		if (o == 'w') {
			var wgt = this.getMeshWidget();
			if (wgt) { 
				wgt._calcMinWds();
				if (wgt._minWd) {
					var n = this.$n(), zkn = zk(n),
						cidx = zkn.cellIndex();
					return zkn.revisedWidth(wgt._minWd.wds[cidx]);
				}
			}
		}
		return null;
	},
	
	getParentSize_: function() {
		
		var mw = this.getMeshWidget(),
			p = mw.$n(),
			zkp = p ? zk(p) : null;
		if (zkp) {
			var w = zkp.revisedWidth(p.offsetWidth);
			
			if (mw.ebody) {
				var scroll = mw.ebody.offsetWidth - mw.ebody.clientWidth;
				if (scroll > 11) {
					w -= scroll;
					
					
					if (zk.ie) {
						var hdflex = jq(mw.ehead).find('table>tbody>tr>th:last-child')[0];
						hdflex.style.width = '';
						if (mw.ebodytbl)
							mw.ebodytbl.width = "";
					}
				} else if (zk.ie && mw.ebodytbl) {
					
					if (mw.ebodytbl && !mw.ebodytbl.width)
						mw.ebodytbl.width = "100%";
				}
			}
			return {
				height: zkp.revisedHeight(p.offsetHeight),
				width: w
			}
		}
		return {};
	},
	isWatchable_: function (name) {
		var n,
			strict = name!='onShow';
		return (n=this.$n()) && zk(n).isVisible(strict) && 
			(n=this.getMeshWidget()) && zk(n).isRealVisible(strict);
	},
	_insizer: function (x) {
		return x >= this.$n().offsetWidth - 10;
	},
	deferRedrawHTML_: function (out) {
		out.push('<th', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></th>');
	}
}, { 
	_faker: ["hdfaker", "bdfaker", "ftfaker"],
	
	
	_ghostsizing: function (dg, ofs, evt) {
		var wgt = dg.control,
			el = wgt.getMeshWidget().eheadtbl,
			of = zk(el).revisedOffset(),
			n = wgt.$n();
		
		ofs[1] = of[1];
		ofs[0] += zk(n).offsetWidth();
		jq(document.body).append(
			'<div id="zk_hdghost" style="position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:3px;height:'+zk(el.parentNode.parentNode).offsetHeight()
			+'px;background:darkgray"></div>');
		return jq("#zk_hdghost")[0];
	},
	_endghostsizing: function (dg, origin) {
		dg._zszofs = zk(dg.node).revisedOffset()[0] - zk(origin).revisedOffset()[0];
	},
	_snapsizing: function (dg, pointer) {
		var n = dg.control.$n(), $n = zk(n),
			ofs = $n.revisedOffset();
		pointer[0] += $n.offsetWidth(); 
		if (ofs[0] + dg._zmin >= pointer[0])
			pointer[0] = ofs[0] + dg._zmin;
		return pointer;
	},
	_ignoresizing: function (dg, pointer, evt) {
		var wgt = dg.control,
			n = wgt.$n(), $n = zk(n),
			ofs = $n.revisedOffset(); 
			
		if (wgt._insizer(pointer[0] - ofs[0])) {
			dg._zmin = 10 + $n.padBorderWidth();
			return false;
		}
		return true;
	},
	_aftersizing: function (dg, evt) {
		var wgt = dg.control,
			n = wgt.$n(), $n = zk(n),
			mesh = wgt.getMeshWidget(),
			wd = dg._zszofs,
			table = mesh.eheadtbl,
			head = table.tBodies[0].rows[0], 
			rwd = $n.revisedWidth(wd),
			cidx = $n.cellIndex();
			
		
		
		if (mesh.efoottbl) {
			mesh.eftfaker.cells[cidx].style.width = wd + "px";
		}
		var fixed, disp;
		if (mesh.ebodytbl) {
			if (zk.opera && !mesh.ebodytbl.style.tableLayout) {
				fixed = 'auto';
				mesh.ebodytbl.style.tableLayout = "fixed";
			}
			mesh.ebdfaker.cells[cidx].style.width = wd + "px";
		}
		
		head.cells[cidx].style.width = wd + "px";
		n.style.width = rwd + "px";
		var cell = n.firstChild;
		cell.style.width = zk(cell).revisedWidth(rwd) + "px";
		
		
		var hdfakercells = mesh.ehdfaker.cells,
			bdfakercells = mesh.ebdfaker.cells,
			wds = [];
			i = 0;
		for (var w = mesh.head.firstChild, i = 0; w; w = w.nextSibling) {
			var stylew = hdfakercells[i].style.width;
			w._width = wds[i] = stylew ? stylew : jq.px0(hdfakercells[i].offsetWidth); 
			if (!stylew) 
				bdfakercells[i].style.width = hdfakercells[i].style.width = w._width;
			++i;
		}
		
		delete mesh._span; 
		delete mesh._sizedByContent; 
		for (var w = mesh.head.firstChild; w; w = w.nextSibling)
			w.setHflex_(null); 
		
		
		
		var hdflex = jq(mesh.ehead).find('table>tbody>tr>th:last-child')[0],
			bdflex = jq(mesh.ebody).find('table>tbody>tr>th:last-child')[0];
		hdflex.style.width = ''; 
		if (bdflex) bdflex.style.width = '';
		
		
			
		var meshn = mesh.$n();
		if (zk.opera) {
			if(fixed) 
				mesh.ebodytbl.style.tableLayout = fixed;
			
			
			var olddisp = meshn.style.display; 
			meshn.style.display='none';
			var redrawFix = meshn.offsetHeight;
			meshn.style.display=olddisp;
		}
		
		wgt.parent.fire('onColSize', zk.copy({
			index: cidx,
			column: wgt,
			width: wd + "px",
			widths: wds
		}, evt.data), null, 0);
		
		
		meshn._lastsz = null;
		
		
		zWatch.fireDown('onSize', mesh);
	},

	redraw: function (out) {
		var uuid = this.uuid,
			zcls = this.getZclass();
		out.push('<th', this.domAttrs_(), '><div id="', uuid, '-cave" class="',
				zcls, '-cnt"', this.domTextStyleAttr_(), '><div class="', zcls, '-sort-img"></div>', this.domContent_());

		if (this.parent._menupopup && this.parent._menupopup != 'none')
			out.push('<a id="', uuid, '-btn"  href="javascript:;" class="', zcls, '-btn"></a>');
	
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</div></th>');	
	}
});



zul.mesh.SortWidget = zk.$extends(zul.mesh.HeaderWidget, {
	_sortDirection: "natural",
	_sortAscending: "none",
	_sortDescending: "none",

	$define: {
    	
    	
		sortDirection: function (v) {
			var n = this.$n();
			if (n) {
				var zcls = this.getZclass(),
					$n = jq(n);
				$n.removeClass(zcls + "-sort-dsc").removeClass(zcls + "-sort-asc").addClass(zcls + "-sort");
				switch (v) {
				case "ascending":
					$n.addClass(zcls + "-sort-asc");
					break;
				case "descending":
					$n.addClass(zcls + "-sort-dsc");
				}
			}
		},
		
		
		sortAscending: function (v) {
			if (!v) this._sortAscending = v = "none";
			var n = this.$n(),
				zcls = this.getZclass();
			if (n) {
				var $n = jq(n);
				if (v == "none") {
					$n.removeClass(zcls + "-sort-asc");
					if (this._sortDescending == "none")
						$n.removeClass(zcls + "-sort");					
				} else
					$n.addClass(zcls + "-sort");
			}
		},
		
		
		sortDescending: function (v) {
			if (!v) this._sortDescending = v = "none";
			var n = this.$n(),
				zcls = this.getZclass();
			if (n) {
				var $n = jq(n);
				if (v == "none") {
					$n.removeClass(zcls + "-sort-dsc");
					if (this._sortAscending == "none")
						$n.removeClass(zcls + "-sort");					
				} else
					$n.addClass(zcls + "-sort");
			}
		}
	},
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onSort: this}, -1000);
	},
	
	setSort: function (type) {
		if (type && type.startsWith('client')) {
			this.setSortAscending(type);
			this.setSortDescending(type);
		} else {
			this.setSortAscending('none');
			this.setSortDescending('none');
		}
	},
	isSortable_: function () {
		return this._sortAscending != "none" || this._sortDescending != "none";
	},
	
	sort: function (ascending, evt) {
		if (!this.checkClientSort_(ascending))
			return false;
		
		evt.stop();
		
		this.replaceCavedChildrenInOrder_(ascending);
		
		return true;
	},
	
	checkClientSort_: function (ascending) {
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
		if (!mesh || mesh.isModel()) return false;
			
			
		return true;
	},
	
	replaceCavedChildrenInOrder_: function (ascending) {
		var mesh = this.getMeshWidget(),
			body = this.getMeshBody(),
			dir = this.getSortDirection(),
			sorter = ascending ? this._sortAscending: this._sortDescending,
			desktop = body.desktop,
			node = body.$n();
		try {
			body.unbind();
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
			for (var i = 0, k = d.length; i < k; i++) {
				body.appendChild(d[i].wgt.parent);
			}
			this._fixDirection(ascending);
			
		} finally {
			body.replaceHTML(node, desktop);
		}
	},
	
	sorting: function(a, b, isNumber) {
		var v1, v2;
		if (typeof a.getLabel == 'function')
			v1 = a.getLabel();
		else if (typeof a.getValue == 'function')
			v1 = a.getValue();
		else v1 = a;
		
		if (typeof b.getLabel == 'function')
			v2 = b.getLabel();
		else if (typeof b.getValue == 'function')
			v2 = b.getValue();
		else v2 = b;
		
		if (isNumber) return v1 - v2;
		return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
	},
	_fixDirection: function (ascending) {
		
		for (var w = this.parent.firstChild; w; w = w.nextSibling) {
			w.setSortDirection(
				w != this ? "natural": ascending ? "ascending": "descending");
		}
	},
	onSort: function (evt) {
		var dir = this.getSortDirection();
		if ("ascending" == dir) this.sort(false, evt);
		else if ("descending" == dir) this.sort(true, evt);
		else if (!this.sort(true, evt)) this.sort(false, evt);
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass(),
				added;
			if (this._sortAscending != "none" || this._sortDescending != "none") {
				switch (this._sortDirection) {
				case "ascending":
					added = zcls + "-sort " + zcls + "-sort-asc";
					break;
				case "descending":
					added = zcls + "-sort " + zcls + "-sort-dsc";
					break;
				default: 
					added = zcls + "-sort";
					break;
				}
			}
			return scls != null ? scls + (added ? ' ' + added : '') : added || '';
		}
		return scls;
	}
});


zul.mesh.FooterWidget = zk.$extends(zul.LabelImageWidget, {
	_span: 1,
	
	$define: {
		
    	
		span: function (v) {
			var n = this.$n();
			if (n) n.colSpan = v;
		},
		
    	
		align: function (v) {
			var n = this.$n();
			if (n) n.align = v;
		},
		
		
		valign: function (v) {
			var n = this.$n();
			if (n) n.vAlign = v;
		}
	},
	
	getMeshWidget: function () {
		return this.parent ? this.parent.parent : null;
	},
	
	getHeaderWidget: function () {
		var meshWidget = this.getMeshWidget();
		if (meshWidget) {
			var cs = meshWidget.getHeadWidget();
			if (cs)
				return cs.getChildAt(this.getChildIndex());
		}
		return null;
	},
	getAlignAttrs: function () {
		return (this._align ? ' align="' + this._align + '"' : '')
			+ (this._valign ? ' valign="' + this._valign + '"' : '') ;
	},
	
	domStyle_: function (no) {
		var style = '';
		if (zk.ie8 && this._align)
			style += 'text-align:' + this._align + ';';
		
		return style + this.$super('domStyle_', no);
	},
	domAttrs_: function () {
		var head = this.getHeaderWidget(),
			added;
		if (head)
			added = head.getColAttrs();
		if (this._align || this._valign)
			added = this.getAlignAttrs();
		return this.$supers('domAttrs_', arguments)
			+ (this._span > 1 ? ' colspan="' + this._span + '"' : '')
			+ (added ? ' ' + added : '');
	},
	deferRedrawHTML_: function (out) {
		out.push('<td', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></td>');
	}
});

(function () {
	function _rerenderIfBothPaging(wgt) {
		if (wgt.isBothPaging()) {
			wgt.parent.rerender(0);
			return true;
		}
	}
	
	
	function _isUnsignedInteger(s) {
		  return (s.toString().search(/^[0-9]+$/) == 0);
	}


zul.mesh.Paging = zk.$extends(zul.Widget, {
	_pageSize: 20,
	_totalSize: 0,
	_pageCount: 1,
	_activePage: 0,
	_pageIncrement: 10,

	$define: { 
    	
    	
		totalSize: function () {
			this._updatePageNum();
			if (this._detailed) {
				if (!_rerenderIfBothPaging(this)) {
					var info = this.$n("info");
					if (info) info.innerHTML = this.infoText_();
				}
			}
		},
		
		
		pageIncrement: _zkf = function () {
			this.rerender(0);
		},
		
		
		detailed: _zkf,
		
		
		pageCount: _zkf, 
		
		
		activePage: _zkf,
		
		
		pageSize: function () {
			this._updatePageNum();
		},
		
		
		autohide: function () {
			if (this._pageCount == 1) this.rerender(0);
		}
	},
	setStyle: function () {
		this.$supers('setStyle', arguments);
		_rerenderIfBothPaging(this)
	},
	setSclass: function () {
		this.$supers('setSclass', arguments);
		_rerenderIfBothPaging(this);
	},
	setWidth: function () {
		this.$supers('setWidth', arguments);
		_rerenderIfBothPaging(this);
	},
	setHeight: function () {
		this.$supers('setHeight', arguments);
		_rerenderIfBothPaging(this);
	},
	setLeft: function () {
		this.$supers('setLeft', arguments);
		_rerenderIfBothPaging(this);
	},
	setTop: function () {
		this.$supers('setTop', arguments);
		_rerenderIfBothPaging(this);
	},
	setTooltiptext: function () {
		this.$supers('setTooltiptext', arguments);
		_rerenderIfBothPaging(this);
	},
	replaceHTML: function () {
		if (!_rerenderIfBothPaging(this))
			this.$supers('replaceHTML', arguments);
	},
	
	isBothPaging: function () {
		return this.parent && this.parent.getPagingPosition
					&& "both" == this.parent.getPagingPosition();
	},
	_updatePageNum: function () {
		var v = Math.floor((this._totalSize - 1) / this._pageSize + 1);
		if (v == 0) v = 1;
		if (v != this._pageCount) {
			this._pageCount = v;
			if (this._activePage >= this._pageCount)
				this._activePage = this._pageCount - 1;
			if (this.desktop && this.parent) {
				if (!_rerenderIfBothPaging(this)) {
					this.rerender();

					
					if (this.parent.$instanceof(zul.mesh.MeshWidget)) {
						var n = this.parent.$n();

						
						if (n && n._lastsz)
							n._lastsz = null;
						this.parent.onSize();
					}
				}
			}
		}
	},
	
	infoText_: function () {
		var lastItem = (this._activePage+1) * this._pageSize;
		return "[ " + (this._activePage * this._pageSize + 1) + ("os" != this.getMold() ?
			" - " + (lastItem > this._totalSize ? this._totalSize : lastItem) : "")+ " / " + this._totalSize + " ]";
	},
	_infoTags: function () {
		if (this._totalSize == 0)
			return "";
		var lastItem = (this._activePage+1) * this._pageSize,
			out = [];
		out.push('<div id="', this.uuid ,'-info" class="', this.getZclass(), '-info">', this.infoText_(), '</div>');
		return out.join('');
	},
	_innerTags: function () {
		var out = [];

		var half = Math.round(this._pageIncrement / 2),
			begin, end = this._activePage + half - 1;
		if (end >= this._pageCount) {
			end = this._pageCount - 1;
			begin = end - this._pageIncrement + 1;
			if (begin < 0) begin = 0;
		} else {
			begin = this._activePage - half;
			if (begin < 0) begin = 0;
			end = begin + this._pageIncrement - 1;
			if (end >= this._pageCount) end = this._pageCount - 1;
		}
		var zcs = this.getZclass();
		if (this._activePage > 0) {
			if (begin > 0) 
				this.appendAnchor(zcs, out, msgzul.FIRST, 0);
			this.appendAnchor(zcs, out, msgzul.PREV, this._activePage - 1);
		}

		var bNext = this._activePage < this._pageCount - 1;
		for (; begin <= end; ++begin) {
			if (begin == this._activePage) {
				this.appendAnchor(zcs, out, begin + 1, begin, true);
			} else {
				this.appendAnchor(zcs, out, begin + 1, begin);
			}
		}

		if (bNext) {
			this.appendAnchor(zcs, out, msgzul.NEXT, this._activePage + 1);
			if (end < this._pageCount - 1) 
				this.appendAnchor(zcs, out, msgzul.LAST, this._pageCount - 1);
		}
		if (this._detailed)
			out.push('<span id="', this.uuid ,'-info">', this.infoText_(), "</span>");
		return out.join('');
	},
	appendAnchor: function (zclass, out, label, val, seld) {
		var zcls = zclass + "-cnt" + (seld ? " " + zclass + "-seld" : ""),
			isInt = _isUnsignedInteger(label);
		zclass += '-cnt' + (seld ? '-seld' : '');
		if (isInt)
			out.push('<div class="', zclass, '-l"><div class="', zclass, '-r"><div class="', zclass, '-m">');
		out.push('<a class="', zcls, '" href="javascript:;" onclick="zul.mesh.Paging.go(this,',
				val, ')">', label, '</a>');
		if (isInt)
			out.push('</div></div></div>');
	},
	_doMouseEvt: function (evt) {
		var zcls = this.getZclass() + '-cnt-l';
		jq(evt.domTarget).parents('.' + zcls)[evt.name == 'onMouseOver' ? 'addClass' : 'removeClass'](zcls + '-over');
	},
	getZclass: function () {
		var added = "os" == this.getMold() ? "-os" : "";
		return this._zclass == null ? "z-paging" + added : this._zclass;
	},
	isVisible: function () {
		var visible = this.$supers('isVisible', arguments);
		return visible && (this._pageCount > 1 || !this._autohide);
	},
	bind_: function () {
		this.$supers(zul.mesh.Paging, 'bind_', arguments);
		
		if (this.getMold() == 'os') {
			var childs = jq(this.$n()).find('div a'),
				i = childs.length;
				
			while (i-- > 0) {
				this.domListen_(childs[i], 'onMouseOver', '_doMouseEvt')
					.domListen_(childs[i], 'onMouseOut', '_doMouseEvt');
			}
			return;
		}
		var uuid = this.uuid,
			inputs = jq.$$(uuid, 'real'),
			zcls = this.getZclass(),
			Paging = this.$class;

		if (!this.$weave)
			for (var i = inputs.length; i--;)
				jq(inputs[i]).keydown(Paging._domKeyDown)
					.blur(Paging._domBlur);

		for (var postfix = ['first', 'prev', 'last', 'next'], k = postfix.length; k--; ) {
			var btn = jq.$$(uuid, postfix[k]);
			for (var j = btn.length; j--;) {
				if (!this.$weave)
					jq(btn[j]).mouseover(Paging._domMouseOver)
						.mouseout(Paging._domMouseOut)
						.bind('zmousedown', Paging._domMouseDown)
						.click(Paging['_dom' + postfix[k] + 'Click']);

				if (this._pageCount == 1)
					jq(btn[j]).addClass(zcls + "-btn-disd");
				else if (postfix[k] == 'first' || postfix[k] == 'prev') {
					if (this._activePage == 0) jq(btn[j]).addClass(zcls + "-btn-disd");
				} else if (this._activePage == this._pageCount - 1) {
					jq(btn[j]).addClass(zcls + "-btn-disd");
				}
			}
		}
	},
	unbind_: function () {
		if (this.getMold() != "os") {
			var uuid = this.uuid, inputs = jq.$$(uuid, 'real'), Paging = this.$class;

			for (var i = inputs.length; i--;)
				jq(inputs[i]).unbind("keydown", Paging._domKeyDown)
					.unbind("blur", Paging._domBlur);

			for (var postfix = ['first', 'prev', 'last', 'next'], k = postfix.length; k--;) {
				var btn = jq.$$(uuid, postfix[k]);
				for (var j = btn.length; j--;) {
					jq(btn[j]).unbind("mouseover", Paging._domMouseOver)
						.unbind("mouseout", Paging._domMouseOut)
						.unbind("zmousedown", Paging._domMouseDown)
						.unbind("click", Paging['_dom' + postfix[k] + 'Click']);
				}
			}
		} else {
			var childs = jq(this.$n()).find('div a'),
				i = childs.length;
				
			while (i-- > 0) {
				this.domUnlisten_(childs[i], 'onMouseOver', '_doMouseEvt')
					.domUnlisten_(childs[i], 'onMouseOut', '_doMouseEvt');
			}
		}
		this.$supers(zul.mesh.Paging, 'unbind_', arguments);
	}
}, { 
	
	go: function (anc, pgno) {
		var wgt = zk.Widget.isInstance(anc) ? anc : zk.Widget.$(anc);
		if (wgt && wgt.getActivePage() != pgno)
			wgt.fire('onPaging', pgno);
	},
	_domKeyDown: function (evt) {
		var inp = evt.target,
			wgt = zk.Widget.$(inp);
		if (inp.disabled || inp.readOnly)
			return;

		var code =evt.keyCode;
		switch(code){
		case 48:case 96:
		case 49:case 97:
		case 50:case 98:
		case 51:case 99:
		case 52:case 100:
		case 53:case 101:
		case 54:case 102:
		case 55:case 103:
		case 56:case 104:
		case 57:case 105:
			break;
		case 37:
			break;
		case 38: case 33: 
			wgt.$class._increase(inp, wgt, 1);
			evt.stop();
			break;
		case 39:
			break;
		case 40: case 34: 
			wgt.$class._increase(inp, wgt, -1);
			evt.stop();
			break;
		case 36:
			wgt.$class.go(wgt,0);
			evt.stop();
			break;
		case 35:
			wgt.$class.go(wgt, wgt._pageCount - 1);
			evt.stop();
			break;
		case 9: case 8: case 46: 
			break;
		case 13: 
			wgt.$class._increase(inp, wgt, 0);
			wgt.$class.go(wgt, inp.value-1);
			evt.stop();
			break;
		default:
			if (!(code >= 112 && code <= 123) 
			&& !evt.ctrlKey && !evt.altKey)
				evt.stop();
		}
	},
	_domBlur: function (evt) {
		var inp = evt.target,
			wgt = zk.Widget.$(inp);
		if (inp.disabled || inp.readOnly)
			return;

		wgt.$class._increase(inp, wgt, 0);
		wgt.$class.go(wgt, inp.value-1);
		evt.stop();
	},
	_increase: function (inp, wgt, add){
		var value = zk.parseInt(inp.value);
		value += add;
		if (value < 1) value = 1;
		else if (value > wgt._pageCount) value = wgt._pageCount;
		inp.value = value;
	},
	_domfirstClick: function (evt) {
		var wgt = zk.Widget.$(evt),
			zcls = wgt.getZclass();

		if (wgt.getActivePage() != 0) {
			wgt.$class.go(wgt, 0);
			var uuid = wgt.uuid;
			for (var postfix = ['first', 'prev'], k = postfix.length; k--;)
				for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
					jq(btn[i]).addClass(zcls + "-btn-disd");
		}
	},
	_domprevClick: function (evt) {
		var wgt = zk.Widget.$(evt),
			ap = wgt.getActivePage(),
			zcls = wgt.getZclass();

		if (ap > 0) {
			wgt.$class.go(wgt, ap - 1);
			if (ap - 1 == 0) {
				var uuid = wgt.uuid;
				for (var postfix = ['first', 'prev'], k = postfix.length; k--;)
					for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
						jq(btn[i]).addClass(zcls + "-btn-disd");
			}
		}
	},
	_domnextClick: function (evt) {
		var wgt = zk.Widget.$(evt),
			ap = wgt.getActivePage(),
			pc = wgt.getPageCount(),
			zcls = wgt.getZclass();

		if (ap < pc - 1) {
			wgt.$class.go(wgt, ap + 1);
			if (ap + 1 == pc - 1) {
				var uuid = wgt.uuid;
				for (var postfix = ['last', 'next'], k = postfix.length; k--;)
					for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
						jq(btn[i]).addClass(zcls + "-btn-disd");
			}
		}
	},
	_domlastClick: function (evt) {
		var wgt = zk.Widget.$(evt),
			pc = wgt.getPageCount(),
			zcls = wgt.getZclass();

		if (wgt.getActivePage() < pc - 1) {
			wgt.$class.go(wgt, pc - 1);
			var uuid = wgt.uuid;
			for (var postfix = ['last', 'next'], k = postfix.length; k--;)
				for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
					jq(btn[i]).addClass(zcls + "-btn-disd");
		}
	},
	_domMouseOver: function (evt) {
		var target = evt.target,
			$table = jq(target).parents("table:first"),
			zcls = zk.Widget.$(target).getZclass();
		if (!$table.hasClass(zcls + "-btn-disd")) 
			$table.addClass(zcls + "-btn-over");
	},
	_domMouseOut: function (evt) {
		var target = evt.target,
			$table = jq(target).parents("table:first"),
			wgt = zk.Widget.$(target);
		if(!zk.ie || !jq.isAncestor($table[0], evt.relatedTarget || evt.toElement))
			$table.removeClass(wgt.getZclass() + "-btn-over");
	},
	_domMouseDown: function (evt) {
		var target = evt.target,
			$table = jq(target).parents("table:first"),
			wgt = zk.Widget.$(target),
			zcls = wgt.getZclass();
		if (!$table.hasClass(zcls + "-btn-disd")) {
			$table.addClass(zcls + "-btn-clk");
			wgt.$class._downbtn = $table[0];
			jq(document).bind('zmouseup', wgt.$class._domMouseUp);
		}
	},
	_domMouseUp: function (evt) {
		if (zul.mesh.Paging._downbtn) {
			var zcls = zk.Widget.$(zul.mesh.Paging._downbtn).getZclass();
			jq(zul.mesh.Paging._downbtn).removeClass(zcls + "-btn-clk");
		}
		zul.mesh.Paging._downbtn = null;
		jq(document).unbind("zmouseup", zul.mesh.Paging._domMouseUp);
	}
});

})();
zkreg('zul.mesh.Paging');zk._m={};
zk._m['os']=

function (out) {
	if (this.getMold() == "os") {
		out.push('<div', this.domAttrs_(), '>', this._innerTags(), '</div>');
		return;
	}
	var uuid = this.uuid,
		zcls = this.getZclass();
	out.push('<div name="', uuid, '"', this.domAttrs_(), '>', '<table', zUtl.cellps0,
			'><tbody><tr><td><table id="', uuid, '-first" name="', uuid, '-first"',
			zUtl.cellps0, ' class="', zcls, '-btn"><tbody><tr>',
			'<td class="', zcls, '-btn-l"></td>',
			'<td class="', zcls, '-btn-m"><em unselectable="on">',
			'<button type="button" class="', zcls, '-first"> </button></em></td>',
			'<td class="', zcls, '-btn-r"></td></tr></tbody></table></td>',
			'<td><table id="', uuid, '-prev" name="', uuid, '-prev"', zUtl.cellps0,
			' class="', zcls, '-btn"><tbody><tr><td class="', zcls, '-btn-l"></td>',
			'<td class="', zcls, '-btn-m"><em unselectable="on"><button type="button" class="',
			zcls, '-prev"> </button></em></td><td class="', zcls, '-btn-r"></td>',
			'</tr></tbody></table></td><td><span class="', zcls, '-sep"></span></td>',
			'<td><span class="', zcls, '-text"></span></td><td><input id="',
			uuid, '-real" name="', uuid, '-real" type="text" class="', zcls,
			'-inp" value="', this.getActivePage() + 1, '" size="3"/></td>',
			'<td><span class="', zcls, '-text">/ ', this.getPageCount(), '</span></td>',
			'<td><span class="', zcls, '-sep"></span></td><td><table id="', uuid,
			'-next" name="', uuid, '-next"', zUtl.cellps0, ' class="', zcls, '-btn">',
			'<tbody><tr><td class="', zcls, '-btn-l"></td><td class="',
			zcls, '-btn-m"><em unselectable="on"><button type="button" class="',
			zcls, '-next"> </button></em></td><td class="', zcls, '-btn-r"></td>',
			'</tr></tbody></table></td><td><table id="', uuid, '-last" name="',
			uuid, '-last"', zUtl.cellps0, ' class="', zcls, '-btn"><tbody><tr>',
			'<td class="', zcls, '-btn-l"></td><td class="', zcls,
			'-btn-m"><em unselectable="on"><button type="button" class="', zcls,
			'-last"> </button></em></td><td class="', zcls, '-btn-r"></td>',
			'</tr></tbody></table></td></tr></tbody></table>');
			
	if (this.isDetailed()) out.push(this._infoTags());
	out.push('</div>');
}

;zk._m['default']=

function (out) {
	if (this.getMold() == "os") {
		out.push('<div', this.domAttrs_(), '>', this._innerTags(), '</div>');
		return;
	}
	var uuid = this.uuid,
		zcls = this.getZclass();
	out.push('<div name="', uuid, '"', this.domAttrs_(), '>', '<table', zUtl.cellps0,
			'><tbody><tr><td><table id="', uuid, '-first" name="', uuid, '-first"',
			zUtl.cellps0, ' class="', zcls, '-btn"><tbody><tr>',
			'<td class="', zcls, '-btn-l"></td>',
			'<td class="', zcls, '-btn-m"><em unselectable="on">',
			'<button type="button" class="', zcls, '-first"> </button></em></td>',
			'<td class="', zcls, '-btn-r"></td></tr></tbody></table></td>',
			'<td><table id="', uuid, '-prev" name="', uuid, '-prev"', zUtl.cellps0,
			' class="', zcls, '-btn"><tbody><tr><td class="', zcls, '-btn-l"></td>',
			'<td class="', zcls, '-btn-m"><em unselectable="on"><button type="button" class="',
			zcls, '-prev"> </button></em></td><td class="', zcls, '-btn-r"></td>',
			'</tr></tbody></table></td><td><span class="', zcls, '-sep"></span></td>',
			'<td><span class="', zcls, '-text"></span></td><td><input id="',
			uuid, '-real" name="', uuid, '-real" type="text" class="', zcls,
			'-inp" value="', this.getActivePage() + 1, '" size="3"/></td>',
			'<td><span class="', zcls, '-text">/ ', this.getPageCount(), '</span></td>',
			'<td><span class="', zcls, '-sep"></span></td><td><table id="', uuid,
			'-next" name="', uuid, '-next"', zUtl.cellps0, ' class="', zcls, '-btn">',
			'<tbody><tr><td class="', zcls, '-btn-l"></td><td class="',
			zcls, '-btn-m"><em unselectable="on"><button type="button" class="',
			zcls, '-next"> </button></em></td><td class="', zcls, '-btn-r"></td>',
			'</tr></tbody></table></td><td><table id="', uuid, '-last" name="',
			uuid, '-last"', zUtl.cellps0, ' class="', zcls, '-btn"><tbody><tr>',
			'<td class="', zcls, '-btn-l"></td><td class="', zcls,
			'-btn-m"><em unselectable="on"><button type="button" class="', zcls,
			'-last"> </button></em></td><td class="', zcls, '-btn-r"></td>',
			'</tr></tbody></table></td></tr></tbody></table>');
			
	if (this.isDetailed()) out.push(this._infoTags());
	out.push('</div>');
}

;zkmld(zk._p.p.Paging,zk._m);


zul.mesh.Auxhead = zk.$extends(zul.mesh.HeadWidget, {
	
	getZclass: function () {
		return this._zclass == null ? "z-auxhead" : this._zclass;
	}
});

zkreg('zul.mesh.Auxhead');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), ' align="left">');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Auxhead,zk._m);


zul.mesh.Auxheader = zk.$extends(zul.mesh.HeaderWidget, {
	_colspan: 1,
	_rowspan: 1,

	$define: {
		
		
		colspan: function (v) {
			var n = this.$n();
			if (n) {
				n.colSpan = v;
				if (zk.ie) this.rerender(0); 
			}
		},
		
		
		rowspan: function (v) {
			var n = this.$n();
			if (n) {
				n.rowSpan = v;
				if (zk.ie) this.rerender(0); 
			}
		}
	},
	
	fixFaker_: zk.$void, 
	
	domAttrs_: function () {
		var s = this.$supers('domAttrs_', arguments), v;
		if ((v = this._colspan) != 1)
			s += ' colspan="' + v + '"';
		if ((v = this._rowspan) != 1)
			s += ' rowspan="' + v + '"';
		return s;
	},
	getZclass: function () {
		return this._zclass == null ? "z-auxheader" : this._zclass;
	}
});
zkreg('zul.mesh.Auxheader',true);zk._m={};
zk._m['default']=

function (out) {
	out.push('<th', this.domAttrs_(), '><div id="', this.uuid, '-cave" class="',
	this.getZclass(), '-cnt"', this.domTextStyleAttr_(), '>', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Auxheader,zk._m);

(function () {
	function _colspan(c) { 
		var v = zk.Widget.$(c)._colspan;
		return v ? v: 1;
	}
	function _fixaux(cells, from, to) {
		for (var j = 0, k = 0, cl = cells.length; j < cl; ++j) {
			var ke = k + _colspan( zk.Widget.$(cells[j]));
			if (from >= k && ke > from) { 
				for (; j < cl && k < to; ++j, k = ke) {
					var cell = cells[j],
						ke = k + _colspan(cell),
						v = from - k, v2 = ke - to;
					v = (v > 0 ? v: 0) + (v2 > 0 ? v2: 0);
					if (v) {
						cell.style.width = "";
					} else {
						cell.style.width = "0px";
					}
				}
				for (; j < cl; ++j) {
					var cell = cells[j];
					if (parseInt(cell.style.width) != 0)
						break; 
					cell.style.width = "";
				}
				return;
			}
			k = ke;
		}
	}
	
	function _onSizeLater(wgt) {		
		var parent = wgt.parent,
			bdfaker;
		if (!(bdfaker = parent.ebdfaker) && 
			(bdfaker = parent.ebodyrows[0]))
				bdfaker = bdfaker.$n();

		if (bdfaker) {
			var leftWidth = 0;
			for (var i = wgt._columns, n = bdfaker.firstChild; n && i--; n = n.nextSibling)
				leftWidth += n.offsetWidth;

			wgt.$n('cave').style.width = jq.px0(leftWidth);
			var scroll = wgt.$n('scrollX'),
				width = parent.$n('body').offsetWidth;
			
			width -= leftWidth;
			scroll.style.width = jq.px0(width);
			
			var scrollScale = bdfaker.childNodes.length - wgt._columns -
					2;
			
			scroll.firstChild.style.width = jq.px0(width + 50 * scrollScale);
			wgt.syncScorll();
		}
	}


zul.mesh.Frozen = zk.$extends(zul.Widget, {
	_start: 0,
	
	$define: {
    	
    	
		columns: [function(v) {
			return v < 0 ? 0 : v;
		}, function(v) {
			if (this._columns) {
				if (this.desktop) {
					this.onShow();
					this.syncScorll();
				}
			} else this.rerender();
		}],
		
		
		start: function () {
			this.syncScorll();
		}
	},
	
	syncScorll: function () {
		var scroll = this.$n('scrollX');
		if (scroll)
			scroll.scrollLeft = this._start * 50;
	},
	getZclass: function () {
		return this._zclass == null ? "z-frozen" : this._zclass;
	},
	onShow: _zkf = function () {
		if (!this._columns) return;
		var self = this;
		
		setTimeout(function () {
			_onSizeLater(self);
		});
	},
	onSize: _zkf,
	_onScroll: function (evt) {
		if (!evt.data || !zk.currentFocus) return;
		var p, index, td, frozen = this, 
			fn = function () {
				if (zk.currentFocus &&
					(td = p.getFocusCell(zk.currentFocus.$n())) && 
						(index = td.cellIndex - frozen._columns) >= 0) {
					frozen.setStart(index);
					p.ebody.scrollLeft = 0;
				}
			};
			
		if (p = this.parent) {
			if (zk.ie)
				setTimeout(fn, 0);
			else fn();
		}
		evt.stop();
	},
	bind_: function () {
		this.$supers(zul.mesh.Frozen, 'bind_', arguments);
		zWatch.listen({onShow: this, onSize: this});
		var scroll = this.$n('scrollX'),
			gbody = this.parent.$n('body');

		this.$n().style.height = this.$n('cave').style.height = scroll.style.height
			 = scroll.firstChild.style.height = jq.px0(jq.scrollbarWidth());

		this.parent.listen({onScroll: this.proxy(this._onScroll)}, -1000);
		this.domListen_(scroll, 'onScroll');

		if (gbody)
			jq(gbody).addClass('z-word-nowrap').css('overflow-x', 'hidden');
	},
	unbind_: function () {
		zWatch.unlisten({onShow: this, onSize: this});
		var p;
		if ((p = this.parent) && (p = p.$n('body')))
			jq(p).removeClass('z-word-nowrap').css('overflow-x', '');
		this.$supers(zul.mesh.Frozen, 'unbind_', arguments);
	},
	_doScroll: function (evt) {
		var scroll = this.$n('scrollX'),
			num = Math.ceil(scroll.scrollLeft / 50);
		if (this._lastScale == num)
			return;
		this._lastScale = num;
		this._doScrollNow(num);
		this.smartUpdate('start', num);
		this._start = num;
	},
	_syncFrozen: function () { 
		this._scrlcnt = (this._scrlcnt||0) + 1;
		var self = this;
		return setTimeout(function () {
				var num;
				if (!--self._scrlcnt && (num = self._start))
					self._doScrollNow(num, true);
			}, 10);
	},
	_doScrollNow: function (num, force) {
		var width = this.$n('cave').offsetWidth,
			mesh = this.parent,
			cnt = num,
			rows = mesh.ebodyrows;

		if (mesh.head) {
			
			for (var faker, n = mesh.head.firstChild.$n('hdfaker'); n;
					n = n.nextSibling) {
				if (n.style.width.indexOf('px') == -1) {
					var sw = n.style.width = jq.px0(n.offsetWidth),
						wgt = zk.Widget.$(n);
					if (!wgt.$instanceof(zul.mesh.HeadWidget)) {
						if ((faker = wgt.$n('bdfaker')))
							faker.style.width = sw;
						if ((faker = wgt.$n('ftfaker')))
							faker.style.width = sw;
					}
				}
			}
			var colhead = mesh.head.getChildAt(this._columns).$n(), isVisible, hdWgt, shallUpdate, cellWidth;
			for (var display, faker, index = this._columns,
					tail = mesh.head.nChildren - index,
					n = colhead;
					n; n = n.nextSibling, index++, tail--) {
				
				isVisible = (hdWgt = zk.Widget.$(n)) && hdWgt.isVisible();
				shallUpdate = false;
				if (cnt-- <= 0) {
					if (force || parseInt(n.style.width) == 0) {
						cellWidth = hdWgt._origWd || n.style.width;
						hdWgt._origWd = null;
						shallUpdate = true;
					}
				} else if (force || parseInt(n.style.width) != 0) {
					faker = jq('#' + n.id + '-hdfaker')[0];
					hdWgt._origWd = hdWgt._origWd || faker.style.width || jq.px0(jq(faker).outerWidth());
					cellWidth = '0px';
					shallUpdate = true;
				}
				
				if (force || shallUpdate) {
					n.style.width = cellWidth;
					if ((faker = jq('#' + n.id + '-hdfaker')[0]))
						faker.style.width = cellWidth;
					if ((faker = jq('#' + n.id + '-bdfaker')[0]) && isVisible)
						faker.style.width = cellWidth;
					if ((faker = jq('#' + n.id + '-ftfaker')[0]))
						faker.style.width = cellWidth;

					
					if (mesh.foot) {
						var eFootTbl = mesh.efoottbl;
						
						if (eFootTbl) {
							var tBodies = eFootTbl.tBodies;
							
							if (tBodies) {
								tBodies[tBodies.length - 1].rows[0].cells[ofs].style.width = cellWidth;
							}
						}
					}
				}
			}

			
			for (var hdr = colhead.parentNode, hdrs = hdr.parentNode.rows,
				i = hdrs.length, r; i--;)
				if ((r = hdrs[i]) != hdr) 
					_fixaux(r.cells, this._columns, this._columns + num);

			for (var n = mesh.head.getChildAt(this._columns + num).$n('hdfaker');
					n; n = n.nextSibling)
				width += zk.parseInt(n.style.width);

		} else if (!rows || !rows.length) {
			return;
		} else {
			
			
			for (var index = this._columns, c = rows[0].firstChild; c; c = c.nextSibling) {
				if (c.style.width.indexOf('px') == -1)
					c.style.width = jq.px0(zk(c).revisedWidth(c.offsetWidth));
			}

			for (var first = rows[0], display, index = this._columns,
					len = first.childNodes.length; index < len; index++) {
				display = cnt-- <= 0 ? '' : 'none';
				for (var r = first; r; r = r.nextSibling)
					r.cells[index].style.display = display;
			}

			for (var c = rows[0].cells[this._columns + num]; c; c = c.nextSibling)
				width += zk.parseInt(c.style.width);
		}

		width = jq.px0(width);
		if (mesh.eheadtbl)
			mesh.eheadtbl.style.width = width;
		if (mesh.ebodytbl)
			mesh.ebodytbl.style.width = width;
		if (mesh.efoottbl)
			mesh.efoottbl.style.width = width;

		mesh._restoreFocus();
	}
});

})();
zkreg('zul.mesh.Frozen',true);zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass();
		
	out.push('<div', this.domAttrs_(), '><div id="', uuid, '-cave" class="', zcls,
			'-body">');
	
	for (var j = 0, w = this.firstChild; w; w = w.nextSibling, j++)
		w.redraw(out);
		
	out.push('</div><div id="', uuid, '-scrollX" class="', zcls, '-inner" tabindex="-1"><div></div></div>',
			'<div class="z-clear"></div></div>');
}

;zkmld(zk._p.p.Frozen,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.mesh',1);
