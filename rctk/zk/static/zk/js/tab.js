zk.load('zul.wgt',function(){zk._p=zkpi('zul.tab',true);try{



zul.tab.Tabbox = zk.$extends(zul.Widget, {
	_orient: "horizontal",
	_tabscroll: true,

	$define: {
    	
    	
		tabscroll: _zkf = function () {
			this.rerender();
		},
		
		
		orient: _zkf,
		
		
		panelSpacing: _zkf
	},
	
	getTabs: function () {
		return this.tabs;
	},
	
	getTabpanels: function () {
		return this.tabpanels;
	},
	
	getToolbar: function () {
		return this.toolbar;
	},
	getZclass: function () {
		return this._zclass == null ? "z-tabbox" +
			( this.inAccordionMold() ? "-" + this.getMold() : this.isVertical() ? "-ver" : "") : this._zclass;
	},
	
	isHorizontal: function() {
		return "horizontal" == this.getOrient();
	},
	
	isVertical: function() {
		return "vertical" == this.getOrient();
	},
	
	inAccordionMold: function () {
		return this.getMold().indexOf("accordion") != -1;
	},
	
	getSelectedIndex: function() {
		return this._selTab ? this._selTab.getIndex() : -1 ;
	},
	
	setSelectedIndex: function(index) {
		if (this.tabs)
			this.setSelectedTab(this.tabs.getChildAt(index));
	},
	
	getSelectedPanel: function() {
		return this._selTab ? this._selTab.getLinkedPanel() : null;
	},
	
	setSelectedPanel: function(panel) {
		if (panel && panel.getTabbox() != this)
			return
		var tab = panel.getLinkedTab();
		if (tab)
			this.setSelectedTab(tab);
	},
	
	getSelectedTab: function() {
		return this._selTab;
	},
	
	setSelectedTab: function(tab) {
		if (typeof tab == 'string')
			tab = zk.Widget.$(tab);
		if (this._selTab != tab) {
			if (tab)
				tab.setSelected(true);
				
			this._selTab = tab;
		}
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.tab.Tabbox, 'bind_', arguments);
		
		
		this._scrolling = false;
		var tab = this._selTab;
		
		if (this.inAccordionMold())
			zWatch.listen({onResponse: this});
		if (tab)
			after.push(function() {
				tab.setSelected(true);
			});
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		this.$supers(zul.tab.Tabbox, 'unbind_', arguments);
	},
	onResponse: function () {
		if (this._shallSize) {
			zWatch.fire('onSize', this);
			this._shallSize = false;
		}
	},
	_syncSize: function () {
		this._shallSize = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		if (this.isVertical() && child.$instanceof(zul.tab.Tabs))
			jq(child.uuid + '-line', zk).remove();
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.wgt.Toolbar))
			this.toolbar = child;
		else if (child.$instanceof(zul.tab.Tabs))
			this.tabs = child;
		else if (child.$instanceof(zul.tab.Tabpanels)) {
			this.tabpanels = child;
		}
		this.rerender();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.toolbar)
			this.toolbar = null;
		else if (child == this.tabs)
			this.tabs = null;
		else if (child == this.tabpanels)
			this.tabpanels = null;
		if (!this.childReplacing_)
			this.rerender();
	},
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		if (this.desktop)
			zWatch.fireDown('onSize', this);
	},
	setHeight: function (height) {
		this.$supers('setHeight', arguments);
		if (this.desktop)
			zWatch.fireDown('onSize', this);
	}
});

zkreg('zul.tab.Tabbox');zk._m={};
zk._m['accordion-lite']=

function (out) {
	out.push('<div ', this.domAttrs_(), '>');
	var tps = this.getTabpanels();
	if (tps) tps.redraw(out);
	out.push("</div>");
}
;zk._m['accordion']=

function (out) {
	out.push('<div ', this.domAttrs_(), '>');
	var tps = this.getTabpanels();
	if (tps) tps.redraw(out);
	out.push("</div>");
}
;zk._m['default']=

function (out) {
	out.push('<div ', this.domAttrs_(), '>');
	if (this.tabs) this.tabs.redraw(out);
	if (this.tabpanels) this.tabpanels.redraw(out);
	if (this.isVertical())
		out.push('<div class="z-clear"></div>');
	out.push("</div>");
}
;zkmld(zk._p.p.Tabbox,zk._m);


zul.tab.Tabs = zk.$extends(zul.Widget, {
	
	getTabbox: function() {
		return this.parent;
	},
	
	getWidth: function () {
		var wd = this._width;
		if (!wd) {
			var tabbox = this.getTabbox();
			if (tabbox && tabbox.isVertical())
				return "50px";
		}
		return wd;
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;
			
		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tabs';
		return "z-tabs" + (tabbox.getMold() == "default" && tabbox.isVertical() ? '-ver' : '');
	},
	onSize: _zkf = function () {
		this._fixWidth();
		
		
		this._scrollcheck("init");
	},
	onShow: _zkf,
	insertChildHTML_: function (child, before, desktop) {
		var last = child.previousSibling;
		if (before) 
			jq(before).before(child.redrawHTML_());
		else if (last) 
			jq(last).after(child.redrawHTML_());
		else {
			var edge = this.$n('edge');
			if (edge) 
				jq(edge).before(child.redrawHTML_());
			else
				jq(this.getCaveNode()).append(child.redrawHTML_());
		}
		child.bind(desktop);
	},
	domClass_: function (no) {
		var zcls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var tbx = this.getTabbox(),
				added = tbx.isTabscroll() ? zcls + "-scroll" : "";
			if (added) zcls += (zcls ? ' ': '') + added;
		}
		return zcls;
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabs, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabs, 'setHflex', v);
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.tab.Tabs, 'bind_', arguments);
		zWatch.listen({onSize: this, onShow: this});

		for (var btn, key = ['right', 'left', 'down', 'up'], le = key.length; le--;)
			if ((btn = this.$n(key[le])))
				this.domListen_(btn, "onClick");
		
		
		this._inited = false;
		
		var self = this;
		after.push(
			function () {
				self._inited = true;
			}
		);
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, onShow: this});
		for (var btn, key = ['right', 'left', 'down', 'up'], le = key.length; le--;)
			if ((btn = this.$n(key[le])))
				this.domUnlisten_(btn, "onClick");
		this.$supers(zul.tab.Tabs, 'unbind_', arguments);
	},
	_isInited: function () {
		return this._inited;
	},
	_scrollcheck: function(way, tb) {
		var tabbox = this.getTabbox();
		if (!this.desktop || !tabbox.isRealVisible() || !tabbox.isTabscroll())
			return;

		var tbsdiv = this.$n(),
			tbx = tabbox.$n();
		if (!tbsdiv || !tbx) return;	
		if (tabbox.isVertical()) {
			var header = this.$n("header"),
				headerOffsetHeight = header.offsetHeight,
				headerScrollTop = header.scrollTop,
				childHeight = 0;
				
			jq(this.$n("cave")).children().each(function () {
				childHeight += this.offsetHeight;
			});

			if (tabbox._scrolling) { 
				var btnsize = this._getArrowSize();
				if (tbsdiv.offsetHeight < btnsize)  return;
				
				var sel = tabbox.getSelectedTab(),
					node = tb ? tb.$n() : (sel ? sel.$n() : null),
					nodeOffsetTop = node ? node.offsetTop : 0,
					nodeOffsetHeight = node ? node.offsetHeight : 0;
					
				if (childHeight <= headerOffsetHeight + btnsize) {
					tabbox._scrolling = false;
					this._showbutton(false)
					header.style.height = jq.px0(tbx.offsetHeight-2);
					header.scrollTop = 0;
				}
				switch (way) {
				case "end":
					var d = childHeight - headerOffsetHeight - headerScrollTop;
					this._doScroll(d >= 0 ? "down" : "up", d >= 0 ? d : Math.abs(d));
					break;
				case "init":
				case "vsel":
					if (nodeOffsetTop < headerScrollTop) {
						this._doScroll("up", headerScrollTop - nodeOffsetTop);
					} else if (nodeOffsetTop + nodeOffsetHeight > headerScrollTop + headerOffsetHeight) {
						this._doScroll("down", nodeOffsetTop + nodeOffsetHeight - headerScrollTop - headerOffsetHeight);
					}
					break;
				}
			} else { 
				if (childHeight - (headerOffsetHeight - 10) > 0) {
					tabbox._scrolling = true;
					this._showbutton(true);
					var btnsize = this._getArrowSize(),
						temp = tbx.offsetHeight - btnsize;
					header.style.height = temp > 0 ? temp + "px" : "";
					if (way == "end") {
						var d = childHeight - headerOffsetHeight - headerScrollTop + 2;
						if (d >= 0)
							this._doScroll(this.uuid, "down", d);
					}
				}
			}
		} else if(!tabbox.inAccordionMold()) {
			var cave = this.$n("cave"),
				header = this.$n("header"),
			 	sel = tabbox.getSelectedTab(),
				node = tb ? tb.$n() : ( sel ? sel.$n() : null),
			 	nodeOffsetLeft = node ? node.offsetLeft : 0,
				nodeOffsetWidth = node ? node.offsetWidth : 0,
				headerOffsetWidth = header.offsetWidth,
				headerScrollLeft = header.scrollLeft,
				childWidth = 0,
				toolbar = tabbox.toolbar;

			jq(cave).children().each(function () {
				childWidth += this.offsetWidth;
			});
			
			if (toolbar)
				toolbar = toolbar.$n();
			if (tabbox._scrolling) { 
				var btnsize = this._getArrowSize();
				if (toolbar) {
					var outer, hgh;
						
					
					if (zk.gecko2_) {
						outer = toolbar.parentNode.parentNode;
						outer.style.height = '';
						hgh = outer.offsetHeight;
					}
					this.$n('right').style.right = toolbar.offsetWidth + 'px';
					if (zk.gecko2_)
						outer.style.height = jq.px0(zk(outer).revisedHeight(hgh));
				}
				
				if (tbsdiv.offsetWidth < btnsize) return;
				if (childWidth <= headerOffsetWidth + btnsize) {
					tabbox._scrolling = false;
					this._showbutton(false);
					header.style.width = jq.px0(tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0));
					header.scrollLeft = 0;
				}
				
				switch (way) {
				case "end":
					var d = childWidth - headerOffsetWidth - headerScrollLeft;
					this._doScroll(d >= 0 ? "right" : "left", d >= 0 ? d : Math.abs(d));
					break;
				case "init":
				case "sel":
					if (nodeOffsetLeft < headerScrollLeft) {
						this._doScroll("left", headerScrollLeft - nodeOffsetLeft);
					} else if (nodeOffsetLeft + nodeOffsetWidth > headerScrollLeft + headerOffsetWidth) {
						this._doScroll("right", nodeOffsetLeft + nodeOffsetWidth - headerScrollLeft - headerOffsetWidth);
					}
					break;
				}
			} else { 
				if (childWidth - (headerOffsetWidth - 10) > 0) {
					tabbox._scrolling = true;
					this._showbutton(true);
					var cave = this.$n("cave"),
						btnsize = this._getArrowSize(),
						temp = tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0) - btnsize;
					cave.style.width = "5555px";
					header.style.width = temp > 0 ? temp + "px" : "";
					
					if (toolbar) 
						this.$n('right').style.right = toolbar.offsetWidth + 'px';
					
					if (way == "sel") {
						if (nodeOffsetLeft < headerScrollLeft) {
							this._doScroll("left", headerScrollLeft - nodeOffsetLeft);
						} else if (nodeOffsetLeft + nodeOffsetWidth > headerScrollLeft + headerOffsetWidth) {
							this._doScroll("right", nodeOffsetLeft + nodeOffsetWidth - headerScrollLeft - headerOffsetWidth);
						}
					}
				}
			}
		}
	},
	_doScroll: function(to, move) {
		if (!this._doingScroll)
			this._doingScroll = {};
		if (move <= 0 || this._doingScroll[to])
			return;
		var step,
			self = this,
			header = this.$n("header");
		
		this._doingScroll[to] = move;
		
		step = move <= 60 ? 5 : (5 * (zk.parseInt(move / 60) + 1));
		var run = setInterval(function() {
			if (!move) {
				delete self._doingScroll[to];
				clearInterval(run);
				return;
			} else {
				
				move < step ? goscroll(header, to, move) : goscroll(header, to, step);
				move -= step;
				move = move < 0 ? 0 : move;
			}
		}, 10);
		
		goscroll = function(header, to, step) {
			switch (to) {
			case 'right':
				header.scrollLeft += step;
				break;
			case 'left':
				header.scrollLeft -= step;
				break;
			case 'up':
				header.scrollTop -= step;
				break;
			default:
				header.scrollTop += step;
			}
			header.scrollLeft = (header.scrollLeft <= 0 ? 0 : header.scrollLeft);
			header.scrollTop = (header.scrollTop <= 0 ? 0 : header.scrollTop);
		}
	},
	_getArrowSize: function() {
		var tabbox = this.getTabbox(),
			isVer = tabbox.isVertical(),
			btnA = isVer ? this.$n("up") : this.$n("left"),
			btnB = isVer ? this.$n("down") : this.$n("right");
		return btnA && btnB ?
			(isVer ? btnA.offsetHeight + btnB.offsetHeight : btnA.offsetWidth + btnB.offsetWidth) : 0;
	},
	_showbutton : function(show) {
		var tabbox = this.getTabbox(),
			zcls = this.getZclass();
		if (tabbox.isTabscroll()) {
			var header = this.$n("header");
				
			if (tabbox.isVertical()) {
				if (show) {
					jq(header).addClass(zcls + "-header-scroll");
					jq(this.$n("down")).addClass(zcls + "-down-scroll");
					jq(this.$n("up")).addClass(zcls + "-up-scroll");
				} else {
					jq(header).removeClass(zcls + "-header-scroll");
					jq(this.$n("down")).removeClass(zcls + "-down-scroll");
					jq(this.$n("up")).removeClass(zcls + "-up-scroll");
				}				
			}else {
				if (show) {
					jq(header).addClass(zcls + "-header-scroll");
					jq(this.$n("right")).addClass(zcls + "-right-scroll");
					jq(this.$n("left")).addClass(zcls + "-left-scroll");
				} else {
					jq(header).removeClass(zcls + "-header-scroll");
					jq(this.$n("right")).removeClass(zcls + "-right-scroll");
					jq(this.$n("left")).removeClass(zcls + "-left-scroll");
				}		
			}
		}
	},
	_doClick: function(evt) {
		var cave = this.$n("cave"),
			allTab =  jq(cave).children();
		
		if (!allTab.length) return; 
			
		var ele = evt.domTarget,
			move = 0,
			tabbox = this.getTabbox(),
			head = this.$n("header"),
			scrollLength = tabbox.isVertical() ? head.scrollTop : head.scrollLeft,
			offsetLength = tabbox.isVertical() ? head.offsetHeight : head.offsetWidth,
			plus = scrollLength + offsetLength;
		
		
		if (ele.id == this.uuid + "-right") {
			for (var i = 0, count = allTab.length; i < count; i++) {
				if (allTab[i].offsetLeft + allTab[i].offsetWidth > plus) {
					move = allTab[i].offsetLeft + allTab[i].offsetWidth - scrollLength - offsetLength;
					if (!move || isNaN(move))
						return;
					this._doScroll("right", move);
					return;
				}
			}
		} else if (ele.id == this.uuid + "-left") {
			for (var i = 0, count = allTab.length; i < count; i++) {
				if (allTab[i].offsetLeft >= scrollLength) {
					
					var tabli = jq(allTab[i]).prev("li")[0];
					if (!tabli)  return;
					move = scrollLength - tabli.offsetLeft;
					if (isNaN(move)) return;
					this._doScroll("left", move);
					return;
				};
			};
			move = scrollLength - allTab[allTab.length-1].offsetLeft;
			if (isNaN(move)) return;
			this._doScroll("left", move);
			return;
		} else if (ele.id == this.uuid + "-up") {
				for (var i = 0, count = allTab.length; i < count; i++) {
					if (allTab[i].offsetTop >= scrollLength) {
						var preli = jq(allTab[i]).prev("li")[0];
						if (!preli) return;
						move = scrollLength - preli.offsetTop ;
						this._doScroll("up", move);
						return;
					};
				};
				var preli = allTab[allTab.length-1];
				if (!preli) return;
				move = scrollLength - preli.offsetTop ;
				this._doScroll("up", move);
				return;
		} else if (ele.id == this.uuid + "-down") {
			for (var i = 0, count = allTab.length; i < count; i++) {
				if (allTab[i].offsetTop + allTab[i].offsetHeight > plus) {
					move = allTab[i].offsetTop + allTab[i].offsetHeight - scrollLength - offsetLength;
					if (!move || isNaN(move)) return ;
					this._doScroll("down", move);
					return;
				};
			};
		}
	},
	_fixWidth: function() {
		var tabs = this.$n();
		
		var	tabbox = this.getTabbox(),
			tbx = tabbox.$n(),
			cave = this.$n("cave"),
			head = this.$n("header"),
			l = this.$n("left"),
			r = this.$n("right"),
			btnsize = tabbox._scrolling ? l && r ? l.offsetWidth + r.offsetWidth : 0 : 0;
			this._fixHgh();
			if (this.parent.isVertical()) {
				var most = 0;
				
				if (tabs.style.width) {
					tabs._width = tabs.style.width;
					;
				} else {
					
					this._forceStyle(tabs, "w", tabs._width ? tabs._width : "50px");
				}
			} else if (!tabbox.inAccordionMold()) {
				if (tbx.offsetWidth < btnsize) 
					return;
				if (tabbox.isTabscroll()) {
					var toolbar = tabbox.toolbar;
					if (toolbar) 
						toolbar = toolbar.$n();
					if (!tbx.style.width) {
						this._forceStyle(tbx, "w", "100%");
						this._forceStyle(tabs, "w", jq.px0(jq(tabs).zk.revisedWidth(tbx.offsetWidth)));
						if (tabbox._scrolling) 
							this._forceStyle(head, "w", jq.px0(tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0) - btnsize));
						else 
							this._forceStyle(head, "w", jq.px0(jq(head).zk.revisedWidth(tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0))));
					} else {
						this._forceStyle(tabs, "w", jq.px0(jq(tabs).zk.revisedWidth(tbx.offsetWidth)));
						this._forceStyle(head, "w", tabs.style.width);
						if (tabbox._scrolling) 
							this._forceStyle(head, "w", jq.px0(head.offsetWidth - (toolbar ? toolbar.offsetWidth : 0) - btnsize));
						else 
							this._forceStyle(head, "w", jq.px0(head.offsetWidth - (toolbar ? toolbar.offsetWidth : 0)));
					}
					if (toolbar && tabbox._scrolling) 
						this.$n('right').style.right = toolbar.offsetWidth + 'px';
				} else {
					if (!tbx.style.width) {
						if (tbx.offsetWidth) {
							var ofw = jq.px0(tbx.offsetWidth);
							this._forceStyle(tbx, "w", ofw);
							this._forceStyle(tabs, "w", ofw);	
						}
					} else {
						this._forceStyle(tabs, "w", jq.px0(tbx.offsetWidth));
					}
				}
			}
	},
	_fixHgh: function () {
		var tabs = this.$n(),
			tabbox = this.getTabbox(),
			tbx = tabbox.$n(),
			head = this.$n("header"),
			u = this.$n("up"),
			d = this.$n("down"),
			cave =  this.$n("cave"),
			btnsize = u && d ? isNaN(u.offsetHeight + d.offsetHeight) ? 0 : u.offsetHeight + d.offsetHeight : 0;
		
		
		if (tabbox.isVertical()) {
			var child = jq(tbx).children('div'),
				allTab = jq(cave).children();
			if (tbx.style.height) {
				this._forceStyle(tabs, "h", jq.px0(jq(tabs).zk.revisedHeight(tbx.offsetHeight, true)));
			} else {
				this._forceStyle(tbx, "h", jq.px0(allTab.length * 35));
				this._forceStyle(tabs, "h", jq.px0(jq(tabs).zk.revisedHeight(tbx.offsetHeight, true)));
			}
			
			if (tabbox._scrolling) {
				this._forceStyle(head, "h", jq.px0(tabs.offsetHeight - btnsize));
			} else {
				this._forceStyle(head, "h", jq.px0(jq(head).zk.revisedHeight(tabs.offsetHeight, true)));
			}
			
			this._forceStyle(child[1], "h", jq.px0(jq(child[1]).zk.revisedHeight(tabs.offsetHeight, true)));
			
			this._forceStyle(child[2], "h", 
				jq.px0(jq(child[1]).zk.revisedHeight(tabs.offsetHeight - (2 - zk.parseInt(jq(this.$n('cave')).css('padding-top'))), true)));
			
			
		} else {
			if (head) 
				head.style.height = "";
		}
	},

	_forceStyle: function(node, attr, value) {
		if (!value)	return;
		switch (attr) {
		case "h":
			node.style.height = zk.ie6_ ? "0px" : ""; 
			node.style.height = value;
			break;
		case "w":
			node.style.width = zk.ie6_ ? "0px" : ""; 
			node.style.width = "";
			node.style.width = value;
			break;
		}
	},

	onChildRemoved_: function (child) {
		var p = this.parent;
		if (p && child == p._selTab) {
			p._selTab = null;
			if (p = p.tabpanels)
				p._selPnl = null; 
		}
		this._scrollcheck("init");
		this.$supers("onChildRemoved_", arguments);
	},
	onChildAdded_: function () {
		this._scrollcheck("init");
		this.$supers("onChildAdded_", arguments);
	},
	
	ignoreFlexSize_: function(attr) {
		var p = this.getTabbox();
		return (p.isVertical() && 'h' == attr)
			|| (p.isHorizontal() && 'w' == attr); 
	}
});
zkreg('zul.tab.Tabs');zk._m={};
zk._m['default']=

function (out) {
	var zcls = this.getZclass(),
		tbx = this.getTabbox(),
		uuid = this.uuid;
	out.push('<div ', this.domAttrs_(), '>');
	if (tbx.isVertical()) {
		out.push('<div id="', uuid, '-header" class="', zcls, '-header">',
				'<ul id="', uuid, '-cave" class="', zcls, '-cnt">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		
		
		out.push('<li id="', uuid, '-edge" class="', zcls, '-edge"></li></ul></div>',
				'<div id="', uuid, '-up"><div class="', zcls, '-up-scroll-hl">', 
				'</div><div class="',zcls,'-up-scroll-hr"></div></div><div id="', uuid, '-down"><div class="', zcls, 
				'-down-scroll-hl"></div><div class="',zcls,'-down-scroll-hr"></div></div></div><div id="', uuid,
				'-line" class="', zcls, '-space" ></div>');
	} else {
		var hasToolbar = tbx.isTabscroll() && tbx.toolbar;
		if (hasToolbar) {
			out.push('<div class="', tbx.toolbar.getZclass(), '-outer">');
				tbx.toolbar.redraw(out);	
		}
		out.push('<div id="', uuid, '-right">', '</div>',
			'<div id="', uuid, '-left">', '</div>', '<div id="', uuid, '-header"',
			' class="', zcls, '-header" >', '<ul id="', uuid, '-cave"', 'class="', zcls, '-cnt">');
			for (var w = this.firstChild; w; w = w.nextSibling)
				w.redraw(out);
		out.push('<li id="', uuid, '-edge"', ' class="', zcls, '-edge" ></li>',
			'<div id="',uuid,'-clear" class="z-clear"> </div>',
			'</ul></div>');
		if (hasToolbar)	out.push('</div>');	
		out.push('<div id="', uuid, '-line"',
			' class="', zcls, '-space" ></div></div>');
	}
}
;zkmld(zk._p.p.Tabs,zk._m);


zul.tab.Tab = zk.$extends(zul.LabelImageWidget, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onClose: this}, -1000);
	},
	$define: {
		
		
		closable: _zkf = function() {
			this.rerender();
		},
		image: _zkf,
		
		
		disabled: _zkf,
		
		
		selected: function(selected) {
			this._sel();
		}
	},
	
	getTabbox: function() {
		return this.parent ? this.parent.parent : null;
	},
	
	getIndex: function() {
		return this.getChildIndex();
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;

		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tab';

		var mold = tabbox.getMold();
		return 'z-tab' + (mold == 'default' ? (tabbox.isVertical() ? '-ver': '') : '-' + mold);
	},
	
	getLinkedPanel: function() {
		var w;
		return (w = this.getTabbox()) && (w = w.getTabpanels()) ?
			w.getChildAt(this.getIndex()): null;
	},
	_doCloseClick : function(evt) {
		if (!this._disabled) {
			this.fire('onClose');
			evt.stop();
		}
	},
	_toggleBtnOver : function(evt) {
		jq(evt.domTarget).toggleClass(this.getZclass() + "-close-over");
	},
	_sel: function(notify, init) {
		var tabbox = this.getTabbox();
		if (!tabbox) return;

		var	tabs = this.parent,
			oldtab = tabbox._selTab;
		if (oldtab != this || init) {
			if (oldtab && tabbox.inAccordionMold()) {
				var p = this.getLinkedPanel();
				if (p) p._changeSel(oldtab.getLinkedPanel());
			}
			if (oldtab && oldtab != this)
				this._setSel(oldtab, false, false, init);
			this._setSel(this, true, notify, init);
		}
	},
	_setSel: function(tab, toSel, notify, init) {
		var tabbox = this.getTabbox(),
			zcls = this.getZclass(),
			panel = tab.getLinkedPanel(),
			bound = this.desktop;
		if (tab.isSelected() == toSel && notify)
			return;

		if (toSel) {
			tabbox._selTab = tab; 
			var ps;
			if (ps = tabbox.tabpanels)
				ps._selPnl = panel; 
		}
		tab._selected = toSel;
		
		if (!bound) return;
		
		if (toSel)
			jq(tab).addClass(zcls + "-seld");
		else
			jq(tab).removeClass(zcls + "-seld");

		if (panel)
			panel._sel(toSel, !init);

		if (!tabbox.inAccordionMold()) {
			var tabs = this.parent;
			if (tabs) tabs._fixWidth();
		}
		
		if (tab == this) {
			if (tabbox.isVertical())
				tabs._scrollcheck("vsel", this);
			else if (!tabbox.inAccordionMold())
				tabs._scrollcheck("sel", this);
		}
		
		if (notify)
			this.fire('onSelect', {items: [this], reference: this.uuid});
	},
	setHeight: function (height) {
		this.$supers('setHeight', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this.parent);
			zWatch.fireDown('onSize', this.parent);
		}
	},
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this.parent);
			zWatch.fireDown('onSize', this.parent);
		}
	},
	
	doClick_: function(evt) {
		if (this._disabled)
			return;
		this._sel(true);
		this.$supers('doClick_', arguments);
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var added = this.isDisabled() ? this.getZclass() + '-disd' : '';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	domContent_: function () {
		var label = zUtl.encodeXML(this.getLabel()),
			img = this.getImage();
		if (!label) label = '&nbsp;';
		if (!img) return label;
		img = '<img src="' + img + '" align="absmiddle" class="' + this.getZclass() + '-img"/>';
		return label ? img + ' ' + label: img;
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tab, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tab, 'setHflex', v);
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.tab.Tab, 'bind_', arguments);
		var closebtn = this.$n('close'),
			tab = this;
		if (closebtn) {
			this.domListen_(closebtn, "onClick", '_doCloseClick');
			if (zk.ie6_)
				this.domListen_(closebtn, "onMouseOver", '_toggleBtnOver')
					.domListen_(closebtn, "onMouseOut", '_toggleBtnOver');
		}

		after.push(function () {tab.parent._fixHgh();});
			
			
		after.push(function () {
			zk.afterMount(function () {
    			if (tab.isSelected()) 
    				tab._sel(false, true);
			});
		});
	},
	unbind_: function () {
		var closebtn = this.$n('close');
		if (closebtn) {
			this.domUnlisten_(closebtn, "onClick", '_doCloseClick');
			if (zk.ie6_)
				this.domUnlisten_(closebtn, "onMouseOver", '_toggleBtnOver')
					.domUnlisten_(closebtn, "onMouseOut", '_toggleBtnOver');
		}
		this.$supers(zul.tab.Tab, 'unbind_', arguments);
	},
	
	onClose: function () {
		if (this.getTabbox().inAccordionMold()) {
			this.getTabbox()._syncSize();
		}
	},
	deferRedrawHTML_: function (out) {
		var tbx = this.getTabbox(),
			tag = tbx.inAccordionMold() ? 'div' : 'li';
		out.push('<', tag, this.domAttrs_({domClass:1}), ' class="z-renderdefer"></', tag,'>');
	}
});

zul.tab.TabRenderer = {
	
	isFrameRequired: function (wgt) {
		return true;
	}
};

zkreg('zul.tab.Tab',true);zk._m={};
zk._m['default']=

function (out) {
	var zcls = this.getZclass(),
		tbx = this.getTabbox(),
		uuid = this.uuid;
	if (tbx.inAccordionMold()) {
		if (tbx.getMold() == 'accordion-lite') {
			out.push('<div id="', this.uuid, '"', this.domAttrs_(), '>',
				'<div align="left" class="', zcls, '-header">');
			if (this.isClosable())
				out.push('<a id="', this.uuid, '-close" class="', zcls, '-close"></a>');

			out.push('<div href="javascript:;" id="', this.uuid, '-tl" class="', zcls, '-tl">',
					'<div class="', zcls, '-tr">',
					'<span class="', zcls, '-tm">',
					'<span class="', zcls, '-text">', this.domContent_(),
					'</span></span></div></div></div></div>');
		} else {
			var isFrameRequired = zul.tab.TabRenderer.isFrameRequired(),
				hm = '<div class="' + zcls + '-hm" >';
			if (tbx.getPanelSpacing() && this.getIndex())
				out.push('<div class="', zcls, '-spacing" style="margin:0;display:list-item;width:100%;height:', tbx.getPanelSpacing(), ';"></div>');

			out.push('<div id="', this.uuid, '"', this.domAttrs_(), '>',
					'<div align="left" class="', zcls, '-header" >');
			if (isFrameRequired)
				out.push('<div class="', zcls, '-tl" ><div class="', zcls, '-tr" ></div></div>',
						'<div class="', zcls, '-hl" >',
						'<div class="', zcls, '-hr" >',
						(isFrameRequired ? hm: ''));
			if (this.isClosable())
				out.push('<a id="', this.uuid, '-close"  class="', zcls, '-close"></a>');

			out.push((!isFrameRequired ? hm: ''), '<span class="', zcls, '-text">', this.domContent_(), '</span></div></div></div>');
			if (isFrameRequired)
				out.push('</div></div>');
		}
	} else {
		out.push('<li ', this.domAttrs_(), '>');
		if (this.isClosable())
			out.push('<a id="', uuid, '-close" class="', zcls, '-close"', 'onClick="return false;" ></a>');
		else if (tbx.isVertical())
			out.push('<a class="', zcls, '-noclose" ></a>');

		out.push('<div id="', uuid, '-hl" class="', zcls, '-hl"><div id="', uuid, '-hr" class="', zcls, '-hr">');
		if (this.isClosable())
			out.push('<div id="', uuid, '-hm" class="', zcls, '-hm ', zcls, '-hm-close">');
		else
			out.push('<div id="', uuid, '-hm" class="', zcls, '-hm ">');
		out.push('<span class="', zcls, '-text">', this.domContent_(), '</span></div></div></div></li>');
	}
}
;zkmld(zk._p.p.Tab,zk._m);


(function () {
	function _syncSelectedPanels(panels) {
		
		var box;
		if (panels.desktop && (box = panels.getTabbox())) {
			var oldSel = panels._selPnl,
				sel = box._selTab;
			if (oldSel != (sel && (sel = sel.getLinkedPanel()))) {
				if (oldSel && oldSel.desktop) oldSel._sel(false, true);
				if (sel) sel._sel(true, true);
				panels._selPnl = sel;
			}
		}
	}


zul.tab.Tabpanels = zk.$extends(zul.Widget, {
	
	getTabbox: function() {
		return this.parent;
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;

		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tabpanels';

		var mold = tabbox.getMold();
		return 'z-tabpanels' + (mold == 'default' ? (tabbox.isVertical() ? '-ver': '') : '-' + mold);
	},
	setWidth: function (val) {
		var n = this.$n(),
			tabbox = this.getTabbox(),
			isVer = n && tabbox ? tabbox.isVertical() : false;
		if (isVer && !this.__width)
			n.style.width = '';

		this.$supers('setWidth', arguments);
		
		if (isVer) {
			if (n.style.width)
				this.__width = n.style.width;
				
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setStyle: function (val) {
		var n = this.$n(),
			tabbox = this.getTabbox(),
			isVer = n && tabbox ? tabbox.isVertical() : false;
		if (isVer && !this.__width) {
			n.style.width = '';
		}
		this.$supers('setStyle', arguments);

		if (isVer) {
			if (n.style.width)
				this.__width = n.style.width;
				
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanels, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanels, 'setHflex', v);
	},
	bind_: function () {
		this.$supers(zul.tab.Tabpanels, 'bind_', arguments);
		if (this.getTabbox().isVertical()) {
			this._zwatched = true;
			zWatch.listen({onSize: this, beforeSize: this, onShow: this});			
			var n = this.$n();
			if (n.style.width)
				this.__width = n.style.width;
		}
	},
	unbind_: function () {
		if (this._zwatched) {
			zWatch.unlisten({onSize: this, beforeSize: this, onShow: this});
			this._zwatched = false;
		}
		this.$supers(zul.tab.Tabpanels, 'unbind_', arguments);
	},
	onSize: _zkf = function () {
		var parent = this.parent.$n();
		if (this.__width || !zk(parent).isRealVisible())
			return;

		var width = parent.offsetWidth,
			n = this.$n();

		width -= jq(parent).find('>div:first')[0].offsetWidth
				+ jq(n).prev()[0].offsetWidth;

		n.style.width = jq.px0(zk(n).revisedWidth(width));
	},
	onShow: _zkf,
	beforeSize: function () {
		this.$n().style.width = this.__width || '';
	},
	onChildRemoved_: function (child) {
		this.$supers("onChildRemoved_", arguments);
		_syncSelectedPanels(this);
	},
	onChildAdded_: function (child) {
		this.$supers("onChildAdded_", arguments);
		_syncSelectedPanels(this);
	}
});
})();
zkreg('zul.tab.Tabpanels');zk._m={};
zk._m['default']=

function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
}
;zkmld(zk._p.p.Tabpanels,zk._m);


zul.tab.Tabpanel = zk.$extends(zul.Widget, {
	
	getTabbox: function() {
		return this.parent ? this.parent.parent : null;
	},
	isVisible: function() {
		return this.$supers('isVisible', arguments) && this.isSelected();
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;
			
		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tabpanel';
		
		var mold = tabbox.getMold();
		return 'z-tabpanel' + (mold == "default" ? (tabbox.isVertical() ? '-ver' : '') : '-' + mold);
	},
	
	getLinkedTab: function() {
		var tabbox =  this.getTabbox();
		if (!tabbox) return null;
		
		var tabs = tabbox.getTabs();
		return tabs ? tabs.getChildAt(this.getIndex()) : null;
	},
	
	getIndex:function() {
		return this.getChildIndex();
	},
	
	isSelected: function() {
		var tab = this.getLinkedTab();
		return tab && tab.isSelected();
	},
	
	_changeSel: function (oldPanel) {
		if (oldPanel) {
			var cave = this.$n('cave');
			if (cave && !cave.style.height && (oldPanel = oldPanel.$n('cave')))
				cave.style.height = oldPanel.style.height;
		}
	},
	_sel: function (toSel, animation) { 
		var accd = this.getTabbox().inAccordionMold();
		if (accd && animation) {
			var p = this.$n("real"); 
			zk(p)[toSel ? "slideDown" : "slideUp"](this);
		} else {
			var $pl = jq(accd ? this.$n("real") : this.$n()),
				vis = $pl.zk.isVisible();
			if (toSel) {
				if (!vis) {
					$pl.show();
					zWatch.fireDown('onShow', this);
				}
			} else if (vis) {
				zWatch.fireDown('onHide', this);
				$pl.hide();
			}
		}
	},
	_fixPanelHgh: function() {
		var tabbox = this.getTabbox();
		var tbx = tabbox.$n(),
		hgh = tbx.style.height;
		if (hgh && hgh != "auto") {
    		if (!tabbox.inAccordionMold()) {
        		var n = this.$n();
        		hgh = zk(n.parentNode).vflexHeight();
    			if (zk.ie8)
    				hgh -= 1; 
        		zk(n).setOffsetHeight(hgh);
        		if (zk.ie6_) {
        			var s = this.$n('cave').style,
        			z = s.zoom;
        			s.zoom = 1;
        			s.zoom = z;
        		}
    		} else {
    			var n = this.$n(),
    				hgh = zk(tbx).revisedHeight(tbx.offsetHeight);
    			hgh = zk(n.parentNode).revisedHeight(hgh);
				
				
				if (zk.opera) {
					var parent;
					if ((parent = tbx.parentNode) && tbx.style.height == '100%')
						hgh = zk(parent).revisedHeight(parent.offsetHeight);
				}
				
    			for (var e = n.parentNode.firstChild; e; e = e.nextSibling)
    				if (e != n) hgh -= e.offsetHeight;
    			hgh -= n.firstChild.offsetHeight;
    			hgh = zk(n = n.lastChild).revisedHeight(hgh);
    			if (zk.ie8)
    				hgh -= 1; 
    			var cave = this.getCaveNode(),
					s = cave.style;
    			s.height = jq.px0(hgh);
				
				if (zk.ie < 8)
					s.overflow = 'auto';
				if (n.offsetHeight - n.clientHeight > 11)
					s.height = jq.px0(hgh - jq.scrollbarWidth());
        		if (zk.ie < 8) {
        			var z = s.zoom;
        			s.zoom = 1;
        			s.zoom = z;
        			s.overflow = 'hidden';
        		}
    		}
		}
	},
	
	afterAnima_: function (visible) {
		this.$supers('afterAnima_', arguments);
		
		if (visible && this.getTabbox().inAccordionMold()) {
			var n, cave;
			if ((n = this.$n()) && (n = n.lastChild) && 
				(n.offsetHeight - n.clientHeight > 11) &&
				(cave = this.getCaveNode()) && cave.style.height)
				cave.style.height = 
					jq.px0(zk.parseInt(cave.style.height) - jq.scrollbarWidth());
		}
	},
	domClass_: function () {
		var cls = this.$supers('domClass_', arguments);
		if (this.getTabbox().inAccordionMold())
			cls += ' ' + this.getZclass() + '-cnt';
		return cls;
	},
	onSize: _zkf = function() {
		var tabbox = this.getTabbox();
		if (tabbox.inAccordionMold() && !zk(this.$n("real")).isVisible())
			return;
		this._fixPanelHgh();		
		if (zk.ie && !zk.ie8) zk(tabbox.$n()).redoCSS(); 
	},
	onShow: _zkf,
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanel, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanel, 'setHflex', v);
	},
	bind_: function() {
		this.$supers(zul.tab.Tabpanel, 'bind_', arguments);
		if (this.getTabbox().isHorizontal()) {
			this._zwatched = true;
			zWatch.listen({onSize: this, onShow: this});
		}
	},
	unbind_: function () {
		if (this._zwatched) {
			zWatch.unlisten({onSize: this, onShow: this});
			this._zwatched = false;
		}
		this.$supers(zul.tab.Tabpanel, 'unbind_', arguments);
	}
});
zkreg('zul.tab.Tabpanel',true);zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		tabbox = this.getTabbox();
	if (tabbox.inAccordionMold()) {
		var tab = this.getLinkedTab();
		
		out.push('<div class="', zcls, '-outer" id="', uuid, '">');
		if (tab)
			tab.redraw(out);
		out.push('<div id="', uuid, '-real"', this.domAttrs_({id:1}), '>',
				'<div id="', uuid, '-cave">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</div></div></div>');

	} else {
		out.push('<div', this.domAttrs_(), '>');
		if (tabbox.isHorizontal())
			out.push('<div id="', uuid, '-cave" class="', zcls, '-cnt">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		if (tabbox.isHorizontal())
			out.push('</div>');
		out.push('</div>');
	}
}
;zkmld(zk._p.p.Tabpanel,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.tab',1);