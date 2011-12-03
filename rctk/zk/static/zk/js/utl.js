(function(){zk._p=zkpi('zul.utl',true);try{

zul.utl.Timer = zk.$extends(zk.Widget, {
	_running: true,
	_delay: 0,

	$define: {
    	
    	
		repeats: _zkf = function () {
			if (this.desktop) this._sync();
		},
		
		
		delay: _zkf,
		
		
		running: _zkf
	},
	
	play: function () {
		this.setRunning(true);
	},
	
	stop: function () {
		this.setRunning(false);
	},

	_sync: function () {
		this._stop();
		this._play();
	},
	_play: function () {
		if (this._running) {
			var fn = this.proxy(this._tmfn);
			if (this._repeats) {
				this._iid = setInterval(fn, this._delay);
				zAu.onError(this.proxy(this._onErr));
			} else
				this._tid = setTimeout(fn, this._delay);
		}
	},
	_stop: function () {
		var id = this._iid;
		if (id) {
			this._iid = null;
			clearInterval(id)
		}
		id = this._tid;
		if (id) {
			this._tid = null;
			clearTimeout(id);
		}
		zAu.unError(this.proxy(this._onErr));
	},
	_onErr: function (req, errCode) {
		if (errCode == "410" || errCode == "404")
			this._stop();
	},
	_tmfn: function () {
		if (!this._repeats) this._running = false;
		this.fire('onTimer', null, {ignorable: true});
	},

	
	redraw: function () {
	},
	bind_: function () {
		this.$supers(zul.utl.Timer, 'bind_', arguments);
		if (this._running) this._play();
	},
	unbind_: function () {
		this._stop();
		this.$supers(zul.utl.Timer, 'unbind_', arguments);
	}
});

zkreg('zul.utl.Timer');




zul.utl.Iframe = zk.$extends(zul.Widget, {
	_scrolling: "auto",

	$define: {
		src: function (v) {
			var n = this.$n();
			if (n) n.src = v || '';
		},
		
		
		scrolling: function (v) {
			if (!v) this._scrolling = v = "auto";
			var n = this.$n();
			if (n) {
				if (zk.ie || zk.safari)
					this.rerender();
				else
					n.scrolling = v;
			}
		},
		
		
		align: function (v) {
			var n = this.$n();
			if (n) n.align = v || '';
		},
		
		
		name: function (v) {
			var n = this.$n();
			if (n) n.name = v || '';
		},
		
		
		autohide: function (v) {
			var n = this.$n();
			if (n) jq(n).attr('z_autohide', v);
		}
	},
	
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.utl.Iframe, 'bind_', arguments);
		if (this._src) {
			var self = this;
			after.push(function () {self.$n().src = self._src;});
		}
	},
	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments)
				+ ' src="'+zjq.src0+'" frameborder="0"',
			v = this._scrolling;
		if ("auto" != v)
			attr += ' scrolling="' + ('true' == v ? 'yes': 'false' == v ? 'no': v) + '"';
		if (v = this._align) 
			attr += ' align="' + v + '"';
		if (v = this._name) 
			attr += ' name="' + v + '"';
		if (v = this._autohide) 
			attr += ' z_autohide="' + v + '"';
		return attr;
	}
});

zkreg('zul.utl.Iframe');zk._m={};
zk._m['default']=

function (out) {
	out.push('<iframe', this.domAttrs_(), '>', '</iframe>');
}
;zkmld(zk._p.p.Iframe,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.utl',1);