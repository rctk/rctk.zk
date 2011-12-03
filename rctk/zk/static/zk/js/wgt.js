zk.load('zul',function(){zk._p=zkpi('zul.wgt',true);try{




zul.wgt.A = zk.$extends(zul.LabelImageWidget, {
	_dir: "normal",
	

	$define: {
		
		
		disabled: function () {
			this.rerender(); 
		},
		
		
		dir: _zkf = function () {
			var n = this.$n();
			if (n) n.innerHTML = this.domContent_();
		},
		
		
		href: function (v) {
			var n = this.$n();
			if (n) n.href = v || '';
		},
		
		
		target: function (v) {
			var n = this.$n();
			if (n) n.target = v || '';
		},
		
		
		tabindex: function (v) {
			var n = this.$n();
			if (n) n.tabIndex = v||'';
		}
	},

	
	getZclass: function(){
		var zcls = this._zclass;
		return zcls ? zcls : "z-a";
	},

	bind_: function(){
		this.$supers(zul.wgt.A, 'bind_', arguments);
		if (!this._disabled) {
			var n = this.$n();
			this.domListen_(n, "onFocus", "doFocus_")
				.domListen_(n, "onBlur", "doBlur_");
		}
	},
	unbind_: function(){
		var n = this.$n();
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_");

		this.$supers(zul.wgt.A, 'unbind_', arguments);
	},
	domContent_: function(){
		var label = zUtl.encodeXML(this.getLabel()), img = this.getImage();
		if (!img) 
			return label;
		
		img = '<img src="' + img + '" align="absmiddle" />';
		return this.getDir() == 'reverse' ? label + img : img + label;
	},
	domClass_: function(no){
		var scls = this.$supers('domClass_', arguments);
		if (this._disabled && (!no || !no.zclass)) {
			var s = this.getZclass();
			if (s) 
				scls += (scls ? ' ' : '') + s + '-disd';
		}
		return scls;
	},
	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments),
			v;
		if (v = this.getTarget())
			attr += ' target="' + v + '"';
		if (v = this.getTabindex()) 
			attr += ' tabIndex="' + v + '"';
		if (v = this.getHref()) 
			attr += ' href="' + v + '"';
		else 
			attr += ' href="javascript:;"';
		return attr;
	},
	doClick_: function(evt){
		if (this._disabled) 
			evt.stop(); 
		else {
			this.fireX(evt);
			if (!evt.stopped)
				this.$super('doClick_', evt, true);
		}
			
	}
});


zkreg('zul.wgt.A');zk._m={};
zk._m['default']=

function (out) {
	out.push('<a ', this.domAttrs_(), '>', this.domContent_());

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</a>');
}

;zkmld(zk._p.p.A,zk._m);


zul.wgt.Cell = zk.$extends(zul.Widget, {
	_colspan: 1,
	_rowspan: 1,
	_rowType: 0,
	_boxType: 1,
	
	$define: {
		
		
		colspan: function (v) {
			var n = this.$n();
			if (n)
				n.colSpan = v;
		},
		
		
		rowspan: function (v) {
			var n = this.$n();
			if (n)
				n.rowSpan = v;
		},
		
		
		align: function (v) {
			var n = this.$n();
			if (n)
				n.align = v;
		},
		
		
		valign: function (v) {
			var n = this.$n();
			if (n)
				n.valign = v;
		}
	},
	_getParentType: function () {
		var isRow = zk.isLoaded('zul.grid') && this.parent.$instanceof(zul.grid.Row);
		if (!isRow) {
			return zk.isLoaded('zul.box') && this.parent.$instanceof(zul.box.Box) ?
					this._boxType : null;
		}
		return this._rowType;
	},
	_getRowAttrs: function () {
		return this.parent._childAttrs(this, this.getChildIndex());
	},
	_getBoxAttrs: function () {
		return this.parent._childInnerAttrs(this);
	},
	_colHtmlPre: function () {
		var s = '',
			p = this.parent;
		if(zk.isLoaded('zkex.grid') && p.$instanceof(zkex.grid.Group) && this == p.firstChild)
			s += p.domContent_();
		return s;
	},
	
	domAttrs_: function (no) {
		var s = this.$supers('domAttrs_', arguments), v;	
		if ((v = this._colspan) != 1)
			s += ' colspan="' + v + '"';
		if ((v = this._rowspan) != 1)
			s += ' rowspan="' + v + '"';
		if ((v = this._align))
			s += ' align="' + v + '"';
		if ((v = this._valign))
			s += ' valign="' + v + '"';
			
		var m1, m2 = zUtl.parseMap(s, ' ', '"');		
		switch (this._getParentType()) {
		case this._rowType:
			m1 = zUtl.parseMap(this._getRowAttrs(), ' ', '"');
			break;
		case this._boxType:
			m1 = zUtl.parseMap(this._getBoxAttrs(), ' ', '"');
			break;
		}
		if (m1) zk.copy(m1, m2);
		return ' ' + zUtl.mapToString(m1);
	},
	getZclass: function () {
		return this._zclass == null ? "z-cell" : this._zclass;
	},
	deferRedrawHTML_: function (out) {
		out.push('<td', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></td>');
	}
});
zkreg('zul.wgt.Cell');zk._m={};
zk._m['default']=

function (out) {
	out.push('<td', this.domAttrs_(), '>', this._colHtmlPre());
	for (var j = 0, w = this.firstChild; w; w = w.nextSibling, j++)
		w.redraw(out);
	out.push('</td>');
}

;zkmld(zk._p.p.Cell,zk._m);


zul.wgt.Div = zk.$extends(zul.Widget, {
	$define: {
		
		
		align: function (v) {
			var n = this.$n();
			if (n)
				n.align = v;
		}
	},
	
	domAttrs_: function(no) {
		var align = this._align,
			attr = this.$supers('domAttrs_', arguments);
		return align != null ? attr + ' align="' + align + '"' : attr;
	}
});

zkreg('zul.wgt.Div',true);zk._m={};
zk._m['default']=

zk.Page.prototype.redraw
;zkmld(zk._p.p.Div,zk._m);


zul.wgt.Span = zk.$extends(zul.Widget, {
});

zkreg('zul.wgt.Span',true);zk._m={};
zk._m['default']=

function (out) {
	out.push('<span', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</span>');
}
;zkmld(zk._p.p.Span,zk._m);


zul.wgt.Include = zk.$extends(zul.Widget, {
	_content: '',

	$init: function () {
		this._fellows = {};
		this.$supers('$init', arguments);
	},

	$define: {
		
		
		content: function (v) {
			var n = this.$n();
			if (n) {
				if (v && this._comment)
					v = '<!--\n' + v + '\n-->';
				n.innerHTML = v  || '';
			}
		},
		
		
		comment: null
	},

	
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments);
		if (!this.previousSibling && !this.nextSibling) {
		
			if ((!no || !no.width) && !this.getWidth())
				style += 'width:100%;';
			if ((!no || !no.height) && !this.getHeight())
				style += 'height:100%;';
		}
		return style;
	},
	bind_: function () {
		this.$supers(zul.wgt.Include, "bind_", arguments);
		var ctn;
		if (jq.isArray(ctn = this._content)) 
			for (var n = this.$n(), j = 0; j < ctn.length; ++j)
				n.appendChild(ctn[j]);
		if (ctn = this._childjs)
			ctn();
	},
	unbind_: function () {
		if (jq.isArray(this._content)) 
			for (var n = this.$n(); n.firstChild;)
				n.removeChild(n.firstChild);
		this.$supers(zul.wgt.Include, "unbind_", arguments);
	}
});

zkreg('zul.wgt.Include');zk._m={};
zk._m['default']=

function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	if (this._comment)
		out.push('<!--\n');
	if (!jq.isArray(this._content)) 
		out.push(this._content);
	if (this._comment)
		out.push('\n-->');
	out.push('</div>');
}

;zkmld(zk._p.p.Include,zk._m);


zul.wgt.Label = zk.$extends(zul.Widget, {
	_value: '',
	_maxlength: 0,

	$define: {
		
		
		value: _zkf = function () {
			var n = this.$n();
			if (n) n.innerHTML = this.getEncodedText();
		},
		
		
		multiline: _zkf,
		
		
		pre: _zkf,
		
		
		maxlength: _zkf
	},
	
	getEncodedText: function () {
		return zUtl.encodeXML(this._value, {multiline:this._multiline,pre:this._pre, maxlength: this._maxlength});
	},

	
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-label";
	}
});

zkreg('zul.wgt.Label');zk._m={};
zk._m['default']=

function (out) {
	out.push('<span', this.domAttrs_(), '>', this.getEncodedText(), '</span>');
}
;zkmld(zk._p.p.Label,zk._m);

(function () {
	
	var _fixhgh = zk.ie ? function (btn) {
		if (btn.desktop && btn._mold == 'trendy') {
			var n = btn.$n(),
				box = btn.$n('box');
			box.rows[1].style.height = "";
			box.style.height = !n.style.height || n.style.height == "auto" ? "": "100%";			
			if (n.style.height && box.offsetHeight) {
				var cellHgh = zk.parseInt(jq.css(box.rows[0].cells[0], 'height', 'styleonly'));
				if (cellHgh != box.rows[0].cells[0].offsetHeight) {
					box.rows[1].style.height = jq.px0(box.offsetHeight -
						cellHgh - zk.parseInt(jq.css(box.rows[2].cells[0], 'height', 'styleonly')));
				}
			}
		}
	}: zk.$void;
	var _fixwidth = zk.ie ? function (btn) {
		if (btn.desktop && btn._mold == 'trendy') {
			var width = btn.$n().style.width;
			btn.$n('box').style.width = !width || width == "auto" ? "": "100%";
		}
	}: zk.$void;

	function _initUpld(wgt) {
		if (!zk.ie && wgt._mold == 'trendy')
			zWatch.listen({onShow: wgt, onSize: wgt});
		var v;
		if (v = wgt._upload)
			wgt._uplder = new zul.Upload(wgt, null, v);
	}
	
	function _cleanUpld(wgt) {
		var v;
		if (v = wgt._uplder) {
			if (!zk.ie && wgt._mold == 'trendy')
				zWatch.unlisten({onShow: wgt, onSize: wgt});
			wgt._uplder = null;
			v.destroy();
		}
	}
	
	var _fixMouseupForClick = zk.safari || zk.gecko ? function (wgt, evt){
		
		
		if ( wgt._fxcfg == 1 ) {
			if (jq.contains(wgt.$n(), evt.domTarget)) {
				wgt._fxcfg = 2;
				if(wgt._fxctm) clearTimeout(wgt._fxctm);
				wgt._fxctm = setTimeout(function() {
					if (wgt._fxcfg == 2) {
						wgt.doClick_(new zk.Event(wgt, 'onClick', {}));
						wgt._fxctm = wgt._fxcfg = null;
					}
				}, 50);
			} else
				wgt._fxcfg = null;
		}
	}: zk.$void,

	_fixMousedownForClick = zk.safari || zk.gecko ?  function (wgt) {
		wgt._fxcfg = 1;
	}: zk.$void,

	_fixClick = zk.safari || zk.gecko  ? function (wgt) {
		if(wgt._fxctm) clearTimeout(wgt._fxctm);
		wgt._fxctm = wgt._fxcfg = null;
	}: zk.$void; 
	
var Button = 

zul.wgt.Button = zk.$extends(zul.LabelImageWidget, {
	_orient: "horizontal",
	_dir: "normal",
	_type: "button",
	

	$define: {
		
		
		href: null,
		
		
		target: null,
		
		
		dir: _zkf = function () {
			this.updateDomContent_();
		},
		
		
		orient: _zkf,
		
		
		type: _zkf,
		
		
		disabled: function (v) {
			if (this.desktop) {
				if (this._mold == "os") {
					var n = this.$n(),
						zclass = this.getZclass();
					if (zclass)
						jq(n)[(n.disabled = v) ? "addClass": "removeClass"](zclass + "-disd");
				} else
					this.rerender(); 
			}
		},
		image: function (v) {
			if (this._mold == 'trendy') {
				this.rerender();
			} else {				
				var n = this.getImageNode();
				if (n) 
					n.src = v || '';
			}
		},
		
		
		tabindex: function (v) {
			var n = this.$n();
			if (n) (this.$n('btn') || n).tabIndex = v||'';
		},
		
		
		autodisable: null,
		
		
		upload: function (v) {
			var n = this.$n();
			if (n && !this._disabled) {
				_cleanUpld(this);
				if (v && v != 'false') _initUpld(this);
			}
		}
	},

	
	setVisible: function (visible) {
		if (this._visible != visible) {
			this.$supers('setVisible', arguments);
			if (this._mold == 'trendy')
				this.rerender();
		}
		return this;
	},
	focus_: function (timeout) {
		zk(this.$n('btn')||this.$n()).focus(timeout);
		return true;
	},

	domContent_: function () {
		var label = zUtl.encodeXML(this.getLabel()),
			img = this.getImage();
		if (!img) return label;

		img = '<img src="' + img + '" align="absmiddle" />';
		var space = "vertical" == this.getOrient() ? '<br/>': ' ';
		return this.getDir() == 'reverse' ?
			label + space + img: img + space + label;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (this._disabled && (!no || !no.zclass)) {
			var s = this.getZclass();
			if (s) scls += (scls ? ' ': '') + s + '-disd';
		}
		return scls;
	},

	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: this._mold != 'trendy' ? "z-button-os": "z-button";
	},
	bind_: function () {
		this.$supers(Button, 'bind_', arguments);

		var n;
		if (this._mold != 'trendy') {
			n = this.$n();
		} else {
			if (this._disabled) return;

			zk(this.$n('box')).disableSelection();

			n = this.$n('btn');
			if (zk.ie) zWatch.listen({onSize: this, onShow: this});
		}

		this.domListen_(n, "onFocus", "doFocus_")
			.domListen_(n, "onBlur", "doBlur_");

		if (!this._disabled && this._upload) _initUpld(this);
	},
	unbind_: function () {
		_cleanUpld(this);

		var trendy = this._mold == 'trendy',
			n = !trendy ? this.$n(): this.$n('btn');
		if (n) {
			this.domUnlisten_(n, "onFocus", "doFocus_")
				.domUnlisten_(n, "onBlur", "doBlur_");
		}
		if (zk.ie && trendy)
			zWatch.unlisten({onSize: this, onShow: this});

		this.$supers(Button, 'unbind_', arguments);
	},

	
	setWidth: zk.ie ? function (v) {
		this.$supers('setWidth', arguments);
		_fixwidth(this);
	}: function () {
		this.$supers('setWidth', arguments);
	},
	
	setHeight: zk.ie ? function (v) {
		this.$supers('setHeight', arguments);
		_fixhgh(this);
	}: function () {
		this.$supers('setHeight', arguments);
	},

	onSize: _zkf = zk.ie ? function () {
		_fixhgh(this);
		_fixwidth(this);
		if (this._uplder)
			this._uplder.sync();
	} : function () {
		if (this._uplder)
			this._uplder.sync();
	},
	onShow: _zkf,
	doFocus_: function (evt) {
		if (this._mold == 'trendy')
			jq(this.$n('box')).addClass(this.getZclass() + "-focus");
		this.$supers('doFocus_', arguments);
	},
	doBlur_: function (evt) {
		if (this._mold == 'trendy')
			jq(this.$n('box')).removeClass(this.getZclass() + "-focus");
		this.$supers('doBlur_', arguments);
	},
	doClick_: function (evt) {
		_fixClick(this);
		
		if (!this._disabled) {
			zul.wgt.ADBS.autodisable(this);
			if (this._type != "button") {
				var n;
				if ((n = this.$n('btn')) && (n = n.form)) {
					if (this._type != "reset") zk(n).submit();
					else n.reset();
					return;
				}
			}
			
			this.fireX(evt);

			if (!evt.stopped) {
				var href = this._href;
				if (href)
					zUtl.go(href, {target: this._target || (evt.data.ctrlKey ? '_blank' : '')});
				this.$super('doClick_', evt, true);
			}
		}
		
		
	},
	doMouseOver_: function () {
		if (!this._disabled)
			jq(this.$n('box')).addClass(this.getZclass() + "-over");
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		if (!this._disabled && this != Button._curdn
		&& !(zk.ie && jq.isAncestor(this.$n('box'), evt.domEvent.relatedTarget || evt.domEvent.toElement)))
			jq(this.$n('box')).removeClass(this.getZclass() + "-over");
		this.$supers('doMouseOut_', arguments);
	},
	doMouseDown_: function () {
		
		
		
		
		_fixMousedownForClick(this);
		
		if (!this._disabled) {
			var zcls = this.getZclass();
			jq(this.$n('box')).addClass(zcls + "-clk")
				.addClass(zcls + "-over")
			if (!zk.ie || !this._uplder) zk(this.$n('btn')).focus(30);
				
		}
		zk.mouseCapture = this; 
		this.$supers('doMouseDown_', arguments);
	},
	doMouseUp_: function (evt) {
		if (!this._disabled) {
			_fixMouseupForClick(this, evt);
			
			var zcls = this.getZclass();
			jq(this.$n('box')).removeClass(zcls + "-clk")
				.removeClass(zcls + "-over");
			if (zk.ie && this._uplder) zk(this.$n('btn')).focus(30);
		}
		this.$supers('doMouseUp_', arguments);
	},
	setFlexSize_: function(sz) { 
		var n = this.$n();
		if (sz.height !== undefined) {
			if (sz.height == 'auto')
				n.style.height = '';
			else if (sz.height != '')
				n.style.height = jq.px0(this._mold == 'trendy' ? zk(n).revisedHeight(sz.height, true) : sz.height);
			else
				n.style.height = this._height ? this._height : '';
			_fixhgh(this);
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto')
				n.style.width = '';
			else if (sz.width != '')
				n.style.width = jq.px0(this._mold == 'trendy' ? zk(n).revisedWidth(sz.width, true) : sz.width);
			else
				n.style.width = this._width ? this._width : '';
			_fixwidth(this);
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	}
});

zul.wgt.ADBS = zk.$extends(zk.Object, {
	$init: function (ads) {
		this._ads = ads;
	},
	onResponse: function () {
		for (var ads = this._ads, ad; ad = ads.shift();)
			ad.setDisabled(false);
		zWatch.unlisten({onResponse: this});
	}
},{ 
	
	autodisable: function(wgt) {
		var ads = wgt._autodisable, aded;
		if (ads) {
			ads = ads.split(',');
			for (var j = ads.length; j--;) {
				var ad = ads[j].trim();
				if (ad) {
					var perm;
					if (perm = ad.charAt(0) == '+')
						ad = ad.substring(1);
					ad = "self" == ad ? wgt: wgt.$f(ad);
					if (ad && !ad._disabled) {
						ad.setDisabled(true);
						if (wgt.inServer)
							if (perm)
								ad.smartUpdate('disabled', true);
							else if (!aded) aded = [ad];
							else aded.push(ad);
					}
				}
			}
		}
		if (aded) {
			aded = new zul.wgt.ADBS(aded);
			if (wgt.isListen('onClick', {asapOnly:true}))
				zWatch.listen({onResponse: aded});
			else
				setTimeout(function () {aded.onResponse();}, 800);
		}
	}
});

})();

zkreg('zul.wgt.Button');zk._m={};
zk._m['os']=

function (out) {
	out.push('<button type="', this._type, '"', this.domAttrs_());
	var tabi = this._tabindex;
	if (this._disabled) out.push(' disabled="disabled"');
	if (tabi) out.push(' tabindex="', tabi, '"');
	out.push('>', this.domContent_(), '</button>');
}
;zk._m['trendy']=

function (out) {
	var zcls = this.getZclass(),
		tabi = this._tabindex,
		uuid = this.uuid;
	tabi = tabi ? ' tabindex="' + tabi + '"': '';

	var btn = '<button type="' + this._type + '" id="' + uuid + '-btn" class="' + zcls + '"',
		s = this.isDisabled();
	if (s) btn += ' disabled="disabled"';
	if (tabi && (zk.gecko || zk.safari)) btn += tabi;
	btn += '></button>';

	var wd = "100%", hgh = "100%";
	if (zk.ie && !zk.ie8) {
		
		if (!this._width) wd = "";
		if (!this._height) hgh = "";
	}
	out.push('<span', this.domAttrs_(),
			'><table id="', uuid, '-box" style="width:', wd, ';height:', hgh, '"', zUtl.cellps0,
			(tabi && !zk.gecko && !zk.safari ? tabi : ''),
			'><tr><td class="', zcls, '-tl">', (!zk.ie ? btn : ''),
			'</td><td class="', zcls, '-tm"></td>', '<td class="', zcls,
			'-tr"></td></tr>', '<tr><td class="', zcls, '-cl">',
			(zk.ie ? btn : ''),
			'</td><td class="', zcls, '-cm"',
			this.domTextStyleAttr_(), '>', this.domContent_(),
			'</td><td class="', zcls, '-cr"><div></div></td></tr>',
			'<tr><td class="', zcls, '-bl"></td>',
			'<td class="', zcls, '-bm"></td>',
			'<td class="', zcls, '-br"></td></tr></table></span>');
}
;zk._m['default']=

function (out) {
	out.push('<button type="', this._type, '"', this.domAttrs_());
	var tabi = this._tabindex;
	if (this._disabled) out.push(' disabled="disabled"');
	if (tabi) out.push(' tabindex="', tabi, '"');
	out.push('>', this.domContent_(), '</button>');
}
;zkmld(zk._p.p.Button,zk._m);


zul.wgt.Separator = zk.$extends(zul.Widget, {
	_orient: 'horizontal',

	$define: { 
		
		
		orient: _zkf = function () {
			this.updateDomClass_();
		},
		
		
		bar: _zkf,
		
		
		spacing: function () {
			this.updateDomStyle_();
		}
	},

	
	isVertical: function () {
		return this._orient == 'vertical';
	},

	
	bind_: function () {
		this.$supers(zul.wgt.Separator, 'bind_', arguments);

		var n;
		if (zk.ie && (n = this.$n()).offsetWidth <= 2)
			n.style.backgroundPosition = "left top"; 
	},

	getZclass: function () {
		var zcls = this._zclass,
			bar = this.isBar();
		return zcls ? zcls: "z-separator" +
			(this.isVertical() ? "-ver" + (bar ? "-bar" : "") :
				"-hor" + (bar ? "-bar" : ""))
	},
	domStyle_: function () {
		var s = this.$supers('domStyle_', arguments);
		if (!this._isPercentGecko()) return s;

		var v = zk.parseInt(this._spacing.substring(0, this._spacing.length - 1).trim());
		if (v <= 0) return s;
		v = v >= 2 ? (v / 2) + "%": "1%";

		return 'margin:' + (this.isVertical() ? '0 ' + v: v + ' 0')
			+ ';' + s;
	},
	getWidth: function () {
		var wd = this.$supers('getWidth', arguments);
		return !this.isVertical() || (wd != null && wd.length > 0)
			|| this._isPercentGecko() ? wd: this._spacing;
		
	},
	getHeight: function () {
		var hgh = this.$supers('getHeight', arguments);
		return this.isVertical() || (hgh != null && hgh.length > 0)
			|| this._isPercentGecko() ? hgh: this._spacing;
	},
	_isPercentGecko: function () {
		return zk.gecko && this._spacing != null && this._spacing.endsWith("%");
	}
});

zkreg('zul.wgt.Separator');zk._m={};
zk._m['default']=

function (out) {
	var tag = this.isVertical() ? 'span': 'div';
	out.push('<', tag, this.domAttrs_(), '>&nbsp;</', tag, '>');
}
;zkmld(zk._p.p.Separator,zk._m);


zul.wgt.Space = zk.$extends(zul.wgt.Separator, {
	_orient: 'vertical'
});
zkreg('zul.wgt.Space');zk._m={};
zk._m['default']=

zul.wgt.Separator.molds['default']
;zkmld(zk._p.p.Space,zk._m);


zul.wgt.Caption = zk.$extends(zul.LabelImageWidget, {
	
	domDependent_: true, 
	rerender: function () {
		if (this.parent && this.parent.$instanceof(zul.wgt.Groupbox)
				&& this.parent.isLegend())
			this.parent.rerender();
		else
			this.$supers('rerender', arguments);
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-caption";
	},
	domContent_: function () {
		var label = this.getLabel(),
			img = this.getImage(),
			title = this.parent ? this.parent._title: '';
		if (title) label = label ? title + ' - ' + label: title;
		label = zUtl.encodeXML(label);
		if (!img) return label;

		img = '<img src="' + img + '" align="absmiddle" />';
		return label ? img + ' ' + label: img;
	},
	domClass_: function (no) {
		var sc = this.$supers('domClass_', arguments),
			parent = this.parent;
			
		if (!parent.$instanceof(zul.wgt.Groupbox))
			return sc;
			
		return sc + (parent._closable ? '': ' ' + this.getZclass() + '-readonly');
	},
	doClick_: function () {
		if (this.parent.$instanceof(zul.wgt.Groupbox))
			this.parent.setOpen(!this.parent.isOpen());
		this.$supers('doClick_', arguments);
	},
	
	
	_isCollapsibleVisible: function () {
		var parent = this.parent;
		return parent.isCollapsible && parent.isCollapsible();
	},
	
	_isCloseVisible: function () {
		var parent = this.parent;
		return parent.isClosable && parent.isClosable()
			&& !parent.$instanceof(zul.wgt.Groupbox);
	},
	
	_isMinimizeVisible: function () {
		var parent = this.parent;
		return parent.isMinimizable && parent.isMinimizable();
	},
	
	_isMaximizeVisible: function () {
		var parent = this.parent;
		return parent.isMaximizable && parent.isMaximizable();
	},
	
	
	
	_isIgnoreMargin: function () {
		var parent = this.parent;
		return zk.safari && parent && parent.$instanceof(zul.wgt.Groupbox) && parent.isLegend();  
	}
});
zkreg('zul.wgt.Caption',true);zk._m={};
zk._m['default']=

function (out) {
	var parent = this.parent;
	if (parent.isLegend && parent.isLegend()) {
		out.push('<legend', this.domAttrs_(), '><span>', this.domContent_());
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</span></legend>');
		return;
	}

	var zcls = this.getZclass(),
		cnt = this.domContent_(),
		puuid = parent.uuid,
		pzcls = parent.getZclass();
	out.push('<table', this.domAttrs_(), zUtl.cellps0,
			' width="100%"><tr valign="middle"><td align="left" class="',
			zcls, '-l">', (cnt?cnt:'&nbsp;'), 
			'</td><td align="right" class="', zcls,
			'-r" id="', this.uuid, '-cave">');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</td>');
	if (this._isCollapsibleVisible())
		out.push('<td width="16"><div id="', puuid, '-exp" class="',
				pzcls, '-icon ', pzcls, '-exp"></div></td>');
	if (this._isMinimizeVisible())
		out.push('<td width="16"><div id="', puuid, '-min" class="',
				pzcls, '-icon ', pzcls, '-min"></div></td>');
	if (this._isMaximizeVisible()) {
		out.push('<td width="16"><div id="', puuid, '-max" class="',
				pzcls, '-icon ', pzcls, '-max');
		if (parent.isMaximized())
			out.push(' ', pzcls, '-maximized');
		out.push('"></div></td>');
	}
	if (this._isCloseVisible())
		out.push('<td width="16"><div id="', puuid, '-close" class="',
				pzcls, '-icon ', pzcls, '-close"></div></td>');

	out.push('</tr></table>');
}
;zkmld(zk._p.p.Caption,zk._m);

(function () {
	var _domClick = zk.gecko2_ ? function (evt) {
		var e = evt.originalEvent;
		if (e) e.z$target = e.currentTarget;
			
			
			
			
	}: null;

	
	function _shallIgnore(evt) {
		var v = evt.domEvent;
		return v && jq.nodeName(v.target, "label");
	}

var Checkbox =

zul.wgt.Checkbox = zk.$extends(zul.LabelImageWidget, {
	
	_checked: false,

	$define: {
		
		
		disabled: function (v) {
			var n = this.$n('real');
			if (n) n.disabled = v;
		},
		
		
		checked: function (v) {
			var n = this.$n('real');
			if (n) n.checked = v;
		},
		
		
		name: function (v) {
			var n = this.$n('real');
			if (n) n.name = v || '';
		},
		
		
		tabindex: function (v) {
			var n = this.$n('real');
			if (n) n.tabIndex = v||'';
		},
		
		
		value: function (v) {
			var n = this.$n('real');
			if (n) n.value = v || '';
		}
	},

	
	focus_: function (timeout) {
		zk(this.$n('real')||this.$n()).focus(timeout);
		return true;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-checkbox";
	},
	contentAttrs_: function () {
		var html = '', v; 
		if (v = this.getName())
			html += ' name="' + v + '"';
		if (this._disabled)
			html += ' disabled="disabled"';
		if (this._checked)
			html += ' checked="checked"';
		if (v = this._tabindex)
			html += ' tabindex="' + v + '"';
		if (v = this.getValue())
			html += ' value="' + v + '"';
		return html;
	},
	bind_: function (desktop) {
		this.$supers(Checkbox, 'bind_', arguments);

		var n = this.$n('real');
		
		
		if (n.checked != n.defaultChecked)
			n.checked = n.defaultChecked;

		if (zk.gecko2_)
			jq(n).click(_domClick);
		this.domListen_(n, "onFocus", "doFocus_")
			.domListen_(n, "onBlur", "doBlur_");
	},
	unbind_: function () {
		var n = this.$n('real');
		
		if (zk.gecko2_)
			jq(n).unbind("click", _domClick);
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_");

		this.$supers(Checkbox, 'unbind_', arguments);
	},
	doSelect_: function (evt) {
		if (!_shallIgnore(evt))
			this.$supers("doSelect_", arguments);
	},
	doClick_: function (evt) {
		if (!_shallIgnore(evt)) {
			var real = this.$n('real'),
				checked = real.checked;
			if (checked != this._checked) 
				this.setChecked(checked) 
					.fireOnCheck_(checked);
			if (zk.safari) zk(real).focus();
			return this.$supers('doClick_', arguments);
		}
	},
	fireOnCheck_: function (checked) {
		this.fire('onCheck', checked);
	},
	beforeSendAU_: function (wgt, evt) {
		if (evt.name != "onClick") 
			this.$supers("beforeSendAU_", arguments);
	},
	getTextNode: function () {
		return jq(this.$n()).find('label:first')[0];
	}
});

})();
zkreg('zul.wgt.Checkbox');zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid, zcls = this.getZclass(), content = this.domContent_();
	out.push('<span', this.domAttrs_(), '>', '<input type="checkbox" id="', uuid,
			'-real"', this.contentAttrs_(), '/><label ');
		
	
	
	
	if(!(zk.ie7_ || zk.ie6_) || jq.trim(content))
		out.push('for="', uuid, '-real"');
	
	out.push(this.domTextStyleAttr_(), 
			' class="', zcls, '-cnt">', this.domContent_(),	'</label></span>');
			
}
;zkmld(zk._p.p.Checkbox,zk._m);


zul.wgt.Groupbox = zk.$extends(zul.Widget, {
	_open: true,
	_closable: true,

	$define: { 
		
		
		open: function (open, fromServer) {
			var node = this.$n();
			if (node && this._closable) {
				if (this.isLegend()) { 
					if (!open) zWatch.fireDown('onHide', this);
					jq(node)[open ? 'removeClass': 'addClass'](this.getZclass() + "-colpsd");
					if (zk.ie6_) 
						zk(this).redoCSS();
					if (open) zWatch.fireDown('onShow', this);
				} else {
					zk(this.getCaveNode())[open?'slideDown':'slideUp'](this);
				}
				if (!fromServer) this.fire('onOpen', {open:open});
			}
		},
		
		
		closable: _zkf = function () {
			this._updDomOuter();
		},
		
		
		contentStyle: _zkf,
		
		
		contentSclass: _zkf
	},
	
	isLegend: function () {
		return this._mold == 'default';
	},

	_updDomOuter: function () {
		this.rerender(zk.Skipper.nonCaptionSkipper);
	},
	_contentAttrs: function () {
		var html = ' class="', s = this._contentSclass;
		if (s) html += s + ' ';
		html += this.getZclass() + '-cnt"';

		s = this._contentStyle;
		if (!this.isLegend()) {
			if (this.caption) s = 'border-top:0;' + (s||'');
			if (!this._open) s = 'display:none;' + (s||'');
		}
		if (s) html += ' style="' + s + '"';
		return html;
	},
	_redrawCave: function (out, skipper) { 
		out.push('<div id="', this.uuid, '-cave"', this._contentAttrs(), '>');
	
		if (!skipper)
			for (var w = this.firstChild, cap = this.caption; w; w = w.nextSibling)
				if (w != cap)
					w.redraw(out);

		out.push('</div>');
	},

	setHeight: function () {
		this.$supers('setHeight', arguments);
		if (this.desktop) this._fixHgh();
	},
	_fixHgh: function () {
		var hgh = this.$n().style.height;
		if (hgh && hgh != "auto") {
			var n;
			if (n = this.$n('cave')) {
				if (zk.ie6_) n.style.height = "";
				var wgt = this,
					$n = zk(n),
					fix = function() {
					n.style.height = wgt.isLegend()? hgh:
						$n.revisedHeight($n.vflexHeight(), true)
						+ "px";
				};
				fix();
				if (zk.gecko) setTimeout(fix, 0);
					
					
			}
		}
	},

	
	onSize: _zkf = function () {
		this._fixHgh();
		if (!this.isLegend())
			setTimeout(this.proxy(this._fixShadow), 500);
			
	},
	onShow: _zkf,
	_fixShadow: function () {
		var sdw = this.$n('sdw');
		if (sdw)
			sdw.style.display =
				zk.parseInt(jq(this.$n('cave')).css("border-bottom-width")) ? "": "none";
				
	},
	updateDomStyle_: function () {
		this.$supers('updateDomStyle_', arguments);
		if (this.desktop) this.onSize();
	},

	
	focus_: function (timeout) {
		var cap = this.caption;
		for (var w = this.firstChild; w; w = w.nextSibling)
			if (w != cap && w.focus_(timeout))
				return true;
		return cap && cap.focus_(timeout);
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls ? zcls: this.isLegend() ? "z-fieldset": "z-groupbox";
	},
	bind_: function () {
		this.$supers(zul.wgt.Groupbox, 'bind_', arguments);
		
		
		zWatch.listen({onSize: this, onShow: this});
	},
	unbind_: function () {
		
		
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(zul.wgt.Groupbox, 'unbind_', arguments);
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

	domClass_: function () {
		var html = this.$supers('domClass_', arguments);
		if (!this._open) {
			if (html) html += ' ';
			html += this.getZclass() + '-colpsd';
		}
		return html;
	}
});

zkreg('zul.wgt.Groupbox',true);zk._m={};
zk._m['3d']=

function (out, skipper) {	
	var	zcls = this.getZclass(),
		uuid = this.uuid,
		cap = this.caption;

	out.push('<div', this.domAttrs_(), '>');
	
	if (cap) {
		out.push('<div class="', zcls, '-tl"><div class="', zcls,
			'-tr"></div></div><div class="', zcls, '-hl"><div class="',
			zcls, '-hr"><div class="', zcls, '-hm',(this._closable? '': ' ' + zcls + '-hm-readonly'),'"><div class="',
			zcls, '-header">');
		cap.redraw(out);
		out.push('</div></div></div></div>');
	}
	
	this._redrawCave(out, skipper);

	
	out.push('<div id="', uuid, '-sdw" class="', zcls, '-bl"><div class="',
		zcls, '-br"><div class="', zcls, '-bm"></div></div></div></div>');
}
;zk._m['default']=

function (out, skipper) {
	out.push('<fieldset', this.domAttrs_(), '>');
	
	var cap = this.caption;
	if (cap) cap.redraw(out);

	this._redrawCave(out, skipper);

	out.push('</fieldset>');
}
;zkmld(zk._p.p.Groupbox,zk._m);


zul.wgt.Html = zk.$extends(zul.Widget, {
	_content: '',
	$define: {
		
		
		content: function (v) {
			var n = this.$n();
			if (n) n.innerHTML = v|| '';
		}
	},
	bind_: function () {
		this.$supers(zul.wgt.Html, "bind_", arguments);
		if (jq.isArray(this._content)) 
			for (var ctn = this._content, n = this.$n(), j = 0; j < ctn.length; ++j)
				n.appendChild(ctn[j]);
	},
	unbind_: function () {
		if (jq.isArray(this._content)) 
			for (var n = this.$n(); n.firstChild;)
				n.removeChild(n.firstChild);
		this.$supers(zul.wgt.Html, "unbind_", arguments);
	}
});

zkreg('zul.wgt.Html');zk._m={};
zk._m['default']=

function (out) {
	out.push('<span', this.domAttrs_(), '>',
		(jq.isArray(this._content) ? "":this._content), '</span>');
}
;zkmld(zk._p.p.Html,zk._m);


zul.wgt.Popup = zk.$extends(zul.Widget, {
	_visible: false,
	
	isOpen: function () {
		return this.isVisible();
	},
	
	open: function (ref, offset, position, opts) {
		var posInfo = this._posInfo(ref, offset, position),
			node = this.$n(),
			top = node.style.top,
			$n = jq(node);
		
		
		
		if (!top)
			this._openInfo = arguments;

		$n.css({position: "absolute"}).zk.makeVParent();
		if (posInfo)
			$n.zk.position(posInfo.dim, posInfo.pos, opts);
		
		this.setVisible(true);
		this.setFloating_(true);
		this.setTopmost();
		
		if ((!opts || !opts.disableMask) && this.isListen("onOpen", {asapOnly:true})) {
			
			if (this.mask) this.mask.destroy(); 
			
			
			this.mask = new zk.eff.Mask({
				id: this.uuid + "-mask",
				anchor: node
			});
			
			
			
			zWatch.listen({onResponse: this});		
		}
		if (this.shallStackup_()) {
			if (!this._stackup)
				this._stackup = jq.newStackup(node, node.id + "-stk");
			else {
				var dst, src;
				(dst = this._stackup.style).top = (src = node.style).top;
				dst.left = src.left;
				dst.zIndex = src.zIndex;
				dst.display = "block";
			}
		}
		ref = zk.Widget.$(ref); 
		if (opts && opts.sendOnOpen) this.fire('onOpen', {open: true, reference: ref});
	},
	
	shallStackup_: function () {
		return zk.eff.shallStackup();
	},
	
	position: function (ref, offset, position, opts) {
		var posInfo = this._posInfo(ref, offset, position);
		if (posInfo)
			zk(this.$n()).position(posInfo.dim, posInfo.pos, opts);
	},
	_posInfo: function (ref, offset, position, opts) {
		var pos, dim;
		
		if (ref && position) {
			if (typeof ref == 'string')
				ref = zk.Widget.$(ref);
				
			if (ref) {
				var refn = zul.Widget.isInstance(ref) ? ref.$n() : ref;
				pos = position;
				dim = zk(refn).dimension(true);
			}
		} else if (jq.isArray(offset)) {
			dim = {
				left: zk.parseInt(offset[0]), top: zk.parseInt(offset[1]),
				width: 0, height: 0
			}
		}
		if (dim) return {pos: pos, dim: dim};
	},
	onResponse: function () {
		if (this.mask) this.mask.destroy();
		zWatch.unlisten({onResponse: this});
		this.mask = null;
	},
	
	close: function (opts) {
		if (this._stackup)
			this._stackup.style.display = "none";
		
		this.setVisible(false);
		zk(this.$n()).undoVParent();
		this.setFloating_(false);
		if (opts && opts.sendOnOpen) this.fire('onOpen', {open:false});
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-popup";
	},
	onFloatUp: function(ctl){
		if (!this.isVisible()) 
			return;
		var wgt = ctl.origin;
		
		for (var floatFound; wgt; wgt = wgt.parent) {
			if (wgt == this) {
				if (!floatFound) 
					this.setTopmost();
				return;
			}
			floatFound = floatFound || wgt.isFloating_();
		}
		this.close({sendOnOpen:true});
	},
	bind_: function () {
		this.$supers(zul.wgt.Popup, 'bind_', arguments);
		zWatch.listen({onFloatUp: this, onShow: this});
		this.setFloating_(true);
	},
	unbind_: function () {
		zk(this.$n()).undoVParent(); 
		if (this._stackup) {
			jq(this._stackup).remove();
			this._stackup = null;
		}
		if (this._openInfo)
			this._openInfo = null;
		zWatch.unlisten({onFloatUp: this, onShow: this});
		this.setFloating_(false);
		this.$supers(zul.wgt.Popup, 'unbind_', arguments);
	},
	onShow: function (ctl) {
		
		ctl.fire(this.firstChild);
		var openInfo = this._openInfo;
		if (openInfo) {
			this.position.apply(this, openInfo);
			this._openInfo = null;
		}
		this._fixWdh();
		this._fixHgh();
	},
	_offsetHeight: function () {
		var node = this.$n(),
			isFrameRequired = zul.wgt.PopupRenderer.isFrameRequired(),
			h = node.offsetHeight - (isFrameRequired ? 1: 0), 
			bd = this.$n('body');
		
		if (isFrameRequired) {
			var tl = jq(node).find('> div:first-child')[0],
				bl = jq(node).find('> div:last')[0],
				n = this.getCaveNode().parentNode,
				bd = this.$n('body');
		
			h -= tl.offsetHeight;
			h -= bl.offsetHeight;
			h -= zk(n).padBorderHeight();
			h -= zk(bd).padBorderHeight();
		} else {
			h -= zk(bd).padBorderHeight();
		}
		
		return h;
	},
	_fixHgh: function () {
		var hgh = this.$n().style.height,
			c = this.getCaveNode();
		if (zk.ie6_ && ((hgh && hgh != "auto" )|| c.style.height)) c.style.height = "0px";
		if (hgh && hgh != "auto")
			zk(c).setOffsetHeight(this._offsetHeight());
		else 
			c.style.height = "auto";
	},
	_fixWdh: zk.ie7_ ? function () {
		if (!zul.wgt.PopupRenderer.isFrameRequired()) return;
		var node = this.$n(),
			wdh = node.style.width,
			cn = jq(node).children('div'),
			fir = cn[0],
			last = cn[cn.length - 1],
			n = this.$n('cave').parentNode;
		
		if (!wdh || wdh == "auto") { 
			var diff = zk(n.parentNode).padBorderWidth() + zk(n.parentNode.parentNode).padBorderWidth();
			if (fir) {
				fir.firstChild.style.width = jq.px0(n.offsetWidth - (zk(fir).padBorderWidth()
					+ zk(fir.firstChild).padBorderWidth() - diff));
			}
			if (last) {
				last.firstChild.style.width = jq.px0(n.offsetWidth - (zk(last).padBorderWidth()
					+ zk(last.firstChild).padBorderWidth() - diff));
			}
		} else {
			if (fir) fir.firstChild.style.width = "";
			if (last) last.firstChild.style.width = "";
		}
	}: zk.$void,
	setHeight: function (height) {
		this.$supers('setHeight', arguments);
		if (this.desktop)
			zWatch.fireDown('onShow', this);
	},
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		if (this.desktop)
			zWatch.fireDown('onShow', this);
	},
	prologHTML_: function (out) {
	},
	epilogHTML_: function (out) {
	}
});

zul.wgt.PopupRenderer = {
	
	isFrameRequired: function () {
		return true;
	}
};
zkreg('zul.wgt.Popup',true);zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		isFrameRequired = zul.wgt.PopupRenderer.isFrameRequired();
		
	out.push('<div', this.domAttrs_(), '>');
	
	if (isFrameRequired)
		out.push('<div class="', zcls, '-tl"><div class="', 
					zcls, '-tr"></div></div>');
	else if(this._fixarrow)	
		out.push('<div id=', uuid, '-p class="z-pointer"></div>');
		
	out.push('<div id="', uuid, '-body" class="', zcls, '-cl">');
	
	if (isFrameRequired)
		out.push('<div class="', zcls, '-cr"><div class="', zcls, '-cm">');
		
	out.push('<div id="', uuid, '-cave" class="', zcls, '-cnt">');
	this.prologHTML_(out);
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	this.epilogHTML_(out);
	out.push('</div></div></div>');
	
	if (isFrameRequired)
		out.push('</div><div class="', zcls, '-bl"><div class="',
					zcls, '-br"></div></div></div>');
}
;zkmld(zk._p.p.Popup,zk._m);


zul.wgt.Radio = zk.$extends(zul.wgt.Checkbox, {
	
	getRadiogroup: function (parent) {
		if (!parent && this._group)
			return this._group;
		var wgt = parent || this.parent;
		for (; wgt; wgt = wgt.parent)
			if (wgt.$instanceof(zul.wgt.Radiogroup)) return wgt;
		return null;
	},
	
	setRadiogroup: function (group) {
		var old;
		if ((old = this._group) != group) {
			if (old) old._rmExtern(this);
			this._group = group;
			if (group) group._addExtern(this);
			this._fixName();
		}
	},

	
	setChecked: _zkf = function (checked) {
		if (checked != this._checked) {
			this._checked = checked;
			var n = this.$n('real');
			if (n) {
				n.checked = checked || false;

				var group = this.getRadiogroup();
				if (group) {
					
					if (checked) {
						for (var items = group.getItems(), i = items.length; i--;) {
							if (items[i] != this) {
								items[i].$n('real').checked = false;
								items[i]._checked = false;
							}
						}
					}
					group._fixSelectedIndex();
				}
			}
		}
		return this;
	},
	
	setSelected: _zkf,
	
	isSelected: zul.wgt.Checkbox.prototype.isChecked,
	
	getName: function () {
		var group = this.getRadiogroup();
		return group != null ? group.getName(): this.uuid;
	},
	_fixName: function () {
		var n = this.$n("real");
		if (n)
			n.name = this.getName();
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-radio";
	},
	beforeParentChanged_: function (newParent) {
		var oldParent = this.getRadiogroup(),
			newParent = newParent ? this.getRadiogroup(newParent) : null;
		if (oldParent != newParent) {
			if (oldParent && oldParent.$instanceof(zul.wgt.Radiogroup))
				oldParent._fixOnRemove(this); 
			if (newParent && newParent.$instanceof(zul.wgt.Radiogroup))
				newParent._fixOnAdd(this); 
		}
		this.$supers("beforeParentChanged_", arguments);
	},
	fireOnCheck_: function (checked) {
		
		var group = this.getRadiogroup();
		this.fire('onCheck', checked, {toServer: group && group.isListen('onCheck')} );
	}
});

zkreg('zul.wgt.Radio');zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		rg = this.getRadiogroup();
	out.push('<span', this.domAttrs_(), '>', '<input type="radio" id="', uuid,
		'-real"', this.contentAttrs_(), '/><label for="', uuid, '-real"',
		this.domTextStyleAttr_(), ' class="', zcls, '-cnt">', this.domContent_(),
		'</label>', (rg && rg._orient == 'vertical' ? '<br/>' :''), '</span>');
}
;zkmld(zk._p.p.Radio,zk._m);

(function () {

	function _concatItem(group) {
		var sum = _concatItem0(group);
		sum.$addAll(group._externs);
		return sum;
	}
	function _concatItem0(cmp) {
		var sum = [];
		for (var wgt = cmp.firstChild; wgt; wgt = wgt.nextSibling) {			
			if (wgt.$instanceof(zul.wgt.Radio)) 
				sum.push(wgt);
			else if (!wgt.$instanceof(zul.wgt.Radiogroup)) 
				sum = sum.concat(_concatItem0(wgt));
		}
		return sum;
	}

	function _getAt(group, cur, index) {
		var r = _getAt0(group, cur, index);
		if (!r)
			for (var extns = group._externs, j = 0, l = extns.length; j < l; ++j)
				if (!_redudant(group, extns[j]) && cur.value++ == index)
					return extns[j];
		return r;
	}
	function _getAt0(cmp, cur, index) {
		for (var wgt = cmp.firstChild; wgt; wgt = wgt.nextSibling) {
			if (wgt.$instanceof(zul.wgt.Radio)) {
				if (cur.value++ == index) return wgt;
			} else if (!wgt.$instanceof(zul.wgt.Radiogroup)) {
				var r = _getAt0(wgt, cur, index);
				if (r != null) return r;
			}				
		}
	}

	function _fixSelIndex(group, cur) {
		var jsel = _fixSelIndex0(group, cur);
		if (jsel < 0)
			for (var extns = group._externs, j = 0, l = extns.length, radio; j < l; ++j)
				if (!_redudant(group, radio = extns[j])) {
					if (radio.isSelected())
						return cur.value;
					++cur.value;
				}
		return jsel;
	}
	function _fixSelIndex0(cmp, cur) {
		for (var wgt = cmp.firstChild; wgt; wgt = wgt.nextSibling) {
			if (wgt.$instanceof(zul.wgt.Radio)) {
				if (wgt.isSelected())
					return cur.value;
				++cur.value;
			} else if (!wgt.$instanceof(zul.wgt.Radiogroup)) {
				var jsel = _fixSelIndex0(wgt, cur);
				if (jsel >= 0) return jsel;
			}
		}
		return -1;
	}

	function _redudant(group, radio) {
		for (var p = radio; (p = p.parent) != null;)
			if (p.$instanceof(zul.wgt.Radiogroup))
				return p == group;
	}


zul.wgt.Radiogroup = zk.$extends(zul.Widget, {
	_orient: 'horizontal',
	_jsel: -1,

	$init: function () {
		this.$supers("$init", arguments);
		this._externs = [];
	},
	$define: { 
		
		
		orient: function () {
			this.rerender();
		},
		
		
		name: function (v) {
			for (var items = this.getItems(), i = items.length; i--;)
				items[i].setName(v);
		}
	},
	
	getItemAtIndex: function (index) {
		return index >= 0 ? _getAt(this, {value: 0}, index): null;
	},
	
	getItemCount: function () {
		return this.getItems().length;
	},
	
	getItems: function () {
		return _concatItem(this);
	},
	
	getSelectedIndex: function () {
		return this._jsel;
	},
	
	setSelectedIndex: function (jsel) {
		if (jsel < 0) jsel = -1;
		if (this._jsel != jsel) {
			if (jsel < 0) {
				getSelectedItem().setSelected(false);
			} else {
				getItemAtIndex(jsel).setSelected(true);
			}
		}
	},
	
	getSelectedItem: function () {
		return this._jsel >= 0 ? this.getItemAtIndex(this._jsel): null;
	},
	
	setSelectedItem: function (item) {
		if (item == null)
			this.setSelectedIndex(-1);
		else if (item.$instanceof(zul.wgt.Radio))
			item.setSelected(true);
	},
	appendItem: function (label, value) {
		var item = new zul.wgt.Radio();
		item.setLabel(label);
		item.setValue(value);
		this.appendChild(item);
		return item;
	},
	
	removeItemAt: function (index) {
		var item = this.getItemAtIndex(index);
		if (item && !this._rmExtern(item)) {
			var p = item.parent;
			if (p) p.removeChild(item);
		}
		return item;
	},

	
	_fixSelectedIndex: function () {
		this._jsel = _fixSelIndex(this, {value: 0});
	},
	_fixOnAdd: function (child) {
		if (this._jsel >= 0 && child.isSelected()) {
			child.setSelected(false); 
		} else {
			this._fixSelectedIndex();
		}
	},
	_fixOnRemove: function (child) {
		if (child.isSelected()) {
			this._jsel = -1;
		} else if (this._jsel > 0) { 
			this._fixSelectedIndex();
		}
	},

	_addExtern: function (radio) {
		this._externs.push(radio);
		if (!_redudant(this, radio))
			this._fixOnAdd(radio);
	},
	_rmExtern: function (radio) {
		if (this._externs.$remove(radio)) {
			if (!_redudant(this, radio))
				this._fixOnRemove(radio);
			return true;
		}
	}
});
})();
zkreg('zul.wgt.Radiogroup');zk._m={};
zk._m['default']=

function (out) {
	out.push('<span', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</span>');
}
;zkmld(zk._p.p.Radiogroup,zk._m);


zul.wgt.Toolbar = zk.$extends(zul.Widget, {
	_orient: "horizontal",
	_align: "start",

	$define: {
		
		
		align: _zkf = function () {
			this.rerender();
		},
		
		
		orient: _zkf
	},

	
	getZclass: function(){
		var zcls = this._zclass;
		return zcls ? zcls : "z-toolbar"
			+ (this.parent && zk.isLoaded('zul.tab') && this.parent.$instanceof(zul.tab.Tabbox) ? "-tabs" : "") 
			+ (this.inPanelMold() ? "-panel" : "");
	}, 
	
	inPanelMold: function(){
		return this._mold == "panel";
	},
	
	onChildAdded_: function(){
		this.$supers('onChildAdded_', arguments);
		if (this.inPanelMold()) 
			this.rerender();
	},
	onChildRemoved_: function(){
		this.$supers('onChildRemoved_', arguments);
		if (!this.childReplacing_ && this.inPanelMold())
			this.rerender();
	}
	
});

zkreg('zul.wgt.Toolbar',true);zk._m={};
zk._m['panel']=

function (out) {
	var zcls = this.getZclass();
	out.push('<div ', this.domAttrs_(), '>', '<div class="', zcls, '-body ',
				zcls, '-', this.getAlign(), '" >', '<table id="', this.uuid,
				'-cnt" class="', zcls, '-cnt"', zUtl.cellps0, '><tbody>');
	if ('vertical' != this.getOrient()) {
		out.push("<tr>");
		for (var w = this.firstChild; w; w = w.nextSibling) {
			out.push('<td class="', zcls, '-hor">');
			w.redraw(out);
			out.push("</td>");
		}
		out.push("</tr>");
	} else {
		for (var w = this.firstChild; w; w = w.nextSibling) {
			out.push('<tr><td class="', zcls, '-ver">');
			w.redraw(out);
			out.push('</td></tr>');
		}
	}
	out.push('</tbody></table><div class="z-clear"></div></div></div>');
}

;zk._m['default']=

function (out) {
	var zcls = this.getZclass(),
		space = 'vertical' != this.getOrient() ? '' : '<br/>';
		
	out.push('<div ', this.domAttrs_(), '>', '<div id="', this.uuid, '-cave"',
				' class="', zcls, "-body ", zcls, '-', this.getAlign(), '" >');
	
	for (var w = this.firstChild; w; w = w.nextSibling) {
		out.push(space);
		w.redraw(out);
	}
	out.push('</div><div class="z-clear"></div></div>');
}
;zkmld(zk._p.p.Toolbar,zk._m);

(function () {
	
	function _initUpld(wgt) {
		zWatch.listen({onShow: wgt});
		var v;
		if (v = wgt._upload)
			wgt._uplder = new zul.Upload(wgt, null, v);
	}
	
	function _cleanUpld(wgt) {
		var v;
		if (v = wgt._uplder) {
			zWatch.unlisten({onShow: wgt});
			wgt._uplder = null;
			v.destroy();
		}
	}
	

zul.wgt.Toolbarbutton = zk.$extends(zul.LabelImageWidget, {
	_orient: "horizontal",
	_dir: "normal",
	

	$define: {
		
		
		disabled: function () {
			this.rerender(); 
		},
		
		
		href: null,
		
		
		target: null,
		
		
		dir: _zkf = function () {
			this.updateDomContent_();
		},
		
		
		orient: _zkf,
		
		
		tabindex: function (v) {
			var n = this.$n();
			if (n) n.tabIndex = v||'';
		},
		
		
		autodisable: null,
		
		
		upload: function (v) {
			var n = this.$n();
			if (n) {
				_cleanUpld(this);
				if (v && v != 'false' && !this._disabled)
					_initUpld(this);
			}
		}
	},

	
	getZclass: function(){
		var zcls = this._zclass;
		return zcls ? zcls : "z-toolbarbutton";
	},
	getTextNode: function () {
		return this.$n().firstChild.firstChild;
	},
	bind_: function(){
		this.$supers(zul.wgt.Toolbarbutton, 'bind_', arguments);
		if (!this._disabled) {
			var n = this.$n();
			this.domListen_(n, "onFocus", "doFocus_")
				.domListen_(n, "onBlur", "doBlur_");
		}
		if (!this._disabled && this._upload) _initUpld(this);
	},
	unbind_: function(){
		_cleanUpld(this);
		var n = this.$n();
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_");

		this.$supers(zul.wgt.Toolbarbutton, 'unbind_', arguments);
	},
	domContent_: function(){
		var label = zUtl.encodeXML(this.getLabel()), img = this.getImage();
		if (!img)
			return label;

		img = '<img src="' + img + '" align="absmiddle" />';
		var space = "vertical" == this.getOrient() ? '<br/>' : '&nbsp;';
		return this.getDir() == 'reverse' ? label + space + img : img + space + label;
	},
	domClass_: function(no){
		var scls = this.$supers('domClass_', arguments);
		if (this._disabled && (!no || !no.zclass)) {
			var s = this.getZclass();
			if (s)
				scls += (scls ? ' ' : '') + s + '-disd';
		}
		return scls;
	},
	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments),
			v = this.getTabindex();
		if (v)
			attr += ' tabIndex="' + v + '"';
		return attr;
	},
	onShow: function () {
		if (this._uplder)
			this._uplder.sync();
	},
	doClick_: function(evt){
		if (!this._disabled) {
			zul.wgt.ADBS.autodisable(this);
			this.fireX(evt);

			if (!evt.stopped) {
				var href = this._href;
				if (href)
					zUtl.go(href, {target: this._target || (evt.data.ctrlKey ? '_blank' : '')});
				this.$super('doClick_', evt, true);
			}
		}
	},
	doMouseOver_: function (evt) {
		if (!this._disabled) {
			jq(this).addClass(this.getZclass() + '-over');
			this.$supers('doMouseOver_', arguments);
		}
	},
	doMouseOut_: function (evt) {
		if (!this._disabled) {
			jq(this).removeClass(this.getZclass() + '-over');
			this.$supers('doMouseOut_', arguments);
		}
	}
});
})();
zkreg('zul.wgt.Toolbarbutton');zk._m={};
zk._m['default']=

function (out) {
	var zcls = this.getZclass();
	out.push('<div', this.domAttrs_(), '><div class="',
		zcls, '-body"><div ', this.domTextStyleAttr_(), 
		'class="', zcls, '-cnt">', this.domContent_(),
		'</div></div></div>');
}

;zkmld(zk._p.p.Toolbarbutton,zk._m);


zul.wgt.Image = zk.$extends(zul.Widget, {
	$define: {
		
		
		src: function (v) {
			var n = this.getImageNode();
			if (n) n.src = v || '';
		},
		
		
		hover: null,
		
		
		align: function (v) {
			var n = this.getImageNode();
			if (n) n.align = v || '';
		},
		
		
		hspace: function (v) {
			var n = this.getImageNode();
			if (n) n.hspace = v;
		},
		
		
		vspace: function (v) {
			var n = this.getImageNode();
			if (n) n.vspace = v;
		}
	},
	
	getImageNode: function () {
		return this.$n();
	},

	
	doMouseOver_: function () {
		var hover = this._hover;
		if (hover) {
			var img = this.getImageNode();
			if (img) img.src = hover;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function () {
		if (this._hover) {
			var img = this.getImageNode();
			if (img) img.src = this._src || '';
		}
		this.$supers('doMouseOut_', arguments);
	},
	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments);
		if (!no || !no.content)
			attr += this.contentAttrs_();
		return attr;
	},
	
	contentAttrs_: function () {
		var attr = ' src="' + (this._src || '') + '"', v;
		if (v = this._align) 
			attr += ' align="' + v + '"';
		if (v = this._hspace) 
			attr += ' hspace="' + v + '"';
		if (v = this._vspace) 
			attr += ' vspace="' + v + '"';
		return attr;
	}
});

zkreg('zul.wgt.Image');zk._m={};
zk._m['alphafix']=

function (out) {
	out.push('<image', this.domAttrs_(), '/>');
}
;zk._m['default']=

function (out) {
	out.push('<image', this.domAttrs_(), '/>');
}
;zkmld(zk._p.p.Image,zk._m);


zul.wgt.Imagemap = zk.$extends(zul.wgt.Image, {
	bind_: function () {
		this.$supers(zul.wgt.Imagemap, 'bind_', arguments);

		if (!jq('#zk_hfr_')[0])
			jq.newFrame('zk_hfr_', null,
				zk.safari ? 'position:absolute;top:-1000px;left:-1000px;width:0;height:0;display:inline'
					: null);
			
			
	},

	
	getImageNode: function () {
		return this.$n("real");
	},
	getCaveNode: function () {
		return this.$n("map");
	},
	doClick_: function (evt) {
		
		
	},
	onChildAdded_: function () {
		this.$supers('onChildAdded_', arguments);
		if (this.desktop && this.firstChild == this.lastChild) 
			this._fixchd(true);
	},
	onChildRemoved_: function () {
		this.$supers('onChildRemoved_', arguments);
		if (this.desktop && !this.firstChild) 
			this._fixchd(false);
	},
	_fixchd: function (bArea) {
		var mapid = this.uuid + '-map';
		img = this.getImageNode();
		img.useMap = bArea ? '#' + mapid : '';
		img.isMap = !bArea;
	},
	contentAttrs_: function () {
		var attr = this.$supers('contentAttrs_', arguments);
		return attr +(this.firstChild ? ' usemap="#' + this.uuid + '-map"':
			' ismap="ismap"');
	},

	
	fromPageCoord: function (x, y) {
		
		var ofs = zk(this.getImageNode()).revisedOffset();
		return [x - ofs[0], y - ofs[1]];
	},

	_doneURI: function () {
		var Imagemap = zul.wgt.Imagemap,
			url = Imagemap._doneURI;
		return url ? url:
			Imagemap._doneURI = zk.IMAGEMAP_DONE_URI ? zk.IMAGEMAP_DONE_URI:
				zk.ajaxURI('/web/zul/html/imagemap-done.html', {desktop:this.desktop,au:true});
	}
},{
	
	onclick: function (href) {
		if (zul.wgt.Imagemap._toofast()) return;

		var j = href.indexOf('?');
		if (j < 0) return;

		var k = href.indexOf('?', ++j);
		if (k < 0 ) return;

		var id = href.substring(j, k),
			wgt = zk.Widget.$(id);
		if (!wgt) return; 

		j = href.indexOf(',', ++k);
		if (j < 0) return;

		wgt.fire('onClick', {
			x: zk.parseInt(href.substring(k, j)),
			y: zk.parseInt(href.substring(j + 1))
		}, {ctl:true});
	},
	_toofast: function () {
		if (zk.gecko) { 
			var Imagemap = zul.wgt.Imagemap,
				now = jq.now();
			if (Imagemap._stamp && now - Imagemap._stamp < 800)
				return true;
			Imagemap._stamp = now;
		}
		return false;
	}
});

zkreg('zul.wgt.Imagemap');zk._m={};
zk._m['alphafix']=

function (out) {
	var uuid = this.uuid, mapid = uuid + '-map';
	out.push('<span', this.domAttrs_({content:1}), '><a href="',
		this._doneURI(), '?', uuid, '" target="zk_hfr_"><img id="',
		uuid, '-real"', this.contentAttrs_(),
		'/></a><map name="', mapid, '" id="', mapid, '">');

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</map></span>');
}

;zk._m['default']=

function (out) {
	var uuid = this.uuid, mapid = uuid + '-map';
	out.push('<span', this.domAttrs_({content:1}), '><a href="',
		this._doneURI(), '?', uuid, '" target="zk_hfr_"><img id="',
		uuid, '-real"', this.contentAttrs_(),
		'/></a><map name="', mapid, '" id="', mapid, '">');

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</map></span>');
}

;zkmld(zk._p.p.Imagemap,zk._m);


zul.wgt.Area = zk.$extends(zk.Widget, {
	$define: {
		
		
		shape: function (v) {
			var n = this.$n();
			if (n) n.shape = v || '';
		},
		
		
		coords: function (coords) {
			var n = this.$n();
			if (n) n.coords = v || '';
		}
	},

	
	doClick_: function (evt) {
		if (zul.wgt.Imagemap._toofast()) return;

		var area = this.id || this.uuid;
		this.parent.fire('onClick', {area: area}, {ctl:true});
		evt.stop();
	},

	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments)
			+ ' href="javascript:;"', v;
		if (v = this._coords) 
			attr += ' coords="' + v + '"';
		if (v = this._shape) 
			attr += ' shape="' + v + '"';
		return attr;
	}
});

zkreg('zul.wgt.Area');zk._m={};
zk._m['default']=

function (out) {
	out.push('<area', this.domAttrs_(), '/>');
}
;zkmld(zk._p.p.Area,zk._m);


zul.wgt.Chart = zk.$extends(zul.wgt.Imagemap, {
});

zkreg('zul.wgt.Chart');zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid, mapid = uuid + '-map';
	out.push('<span', this.domAttrs_({content:1}), '><a href="',
		this._doneURI(), '?', uuid, '" target="zk_hfr_"><img id="',
		uuid, '-real"', this.contentAttrs_(),
		'/></a><map name="', mapid, '" id="', mapid, '">');

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</map></span>');
}

;zkmld(zk._p.p.Chart,zk._m);


zul.wgt.Captcha = zk.$extends(zul.wgt.Image, {
});

zkreg('zul.wgt.Captcha');zk._m={};
zk._m['default']=

function (out) {
	out.push('<image', this.domAttrs_(), '/>');
}
;zkmld(zk._p.p.Captcha,zk._m);


zul.wgt.Progressmeter = zk.$extends(zul.Widget, {
	_value: 0,

	$define: {
		
		
		value: function () {
			if(this.$n()) 
				this._fixImgWidth();
		}
	},

	
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-progressmeter";
	},
	_fixImgWidth: _zkf = function() {
		var n = this.$n(), 
			img = this.$n("img");
		if (img) {
			if (zk.ie6_) img.style.width = ""; 
			
			if (zk(n).isRealVisible()) 
				jq(img).animate({
					width: Math.round((n.clientWidth * this._value) / 100) + "px"
				}, "slow");
			
		}
	},
	onSize: _zkf,
	onShow: _zkf,
	bind_: function () {
		this.$supers(zul.wgt.Progressmeter, 'bind_', arguments); 
		this._fixImgWidth(this._value);
		zWatch.listen({onSize: this, onShow: this});
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(zul.wgt.Progressmeter, 'unbind_', arguments);
	},
	setWidth : function (val){
		this.$supers('setWidth', arguments);
		this._fixImgWidth();
	}
});


zkreg('zul.wgt.Progressmeter');zk._m={};
zk._m['default']=

function (out) {
	out.push('<div', this.domAttrs_(), '><span id="',
			this.uuid,'-img"', 'class="', this.getZclass(),'-img"></span></div>');
}
;zkmld(zk._p.p.Progressmeter,zk._m);


zul.wgt.Fileupload = zk.$extends(zul.wgt.Button, {
});

zkreg('zul.wgt.Fileupload');
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.wgt',1);