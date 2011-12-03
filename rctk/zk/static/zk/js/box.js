zk.load('zul,zul.wgt',function(){zk._p=zkpi('zul.box',true);try{
(function () {
	
	function _fireOnSize(wgt) {
		if (wgt._shallSize) {
			wgt._shallSize = false;
			if (wgt.desktop)
				zWatch.fire('onSize', wgt);
		}
	}
	function _syncSize(wgt) {
		if (wgt.desktop) {
			wgt._shallSize = true;
			if (!wgt.inServer)
				_fireOnSize(wgt);
		}
	}
	

zul.box.Layout = zk.$extends(zk.Widget, {
	_spacing: '0.3em',
	$define: {
		
		
		spacing: [function (v) {
			return v ? v : '0.3em';
		}, function () {
			var n = this.$n(),
				vert = this.isVertical_();
			if (n)
				jq(n).children('div:not(:last-child)').css('padding-' + (vert ? 'bottom' : 'right'), this._spacing || '');
		}]
	},
	_chdextr: function (child) {
		return child.$n('chdex') || child.$n();
	},
	insertChildHTML_: function (child, before, desktop) {
		if (before)
			jq(this._chdextr(before)).before(this.encloseChildHTML_(child));
		else {
			var jqn = jq(this.$n());
			jqn.children('div:last-child').css('padding-' + (this.isVertical_() ? 'bottom' : 'right'), this._spacing || '');
			jqn.append(this.encloseChildHTML_(child));
		}
		child.bind(desktop);
	},
	bind_: function () {
		this.$supers(zul.box.Layout, 'bind_', arguments);
		zWatch.listen({onResponse: this});
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		this.$supers(zul.box.Layout, 'unbind_', arguments);
	},
	onResponse: function () {
		_fireOnSize(this);
	},
	onChildAdded_: function () {
		this.$supers('onChildRemoved_', arguments);
		_syncSize(this);
	},
	onChildRemoved_: function () {
		this.$supers('onChildRemoved_', arguments);
		_syncSize(this);
	},
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		jq(child.uuid + '-chdex', zk).remove();
		var rmsp = this.lastChild == child;
		if(this.lastChild == child)
			jq(this.$n()).children('div:last-child').css('padding-' + (this.isVertical_() ? 'bottom' : 'right'), '');
	},
	
	encloseChildHTML_: function (child, out) {
		var oo = [],
			vert = this.isVertical_();
		
		oo.push('<div id="', child.uuid, '-chdex" class="', this.getZclass(), '-inner"');
		if(this._spacing && child.nextSibling)
			oo.push(' style="padding-' + (vert ? 'bottom:' : 'right:') + this._spacing + '"');
		oo.push('>');
		child.redraw(oo);
		oo.push('</div>');
		if (!out) return oo.join('');

		for (var j = 0, len = oo.length; j < len; ++j)
			out.push(oo[j]);
	},
	
	isVertical_: zk.$void,
	_resetBoxSize: function () {
		var vert = this.isVertical_();
		for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
			if (vert ? (kid._nvflex && kid.getVflex() != 'min')
					 : (kid._nhflex && kid.getHflex() != 'min')) {
				
				kid.setFlexSize_({height:'', width:''});
				var chdex = kid.$n('chdex');
				if (chdex) {
					chdex.style.height = '';
					chdex.style.width = '';
				}
			}
		}
		
		var p = this.$n(),
			zkp = zk(p),
			offhgh = p.offsetHeight,
			offwdh = p.offsetWidth,
			curhgh = this._vflexsz !== undefined ? this._vflexsz - zkp.sumStyles("tb", jq.margins) : offhgh,
			curwdh = this._hflexsz !== undefined ? this._hflexsz - zkp.sumStyles("lr", jq.margins) : offwdh,
			hgh = zkp.revisedHeight(curhgh < offhgh ? curhgh : offhgh),
			wdh = zkp.revisedWidth(curwdh < offwdh ? curwdh : offwdh);
		return zkp ? {height: hgh, width: wdh} : {};
	},
	
	afterResetChildSize_: function(orient) {
		for (var kid = this.firstChild; kid; kid = kid.nextSibling) {				
			var chdex = kid.$n('chdex');
			if (chdex) {
				if (orient == 'h')
					chdex.style.height = '';
				if (orient == 'w')
					chdex.style.width = '';
			}
		}
	},
	
	resetSize_: function (orient) { 
		this.$supers(zul.box.Layout, 'resetSize_', arguments);
		var vert = this.isVertical_();
		for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
			if (vert ? (kid._nvflex && kid.getVflex() != 'min')
					 : (kid._nhflex && kid.getHflex() != 'min')) {
				
				var chdex = kid.$n('chdex');
				if (chdex) {
					if (orient == 'h')
						chdex.style.height = '';
					if (orient == 'w')
						chdex.style.width = '';
				}
			}
		}
	},
	beforeChildrenFlex_: function(child) {
		if (child._flexFixed || (!child._nvflex && !child._nhflex)) { 
			delete child._flexFixed;
			return false;
		}
		
		child._flexFixed = true;
		
		var	vert = this.isVertical_(),
			vflexs = [],
			vflexsz = vert ? 0 : 1,
			hflexs = [],
			hflexsz = !vert ? 0 : 1,
			p = child.$n('chdex').parentNode,
			psz = this._resetBoxSize(),
			hgh = psz.height,
			wdh = psz.width,
			xc = p.firstChild;
		
		for (; xc; xc = xc.nextSibling) {
			var c = xc.id && xc.id.endsWith('-chdex') ? xc.firstChild : xc,
				zkc = zk(c);
			if (zkc.isVisible()) {
				var j = c.id ? c.id.indexOf('-') : 1,
					cwgt = j < 0 ? zk.Widget.$(c.id) : null,
					zkxc = zk(xc);
				
				
				if (cwgt && cwgt._nvflex) {
					if (cwgt !== child)
						cwgt._flexFixed = true; 
					if (cwgt._vflex == 'min') {
						cwgt.fixMinFlex_(c, 'h');
						xc.style.height = c.style.height;
						if (vert) 
							hgh -= xc.offsetHeight + zkxc.sumStyles("tb", jq.margins);
					} else {
						vflexs.push(cwgt);
						if (vert) {
							vflexsz += cwgt._nvflex;
							hgh = zkxc.revisedHeight(hgh, true); 
						}
					}
				} else if (vert)
					hgh -= xc.offsetHeight + zkxc.sumStyles("tb", jq.margins);
				
				
				if (cwgt && cwgt._nhflex) {
					if (cwgt !== child)
						cwgt._flexFixed = true; 
					if (cwgt._hflex == 'min') {
						cwgt.fixMinFlex_(c, 'w');
						xc.style.width = c.style.width;
						if (!vert)
							wdh -= xc.offsetWidth + zkxc.sumStyles("lr", jq.margins);
					} else {
						hflexs.push(cwgt);
						if (!vert) {
							hflexsz += cwgt._nhflex;
							wdh = zkxc.revisedWidth(wdh, true); 
						}
					}
				} else if (!vert)
					wdh -= xc.offsetWidth + zkxc.sumStyles("lr", jq.margins);
			}
		}

		
		
		var lastsz = hgh > 0 ? hgh : 0;
		for (var j = vflexs.length; --j > 0;) {
			var cwgt = vflexs.shift(), 
				vsz = (vert ? (cwgt._nvflex * hgh / vflexsz) : hgh) | 0, 
				offtop = cwgt.$n().offsetTop,
				isz = vsz - ((zk.ie && offtop > 0) ? (offtop * 2) : 0); 
			cwgt.setFlexSize_({height:isz});
			cwgt._vflexsz = vsz;
			
			var chdex = cwgt.$n('chdex');
			chdex.style.height = jq.px0(vsz);
			if (vert) lastsz -= vsz;
		}
		
		if (vflexs.length) {
			var cwgt = vflexs.shift(),
				offtop = cwgt.$n().offsetTop,
				isz = lastsz - ((zk.ie && offtop > 0) ? (offtop * 2) : 0);
			cwgt.setFlexSize_({height:isz});
			cwgt._vflexsz = lastsz;
			var chdex = cwgt.$n('chdex');
			chdex.style.height = jq.px0(lastsz);
		}
		
		
		lastsz = wdh > 0 ? wdh : 0;
		for (var j = hflexs.length; --j > 0;) {
			var cwgt = hflexs.shift(), 
				hsz = (vert ? wdh : (cwgt._nhflex * wdh / hflexsz)) | 0; 
			cwgt.setFlexSize_({width:hsz});
			cwgt._hflexsz = hsz;
		
			var chdex = cwgt.$n('chdex');
			chdex.style.width = jq.px0(hsz);
			
			if (!vert) lastsz -= hsz;
		}
		
		if (hflexs.length) {
			var cwgt = hflexs.shift();
			cwgt.setFlexSize_({width:lastsz});
			cwgt._hflexsz = lastsz;
			
			var chdex = cwgt.$n('chdex');
			chdex.style.width = jq.px0(lastsz);
		}
		
		
		child.parent.afterChildrenFlex_(child);
		child._flexFixed = false;
		
		return false; 
	},
	afterChildrenMinFlex_: function (opts) {
		var n = this.$n();
		if (opts == 'h') {
			if (this.isVertical_()) {
    			var total = 0;
    			for (var w = n.firstChild; w; w = w.nextSibling) {
    				if (w.firstChild.style.height) {
    					w.style.height = jq.px0(w.firstChild.offsetHeight + zk(w.firstChild).sumStyles("tb", jq.margins));
    				}
    				total += w.offsetHeight;
    			}
    			n.style.height = jq.px0(total);
			} else {
    			var max = 0;
    			for (var w = n.firstChild; w; w = w.nextSibling) {
    				var h = w.firstChild.offsetHeight;
    				if (h > max)
    					max = h;
    			}
    			n.style.height = jq.px0(max);
			}
		} else {
			if (!this.isVertical_()) {
    			var total = 0;
    			for (var w = n.firstChild; w; w = w.nextSibling) {
    				if (w.firstChild.style.width) {
    					w.style.width = jq.px0(w.firstChild.offsetWidth + zk(w.firstChild).sumStyles("lr", jq.margins));
    				}
    				total += w.offsetWidth;
    			}
    			n.style.width = jq.px0(total);
			} else {
    			var max = 0;
    			for (var w = n.firstChild; w; w = w.nextSibling) {
    				var wd = w.firstChild.offsetWidth;
    				if (wd > max)
    					max = wd;
    			}
    			n.style.width = jq.px0(max);				
			}
		}
	}
});
})();





(function () {

	
	function _spacing0(spacing) {
		return spacing && spacing.startsWith('0')
			&& (spacing.length == 1 || zUtl.isChar(spacing.charAt(1),{digit:1}));
	}
	function _spacingHTML(box, child) {
		var oo = [],
			spacing = box._spacing,
			spacing0 = _spacing0(spacing),
			vert = box.isVertical(),
			spstyle = spacing ? (vert?'height:':'width:') + spacing: 'px';

		oo.push('<t', vert?'r':'d', ' id="', child.uuid,
			'-chdex2" class="', box.getZclass(), '-sep"');

		var s = spstyle;
		if (spacing0 || !child.isVisible()) s = 'display:none;' + s;
		if (s) oo.push(' style="', s, '"');

		oo.push('>', vert?'<td>':'', zUtl.img0, vert?'</td></tr>':'</td>');
		return oo.join('');
	}

	
	function _fixTd() {
		
		var vert = this.isVertical();
		if (this._isStretchAlign() || (vert && this._nhflex) || (!vert && this._nvflex)) {
			for(var child = this.firstChild; child; child = child.nextSibling) {
				if (child.isVisible()) {
					var c = child.$n();
					if (vert) {
						if (child._nhflex)
							child.setFlexSize_({width:'auto'});
						else if (c && this._isStretchAlign()) {
									 
									 
							var oldwidth= c.style.width;
							if (oldwidth) {
								var oldoffwidth= c.offsetWidth;
								c.style.width= ''; 
								if (c.offsetWidth > oldoffwidth)
									c.style.width= oldwidth;
							}
						}
						if (!child.$instanceof(zul.wgt.Cell) && this._nhflex) {
							var chdex = child.$n('chdex');
							chdex.style.width = '';
						}
					} else {
						if (child._nvflex)
							child.setFlexSize_({height:'auto'});
						else if (c && this._isStretchAlign()) {
									 
									 
							var oldheight= c.style.height;
							if (oldheight) {
								var oldoffheight = c.offsetHeight;
								c.style.height= ''; 
								if (c.offsetHeight > oldoffheight)
									c.style.height= oldheight;
							}
						}
						if (!child.$instanceof(zul.wgt.Cell) && this._nvflex) {
							var chdex = child.$n('chdex');
							chdex.style.height = '';
						}
					}
				}
			}
		}
		
		
		if (zk.safari && !vert && this.$n().style.height) {
			var td = this.$n('frame');
			td.style.height = '';
			
			var	hgh = td.offsetHeight;
			td.style.height = hgh+'px';
		}
	}

var Box =

zul.box.Box = zk.$extends(zul.Widget, {
	_mold: 'vertical',
	_align: 'start',
	_pack: 'start',
	_sizedByContent: true,

	$define: {
		
		
		align: 
		    _zkf = function () {
		    	this.rerender(); 
		    },
		
		
		pack: _zkf,
		
		
		spacing: _zkf,
		
		
		sizedByContent: _zkf,
		widths: _zkf = function (val) {
		    this._sizes = val;
		    this.rerender();
		}
	},
	setHeights: function (val) {
		this.setWidths(val);
	},
	getHeights: function () {
		return this.getWidths();
	},
	
	isVertical: function () {
		return 'vertical' == this._mold;
	},
	
	getOrient: function () {
		return this._mold;
	},

	
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: this.isVertical() ? "z-vbox" : "z-hbox";
	},

	onChildVisible_: function (child) {
		this.$supers('onChildVisible_', arguments);
		if (this.desktop) this._fixChildDomVisible(child, child._visible);
	},
	replaceChildHTML_: function (child) {
		this.$supers('replaceChildHTML_', arguments);
		this._fixChildDomVisible(child, child._visible);
		if (child.$instanceof(zul.box.Splitter)) {
			var n = this._chdextr(child);
			if (n) {
				n.style.height = "";
				n.style.width = "";
			}
			zWatch.fireDown('onSize', this);
		}
	},
	_fixChildDomVisible: function (child, visible) {
		var n = this._chdextr(child);
		if (n) n.style.display = visible ? '': 'none';
		n = child.$n('chdex2');
		if (n) n.style.display = visible && !_spacing0(this._spacing) ? '': 'none';

		if (this.lastChild == child) {
			n = child.previousSibling;
			if (n) {
				n = n.$n('chdex2');
				if (n) n.style.display = visible ? '': 'none';
			}
		}
	},
	_chdextr: function (child) {
		return child.$n('chdex') || child.$n();
	},
	insertChildHTML_: function (child, before, desktop) {
		if (before) {
			jq(this._chdextr(before)).before(this.encloseChildHTML_(child));
		} else {
			var n = this.$n('real'), tbs = n.tBodies;
			if (!tbs || !tbs.length)
				n.appendChild(document.createElement("tbody"));
			jq(this.isVertical() ? tbs[0]: tbs[0].rows[0]).append(
				this.encloseChildHTML_(child, true));
		}
		child.bind(desktop);
	},
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		jq(child.uuid + '-chdex', zk).remove();
		jq(child.uuid + '-chdex2', zk).remove();
		var sib;
		if (this.lastChild == child && (sib = child.previousSibling)) 
			jq(sib.uuid + '-chdex2', zk).remove();
	},
	
	encloseChildHTML_: function (child, prefixSpace, out) {
		var oo = [],
			isCell = child.$instanceof(zul.wgt.Cell);
		if (this.isVertical()) {
			oo.push('<tr id="', child.uuid, '-chdex"',
				this._childOuterAttrs(child), '>');
				
			if (!isCell) {
				oo.push('<td', this._childInnerAttrs(child));
				
				var v = this.getAlign();
				if (v && v != 'stretch') oo.push(' align="', zul.box.Box._toHalign(v), '"');
				oo.push('>');
			}
				
			child.redraw(oo);
			
			if (!isCell) oo.push('</td>');
			
			oo.push('</tr>');

		} else {
			if (!isCell) {
				oo.push('<td id="', child.uuid, '-chdex"',
				this._childOuterAttrs(child),
				this._childInnerAttrs(child),
				'>');
			}
			child.redraw(oo);
			if (!isCell)
				oo.push('</td>');
		}
		
		if (child.nextSibling)
			oo.push(_spacingHTML(this, child));
		else if (prefixSpace) {
			var pre = child.previousSibling;
			if (pre) oo.unshift(_spacingHTML(this, pre));
		}
		
		if (!out) return oo.join('');

		for (var j = 0, len = oo.length; j < len; ++j)
			out.push(oo[j]);
	},
	_resetBoxSize: function () {
		var	vert = this.isVertical(),
			k = -1,
			szes = this._sizes;
		if (vert) {
			for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
				if (szes && !kid.$instanceof(zul.box.Splitter) && !kid.$instanceof(zul.wgt.Cell))
					++k;
				if (kid._nvflex && kid.getVflex() != 'min') {
					kid.setFlexSize_({height:'', width:''});
					var chdex = kid.$n('chdex');
					if (chdex) {
						chdex.style.height = szes && k < szes.length ? szes[k] : '';
						chdex.style.width = '';
					}
				}
			}
		} else {
			for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
				if (szes && !kid.$instanceof(zul.box.Splitter) && !kid.$instanceof(zul.wgt.Cell))
					++k;
				if (kid._nhflex && kid.getHflex() != 'min') {
					kid.setFlexSize_({height:'', width:''});
					var chdex = kid.$n('chdex');
					if (chdex) {
						chdex.style.width = szes && k < szes.length ? szes[k] : '';
						chdex.style.height = '';
					}
				}
			}
		}
		
		var p = this.$n(),
			zkp = zk(p),
			offhgh = p.offsetHeight,
			offwdh = p.offsetWidth,
			curhgh = this._vflexsz !== undefined ? this._vflexsz - zkp.sumStyles("tb", jq.margins) : offhgh,
			curwdh = this._hflexsz !== undefined ? this._hflexsz - zkp.sumStyles("lr", jq.margins) : offwdh,
			hgh = zkp.revisedHeight(curhgh < offhgh ? curhgh : offhgh),
			wdh = zkp.revisedWidth(curwdh < offwdh ? curwdh : offwdh);
		return zkp ? {height: hgh, width: wdh} : {};
	},
	
	resetSize_: function (orient) { 
		this.$supers(zul.Widget, 'resetSize_', arguments);
		var	vert = this.isVertical(),
		k = -1,
		szes = this._sizes;
		if (vert) {
			for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
				if (szes && !kid.$instanceof(zul.box.Splitter) && !kid.$instanceof(zul.wgt.Cell))
					++k;
				if (kid._nvflex && kid.getVflex() != 'min') {
					var chdex = kid.$n('chdex');
					if (chdex) {
						if (orient == 'h')
							chdex.style.height = szes && k < szes.length ? szes[k] : '';
						if (orient == 'w')
							chdex.style.width = '';
					}
				}
			}
		} else {
			for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
				if (szes && !kid.$instanceof(zul.box.Splitter) && !kid.$instanceof(zul.wgt.Cell))
					++k;
				if (kid._nhflex && kid.getHflex() != 'min') {
					var chdex = kid.$n('chdex');
					if (chdex) {
						if (orient == 'w')
							chdex.style.width = szes && k < szes.length ? szes[k] : '';
						if (orient == 'h')
							chdex.style.height = '';
					}
				}
			}
		}
	},
	beforeChildrenFlex_: function(child) {
		if (child._flexFixed || (!child._nvflex && !child._nhflex)) { 
			delete child._flexFixed;
			return false;
		}
		
		child._flexFixed = true;
		
		var	vert = this.isVertical(),
			vflexs = [],
			vflexsz = vert ? 0 : 1,
			hflexs = [],
			hflexsz = !vert ? 0 : 1,
			chdex = child.$n('chdex'), 
			p = chdex ? chdex.parentNode : child.$n().parentNode,
			zkp = zk(p),
			psz = this._resetBoxSize(),
			hgh = psz.height,
			wdh = psz.width,
			xc = p.firstChild,
			k = -1,
			szes = this._sizes;
		
		for (; xc; xc = xc.nextSibling) {
			var c = xc.id && xc.id.endsWith('-chdex') ? vert ? xc.firstChild.firstChild : xc.firstChild : xc,
				zkc = zk(c),
				fixedSize = false;
			if (zkc.isVisible()) {
				var j = c.id ? c.id.indexOf('-') : 1,
						cwgt = j < 0 ? zk.Widget.$(c.id) : null;

				if (szes && cwgt && !cwgt.$instanceof(zul.box.Splitter) && !cwgt.$instanceof(zul.wgt.Cell)) {
					++k;
					if (k < szes.length && szes[k] && ((vert && !cwgt._nvflex) || (!vert && !cwgt._nhflex))) {
						c = xc;
						zkc = zk(c);
						fixedSize = szes[k].endsWith('px');
					}
				}
				var offhgh = fixedSize && vert ? zk.parseInt(szes[k]) : 
						zk.ie && xc.id && xc.id.endsWith('-chdex2') && xc.style.height && xc.style.height.endsWith('px') ? 
						zk.parseInt(xc.style.height) : zkc.offsetHeight(),
					offwdh = fixedSize && !vert ? zk.parseInt(szes[k]) : zkc.offsetWidth(),
					cwdh = offwdh + zkc.sumStyles("lr", jq.margins),
					chgh = offhgh + zkc.sumStyles("tb", jq.margins);
				
				
				if (cwgt && cwgt._nvflex) {
					if (cwgt !== child)
						cwgt._flexFixed = true; 
					if (cwgt._vflex == 'min')
						cwgt.fixMinFlex_(c, 'h');
					else {
						vflexs.push(cwgt);
						if (vert) vflexsz += cwgt._nvflex;
					}
				} else if (vert) hgh -= chgh;
				
				
				if (cwgt && cwgt._nhflex) {
					if (cwgt !== child)
						cwgt._flexFixed = true; 
					if (cwgt._hflex == 'min')
						cwgt.fixMinFlex_(c, 'w');
					else {
						hflexs.push(cwgt);
						if (!vert) hflexsz += cwgt._nhflex;
					}
				} else if (!vert) wdh -= cwdh;
			}
		}

		
		
		var lastsz = hgh > 0 ? hgh : 0;
		for (var j = vflexs.length - 1; j > 0; --j) {
			var cwgt = vflexs.shift(), 
				vsz = (cwgt._nvflex * hgh / vflexsz) | 0, 
				offtop = cwgt.$n().offsetTop,
				isz = vsz - ((zk.ie && offtop > 0) ? (offtop * 2) : 0); 
			cwgt.setFlexSize_({height:isz});
			cwgt._vflexsz = vsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.height = jq.px0(zk(chdex).revisedHeight(vsz, true));
			}
			if (vert) lastsz -= vsz;
		}
		
		if (vflexs.length) {
			var cwgt = vflexs.shift(),
				offtop = cwgt.$n().offsetTop,
				isz = lastsz - ((zk.ie && offtop > 0) ? (offtop * 2) : 0);
			cwgt.setFlexSize_({height:isz});
			cwgt._vflexsz = lastsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.height = jq.px0(zk(chdex).revisedHeight(lastsz, true));
			}
		}
		
		
		
		lastsz = wdh > 0 ? wdh : 0;
		for (var j = hflexs.length - 1; j > 0; --j) {
			var cwgt = hflexs.shift(), 
				hsz = (cwgt._nhflex * wdh / hflexsz) | 0; 
			cwgt.setFlexSize_({width:hsz});
			cwgt._hflexsz = hsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.width = jq.px0(zk(chdex).revisedWidth(hsz, true));
			}
			if (!vert) lastsz -= hsz;
		}
		
		if (hflexs.length) {
			var cwgt = hflexs.shift();
			cwgt.setFlexSize_({width:lastsz});
			cwgt._hflexsz = lastsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.width = jq.px0(zk(chdex).revisedWidth(lastsz, true));
			}
		}
		
		
		child.parent.afterChildrenFlex_(child);
		child._flexFixed = false;
		
		return false; 
	},
	_childOuterAttrs: function (child) {
		var html = '';
		if (child.$instanceof(zul.box.Splitter))
			html = ' class="' + child.getZclass() + '-outer"';
		else if (this.isVertical()) {
			if (this._isStretchPack()) {
				var v = this._pack2; 
				html = ' valign="' + (v ? zul.box.Box._toValign(v) : 'top') + '"';
			} else html = ' valign="top"';
		} else
			return ''; 

		if (!child.isVisible()) html += ' style="display:none"';
		return html;
	},
	_childInnerAttrs: function (child) {
		var html = '',
			vert = this.isVertical(),
			$Splitter = zul.box.Splitter;
		if (child.$instanceof($Splitter))
			return vert ? ' class="' + child.getZclass() + '-outer-td"': '';
				

		if (this._isStretchPack()) {
			var v = vert ? this.getAlign() : this._pack2;
			if (v) html += ' align="' + zul.box.Box._toHalign(v) + '"';
		}
		
		var style = '', szes = this._sizes;
		if (szes) {
			for (var j = 0, len = szes.length, c = this.firstChild;
			c && j < len; c = c.nextSibling) {
				if (child == c) {
					style = (vert ? 'height:':'width:') + szes[j];
					break;
				}
				if (!c.$instanceof($Splitter))
					++j;
			}
		}

		if (!vert && !child.isVisible()) style += style ? ';display:none' : 'display:none';
		if (!vert) style += style ? ';height:100%' : 'height:100%';
		return style ? html + ' style="' + style + '"': html;
	},
	_isStretchPack: function() {
		
		
		return this._splitterKid || this._stretchPack;
	},
	_isStretchAlign: function() {
		return this._align == 'stretch';
	},
	
	_bindWatch: function () {
		if (!this._watchBound) {
			this._watchBound = true;
			zWatch.listen({onSize: this, onShow: this, onHide: this});
		}
	},
	_unbindWatch: function() {
		if (this._watchBound) {
			zWatch.unlisten({onSize: this, onShow: this, onHide: this});
			delete this._watchBound;
		}
	},
	bind_: function() {
		this.$supers(Box, 'bind_', arguments);
		this._bindFixTd();
		if (this._isStretchAlign())
			this._bindAlign();
		if (this._splitterKid)
			this._bindWatch();
	},
	unbind_: function () {
		this._unbindWatch();
		this._unbindAlign();
		this._unbindFixTd();
		this.$supers(Box, 'unbind_', arguments);
	},
	_bindAlign: function() {
		if (!this._watchAlign) {
			this._watchAlign = true;
			zWatch.listen({onSize: [this, this._fixAlign], onShow: [this, this._fixAlign], onHide: [this, this._fixAlign]});
		}
	},
	_unbindAlign: function() {
		if (this._watchAlign) {
			zWatch.unlisten({onSize: [this, this._fixAlign], onShow: [this, this._fixAlign], onHide: [this, this._fixAlign]});
			delete this._watchAlign;
		}
	},
	_fixAlign: function () {
		if (this._isStretchAlign()) {
			var vert = this.isVertical(),
				td = this.$n('frame'),
				zktd = zk(td),
				tdsz = vert ? zktd.revisedWidth(td.offsetWidth) : zktd.revisedHeight(td.offsetHeight);
			
			for(var child = this.firstChild; child; child = child.nextSibling) {
				if (child.isVisible()) {
					var c = child.$n();
					
					if (vert)
						c.style.width = zk(c).revisedWidth(tdsz, !zk.safari) + 'px';
					else 
						c.style.height = zk(c).revisedHeight(tdsz - ((zk.ie && c.offsetTop > 0) ? (c.offsetTop * 2) : 0), !zk.safari) + 'px';
				}
			}
		}
	},
	_bindFixTd: function() {
		if (!this._watchTd) {
			this._watchTd = true;
			zWatch.listen({onSize: [this, _fixTd], onShow: [this, _fixTd], onHide: [this, _fixTd]});
		}
	},
	_unbindFixTd: function() {
		if (this._watchTd) {
			zWatch.unlisten({onSize: [this, _fixTd], onShow: [this, _fixTd], onHide: [this, _fixTd]});
			delete this._watchTd;
		}
	},
	_configPack: function() {
		var v = this._pack;
		if (v) {
	    	var v = v.split(',');
	    	if (v[0].trim() == 'stretch') {
	    		this._stretchPack = true;
	    		this._pack2 = v.length > 1 ? v[1].trim() : null;
	    	} else {
	    		this._stretchPack = v.length > 1 && v[1].trim() == 'stretch';
	    		this._pack2 = v[0].trim();
	    	}
    	} else {
    		delete this._pack2;
    		delete this._stretchPack;
    	}
	},
	
	onSize: _zkf = function () {
		if (!this._splitterKid) return; 
		var vert = this.isVertical(), node = this.$n(), real = this.$n('real');
		real.style.height = real.style.width = '100%'; 
		
		
		
	
		
		
		

		
		
		

		var nd = vert ? real.rows: real.rows[0].cells,
			total = vert ? zk(real).revisedHeight(real.offsetHeight):
							zk(real).revisedWidth(real.offsetWidth);

		for (var i = nd.length; i--;) {
			var d = nd[i];
			if (zk(d).isVisible())
				if (vert) {
					var diff = d.offsetHeight;
					if(d.id && !d.id.endsWith("-chdex2")) { 
						
						if (d.cells.length) {
							var c = d.cells[0];
							c.style.height = zk(c).revisedHeight(i ? diff: total) + "px";
							d.style.height = ""; 
						} else {
							d.style.height = zk(d).revisedHeight(i ? diff: total) + "px";
						}
					}
					total -= diff;
				} else {
					var diff = d.offsetWidth;
					if(d.id && !d.id.endsWith("-chdex2")) 
						d.style.width = zk(d).revisedWidth(i ? diff: total) + "px";
					total -= diff;
				}
		}
	},
	onShow: _zkf,
	onHide: _zkf
},{ 
	_toValign: function (v) {
		return v ? "start" == v ? "top": "center" == v ? "middle":
			"end" == v ? "bottom": v: null;
	},
	_toHalign: function (v) {
		return v ? "start" == v ? "left": "end" == v ? "right": v: null;
	}
});

})();

zkreg('zul.box.Box');zk._m={};
zk._m['vertical']=

function (out) {
	delete this._splitterKid; 
	for (var w = this.firstChild; w; w = w.nextSibling)
		if (w.$instanceof(zul.box.Splitter)) {
			this._splitterKid = true;
			break;
		}
	this._configPack();
	
	out.push('<table', this.domAttrs_(), zUtl.cellps0, '><tr');
	
	if (!this._isStretchPack() && this._pack2) out.push(' valign="', zul.box.Box._toValign(this._pack2), '"');
	out.push('><td id="', this.uuid, '-frame" style="width:100%');
	
	
	
	if (zk.ie || zk.safari) out.push(';height:100%');
	out.push('"');
	
	var v = this.getAlign();
	if (v && v != 'stretch') out.push(' align="', zul.box.Box._toHalign(v), '"');
	out.push('><table id="', this.uuid, '-real"', zUtl.cellps0, 'style="text-align:left');
	if (v == 'stretch' || (zk.safari && (v == null || v == 'start'))) out.push(';width:100%');
	if (this._isStretchPack()) out.push(';height:100%');
	out.push('">');

	for (var w = this.firstChild; w; w = w.nextSibling)
		this.encloseChildHTML_(w, false, out);

	out.push('</table></td></tr></table>');
}
;zk._m['horizontal']=

function (out) {
	delete this._splitterKid; 
	for (var w = this.firstChild; w; w = w.nextSibling)
		if (w.$instanceof(zul.box.Splitter)) {
			this._splitterKid = true;
			break;
		}
	this._configPack();
	
	out.push('<table', this.domAttrs_(), zUtl.cellps0, '><tr');
	
	var	v = this.getAlign();
	if (v && v != 'stretch') out.push(' valign="', zul.box.Box._toValign(v), '"');
	
	
	out.push('><td id="', this.uuid, '-frame" style="width:100%;height:100%"');
	
	if (!this._isStretchPack() && this._pack2) out.push(' align="', zul.box.Box._toHalign(this._pack2), '"');
	out.push('><table id="', this.uuid, '-real"', zUtl.cellps0, 'style="text-align:left');
	if (!this.isSizedByContent()) out.push(';table-layout:fixed');
	if (v == 'stretch') out.push(';height:100%');
	if (this._isStretchPack()) out.push(';width:100%');

	
	out.push('"><tr valign="', v && v != 'stretch' ? zul.box.Box._toValign(v) : 'top', '">');
	
	for (var w = this.firstChild; w; w = w.nextSibling)
		this.encloseChildHTML_(w, false, out);

	out.push('</tr></table></td></tr></table>');
}
;zkmld(zk._p.p.Box,zk._m);

(function () {
	function _setOpen(wgt, open, opts) {
		var colps = wgt.getCollapse();
		if (!colps || "none" == colps) return; 

		var nd = wgt.$n('chdex'),
			vert = wgt.isVertical(),
			Splitter = wgt.$class,
			before = colps == "before",
			sib = before ? Splitter._prev(nd): Splitter._next(nd),
			sibwgt = zk.Widget.$(sib),
			fd = vert ? "height": "width", 
			diff = 0;
		if (sib) {
			if (!open)
				zWatch.fireDown('onHide', sibwgt);

			sibwgt.setDomVisible_(sib, open);
			sibwgt.parent._fixChildDomVisible(sibwgt, open);
			
			var c = vert && sib.cells.length ? sib.cells[0] : sib;
			diff = zk.parseInt(c.style[fd]);
			if (!before && sibwgt && !sibwgt.nextSibling) {
				var sp = wgt.$n('chdex2');
				if (sp) {
					sp.style.display = open ? '': 'none';
					diff += zk.parseInt(sp.style[fd]);
				}
			}
		}

		var sib2 = before ? Splitter._next(nd): Splitter._prev(nd);
		if (sib2) {
			var c = vert && sib2.cells.length ? sib2.cells[0] : sib2;
			diff = zk.parseInt(c.style[fd]) + (open ? -diff: diff);
			if (diff < 0) diff = 0;
			c.style[fd] = diff + "px";
		}
		if (sib && open)
			zWatch.fireDown('onShow', sibwgt);
		if (sib2)
			zWatch.fireDown('onSize', zk.Widget.$(sib2));

		wgt._fixNSDomClass();
		wgt._fixbtn();
		wgt._fixszAll();

		if (!opts || opts.sendOnOpen)
			wgt.fire('onOpen', {open:open});
			
	}

zul.box.Splitter = zk.$extends(zul.Widget, {
	_collapse: "none",
	_open: true,

	$define: {
		
		
		open: function(open, opts) {
			if (this.desktop)
				_setOpen(this, open, opts);
		}
	},

	
	isVertical: function () {
		var p = this.parent;
		return !p || p.isVertical();
	},
	
	getOrient: function () {
		var p = this.parent;
		return p ? p.getOrient(): "vertical";
	},

	
	getCollapse: function () {
		return this._collapse;
	},
	
	setCollapse: function(collapse) {
		if (this._collapse != collapse) {
			var bOpen = this._open;
			if (!bOpen)
				this.setOpen(true, {sendOnOpen:false}); 

			this._collapse = collapse;
			if (this.desktop) {
				this._fixbtn();
				this._fixsz();
			}

			if (!bOpen)
				this.setOpen(false, {sendOnOpen:false});
		}
	},

	
	getZclass: function () {
		var zcls = this._zclass,
			name = this.getMold() == "os" ? "z-splitter-os" : "z-splitter";
			
		return zcls ? zcls:	name + (this.isVertical() ? "-ver" : "-hor");
	},
	setZclass: function () {
		this.$supers('setZclass', arguments);
		if (this.desktop)
			this._fixDomClass(true);
	},

	bind_: function () {
		this.$supers(zul.box.Splitter, 'bind_', arguments);

		var box = this.parent;
		if (box && !box._splitterKid) box._bindWatch();

		zWatch.listen({onSize: this, beforeSize: this, onShow: this});

		this._fixDomClass();
			

		var node = this.$n(),
			Splitter = this.$class;

		if (!this.$weave) {
			var $btn = jq(this.$n('btn'));
			if (zk.ie)
				$btn.mouseover(Splitter.onover)
					.mouseout(Splitter.onout);
			$btn.click(Splitter.onclick);
		}

		this._fixbtn();

		this._drag = new zk.Draggable(this, node, {
			constraint: this.getOrient(), 
			ignoredrag: Splitter._ignoresizing,
			ghosting: Splitter._ghostsizing, 
			overlay: true, 
			zIndex: 12000,
			initSensitivity: 0,
			snap: Splitter._snap, 
			endeffect: Splitter._endDrag});

		this._shallClose = !this._open;
			
			
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, beforeSize: this, onShow: this});

		var Splitter = this.$class,
			btn;
		if (btn = this.$n('btn')) {
			var $btn = jq(btn);
			if (zk.ie)
				$btn.unbind("mouseover", Splitter.onover)
					.unbind("mouseout", Splitter.onout);
			$btn.unbind("click", Splitter.onclick);
		}

		this._drag.destroy();
		this._drag = null;
		this.$supers(zul.box.Splitter, 'unbind_', arguments);
	},

	
	_fixDomClass: function (inner) {
		var node = this.$n(),
			p = node.parentNode;
		if (p) {
			var vert = this.isVertical(),
				zcls = this.getZclass();;
			if (vert) p = p.parentNode; 
			if (p && p.id.endsWith("-chdex")) {
				p.className = zcls + "-outer";
				if (vert)
					node.parentNode.className = zcls + "-outer-td";
			}
		}
		if (inner) this._fixbtn();
	},
	_fixNSDomClass: function () {
		jq(this.$n())
			[this._open ? 'removeClass':'addClass'](this.getZclass()+"-ns");
	},
	_fixbtn: function () {
		var $btn = jq(this.$n('btn')),
			colps = this.getCollapse();
		if (!colps || "none" == colps) {
			$btn.hide();
		} else {
			var zcls = this.getZclass(),
				before = colps == "before";
			if (!this._open) before = !before;

			if (this.isVertical()) {
				$btn.removeClass(zcls + "-btn-" + (before ? "b" : "t"));
				$btn.addClass(zcls + "-btn-" + (before ? "t" : "b"));
			} else {
				$btn.removeClass(zcls + "-btn-" + (before ? "r" : "l"));
				$btn.addClass(zcls + "-btn-" + (before ? "l" : "r"));
			}
			$btn.show();
		}
	},
	_fixsz: _zkf = function () {
		if (!this.isRealVisible()) return;

		var node = this.$n(), pn = node.parentNode;
		if (pn) {
			var btn = this.$n('btn'),
				bfcolps = "before" == this.getCollapse();
			if (this.isVertical()) {
				
				
				
				
				if (bfcolps) {
					pn.vAlign = "top";
					pn.style.backgroundPosition = "top left";
				} else {
					pn.vAlign = "bottom";
					pn.style.backgroundPosition = "bottom left";
				}

				node.style.width = ""; 
				node.style.width = pn.clientWidth + "px"; 
				btn.style.marginLeft = ((node.offsetWidth - btn.offsetWidth) / 2)+"px";
			} else {
				if (bfcolps) {
					pn.align = "left";
					pn.style.backgroundPosition = "top left";
				} else {
					pn.align = "right";
					pn.style.backgroundPosition = "top right";
				}

				node.style.height = ""; 
				node.style.height =
					(zk.safari ? pn.parentNode.clientHeight: pn.clientHeight)+"px";
					
				btn.style.marginTop = ((node.offsetHeight - btn.offsetHeight) / 2)+"px";
			}
		}

		if (this._shallClose) { 
			delete this._shallClose;
			_setOpen(this, false, {sendOnOpen:false});
		}
	},
	onShow: _zkf,
	onSize: _zkf,
	beforeSize: function () {
		this.$n().style[this.isVertical() ? "width": "height"] = "";
	},

	_fixszAll: function () {
		
		var box;
		for (var p = this; p = p.parent;)
			if (p.$instanceof(zul.box.Box))
				box = p;

		if (box) this.$class._fixKidSplts(box);
		else this._fixsz();
	}
},{
	onclick: function (evt) {
		var wgt = zk.Widget.$(evt);
		jq(wgt.$n('btn')).removeClass(wgt.getZclass() + "-btn-visi");
		wgt.setOpen(!wgt._open);
	},

	
	_ignoresizing: function (draggable, pointer, evt) {
		var wgt = draggable.control;
		if (!wgt._open || wgt.$n('btn') == evt.domTarget) return true;

		var run = draggable.run = {},
			node = wgt.$n(),
			nd = wgt.$n('chdex'),
			Splitter = zul.box.Splitter;
		run.prev = Splitter._prev(nd);
		run.next = Splitter._next(nd);
		if(!run.prev || !run.next) return true; 
		run.prevwgt = wgt.previousSibling;
		run.nextwgt = wgt.nextSibling;
		run.z_offset = zk(node).cmOffset();
		return false;
	},
	_ghostsizing: function (draggable, ofs, evt) {
		var $node = zk(draggable.node);
		jq(document.body).append(
			'<div id="zk_ddghost" style="font-size:0;line-height:0;background:#AAA;position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$node.offsetWidth()+'px;height:'+$node.offsetHeight()
			+'px;"></div>');
		return jq("#zk_ddghost")[0];
	},
	_endDrag: function (draggable) {
		var wgt = draggable.control,
			vert = wgt.isVertical(),
			node = wgt.$n(),
			Splitter = zul.box.Splitter,
			flInfo = Splitter._fixLayout(wgt),
			bfcolps = "before" == wgt.getCollapse(),
			run = draggable.run, diff, fd;

		if (vert) {
			diff = run.z_point[1];
			fd = "height";

			
			if (run.next && run.next.cells.length) run.next = run.next.cells[0];
			if (run.prev && run.prev.cells.length) run.prev = run.prev.cells[0];
		} else {
			diff = run.z_point[0];
			fd = "width";
		}
		if (!diff) return; 

		if (run.nextwgt) zWatch.fireDown('beforeSize', run.nextwgt);
		if (run.prevwgt) zWatch.fireDown('beforeSize', run.prevwgt);
		
		var ns = 0;
		if (run.next) {
			var s = zk.parseInt(run.next.style[fd]);
			s -= diff;
			if (s < 0) s = 0;
			run.next.style[fd] = s + "px";
			if (!bfcolps) run.next.style.overflow = 'hidden';
		}
		if (run.prev) {
			var s = zk.parseInt(run.prev.style[fd]);
			s += diff;
			if (s < 0) s = 0;
			run.prev.style[fd] = s + "px";
			if (bfcolps) run.prev.style.overflow = 'hidden';
		}

		if (run.nextwgt) zWatch.fireDown('onSize', run.nextwgt);
		if (run.prevwgt) zWatch.fireDown('onSize', run.prevwgt);

		Splitter._unfixLayout(flInfo);
			
			

		wgt._fixszAll();
			
		draggable.run = null;
	},
	_snap: function (draggable, pos) {
		var run = draggable.run,
			wgt = draggable.control,
			x = pos[0], y = pos[1];
		if (wgt.isVertical()) {
			if (y <= run.z_offset[1] - run.prev.offsetHeight) {
				y = run.z_offset[1] - run.prev.offsetHeight;
			} else {
				var max = run.z_offset[1] + run.next.offsetHeight - wgt.$n().offsetHeight;
				if (y > max) y = max;
			}
		} else {
			if (x <= run.z_offset[0] - run.prev.offsetWidth) {
				x = run.z_offset[0] - run.prev.offsetWidth;
			} else {
				var max = run.z_offset[0] + run.next.offsetWidth - wgt.$n().offsetWidth;
				if (x > max) x = max;
			}
		}
		run.z_point = [x - run.z_offset[0], y - run.z_offset[1]];

		return [x, y];
	},

	_next: function (n) {
		return jq(n).next().next()[0];
	},
	_prev: function (n) {
		return jq(n).prev().prev()[0];
	},

	_fixKidSplts: function (wgt) {
		if (wgt.isVisible()) { 
			var Splitter = zul.box.Splitter;
			if (wgt.$instanceof(Splitter))
				wgt._fixsz();

			for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
				Splitter._fixKidSplts(wgt);
		}
	}
});

if (zk.ie) {
	zul.box.Splitter.onover = function (evt) {
		var wgt = zk.Widget.$(evt);
		$(wgt.$n('btn')).addClass(wgt.getZclass() + '-btn-visi');
	};
	zul.box.Splitter.onout = function (evt) {
		var wgt = zk.Widget.$(evt);
		$(wgt.$n('btn')).removeClass(wgt.getZclass() + '-btn-visi');
	};
}

if (zk.opera) { 
	zul.box.Splitter._fixLayout = function (wgt) {
		var box = wgt.parent.$n();
		if (box.style.tableLayout != "fixed") {
			var fl = [box, box.style.tableLayout];
			box.style.tableLayout = "fixed";
			return fl;
		}
	};
	zul.box.Splitter._unfixLayout = function (fl) {
		if (fl) fl[0].style.tableLayout = fl[1];
	};
} else
	zul.box.Splitter._fixLayout = zul.box.Splitter._unfixLayout = zk.$void;

})();
zkreg('zul.box.Splitter');zk._m={};
zk._m['os']=

function (out) {
	out.push('<div', this.domAttrs_(), '><span id="',
			this.uuid, '-btn"></span></div>');
}
;zk._m['default']=

function (out) {
	out.push('<div', this.domAttrs_(), '><span id="',
			this.uuid, '-btn"></span></div>');
}
;zkmld(zk._p.p.Splitter,zk._m);


zul.box.Hlayout = zk.$extends(zul.box.Layout, {
	isVertical_: function () {
		return false;
	},
	getZclass: function () {
		return this._zclass == null ? "z-hlayout" : this._zclass;
	}
});
zkreg('zul.box.Hlayout');zk._m={};
zk._m['default']=

function (out) {
    out.push('<div ', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		this.encloseChildHTML_(w, out);
    out.push('</div>');
}
;zkmld(zk._p.p.Hlayout,zk._m);


zul.box.Vlayout = zk.$extends(zul.box.Layout, {
	getZclass: function () {
		return this._zclass == null ? "z-vlayout" : this._zclass;
	},
	isVertical_: function () {
		return true;
	}
});
zkreg('zul.box.Vlayout');zk._m={};
zk._m['default']=

function (out) {
    out.push('<div ', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		this.encloseChildHTML_(w, out);
    out.push('</div>');
}
;zkmld(zk._p.p.Vlayout,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.box',1);