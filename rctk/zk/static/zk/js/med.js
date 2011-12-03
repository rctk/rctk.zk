zk.load('zul',function(){zk._p=zkpi('zul.med',true);try{




zul.med.Applet = zk.$extends(zul.Widget, {
	$init: function() {
		this._params = {};
		this.$supers('$init', arguments);
	},

	$define: {
		
		
		code: _zkf = function () {
			this.rerender();
		},
		
		
		codebase: _zkf,
		
		
		archive: _zkf,
		
		
		mayscript: function (v) {
			var n;
			if (n = this.$n())
				n.mayscript = v;
		},
		
		
		align: function (v) {
			var n;
			if (n = this.$n())
				n.align = v;
		},
		
		
		hspace: function (v) {
			var n;
			if (n = this.$n())
				n.hspace = v;
		},
		
		
		vspace: function (v) {
			var n;
			if (n = this.$n())
				n.vspace = v;
		}
	},
	
	invoke: zk.ie ? function() {
		var n = this.$n(),
			len = arguments.length;
		if (n && len >= 1) {
			var single = len < 3,
				begin = single ? '(' : '([',
				end = single ? ')' : '])',
				expr = "n." + arguments[0] + begin;
			for (var j = 1; j < len;) {
				if (j != 1) expr += ',';
				var s = arguments[j++];
				expr += '"' + (s ? s.replace('"', '\\"'): '') + '"';
			}
			try {
				eval(expr + end); 
			} catch (e) {
				zk.error("Failed to invoke applet's method: "+expr+'\n'+e.message);
			}
		}
	}: function(){
		var n = this.$n();
		if (n && arguments.length >= 1) {
			var fn = arguments[0],
				func = n[fn];
			if (!func) {
				zk.error("Method not found: "+fn);
				return;
			}
			try {
				var args = [],
					arrayArg = [];
				if (arguments.length < 3) {
					if (arguments[1]) 
						args.push(arguments[1]);
				} else {
					for (var j = 1, len = arguments.length; j < len;) 
						arrayArg.push(arguments[j++]);
					args.push(arrayArg);
				}
				func.apply(n, args);
			} catch (e) {
				zk.error("Failed to invoke applet's method: "+fn+'\n'+e.message);
			}
		}
	},
	
	getField: function (name) {
		var n = this.$n();
		return n ? n[name]: null;
	},
	
	setField: function (name, value) {
		var n = this.$n();
		if (n)
			try {
				n[name] = value;
			} catch(e) {
				zk.error("Failed to set applet's field: "+ name+'\n'+e.message);
			}
	},
	
	setParam: function (nm, val) {
		if (arguments.length == 1) {
			val = nm[1];
			nm = nm[0];
		}
		if (val != null) this._params[nm] = val;
		else delete this._params[nm];
	},
	
	setParams: function (m) {
		this._params = m;
	},
	
	
	domAttrs_: function(no){
		return this.$supers('domAttrs_', arguments)
				+ ' code="' + (this._code || '') + '"'
				+ zUtl.appendAttr("codebase", this._codebase)
				+ zUtl.appendAttr("archive", this._archive)
				+ zUtl.appendAttr("align", this._align)
				+ zUtl.appendAttr("hspace", this._hspace)
				+ zUtl.appendAttr("vspace", this._vspace)
				+ zUtl.appendAttr("mayscript", this._mayscript);
	},
	domStyle_: function (no) {
		return this.$supers('domStyle_', arguments)
			+ "visibility:visible;"; 
	},

	_outParamHtml: function (out) {
		var params = this._params;
		for (var nm in params)
			out.push('<param name="', zUtl.encodeXML(nm), '" value="', zUtl.encodeXML(params[nm]), '"/>');
	}
});

zkreg('zul.med.Applet');zk._m={};
zk._m['default']=

function (out) {
	out.push('<applet', this.domAttrs_(), '>');
	this._outParamHtml(out);
	out.push('</applet>');
}
;zkmld(zk._p.p.Applet,zk._m);

(function () {

	function _invoke(wgt, fn1, fn2, unbind) {
		
		if (unbind)
			_invoke2(wgt, fn1, fn2, unbind);
		else
			setTimeout(function () {
				_invoke2(wgt, fn1, fn2);
			}, 200);
	}
	function _invoke2(wgt, fn1, fn2, unbind) {
		var n = wgt.$n();
		if (n) {
			try { 
				n[fn1]();
			} catch (e) {
				try {
					n[fn2](); 
				} catch (e) {
					if (!unbind)
						jq.alert(msgzul.NO_AUDIO_SUPPORT+'\n'+e.message);
				}
			}
		}
	}

var Audio =

zul.med.Audio = zk.$extends(zul.Widget, {
	$define: {
		
		
		src: function () {
			this.rerender(); 
		},
		
		
		align: function (v) {
			var n = this.$n();
			if (n) n.align = v || '';
		},
		
		
		border: function (v) {
			var n = this.$n();
			if (n) n.border = v || '';
		},
		
		
		autostart: function (v) {
			var n = this.$n();
			if (n) n.autostart = v;
		},
		
		
		loop: function (v) {
			var n = this.$n();
			if (n) n.loop = v;
		}
	},
	
	play: function () {
		_invoke(this, 'play', 'Play');
	},
	
	stop: function (_unbind_) {
		_invoke(this, 'stop', 'Stop', _unbind_);
	},
	
	pause: function () {
		_invoke(this, 'pause', 'Pause');
	},

	unbind_: function () {
		this.stop(true);
		this.$supers(Audio, 'unbind_', arguments);
	},

	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments)
				+ ' src="' + (this._src || '') + '"',
			v;
		if (v = this._align) 
			attr += ' align="' + v + '"';
		if (v = this._border) 
			attr += ' border="' + v + '"';
		attr += ' autostart="' + (this._autostart||false) + '"'; 
		if (v = this._loop) 
			attr += ' loop="' + v + '"';
		return attr;
	}
});

})();
zkreg('zul.med.Audio');zk._m={};
zk._m['default']=

function (out) {
	out.push('<embed', this.domAttrs_(), ' mastersound enablejavascript="true"/>');
}
;zkmld(zk._p.p.Audio,zk._m);


zul.med.Flash = zk.$extends(zul.Widget, {
	_wmode: 'transparent',
	_quality: 'high',
	_autoplay: true,
	_loop: false,
	_version: '6,0,0,0',

	$define: {
		
		
		version: function () {
			this.rerender();
		},
		
		
		src: function (v) {
			var n = this._embedNode();
			if (n) n.movie = n.src = v || '';
		},
		
		
		wmode: function (wmode) {
			var n = this._embedNode();
			if (n) n.wmode = v || '';
		},
		
		
		bgcolor: function (v) {
			var n = this._embedNode();
			if (n) n.bgcolor = v || '';
		},
		
		
		quality: function (v) {
			var n = this._embedNode();
			if (n) n.quality = v || '';
		},
		
		
		autoplay: function (autoplay) {
			var n = this._embedNode();
			if (n) n.autoplay = v || '';
		},
		
		
		loop: function (v) {
			var n = this._embedNode();
			if (n) n.loop = v || '';
		}
	},

	
	setHeight: function (height) {
		this._height = height;
		var n = this._embedNode();
		if (n) n.height = height ? height: '';
	},
	setWidth: function (width) {
		this._width = width;
		var n = this._embedNode();
		if (n) n.width = width ? width: '';
	},

	_embedNode: function () {
		return this.$n('emb');
	}
});

zkreg('zul.med.Flash');zk._m={};
zk._m['default']=

function (out) {
	out.push('<div', this.domAttrs_({width:true,height:true}),
		'><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=',
		this._version, '" width="', this._width||'', '" height="', this._height||'',
		'"><param name="movie" value="', this._src,
		'"></param><param name="wmode" value="', this._wmode,
		'"></param><param name="quality" value="', this._quality,
		'"></param><param name="autoplay" value="', this._autoplay,
		'"></param><param name="loop" value="', this._loop,
		'"></param>');

	var bgc;
	if (bgc = this._bgcolor)
		out.push('<param name="bgcolor" value="', bgc, '"');

	out.push('<embed id="', this.uuid, '-emb" src="', this._src,
		'" type="application/x-shockwave-flash" wmode="', this._wmode,
		'" quality="', this._quality,
		'" autoplay="', this._autoplay,
		'" loop="', this._loop,
		'" width="', this._width||'', '" height="', this._height||'',
		'"');

	if (bgc) out.push(' bgcolor="', bgc, '"');

	out.push('></embed></object></div>');
}
;zkmld(zk._p.p.Flash,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.med',1);