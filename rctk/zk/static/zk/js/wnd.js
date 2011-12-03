zk.load('zul.wgt',function(){zk._p=zkpi('zul.wnd',true);try{



(function () {
	var _modals = [], _lastfocus;

	function _syncMaximized(wgt) {
		if (!wgt._lastSize) return;
		var node = wgt.$n(),
			floated = wgt._mode != 'embedded',
			$op = floated ? jq(node).offsetParent() : jq(node).parent(),
			s = node.style;

		
		var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth,
			sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
		if (!floated) {
			sw -= $op.zk.paddingWidth();
			sw = $op.zk.revisedWidth(sw);
			sh -= $op.zk.paddingHeight();
			sh = $op.zk.revisedHeight(sh);
		}

		s.width = jq.px0(sw);
		s.height = jq.px0(sh);
	}

	
	function _startmove(dg) {
		
		var el = dg.node;
		if(el.style.top && el.style.top.indexOf("%") >= 0)
			 el.style.top = el.offsetTop + "px";
		if(el.style.left && el.style.left.indexOf("%") >= 0)
			 el.style.left = el.offsetLeft + "px";
		zWatch.fire('onFloatUp', dg.control); 
	}
	function _ghostmove(dg, ofs, evt) {
		var wnd = dg.control,
			el = dg.node;
		_hideShadow(wnd);
		var $el = jq(el),
			$top = $el.find('>div:first'),
			top = $top[0],
			header = $top.nextAll('div:first')[0],
			fakeT = jq(top).clone()[0],
			fakeH = jq(header).clone()[0];
		jq(document.body).prepend(
			'<div id="zk_wndghost" class="' + wnd.getZclass() + '-move-ghost" style="position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$el.zk.offsetWidth()+'px;height:'+$el.zk.offsetHeight()
			+'px;z-index:'+el.style.zIndex+'"><dl></dl></div>');
		dg._wndoffs = ofs;
		el.style.visibility = "hidden";
		var h = el.offsetHeight - top.offsetHeight - header.offsetHeight;
		el = jq("#zk_wndghost")[0];
		el.firstChild.style.height = jq.px0(zk(el.firstChild).revisedHeight(h));
		el.insertBefore(fakeT, el.firstChild);
		el.insertBefore(fakeH, el.lastChild);
		return el;
	}
	function _endghostmove(dg, origin) {
		var el = dg.node; 
		origin.style.top = jq.px(origin.offsetTop + el.offsetTop - dg._wndoffs[1]);
		origin.style.left = jq.px(origin.offsetLeft + el.offsetLeft - dg._wndoffs[0]);

		document.body.style.cursor = "";
	}
	function _ignoremove(dg, pointer, evt) {
		var el = dg.node,
			wgt = dg.control,
			tar = evt.domTarget, wtar;
		switch (tar) {
		case wgt.$n('close'):
		case wgt.$n('max'):
		case wgt.$n('min'):
			return true; 
		}
		if(wgt != (wtar = zk.Widget.$(tar)) && wgt.caption != wtar)
			return true; 
		if (!wgt.isSizable()
		|| (el.offsetTop + 4 < pointer[1] && el.offsetLeft + 4 < pointer[0]
		&& el.offsetLeft + el.offsetWidth - 4 > pointer[0]))
			return false; 
		return true;
	}
	function _aftermove(dg, evt) {
		dg.node.style.visibility = "";
		var wgt = dg.control;
		wgt.zsync();
		wgt._fireOnMove(evt.data);
	}

	function _doOverlapped(wgt) {
		var pos = wgt._position,
			n = wgt.$n(),
			$n = zk(n);
		if (!pos && (!n.style.top || !n.style.left)) {
			var xy = $n.revisedOffset();
			n.style.left = jq.px(xy[0]);
			n.style.top = jq.px(xy[1]);
		} else if (pos == "parent")
			_posByParent(wgt);

		$n.makeVParent();
		wgt.zsync();
		_updDomPos(wgt);
		wgt.setTopmost();
		_makeFloat(wgt);
	}
	function _doModal(wgt) {
		var pos = wgt._position,
			n = wgt.$n(),
			$n = zk(n);
		if (pos == "parent") _posByParent(wgt);

		$n.makeVParent();
		wgt.zsync();
		_updDomPos(wgt, true, false, true);

		
		var realVisible = wgt.isRealVisible();
		wgt.setTopmost();
		
		if (!wgt._mask) {
			var anchor = wgt._shadowWgt ? wgt._shadowWgt.getBottomElement(): null;
			wgt._mask = new zk.eff.FullMask({
				id: wgt.uuid + "-mask",
				anchor: anchor ? anchor: wgt.$n(),
				
				zIndex: wgt._zIndex,
				visible: realVisible
			});
		}
		if (realVisible)
			_markModal(wgt);

		_makeFloat(wgt);
	}
	function _markModal(wgt) {
		zk.currentModal = wgt;
		var wnd = _modals[0], fc = zk.currentFocus;
		if (wnd) wnd._lastfocus = fc;
		else _lastfocus = fc;
		_modals.unshift(wgt);

		
		
		
		
		setTimeout(function () {
			zk.afterAnimate(function () {
				if (!zUtl.isAncestor(wgt, zk.currentFocus))
					wgt.focus();
			}, -1)});
	}
	function _unmarkModal(wgt) {
		_modals.$remove(wgt);
		if (zk.currentModal == wgt) {
			var wnd = zk.currentModal = _modals[0],
				fc = wnd ? wnd._lastfocus: _lastfocus;
			if (!wnd)
				_lastfocus = null;
			if (!fc || !fc.desktop)
				fc = wnd;
			if (fc)
				if (wgt._updDOFocus === false)
					wgt._updDOFocus = fc; 
				else
					fc.focus(0); 
					
		}
		wgt._lastfocus = null;
	}
	
	function _posByParent(wgt) {
		var n = wgt.$n(),
			ofs = zk(zk(n).vparentNode(true)).revisedOffset();
		wgt._offset = ofs;
		n.style.left = jq.px(ofs[0] + zk.parseInt(wgt._left));
		n.style.top = jq.px(ofs[1] + zk.parseInt(wgt._top));
	}
	function _updDomOuter(wgt) {
		wgt._updDOFocus = false; 
		wgt.rerender(wgt._skipper);
		var cf;
		if (cf = wgt._updDOFocus) 
			cf.focus(10);
		delete wgt._updDOFocus;
	}
	
	function _updDomPos(wgt, force, posParent, minTop) {
		if (!wgt.desktop || wgt._mode == 'embedded')
			return;

		var n = wgt.$n(), pos = wgt._position;
		if (pos == "parent") {
			if (posParent)
				_posByParent(wgt);
			return;
		}
		if (!pos && !force)
			return;

		var st = n.style;
		st.position = "absolute"; 
		var ol = st.left, ot = st.top;
		if (pos != "nocenter")
			zk(n).center(pos);
		var sdw = wgt._shadowWgt;
		if (pos && sdw) {
			var opts = sdw.opts, l = n.offsetLeft, t = n.offsetTop;
			if (pos.indexOf("left") >= 0 && opts.left < 0)
				st.left = jq.px(l - opts.left);
			else if (pos.indexOf("right") >= 0 && opts.right > 0)
				st.left = jq.px(l - opts.right);
			if (pos.indexOf("top") >= 0 && opts.top < 0)
				st.top = jq.px(t - opts.top);
			else if (pos.indexOf("bottom") >= 0 && opts.bottom > 0)
				st.top = jq.px(t - opts.bottom);
		}

		if (minTop && !pos) { 
			var top = zk.parseInt(n.style.top), y = jq.innerY();
			if (y) {
				var y1 = top - y;
				if (y1 > 100) n.style.top = jq.px0(top - (y1 - 100));
			} else if (top > 100)
				n.style.top = "100px";
		}

		wgt.zsync();
		if (ol != st.left || ot != st.top)
			wgt._fireOnMove();
	}

	function _hideShadow(wgt) {
		var shadow = wgt._shadowWgt;
		if (shadow) shadow.hide();
	}
	function _makeSizer(wgt) {
		if (!wgt._sizer) {
			wgt.domListen_(wgt.$n(), 'onMouseMove');
			wgt.domListen_(wgt.$n(), 'onMouseOut');
			var Window = wgt.$class;
			wgt._sizer = new zk.Draggable(wgt, null, {
				stackup: true, 
				draw: Window._drawsizing,
				snap: Window._snapsizing,
				initSensitivity: 0,
				starteffect: Window._startsizing,
				ghosting: Window._ghostsizing,
				endghosting: Window._endghostsizing,
				ignoredrag: Window._ignoresizing,
				endeffect: Window._aftersizing});
		}
	}
	function _makeFloat(wgt) {
		var handle = wgt.$n('cap');
		if (handle && !wgt._drag) {
			jq(handle).addClass(wgt.getZclass() + '-header-move');
			var Window = wgt.$class;
			wgt._drag = new zk.Draggable(wgt, null, {
				handle: handle, stackup: true,
				fireOnMove: false,
				starteffect: _startmove,
				ghosting: _ghostmove,
				endghosting: _endghostmove,
				ignoredrag: _ignoremove,
				endeffect: _aftermove,
				zIndex: 99999 
			});
		}
	}

	function _isModal(mode) {
		return mode == 'modal' || mode == 'highlighted';
	}

var Window =

zul.wnd.Window = zk.$extends(zul.Widget, {
	_mode: 'embedded',
	_border: 'none',
	_minheight: 100,
	_minwidth: 200,
	_shadow: true,

	$init: function () {
		if (!zk.zkuery) this._fellows = {};

		this.$supers('$init', arguments);

		this.listen({onMaximize: this, onClose: this, onMove: this, onSize: this.onSizeEvent, onZIndex: this}, -1000);
		this._skipper = new zul.wnd.Skipper(this);
	},

	$define: { 
		
		
		mode: _zkf = function () {
			_updDomOuter(this);
		},
		
		
		title: _zkf,
		
		
		border: _zkf,
		
		
		closable: _zkf,
		
		
		sizable: function (sizable) {
			if (this.desktop) {
				if (sizable)
					_makeSizer(this);
				else if (this._sizer) {
					this._sizer.destroy();
					this._sizer = null;
				}
			}
		},
		
		
		maximizable: _zkf,
		
		
		minimizable: _zkf,
		
		
		maximized: function (maximized, fromServer) {
			var node = this.$n();
			if (node) {
				var $n = zk(node),
					isRealVisible = this.isRealVisible();
				if (!isRealVisible && maximized) return;

				var l, t, w, h, s = node.style, cls = this.getZclass();
				if (maximized) {
					jq(this.$n('max')).addClass(cls + '-maxd');

					var floated = this._mode != 'embedded',
						$op = floated ? jq(node).offsetParent() : jq(node).parent();
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;

					
					s.top = "-10000px";
					s.left = "-10000px";

					
					var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth,
						sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
					if (!floated) {
						sw -= $op.zk.paddingWidth();
						sw = $n.revisedWidth(sw);
						sh -= $op.zk.paddingHeight();
						sh = $n.revisedHeight(sh);
					}
					s.width = jq.px0(sw);
					s.height = jq.px0(sh);
					this._lastSize = {l:l, t:t, w:w, h:h};

					
					s.top = "0";
					s.left = "0";
					
					
					w = s.width;
					h = s.height;
				} else {
					var max = this.$n('max'),
						$max = jq(max);
					$max.removeClass(cls + "-maxd").removeClass(cls + "-maxd-over");
					if (this._lastSize) {
						s.left = this._lastSize.l;
						s.top = this._lastSize.t;
						s.width = this._lastSize.w;
						s.height = this._lastSize.h;
						this._lastSize = null;
					}
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;

					var body = this.$n('cave');
					if (body)
						body.style.width = body.style.height = "";
				}
				if (!fromServer || isRealVisible) {
					this._visible = true;
					this.fire('onMaximize', {
						left: l,
						top: t,
						width: w,
						height: h,
						maximized: maximized,
						fromServer: fromServer
					});
				}
				if (isRealVisible) {
					this.__maximized = true;
					zWatch.fireDown('beforeSize', this);
					zWatch.fireDown('onSize', this);
				}
			}
		},
		
		
		minimized: function (minimized, fromServer) {
			if (this._maximized)
				this.setMaximized(false);

			var node = this.$n();
			if (node) {
				var s = node.style, l = s.left, t = s.top, w = s.width, h = s.height;
				if (minimized) {
					zWatch.fireDown('onHide', this);
					jq(node).hide();
				} else {
					jq(node).show();
					zWatch.fireDown('onShow', this);
				}
				if (!fromServer) {
					this._visible = false;
					this.zsync();
					this.fire('onMinimize', {
						left: s.left,
						top: s.top,
						width: s.width,
						height: s.height,
						minimized: minimized
					});
				}
			}
		},
		
		
		contentStyle: _zkf,
		
		
		contentSclass: _zkf,
		
		
		position: function () {
			_updDomPos(this, false, this._visible);
		},
		
		
		minheight: null, 
		
		
		minwidth: null, 
		
		
		shadow: function () {
			if (this._shadow) {
				this.zsync();
			} else if (this._shadowWgt) {
				this._shadowWgt.destroy();
				this._shadowWgt = null;
			}
		}
	},
	
	repos: function () {
		_updDomPos(this, false, this._visible);
	},
	
	doOverlapped: function () {
		this.setMode('overlapped');
	},
	
	doPopup: function () {
		this.setMode('popup');
	},
	
	doHighlighted: function () {
		this.setMode('highlighted');
	},
	
	doModal: function () {
		this.setMode('modal');
	},
	
	doEmbedded: function () {
		this.setMode('embedded');
	},

	
	afterAnima_: function (visible) { 
		this.$supers('afterAnima_', arguments);
		this.zsync();
	},

	zsync: function () {
		this.$supers('zsync', arguments);
		if (this.desktop) {
			if (this._mode == 'embedded') {
				if (this._shadowWgt) {
					this._shadowWgt.destroy();
					this._shadowWgt = null;
				}
			} else if (this._shadow) {
				if (!this._shadowWgt)
					this._shadowWgt = new zk.eff.Shadow(this.$n(),
						{left: -4, right: 4, top: -2, bottom: 3});
				if (this._maximized || this._minimized || !this._visible) 
					_hideShadow(this);
				else
					this._shadowWgt.sync();
			}
			if (this._mask && this._shadowWgt) {
				var n = this._shadowWgt.getBottomElement()||this.$n(); 
				if (n) this._mask.sync(n);
			}
		}
	},

	
	onClose: function () {
		if (!this.inServer) 
			this.parent.removeChild(this); 
	},
	onMove: function (evt) {
		this._left = evt.left;
		this._top = evt.top;
	},
	onMaximize: function (evt) {
		var data = evt.data;
		this._top = data.top;
		this._left = data.left;
		this._height = data.height;
		this._width = data.width;
	},
	onSizeEvent: function (evt) {
		var data = evt.data,
			node = this.$n(),
			s = node.style;
			
		_hideShadow(this);
		if (data.width != s.width) {
			s.width = data.width;
			this._fixWdh();
		}	
		if (data.height != s.height) {
			s.height = data.height;
			this._fixHgh();
		}
				
		if (data.left != s.left || data.top != s.top) {
			s.left = data.left;
			s.top = data.top;
			this._fireOnMove(evt.keys);
		}
		
		this.zsync();
		var self = this;
		setTimeout(function() {
			zWatch.fireDown('beforeSize', self);
			zWatch.fireDown('onSize', self);
		}, zk.ie6_ ? 800: 0);
	},
	onZIndex: _zkf = function (evt) {
		this.zsync();
	},
	
	onResponse: _zkf,
	onShow: function (ctl) {
		var w = ctl.origin;
		if (this != w && this._mode != 'embedded'
		&& this.isRealVisible({until: w, dom: true})) {
			zk(this.$n()).cleanVisibility();
			this.zsync();
		}
		this.onSize(w);
	},
	onHide: function (ctl) {
		var w = ctl.origin;
		if (this != w && this._mode != 'embedded'
		&& this.isRealVisible({until: w, dom: true})) {
		
		
		
		
			this.$n().style.visibility = 'hidden';
			this.zsync();
		}
	},
	beforeSize: function() {
		
		if (this._maximized && !this.__maximized) 
			this.$n().style.width="";
	},
	onSize: function() {
		_hideShadow(this);
		if (this._maximized) {
			if (!this.__maximized)
				_syncMaximized(this);
			this.__maximized = false; 
		}
		this._fixHgh();
		this._fixWdh();
		if (this._mode != 'embedded')
			_updDomPos(this);
		this.zsync();
	},
	onFloatUp: function (ctl) {
		if (!this._visible || this._mode == 'embedded')
			return; 

		var wgt = ctl.origin;
		if (this._mode == 'popup') {
			for (var floatFound; wgt; wgt = wgt.parent) {
				if (wgt == this) {
					if (!floatFound) this.setTopmost();
					return;
				}
				floatFound = floatFound || wgt.isFloating_();
			}
			this.setVisible(false);
			this.fire('onOpen', {open:false});
		} else
			for (; wgt; wgt = wgt.parent) {
				if (wgt == this) {
					this.setTopmost();
					return;
				}
				if (wgt.isFloating_())
					return;
			}
	},
	_fixWdh: zk.ie7_ ? function () {
		if (this._mode != 'embedded' && this._mode != 'popup' && this.isRealVisible()) {
			var n = this.$n(),
				cave = this.$n('cave').parentNode,
				wdh = n.style.width,
				$n = jq(n),
				$tl = $n.find('>div:first'),
				tl = $tl[0],
				hl = tl && this.$n("cap") ? $tl.nextAll('div:first')[0]: null,
				bl = $n.find('>div:last')[0];

			if (!wdh || wdh == "auto") {
				var $cavp = zk(cave.parentNode),
					diff = $cavp.padBorderWidth() + zk(cave.parentNode.parentNode).padBorderWidth();
				if (tl) tl.firstChild.style.width = jq.px0(cave.offsetWidth + diff);
				if (hl) hl.firstChild.firstChild.style.width = jq.px(cave.offsetWidth
					- (zk(hl).padBorderWidth() + zk(hl.firstChild).padBorderWidth() - diff));
				if (bl) bl.firstChild.style.width = jq.px0(cave.offsetWidth + diff);
			} else {
				if (tl) tl.firstChild.style.width = "";
				if (hl) hl.firstChild.style.width = "";
				if (bl) bl.firstChild.style.width = "";
			}
		}
	} : zk.$void,
	_fixHgh: function () {
		if (this.isRealVisible()) {
			var n = this.$n(),
				hgh = n.style.height,
				cave = this.$n('cave'),
				cvh = cave.style.height;

			if (zk.ie6_ && hgh && hgh != "auto" && hgh != '100%')
				cave.style.height = "0";

			if (hgh && hgh != "auto") {
				zk(cave).setOffsetHeight(this._offsetHeight(n));
			} else if (cvh && cvh != "auto") {
				if (zk.ie6_) cave.style.height = "0";
				cave.style.height = "";
			}
		}
	},
	_offsetHeight: function (n) {
		var h = n.offsetHeight - this._titleHeight(n);
		if(zul.wnd.WindowRenderer.shallCheckBorder(this)) {
			var cave = this.$n('cave'),
				bl = jq(n).find('>div:last')[0],
				cap = this.$n("cap");
			h -= bl.offsetHeight;
			if (cave)
				h -= zk(cave.parentNode).padBorderHeight();
			if (cap)
				h -= zk(cap.parentNode).padBorderHeight();
		}
		return h - zk(n).padBorderHeight();
	},
	_titleHeight: function (n) {
		var cap = this.$n('cap'),
			$tl = jq(n).find('>div:first'), tl = $tl[0];
		return cap ? cap.offsetHeight + tl.offsetHeight:
			zul.wnd.WindowRenderer.shallCheckBorder(this) ? tl.offsetHeight: 0;
	},

	_fireOnMove: function (keys) {
		var pos = this._position, node = this.$n(),
			x = zk.parseInt(node.style.left),
			y = zk.parseInt(node.style.top);
		if (pos == 'parent') {
			var vp = zk(node).vparentNode();
			if (vp) {
				var ofs = zk(vp).revisedOffset();
				x -= ofs[0];
				y -= ofs[1];
			}
		}
		this.fire('onMove', zk.copy({
			left: x + 'px',
			top: y + 'px'
		}, keys), {ignorable: true});

	},
	
	setVisible: function (visible) {
		if (this._visible != visible) {
			if (this._maximized) {
				this.setMaximized(false);
			} else if (this._minimized) {
				this.setMinimized(false);
			}

			var modal = _isModal(this._mode);
			if (visible) {
				_updDomPos(this, modal, true, modal);
				if (modal && (!this.parent || this.parent.isRealVisible())) {
					this.setTopmost();
					_markModal(this);
				}
			} else if (modal)
				_unmarkModal(this);

			this.$supers('setVisible', arguments);

			if (!visible)
				this.zsync();
		}
	},
	setHeight: function (height) {
		this.$supers('setHeight', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this); 
		}
	},
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setTop: function () {
		_hideShadow(this);
		this.$supers('setTop', arguments);
		this.zsync();

	},
	setLeft: function () {
		_hideShadow(this);
		this.$supers('setLeft', arguments);
		this.zsync();
	},
	setZIndex: _zkf = function (zIndex) {
		var old = this._zIndex;
		this.$supers('setZIndex', arguments);
		if (old != zIndex) 
			this.zsync();
	},
	setZindex: _zkf,
	focus_: function (timeout) {
		var cap = this.caption;
		for (var w = this.firstChild; w; w = w.nextSibling)
			if (w != cap && w.focus_(timeout))
				return true;
		return cap && cap.focus_(timeout);
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-window-" + this._mode;
	},

	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.wgt.Caption))
			this.caption = child;
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.caption)
			this.caption = null;
	},
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments);
		if ((!no || !no.visible) && this._minimized)
			style = 'display:none;'+style;
		if (this._mode != 'embedded')
			style = "position:absolute;"+style;
		return style;
	},

	bind_: function (desktop, skipper, after) {
		this.$supers(Window, 'bind_', arguments);

		var mode = this._mode;
		zWatch.listen({onSize: this, onShow: this});

		
		if (zk.ie6_)
			zWatch.listen({beforeSize: this});

		if (mode != 'embedded') {
			zWatch.listen({onFloatUp: this, onHide: this});
			this.setFloating_(true);

			if (_isModal(mode)) _doModal(this);
			else _doOverlapped(this);
		}
		
		if (this._sizable)
			_makeSizer(this);

		if (this._maximizable && this._maximized) {
			var self = this;
			after.push(function() {
				self._maximized = false;
				self.setMaximized(true, true);
			});
		}

		if (this._mode != 'embedded' && (!zk.css3)) {
			jq.onzsync(this); 
			zWatch.listen({onResponse: this});
		}
	},
	unbind_: function () {
		var node = this.$n();
		zk(node).beforeHideOnUnbind();
		node.style.visibility = 'hidden'; 

		if (!zk.css3) jq.unzsync(this);

		
		if (this._shadowWgt) {
			this._shadowWgt.destroy();
			this._shadowWgt = null;
		}
		if (this._drag) {
			this._drag.destroy();
			this._drag = null;
		}
		if (this._sizer) {
			this._sizer.destroy();
			this._sizer = null;
		}

		if (this._mask) {
			this._mask.destroy();
			this._mask = null;
		}

		zk(node).undoVParent();
		zWatch.unlisten({
			onFloatUp: this,
			onSize: this,
			onShow: this,
			onHide: this,
			onResponse: this
		});
		if (zk.ie6_)
			zWatch.unlisten({beforeSize: this});
		this.setFloating_(false);

		_unmarkModal(this);

		this.domUnlisten_(this.$n(), 'onMouseMove');
		this.domUnlisten_(this.$n(), 'onMouseOut');
		this.$supers(Window, 'unbind_', arguments);
	},
	_doMouseMove: function (evt) {
		if (this._sizer && evt.target == this) {
			var n = this.$n(),
				c = this.$class._insizer(n, zk(n).revisedOffset(), evt.pageX, evt.pageY),
				handle = this._mode == 'embedded' ? false : this.$n('cap'),
				zcls = this.getZclass();
			if (!this._maximized && c) {
				if (this._backupCursor == undefined)
					this._backupCursor = n.style.cursor;
				n.style.cursor = c == 1 ? 'n-resize': c == 2 ? 'ne-resize':
					c == 3 ? 'e-resize': c == 4 ? 'se-resize':
					c == 5 ? 's-resize': c == 6 ? 'sw-resize':
					c == 7 ? 'w-resize': 'nw-resize';
				if (handle) jq(handle).removeClass(zcls + '-header-move');
			} else {
				n.style.cursor = this._backupCursor || ''; 
				if (handle) jq(handle).addClass(zcls + '-header-move');
			}
		}
	},
	_doMouseOut: function (evt) {
		this.$n().style.cursor = this._backupCursor || '';
	},
	doClick_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			this.fire('onClose');
			break;
		case this.$n('max'):
			this.setMaximized(!this._maximized);
			break;
		case this.$n('min'):
			this.setMinimized(!this._minimized);
			break;
		default:
			this.$supers('doClick_', arguments);
			return;
		}
		evt.stop();
	},
	doMouseOver_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).addClass(this.getZclass() + '-close-over');
			break;
		case this.$n('max'):
			var zcls = this.getZclass(),
				added = this._maximized ? ' ' + zcls + '-maxd-over' : '';
			jq(this.$n('max')).addClass(zcls + '-max-over' + added);
			break;
		case this.$n('min'):
			jq(this.$n('min')).addClass(this.getZclass() + '-min-over');
			break;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).removeClass(this.getZclass() + '-close-over');
			break;
		case this.$n('max'):
			var zcls = this.getZclass(),
				$max = jq(this.$n('max'));
			if (this._maximized)
				$max.removeClass(zcls + '-maxd-over');
			$max.removeClass(zcls + '-max-over');
			break;
		case this.$n('min'):
			jq(this.$n('min')).removeClass(this.getZclass() + '-min-over');
			break;
		}
		this.$supers('doMouseOut_', arguments);
	},
	
	afterChildrenMinFlex_: function (orient) {
		this.$supers('afterChildrenMinFlex_', arguments);
		if (_isModal(this._mode)) 
			_updDomPos(this, true); 
	},
	
	afterChildrenFlex_: function (cwgt) {
		this.$supers('afterChildrenFlex_', arguments);
		if (_isModal(this._mode))
			_updDomPos(this, true); 
	},
	
	ignoreFlexSize_: function (type) {
		return this._mode != 'embedded';
	}
},{ 
	
	_startsizing: function (dg) {
		zWatch.fire('onFloatUp', dg.control); 
	},
	_snapsizing: function (dg, pos) {
		
		px = (dg.z_dir >= 6 && dg.z_dir <= 8) ? 
				Math.max(pos[0], 0) : pos[0];
		
		py = (dg.z_dir == 8 || dg.z_dir <= 2) ? 
				Math.max(pos[1], 0) : pos[1];
		return [px, py];
	},
	_ghostsizing: function (dg, ofs, evt) {
		var wnd = dg.control,
			el = dg.node;
		_hideShadow(wnd);
		wnd.setTopmost();
		var $el = jq(el);
		jq(document.body).append(
			'<div id="zk_ddghost" class="' + wnd.getZclass() + '-resize-faker"'
			+' style="position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$el.zk.offsetWidth()+'px;height:'+$el.zk.offsetHeight()
			+'px;z-index:'+el.style.zIndex+'"><dl></dl></div>');
		return jq('#zk_ddghost')[0];
	},
	_endghostsizing: function (dg, origin) {
		var el = dg.node; 
		if (origin) {
			dg.z_szofs = {
				top: el.offsetTop + 'px', left: el.offsetLeft + 'px',
				height: jq.px0(zk(el).revisedHeight(el.offsetHeight)),
				width: jq.px0(zk(el).revisedWidth(el.offsetWidth))
			};
		}
	},
	_insizer: function(node, ofs, x, y) {
		var r = ofs[0] + node.offsetWidth, b = ofs[1] + node.offsetHeight;
		if (x - ofs[0] <= 5) {
			if (y - ofs[1] <= 5)
				return 8;
			else if (b - y <= 5)
				return 6;
			else
				return 7;
		} else if (r - x <= 5) {
			if (y - ofs[1] <= 5)
				return 2;
			else if (b - y <= 5)
				return 4;
			else
				return 3;
		} else {
			if (y - ofs[1] <= 5)
				return 1;
			else if (b - y <= 5)
				return 5;
		}
	},
	_ignoresizing: function (dg, pointer, evt) {
		var el = dg.node,
			wgt = dg.control;
		if (wgt._maximized) return true;

		var offs = zk(el).revisedOffset(),
			v = wgt.$class._insizer(el, offs, pointer[0], pointer[1]);
		if (v) {
			_hideShadow(wgt);
			dg.z_dir = v;
			dg.z_box = {
				top: offs[1], left: offs[0] ,height: el.offsetHeight,
				width: el.offsetWidth, minHeight: zk.parseInt(wgt.getMinheight()),
				minWidth: zk.parseInt(wgt.getMinwidth())
			};
			dg.z_orgzi = el.style.zIndex;
			return false;
		}
		return true;
	},
	_aftersizing: function (dg, evt) {
		var wgt = dg.control,
			data = dg.z_szofs;
		wgt.fire('onSize', zk.copy(data, evt.keys), {ignorable: true});
		dg.z_szofs = null;
	},
	_drawsizing: function(dg, pointer, evt) {
		if (dg.z_dir == 8 || dg.z_dir <= 2) {
			var h = dg.z_box.height + dg.z_box.top - pointer[1];
			if (h < dg.z_box.minHeight) {
				pointer[1] = dg.z_box.height + dg.z_box.top - dg.z_box.minHeight;
				h = dg.z_box.minHeight;
			}
			dg.node.style.height = jq.px0(h);
			dg.node.style.top = jq.px(pointer[1]);
		}
		if (dg.z_dir >= 4 && dg.z_dir <= 6) {
			var h = dg.z_box.height + pointer[1] - dg.z_box.top;
			if (h < dg.z_box.minHeight)
				h = dg.z_box.minHeight;
			dg.node.style.height = jq.px0(h);
		}
		if (dg.z_dir >= 6 && dg.z_dir <= 8) {
			var w = dg.z_box.width + dg.z_box.left - pointer[0];
			if (w < dg.z_box.minWidth) {
				pointer[0] = dg.z_box.width + dg.z_box.left - dg.z_box.minWidth;
				w = dg.z_box.minWidth;
			}
			dg.node.style.width = jq.px0(w);
			dg.node.style.left = jq.px(pointer[0]);
		}
		if (dg.z_dir >= 2 && dg.z_dir <= 4) {
			var w = dg.z_box.width + pointer[0] - dg.z_box.left;
			if (w < dg.z_box.minWidth)
				w = dg.z_box.minWidth;
			dg.node.style.width = jq.px0(w);
		}
	}
});

zul.wnd.Skipper = zk.$extends(zk.Skipper, {
	$init: function (wnd) {
		this._w = wnd;
	},
	restore: function () {
		this.$supers('restore', arguments);
		var w = this._w;
		if (w._mode != 'embedded') {
			_updDomPos(w); 
			w.zsync();
		}
	}
});


zul.wnd.WindowRenderer = {
	
	shallCheckBorder: function (wgt) {
		return wgt._mode != 'embedded' && wgt._mode != 'popup';
	}
};
})();
zkreg('zul.wnd.Window',true);zk._m={};
zk._m['default']=

function (out, skipper) {
	var zcls = this.getZclass(),
		uuid = this.uuid,
		title = this.getTitle(),
		caption = this.caption,
		contentStyle = this.getContentStyle(),
		contentSclass = this.getContentSclass(),
		withFrame = zul.wnd.WindowRenderer.shallCheckBorder(this),
		bordercls = this._border;

	bordercls = "normal" == bordercls ? "":
		"none" == bordercls ? "-noborder" : '-' + bordercls;

	out.push('<div', this.domAttrs_(), '>');

	if (caption || title) {
		out.push('<div class="', zcls, '-tl"><div class="',
			zcls, '-tr"></div></div><div class="',
			zcls, '-hl"><div class="', zcls,
			'-hr"><div class="', zcls, '-hm"><div id="',
			uuid, '-cap" class="', zcls, '-header">');

		if (caption) caption.redraw(out);
		else {
			if (this._closable)
				out.push('<div id="', uuid, '-close" class="', zcls, '-icon ', zcls, '-close"></div>');
			if (this._maximizable) {
				out.push('<div id="', uuid, '-max" class="', zcls, '-icon ', zcls, '-max');
				if (this._maximized)
					out.push(' ', zcls, '-maxd');
				out.push('"></div>');
			}
			if (this._minimizable)
				out.push('<div id="' + uuid, '-min" class="', zcls, '-icon ', zcls, '-min"></div>');
			out.push(zUtl.encodeXML(title));
		}
		out.push('</div></div></div></div>');
	} else if (withFrame)
		out.push('<div class="', zcls, '-tl', bordercls,
				'"><div class="', zcls, '-tr', bordercls, '"></div></div>');

	if (withFrame)
		out.push('<div class="', zcls, '-cl', bordercls,
			'"><div class="', zcls, '-cr', bordercls,
			'"><div class="', zcls, '-cm', bordercls, '">');

	out.push('<div id="', uuid, '-cave" class="');
	if (contentSclass) out.push(contentSclass, ' ');
	out.push(zcls, '-cnt', bordercls, '"');
	if (contentStyle) out.push(' style="', contentStyle, '"');
	out.push('>');

	if (!skipper)
		for (var w = this.firstChild; w; w = w.nextSibling)
			if (w != caption)
				w.redraw(out);

	out.push('</div>');

	if (withFrame)
		out.push('</div></div></div><div class="', zcls, '-bl', bordercls,
			'"><div class="', zcls, '-br', bordercls, '"></div></div>');

	out.push('</div>');
}
;zkmld(zk._p.p.Window,zk._m);


zul.wnd.Panel = zk.$extends(zul.Widget, {
	_border: "none",
	_title: "",
	_open: true,
	_minheight: 100,
	_minwidth: 200,

	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onMaximize: this, onClose: this, onMove: this, onSize: this.onSizeEvent}, -1000);
	},

	$define: {
		
		
		minheight: null, 
		
		
		minwidth: null, 
		
		
		sizable: function (sizable) {
			if (this.desktop) {
				if (sizable)
					this._makeSizer();
				else if (this._sizer) {
					this._sizer.destroy();
					this._sizer = null;
				}
			}
		},
		
		
		movable: _zkf = function () {
			this.rerender(); 
		},
		
		
		floatable: _zkf,
		
		
		maximizable: _zkf,
		
		
		minimizable: _zkf,
		
		
		collapsible: _zkf,
		
		
		closable: _zkf,
		
		
		border: _zkf,
		
		
		title: _zkf,
		
		
		open: function (open, fromServer) {
			var node = this.$n();
			if (node) {
				var zcls = this.getZclass(),
					$body = jq(this.$n('body'));
				if ($body[0] && !$body.is(':animated')) {
					if (open) {
						jq(node).removeClass(zcls + '-colpsd');
						$body.zk.slideDown(this);
					} else {
						jq(node).addClass(zcls + '-colpsd');
						this._hideShadow();
						
						if (zk.ie6_ && !node.style.width)
							node.runtimeStyle.width = "100%";
						$body.zk.slideUp(this);
					}
					if (!fromServer) this.fire('onOpen', {open:open});
				}
			}
		},
		
		
		maximized: function (maximized, fromServer) {
			var node = this.$n();
			if (node) {
				var $n = zk(node),
					isRealVisible = $n.isRealVisible();
				if (!isRealVisible && maximized) return;
	
				var l, t, w, h, s = node.style, cls = this.getZclass();
				if (maximized) {
					jq(this.$n('max')).addClass(cls + '-maxd');
					this._hideShadow();
	
					if (this._collapsible && !this._open) {
						$n.jq.removeClass(cls + '-colpsd');
						var body = this.$n('body');
						if (body) body.style.display = "";
					}
					var floated = this.isFloatable(),
						$op = floated ? jq(node).offsetParent() : jq(node).parent();
					var sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
					
					if (zk.isLoaded('zkmax.layout') && this.parent.$instanceof(zkmax.layout.Portalchildren)) {
						var layout = this.parent.parent;
						if (layout.getMaximizedMode() == 'whole') {
							this._inWholeMode = true;
							var p = layout.$n(), ps = p.style;
							sh = zk.ie6_ && p.clientHeight == 0 ? p.offsetHeight - jq(p).zk.borderHeight() : p.clientHeight;
							var oldinfo = this._oldNodeInfo = { _scrollTop: p.parentNode.scrollTop };
							p.parentNode.scrollTop = 0;
							$n.makeVParent();
							
							oldinfo._pos = s.position;
							oldinfo._ppos = ps.position;
							oldinfo._zIndex = s.zIndex;
							
							s.position = 'absolute';
							this.setFloating_(true);
							this.setTopmost();
							p.appendChild(node);
							ps.position = 'relative';
							if (!ps.height) {
								ps.height = jq.px0(sh);
								oldinfo._pheight = true;
							}
							if (zk.ie7_)
								zk(node).redoCSS();
						}
					}
					var floated = this.isFloatable(),
						$op = floated ? jq(node).offsetParent() : jq(node).parent();
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;
	
					
					s.top = "-10000px";
					s.left = "-10000px";
	
					
					var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth;
					
					if (!floated) {
						sw -= $op.zk.paddingWidth();
						sw = $n.revisedWidth(sw);
						sh -= $op.zk.paddingHeight();
						sh = $n.revisedHeight(sh);
					}
					s.width = jq.px0(sw);
					s.height = jq.px0(sh);
					this._lastSize = {l:l, t:t, w:w, h:h};
	
					
					s.top = "0";
					s.left = "0";

					
					w = s.width;
					h = s.height;
				} else {
					var max = this.$n('max'),
						$max = jq(max);
					$max.removeClass(cls + "-maxd").removeClass(cls + "-maxd-over");
					if (this._lastSize) {
						s.left = this._lastSize.l;
						s.top = this._lastSize.t;
						s.width = this._lastSize.w;
						s.height = this._lastSize.h;
						this._lastSize = null;
					}
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;
					if (this._collapsible && !this._open) {
						jq(node).addClass(cls + "-colpsd");
						var body = this.$n('body');
						if (body) body.style.display = "none";
					}
					var body = this.panelchildren ? this.panelchildren.$n() : null;
					if (body)
						body.style.width = body.style.height = "";
						
					if (this._inWholeMode) {
						$n.undoVParent();
						var oldinfo = this._oldNodeInfo;
						node.style.position = oldinfo ? oldinfo._pos : "";
						this.setZIndex((oldinfo ? oldinfo._zIndex : ""), {fire:true});
						this.setFloating_(false);
						var p = this.parent.parent.$n();
						p.style.position = oldinfo ? oldinfo._ppos : "";
						p.parentNode.scrollTop = oldinfo ? oldinfo._scrollTop : 0;
						if (oldinfo && oldinfo._pheight)
							p.style.height = "";
						this._oldNodeInfo = null;
						this._inWholeMode = false;
					}
				}
				if (!fromServer && isRealVisible) {
					this._visible = true;
					this.fire('onMaximize', {
						left: l,
						top: t,
						width: w,
						height: h,
						maximized: maximized,
						fromServer: fromServer
					});
				}
				if (isRealVisible) {
					this.__maximized = true;
					zWatch.fireDown('beforeSize', this);
					zWatch.fireDown('onSize', this);
				}
			}
		},
		
		
		minimized: function (minimized, fromServer) {
			if (this._maximized)
				this.setMaximized(false);
				
			var node = this.$n();
			if (node) {
				var s = node.style, l = s.left, t = s.top, w = s.width, h = s.height;
				if (minimized) {
					zWatch.fireDown('onHide', this);
					jq(node).hide();
				} else {
					jq(node).show();
					zWatch.fireDown('onShow', this);
				}
				if (!fromServer) {
					this._visible = false;
					this.fire('onMinimize', {
						left: s.left,
						top: s.top,
						width: s.width,
						height: s.height,
						minimized: minimized
					});
				}
			}
		},
		
		tbar: function (val) {
			this.tbar = zk.Widget.$(val);
			if (this.bbar == this.tbar)
				this.bbar = null;
			if (this.fbar == this.tbar)
				this.fbar = null;
			this.rerender();
		},
		
		bbar: function (val) {
			this.bbar = zk.Widget.$(val);
			if (this.tbar == this.bbar)
				this.tbar = null;
			if (this.fbar == this.bbar)
				this.fbar = null;
			this.rerender();
		},
		
		fbar: function(val) {
			this.fbar = zk.Widget.$(val);
			if (this.tbar == this.fbar)
				this.tbar = null;
			if (this.bbar == this.fbar)
				this.bbar = null;
			this.rerender();
		}
	},

	
	setVisible: function (visible) {
		if (this._visible != visible) {
			if (this._maximized) {
				this.setMaximized(false);
			} else if (this._minimized) {
				this.setMinimized(false);
			}
			this.$supers('setVisible', arguments);
		}
	},
	setHeight: function () {
		this.$supers('setHeight', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setWidth: function () {
		this.$supers('setWidth', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setTop: function () {
		this._hideShadow();
		this.$supers('setTop', arguments);
		this.zsync();

	},
	setLeft: function () {
		this._hideShadow();
		this.$supers('setLeft', arguments);
		this.zsync();
	},
	updateDomStyle_: function () {
		this.$supers('updateDomStyle_', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	
	addToolbar: function (name, toolbar) {
		switch (name) {
			case 'tbar':
				this.tbar = toolbar;
				break;
			case 'bbar':
				this.bbar = toolbar;
				break;
			case 'fbar':
				this.fbar = toolbar;
				break;
			default: return false; 
		}
		return this.appendChild(toolbar);
	},
	
	onClose: function () {
		if (!this.inServer || !this.isListen('onClose', {asapOnly: 1})) 
			this.parent.removeChild(this); 
	},
	onMove: function (evt) {
		this._left = evt.left;
		this._top = evt.top;
	},
	onMaximize: function (evt) {
		var data = evt.data;
		this._top = data.top;
		this._left = data.left;
		this._height = data.height;
		this._width = data.width;
	},
	onSizeEvent: function (evt) {
		var data = evt.data,
			node = this.$n(),
			s = node.style;
			
		this._hideShadow();
		if (data.width != s.width) {
			s.width = data.width;
		}
		if (data.height != s.height) {
			s.height = data.height;
			this._fixHgh();
		}
				
		if (data.left != s.left || data.top != s.top) {
			s.left = data.left;
			s.top = data.top;
			
			this.fire('onMove', zk.copy({
				left: node.style.left,
				top: node.style.top
			}, evt.data), {ignorable: true});
		}
		
		this.zsync();
		var self = this;
		setTimeout(function() {
			zWatch.fireDown('beforeSize', self);
			zWatch.fireDown('onSize', self);
		}, zk.ie6_ ? 800: 0);
	},
	beforeSize: function() {
		
		if (this._maximized && !this.__maximized)
			this.$n().style.width="";
	},
	
	onSize: _zkf = (function() {
		function syncMaximized (wgt) {
			if (!wgt._lastSize) return;
			var node = wgt.$n(),
				$n = zk(node),
				floated = wgt.isFloatable(),
				$op = floated ? jq(node).offsetParent() : jq(node).parent(),
				s = node.style;
		
			
			var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth;
			if (!floated) {
				sw -= $op.zk.paddingWidth();
				sw = $n.revisedWidth(sw);
			}
			s.width = jq.px0(sw);
			if (wgt._open) {
				var sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
				if (!floated) {
					sh -= $op.zk.paddingHeight();
					sh = $n.revisedHeight(sh);
				}
				s.height = jq.px0(sh);
			}
		}
		return function(ctl) {
			this._hideShadow();
			if (this._maximized) {
				if (!this.__maximized)
					syncMaximized(this);
				this.__maximized = false; 
			}
			
			if (this.tbar)
				ctl.fireDown(this.tbar);
			if (this.bbar)
				ctl.fireDown(this.bbar);
			if (this.fbar)
				ctl.fireDown(this.fbar);
			this._fixHgh();
			this.zsync();
		};
	})(),
	onShow: _zkf,
	onHide: function () {
		this._hideShadow();
	},
	_fixHgh: function () {
		var pc;
		if (!(pc=this.panelchildren) || pc.z_rod || !this.isRealVisible()) return;
		var n = this.$n(),
			body = pc.$n(),
			hgh = n.style.height;
		if (zk.ie6_ && ((hgh && hgh != "auto" )|| body.style.height)) body.style.height = "0";
		if (hgh && hgh != "auto")
			zk(body).setOffsetHeight(this._offsetHeight(n));
		if (zk.ie6_) zk(body).redoCSS();
	},
	
	_rounded: _zkf = function () {
		return this._border.startsWith("rounded"); 
	},
	isFramable: _zkf, 
	
	_bordered: function () {
		var v;
		return (v = this._border) != "none" && v != "rounded";
	},
	_offsetHeight: function (n) {
		var h = n.offsetHeight - this._titleHeight(n);
		if (this._rounded()) {
			var body = this.panelchildren.$n(),
				bl = jq(this.$n('body')).find(':last')[0],
				title = this.$n('cap');
			h -= bl.offsetHeight;
			if (body)
				h -= zk(body.parentNode).padBorderHeight();
			if (title)
				h -= zk(title.parentNode).padBorderHeight();
		}
		h -= zk(n).padBorderHeight();
		var tb = this.$n('tb'),
			bb = this.$n('bb'),
			fb = this.$n('fb');
		if (tb) h -= tb.offsetHeight;
		if (bb) h -= bb.offsetHeight;
		if (fb) h -= fb.offsetHeight;
		return h;
	},
	_titleHeight: function (n) {
		var rounded = this._rounded(),
			cap = this.$n('cap'),
			top = rounded ? jq(n).find('> div:first-child')[0].offsetHeight: 0;
		return cap ? (rounded ? jq(n).find('> div:first-child').next()[0]: cap).offsetHeight + top: top;
	},
	onFloatUp: function (ctl) {
		if (!this._visible || !this.isFloatable())
			return; 

		for (var wgt = ctl.origin; wgt; wgt = wgt.parent) {
			if (wgt == this) {
				this.setTopmost();
				return;
			}
			if (wgt.isFloating_())
				return;
		}
	},
	getZclass: function () {
		return this._zclass == null ?  "z-panel" : this._zclass;
	},
	_makeSizer: function () {
		if (!this._sizer) {
			this.domListen_(this.$n(), 'onMouseMove');
			this.domListen_(this.$n(), 'onMouseOut');
			var Panel = this.$class;
			this._sizer = new zk.Draggable(this, null, {
				stackup: true, draw: Panel._drawsizing,
				starteffect: Panel._startsizing,
				ghosting: Panel._ghostsizing,
				endghosting: Panel._endghostsizing,
				ignoredrag: Panel._ignoresizing,
				endeffect: Panel._aftersizing});
		}
	},
	_initFloat: function () {
		var n = this.$n();
		if (!n.style.top || !n.style.left) {
			var xy = zk(n).revisedOffset();
			n.style.left = jq.px(xy[0]);
			n.style.top = jq.px(xy[1]);
		}

		n.style.position = "absolute";
		if (this.isMovable())
			this._initMove();

		this.zsync();

		if (this.isRealVisible())
			this.setTopmost();
	},
	_initMove: function (cmp) {
		var handle = this.$n('cap');
		if (handle && !this._drag) {
			jq(handle).addClass(this.getZclass() + '-header-move');
			var $Panel = this.$class;
			this._drag = new zk.Draggable(this, null, {
				handle: handle, stackup: true,
				starteffect: $Panel._startmove,
				ignoredrag: $Panel._ignoremove,
				endeffect: $Panel._aftermove});
		}
	},
	zsync: function () {
		this.$supers('zsync', arguments);

		if (!this.isFloatable()) {
			if (this._shadow) {
				this._shadow.destroy();
				this._shadow = null;
			}
		} else {
			var body = this.$n('body');
			if (body && zk(body).isRealVisible()) {
				if (!this._shadow) 
					this._shadow = new zk.eff.Shadow(this.$n(), {
						left: -4, right: 4, top: -2, bottom: 3
					});
					
				if (this._maximized || this._minimized || !this._visible) 
					this._hideShadow();
				else this._shadow.sync();
			}
		}
	},
	_hideShadow: function () {
		var shadow = this._shadow;
		if (shadow) shadow.hide();
	},
	
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.wnd.Panel, 'bind_', arguments);

		zWatch.listen({onSize: this, onShow: this, onHide: this});

		
		if (zk.ie6_)
			zWatch.listen({beforeSize: this});

		var uuid = this.uuid,
			$Panel = this.$class;

		if (this._sizable)
			this._makeSizer();
		
		if (this.isFloatable()) {
			zWatch.listen({onFloatUp: this});
			this.setFloating_(true);
			this._initFloat();
			if (!zk.css3)
				jq.onzsync(this); 
		}
		
		if (this._maximizable && this._maximized) {
			var self = this;
			after.push(function() {
				self._maximized = false;
				self.setMaximized(true, true);				
			});
		}
	},
	unbind_: function () {
		if (this._inWholeMode) {
			var node = this.$n(),
				oldinfo;
			zk(node).undoVParent();
			var p = this.parent;
			if (p && (p = p.parent) && (p = p.$n()) && (oldinfo = this._oldNodeInfo)) {
				p.style.position = oldinfo._ppos;
				p.parentNode.scrollTop = oldinfo._scrollTop;
			}
			this._inWholeMode = false;
		}
		zWatch.unlisten({onSize: this, onShow: this, onHide: this, onFloatUp: this});
		if (zk.ie6_)
			zWatch.unlisten({beforeSize: this});
		this.setFloating_(false);
		
		if (!zk.css3) jq.unzsync(this);

		if (this._shadow) {
			this._shadow.destroy();
			this._shadow = null;
		}
		if (this._drag) {
			this._drag.destroy();
			this._drag = null;
		}
		this.domUnlisten_(this.$n(), 'onMouseMove');
		this.domUnlisten_(this.$n(), 'onMouseOut');
		this.$supers(zul.wnd.Panel, 'unbind_', arguments);
	},
	_doMouseMove: function (evt) {
		if (this._sizer && (evt.target == this || evt.target == this.panelchildren)) {
			var n = this.$n(),
				c = this.$class._insizer(n, zk(n).revisedOffset(), evt.pageX, evt.pageY),
				handle = this.isMovable() ? this.$n('cap') : false,
				zcls = this.getZclass();
			if (!this._maximized && this._open && c) {
				if (this._backupCursor == undefined)
					this._backupCursor = n.style.cursor;
				n.style.cursor = c == 1 ? 'n-resize': c == 2 ? 'ne-resize':
					c == 3 ? 'e-resize': c == 4 ? 'se-resize':
					c == 5 ? 's-resize': c == 6 ? 'sw-resize':
					c == 7 ? 'w-resize': 'nw-resize';
				if (handle) jq(handle).removeClass(zcls + '-header-move');
			} else {
				n.style.cursor = this._backupCursor || '';
				if (handle) jq(handle).addClass(zcls + '-header-move');
			}
		}
	},
	_doMouseOut: function (evt) {
		this.$n().style.cursor = this._backupCursor || '';
	},
	doClick_: function (evt) {
		var maxBtn = this.$n('max'),
			minBtn = this.$n('min'),
			zcls = this.getZclass();
		
		switch (evt.domTarget) {
		case this.$n('close'):
			this.fire('onClose');
			break;
		case maxBtn:
			this.setMaximized(!this._maximized);
			jq(maxBtn).removeClass(zcls + '-max-over');
			break;
		case minBtn:
			this.setMinimized(!this._minimized);
			jq(minBtn).removeClass(zcls + '-min-over');
			break;
		case this.$n('exp'):
			var body = this.$n('body'),
				open = body ? zk(body).isVisible() : this._open;
				
			
			if (!open == this._open)
				this._open = open;
			this.setOpen(!open);
			break;
		default:
			this.$supers('doClick_', arguments);
			return;
		}
		evt.stop();
	},
	doMouseOver_: function (evt) {
		var zcls = this.getZclass();
		
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).addClass(zcls + '-close-over');
			break;
		case this.$n('max'):
			var added = this._maximized ? ' ' + zcls + '-maxd-over' : '';
			jq(this.$n('max')).addClass(zcls + '-max-over' + added);
			break;
		case this.$n('min'):
			jq(this.$n('min')).addClass(zcls + '-min-over');
			break;
		case this.$n('exp'):
			jq(this.$n('exp')).addClass(zcls + '-exp-over');
			break;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		var zcls = this.getZclass();
		
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).removeClass(zcls + '-close-over');
			break;
		case this.$n('max'):
			var $n = jq(this.$n('max'));
			if (this._maximized)
				$n.removeClass(zcls + '-maxd-over');
			$n.removeClass(zcls + '-max-over');
			break;
		case this.$n('min'):
			jq(this.$n('min')).removeClass(zcls + '-min-over');
			break;
		case this.$n('exp'):
			jq(this.$n('exp')).removeClass(zcls + '-exp-over');
			break;
		}
		this.$supers('doMouseOut_', arguments);
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass();
			var added = this._bordered() ? '' : zcls + '-noborder';
			if (added) scls += (scls ? ' ': '') + added;
			added = this._open ? '' : zcls + '-colpsd';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.wgt.Caption))
			this.caption = child;
		else if (child.$instanceof(zul.wnd.Panelchildren))
			this.panelchildren = child;
		else if (child.$instanceof(zul.wgt.Toolbar)) {
			if (this.firstChild == child || (this.nChildren == (this.caption ? 2 : 1)))
				this.tbar = child;
			else if (this.lastChild == child && child.previousSibling.$instanceof(zul.wgt.Toolbar))
				this.fbar = child;
			else if (child.previousSibling.$instanceof(zul.wnd.Panelchildren))
				this.bbar = child;
		}
		this.rerender();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.caption)
			this.caption = null;
		else if (child == this.panelchildren)
			this.panelchildren = null;
		else if (child == this.tbar)
			this.tbar = null;
		else if (child == this.bbar)
			this.bbar = null;
		else if (child == this.fbar)
			this.fbar = null;
		if (!this.childReplacing_)
			this.rerender();
	},
	onChildVisible_: function (child) {
		this.$supers('onChildVisible_', arguments);
		if((child == this.tbar || child == this.bbar || child == this.fbar) && this.$n())
			this._fixHgh();
	}
}, { 
	
	_startmove: function (dg) {
		dg.control._hideShadow();
		
		var el = dg.node;
		if(el.style.top && el.style.top.indexOf("%") >= 0)
			 el.style.top = el.offsetTop + "px";
		if(el.style.left && el.style.left.indexOf("%") >= 0)
			 el.style.left = el.offsetLeft + "px";
		
	},
	_ignoremove: function (dg, pointer, evt) {
		var wgt = dg.control;
		switch (evt.domTarget) {
		case wgt.$n('close'):
		case wgt.$n('max'):
		case wgt.$n('min'):
		case wgt.$n('exp'):
			return true; 
		}
		return false;
	},
	_aftermove: function (dg, evt) {
		dg.control.zsync();
	},
	
	_startsizing: zul.wnd.Window._startsizing,
	_ghostsizing: zul.wnd.Window._ghostsizing,
	_endghostsizing: zul.wnd.Window._endghostsizing,
	_insizer: zul.wnd.Window._insizer,
	_ignoresizing: function (dg, pointer, evt) {
		var el = dg.node,
			wgt = dg.control;
		if (wgt._maximized || !wgt._open) return true;

		var offs = zk(el).revisedOffset(),
			v = wgt.$class._insizer(el, offs, pointer[0], pointer[1]);
		if (v) {
			wgt._hideShadow();
			dg.z_dir = v;
			dg.z_box = {
				top: offs[1], left: offs[0] ,height: el.offsetHeight,
				width: el.offsetWidth, minHeight: zk.parseInt(wgt.getMinheight()),
				minWidth: zk.parseInt(wgt.getMinwidth())
			};
			dg.z_orgzi = el.style.zIndex;
			return false;
		}
		return true;
	},
	_aftersizing: zul.wnd.Window._aftersizing,
	_drawsizing: zul.wnd.Window._drawsizing
});


zul.wnd.PanelRenderer = {
	
	isFrameRequired: function (wgt) {
		return wgt._rounded();
	}
};

zkreg('zul.wnd.Panel');zk._m={};
zk._m['default']=

function (out, skipper) {
	var zcls = this.getZclass(),
		uuid = this.uuid,
		title = this.getTitle(),
		caption = this.caption,
		isFrameRequired = zul.wnd.PanelRenderer.isFrameRequired(this),
		rounded = this._rounded(),
		noborder = !this._bordered(), 
		noheader = !caption && !title;
		
	out.push('<div', this.domAttrs_(), '>');
	if (caption || title) {
		if (isFrameRequired) {
			out.push('<div class="', zcls, '-tl"><div class="', zcls, '-tr"></div></div>');
			out.push('<div class="', zcls, '-hl"><div class="', zcls, '-hr"><div class="', zcls, '-hm">');
		}
		out.push('<div id="', uuid, '-cap" class="', zcls, '-header ');
			if (!rounded && noborder) {
				out.push(zcls, '-header-noborder');		
			}
		out.push('">');
		if (!caption) {
			if (this._closable)
				out.push('<div id="', uuid, '-close" class="', zcls, '-icon ',
						zcls, '-close"></div>');
			if (this._maximizable) {
				out.push('<div id="', uuid, '-max" class="', zcls, '-icon ', zcls, '-max');
				if (this._maximized)
					out.push(' ', zcls, '-maxd');
				out.push('"></div>');
			}
			if (this._minimizable)
				out.push('<div id="', uuid, '-min" class="', zcls, '-icon ',
						zcls, '-min"></div>');
			if (this._collapsible)
				out.push('<div id="', uuid, '-exp" class="', zcls, '-icon ',
						zcls, '-exp"></div>');
			out.push(zUtl.encodeXML(title));
		} else caption.redraw(out);
		
		out.push('</div>');
		
		if (isFrameRequired) out.push('</div></div></div>');
	} else if (rounded) {
		out.push('<div class="', zcls,'-tl ', zcls,'-tl-gray"><div class="' ,zcls ,'-tr ', zcls,'-tr-gray"></div></div>');		
	}
			
	
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');
	
	if (!this._open) out.push(' style="display:none;"');
	
	out.push('>');
	
	if (rounded) {
		out.push('<div class="', zcls, '-cl"><div class="', zcls,
				'-cr"><div class="', zcls, '-cm');
		if (noheader) {
			out.push(' ', zcls, '-noheader');
		}
		out.push('">');		
	}
	if (this.tbar) {
		out.push('<div id="', uuid, '-tb" class="', zcls, '-top');
		
		if (noborder)
			out.push(' ', zcls, '-top-noborder');
		
		if (noheader)
			out.push(' ', zcls, '-noheader');
		
		out.push('">');
		this.tbar.redraw(out);
		out.push('</div>');
	}
	if (this.panelchildren)
		this.panelchildren.redraw(out);
		
	if (this.bbar) {
		out.push('<div id="', uuid, '-bb" class="', zcls, '-btm');
		
		if (noborder)
			out.push(' ', zcls, '-btm-noborder');
			
		if (noheader)
			out.push(' ', zcls, '-noheader');
		
		out.push('">');
		this.bbar.redraw(out);
		out.push('</div>');
	}
	
	if (rounded) {
		out.push('</div></div></div><div class="', zcls, '-fl');
		
		if (!this.fbar) out.push(' ', zcls, '-nobtm2');
		
		out.push('"><div class="', zcls, '-fr"><div class="', zcls, '-fm">');
	}
	if (this.fbar) {
		out.push('<div id="', uuid, '-fb" class="', zcls, '-btm2">');
		this.fbar.redraw(out);
		out.push('</div>');
	}
	if (rounded) out.push('</div></div></div><div class="', zcls ,'-bl"><div class="', zcls ,'-br"></div></div>');
	out.push('</div></div>');
}
;zkmld(zk._p.p.Panel,zk._m);


zul.wnd.Panelchildren = zk.$extends(zul.Widget, {
	
	setHeight: zk.$void,      
	
	setWidth: zk.$void,       

	
	getZclass: function () {
		return this._zclass == null ?  "z-panel-children" : this._zclass;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass();
			var added = !this.parent.getTitle() && !this.parent.caption ?
				zcls + '-noheader' : '';				
			if (added) scls += (scls ? ' ': '') + added;
			added = this.parent._bordered() ? '' : zcls + '-noborder';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	updateDomStyle_: function () {
		this.$supers('updateDomStyle_', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this.parent);
			zWatch.fireDown('onSize', this.parent);
		}
	}
});
zkreg('zul.wnd.Panelchildren',true);zk._m={};
zk._m['default']=

function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
}

;zkmld(zk._p.p.Panelchildren,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.wnd',1);