zk.load('zul',function(){zk._p=zkpi('zul.layout',true);try{



(function () {

	var _ambit = {
		'north': function (ambit, center, width, height) {
			ambit.w = width - ambit.w;
			center.y = ambit.ts;
			center.h -= ambit.ts;
		},
		'south': function (ambit, center, width, height) {
			ambit.w = width - ambit.w;
			ambit.y = height - ambit.y;
			center.h -= ambit.ts;
		},
		'east': function (ambit, center, width) {
			ambit.y += center.y;
			ambit.h = center.h - ambit.h;
			ambit.x = width - ambit.x;
			center.w -= ambit.ts;
		},
		'west': function (ambit, center) {
			ambit.y += center.y;
			ambit.h = center.h - ambit.h;
			center.x += ambit.ts;
			center.w -= ambit.ts;
		}
	};

var Borderlayout =

zul.layout.Borderlayout = zk.$extends(zul.Widget, {
	_ignoreOffsetTop: zk.ie7_ || zk.ie6_,  
	setResize: function () {
		this.resize();
	},
	
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		var BL = zul.layout.Borderlayout;
		if (child.getPosition() == BL.NORTH)
			this.north = child;
		else if (child.getPosition() == BL.SOUTH)
			this.south = child;
		else if (child.getPosition() == BL.CENTER)
			this.center = child;
		else if (child.getPosition() == BL.WEST)
			this.west = child;
		else if (child.getPosition() == BL.EAST)
			this.east = child;
		this.resize();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.north)
			this.north = null;
		else if (child == this.south)
			this.south = null;
		else if (child == this.center)
			this.center = null;
		else if (child == this.west)
			this.west = null;
		else if (child == this.east)
			this.east = null;
		if (!this.childReplacing_)
			this.resize();
	},
	getZclass: function () {
		return this._zclass == null ? "z-borderlayout" : this._zclass;
	},
	bind_: function () {
		this.$supers(Borderlayout, 'bind_', arguments);
		zWatch.listen({onSize: this, onShow: this});
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(Borderlayout, 'unbind_', arguments);
	},
	
	afterChildrenFlex_: function () {
		
		
		if (this._isOnSize)
			this._resize(true);
	},
	
	afterChildrenMinFlex_: function() {
		
		
		if (!this._isOnSize) {
			this._resize(true);
			this._isOnSize = false;
		}
	},
	
	resize: function () {
		if (this.desktop)
			this._resize();
	},
	_resize: function (isOnSize) {
		this._isOnSize = isOnSize;
		if (!this.isRealVisible()) return;

		
		var rs = ['north', 'south', 'west', 'east'], k = rs.length; 
		for (var region, j = 0; j < k; ++j) {
			region = this[rs[j]];
			if (region && zk(region.$n()).isVisible()
				&& ((region._nvflex && region._vflexsz === undefined) 
						|| (region._nhflex && region._hflexsz === undefined)))
				return;	
						
						
						
						
		}

		var el = this.$n(),
			width = el.offsetWidth,
			height = el.offsetHeight,
			center = { 
				x: 0,
				y: 0,
				w: width,
				h: height
			};
		
		
		if (zk.opera && !height && (!el.style.height || el.style.height == '100%')) {
			var parent = el.parentNode;
			center.h = height = zk(parent).revisedHeight(parent.offsetHeight);
		}
		
		for (var region, ambit, margin,	j = 0; j < k; ++j) {
			region = this[rs[j]];
			if (region && zk(region.$n()).isVisible()) {
				ambit = region._ambit();
				_ambit[rs[j]](ambit, center, width, height);
				this._resizeWgt(region, ambit); 
			}
		}
		if (this.center && zk(this.center.$n()).isVisible()) {
			var mars = this.center.getCurrentMargins_();
			center.x += mars.left;
			center.y += mars.top;
			center.w -= mars.left + mars.right;
			center.h -= mars.top + mars.bottom;
			this._resizeWgt(this.center, center); 
		}
		this._isOnSize = false; 
	},
	_resizeWgt: function (wgt, ambit, ignoreSplit) {
		if (wgt._open) {
			if (!ignoreSplit && wgt.$n('split')) {
				wgt._fixSplit();
				 ambit = wgt._reszSplt(ambit);
			}
			zk.copy(wgt.$n('real').style, {
				left: jq.px(ambit.x),
				top: jq.px(ambit.y)
			});
			this._resizeBody(wgt, ambit);
		} else {
			wgt.$n('split').style.display = "none";
			var colled = wgt.$n('colled');
			if (colled) {
				var $colled = zk(colled);
				zk.copy(colled.style, {
					left: jq.px(ambit.x),
					top: jq.px(ambit.y),
					width: jq.px0($colled.revisedWidth(ambit.w)),
					height: jq.px0($colled.revisedHeight(ambit.h))
				});
			}
		}
	},
	_resizeBody: function (wgt, ambit) {
		ambit.w = Math.max(0, ambit.w);
		ambit.h = Math.max(0, ambit.h);
		var el = wgt.$n('real'),
			fchild = wgt.isFlex() && wgt.firstChild,
			bodyEl = fchild ? wgt.firstChild.$n() : wgt.$n('cave');
		if (!this._ignoreResize(el, ambit.w, ambit.h)) {
			ambit.w = zk(el).revisedWidth(ambit.w);
			el.style.width = jq.px0(ambit.w);
			ambit.w = zk(bodyEl).revisedWidth(ambit.w);
			bodyEl.style.width = jq.px0(ambit.w);
			
			ambit.h = zk(el).revisedHeight(ambit.h);
			el.style.height = jq.px0(ambit.h);
			
			if ((zk.ie6_ || zk.ie7_) && fchild) {
				
				var cv;
				if (cv = wgt.$n('cave'))
					cv.style.height = jq.px0(ambit.h);
			}
			ambit.h = zk(bodyEl).revisedHeight(ambit.h);
			if (wgt.$n('cap'))
				ambit.h = Math.max(0, ambit.h - wgt.$n('cap').offsetHeight);
			bodyEl.style.height = jq.px0(ambit.h);
			if (wgt.isAutoscroll()) { 
				bodyEl.style.overflow = "auto";
				bodyEl.style.position = "relative";
			} else {
				bodyEl.style.overflow = "hidden";
				bodyEl.style.position = "";
			}
			if (!this._isOnSize) {
				zWatch.fireDown('beforeSize', wgt);
				zWatch.fireDown('onSize', wgt);
			}
		}
	},
	_ignoreResize : function(el, w, h) { 
		if (el._lastSize && el._lastSize.width == w && el._lastSize.height == h) {
			return true;
		} else {
			el._lastSize = {width: w, height: h};
			return false;
		}
	},
	
	onSize: _zkf = function () {
		this._resize(true);
	},
	onShow: _zkf,
	isWatchable_: function(name) {
		
		return this.$supers('isWatchable_', arguments) || ((this._vflex=='min' || this._hflex=='min') && this.isRealVisible());
	}
}, {
	
	NORTH: "north",
	
	SOUTH: "south",
	
	EAST: "east",
	
	WEST: "west",
	
	CENTER: "center"
});

})();
zkreg('zul.layout.Borderlayout');zk._m={};
zk._m['default']=

function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
}

;zkmld(zk._p.p.Borderlayout,zk._m);


zul.layout.LayoutRegion = zk.$extends(zul.Widget, {
	_open: true,
	_border: "normal",
	_maxsize: 2000,
	_minsize: 0,

	$init: function () {
		this.$supers('$init', arguments);
		this._margins = [0, 0, 0, 0];
		this._cmargins = [3, 3, 3, 3]; 
	},

	$define: {
		
		
		flex: function () {
			this.rerender();
		},
		
		
		border: function (border) {
			if (!border || '0' == border)
				this._border = border = "none";
				
			if (this.desktop)
				(this.$n('real') || {})._lastSize = null;
				
			this.updateDomClass_();
		},
		
		
		title: function () {
			this.rerender();
		},
		
		
		splittable: function (splittable) {
			if (this.parent && this.desktop)
				this.parent.resize();
		},
		
		
		maxsize: null,
		
		
		minsize: null,
		
		
		collapsible: function (collapsible) {
			var btn = this.$n(this._open ? 'btn' : 'btned');
			if (btn)
				btn.style.display = collapsible ? '' : 'none';
		},
		
		
		autoscroll: function (autoscroll) {
			var cave = this.$n('cave');
			if (cave) {
				var bodyEl = this.isFlex() && this.firstChild ?
						this.firstChild.$n() : cave;
				if (autoscroll) {
					bodyEl.style.overflow = "auto";
					bodyEl.style.position = "relative";
					this.domListen_(bodyEl, "onScroll");
				} else {
					bodyEl.style.overflow = "hidden";
					bodyEl.style.position = "";
					this.domUnlisten_(bodyEl, "onScroll");
				}
			}
		},
		
		
		open: function (open, fromServer, nonAnima) {
			if (!this.$n() || !this.isCollapsible())
				return; 
	
			var colled = this.$n('colled'),
				real = this.$n('real');
			if (open) {
				
				if (fromServer) {
					
					
					if (!zk(this.$n()).isRealVisible()) {
						if (colled) {
							jq(real)[open ? 'show' : 'hide']();
							jq(colled)[!open ? 'show' : 'hide']();
						}
						return;
					}
					var s = this.$n('real').style;
					s.visibility = "hidden";
					s.display = "";
					this._syncSize(true);
					s.visibility = "";
					s.display = "none";
					this._open = true;
				}
				if (colled) {
					if (!nonAnima) 
						zk(colled).slideOut(this, {
							anchor: this.sanchor,
							duration: 200,
							afterAnima: this.$class.afterSlideOut
						});
					else {
						jq(real)[open ? 'show' : 'hide']();
						if (!open) zWatch.fireDown('onHide', this);
						jq(colled)[!open ? 'show' : 'hide']();
						if (open) zWatch.fireDown('onShow', this);
					}
				}
			} else {
				if (colled && !nonAnima) 
					zk(real).slideOut(this, {
							anchor: this.sanchor,
							beforeAnima: this.$class.beforeSlideOut,
							afterAnima: this.$class.afterSlideOut
						});
				else {
					if (colled)
						jq(colled)[!open ? 'show' : 'hide']();
					jq(real)[open ? 'show' : 'hide']();
				}
			}
			if (nonAnima) this.parent.resize();
			if (!fromServer) this.fire('onOpen', {open:open});
		}
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.layout.LayoutRegion, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.layout.LayoutRegion, 'setHflex', v);
	},
	
	getCmargins: function () {
		return zUtl.intsToString(this._open ? this._margins : this._cmargins);
	},
	
	setCmargins: function (cmargins) {
		if (this.getCmargins() != cmargins) {
			this._cmargins = zUtl.stringToInts(cmargins, 0);
			if (this.parent && this.desktop)
				this.parent.resize();
		}
	},
	
	getCurrentMargins_: function () {
		return zul.layout.LayoutRegion._aryToObject(this._open ? this._margins : this._cmargins);
	},
	
	getMargins: function () {
		return zUtl.intsToString(this._margins);
	},
	
	setMargins: function (margins) {
		if (this.getMargins() != margins) {
			this._margins = zUtl.stringToInts(margins, 0);
			if (this.parent && this.desktop)
				this.parent.resize();
		}
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var added = "normal" == this.getBorder() ? '' : this.getZclass() + "-noborder";
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	getZclass: function () {
		return this._zclass == null ? "z-" + this.getPosition() : this._zclass;
	},
	
	setWidth: function (width) {
		this._width = width;
		var real = this.$n('real');
		if (real) {
			real.style.width = width ? width : '';
			real._lastSize = null;
			this.parent.resize();
		}
		return this;
	},
	setHeight: function (height) {
		this._height = height;
		var real = this.$n('real');
		if (real) {
			real.style.height = height ? height : '';
			real._lastSize = null;
			this.parent.resize();
		}
		return this;
	},
	setVisible: function (visible) {
		if (this._visible != visible) {
			this.$supers('setVisible', arguments);
			var real = this.$n('real');
			if (real) {
				real.style.display = real.parentNode.style.display;
				this.parent.resize();
			}
		}
		return this;
	},
	
	setFlexSize_: function(sz) {
		var n = this.$n('real');
		if (sz.height !== undefined) {
			if (sz.height == 'auto')
				n.style.height = '';
			else if (sz.height == '')
				n.style.height = this._height ? this._height : '';
			else {
				var cave = this.$n('cave'),
					hgh = cave && this._vflex != 'min' ? (cave.offsetHeight + cave.offsetTop) : zk(n).revisedHeight(sz.height, true);   
				if (zk.ie) n.style.height = '';
				n.style.height = jq.px0(hgh);
			}
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto')
				n.style.width = '';
			else if (sz.width == '')
				n.style.width = this._width ? this._width : '';
			else {
				var wdh = zk(n).revisedWidth(sz.width, true);
				if (zk.ie) n.style.width = '';
				n.style.width = jq.px0(wdh);
			}
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	},
	updateDomClass_: function () {
		if (this.desktop) {
			var real = this.$n('real');
			if (real) {
				real.className = this.domClass_();
				if (this.parent) 
					this.parent.resize();
			}
		}
	},
	updateDomStyle_: function () {
		if (this.desktop) {
			var real = this.$n('real');
			if (real) {
				zk(real).clearStyles().jq.css(jq.parseStyle(this.domStyle_()));
				if (this.parent) 
					this.parent.resize();
			}
		}
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.layout.Borderlayout)) {
			this.setFlex(true);
			jq(this.$n()).addClass(this.getZclass() + "-nested");
		}
		
		
		(this.$n('real') || {})._lastSize = null;
		if (this.parent && this.desktop)
			this.parent.resize();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child.$instanceof(zul.layout.Borderlayout)) {
			this.setFlex(false);
			jq(this.$n()).removeClass(this.getZclass() + "-nested");
		}
		
		
		(this.$n('real') || {})._lastSize = null;
		if (this.parent && this.desktop && !this.childReplacing_)
			this.parent.resize();
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		if (this.parent)
			this.parent.resize();
		return this;
	},
	bind_: function(){
		this.$supers(zul.layout.LayoutRegion, 'bind_', arguments);
		if (this.getPosition() != zul.layout.Borderlayout.CENTER) {
			var split = this.$n('split');			
			if (split) {
				this._fixSplit();
				var vert = this._isVertical(),
					LR = this.$class;
				
				this._drag = new zk.Draggable(this, split, {
					constraint: vert ? 'vertical': 'horizontal',
					ghosting: LR._ghosting,
					snap: LR._snap,
					zIndex: 12000,
					overlay: true,
					initSensitivity: 0,
					ignoredrag: LR._ignoredrag,
					endeffect: LR._endeffect
				});
				
				if (!this._open) {
					var colled = this.$n('colled'),
						real = this.$n('real');
					if (colled)
						jq(colled).show();
					jq(real).hide();
				}
			}
		}
				
		var n = this.$n(),
			real = n.firstChild;
					
		if (this._open && !this.isVisible()) n.style.display = "none";
		
		if (this.isAutoscroll()) {
			var bodyEl = this.isFlex() && this.firstChild ?
					this.firstChild.$n() : this.$n('cave');
			this.domListen_(bodyEl, "onScroll");
		}
	},
	unbind_: function () {
		if (this.isAutoscroll()) {
			var bodyEl = this.isFlex() && this.firstChild ?
					this.firstChild.$n() : this.$n('cave');
			this.domUnlisten_(bodyEl, "onScroll");
		}
		if (this.$n('split')) {			
			if (this._drag) {
				this._drag.destroy();
				this._drag = null;
			}
		}
		this.$supers(zul.layout.LayoutRegion, 'unbind_', arguments);
	},
	doMouseOver_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('btn'):
			jq(this.$n('btn')).addClass(this.getZclass() + '-colps-over');
			break;
		case this.$n('btned'):
			jq(this.$n('btned')).addClass(this.getZclass() + '-exp-over');
			
		case this.$n('colled'):
			jq(this.$n('colled')).addClass(this.getZclass() + '-colpsd-over');
			break;
		case this.$n('splitbtn'):
			jq(this.$n('splitbtn')).addClass(this.getZclass() + '-splt-btn-over');
			break;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('btn'):
			jq(this.$n('btn')).removeClass(this.getZclass() + '-colps-over');
			break;
		case this.$n('btned'):
			jq(this.$n('btned')).removeClass(this.getZclass() + '-exp-over');
			
		case this.$n('colled'):
			jq(this.$n('colled')).removeClass(this.getZclass() + '-colpsd-over');
			break;
		case this.$n('splitbtn'):
			jq(this.$n('splitbtn')).removeClass(this.getZclass() + '-splt-btn-over');
			break;
		}
		this.$supers('doMouseOut_', arguments);		
	},
	doClick_: function (evt) {
		var target = evt.domTarget;
		switch (target) {
		case this.$n('btn'):
		case this.$n('btned'):
		case this.$n('splitbtn'):
			if (this._isSlide || zk.animating()) return;
			if (this.$n('btned') == target) {
				var s = this.$n('real').style;
				s.visibility = "hidden";
				s.display = "";
				this._syncSize(true);
				s.visibility = "";
				s.display = "none";
			}
			this.setOpen(!this._open);
			break;
		case this.$n('colled'):					
			if (this._isSlide) return;
			this._isSlide = true;
			var real = this.$n('real'),
				s = real.style;
			s.visibility = "hidden";
			s.display = "";
			this._syncSize();
			this._original = [s.left, s.top];
			this._alignTo();
			s.zIndex = 100;

			if (this.$n('btn'))
				this.$n('btn').style.display = "none"; 
			s.visibility = "";
			s.display = "none";
			zk(real).slideDown(this, {
				anchor: this.sanchor,
				afterAnima: this.$class.afterSlideDown
			});
			break;
		}
		this.$supers('doClick_', arguments);		
	},
	isWatchable_: function(name) {
		
		return this.$supers('isWatchable_', arguments) || ((this._vflex=='min' || this._hflex=='min') && this.isRealVisible());
	},
	_docClick: function (evt) {
		var target = evt.target;
		if (this._isSlide && !jq.isAncestor(this.$n('real'), target)) {
			if (this.$n('btned') == target) {
				this.$class.afterSlideUp.apply(this, [target]);
				this.setOpen(true, false, true);
			} else 
				if ((!this._isSlideUp && this.$class.uuid(target) != this.uuid) || !zk.animating()) {
					this._isSlideUp = true;
					zk(this.$n('real')).slideUp(this, {
						anchor: this.sanchor,
						afterAnima: this.$class.afterSlideUp
					});
				}
		}
	},
	_syncSize: function (inclusive) {
		var layout = this.parent,
			el = layout.$n(),
			width = el.offsetWidth,
			height = el.offsetHeight,
			center = {
				x: 0,
				y: 0,
				w: width,
				h: height
			};
		
		this._open = true;
		
		for (var region, ambit, margin,	rs = ['north', 'south', 'west', 'east'],
				j = 0, k = rs.length; j < k; ++j) {
			region = layout[rs[j]];
			if (region && (zk(region.$n()).isVisible()
			|| zk(region.$n('colled')).isVisible())) {
				var ignoreSplit = region == this,
					ambit = region._ambit(ignoreSplit),
					LR = this.$class;
				switch (rs[j]) {
				case 'north':
				case 'south':
					ambit.w = width - ambit.w;
					if (rs[j] == 'north') 
						center.y = ambit.ts;
					else
						ambit.y = height - ambit.y;
					center.h -= ambit.ts;
					if (ignoreSplit) {
						ambit.w = this.$n('colled').offsetWidth;
						if (inclusive) {
							var cmars = LR._aryToObject(this._cmargins);
							ambit.w += cmars.left + cmars.right;
						}
						layout._resizeWgt(region, ambit, true);
						this._open = false;
						return;
					}
					break;
				default:
					ambit.y += center.y;
					ambit.h = center.h - ambit.h;
					if (rs[j] == 'east')
						ambit.x = width - ambit.x;
					else center.x += ambit.ts;
					center.w -= ambit.ts;
					if (ignoreSplit) {
						ambit.h = this.$n('colled').offsetHeight;
						if (inclusive) {
							var cmars = LR._aryToObject(this._cmargins);
							ambit.h += cmars.top + cmars.bottom;
						}
						layout._resizeWgt(region, ambit, true);
						this._open = false;
						return;
					}
					break;
				}
			}
		}
	},
	_alignTo: function () {
		var from = this.$n('colled'),
			to = this.$n('real'),
			BL = zul.layout.Borderlayout;
		switch (this.getPosition()) {
		case BL.NORTH:
			to.style.top = jq.px(from.offsetTop + from.offsetHeight);
			to.style.left = jq.px(from.offsetLeft);
			break;
		case BL.SOUTH:
			to.style.top = jq.px(from.offsetTop - to.offsetHeight);
			to.style.left = jq.px(from.offsetLeft);
			break;
		case BL.WEST:
			to.style.left = jq.px(from.offsetLeft + from.offsetWidth);
			to.style.top = jq.px(from.offsetTop);
			break;
		case BL.EAST:
			to.style.left = jq.px(from.offsetLeft - to.offsetWidth);
			to.style.top = jq.px(from.offsetTop);
			break;
		}
	},
	_doScroll: function () {
		zWatch.fireDown('onScroll', this);
	},
	_fixSplit: function () {
		jq(this.$n('split'))[this._splittable ? 'show' : 'hide']();
	},
	_isVertical : function () {
		var BL = zul.layout.Borderlayout;
		return this.getPosition() != BL.WEST &&
				this.getPosition() != BL.EAST;
	},

	
	_ambit: function (ignoreSplit) {
		var ambit, mars = this.getCurrentMargins_(), region = this.getPosition();
		if (region && !this._open) {
			var colled = this.$n('colled');
			ambit = {
				x: mars.left,
				y: mars.top,
				w: colled ? colled.offsetWidth : 0,
				h: colled ? colled.offsetHeight : 0
			};
			ignoreSplit = true;
		} else {
			var pn = this.parent.$n(),
				w = this.getWidth() || '',
				h = this.getHeight() || '',
				pert;
			ambit = {
				x: mars.left,
				y: mars.top,
				w: (pert = w.indexOf('%')) > 0 ?
					Math.max(
						Math.floor(pn.offsetWidth * zk.parseInt(w.substring(0, pert)) / 100),
						0) : this.$n('real').offsetWidth, 
				h: (pert = h.indexOf('%')) > 0 ?
					Math.max(
						Math.floor(pn.offsetHeight * zk.parseInt(h.substring(0, pert)) / 100),
						0) : this.$n('real').offsetHeight
			};
		}
		var split = ignoreSplit ? {offsetHeight:0, offsetWidth:0}: this.$n('split') || {offsetHeight:0, offsetWidth:0};
		if (!ignoreSplit) this._fixSplit();

		this._ambit2(ambit, mars, split);
		return ambit;
	},
	_ambit2: zk.$void,

	_reszSplt: function (ambit) {
		var split = this.$n('split'),
			sbtn = this.$n('splitbtn');
		if (zk(split).isVisible()) {
			if (zk(sbtn).isVisible()) {
				if (this._isVertical()) 
					sbtn.style.marginLeft = jq.px0(((ambit.w - sbtn.offsetWidth) / 2));
				else
					sbtn.style.marginTop = jq.px0(((ambit.h - sbtn.offsetHeight) / 2));
			}
			zk.copy(split.style, this._reszSp2(ambit, {
				w: split.offsetWidth,
				h: split.offsetHeight
			}));
		}
		return ambit;
	},
	_reszSp2: zk.$void
},{
	_aryToObject: function (array) {
		return {top: array[0], left: array[1], right: array[2], bottom: array[3]};
	},
	
	
	beforeSlideOut: function (n) {
		var s = this.$n('colled').style;
		s.display = "";
		s.visibility = "hidden";
		s.zIndex = 1;
		this.parent.resize();
	},
	
	afterSlideOut: function (n) {
		if (this._open) 
			zk(this.$n('real')).slideIn(this, {
				anchor: this.sanchor,
				afterAnima: this.$class.afterSlideIn
			});
		else {
			var colled = this.$n('colled'),
				s = colled.style;
			s.zIndex = ""; 
			s.visibility = "";
			zk(colled).slideIn(this, {
				anchor: this.sanchor,				
				duration: 200
			});
		}
	},
	
	afterSlideIn: function (n) {
		this.parent.resize();
	},
	
	afterSlideDown: function (n) {
		jq(document).click(this.proxy(this._docClick));
	},
	
	afterSlideUp: function (n) {
		var s = n.style;
		s.left = this._original[0];
		s.top = this._original[1];
		n._lastSize = null;
		s.zIndex = "";
		if (this.$n('btn'))
			this.$n('btn').style.display = "";
		jq(document).unbind("click", this.proxy(this._docClick));
		this._isSlideUp = this._isSlide = false;
	},
	
	_ignoredrag: function (dg, pointer, evt) {
			var target = evt.domTarget,
				wgt = dg.control;
			if (!target || target != wgt.$n('split')) return true;
			if (wgt.isSplittable() && wgt._open) {			
				var BL = zul.layout.Borderlayout,
					pos = wgt.getPosition(),
					maxs = wgt.getMaxsize(),
					mins = wgt.getMinsize(),
					ol = wgt.parent,
					real = wgt.$n('real'),
					mars = zul.layout.LayoutRegion._aryToObject(wgt._margins),
					pbw = zk(real).padBorderWidth(),
					lr = pbw + (pos == BL.WEST ? mars.left : mars.right),
					tb = pbw + (pos == BL.NORTH ? mars.top : mars.bottom),
					min = 0,
					uuid = wgt.uuid;
				switch (pos) {
				case BL.NORTH:	
				case BL.SOUTH:
					var r = ol.center || (pos == BL.NORTH ? ol.south : ol.north);
					if (r) {
						if (BL.CENTER == r.getPosition()) {
							var east = ol.east,
								west = ol.west;
							maxs = Math.min(maxs, (real.offsetHeight + r.$n('real').offsetHeight)- min);
						} else {
							maxs = Math.min(maxs, ol.$n().offsetHeight
									- r.$n('real').offsetHeight - r.$n('split').offsetHeight
									- wgt.$n('split').offsetHeight - min); 
						}
					} else {
						maxs = ol.$n().offsetHeight - wgt.$n('split').offsetHeight;
					}
					break;				
				case BL.WEST:
				case BL.EAST:
					var r = ol.center || (pos == BL.WEST ? ol.east : ol.west);
					if (r) {
						if (BL.CENTER == r.getPosition()) {
							maxs = Math.min(maxs, (real.offsetWidth
									+ zk(r.$n('real')).revisedWidth(r.$n('real').offsetWidth))- min);
						} else {
							maxs = Math.min(maxs, ol.$n().offsetWidth
									- r.$n('real').offsetWidth - r.$n('split').offsetWidth - wgt.$n('split').offsetWidth - min); 
						}
					} else {
						maxs = ol.$n().offsetWidth - wgt.$n('split').offsetWidth;
					}
					break;						
				}
				var ofs = zk(real).cmOffset();
				dg._rootoffs = {
					maxs: maxs,
					mins: mins,
					top: ofs[1] + tb,
					left : ofs[0] + lr,
					right : real.offsetWidth,
					bottom: real.offsetHeight
				};
				return false;
			}
		return true;
	},
	_endeffect: function (dg, evt) {
		var wgt = dg.control,
			keys = "";
		if (wgt._isVertical())
			wgt.setHeight(dg._point[1] + 'px');
		else
			wgt.setWidth(dg._point[0] + 'px');

		
		wgt.$n().style.zIndex = '';
			
		dg._rootoffs = dg._point = null;

		wgt.parent.resize();
		wgt.fire('onSize', zk.copy({
			width: wgt.$n('real').style.width,
			height: wgt.$n('real').style.height
		}, evt.data));
	},
	_snap: function (dg, pointer) {
		var wgt = dg.control,
			x = pointer[0],
			y = pointer[1],
			BL = zul.layout.Borderlayout,
			split = wgt.$n('split'),
			b = dg._rootoffs, w, h;
		switch (wgt.getPosition()) {
		case BL.NORTH:
			if (y > b.maxs + b.top) y = b.maxs + b.top;
			if (y < b.mins + b.top) y = b.mins + b.top;
			w = x;
			h = y - b.top;
			break;				
		case BL.SOUTH:
			if (b.top + b.bottom - y - split.offsetHeight > b.maxs) {
				y = b.top + b.bottom - b.maxs - split.offsetHeight;
				h = b.maxs;
			} else if (b.top + b.bottom - b.mins - split.offsetHeight <= y) {
				y = b.top + b.bottom - b.mins - split.offsetHeight;
				h = b.mins;
			} else h = b.top - y + b.bottom - split.offsetHeight;
			w = x;
			break;
		case BL.WEST:
			if (x > b.maxs + b.left) x = b.maxs + b.left;
			if (x < b.mins + b.left) x = b.mins + b.left;
			w = x - b.left;
			h = y;
			break;		
		case BL.EAST:			
			if (b.left + b.right - x - split.offsetWidth > b.maxs) {
				x = b.left + b.right - b.maxs - split.offsetWidth;
				w = b.maxs;
			} else if (b.left + b.right - b.mins - split.offsetWidth <= x) {
				x = b.left + b.right - b.mins - split.offsetWidth;
				w = b.mins;
			} else w = b.left - x + b.right - split.offsetWidth;
			h = y;
			break;						
		}
		dg._point = [w, h];
		return [x, y];
	},
	_ghosting: function (dg, ofs, evt) {
		var el = dg.node, $el = zk(el);
		jq(document.body).prepend('<div id="zk_layoutghost" style="font-size:0;line-height:0;background:#AAA;position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$el.offsetWidth()+'px;height:'+$el.offsetHeight()
			+'px;cursor:'+el.style.cursor+';"></div>');
		return jq("#zk_layoutghost")[0];
	}
});

zkreg('zul.layout.LayoutRegion');zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		noCenter = this.getPosition() != zul.layout.Borderlayout.CENTER,
		pzcls = this.parent.getZclass();
	out.push('<div id="', uuid,  '">', '<div id="', uuid, '-real"',
			this.domAttrs_({id: 1}), '>');
			
	if (this._title) {
		out.push('<div id="', uuid, '-cap" class="', zcls, '-header">');
		if (noCenter) {
			out.push('<div id="', uuid, '-btn" class="', pzcls,
					'-icon ', zcls, '-colps"');
			if (!this._collapsible)
				out.push(' style="display:none;"');
			out.push('></div>');
		}
		out.push(zUtl.encodeXML(this._title), '</div>');
	}
	out.push('<div id="', uuid, '-cave" class="', zcls, '-body">');
	
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	
	out.push('</div></div>');
	
	if (noCenter) {
		out.push('<div id="', uuid, '-split" class="', zcls, '-splt"><span id="'
			, uuid, '-splitbtn" class="', zcls, '-splt-btn"');
		if (!this._collapsible)
			out.push(' style="display:none;"');
		out.push('></span></div>', '<div id="', uuid, '-colled" class="', zcls,
				'-colpsd" style="display:none"><div id="',
				uuid, '-btned" class="', pzcls, '-icon ', zcls, '-exp"');
		if (!this._collapsible)
			out.push(' style="display:none;"');
				
		out.push('></div></div>');
	}
	out.push('</div>');
}
;zkmld(zk._p.p.LayoutRegion,zk._m);


zul.layout.North = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexHeight: true, 
	
	setWidth: zk.$void, 
	sanchor: 't',

	$init: function () {
		this.$supers('$init', arguments);
		this._cmargins = [3, 0, 0, 3];
	},
	
	getPosition: function () {
		return zul.layout.Borderlayout.NORTH;
	},
	
	getSize: _zkf.prototype.getHeight,
	
	setSize: _zkf.prototype.setHeight,

	_ambit2: function (ambit, mars, split) {
		ambit.w = mars.left + mars.right;
		ambit.h += split.offsetHeight;
		ambit.ts = ambit.y + ambit.h + mars.bottom; 
	},
	_reszSp2: function (ambit, split) {
		ambit.h -= split.h;
		return {
		  	left: jq.px0(ambit.x),
			top: jq.px0(ambit.y + ambit.h),
			width: jq.px0(ambit.w)
		};
	}
});
zkreg('zul.layout.North');

zul.layout.South = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexHeight: true, 
	
	setWidth: zk.$void, 
	sanchor: 'b',

	$init: function () {
		this.$supers('$init', arguments);
		this._cmargins = [3, 0, 0, 3];
	},
	
	getPosition: function () {
		return zul.layout.Borderlayout.SOUTH;
	},
	
	getSize: _zkf.prototype.getHeight,
	
	setSize: _zkf.prototype.setHeight,

	_ambit2: function (ambit, mars, split) {
		ambit.w = mars.left + mars.right;
		ambit.h += split.offsetHeight;
		ambit.ts = ambit.y + ambit.h + mars.bottom; 
		ambit.y = ambit.h + mars.bottom;
	},
	_reszSp2: function (ambit, split) {
		ambit.h -= split.h;
		ambit.y += split.h;
		return {
			left: jq.px0(ambit.x),
			top: jq.px0(ambit.y - split.h),
			width: jq.px0(ambit.w)
		};
	}
});
zkreg('zul.layout.South');

zul.layout.Center = zk.$extends(zul.layout.LayoutRegion, {
	_sumFlexWidth: true, 
	_maxFlexHeight: true, 
	
	
	setHeight: zk.$void,      
	
	setWidth: zk.$void,       
	
	setVisible: zk.$void,     
	
	getSize: zk.$void,        
	
	setSize: zk.$void,        
	
	setCmargins: zk.$void,    
	
	setSplittable: zk.$void,  
	
	setOpen: zk.$void,        
	
	setCollapsible: zk.$void, 
	
	setMaxsize: zk.$void,     
	
	setMinsize: zk.$void,     
	doMouseOver_: zk.$void,   
	doMouseOut_: zk.$void,    
	doClick_: zk.$void,       
	
	getPosition: function () {
		return zul.layout.Borderlayout.CENTER;
	}
});
zkreg('zul.layout.Center');

zul.layout.East = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexWidth: true, 
	_maxFlexHeight: true, 
	
	
	setHeight: zk.$void, 
	sanchor: 'r',

	$init: function () {
		this.$supers('$init', arguments);
		this._cmargins = [0, 3, 3, 0];
	},
	
	getPosition: function () {
		return zul.layout.Borderlayout.EAST;
	},
	
	getSize: _zkf.prototype.getWidth,
	
	setSize: _zkf.prototype.setWidth,

	_ambit2: function (ambit, mars, split) {
		ambit.w += split.offsetWidth;
		ambit.h = mars.top + mars.bottom;
		ambit.ts = ambit.x + ambit.w + mars.right; 
		ambit.x = ambit.w + mars.right; 
	},
	_reszSp2: function (ambit, split) {
		ambit.w -= split.w;
		ambit.x += split.w;
		return {
			left: jq.px0(ambit.x - split.w),
			top: jq.px0(ambit.y),
			height: jq.px0(ambit.h)
		};
	}
});
zkreg('zul.layout.East');

zul.layout.West = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexWidth: true, 
	_maxFlexHeight: true, 

	
	setHeight: zk.$void, 
	sanchor: 'l',
	
	$init: function () {
		this.$supers('$init', arguments);
		this._cmargins = [0, 3, 3, 0];
	},
	
	getPosition: function () {
		return zul.layout.Borderlayout.WEST;
	},
	
	getSize: _zkf.prototype.getWidth,
	
	setSize: _zkf.prototype.setWidth,

	_ambit2: function (ambit, mars, split) {
		ambit.w += split.offsetWidth;
		ambit.h = mars.top + mars.bottom;
		ambit.ts = ambit.x + ambit.w + mars.right; 
	},
	_reszSp2: function (ambit, split) {
		ambit.w -= split.w;
		return {
			left: jq.px0(ambit.x + ambit.w),
			top: jq.px0(ambit.y),
			height: jq.px0(ambit.h)
		};
	}
});

zkreg('zul.layout.West');
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.layout',1);