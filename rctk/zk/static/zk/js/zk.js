function $eval(s){return eval(s);}if(!window.zk){
(function( window, undefined ) {


var document = window.document;
var jQuery = (function() {


var jQuery = function( selector, context ) {
		
		return new jQuery.fn.init( selector, context );
	},

	
	_jQuery = window.jQuery,

	



	
	rootjQuery,

	
	
	quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,

	
	isSimple = /^.[^:#\[\.,]*$/,

	
	rnotwhite = /\S/,
	rwhite = /\s/,

	
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	
	rnonword = /\W/,

	
	rdigit = /\d/,

	
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	
	userAgent = navigator.userAgent,

	
	browserMatch,
	
	
	readyBound = false,
	
	
	readyList = [],

	
	DOMContentLoaded,

	
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,
	
	
	class2type = {};

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		var match, elem, ret, doc;

		
		if ( !selector ) {
			return this;
		}

		
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}
		
		
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = "body";
			this.length = 1;
			return this;
		}

		
		if ( typeof selector === "string" ) {
			
			match = quickExpr.exec( selector );

			
			if ( match && (match[1] || !context) ) {

				
				if ( match[1] ) {
					doc = (context ? context.ownerDocument || context : document);

					
					
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
					}
					
					return jQuery.merge( this, selector );
					
				
				} else {
					elem = document.getElementById( match[2] );

					
					
					if ( elem && elem.parentNode ) {
						
						
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			
			} else if ( !context && !rnonword.test( selector ) ) {
				this.selector = selector;
				this.context = document;
				selector = document.getElementsByTagName( selector );
				return jQuery.merge( this, selector );

			
			} else if ( !context || context.jquery ) {
				return (context || rootjQuery).find( selector );

			
			
			} else {
				return jQuery( context ).find( selector );
			}

		
		
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	
	selector: "",

	
	jquery: "1.4.4",

	
	length: 0,

	
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	
	
	get: function( num ) {
		return num == null ?

			
			this.toArray() :

			
			( num < 0 ? this.slice(num)[ 0 ] : this[ num ] );
	},

	
	
	pushStack: function( elems, name, selector ) {
		
		var ret = jQuery();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );
		
		} else {
			jQuery.merge( ret, elems );
		}

		
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		
		return ret;
	},

	
	
	
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},
	
	ready: function( fn ) {
		
		jQuery.bindReady();

		
		if ( jQuery.isReady ) {
			
			fn.call( document, jQuery );

		
		} else if ( readyList ) {
			
			readyList.push( fn );
		}

		return this;
	},
	
	eq: function( i ) {
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, +i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},
	
	end: function() {
		return this.prevObject || jQuery(null);
	},

	
	
	push: push,
	sort: [].sort,
	splice: [].splice
};


jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	 var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		
		i = 2;
	}

	
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		
		if ( (options = arguments[ i ]) != null ) {
			
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				
				if ( target === copy ) {
					continue;
				}

				
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					
					target[ name ] = jQuery.extend( deep, clone, copy );

				
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {

		return jQuery;
	},
	
	


	isReady: (_jQuery&&_jQuery.isReady),

	
	
	readyWait: 1,
	
	
	ready: function( wait ) {
		
		if ( wait === true ) {
			jQuery.readyWait--;
		}

		
		if ( !jQuery.readyWait || (wait !== true && !jQuery.isReady) ) {
			
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			
			jQuery.isReady = true;

			
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			
			if ( readyList ) {
				
				var fn,
					i = 0,
					ready = readyList;

				
				readyList = null;

				while ( (fn = ready[ i++ ]) ) {
					fn.call( document, jQuery );
				}

				
				if ( jQuery.fn.trigger ) {
					jQuery( document ).trigger( "ready" ).unbind( "ready" );
				}
			}
		}
	},
	
	bindReady: function() {
		if ( readyBound ) {
			return;
		}

		readyBound = true;

		
		
		if ( document.readyState === "complete" ) {
			
			return setTimeout( jQuery.ready, 1 );
		}

		
		if ( document.addEventListener ) {
			
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			
			
			window.addEventListener( "load", jQuery.ready, false );

		
		} else if ( document.attachEvent ) {
			
			
			document.attachEvent("onreadystatechange", DOMContentLoaded);
			
			
			window.attachEvent( "onload", jQuery.ready );

			
			
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	
	
	
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNaN: function( obj ) {
		return obj == null || !rdigit.test( obj ) || isNaN( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		
		
		
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}
		
		
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
		
		
		
	
		var key;
		for ( key in obj ) {}
		
		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},
	
	error: function( msg ) {
		throw msg;
	},
	
	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		
		data = jQuery.trim( data );
		
		
		
		if ( rvalidchars.test(data.replace(rvalidescape, "@")
			.replace(rvalidtokens, "]")
			.replace(rvalidbraces, "")) ) {

			
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();

		} else {
			jQuery.error( "Invalid JSON: " + data );
		}
	},

	noop: function() {},

	
	globalEval: function( data ) {
		if ( data && rnotwhite.test(data) ) {
			
			
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";

			if ( jQuery.support.scriptEval ) {
				script.appendChild( document.createTextNode( data ) );
			} else {
				script.text = data;
			}

			
			
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},


	
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction(object);

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
			}
		}

		return object;
	},

	
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			
			
			
			
			var type = jQuery.type(array);

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array ) {
		if ( array.indexOf ) {
			return array.indexOf( elem );
		}

		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		
		
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	
	map: function( elems, callback, arg ) {
		var ret = [], value;

		
		
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			value = callback( elems[ i ], i, arg );

			if ( value != null ) {
				ret[ ret.length ] = value;
			}
		}

		return ret.concat.apply( [], ret );
	},

	
	guid: 1,

	proxy: function( fn, proxy, thisObject ) {
		if ( arguments.length === 2 ) {
			if ( typeof proxy === "string" ) {
				thisObject = fn;
				fn = thisObject[ proxy ];
				proxy = undefined;

			} else if ( proxy && !jQuery.isFunction( proxy ) ) {
				thisObject = proxy;
				proxy = undefined;
			}
		}

		if ( !proxy && fn ) {
			proxy = function() {
				return fn.apply( thisObject || this, arguments );
			};
		}

		
		if ( fn ) {
			proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
		}

		
		return proxy;
	},

	
	
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;
	
		
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}
	
		
		if ( value !== undefined ) {
			
			exec = !pass && exec && jQuery.isFunction(value);
		
			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}
		
			return elems;
		}
	
		
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return (new Date()).getTime();
	},

	
	
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	browser: {}
});


jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}


if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

if ( indexOf ) {
	jQuery.inArray = function( elem, array ) {
		return indexOf.call( array, elem );
	};
}



if ( !rwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}


rootjQuery = jQuery(document);


if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}


function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		
		
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	
	jQuery.ready();
}




if (!_jQuery)
	window.jQuery = window.$ = jQuery;
return window.jq = jQuery; 

})();


(function() {

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + jQuery.now();

	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0],
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		
		leadingWhitespace: div.firstChild.nodeType === 3,

		
		
		tbody: !div.getElementsByTagName("tbody").length,

		
		
		htmlSerialize: !!div.getElementsByTagName("link").length,

		
		
		style: /red/.test( a.getAttribute("style") ),

		
		
		hrefNormalized: a.getAttribute("href") === "/a",

		
		
		
		opacity: /^0.55$/.test( a.style.opacity ),

		
		
		cssFloat: !!a.style.cssFloat,

		
		
		
		checkOn: div.getElementsByTagName("input")[0].value === "on",

		
		
		optSelected: opt.selected,

		
		deleteExpando: true,
		optDisabled: false,
		checkClone: false,
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableHiddenOffsets: true
	};

	
	
	select.disabled = true;
	jQuery.support.optDisabled = !opt.disabled;

	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e) {}

	root.insertBefore( script, root.firstChild );

	
	
	
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	
	
	try {
		delete script.test;

	} catch(e) {
		jQuery.support.deleteExpando = false;
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function click() {
			
			
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", click);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	div = document.createElement("div");
	div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";

	var fragment = document.createDocumentFragment();
	fragment.appendChild( div.firstChild );

	
	jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

	
	
	jQuery(function() {
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;

		if ( "zoom" in div.style ) {
			
			
			
			
			div.style.display = "inline";
			div.style.zoom = 1;
			jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;

			
			
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
		}

		div.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
		var tds = div.getElementsByTagName("td");

		
		
		
		
		
		
		
		jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;

		tds[0].style.display = "";
		tds[1].style.display = "none";

		
		
		jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
		div.innerHTML = "";

		document.body.removeChild( div ).style.display = "none";
		div = tds = null;
	});

	
	
	var eventSupported = function( eventName ) {
		var el = document.createElement("div");
		eventName = "on" + eventName;

		var isSupported = (eventName in el);
		if ( !isSupported ) {
			el.setAttribute(eventName, "return;");
			isSupported = typeof el[eventName] === "function";
		}
		el = null;

		return isSupported;
	};

	jQuery.support.submitBubbles = eventSupported("submit");
	jQuery.support.changeBubbles = eventSupported("change");

	
	root = script = div = all = a = null;
})();



var windowData = {},
	rbrace = /^(?:\{.*\}|\[.*\])$/;

jQuery.extend({
	cache: {},

	
	uuid: 0,

	
	expando: "jQuery" + jQuery.now(),

	
	
	noData: {
		"embed": true,
		
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	data: function( elem, name, data ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var isNode = elem.nodeType,
			id = isNode ? elem[ jQuery.expando ] : null,
			cache = jQuery.cache, thisCache;

		if ( isNode && !id && typeof name === "string" && data === undefined ) {
			return;
		}

		
		if ( !isNode ) {
			cache = elem;

		
		} else if ( !id ) {
			elem[ jQuery.expando ] = id = ++jQuery.uuid;
		}

		
		
		if ( typeof name === "object" ) {
			if ( isNode ) {
				cache[ id ] = jQuery.extend(cache[ id ], name);

			} else {
				jQuery.extend( cache, name );
			}

		} else if ( isNode && !cache[ id ] ) {
			cache[ id ] = {};
		}

		thisCache = isNode ? cache[ id ] : cache;

		
		if ( data !== undefined ) {
			thisCache[ name ] = data;
		}

		return typeof name === "string" ? thisCache[ name ] : thisCache;
	},

	removeData: function( elem, name ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var isNode = elem.nodeType,
			id = isNode ? elem[ jQuery.expando ] : elem,
			cache = jQuery.cache,
			thisCache = isNode ? cache[ id ] : id;

		
		if ( name ) {
			if ( thisCache ) {
				
				delete thisCache[ name ];

				
				if ( isNode && jQuery.isEmptyObject(thisCache) ) {
					jQuery.removeData( elem );
				}
			}

		
		} else {
			if ( isNode && jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];

			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );

			
			} else if ( isNode ) {
				delete cache[ id ];

			
			} else {
				for ( var n in elem ) {
					delete elem[ n ];
				}
			}
		}
	},

	
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				var attr = this[0].attributes, name;
				data = jQuery.data( this[0] );

				for ( var i = 0, l = attr.length; i < l; i++ ) {
					name = attr[i].name;

					if ( name.indexOf( "data-" ) === 0 ) {
						name = name.substr( 5 );
						dataAttr( this[0], name, data[ name ] );
					}
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var $this = jQuery( this ),
					args = [ parts[0], value ];

				$this.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				$this.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	
	
	if ( data === undefined && elem.nodeType === 1 ) {
		data = elem.getAttribute( "data-" + key );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				!jQuery.isNaN( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}




jQuery.extend({
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery.data( elem, type );

		
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery.data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();

		
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			
			
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function( i ) {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},

	
	
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue( type, function() {
			var elem = this;
			setTimeout(function() {
				jQuery.dequeue( elem, type );
			}, time );
		});
	},

	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	}
});


function setClassName( elem, className ) {
	if (elem.className != className)
		elem.className = className;
}



var rclass = /[\n\t]/g,
	rspaces = /\s+/,
	rreturn = /\r/g,
	rspecialurl = /^(?:href|src|style)$/,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rradiocheck = /^(?:radio|checkbox)$/i;

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	colspan: "colSpan",
	tabindex: "tabIndex",
	usemap: "useMap",
	frameborder: "frameBorder"
};

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name, fn ) {
		return this.each(function(){
			jQuery.attr( this, name, "" );
			if ( this.nodeType === 1 ) {
				this.removeAttribute( name );
			}
		});
	},

	addClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.addClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( value && typeof value === "string" ) {
			var classNames = (value || "").split( rspaces );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className ) {
						elem.className = value;

					} else {
						var className = " " + elem.className + " ",
							setClass = elem.className;

						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
								setClass += " " + classNames[c];
							}
						}
						setClassName( elem, jQuery.trim( setClass ) );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.removeClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			var classNames = (value || "").split( rspaces );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						var className = (" " + elem.className + " ").replace(rclass, " ");
						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[c] + " ", " ");
						}
						setClassName( elem, jQuery.trim( className ) );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.toggleClass( value.call(this, i, self.attr("class"), stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspaces );

				while ( (className = classNames[ i++ ]) ) {
					
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					
					jQuery.data( this, "__className__", this.className );
				}

				
				this.className = this.className || value === false ? "" : jQuery.data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ";
		for ( var i = 0, l = this.length; i < l; i++ ) {
			if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		if ( !arguments.length ) {
			var elem = this[0];

			if ( elem ) {
				if ( jQuery.nodeName( elem, "option" ) ) {
					
					
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text;
				}

				
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type === "select-one";

					
					if ( index < 0 ) {
						return null;
					}

					
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						
						if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && 
								(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

							
							value = jQuery(option).val();

							
							if ( one ) {
								return value;
							}

							
							values.push( value );
						}
					}

					return values;
				}

				
				if ( rradiocheck.test( elem.type ) && !jQuery.support.checkOn ) {
					return elem.getAttribute("value") === null ? "on" : elem.value;
				}
				

				
				return (elem.value || "").replace(rreturn, "");

			}

			return undefined;
		}

		var isFunction = jQuery.isFunction(value);

		return this.each(function(i) {
			var self = jQuery(this), val = value;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call(this, i, self.val());
			}

			
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray(val) ) {
				val = jQuery.map(val, function (value) {
					return value == null ? "" : value + "";
				});
			}

			if ( jQuery.isArray(val) && rradiocheck.test( this.type ) ) {
				this.checked = jQuery.inArray( self.val(), val ) >= 0;

			} else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(val);

				jQuery( "option", this ).each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					this.selectedIndex = -1;
				}

			} else {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},
		
	attr: function( elem, name, value, pass ) {
		
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery(elem)[name](value);
		}

		var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc( elem ),
			
			set = value !== undefined;

		
		name = notxml && jQuery.props[ name ] || name;

		
		var special = rspecialurl.test( name );

		
		
		if ( name === "selected" && !jQuery.support.optSelected ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}

		
		
		if ( (name in elem || elem[ name ] !== undefined) && notxml && !special ) {
			if ( set ) {
				
				if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				}

				if ( value === null ) {
					if ( elem.nodeType === 1 ) {
						elem.removeAttribute( name );
					}

				} else {
					elem[ name ] = value;
				}
			}

			
			if ( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) ) {
				return elem.getAttributeNode( name ).nodeValue;
			}

			
			
			if ( name === "tabIndex" ) {
				var attributeNode = elem.getAttributeNode( "tabIndex" );

				return attributeNode && attributeNode.specified ?
					attributeNode.value :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}

			return elem[ name ];
		}

		if ( !jQuery.support.style && notxml && name === "style" ) {
			if ( set ) {
				elem.style.cssText = "" + value;
			}

			return elem.style.cssText;
		}

		if ( set ) {
			
			elem.setAttribute( name, "" + value );
		}

		
		
		if ( !elem.attributes[ name ] && (elem.hasAttribute && !elem.hasAttribute( name )) ) {
			return undefined;
		}

		var attr = !jQuery.support.hrefNormalized && notxml && special ?
				
				elem.getAttribute( name, 2 ) :
				elem.getAttribute( name );

		
		return attr === null ? undefined : attr;
	}
});




var rnamespaces = /\.(.*)$/,
	rformElems = /^(?:textarea|input|select)$/i,
	rperiod = /\./g,
	rspace = / /g,
	rescape = /[^\w\s.|`]/g,
	fcleanup = function( nm ) {
		return nm.replace(rescape, "\\$&");
	},
	focusCounts = { focusin: 0, focusout: 0 };


jQuery.event = {

	
	
	add: function( elem, types, handler, data ) {
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		
		
		if ( jQuery.isWindow( elem ) && ( elem !== window && !elem.frameElement ) ) {
			elem = window;
		}

		if ( handler === false ) {
			handler = returnFalse;
		} else if ( !handler ) {
			
		  return;
		}

		var handleObjIn, handleObj;

		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		
		var elemData = jQuery.data( elem );

		
		
		if ( !elemData ) {
			return;
		}

		
		
		var eventKey = elem.nodeType ? "events" : "__events__",
			events = elemData[ eventKey ],
			eventHandle = elemData.handle;
			
		if ( typeof events === "function" ) {
			
			
			
			eventHandle = events.handle;
			events = events.events;

		} else if ( !events ) {
			if ( !elem.nodeType ) {
				
				
				elemData[ eventKey ] = elemData = function(){};
			}

			elemData.events = events = {};
		}

		if ( !eventHandle ) {
			elemData.handle = eventHandle = function() {
				
				
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
					undefined;
			};
		}

		
		
		eventHandle.elem = elem;

		
		
		types = types.split(" ");

		var type, i = 0, namespaces;

		while ( (type = types[ i++ ]) ) {
			handleObj = handleObjIn ?
				jQuery.extend({}, handleObjIn) :
				{ handler: handler, data: data };

			
			if ( type.indexOf(".") > -1 ) {
				namespaces = type.split(".");
				type = namespaces.shift();
				handleObj.namespace = namespaces.slice(0).sort().join(".");

			} else {
				namespaces = [];
				handleObj.namespace = "";
			}

			handleObj.type = type;
			if ( !handleObj.guid ) {
				handleObj.guid = handler.guid;
			}

			
			var handlers = events[ type ],
				special = jQuery.event.special[ type ] || {};

			
			if ( !handlers ) {
				handlers = events[ type ] = [];

				
				
				
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}
			
			if ( special.add ) { 
				special.add.call( elem, handleObj ); 

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			
			handlers.push( handleObj );

			
			jQuery.event.global[ type ] = true;
		}

		
		elem = null;
	},

	global: {},

	
	remove: function( elem, types, handler, pos ) {
		
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		if ( handler === false ) {
			handler = returnFalse;
		}

		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
			eventKey = elem.nodeType ? "events" : "__events__",
			elemData = jQuery.data( elem ),
			events = elemData && elemData[ eventKey ];

		if ( !elemData || !events ) {
			return;
		}
		
		if ( typeof events === "function" ) {
			elemData = events;
			events = events.events;
		}

		
		if ( types && types.type ) {
			handler = types.handler;
			types = types.type;
		}

		
		if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
			types = types || "";

			for ( type in events ) {
				jQuery.event.remove( elem, type + types );
			}

			return;
		}

		
		
		types = types.split(" ");

		while ( (type = types[ i++ ]) ) {
			origType = type;
			handleObj = null;
			all = type.indexOf(".") < 0;
			namespaces = [];

			if ( !all ) {
				
				namespaces = type.split(".");
				type = namespaces.shift();

				namespace = new RegExp("(^|\\.)" + 
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
			}

			eventType = events[ type ];

			if ( !eventType ) {
				continue;
			}

			if ( !handler ) {
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( all || namespace.test( handleObj.namespace ) ) {
						jQuery.event.remove( elem, origType, handleObj.handler, j );
						eventType.splice( j--, 1 );
					}
				}

				continue;
			}

			special = jQuery.event.special[ type ] || {};

			for ( j = pos || 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( handler.guid === handleObj.guid ) {
					
					if ( all || namespace.test( handleObj.namespace ) ) {
						if ( pos == null ) {
							eventType.splice( j--, 1 );
						}

						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}

					if ( pos != null ) {
						break;
					}
				}
			}

			
			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				ret = null;
				delete events[ type ];
			}
		}

		
		if ( jQuery.isEmptyObject( events ) ) {
			var handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			delete elemData.events;
			delete elemData.handle;

			if ( typeof elemData === "function" ) {
				jQuery.removeData( elem, eventKey );

			} else if ( jQuery.isEmptyObject( elemData ) ) {
				jQuery.removeData( elem );
			}
		}
	},

	
	trigger: function( event, data, elem  ) {
		
		var type = event.type || event,
			bubbling = arguments[3];

		if ( !bubbling ) {
			event = typeof event === "object" ?
				
				event[ jQuery.expando ] ? event :
				
				jQuery.extend( jQuery.Event(type), event ) :
				
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			
			if ( !elem ) {
				
				event.stopPropagation();

				
				if ( jQuery.event.global[ type ] ) {
					jQuery.each( jQuery.cache, function() {
						if ( this.events && this.events[type] ) {
							jQuery.event.trigger( event, data, this.handle.elem );
						}
					});
				}
			}

			

			
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
				return undefined;
			}

			
			event.result = undefined;
			event.target = elem;

			
			data = jQuery.makeArray( data );
			data.unshift( event );
		}

		event.currentTarget = elem;

		
		var handle = elem.nodeType ?
			jQuery.data( elem, "handle" ) :
			(jQuery.data( elem, "__events__" ) || {}).handle;

		if ( handle ) {
			handle.apply( elem, data );
		}

		var parent = elem.parentNode || elem.ownerDocument;

		
		try {
			if ( !(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ) {
				if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
					event.result = false;
					event.preventDefault();
				}
			}

		
		} catch (inlineError) {}

		if ( !event.isPropagationStopped() && parent ) {
			jQuery.event.trigger( event, data, parent, true );

		} else if ( !event.isDefaultPrevented() ) {
			var old,
				target = event.target,
				targetType = type.replace( rnamespaces, "" ),
				isClick = jQuery.nodeName( target, "a" ) && targetType === "click",
				special = jQuery.event.special[ targetType ] || {};

			if ( (!special._default || special._default.call( elem, event ) === false) && 
				!isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()]) ) {

				try {
					if ( target[ targetType ] ) {
						
						old = target[ "on" + targetType ];

						if ( old ) {
							target[ "on" + targetType ] = null;
						}

						jQuery.event.triggered = true;
						target[ targetType ]();
					}

				
				} catch (triggerError) {}

				if ( old ) {
					target[ "on" + targetType ] = old;
				}

				jQuery.event.triggered = false;
			}
		}
	},

	handle: function( event ) {
		var all, handlers, namespaces, namespace_re, events,
			namespace_sort = [],
			args = jQuery.makeArray( arguments );

		event = args[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;

		
		all = event.type.indexOf(".") < 0 && !event.exclusive;

		if ( !all ) {
			namespaces = event.type.split(".");
			event.type = namespaces.shift();
			namespace_sort = namespaces.slice(0).sort();
			namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
		}

		event.namespace = event.namespace || namespace_sort.join(".");

		events = jQuery.data(this, this.nodeType ? "events" : "__events__");

		if ( typeof events === "function" ) {
			events = events.events;
		}

		handlers = (events || {})[ event.type ];

		if ( events && handlers ) {
			
			handlers = handlers.slice(0);

			for ( var j = 0, l = handlers.length; j < l; j++ ) {
				var handleObj = handlers[ j ];

				
				if ( all || namespace_re.test( handleObj.namespace ) ) {
					
					
					event.handler = handleObj.handler;
					event.data = handleObj.data;
					event.handleObj = handleObj;
	
					var ret = handleObj.handler.apply( this, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}

					if ( event.isImmediatePropagationStopped() ) {
						break;
					}
				}
			}
		}

		return event.result;
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		
		
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ) {
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		
		if ( !event.target ) {
			
			event.target = event.srcElement || document;
		}

		
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		
		if ( !event.relatedTarget && event.fromElement ) {
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
		}

		
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement,
				body = document.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		
		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
			event.which = event.charCode != null ? event.charCode : event.keyCode;
		}

		
		if ( !event.metaKey && event.ctrlKey ) {
			event.metaKey = event.ctrlKey;
		}

		
		
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

		return event;
	},

	
	guid: 1E8,

	
	proxy: jQuery.proxy,

	special: {
		ready: {
			
			setup: jQuery.bindReady,
			teardown: jQuery.noop
		},

		live: {
			add: function( handleObj ) {
				jQuery.event.add( this,
					liveConvert( handleObj.origType, handleObj.selector ),
					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) ); 
			},

			remove: function( handleObj ) {
				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );
			}
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} : 
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src ) {
	
	if ( !this.preventDefault ) {
		return new jQuery.Event( src );
	}

	
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;
	
	} else {
		this.type = src;
	}

	
	
	this.timeStamp = jQuery.now();

	
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}



jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		
		
		if ( e.preventDefault ) {
			e.preventDefault();

		
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};



var withinElement = function( event ) {
	
	var parent = event.relatedTarget;

	
	
	try {
		
		while ( parent && parent !== this ) {
			parent = parent.parentNode;
		}

		if ( parent !== this ) {
			
			event.type = event.data;

			
			jQuery.event.handle.apply( this, arguments );
		}

	
	} catch(e) { }
},



delegate = function( event ) {
	event.type = event.data;
	jQuery.event.handle.apply( this, arguments );
};


jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		setup: function( data ) {
			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
		},
		teardown: function( data ) {
			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
		}
	};
});


if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function( data, namespaces ) {
			if ( this.nodeName.toLowerCase() !== "form" ) {
				jQuery.event.add(this, "click.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
						e.liveFired = undefined;
						return trigger( "submit", this, arguments );
					}
				});
	 
				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
						e.liveFired = undefined;
						return trigger( "submit", this, arguments );
					}
				});

			} else {
				return false;
			}
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialSubmit" );
		}
	};

}


if ( !jQuery.support.changeBubbles ) {

	var changeFilters,

	getVal = function( elem ) {
		var type = elem.type, val = elem.value;

		if ( type === "radio" || type === "checkbox" ) {
			val = elem.checked;

		} else if ( type === "select-multiple" ) {
			val = elem.selectedIndex > -1 ?
				jQuery.map( elem.options, function( elem ) {
					return elem.selected;
				}).join("-") :
				"";

		} else if ( elem.nodeName.toLowerCase() === "select" ) {
			val = elem.selectedIndex;
		}

		return val;
	},

	testChange = function testChange( e ) {
		var elem = e.target, data, val;

		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		data = jQuery.data( elem, "_change_data" );
		val = getVal(elem);

		
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery.data( elem, "_change_data", val );
		}
		
		if ( data === undefined || val === data ) {
			return;
		}

		if ( data != null || val ) {
			e.type = "change";
			e.liveFired = undefined;
			return jQuery.event.trigger( e, arguments[1], elem );
		}
	};

	jQuery.event.special.change = {
		filters: {
			focusout: testChange, 

			beforedeactivate: testChange,

			click: function( e ) {
				var elem = e.target, type = elem.type;

				if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
					return testChange.call( this, e );
				}
			},

			
			
			keydown: function( e ) {
				var elem = e.target, type = elem.type;

				if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					return testChange.call( this, e );
				}
			},

			
			
			
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery.data( elem, "_change_data", getVal(elem) );
			}
		},

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
			}

			return rformElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialChange" );

			return rformElems.test( this.nodeName );
		}
	};

	changeFilters = jQuery.event.special.change.filters;

	
	changeFilters.focus = changeFilters.beforeactivate;
}

function trigger( type, elem, args ) {
	args[0].type = type;
	return jQuery.event.handle.apply( elem, args );
}


if ( document.addEventListener ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( focusCounts[fix]++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			}, 
			teardown: function() { 
				if ( --focusCounts[fix] === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};

		function handler( e ) { 
			e = jQuery.event.fix( e );
			e.type = fix;
			return jQuery.event.trigger( e, null, e.target );
		}
	});
}

jQuery.each(["bind", "one"], function( i, name ) {
	jQuery.fn[ name ] = function( type, data, fn ) {
		
		if ( typeof type === "object" ) {
			for ( var key in type ) {
				this[ name ](key, data, type[key], fn);
			}
			return this;
		}
		
		if ( jQuery.isFunction( data ) || data === false ) {
			fn = data;
			data = undefined;
		}

		var handler = name === "one" ? jQuery.proxy( fn, function( event ) {
			jQuery( this ).unbind( event, handler );
			return fn.apply( this, arguments );
		}) : fn;

		if ( type === "unload" && name !== "one" ) {
			this.one( type, data, fn );

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.add( this[i], type, handler, data );
			}
		}

		return this;
	};
});

jQuery.fn.extend({
	unbind: function( type, fn ) {
		
		if ( typeof type === "object" && !type.preventDefault ) {
			for ( var key in type ) {
				this.unbind(key, type[key]);
			}

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.remove( this[i], type, fn );
			}
		}

		return this;
	},
	
	delegate: function( selector, types, data, fn ) {
		return this.live( types, data, fn, selector );
	},
	
	undelegate: function( selector, types, fn ) {
		if ( arguments.length === 0 ) {
				return this.unbind( "live" );
		
		} else {
			return this.die( types, null, fn, selector );
		}
	},
	
	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			var event = jQuery.Event( type );
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}
	},

	toggle: function( fn ) {
		
		var args = arguments,
			i = 1;

		
		while ( i < args.length ) {
			jQuery.proxy( fn, args[ i++ ] );
		}

		return this.click( jQuery.proxy( fn, function( event ) {
			
			var lastToggle = ( jQuery.data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery.data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			
			event.preventDefault();

			
			return args[ lastToggle ].apply( this, arguments ) || false;
		}));
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

var liveMap = {
	focus: "focusin",
	blur: "focusout",
	mouseenter: "mouseover",
	mouseleave: "mouseout"
};

jQuery.each(["live", "die"], function( i, name ) {
	jQuery.fn[ name ] = function( types, data, fn, origSelector  ) {
		var type, i = 0, match, namespaces, preType,
			selector = origSelector || this.selector,
			context = origSelector ? this : jQuery( this.context );
		
		if ( typeof types === "object" && !types.preventDefault ) {
			for ( var key in types ) {
				context[ name ]( key, data, types[key], selector );
			}
			
			return this;
		}

		if ( jQuery.isFunction( data ) ) {
			fn = data;
			data = undefined;
		}

		types = (types || "").split(" ");

		while ( (type = types[ i++ ]) != null ) {
			match = rnamespaces.exec( type );
			namespaces = "";

			if ( match )  {
				namespaces = match[0];
				type = type.replace( rnamespaces, "" );
			}

			if ( type === "hover" ) {
				types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
				continue;
			}

			preType = type;

			if ( type === "focus" || type === "blur" ) {
				types.push( liveMap[ type ] + namespaces );
				type = type + namespaces;

			} else {
				type = (liveMap[ type ] || type) + namespaces;
			}

			if ( name === "live" ) {
				
				for ( var j = 0, l = context.length; j < l; j++ ) {
					jQuery.event.add( context[j], "live." + liveConvert( type, selector ),
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
				}

			} else {
				
				context.unbind( "live." + liveConvert( type, selector ), fn );
			}
		}
		
		return this;
	};
});

function liveHandler( event ) {
	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
		elems = [],
		selectors = [],
		events = jQuery.data( this, this.nodeType ? "events" : "__events__" );

	if ( typeof events === "function" ) {
		events = events.events;
	}

	
	if ( event.liveFired === this || !events || !events.live || event.button && event.type === "click" ) {
		return;
	}
	
	if ( event.namespace ) {
		namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
	}

	event.liveFired = this;

	var live = events.live.slice(0);

	for ( j = 0; j < live.length; j++ ) {
		handleObj = live[j];

		if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
			selectors.push( handleObj.selector );

		} else {
			live.splice( j--, 1 );
		}
	}

	match = jQuery( event.target ).closest( selectors, event.currentTarget );

	for ( i = 0, l = match.length; i < l; i++ ) {
		close = match[i];

		for ( j = 0; j < live.length; j++ ) {
			handleObj = live[j];

			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) ) {
				elem = close.elem;
				related = null;

				
				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
					event.type = handleObj.preType;
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
				}

				if ( !related || related !== elem ) {
					elems.push({ elem: elem, handleObj: handleObj, level: close.level });
				}
			}
		}
	}

	for ( i = 0, l = elems.length; i < l; i++ ) {
		match = elems[i];

		if ( maxLevel && match.level > maxLevel ) {
			break;
		}

		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		ret = match.handleObj.origHandler.apply( match.elem, arguments );

		if ( ret === false || event.isPropagationStopped() ) {
			maxLevel = match.level;

			if ( ret === false ) {
				stop = false;
			}
			if ( event.isImmediatePropagationStopped() ) {
				break;
			}
		}
	}

	return stop;
}

function liveConvert( type, selector ) {
	return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.bind( name, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});





if ( window.attachEvent && !window.addEventListener ) {
	jQuery(window).bind("unload", function() {
		for ( var id in jQuery.cache ) {
			if ( jQuery.cache[ id ].handle ) {
				
				try {
					jQuery.event.remove( jQuery.cache[ id ].handle.elem );
				} catch(e) {}
			}
		}
	});
}



(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;





[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}

	} else {
		
		
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null && set.length ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName( "*" );
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop, inplace);
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	
	order: [ "ID", "ZID", "NAME", "TAG", "ZTAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		
		ZID: /\$((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		
		ZTAG: /^((?:[@\w\u00c0-\uFFFF\*-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isZTag = isPartStr && /@/.test(part), 
				isZID = isPartStr && /\$/.test(part), 
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					
					if (isZTag || isZID) {
						var w = zk.Widget.$(elem, {exact: 1});
						checkSet[i] = w && w[isZTag ? 'widgetName' : 'id'] == part.substring(1) ? elem : false;
					} else {
						checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
							elem || false :
							elem === part;
					}
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isZTag = isPartStr && /@/.test(part), 
				isZID = isPartStr && /\$/.test(part), 
				elem, i = 0, l = checkSet.length;

			if ( isPartStr && !/\W/.test(part) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						
						if (isZTag || isZID) {
							var c = zk.Widget.$(elem, {exact: 1}),
								p = c ? c.parent : zk.Widget.$(elem.parentNode, {exact: 1});
							checkSet[i] = p && p[isZTag ? 'widgetName' : 'id'] == part.substring(1) ? p.$n() : false;
						} else {
							checkSet[i] = isPartStr ?
								elem.parentNode :
								elem.parentNode === part;
						}

						
						if (!isPartStr && !checkSet[i]) {
							var p = zk.Widget.$(part, {exact: 1}),
								c = zk.Widget.$(elem, {exact: 1});
							if (p && c)
								checkSet[i] = p == c.parent;
						}
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				
				
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		},
		
		ZID: function(match, context){
			return zk.Widget.getElementsById(match[1]);
		},
		
		ZTAG: function(match, context){
			return context == window ?
				zk.Widget.getElementsByName(match[1].substring(1)) :
				jq.grep(zk.Widget.getElementsByName(match[1].substring(1)), function (n) {
					return jq.isAncestor(context, n);
				});
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace(/\\/g, "");
		},

		TAG: function( match, curLoop ) {
			return match[1].toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			
			
			elem.parentNode.selectedIndex;
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			return "text" === elem.type;
		},
		radio: function( elem ) {
			return "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return "checkbox" === elem.type;
		},

		file: function( elem ) {
			return "file" === elem.type;
		},
		password: function( elem ) {
			return "password" === elem.type;
		},

		submit: function( elem ) {
			return "submit" === elem.type;
		},

		image: function( elem ) {
			return "image" === elem.type;
		},

		reset: function( elem ) {
			return "reset" === elem.type;
		},

		button: function( elem ) {
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		ZTAG: function(elem, match, i, curloop, inplace){
			var wgt = zk.Widget.$(elem, {exact: !inplace}) || false;
			return wgt && wgt.className.toLowerCase().endsWith(match[1].substring(1));
		},
		
		ZID: function(elem, match) {
			var wgt = zk.Widget.$(elem);
			return wgt ? wgt.id === match[1] : false;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name );
			
			if (!result) {
				var wgt = zk.Widget.$(elem, {exact: 1});
				if (wgt)
					result = wgt.get(name) || result;
			}
			var	value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};





try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;


} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		
		} else if ( aup === bup ) {
			return siblingCheck( a, b );

		
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		
		
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}


Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};



(function(){
	
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	
	root.insertBefore( form, root.firstChild );

	
	
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	
	root = form = null;
})();

(function(){
	
	

	
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		
		
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			
			query = query.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			
			
			if ( !seed && !Sizzle.isXML(context) ) {
				if ( context.nodeType === 9 ) {
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				
				
				
				
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute( "id" ),
						nid = old || id;

					if ( !old ) {
						context.setAttribute( "id", nid );
					}

					try {
						return makeArray( context.querySelectorAll( "#" + nid + " " + query ), extra );

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector,
		pseudoWorks = false;

	try {
		
		
		matches.call( document.documentElement, "[test!='']:sizzle" );
	
	} catch( pseudoError ) {
		pseudoWorks = true;
	}

	if ( matches ) {
		Sizzle.matchesSelector = function( node, expr ) {
			
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						return matches.call( node, expr );
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	
	
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	
	var cacheElem,
		isZID = /\$/.test(cur),
		isZTag = /@/.test(cur);
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			
			if (cur.indexOf("@") == 0 || cur.indexOf("$") == 0) {
				var wgt = zk.Widget.$(elem, {exact: 1}),
					fn = dir == "parentNode" ? "parent" : dir;
				while (wgt && (wgt = wgt[fn])) {
					elem = wgt.$n(); 
					if (elem) break;
				}
			} else
				elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					
					
					match = checkSet[elem.sizset] === 0 ? cacheElem : checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			
			if (match && (isZID || isZTag)) {
				var w = zk.Widget.$(checkSet[i], {exact: 1});
				if (w && w[isZID ? 'id' : 'widgetName'] == cur.substring(1)) {
					cacheElem = match;
					match = 0; 
				}
			}
			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	
	
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	
	
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};


jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS;

jQuery.fn.extend({
	find: function( selector ) {
		var ret = this.pushStack( "", "find", selector ),
			length = 0;

		for ( var i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				
				for ( var n = length; n < ret.length; n++ ) {
					for ( var r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},
	
	is: function( selector ) {
		return !!selector && jQuery.filter( selector, this ).length > 0;
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];

		if ( jQuery.isArray( selectors ) ) {
			var match, selector,
				matches = {},
				level = 1;

			if ( cur && selectors.length ) {
				for ( i = 0, l = selectors.length; i < l; i++ ) {
					selector = selectors[i];

					if ( !matches[selector] ) {
						matches[selector] = jQuery.expr.match.POS.test( selector ) ? 
							jQuery( selector, context || this.context ) :
							selector;
					}
				}

				while ( cur && cur.ownerDocument && cur !== context ) {
					for ( selector in matches ) {
						match = matches[selector];

						if ( match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match) ) {
							ret.push({ selector: selector, elem: cur, level: level });
						}
					}

					cur = cur.parentNode;
					level++;
				}
			}

			return ret;
		}

		var pos = POS.test( selectors ) ? 
			jQuery( selectors, context || this.context ) : null;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique(ret) : ret;
		
		return this.pushStack( ret, "closest", selectors );
	},
	
	
	
	index: function( elem ) {
		if ( !elem || typeof elem === "string" ) {
			return jQuery.inArray( this[0],
				
				
				elem ? jQuery( elem ) : this.parent().children() );
		}
		
		return jQuery.inArray(
			
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context || this.context ) :
				jQuery.makeArray( selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});



function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );
		
		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call(arguments).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},
	
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});


function winnow( elements, qualifier, keep ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return (elem === qualifier) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
	});
}




var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnocache = /<(?:script|object|embed|option|style)/i,
	
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	raction = /\=([^="'>\s]+\/)>/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		return this.each(function() {
			jQuery( this ).wrapAll( html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery(arguments[0]);
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery(arguments[0]).toArray() );
			return set;
		}
	},
	
	
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					 elem.parentNode.removeChild( elem );
				}
			}
		}
		
		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}
		
		return this;
	},

	clone: function( events ) {
		
		var ret = this.map(function() {
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				
				
				
				
				
				
				
				
				var html = this.outerHTML,
					ownerDocument = this.ownerDocument;

				if ( !html ) {
					var div = ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(rinlinejQuery, "")
					
					.replace(raction, '="$1">')
					.replace(rleadingWhitespace, "")], ownerDocument)[0];
			} else {
				return this.cloneNode(true);
			}
		});

		
		if ( events === true ) {
			cloneCopyEvent( this, ret );
			cloneCopyEvent( this.find("*"), ret.find("*") );
		}

		
		return ret;
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		
		} else if ( typeof value === "string" && !rnocache.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			
			
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value );
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}
			
			fragment = results.fragment;
			
			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						i > 0 || results.cacheable || this.length > 1  ?
							fragment.cloneNode(true) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent(orig, ret) {
	var i = 0;

	ret.each(function() {
		if ( this.nodeName !== (orig[i] && orig[i].nodeName) ) {
			return;
		}

		var oldData = jQuery.data( orig[i++] ),
			curData = jQuery.data( this, oldData ),
			events = oldData && oldData.events;

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( var type in events ) {
				for ( var handler in events[ type ] ) {
					jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
				}
			}
		}
	});
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults,
		doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);

	
	
	
	
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		!rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

		cacheable = true;
		cacheresults = jQuery.fragments[ args[0] ];
		if ( cacheresults ) {
			if ( cacheresults !== 1 ) {
				fragment = cacheresults;
			}
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;
		
		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;
			
		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}
		
			return this.pushStack( ret, name, insert.selector );
		}
	};
});

jQuery.extend({
	clean: function( elems, context, fragment, scripts ) {
		context = context || document;

		
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [];

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			
			if ( typeof elem === "string" && !rhtml.test( elem ) ) {
				elem = context.createTextNode( elem );

			} else if ( typeof elem === "string" ) {
				
				elem = elem.replace(rxhtmlTag, "<$1></$2>");

				
				var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
					wrap = wrapMap[ tag ] || wrapMap._default,
					depth = wrap[0],
					div = context.createElement("div");

				
				div.innerHTML = wrap[1] + elem + wrap[2];

				
				while ( depth-- ) {
					div = div.lastChild;
				}

				
				if ( !jQuery.support.tbody ) {

					
					var hasBody = rtbody.test(elem),
						tbody = tag === "table" && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

							
							wrap[1] === "<table>" && !hasBody ?
								div.childNodes :
								[];

					for ( var j = tbody.length - 1; j >= 0 ; --j ) {
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
							tbody[ j ].parentNode.removeChild( tbody[ j ] );
						}
					}

				}

				
				if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
				}

				elem = div.childNodes;
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				
				} else {
					if ( ret[i].nodeType === 1 ) {
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},
	
	cleanData: function( elems ) {
		var data, id, cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;
		
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];
			
			if ( id ) {
				data = cache[ id ];
				
				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}
				}
				
				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}
				
				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rdashAlpha = /-([a-z])/ig,
	rupper = /([A-Z])/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle,

	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn.css = function( name, value ) {
	
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	
	
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	
	cssNumber: {
		"zIndex": true,
		"fontWeight": true,
		"opacity": true,
		"zoom": true,
		"lineHeight": true
	},

	
	
	cssProps: {
		
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	
	style: function( elem, name, value, extra ) {
		
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		
		var ret, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		
		if ( value !== undefined ) {
			
			if ( typeof value === "number" && isNaN( value ) || value == null ) {
				return;
			}

			
			if ( typeof value === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				
				
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		
		var ret, origName = jQuery.camelCase( name ),
			hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		
		} else if ( curCSS ) {
			return curCSS( elem, name, origName );
		}
	},

	
	swap: function( elem, options, callback ) {
		var old = {};

		
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	},

	camelCase: function( string ) {
		return string.replace( rdashAlpha, fcamelCase );
	}
});


jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				
				if (extra != 'styleonly') {
    				if ( elem.offsetWidth !== 0 ) {
    					val = getWH( elem, name, extra );
    
    				} else {
    					jQuery.swap( elem, cssShow, function() {
    						val = getWH( elem, name, extra );
    					});
    				}
				} else {
					val = '';
				}
				if ( val <= 0 ) {
					val = curCSS( elem, name, name );

					if ( val === "0px" && currentStyle ) {
						val = currentStyle( elem, name, name );
					}

					if ( val != null ) {
						
						
						return val === "" || val === "auto" ? "0px" : val;
					}
				}

				if ( val < 0 || val == null ) {
					val = elem.style[ name ];

					
					
					return val === "" || val === "auto" ? "0px" : val;
				}

				return typeof val === "string" ? val : val + "px";
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				
				value = parseFloat(value);

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			
			return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style;

			
			
			style.zoom = 1;

			
			var opacity = jQuery.isNaN(value) ?
				"" :
				"alpha(opacity=" + value * 100 + ")",
				filter = style.filter || "";

			style.filter = ralpha.test(filter) ?
				filter.replace(ralpha, opacity) :
				style.filter + ' ' + opacity;
		}
	};
}

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, newName, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		
		

		
		
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
			
			left = style.left;
			rsLeft = elem.runtimeStyle.left;

			
			elem.runtimeStyle.left = elem.currentStyle.left;
			style.left = name === "fontSize" ? "1em" : (ret || 0);
			ret = style.pixelLeft + "px";

			
			style.left = left;
			elem.runtimeStyle.left = rsLeft;
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {
	var which = name === "width" ? cssWidth : cssHeight,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

	if ( extra === "border" ) {
		return val;
	}

	jQuery.each( which, function() {
		if ( !extra ) {
			val -= parseFloat(jQuery.css( elem, "padding" + this )) || 0;
		}

		if ( extra === "margin" ) {
			val += parseFloat(jQuery.css( elem, "margin" + this )) || 0;

		} else {
			val -= parseFloat(jQuery.css( elem, "border" + this + "Width" )) || 0;
		}
	});

	return val;
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var jsc = jQuery.now(),
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rnoContent = /^(?:GET|HEAD)$/,
	rbracket = /\[\]$/,
	jsre = /\=\?(&|$)/,
	rquery = /\?/,
	rts = /([?&])_=[^&]*/,
	rurl = /^(\w+:)?\/\/([^\/?#]+)/,
	r20 = /%20/g,
	rhash = /#.*$/,

	
	_load = jQuery.fn.load;

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		
		var type = "GET";

		
		if ( params ) {
			
			if ( jQuery.isFunction( params ) ) {
				
				callback = params;
				params = null;

			
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function( res, status ) {
				
				if ( status === "success" || status === "notmodified" ) {
					
					self.html( selector ?
						
						jQuery("<div>")
							
							
							.append(res.responseText.replace(rscript, ""))

							
							.find(selector) :

						
						res.responseText );
				}

				if ( callback ) {
					self.each( callback, [res.responseText, status, res] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},

	serializeArray: function() {
		return this.map(function() {
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function() {
			return this.name && !this.disabled &&
				(this.checked || rselectTextarea.test(this.nodeName) ||
					rinput.test(this.type));
		})
		.map(function( i, elem ) {
			var val = jQuery(this).val();

			return val == null ?
				null :
				jQuery.isArray(val) ?
					jQuery.map( val, function( val, i ) {
						return { name: elem.name, value: val };
					}) :
					{ name: elem.name, value: val };
		}).get();
	}
});


jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function( i, o ) {
	jQuery.fn[o] = function( f ) {
		return this.bind(o, f);
	};
});

jQuery.extend({
	get: function( url, data, callback, type ) {
		
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		
		
		xhr: function() {
			return new window.XMLHttpRequest();
		},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	ajax: function( origSettings, isUnload ) {
		var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings),
			jsonp, status, data, type = s.type.toUpperCase(), noContent = rnoContent.test(type);

		s.url = s.url.replace( rhash, "" );

		
		s.context = origSettings && origSettings.context != null ? origSettings.context : s;

		
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		
		if ( s.dataType === "jsonp" ) {
			if ( type === "GET" ) {
				if ( !jsre.test( s.url ) ) {
					s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
				}
			} else if ( !s.data || !jsre.test(s.data) ) {
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			}
			s.dataType = "json";
		}

		
		if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
			jsonp = s.jsonpCallback || ("jsonp" + jsc++);

			
			if ( s.data ) {
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			}

			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			
			
			s.dataType = "script";

			
			var customJsonp = window[ jsonp ];

			window[ jsonp ] = function( tmp ) {
				if ( jQuery.isFunction( customJsonp ) ) {
					customJsonp( tmp );

				} else {
					
					window[ jsonp ] = undefined;

					try {
						delete window[ jsonp ];
					} catch( jsonpError ) {}
				}

				data = tmp;
				jQuery.handleSuccess( s, xhr, status, data );
				jQuery.handleComplete( s, xhr, status, data );
				
				if ( head ) {
					head.removeChild( script );
				}
			};
		}

		if ( s.dataType === "script" && s.cache === null ) {
			s.cache = false;
		}

		if ( s.cache === false && noContent ) {
			var ts = jQuery.now();

			
			var ret = s.url.replace(rts, "$1_=" + ts);

			
			s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
		}

		
		if ( s.data && noContent ) {
			s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
		}

		
		if ( s.global && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		
		var parts = rurl.exec( s.url ),
			remote = parts && (parts[1] && parts[1].toLowerCase() !== location.protocol || parts[2].toLowerCase() !== location.host);

		
		
		if ( s.dataType === "script" && type === "GET" && remote ) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			if ( s.scriptCharset ) {
				script.charset = s.scriptCharset;
			}
			script.src = s.url;

			
			if ( !jsonp ) {
				var done = false;

				
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						jQuery.handleSuccess( s, xhr, status, data );
						jQuery.handleComplete( s, xhr, status, data );

						
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
					}
				};
			}

			
			
			head.insertBefore( script, head.firstChild );

			
			return undefined;
		}

		var requestDone = false;

		
		var xhr = s.xhr();

		if ( !xhr ) {
			return;
		}

		
		
		if ( s.username ) {
			xhr.open(type, s.url, s.async, s.username, s.password);
		} else {
			xhr.open(type, s.url, s.async);
		}

		
		try {
			
			if ( (s.data != null && !noContent) || (origSettings && origSettings.contentType) ) {
				xhr.setRequestHeader("Content-Type", s.contentType);
			}

			
			if ( s.ifModified ) {
				if ( jQuery.lastModified[s.url] ) {
					xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
				}

				if ( jQuery.etag[s.url] ) {
					xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
				}
			}

			
			
			if ( !remote ) {
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}

			
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*; q=0.01" :
				s.accepts._default );
		} catch( headerError ) {}

		
		if ( s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false ) {
			
			if ( s.global && jQuery.active-- === 1 ) {
				jQuery.event.trigger( "ajaxStop" );
			}

			
			xhr.abort();
			return false;
		}

		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxSend", [xhr, s] );
		}

		
		var onreadystatechange = function( isTimeout ) {
			
			if ( !xhr || xhr.readyState === 0 || isTimeout === "abort" ) {
				
				
				if ( !requestDone ) {
					jQuery.handleComplete( s, xhr, status, data );
				}

				requestDone = true;
				if ( xhr ) {
					xhr.onreadystatechange = jQuery.noop;
				}

			
			} else if ( !requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout") ) {
				requestDone = true;
				xhr.onreadystatechange = jQuery.noop;

				status = isTimeout === "timeout" ?
					"timeout" :
					!jQuery.httpSuccess( xhr ) ?
						"error" :
						s.ifModified && jQuery.httpNotModified( xhr, s.url ) ?
							"notmodified" :
							"success";

				var errMsg;

				if ( status === "success" ) {
					
					try {
						
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch( parserError ) {
						status = "parsererror";
						errMsg = parserError;
					}
				}

				
				if ( status === "success" || status === "notmodified" ) {
					
					if ( !jsonp ) {
						jQuery.handleSuccess( s, xhr, status, data );
					}
				} else {
					jQuery.handleError( s, xhr, status, errMsg );
				}

				
				if ( !jsonp ) {
					jQuery.handleComplete( s, xhr, status, data );
				}

				if ( isTimeout === "timeout" ) {
					xhr.abort();
				}

				
				if ( s.async ) {
					xhr = null;
				}
			}
		};
		
		
		if (!isUnload)
			xhr.onreadystatechange = onreadystatechange;

		
		
		try {
			var oldAbort = xhr.abort;
			xhr.abort = function() {
				if ( xhr ) {
					
					
					
					Function.prototype.call.call( oldAbort, xhr );
				}

				onreadystatechange( "abort" );
			};
		} catch( abortError ) {}

		
		if ( s.async && s.timeout > 0 ) {
			setTimeout(function() {
				
				if ( xhr && !requestDone ) {
					onreadystatechange( "timeout" );
				}
			}, s.timeout);
		}

		
		try {
			xhr.send( noContent || s.data == null ? null : s.data );

		} catch( sendError ) {
			jQuery.handleError( s, xhr, null, sendError );

			
			jQuery.handleComplete( s, xhr, status, data );
		}

		
		if ( !s.async ) {
			onreadystatechange();
		}

		
		return xhr;
	},

	
	
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				
				value = jQuery.isFunction(value) ? value() : value;
				s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};
		
		
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}
		
		
		if ( jQuery.isArray(a) || a.jquery ) {
			
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
			
		} else {
			
			
			for ( var prefix in a ) {
				buildParams( prefix, a[prefix], traditional, add );
			}
		}

		
		return s.join("&").replace(r20, "+");
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray(obj) && obj.length ) {
		
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				
				add( prefix, v );

			} else {
				
				
				
				
				
				
				
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});
			
	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		if ( jQuery.isEmptyObject( obj ) ) {
			add( prefix, "" );

		
		} else {
			jQuery.each( obj, function( k, v ) {
				buildParams( prefix + "[" + k + "]", v, traditional, add );
			});
		}
					
	} else {
		
		add( prefix, obj );
	}
}



jQuery.extend({

	
	active: 0,

	
	lastModified: {},
	etag: {},

	handleError: function( s, xhr, status, e ) {
		
		if ( s.error ) {
			s.error.call( s.context, xhr, status, e );
		}

		
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxError", [xhr, s, e] );
		}
	},

	handleSuccess: function( s, xhr, status, data ) {
		
		if ( s.success ) {
			s.success.call( s.context, data, status, xhr );
		}

		
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxSuccess", [xhr, s] );
		}
	},

	handleComplete: function( s, xhr, status ) {
		
		if ( s.complete ) {
			s.complete.call( s.context, xhr, status );
		}

		
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxComplete", [xhr, s] );
		}

		
		if ( s.global && jQuery.active-- === 1 ) {
			jQuery.event.trigger( "ajaxStop" );
		}
	},
		
	triggerGlobal: function( s, type, args ) {
		(s.context && s.context.url == null ? jQuery(s.context) : jQuery.event).trigger(type, args);
	},

	
	httpSuccess: function( xhr ) {
		try {
			
			return !xhr.status && location.protocol === "file:" ||
				xhr.status >= 200 && xhr.status < 300 ||
				xhr.status === 304 || xhr.status === 1223;
		} catch(e) {}

		return false;
	},

	
	httpNotModified: function( xhr, url ) {
		var lastModified = xhr.getResponseHeader("Last-Modified"),
			etag = xhr.getResponseHeader("Etag");

		if ( lastModified ) {
			jQuery.lastModified[url] = lastModified;
		}

		if ( etag ) {
			jQuery.etag[url] = etag;
		}

		return xhr.status === 304;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type") || "",
			xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.nodeName === "parsererror" ) {
			jQuery.error( "parsererror" );
		}

		
		
		if ( s && s.dataFilter ) {
			data = s.dataFilter( data, type );
		}

		
		if ( typeof data === "string" ) {
			
			if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
				data = jQuery.parseJSON( data );

			
			} else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
				jQuery.globalEval( data );
			}
		}

		return data;
	}

});


if ( window.ActiveXObject ) {
	jQuery.ajaxSettings.xhr = function() {
		if ( window.location.protocol !== "file:" ) {
			try {
				return new window.XMLHttpRequest();
			} catch(xhrError) {}
		}

		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch(activeError) {}
	};
}


jQuery.support.ajax = !!jQuery.ajaxSettings.xhr();




var elemdisplay = {},
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)(.*)$/,
	timerId,
	fxAttrs = [
		
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		
		[ "opacity" ]
	];

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				
				
				if ( !jQuery.data(elem, "olddisplay") && display === "none" ) {
					display = elem.style.display = "";
				}

				
				
				
				if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
					jQuery.data(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			}

			
			
			for ( i = 0; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				if ( display === "" || display === "none" ) {
					elem.style.display = jQuery.data(elem, "olddisplay") || "";
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				var display = jQuery.css( this[i], "display" );

				if ( display !== "none" ) {
					jQuery.data( this[i], "olddisplay", display );
				}
			}

			
			
			for ( i = 0; i < j; i++ ) {
				this[i].style.display = "none";
			}

			return this;
		}
	},

	
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete );
		}

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			
			

			var opt = jQuery.extend({}, optall), p,
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				self = this;

			for ( p in prop ) {
				var name = jQuery.camelCase( p );

				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
					p = name;
				}

				if ( prop[p] === "hide" && hidden || prop[p] === "show" && !hidden ) {
					return opt.complete.call(this);
				}

				if ( isElement && ( p === "height" || p === "width" ) ) {
					
					
					
					
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					
					
					
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {
						if ( !jQuery.support.inlineBlockNeedsLayout ) {
							this.style.display = "inline-block";

						} else {
							var display = defaultDisplay(this.nodeName);

							
							
							if ( display === "inline" ) {
								this.style.display = "inline-block";

							} else {
								this.style.display = "inline";
								this.style.zoom = 1;
							}
						}
					}
				}

				if ( jQuery.isArray( prop[p] ) ) {
					
					(opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
					prop[p] = prop[p][0];
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function( name, val ) {
				var e = new jQuery.fx( self, opt, name );

				if ( rfxtypes.test(val) ) {
					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]( prop );

				} else {
					var parts = rfxnum.exec(val),
						start = e.cur() || 0;

					if ( parts ) {
						var end = parseFloat( parts[2] ),
							unit = parts[3] || "px";

						
						if ( unit !== "px" ) {
							jQuery.style( self, name, (end || 1) + unit);
							start = ((end || 1) / e.cur()) * start;
							jQuery.style( self, name, start + unit);
						}

						
						if ( parts[1] ) {
							end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			});

			
			return true;
		});
	},

	stop: function( clearQueue, gotoEnd ) {
		var timers = jQuery.timers;

		if ( clearQueue ) {
			this.queue([]);
		}

		this.each(function() {
			
			for ( var i = timers.length - 1; i >= 0; i-- ) {
				if ( timers[i].elem === this ) {
					if (gotoEnd) {
						
						timers[i](true);
					}

					timers.splice(i, 1);
				}
			}
		});

		
		if ( !gotoEnd ) {
			this.dequeue();
		}

		return this;
	}

});

function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}


jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		
		opt.old = opt.complete;
		opt.complete = function() {
			if ( opt.queue !== false ) {
				jQuery(this).dequeue();
			}
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig ) {
			options.orig = {};
		}
	}

});

jQuery.fx.prototype = {
	
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );
	},

	
	cur: function() {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var r = parseFloat( jQuery.css( this.elem, this.prop ) );
		return r && r > -10000 ? r : 0;
	},

	
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = jQuery.now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(fx.tick, fx.interval);
		}
	},

	
	show: function() {
		
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.show = true;

		
		
		
		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

		
		jQuery( this.elem ).show();
	},

	
	hide: function() {
		
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		
		this.custom(this.cur(), 0);
	},

	
	step: function( gotoEnd ) {
		var t = jQuery.now(), done = true;

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			for ( var i in this.options.curAnim ) {
				if ( this.options.curAnim[i] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				
				if ( this.options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {
					var elem = this.elem,
						options = this.options;

					jQuery.each( [ "", "X", "Y" ], function (index, value) {
						elem.style[ "overflow" + value ] = options.overflow[index];
					} );
				}

				
				if ( this.options.hide ) {
					jQuery(this.elem).hide();
				}

				
				if ( this.options.hide || this.options.show ) {
					for ( var p in this.options.curAnim ) {
						jQuery.style( this.elem, p, this.options.orig[p] );
					}
				}

				
				this.options.complete.call( this.elem );
			}

			return false;

		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			
			var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
			var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
			this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timers = jQuery.timers;

		for ( var i = 0; i < timers.length; i++ ) {
			if ( !timers[i]() ) {
				timers.splice(i--, 1);
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

function defaultDisplay( nodeName ) {
	if ( !elemdisplay[ nodeName ] ) {
		var elem = jQuery("<" + nodeName + ">").appendTo("body"),
			display = elem.css("display");

		elem.remove();

		if ( display === "none" || display === "" ) {
			display = "block";
		}

		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box || { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = (win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop ),
			scrollLeft = (win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft),
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		jQuery.offset.initialize();

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {
	initialize: function() {
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed";
		checkDiv.style.top = "20px";

		
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden";
		innerDiv.style.position = "relative";

		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		body = container = innerDiv = checkDiv = table = td = null;
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},
	
	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = (position === "absolute" && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1),
			props = {}, curPosition = {}, curTop, curLeft;

		
		if ( calculatePosition ) {
			curPosition = curElem.position();
		}

		curTop  = calculatePosition ? curPosition.top  : parseInt( curCSSTop,  10 ) || 0;
		curLeft = calculatePosition ? curPosition.left : parseInt( curCSSLeft, 10 ) || 0;

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if (options.top != null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left != null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}
		
		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({
	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		
		offsetParent = this.offsetParent(),

		
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		
		
		
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});



jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function(val) {
		var elem = this[0], win;
		
		if ( !elem ) {
			return null;
		}

		if ( val !== undefined ) {
			
			return this.each(function() {
				win = getWindow( this );

				if ( win ) {
					win.scrollTo(
						!i ? val : jQuery(win).scrollLeft(),
						 i ? val : jQuery(win).scrollTop()
					);

				} else {
					this[ method ] = val;
				}
			});
		} else {
			win = getWindow( elem );

			
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}





jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	
	jQuery.fn["inner" + name] = function() {
		return this[0] ?
			parseFloat( jQuery.css( this[0], type, "padding" ) ) :
			null;
	};

	
	jQuery.fn["outer" + name] = function( margin ) {
		return this[0] ?
			parseFloat( jQuery.css( this[0], type, margin ? "margin" : "border" ) ) :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}
		
		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			
			return elem.document.compatMode === "CSS1Compat" && elem.document.documentElement[ "client" + name ] ||
				elem.document.body[ "client" + name ];

		
		} else if ( elem.nodeType === 9 ) {
			
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNaN( ret ) ? orig : ret;

		
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});


})(window);



(zk = function (sel) {
	return jq(sel, zk).zk;
}).copy = function (dst, src, bu) {
	dst = dst || {};
	for (var p in src) {
		if (bu) bu[p] = dst[p];
		dst[p] = src[p];
	}
	return dst;
};

(function () {
	var _oid = 0,
		_statelesscnt = 0,
		_logmsg,
		_stamps = [],
		_t0 = jq.now();

	function newClass() {
		return function () {
			this.$oid = ++_oid;
			this.$init.apply(this, arguments);

			var ais = this._$ais;
			if (ais) {
				delete this._$ais;
				for (var j = ais.length; j--;)
					ais[j].call(this);
			}
		};
	}
	function defGet(nm) {
		return new Function('return this.' + nm + ';');
	}
	function defSet00(nm) {
		return function (v) {
			this[nm] = v;
			return this;
		};
	}
	function defSet01(nm, after) {
		return function (v, opts) {
			var o = this[nm];
			this[nm] = v;
			if (o !== v || (opts && opts.force))
				after.apply(this, arguments);
			return this;
		};
	}
	function defSet10(nm, before) {
		return function () {
			this[nm] = before.apply(this, arguments);
			return this;
		};
	}
	function defSet11(nm, before, after) {
		return function (v, opts) {
			var o = this[nm];
			this[nm] = v = before.apply(this, arguments);;
			if (o !== v || (opts && opts.force))
				after.apply(this, arguments);
			return this;
		};
	}

	function showprgbInit() {
		
		if (jq.isReady||zk.Page.contained.length)
			_showprgb(true, zk.pi ? 'z-initing': null);
		else
			setTimeout(showprgbInit, 10);
	}
	function showprgb() { 
		_showprgb();
	}
	function _showprgb(mask, icon) {
		if (zk.processing
		&& !jq("#zk_proc").length && !jq("#zk_showBusy").length)
			zUtl.progressbox("zk_proc", window.msgzk?msgzk.PLEASE_WAIT:'Processing...', mask, icon);
	}
	function wgt2s(w) {
		var s = w.widgetName;
		return w.id ? s + '$' + w.id: s + '#' + w.uuid + '$' + w.$oid;
	}
	function toLogMsg(ars, isDetailed) {
		var msg = [];
		for (var j = 0, len = ars.length; j < len; j++) {
			if (msg.length) msg.push(", ");
			var ar = ars[j];
			if (ar && (jq.isArray(ar) || ar.zk)) 
				msg.push('[' + toLogMsg(ar, isDetailed) + ']');
			else if (zk.Widget.isInstance(ar))
				msg.push(wgt2s(ar));
			else if (ar && ar.nodeType) {
				var w = zk.Widget.$(ar);
				if (w) msg.push(jq.nodeName(ar), (ar != w.$n() ? '#'+ar.id+'.'+ar.className:''), ':', wgt2s(w));
				else msg.push(jq.nodeName(ar), '#', ar.id);
			} else if (isDetailed && ar && (typeof ar == 'object') && !ar.nodeType) {
				var s = ['{\n'];
				for (var v in ar)
					s.push(v, ':', ar[v], ',\n');
				if (s[s.length - 1] == ',\n')
					s.pop();
				s.push('\n}');
				msg.push(s.join(''));
			} else if (typeof ar == 'function') {
				var s = '' + ar,
					m = s.indexOf('{'),
					k = m < 0 ? s.indexOf('\n'): -1;
				msg.push(s.substring(0, m > 0 ? m: k > 0 ? k: s.length));
			} else
				msg.push('' + ar);
		}
		return msg.join('');
	}
	function doLog() {
		if (_logmsg) {
			var console = jq("#zk_log");
			if (!console.length) {
				jq(document.body).append(
	'<div id="zk_logbox" class="z-log">'
	+'<button onclick="jq(\'#zk_logbox\').remove()">X</button><br/>'
	+'<textarea id="zk_log" rows="10"></textarea></div>');
				console = jq("#zk_log");
			}
			console = console[0];
			console.value += _logmsg;
			console.scrollTop = console.scrollHeight;
			_logmsg = null;
		}
	}

	function _stampout() {
		if (zk.mounting)
			return zk.afterMount(_stampout);
		zk.stamp('ending');
		zk.stamp();
	}

	
	function _overrideSub(dstpt, nm, oldfn, newfn) {
		for (var sub = dstpt._$subs, j = sub ? sub.length: 0; --j >= 0;) {
			var subpt = sub[j];
			if (subpt[nm] === oldfn) {
				subpt[nm] = newfn;
				_overrideSub(subpt, nm, oldfn, newfn); 
			}
		}
	}
	

zk.copy(zk, {
	
	procDelay: 900,
	
	tipDelay: 800,
	
	resendDelay: -1,
	
	clickPointer: [0, 0],
	
	currentPointer: [0, 0],
	
	
	
	

	
	loading: 0,
	
	
	
	
	
	
	
	
	
	busy: 0,
	
	appName: "ZK",

	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	

	
	
	
	

	
	
	
	

	
	
	

	
	cut: function (props, nm) {
		var v;
		if (props) {
			v = props[nm];
			delete props[nm];
		}
		return v;
	},

	
	$package: function (name, end, wv) { 
		for (var j = 0, ref = window;;) {
			var k = name.indexOf('.', j),
				nm = k >= 0 ? name.substring(j, k): name.substring(j);
			var nxt = ref[nm], newpkg;
			if (newpkg = !nxt) nxt = ref[nm] = {};
			if (k < 0) {
				if (newpkg && end !== false) zk.setLoaded(name);
					
					
				if (wv) nxt.$wv = true; 
				return nxt;
			}
			ref = nxt;
			j = k + 1;
		}
	},
	
	
	$import: function (name, fn) {
		for (var j = 0, ref = window;;) {
			var k = name.indexOf('.', j),
				nm = k >= 0 ? name.substring(j, k): name.substring(j);
			var nxt = ref[nm];
			if (k < 0 || !nxt) {
				if (fn)
					if (nxt) fn(nxt);
					else
						zk.load(name.substring(0, name.lastIndexOf('.')),
							function () {fn(zk.$import(name));});
				return nxt;
			}
			ref = nxt;
			j = k + 1;
		}
	},

	
	$extends: function (superclass, members, staticMembers) {
		if (!superclass)
			throw 'unknown superclass';

		var jclass = newClass();

		var thispt = jclass.prototype,
			superpt = superclass.prototype,
			define = members['$define'];
		delete members['$define'];
		zk.copy(thispt, superpt); 
		zk.define(jclass, define);
		zk.copy(thispt, members);

		for (var p in superclass) 
			if (p != 'prototype')
				jclass[p] = superclass[p];

		zk.copy(jclass, staticMembers);

		thispt.$class = jclass;
		thispt._$super = superpt;
		thispt._$subs = [];
		superpt._$subs.push(thispt);
			
		jclass.$class = zk.Class;
		jclass.superclass = superclass;

		return jclass;
	},

	
	$default: function (opts, defaults) {
		opts = opts || {};
		for (var p in defaults)
			if (opts[p] === undefined)
				opts[p] = defaults[p];
		return opts;
	},

	
	
	
	override: function (dst, backup, src) {
		switch (typeof backup) {
		case "function":
			var old = dst;
			dst = backup;
			return old;
		case "string":
			dst['$' + backup] = dst[backup];
			dst[backup] = src;
			
		}

		for (var nm in src)
			_overrideSub(dst, nm, backup[nm] = dst[nm], dst[nm] = src[nm]);
		return dst;
	},

	
	define: function (klass, props) {
		for (var nm in props) {
			var nm1 = '_' + nm,
				nm2 = nm.charAt(0).toUpperCase() + nm.substring(1),
				pt = klass.prototype,
				after = props[nm], before = null;
			if (jq.isArray(after)) {
				before = after.length ? after[0]: null;
				after = after.length > 1 ? after[1]: null;
			}
			pt['set' + nm2] = before ?
				after ? defSet11(nm1, before, after): defSet10(nm1, before):
				after ? defSet01(nm1, after): defSet00(nm1);
			pt['get' + nm2] = pt['is' + nm2] = defGet(nm1);
		}
		return klass;
	},

	
	$void: function () {},

	
	parseInt: function (v, b) {
		return v && !isNaN(v = parseInt(v, b || 10)) ? v: 0;
	},
	
	parseFloat: function (v) {
		return v && !isNaN(v = parseFloat(v)) ? v: 0;
	},

	
	
	set: function (o, name, value, extra) {
		if (typeof name == "string") {
			zk._set(o, name, value, extra);
		} else 
			for (var j = 0, len = value.length, m, n, v; j < len;) {
				n = value[j++];
				m = name['get' + n.charAt(0).toUpperCase() + n.substring(1)];
				if (!extra || m || name[n] !== undefined) 
					zk._set(o, n, m ? m.call(name): name[n]);
			}
		return o;
	},
	_set: function (o, name, value, extra) { 
		zk._set2(o,
			o['set' + name.charAt(0).toUpperCase() + name.substring(1)],
			name, value, extra);
	},
	_set2: function (o, mtd, name, value, extra) { 
		if (mtd) {
			if (extra !== undefined)
				mtd.call(o, value, extra);
			else
				mtd.call(o, value);
		} else
			o[name] = value;
	},
	
	get: function (o, name) {
		var nm = name.charAt(0).toUpperCase() + name.substring(1);
			m = o['get' + nm];
		if (m) return m.call(o);
		m = o['is' + nm];
		if (m) return m.call(o);
		return o[name];
	},

	
	
	startProcessing: function (timeout) {
		zk.processing = true;
		setTimeout(jq.isReady ? showprgb: showprgbInit, timeout > 0 ? timeout: 0);
	},
	
	endProcessing: function () {
		zk.processing = false;
		zUtl.destroyProgressbox("zk_proc");
	},

	
	disableESC: function () {
		++zk._noESC;
	},
	
	enableESC: function () {
		--zk._noESC;
	},
	_noESC: 0, 

	
	
	error: function (msg) {
		_zErb.push(msg);
	},
	
	errorDismiss: function () {
		_zErb.remove();
	},
	
	log: function (detailed) {
		var msg = toLogMsg(
			(detailed !== zk) ? arguments :
				(function (args) {
					var a = [];
					for (var j = args.length; --j > 0;)
						a.unshift(args[j]);
					return a;
				})(arguments)
			, (detailed === zk)
		);
		_logmsg = (_logmsg ? _logmsg + msg: msg) + '\n';
		setTimeout(function(){jq(doLog);}, 300);
	},
	
	
	stamp: function (nm, noAutoLog) {
		if (nm) {
			if (!noAutoLog && !_stamps.length)
				setTimeout(_stampout, 0);
			_stamps.push({n: nm, t: jq.now()});
		} else if (_stamps.length) {
			var t0 = _t0;
			for (var inf; (inf = _stamps.shift());) {
				zk.log(inf.n + ': ' + (inf.t - _t0));
				_t0 = inf.t;
			}
			zk.log("total: " + (_t0 - t0));
		}
	},

	
	ajaxURI: function (uri, opts) {
		var ctx = zk.Desktop.$(opts?opts.desktop:null),
			au = opts && opts.au;
		ctx = (ctx ? ctx: zk)[au ? 'updateURI': 'contextURI'];
		uri = uri || '';

		var abs = uri.charAt(0) == '/';
		if (au && !abs) {
			abs = true;
			if (uri)
				uri = '/' + uri; 
		}

		var j = ctx.lastIndexOf(';'), k = ctx.lastIndexOf('?');
		if (j < 0 && k < 0) return abs ? ctx + uri: uri;

		if (k >= 0 && (j < 0 || k < j)) j = k;
		var prefix = abs ? ctx.substring(0, j): '';

		if (opts && opts.ignoreSession)
			return prefix + uri;

		var suffix = ctx.substring(j),
			l = uri.indexOf('?');
		return l >= 0 ?
			k >= 0 ?
			  prefix + uri.substring(0, l) + suffix + '&' + uri.substring(l+1):
			  prefix + uri.substring(0, l) + suffix + uri.substring(l):
			prefix + uri + suffix;
	},
	
	stateless: function (dtid, contextURI, updateURI, reqURI) {
		var Desktop = zk.Desktop, dt;
		dtid = dtid || ('z_auto' + _statelesscnt++);
		dt = Desktop.all[dtid];
		if (dt && !dt.stateless) throw "Desktop conflict";
		if (zk.updateURI == null)
			zk.updateURI = updateURI;
		if (zk.contextURI == null) 
			zk.contextURI = contextURI;
		return dt || new Desktop(dtid, contextURI, updateURI, reqURI, true);
	}
});


(function () {
	function _ver(ver) {
		return parseFloat(ver) || ver;
	}
	var browser = jq.browser,
		agent = zk.agent = navigator.userAgent.toLowerCase();
	zk.safari = browser.safari && _ver(browser.version);
	zk.opera = browser.opera && _ver(browser.version);
	zk.gecko = browser.mozilla && _ver(browser.version);
	zk.ff = zk.gecko && ((zk.ff = agent.indexOf("firefox/")) > 0) && _ver(agent.substring(zk.ff + 8));
	zk.ios = zk.safari && (agent.indexOf("iphone") >= 0 || agent.indexOf("ipad") >= 0);
	zk.android = zk.safari && (agent.indexOf('android') >= 0);
	zk.mobile = zk.ios || zk.android;
	var bodycls;
	if (zk.gecko) {
		zk.css3 = zk.gecko3 = zk.ff >= 3 || zk.gecko >= 1.9; 
		zk.gecko2_ = !zk.gecko3;
		bodycls = 'gecko gecko' + Math.floor(zk.ff);
	} else if (zk.opera) {
		bodycls = 'opera';
		zk.css3 = zk.opera >= 10.5;
	} else {
		zk.iex = browser.msie && _ver(browser.version); 
		if (zk.iex) {
			if ((zk.ie = document.documentMode||zk.iex) < 6) 
				zk.ie = 6; 
			zk.ie7 = zk.ie >= 7; 
			zk.ie8 = zk.ie >= 8; 
			zk.css3 = zk.ie9 = zk.ie >= 9; 
			zk.ie6_ = zk.ie < 7;
			zk.ie7_ = zk.ie == 7;
			zk.ie8_ = zk.ie == 8;
			bodycls = 'ie ie' + Math.floor(zk.ie);
		} else {
			if (zk.safari)
				bodycls = 'safari safari' + Math.floor(zk.safari);
			zk.css3 = true;
		}
	}
	if ((zk.air = agent.indexOf("adobeair") >= 0) && zk.safari)
		bodycls = (bodycls || '') + ' air';

	if (bodycls)
		jq(function () {
			var n = document.body,
				cn = n.className;
			if (cn) cn += ' ';
			n.className = cn + bodycls;
		});
})();


	function getProxy(o, f) { 
		return function () {
				return f.apply(o, arguments);
			};
	}
zk.Object = function () {};

zk.Object.prototype = {
	
	$init: zk.$void,
	
	afterInit: function (f) {
		(this._$ais = this._$ais || []).unshift(f); 
	},
	
	$class: zk.Object,
	
	
	
	$instanceof: function () {
		for (var j = arguments.length, cls; j--;)
			if (cls = arguments[j]) {
				var c = this.$class;
				if (c == zk.Class)
					return this == zk.Object || this == zk.Class; 
				for (; c; c = c.superclass)
					if (c == cls)
						return true;
			}
		return false;
	},
	
	
	$super: function (arg0, arg1) {
		var args = [], bCls = typeof arg0 != "string";
		for (var j = arguments.length, end = bCls ? 1: 0; --j > end;)
			args.unshift(arguments[j]);
		return bCls ? this.$supers(arg0, arg1, args): this.$supers(arg0, args);
	},
	
	
	$supers: function (nm, args, argx) {
		var supers = this._$supers;
		if (!supers) supers = this._$supers = {};

		if (typeof nm != "string") { 
			var old = supers[args], p; 
			if (!(p = nm.prototype._$super) || !(nm = p[args])) 
				throw args + " not in superclass"; 

			supers[args] = p;
			try {
				return nm.apply(this, argx);
			} finally {
				supers[args] = old; 
			}
		}

		
		var old = supers[nm], m, p, oldmtd;
		if (old) {
			oldmtd = old[nm];
			p = old;
		} else {
			oldmtd = this[nm];
			p = this;
		}
		while (p = p._$super)
			if (oldmtd != p[nm]) {
				m = p[nm];
				if (m) supers[nm] = p;
				break;
			}

		if (!m)
			throw nm + " not in superclass";

		try {
			return m.apply(this, args);
		} finally {
			supers[nm] = old; 
		}
	},
	_$subs: [],

	
	proxy: function (f) {
		var fps = this._$proxies, fp;
		if (!fps) this._$proxies = fps = {};
		else if (fp = fps[f]) return fp;
		return fps[f] = getProxy(this, f);
	}
};

zk.Class = function () {}
zk.Class.superclass = zk.Object;
zk.Class.prototype.$class = zk.Class;

_zkf = {
	
	$class: zk.Class,
	
	isInstance: function (o) {
		return o && o.$instanceof && o.$instanceof(this);
	},
	
	isAssignableFrom: function (cls) {
		for (; cls; cls = cls.superclass)
			if (this == cls)
				return true;
		return false;
	},
	$instanceof: zk.Object.prototype.$instanceof
};
zk.copy(zk.Class, _zkf);
zk.copy(zk.Object, _zkf);


var _erbx, _errcnt = 0;

_zErb = zk.$extends(zk.Object, {
	$init: function (msg) {
		var id = "zk_err",
			$id = "#" + id,
			
 			html = '<div class="z-error" id="' + id + '"><table cellpadding="2" cellspacing="2" width="100%">'
 					+ '<tr valign="top"><td class="msgcnt" colspan="3"><div class="msgs">'+ zUtl.encodeXML(msg, {multiline : true}) + '</div></td></tr>'
 					+ '<tr id="'+ id + '-p"><td class="errnum" align="left">'+ ++_errcnt+ ' Errors</td><td align="right"><div >';
		if (!zk.zkuery)
			html += '<div class="btn redraw" onclick="_zErb.redraw()"></div>';
		html += '<div class="btn close" onclick="_zErb.remove()"></div></div></td></tr></table></div>';
		jq(document.body).append(html);
		_erbx = this;
		this.id = id;
		try {
			var n;
			this.dg = new zk.Draggable(null, n = jq($id)[0], {
				handle: jq($id + '-p')[0], zIndex: n.style.zIndex,
				starteffect: zk.$void, starteffect: zk.$void,
				endeffect: zk.$void});
		} catch (e) {
		}
		jq("#" + id).slideDown(1000);
	},
	destroy: function () {
		_erbx = null;
		_errcnt = 0;
		if (this.dg) this.dg.destroy();
		jq('#' + this.id).remove();
	}
},{
	redraw: function () {
		zk.errorDismiss();
		zAu.send(new zk.Event(null, 'redraw'));
	},
	push: function (msg) {
		if (!_erbx)
			return new _zErb(msg);

		var id = _erbx.id;
		jq("#" + id + " .errnum").html(++_errcnt + " Errors");
		jq("#" + id + " .msgs").prepend('<div class="newmsg">' + msg + "</hr></div>");
		jq("#" + id + " .newmsg")
			.removeClass("newmsg").addClass("msg").slideDown(600)
	},
	remove: function () {
		if (_erbx) _erbx.destroy();
	}
});
})();


zk.copy(String.prototype, {
	startsWith: function (prefix) {
		return this.substring(0,prefix.length) == prefix;
	},
	endsWith: function (suffix) {
		return this.substring(this.length-suffix.length) == suffix;
	},
	trim: function () {
		return jq.trim(this);
	},
	$camel: function() {
		var parts = this.split('-'), len = parts.length;
		if (len == 1) return parts[0];

		var camelized = this.charAt(0) == '-' ?
			parts[0].charAt(0).toUpperCase() + parts[0].substring(1): parts[0];

		for (var i = 1; i < len; i++)
			camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
		return camelized;
	},
	$inc: function (diff) {
		return String.fromCharCode(this.charCodeAt(0) + diff)
	},
	$sub: function (cc) {
		return this.charCodeAt(0) - cc.charCodeAt(0);
	}
});

zk.copy(Array.prototype, {
	$indexOf: function (o) {
		return jq.inArray(o, this);
	},
	$contains: function (o) {
		return this.$indexOf(o) >= 0;
	},
	$equals: function (o) {
		if (jq.isArray(o) && o.length == this.length) {
			for (var j = this.length; j--;) {
				var e = this[j];
				if (e != o[j] && (!jq.isArray(e) || !e.$equals(o[j])))
					return false;
			}
			return true;
		}
	},
	$remove: function (o) {
		for (var ary = jq.isArray(o), j = 0, tl = this.length; j < tl; ++j) {
			if (o == this[j] || (ary && o.$equals(this[j]))) {
				this.splice(j, 1);
				return true;
			}
		}
		return false;
	},
	$addAll: function (o) {
		return this.push.apply(this, o);
	},
	$clone: function() {
		return [].concat(this);
	}
});
if (!Array.prototype.indexOf)
	Array.prototype.indexOf = function (o) {
		for (var i = 0, len = this.length; i < len; i++)
			if (this[i] == o) return i;
		return -1;
	};


zk.light='1.0.0-RC';zk.spaceless=true;zAu={};

zjq = function (jq) { 
	this.jq = jq;
};
(function (document, window) {
	var _jq = {}, 
		
		_txtStyles = [
			'font-family', 'font-size', 'font-weight', 'font-style',
			'letter-spacing', 'line-height', 'text-align', 'text-decoration',
			'text-indent', 'text-shadow', 'text-transform', 'text-overflow',
			'direction', 'word-spacing', 'white-space'],
		_txtStylesCamel, _txtSizDiv, 
		_txtStyles2 = ["color", "background-color", "background"],
		_zsyncs = [],
		_pendzsync = 0,
		_vpId = 0, 
		_sbwDiv; 

	function _elmOfWgt(id, ctx) {
		var w = ctx && ctx !== zk ? zk.Widget.$(ctx): null, w2;
		return (w2=w||zk.Desktop.sync()) && (w2=w2.$f(id, !w)) ? w2.$n(): null;
	}
	function _ofsParent(el) {
		if (el.offsetParent) return el.offsetParent;
		if (el == document.body) return el;

		while ((el = el.parentNode) && el != document.body)
			if (el.style && jq(el).css('position') != 'static') 
				return el;

		return document.body;
	}
	function _zsync(org) {
		if (--_pendzsync <= 0)
			for (var j = _zsyncs.length; j--;)
				_zsyncs[j].zsync(org);
	}
	function _focus(n) {
		zk.afterAnimate(function () {
			try {
				n.focus();
				var w = zk.Widget.$(n);
				if (w) zk.currentFocus = w;
			} catch (e) {
			}
		}, -1); 
	}
	function _select(n) {
		try {
			n.select();
		} catch (e) {
		}
	}

	function _submit() {
		if (this.submit) {
			jq.Event.fire(this, 'submit');
			this.submit();
		}
	}

	function _dissel() {
		this.style.MozUserSelect = "none";
	}
	function _ensel() {
		this.style.MozUserSelect = "";
	}

	function _scrlIntoView(outer, inner, info) {
		if (outer && inner) {
			var ooft = zk(outer).revisedOffset(),
				ioft = info ? info.oft : zk(inner).revisedOffset(),		 
				top = ioft[1] - ooft[1] +
						(outer == (zk.safari ? document.body : document.body.parentNode)
								? 0 : outer.scrollTop),
				ih = info ? info.h : inner.offsetHeight,
				bottom = top + ih,
				updated;
			
			if ( outer.scrollTop > top) {
				outer.scrollTop = top;
				updated = true;
			} else if (bottom > outer.clientHeight + outer.scrollTop) {
				outer.scrollTop = !info ? bottom : bottom - (outer.clientHeight + (inner.parentNode == outer ? 0 : outer.scrollTop));
				updated = true;
			}
			if (updated || !info) {
				if (!info)
					info = {
						oft: ioft,
						h: inner.offsetHeight,
						el: inner
					};
				else info.oft = zk(info.el).revisedOffset();
			}
			outer.scrollTop = outer.scrollTop;
			return info; 
		}
	}

	function _cmOffset(el) {
		var t = 0, l = 0, operaBug;
		
		if (zk.gecko) {
			var p = el.parentNode;
			while (p && p != document.body && p.nodeType === 1) {
				var $p = jq(p),
					style = $p.css("position");
				if (style == "relative" || style == "absolute") {
					t += zk.parseInt($p.css("border-top-width"));
					l += zk.parseInt($p.css("border-left-width"));
				}
				p = p.offsetParent;
			}
		}

		do {
			
			var $el = jq(el);
			if ($el.css("position") == 'fixed') {
				t += jq.innerY() + el.offsetTop;
				l += jq.innerX() + el.offsetLeft;
				break;
			} else {
				
				
				if (zk.opera) {
					if (operaBug && jq.nodeName(el, 'div') && el.scrollTop != 0)
						t += el.scrollTop || 0;
					operaBug = jq.nodeName(el, 'span', 'input');
				}
				t += el.offsetTop || 0;
				l += el.offsetLeft || 0;
				
				el = zk.gecko && el != document.body ?
					_ofsParent(el): el.offsetParent;
			}
		} while (el);
		return [l, t];
	}
	function _posOffset(el) {
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];

		var t = 0, l = 0;
		do {
			t += el.offsetTop  || 0;
			l += el.offsetLeft || 0;
			
			el = zk.gecko && el != document.body ?
				_ofsParent(el): el.offsetParent;
			if (el) {
				if(jq.nodeName(el, "body")) break;
				var p = jq(el).css('position');
				if (p == 'relative' || p == 'absolute') break;
			}
		} while (el);
		return [l, t];
	}
	function _addOfsToDim($this, dim, revised) {
		if (revised) {
			var ofs = $this.revisedOffset();
			dim.left = ofs[0];
			dim.top = ofs[1];
		} else {
			dim.left = $this.offsetLeft();
			dim.top = $this.offsetTop();
		}
		return dim;
	}

	
	var _rdcss = [];
	function _redoCSS0() {
		if (_rdcss.length) {
			for (var el; el = _rdcss.pop();)
				try {
					zjq._fixCSS(el);
				} catch (e) {
				}
		
			
			setTimeout(_redoCSS0);
		}
	}

zk.copy(zjq, {
	_fixCSS: function (el) { 
		el.className += ' ';
		if (el.offsetHeight)
			;
		el.className.trim();
	},
	_cleanVisi: function (n) { 
		n.style.visibility = "inherit";
	},
	_fixClick: zk.$void, 
	_fixedVParent: zk.$void,
	_fixIframe: zk.$void,
	_useQS: zk.$void, 

	
	src0: "", 
	eventTypes: {
		zmousedown: 'mousedown',
		zmouseup: 'mouseup',
		zmousemove: 'mousemove',
		zdblclick: 'dblclick',
		zcontextmenu: 'contextmenu'
	}
});
jq.fn.zbind = jq.fn.bind;
jq.fn.zunbind = jq.fn.unbind;

zk.override(jq.fn, _jq,  {
	
	

	init: function (sel, ctx) {
		if (ctx === zk) {
			if (typeof sel == 'string'
			&& zUtl.isChar(sel.charAt(0), {digit:1,upper:1,lower:1,'_':1})) {
				var el = document.getElementById(sel);
				if (!el || el.id == sel) {
					var ret = jq(el || []);
					ret.context = document;
					ret.selector = '#' + sel;
					ret.zk = new zjq(ret);
					return ret;
				}
				sel = '#' + sel;
			}
			ctx = null;
		}
		if (zk.Widget && zk.Widget.isInstance(sel))
			sel = sel.$n() || '#' + sel.uuid;
		var ret = _jq.init.call(this, sel, ctx);
		ret.zk = new zjq(ret);
		return ret;
	},
	
	replaceWith: function (w, desktop, skipper) {
		if (!zk.Widget.isInstance(w))
			return _jq.replaceWith.apply(this, arguments);

		var n = this[0];
		if (n) w.replaceHTML(n, desktop, skipper);
		return this;
	},
	bind: function(type, data, fn) {
		return this.zbind(zjq.eventTypes[type] || type, data, fn);
	},
	unbind: function(type, fn){
		return this.zunbind(zjq.eventTypes[type] || type, fn);
	}
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
});
jq.fn.init.prototype = jq.fn;

jq.each(['remove', 'empty', 'show', 'hide'], function (i, nm) {
	_jq[nm] = jq.fn[nm];
	jq.fn[nm] = function () {
		return !this.selector && this[0] === document ? this: _jq[nm].apply(this, arguments);
	};
});
jq.each(['before','after','append','prepend'], function (i, nm) {
	_jq[nm] = jq.fn[nm];
	jq.fn[nm] = function (w, desktop) {
		if (!zk.Widget.isInstance(w))
			return _jq[nm].apply(this, arguments);

		if (!this.length) return this;
		if (!zk.Desktop._ndt) zk.stateless();

		var ret = _jq[nm].call(this, w.redrawHTML_());
		if (!w.z_rod) {
			w.bind(desktop);
			zWatch.fireDown('beforeSize', w);
			zWatch.fireDown('onSize', w);
		}
		return ret;
	};
});


zjq.prototype = {
	
	

	
	cleanVisibility: function () {
		return this.jq.each(function () {
			zjq._cleanVisi(this);
		});
	},
	
	
	isVisible: function (strict) {
		var n = this.jq[0];
		return n && (!n.style || (n.style.display != "none" && (!strict || n.style.visibility != "hidden")));
	},
	
	isRealVisible: function (strict) {
		var n = this.jq[0];
		return n && this.isVisible(strict) && (n.offsetWidth > 0 || n.offsetHeight > 0
		|| (!n.firstChild 
			&& (!(n=n.parentNode) || n==document.body || zk(n).isRealVisible(strict))));
			
	},

	
	scrollTo: function () {
		if (this.jq.length) {
			var pos = this.cmOffset();
			scrollTo(pos[0], pos[1]);
		}
		return this;
	},
	
	scrollIntoView: function (parent) {
		var n = this.jq[0];
		if (n) {
			parent = parent || document.body.parentNode;
			for (var p = n, c; (p = p.parentNode) && n != parent; n = p)
				c = _scrlIntoView(p, n, c);
		}
		return this;
	},

	
	isOverlapped: function (el) {
		var n = this.jq[0];
		if (n)
			return jq.isOverlapped(
				this.cmOffset(), [n.offsetWidth, n.offsetHeight],
				zk(el).cmOffset(), [el.offsetWidth, el.offsetHeight]);
	},

	
	sumStyles: function (areas, styles) {
		var val = 0;
		for (var i = 0, len = areas.length, $jq = this.jq; i < len; i++){
			 var w = Math.round(zk.parseFloat($jq.css(styles[areas.charAt(i)])));
			 if (!isNaN(w)) val += w;
		}
		return val;
	},

	
	setOffsetHeight: function (hgh) {
		var $jq = this.jq;
		hgh -= this.padBorderHeight()
			+ zk.parseInt($jq.css("margin-top"))
			+ zk.parseInt($jq.css("margin-bottom"));
		$jq[0].style.height = jq.px0(hgh);
		return this;
	},

	
	
	revisedOffset: function (ofs) {
		var el = this.jq[0];
		if(!ofs) {
			if (el.getBoundingClientRect){ 
				var elst, oldvisi;
				if (zk.ie && !zk.ie8 && el.style.display == "none") {
				
					oldvisi = (elst = el.style).visibility;
					elst.visibility = "hidden";
					elst.display = "";
				}

				var b = el.getBoundingClientRect();
				b = [b.left + jq.innerX() - el.ownerDocument.documentElement.clientLeft,
					b.top + jq.innerY() - el.ownerDocument.documentElement.clientTop];

				if (elst) {
					elst.display = "none";
					elst.visibility = oldvisi;
				}
				return b;
				
				
				
				
				
				
			}
			ofs = this.cmOffset();
		}
		var scrolls = zk(el.parentNode).scrollOffset();
		scrolls[0] -= jq.innerX(); scrolls[1] -= jq.innerY();
		return [ofs[0] - scrolls[0], ofs[1] - scrolls[1]];
	},
	
	revisedWidth: function (size, excludeMargin) {
		size -= this.padBorderWidth();
		if (size > 0 && excludeMargin)
			size -= this.sumStyles("lr", jq.margins);
		return size < 0 ? 0: size;
	},
	
	revisedHeight: function (size, excludeMargin) {
		size -= this.padBorderHeight();
		if (size > 0 && excludeMargin)
			size -= this.sumStyles("tb", jq.margins);
		return size < 0 ? 0: size;
	},
	
	borderWidth: function () {
		return this.sumStyles("lr", jq.borders);
	},
	
	borderHeight: function () {
		return this.sumStyles("tb", jq.borders);
	},
	
	paddingWidth: function () {
		return this.sumStyles("lr", jq.paddings);
	},
	
	paddingHeight: function () {
		return this.sumStyles("tb", jq.paddings);
	},
	
	padBorderWidth: function () {
		return this.borderWidth() + this.paddingWidth();
	},
	
	padBorderHeight: function () {
		return this.borderHeight() + this.paddingHeight();
	},
	 
	vflexHeight: function () {
		var el = this.jq[0],
			hgh = el.parentNode.clientHeight;
		if (zk.ie6_) { 
			var ref = el.parentNode,
				h = ref.style.height;
			if (h && h.endsWith("px")) {
				h = zk(ref).revisedHeight(zk.parseInt(h));
				if (h && h < hgh) hgh = h;
			}
		}

		for (var p = el; p = p.previousSibling;)
			if (p.offsetHeight && zk(p).isVisible())
				hgh -= p.offsetHeight; 
		for (var p = el; p = p.nextSibling;)
			if (p.offsetHeight && zk(p).isVisible())
				hgh -= p.offsetHeight; 
		return hgh;
	},
	
	cellIndex: function () {
		var cell = this.jq[0];
		return cell ? cell.cellIndex: 0;
	},
	
	ncols: function (visibleOnly) {
		var row = this.jq[0],
			cnt = 0, cells;
		if (row && (cells = row.cells))
			for (var j = 0, cl = cells.length; j < cl; ++j) {
				var cell = cells[j];
				if (!visibleOnly || zk(cell).isVisible()) {
					var span = cell.colSpan;
					if (span >= 1) cnt += span;
					else ++cnt;
				}
			}
		return cnt;
	},
	
	toStyleOffset: function (x, y) {
		var el = this.jq[0],
			oldx = el.style.left, oldy = el.style.top,
			resetFirst = zk.opera || zk.air || zk.ie8;
		
		
		
		
		
		
		if (resetFirst || el.style.left == "" || el.style.left == "auto")
			el.style.left = "0";
		if (resetFirst || el.style.top == "" || el.style.top == "auto")
			el.style.top = "0";

		var ofs1 = this.cmOffset(),
			x2 = zk.parseInt(el.style.left),
			y2 = zk.parseInt(el.style.top);
		ofs1 = [x - ofs1[0] + x2, y  - ofs1[1] + y2];

		el.style.left = oldx; el.style.top = oldy; 
		return ofs1;
	},
	
	center: function (flags) {
		var el = this.jq[0],
			wdgap = this.offsetWidth(),
			hghgap = this.offsetHeight();

		if ((!wdgap || !hghgap) && !this.isVisible()) {
			el.style.left = el.style.top = "-10000px"; 
			el.style.display = "block"; 
			wdgap = this.offsetWidth();
			hghgap = this.offsetHeight(),
			el.style.display = "none"; 
		}

		var left = jq.innerX(), top = jq.innerY();
		var x, y, skipx, skipy;

		wdgap = jq.innerWidth() - wdgap;
		if (!flags) x = left + wdgap / 2;
		else if (flags.indexOf("left") >= 0) x = left;
		else if (flags.indexOf("right") >= 0) x = left + wdgap - 1; 
		else if (flags.indexOf("center") >= 0) x = left + wdgap / 2;
		else {
			x = 0; skipx = true;
		}

		hghgap = jq.innerHeight() - hghgap;
		if (!flags) y = top + hghgap / 2;
		else if (flags.indexOf("top") >= 0) y = top;
		else if (flags.indexOf("bottom") >= 0) y = top + hghgap - 1; 
		else if (flags.indexOf("center") >= 0) y = top + hghgap / 2;
		else {
			y = 0; skipy = true;
		}

		if (x < left) x = left;
		if (y < top) y = top;

		var ofs = this.toStyleOffset(x, y);

		if (!skipx) el.style.left = jq.px(ofs[0]);
		if (!skipy) el.style.top =  jq.px(ofs[1]);
		return this;
	},
	
	
	position: function (dim, where, opts) {
		where = where || "overlap";
		if (dim.nodeType) 
			dim = zk(dim).dimension(true);
		var x = dim.left, y = dim.top,
			wd = this.dimension(), hgh = wd.height; 
		wd = wd.width;
		
		
		switch(where) {
		case "before_start":
			y -= hgh;
			break;
		case "before_end":
			y -= hgh;
			x += dim.width - wd;
			break;
		case "after_start":
			y += dim.height;
			break;
		case "after_end":
			y += dim.height;
			x += dim.width - wd;
			break;
		case "start_before":
			x -= wd;
			break;
		case "start_after":
			x -= wd;
			y += dim.height - hgh;
			break;
		case "end_before":
			x += dim.width;
			break;
		case "end_after":
			x += dim.width;
			y += dim.height - hgh;
			break;
		case "at_pointer":
			var offset = zk.currentPointer;
			x = offset[0];
			y = offset[1];
			break;
		case "after_pointer":
			var offset = zk.currentPointer;
			x = offset[0];
			y = offset[1] + 20;
			break;
		case "overlap_end":
			x += dim.width - wd;
			break; 
		case "overlap_before":
			y += dim.height - hgh;
			break; 
		case "overlap_after":
			x += dim.width - wd;
			y += dim.height - hgh;
			break;
		default: 
			
		}
		
		if (!opts || !opts.overflow) {
			var scX = jq.innerX(),
				scY = jq.innerY(),
				scMaxX = scX + jq.innerWidth(),
				scMaxY = scY + jq.innerHeight();
			
			if (x + wd > scMaxX) x = scMaxX - wd;
			if (x < scX) x = scX;
			if (y + hgh > scMaxY) y = scMaxY - hgh;
			if (y < scY) y = scY;
		}
		
		
		
		if (opts && opts.dodgeRef) {
			var dl = dim.left, dt = dim.top,
				dr = dl + dim.width, db = dt + dim.height;
			
			if (x + wd > dl && x < dr && y + hgh > dt && y < db) {
				if (opts.overflow) {
					
					x = dr;
				} else {
					var scX = jq.innerX(),
						scMaxX = scX + jq.innerWidth(),
						spr = scMaxX - dr,
						spl = dl - scX;
					
					
					if (spr >= wd || spr >= spl)
						x = Math.min(dr, scMaxX - wd);
					else
						x = Math.max(dl - wd, scX);
				}
			}
		}

		var el = this.jq[0],
			ofs = this.toStyleOffset(x, y);
		el.style.left = jq.px(ofs[0]);
		el.style.top = jq.px(ofs[1]);
		return this;
	},

	
	scrollOffset: function() {
		var el = this.jq[0],
			t = 0, l = 0;
		do {
			t += el.scrollTop  || 0;
			l += el.scrollLeft || 0;
			el = el.parentNode;
		} while (el);
		return [l, t];
	},
	
	cmOffset: function () {
		
		var el = this.jq[0];
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];

		
		if (!(zk.gecko || zk.safari)
		|| this.isVisible() || this.offsetWidth())
			return _cmOffset(el);

		el.style.display = "";
		var ofs = _cmOffset(el);
		el.style.display = "none";
		return ofs;
	},

	
	absolutize: function() {
		var el = this.jq[0];
		if (el.style.position == 'absolute') return this;

		var offsets = _posOffset(el),
			left = offsets[0], top = offsets[1],
			st = el.style;
		el._$orgLeft = left - parseFloat(st.left  || 0);
		el._$orgTop = top  - parseFloat(st.top || 0);
		st.position = 'absolute';
		st.top = jq.px(top);
		st.left = jq.px(left);
		return this;
	},
	
	relativize: function() {
		var el = this.jq[0];
		if (el.style.position == 'relative') return this;

		var st = el.style;
		st.position = 'relative';
		var top  = parseFloat(st.top  || 0) - (el._$orgTop || 0),
			left = parseFloat(st.left || 0) - (el._$orgLeft || 0);

		st.top = jq.px(top);
		st.left = jq.px(left);
		return this;
	},

	
	offsetWidth: function () {
		var el = this.jq[0];
		if (!zk.safari || !jq.nodeName(el, "tr")) return el.offsetWidth;

		var wd = 0;
		for (var cells = el.cells, j = cells.length; j--;)
			wd += cells[j].offsetWidth;
		return wd;
	},
	
	offsetHeight: function () {
		var el = this.jq[0];
		if (!zk.safari || !jq.nodeName(el, "tr")) return el.offsetHeight;

		var hgh = 0;
		for (var cells = el.cells, j = cells.length; j--;) {
			var h = cells[j].offsetHeight;
			if (h > hgh) hgh = h;
		}
		return hgh;
	},
	
	offsetTop: function () {
		var el = this.jq[0];
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];
		return el.offsetTop;
	},
	
	offsetLeft: function () {
		var el = this.jq[0];
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];
		return el.offsetLeft;
	},

	
	viewportOffset: function() {
		var t = 0, l = 0, el = this.jq[0], p = el;
		do {
			t += p.offsetTop  || 0;
			l += p.offsetLeft || 0;

			
			if (p.offsetParent==document.body)
			if (jq(p).css('position')=='absolute') break;

		} while (p = p.offsetParent);

		do {
			if (!zk.opera || jq.nodeName(el, 'body')) {
				t -= el.scrollTop  || 0;
				l -= el.scrollLeft || 0;
			}
		} while (el = el.parentNode);
		return [l, t];
	},
	
	textSize: function (txt) {
		if (!_txtSizDiv) {
			_txtSizDiv = document.createElement("div");
			_txtSizDiv.style.cssText = "left:-1000px;top:-1000px;position:absolute;visibility:hidden;border:none";
			document.body.appendChild(_txtSizDiv);

			_txtStylesCamel = [];
			for (var ss = _txtStyles, j = ss.length; j--;)
				_txtStylesCamel[j] = ss[j].$camel();
		}
		_txtSizDiv.style.display = 'none';
		var jq = this.jq;
		for (var ss = _txtStylesCamel, j = ss.length; j--;) {
			var nm = ss[j];
			_txtSizDiv.style[nm] = jq.css(nm);
		}

		_txtSizDiv.innerHTML = txt || jq[0].innerHTML;
		_txtSizDiv.style.display = '';
		return [_txtSizDiv.offsetWidth, _txtSizDiv.offsetHeight];
	},

	
	dimension: function (revised) {
		var display = this.jq.css('display');
		if (display != 'none' && display != null) 
			return _addOfsToDim(this,
				{width: this.offsetWidth(), height: this.offsetHeight()}, revised);

	
	
		var st = this.jq[0].style,
			backup = {};
		zk.copy(st, {
			visibility: 'hidden',
			position: 'absolute',
			display: 'block'
			}, backup);
		try {
			return _addOfsToDim(this,
				{width: this.offsetWidth(), height: this.offsetHeight()}, revised);
		} finally {
			zk.copy(st, backup);
		}
	},

	
	redoCSS: function (timeout) {
		if (timeout == -1){ 
			for (var j = this.jq.length; j--;)
				zjq._fixCSS(this.jq[j]);	
		} else {
			for (var j = this.jq.length; j--;)
				_rdcss.push(this.jq[j]);
			setTimeout(_redoCSS0, timeout >= 0 ? timeout : 100);
		}
		return this;
	},
	
	redoSrc: function () {
		for (var j = this.jq.length; j--;) {
			var el = this.jq[j],
				src = el.src;
			el.src = zjq.src0;
			el.src = src;
		}
		return this;
	},

	
	vparentNode: function (real) {
		var el = this.jq[0];
		if (el) {
			var v = el.z_vp; 
			if (v) return jq('#' + v)[0];
			v = el.z_vpagt;
			if (v && (v = jq('#' +v)[0]))
				return v.parentNode;
			if (real)
				return el.parentNode;
		}
	},
	
	makeVParent: function () {
		var el = this.jq[0],
			p = el.parentNode;
		if (el.z_vp || el.z_vpagt || p == document.body)
			return this; 

		var sib = el.nextSibling,
			agt = document.createElement("span");
		agt.id = el.z_vpagt = '_z_vpagt' + _vpId ++;
		agt.style.display = "none";
		
		
		zjq._fixedVParent(el, true);
		
		if (sib) p.insertBefore(agt, sib);
		else p.appendChild(agt);

		el.z_vp = p.id; 
		var st = el.style;
		if (!st.top) st.top = "0";
			
			
			
		document.body.appendChild(el);
		return this;
	},
	
	undoVParent: function () {
		var el = this.jq[0];
		if (el.z_vp || el.z_vpagt) {
			var p = el.z_vp,
				agt = el.z_vpagt,
				$agt = jq('#' + agt);
			el.z_vp = el.z_vpagt = null;
			agt = $agt[0];

			p = p ? jq('#' + p)[0]: agt ? agt.parentNode: null;
			if (p) {
				
				
				zjq._fixedVParent(el);
				
				if (agt) {
					p.insertBefore(el, agt);
					$agt.remove();
				} else
					p.appendChild(el);
				
				var cf, p;
				if ((zk.ff == 3.6 || zk.ff == 4) && (cf = zk._prevFocus) && 
					(p = zk.Widget.$(el)) && zUtl.isAncestor(p, cf) && 
					cf.getInputNode)
					jq(cf.getInputNode()).trigger('blur');
			}
		}
		return this;
	},

	
	beforeHideOnUnbind: zk.$void,

	
	
	focus: function (timeout) {
		var n = this.jq[0];
		if (!n || !n.focus) return false;
			

		if (!jq.nodeName(n, 'button', 'input', 'textarea', 'a', 'select', 'iframe'))
			return false;

		if (timeout >= 0) setTimeout(function() {_focus(n);}, timeout);
		else _focus(n);
		return true;
	},
	
	select: function (timeout) {
		var n = this.jq[0];
		if (!n || typeof n.select != 'function') return false;

		if (timeout >= 0) setTimeout(function() {_select(n);}, timeout);
		else _select(n);
		return true;
	},

	
	getSelectionRange: function() {
		var inp = this.jq[0];
		try {
			if (document.selection != null && inp.selectionStart == null) { 
				var range = document.selection.createRange();
				var rangetwo = inp.createTextRange();
				var stored_range = "";
				if(inp.type.toLowerCase() == "text"){
					stored_range = rangetwo.duplicate();
				}else{
					 stored_range = range.duplicate();
					 stored_range.moveToElementText(inp);
				}
				stored_range.setEndPoint('EndToEnd', range);
				var start = stored_range.text.length - range.text.length;
				return [start, start + range.text.length];
			} else { 
				return [inp.selectionStart, inp.selectionEnd];
			}
		} catch (e) {
			return [0, 0];
		}
	},
	
	setSelectionRange: function (start, end) {
		var inp = this.jq[0],
			len = inp.value.length;
		if (start == null || start < 0) start = 0;
		if (start > len) start = len;
		if (end == null || end > len) end = len;
		if (end < 0) end = 0;

		if (inp.setSelectionRange) {
			inp.setSelectionRange(start, end);
		} else if (inp.createTextRange) {
			var range = inp.createTextRange();
			if(start != end){
				range.moveEnd('character', end - range.text.length);
				range.moveStart('character', start);
			}else{
				range.move('character', start);
			}
			range.select();
		}
		return this;
	},

	
	submit: function () {
		this.jq.each(_submit);
		return this;
	},

	
	
	disableSelection: function () {
		this.jq.each(_dissel);
		return this;
	},
	
	enableSelection: function () {
		this.jq.each(_ensel);
		return this;
	},

	
	setStyles: function (styles) {
		this.jq.css(styles);
		return this;
	},
	
	clearStyles: function () {
		var st = this.jq[0];
		if (st && (st=st.style))
			for (var nm in st)
				if ((!zk.ie || nm != "accelerator")
				&& st[nm] && typeof st[nm] == "string")
					try {
						st[nm] = "";
					} catch (e) { 
					}
		return this;
	}
};


zk.copy(jq, {
	
	
	nodeName: function (el) {
		var tag = el && el.nodeName ? el.nodeName.toLowerCase(): "",
			j = arguments.length;
		if (j <= 1)
			return tag;
		while (--j)
			if (tag == arguments[j].toLowerCase())
				return true;
		return false;
	},

	
	px: function (v) {
		return (v||0) + "px";
	},
	
	px0: function (v) {
		return Math.max(v||0, 0) + "px";
	},

	
	$$: function (id, subId) {
		return typeof id == 'string' ?
			id ? document.getElementsByName(id + (subId ? '-' + subId : '')): null: id;
	},

	
	isAncestor: function (p, c) {
		if (!p) return true;
		for (; c; c = zk(c).vparentNode(true))
			if (p == c)
				return true;
		return false;
	},
	
	innerX: function () {
		return window.pageXOffset
			|| document.documentElement.scrollLeft
			|| document.body.scrollLeft || 0;
	},
	
	innerY: function () {
		return window.pageYOffset
			|| document.documentElement.scrollTop
			|| document.body.scrollTop || 0;
	},
	
	innerWidth: function () {
		return jq(window).width();
	},
	
	innerHeight: function () {
		return jq(window).height();
	},
	
	pageWidth: function () {
		return jq(document).width();
	},
	
	pageHeight: function () {
		return jq(document).height();
	},

	
	margins: {l: "margin-left", r: "margin-right", t: "margin-top", b: "margin-bottom"},
	
	borders: {l: "border-left-width", r: "border-right-width", t: "border-top-width", b: "border-bottom-width"},
	
	paddings: {l: "padding-left", r: "padding-right", t: "padding-top", b: "padding-bottom"},

	
	scrollbarWidth: function () {
		if (!_sbwDiv) {
			_sbwDiv = document.createElement("div");
			_sbwDiv.style.cssText = "top:-1000px;left:-1000px;position:absolute;visibility:hidden;border:none;width:50px;height:50px;overflow:scroll;";
			document.body.appendChild(_sbwDiv);
		}
		return _sbwDiv.offsetWidth - _sbwDiv.clientWidth;
	},
	
	isOverlapped: function (ofs1, dim1, ofs2, dim2) {
		var o1x1 = ofs1[0], o1x2 = dim1[0] + o1x1,
			o1y1 = ofs1[1], o1y2 = dim1[1] + o1y1;
		var o2x1 = ofs2[0], o2x2 = dim2[0] + o2x1,
			o2y1 = ofs2[1], o2y2 = dim2[1] + o2y1;
		return o2x1 <= o1x2 && o2x2 >= o1x1 && o2y1 <= o1y2 && o2y2 >= o1y1;
	},

	
	clearSelection: function () {
		try{
			if (window["getSelection"]) {
				if (zk.safari) window.getSelection().collapse();
				else window.getSelection().removeAllRanges();
			} else if (document.selection) {
				if (document.selection.empty) document.selection.empty();
				else if (document.selection.clear) document.selection.clear();
			}
			return true;
		} catch (e){
			return false;
		}
	},

	
	
	filterTextStyle: function (style, plus) {
		if (typeof style == 'string') {
			var ts = "";
			if (style)
				for (var j = 0, k = 0; k >= 0; j = k + 1) {
					k = style.indexOf(';', j);
					var s = k >= 0 ? style.substring(j, k): style.substring(j),
						l = s.indexOf(':'),
						nm = l < 0 ? s.trim(): s.substring(0, l).trim();
					if (nm && (_txtStyles.$contains(nm)
					|| _txtStyles2.$contains(nm)
					|| (plus && plus.$contains(nm))))
						ts += s + ';';
				}
			return ts;
		}

		var ts = {};
		for (var nm in style)
			if (_txtStyles.$contains(nm) || _txtStyles2.$contains(nm)
			|| (plus && plus.$contains(nm)))
				ts[nm] = style[nm];
		return ts;
	},

	
	parseStyle: function (style) {
		var map = {};
		if (style) {
			var pairs = style.split(';');
			for (var j = 0, len = pairs.length; j < len;) {
				var v = pairs[j++].split(':'),
					nm = v.length > 0 ? v[0].trim(): '';
				if (nm)
					map[nm] = v.length > 1 ? v[1].trim(): '';
			}
		}
		return map;
	},

	
	newFrame: function (id, src, style) {
		if (!src) src = zjq.src0;
			

		var html = '<iframe id="'+id+'" name="'+id+'" src="'+src+'"';
		if (style == null) style = 'display:none';
		html += ' style="'+style+'"></iframe>';
		jq(document.body).append(html);
		return zk(id).jq[0];
	},
	
	newStackup: function (el, id, anchor) {
		el = jq(el||[], zk)[0];
		var ifr = document.createElement("iframe");
		ifr.id = id || (el ? el.id + "-ifrstk": 'z_ifrstk');
		ifr.style.cssText = "position:absolute;overflow:hidden;filter:alpha(opacity=0)";
		ifr.frameBorder = "no";
		ifr.tabIndex = -1;
		ifr.src = zjq.src0;
		if (el) {
			ifr.style.width = el.offsetWidth + "px";
			ifr.style.height = el.offsetHeight + "px";
			ifr.style.top = el.style.top;
			ifr.style.left = el.style.left;
			ifr.style.zIndex = el.style.zIndex;
			el.parentNode.insertBefore(ifr, anchor || el);
		}
		return ifr;
	},
	
	newHidden: function (nm, val, parent) {
		var inp = document.createElement("input");
		inp.type = "hidden";
		inp.name = nm;
		inp.value = val;
		if (parent) parent.appendChild(inp);
		return inp;
	},

	
	head: function () {
		return document.getElementsByTagName("head")[0] || document.documentElement;
	},

	
	
	confirm: function (msg) {
		zk.alerting = true;
		try {
			return confirm(msg);
		} finally {
			try {zk.alerting = false;} catch (e) {} 
		}
	},
	
	alert: function (msg) {
		zk.alerting = true;
		try {
			alert(msg);
		} finally {
			try {zk.alerting = false;} catch (e) {} 
		}
	},
	
	onzsync: function (obj) {
		_zsyncs.unshift(obj);
	},
	
	unzsync: function (obj) {
		_zsyncs.$remove(obj);
	},
	
	zsync: function (org) {
		++_pendzsync;
		setTimeout(function () {_zsync(org);}, 50);	
	},

	
	focusOut: zk.ie ? function () {
		window.focus();
	}: function () {
		var a = jq('#z_focusOut')[0];
		if (!a) {
			
			jq(document.body).append('<a href="javascript:;" style="position:absolute;'
					+ 'left:' + zk.clickPointer[0] + 'px;top:' + zk.clickPointer[1]
					+ 'px;" id="z_focusOut"/>');
			a = jq('#z_focusOut')[0];
		}
		a.focus();
		setTimeout(function () {jq(a).remove();}, 500);
	}
	
	
	
	
	
	
	
	
	
	
});


zk.copy(jq.Event.prototype, {
	
	stop: function () {
		this.preventDefault();
		this.stopPropagation();
	},
	
	mouseData: function () {
		return zk.copy({
			pageX: this.pageX, pageY: this.pageY
		}, this.metaData());
	},
	
	keyData: function () {
		return zk.copy({
			keyCode: this.keyCode,
			charCode: this.charCode
			}, this.metaData());
	},
	
	metaData: function () {
		var inf = {};
		if (this.altKey) inf.altKey = true;
		if (this.ctrlKey) inf.ctrlKey = true;
		if (this.shiftKey) inf.shiftKey = true;
		if (this.metaKey) inf.metaKey = true;
		inf.which = this.which || 0;
		return inf;
	}
});


zk.copy(jq.Event, {
	
	fire: document.createEvent ? function (el, evtnm) {
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent(evtnm, false, false);
		el.dispatchEvent(evt);
	}: function (el, evtnm) {
		el.fireEvent('on' + evtnm);
	},
	
	stop: function (evt) {
		evt.stop();
	},
	
	filterMetaData: function (data) {
		var inf = {}
		if (data.altKey) inf.altKey = true;
		if (data.ctrlKey) inf.ctrlKey = true;
		if (data.shiftKey) inf.shiftKey = true;
		if (data.metaKey) inf.metaKey = true;
		inf.which = data.which || 0;
		return inf;
	},
	
	zk: function (evt, wgt) {
		var type = evt.type,
			target = zk.Widget.$(evt) || wgt,
			data, opts;

		if (type.startsWith('mouse')) {
			if (type.length > 5)
				type = 'Mouse' + type.charAt(5).toUpperCase() + type.substring(6);
			data = evt.mouseData();
		} else if (type.startsWith('key')) {
			if (type.length > 3)
				type = 'Key' + type.charAt(3).toUpperCase() + type.substring(4);
			data = evt.keyData();
		} else if (type == 'dblclick') {
			data = evt.mouseData();
			opts = {ctl:true};
			type = 'DoubleClick';
		} else {
			if (type == 'click') {
				data = evt.mouseData();
				opts = {ctl:true};
			}
			type = type.charAt(0).toUpperCase() + type.substring(1);
		}
		return new zk.Event(target, 'on' + type, data, opts, evt);
	}
});
})(document, window);

if(zk.ie){

(function () {
	
	function containsScript(html) {
		if (html)
			for (var j = 0, len = html.length; (j = html.indexOf("</", j)) >= 0 && j + 8 < len;)
				if (html.substring(j += 2, j + 6).toLowerCase() == "script")
					return true;
	}
	function noSkipBfUnload() {
		zk.skipBfUnload = false;
	}

var _zjq = {}, _jq = {};
zk.override(jq.fn, _jq, {
	replaceWith: function (html) {
		
		var done, el;
		try {
			
			
			
			
			
			
			if (typeof html == 'string' && (el = this[0])
			&& !jq.nodeName(el, "td", "th", "table", "tr",
			"caption", "tbody", "thead", "tfoot", "colgroup","col")
			&& !containsScript(html)) {
				var o = zjq._beforeOuter(el);

				jq.cleanData(el.getElementsByTagName("*"));
				jq.cleanData([el]);
				el.innerHTML = ""; 
				el.outerHTML = html;
				done = true;
				zjq._afterOuter(o);
				return this;
			}
		} catch (e) {
		}
		return done ? this: _jq.replaceWith.apply(this, arguments);
	}
});
zk.override(zjq, _zjq, {
	_fixCSS: function (el) {
		var zoom = el.style.zoom;
		el.style.zoom = 1;
		_zjq._fixCSS(el);
		setTimeout(function() {
			try {el.style.zoom = zoom;} catch (e) {}
		});
	}
});
zk.copy(zjq, {
	src0: "javascript:false;",
		

	_fixIframe: function (el) { 
		try {
			if (jq.nodeName(el, 'iframe'))
				zk(el).redoSrc();
			else
				for (var ns = el.getElementsByTagName("iframe"), j = ns.length; j--;)
					zk(ns[j]).redoSrc();
		} catch (e) {
		}
	},

	_fixClick: function (evt) {
		
		
		if (zk.confirmClose)
			for (var n = evt.target; n; n = n.parentNode)
				if (jq.nodeName(n, "a", "area")) {
					if (n.href.indexOf("javascript:") >= 0) {
						zk.skipBfUnload = true;
						setTimeout(noSkipBfUnload, 0); 
					}
					return;
				}
	},

	_beforeOuter: zk.$void, 
	_afterOuter: zk.$void
});


	function _dissel() {
		this.onselectstart = _dissel0;
	}
	function _dissel0(evt) {
		evt = evt || window.event;
		var n = evt.srcElement;
		return jq.nodeName(n, "textarea", "input") && (n.type == "text" || n.type == "password");
	}
	function _ensel() {
		this.onselectstart = null;
	}
zk.copy(zjq.prototype, {
	disableSelection: function () {
		return this.jq.each(_dissel);
	},
	enableSelection: function () {
		return this.jq.each(_ensel);
	},

	cellIndex: function () {
		var cell = this.jq[0];
		if (cell) {
			var cells = cell.parentNode.cells;
			for(var j = 0, cl = cells.length; j < cl; j++)
				if (cells[j] == cell)
					return j;
		}
		return 0;
	}
});

})();

zk.override(jq.event, zjq._evt = {}, {
	fix: function (evt) {
		evt = zjq._evt.fix.apply(this, arguments);
		if (!evt.which && evt.button === 0)
			evt.which = 1; 
		return evt;
	}
});


if (!zk.ie8) 
	zjq._useQS = function (reqInf) {
		var s = reqInf.content, j = s.length, prev, cc;
		if (j + reqInf.uri.length < 2000) {
			while (j--) {
				cc = s.charAt(j);
				if (cc == '%' && prev >= '8') 
					return false;
				prev = cc;
			}
			return true;
		}
		return false;
	};
if(zk.ie6_){

(function () {
	var _imgFiltered = [], 
		_IMGLD = 'DXImageTransform.Microsoft.AlphaImageLoader',
		_FILTER = "progid:" + _IMGLD + "(src='%1',sizingMethod='scale')",
		_inPrint,
		_jq$fn = {}, 
		_nodesToFix = []; 

	function _regexFormat(s) {
		var args = arguments;
		var regex = new RegExp("%([1-" + arguments.length + "])", "g");
		return String(s).replace(regex, function (match, index) {
			return index < args.length ? args[index] : match;
		});
	}
	function _regexEscape(s) {
		return String(s).replace(/([\/()[\]{}|*+-.,^$?\\])/g, "\\$1");
	}

	function _onpropchange() {
	 	if (!_inPrint && event.propertyName == "src"
	 	&& this.src.indexOf('spacer.gif') < 0)
	 		_fix(this);
	}
	function _fix(img) {
		var ni = new Image(img.width, img.height);
		ni.onload = function() {
			img.width = ni.width;
			img.height = ni.height;
			ni = null;
		};
		ni.src = img.src; 
		img._pngSrc = img.src; 
		_addFilter(img);
	}
	function _addFilter(img) {
		var filter = img.filters[_IMGLD];
		if (filter) {
			filter.src = img.src;
			filter.enabled = true;
		} else {
			img.runtimeStyle.filter = _regexFormat(_FILTER, img.src);
			_imgFiltered.push(img);
		}
		img.src = zk.SPACER_URI; 
	}
	function _rmFilter(img) {
		img.src = img._pngSrc;
		img.filters[_IMGLD].enabled = false;
	}

	
	function fixDom(n, nxt) { 
		var regex;
		if (regex = jq.IE6_ALPHAFIX) {
			if (typeof regex == 'string')
				regex = jq.IE6_ALPHAFIX
					= new RegExp(_regexEscape(regex) + "$", "i");

			if (!zk.SPACER_URI)
				zk.SPACER_URI = zk.ajaxURI('web/img/spacer.gif', {au:true});

			for (; n && n != nxt; n = n.nextSibling)
				if (n.nodeType == 1) {
					_nodesToFix.push(n);
					setTimeout(fixDom0, 50);
				}
		}
	}
	function fixDom0() {
		var n = _nodesToFix.shift();
		if (n) {
			
			var regex = jq.IE6_ALPHAFIX,
				imgs = n.getElementsByTagName("img");
			for (var j = imgs.length; j--; ) {
				var img = imgs[j], src = img.src,
					k = src.lastIndexOf(';');
				if (k >= 0) src = src.substring(0, k);
				if (regex.test(img.src))
					zjq.alphafix(img);
			}

			
			if (_nodesToFix.length) setTimeout(fixDom0, 50);
		}
	}

zk.override(jq.fn, _jq$fn, {
	before: function () {
		var e = this[0], ref;
		if (e) ref = e.previousSibling;

		ret = _jq$fn.before.apply(this, arguments);

		if (e) fixDom(ref ? ref.nextSibling:
			e.parentNode ? e.parentNode.firstChild: null, e);
			
		return ret;
	},
	after: function () {
		var e = this[0], ref;
		if (e) ref = e.nextSibling;

		ret = _jq$fn.after.apply(this, arguments);

		if (e) fixDom(e.nextSibling, ref);
		return ret;
	},
	append: function () {
		var e = this[0], ref;
		if (e) ref = e.lastChild;

		ret = _jq$fn.append.apply(this, arguments);

		if (e) fixDom(ref ? ref.nextSibling: e.firstChild);
		return ret;
	},
	prepend: function () {
		var e = this[0], ref;
		if (e) ref = e.firstChild;

		ret = _jq$fn.prepend.apply(this, arguments);

		if (e) fixDom(e.firstChild, ref);
		return ret;
	},
	replaceWith: function () {
		var e = this[0], ref, ref2, p;
		if (e) {
			p = e.parentNode;
			ref = e.previousSibling;
			ref2 = e.nextSibling;
		}

		ret = _jq$fn.replaceWith.apply(this, arguments);

		if (e)
			fixDom(ref ? ref.nextSibling: p ? p.firstChild: null, ref2);
			
		return ret;
	},
	html: function (content) {
		var e = content === undefined ? null: this[0];

		ret = _jq$fn.html.apply(this, arguments);

		if (e) fixDom(e.firstChild);
		return ret;
	},

	clone: function () {
		var clone = _jq$fn.clone.apply(this, arguments), n, nc;
		for (var j = 0; j < this.length; ++j) {
			n = this[j];
			if (jq.nodeName(n, "img") && n._pngSrc) {
				(nc = clone[j]).src = n._pngSrc;
				setTimeout(function() {_fix(nc);}, 0); 
			}
		}
		return clone;
	}
});

zk.copy(zjq, {
	
	_beforeOuter: function (e) {
		if (e)
			return {p: e.parentNode, ref: e.previousSibling, ref2: e.nextSibling};
	},
	_afterOuter: function (o) {
		if (o)
			fixDom(o.ref ? o.ref.nextSibling: o.p ? o.p.firstChild: null, o.ref2);
	},
	_fixedVParent: function (el) {
		try {
			var inps = el.getElementsByTagName("INPUT");
			for (var i in inps) {
				if (inps[i].type == "checkbox")
					inps[i].defaultChecked = inps[i].checked;
			}
		} catch (e) {}
	},
	
	alphafix: function (img) {
		_fix(img);
		jq(img).bind("propertychange", _onpropchange);
	}
});

jq(window).bind("beforeprint", function() {
		_inPrint = true;
		for (var ns = _imgFiltered, i = 0, len = ns.length; i < len; i++) {
			var n = ns[i];
			try {
				_rmFilter(n);
			} catch (e) {
				ns.splice(i--, 1); 
				len--;
			}
		}
	})
	.bind("afterprint", function() {
		for (var ns = _imgFiltered, i = 0, len = ns.length; i < len; i++)
			_addFilter(ns[i]);
		_inPrint = false;
	});

})();
}}else if(zk.opera){

zk.copy(zjq.prototype, {
	scrollOffset: function() {
		
		
		
		var el = this.jq[0],
			normaltag = !jq.nodeName(el, "tr", "img"),
			t = 0, l = 0;
		do {
			var tag = jq.nodeName(el);
			if (tag == 'body' || (normaltag && tag == 'div')) {
				t += el.scrollTop  || 0;
				l += el.scrollLeft || 0;
			}
			el = el.parentNode;
		} while (el);
		return [l, t];
	}
});

zk.copy(zjq, {
	_cleanVisi: function (n) {
		n.style.visibility = n.getElementsByTagName('input').length ? "visible": 'inherit';
			
	},
	_fixCSS: function (el) { 
		var olddisp = el.style.display; 
		el.style.display='none';
		var dummy = el.offsetWidth; 
		el.style.display=olddisp;
	}
});
}else if(zk.safari){

(function () {
	function _dissel() {
		this.style.KhtmlUserSelect = "none";
	}
	function _ensel() {
		this.style.KhtmlUserSelect = "";
	}
	
zk.copy(zjq, {
	_fixCSS: function (el) { 
		var olddisp = el.style.display; 
		el.style.display='none';
		var dummy = el.offsetWidth; 
		el.style.display=olddisp;
	}
});

zk.copy(zjq.prototype, {
	disableSelection: function () {
		return this.jq.each(_dissel);
	},
	enableSelection: function () {
		return this.jq.each(_ensel);
	},
	beforeHideOnUnbind: function () { 
		return this.jq.each(function () {
			for (var ns = this.getElementsByTagName("iframe"), j = ns.length; j--;)
				ns[j].src = zjq.src0;
		});
	}
});

zjq._sfKeys = {
	25: 9, 	   
	63232: 38, 
	63233: 40, 
	63234: 37, 
	63235: 39, 
	63272: 46, 
	63273: 36, 
	63275: 35, 
	63276: 33, 
	63277: 34  
};
zk.override(jq.event, zjq._evt = {}, {
	fix: function (evt) {
		evt = zjq._evt.fix.apply(this, arguments);
		var v = zjq._sfKeys[evt.keyCode];
		if (v) evt.keyCode = v;
		return evt;
	}
});
})();

}


(function () {
	var _aftAnims = [], 
		_jqstop = jq.fx.stop;

	jq.fx.stop = function () {
		_jqstop();
		for (var fn; fn = _aftAnims.shift();)
			fn();
	};

	function _addAnique(id, data) {
		var ary = zk._anique[id];
		if (!ary)
			ary = zk._anique[id] = [];
		ary.push(data);
	}
	function _doAnique(id) {
		var ary = zk._anique[id];
		if (ary) {
			var al = ary.length;
			while (al) {
				var data = ary.shift();
				if (jq(data.el).is(':animated')) {
					ary.unshift(data);
					break;
				}
				zk(data.el)[data.anima](data.wgt, data.opts);
				al--;
			}

			if (!al)
				delete zk._anique[id];
		}
	}

	function _saveProp(self, set) {
		var ele = self.jq;
		for(var i = set.length; i--;)
			if(set[i] !== null) ele.data("zk.cache."+set[i], ele[0].style[set[i]]);
		return self;
	}
	function _restoreProp(self, set) {
		var ele = self.jq;
		for(var i = set.length; i--;)
			if(set[i] !== null) ele.css(set[i], ele.data("zk.cache."+set[i]));
		return self;
	}
	function _checkAnimated(self, wgt, opts, anima) {
		if (self.jq.is(':animated')) {
			_addAnique(wgt.uuid, {el: self.jq[0], wgt: wgt, opts: opts, anima: anima});
			return true;
		}
		return false;
	}
	function _checkPosition(self, css) {
		var pos = self.jq.css('position');
		if (!pos || pos == 'static')
			css.position = 'relative';
		return self;
	}


zk.copy(zk, {
	
	animating: function () {
		return !!jq.timers.length;
	},
	
	afterAnimate: function (fn, delay) {
		if (zk.animating())
			_aftAnims.push(fn);
		else if (delay < 0) {
			fn();
			return true;
		} else
			setTimeout(fn, delay);
	},
	_anique: {}
});


zk.copy(zjq.prototype, {
	
	slideDown: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideDown'))
			return this;

		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'height', 'width', 'overflow', 'position'],
			anima = {},
			css = {overflow: 'hidden'},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			css.height = '0';
			anima.height = jq.px0(dims.height);
			break;
		case 'b':
			css.height = '0';
			css.top = jq.px(dims.top + dims.height);
			anima.height = jq.px0(dims.height);
			anima.top = jq.px(dims.top);
			break;
		case 'l':
			css.width = '0';
			anima.width = jq.px0(dims.width);
			break;
		case 'r':
			css.width = '0';
			css.left = jq.px(dims.left + dims.width);
			anima.width = jq.px0(dims.width);
			anima.left = jq.px(dims.left);
			break;
		}

		return this.defaultAnimaOpts(wgt, opts, prop, true)
			.jq.css(css).show().animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 400,
			complete: opts.afterAnima
		});
	},
	
	slideUp: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideUp'))
			return this;
		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'height', 'width', 'overflow', 'position'],
			anima = {},
			css = {overflow: 'hidden'},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			anima.height = 'hide';
			break;
		case 'b':
			css.height = jq.px0(dims.height);
			anima.height = 'hide';
			anima.top = jq.px(dims.top + dims.height);
			break;
		case 'l':
			anima.width = 'hide';
			break;
		case 'r':
			css.width = jq.px0(dims.width);
			anima.width = 'hide';
			anima.left = jq.px(dims.left + dims.width);
			break;
		}

		return this.defaultAnimaOpts(wgt, opts, prop)
			.jq.css(css).animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 400,
			complete: opts.afterAnima
		});
	},
	
	slideOut: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideOut'))
			return this;
		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'position'],
			anima = {},
			css = {},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			anima.top = jq.px(dims.top - dims.height);
			break;
		case 'b':
			anima.top = jq.px(dims.top + dims.height);
			break;
		case 'l':
			anima.left = jq.px(dims.left - dims.width);
			break;
		case 'r':
			anima.left = jq.px(dims.left + dims.width);
			break;
		}

		return this.defaultAnimaOpts(wgt, opts, prop)
			.jq.css(css).animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 500,
			complete: opts.afterAnima
		});
	},
	
	slideIn: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideIn'))
			return this;
		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'position'],
			anima = {},
			css = {},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			css.top = jq.px(dims.top - dims.height);
			anima.top = jq.px(dims.top);
			break;
		case 'b':
			css.top = jq.px(dims.top + dims.height);
			anima.top = jq.px(dims.top);
			break;
		case 'l':
			css.left = jq.px(dims.left - dims.width);
			anima.left = jq.px(dims.left);
			break;
		case 'r':
			css.left = jq.px(dims.left + dims.width);
			anima.left = jq.px(dims.left);
			break;
		}

		return this.defaultAnimaOpts(wgt, opts, prop, true)
			.jq.css(css).show().animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 500,
			complete: opts.afterAnima
		});
	},
	_updateProp: function(prop) { 
		_saveProp(this, prop);
	},
	
	defaultAnimaOpts: function (wgt, opts, prop, visible) {
		var self = this;
		jq.timers.push(function() {
			if (!visible)
				zWatch.fireDown('onHide', wgt);
			if (opts.beforeAnima)
				opts.beforeAnima.call(wgt, self);
		});

		var aftfn = opts.afterAnima;
		opts.afterAnima = function () {
			if (visible) {
				if (zk.ie) zk(self.jq[0]).redoCSS(); 
				zWatch.fireDown('onShow', wgt);
			} else {
				self.jq.hide();
			}
			if (prop) _restoreProp(self, prop);
			if (aftfn) aftfn.call(wgt, self.jq.context);
			wgt.afterAnima_(visible);
			setTimeout(function () {
				_doAnique(wgt.uuid);
			});
		};
		return this;
	}
});
})();

(function () {
	var _drags = [],
		_dragging = {},
		_stackup, _activedg, _timeout, _initPt, _dnEvt,
		_lastPt, _lastScrlPt;

	function _activate(dg, devt, pt) {
		_timeout = setTimeout(function () { 
			_timeout = null; 
			
			if (!zk.ie || !_activedg || _activedg.node == dg.node)
				_activedg = dg; 
		}, dg.opts.delay);
		_initPt = pt;
	}
	function _deactivate() {
		_activedg = null;
		if (_dnEvt) setTimeout(function(){_dnEvt=null;}, 0);
	}

	function _docmousemove(devt) {
		if(!_activedg || _activedg.dead) return;

		var evt = jq.Event.zk(devt),
			pt = [evt.pageX, evt.pageY];
		
		
		if(_lastPt && _lastPt[0] == pt [0]
		&& _lastPt[1] == pt [1])
			return;

		_lastPt = pt;
		_activedg._updateDrag(pt, evt);
		devt.stop();
			
			
	}
	function _docmouseup(devt) {
		if(_timeout) { 
			clearTimeout(_timeout); 
			_timeout = null; 
		}
		if(!_activedg) return;

		_lastPt = null;
		var evt,
			adg = _activedg;
		_activedg._endDrag(evt = jq.Event.zk(devt));
		_activedg = null;
		if (evt.domStopped) devt.stop();
		
		if(adg._suicide) {
			adg._suicide = false;
			adg.destroy();
		}
	}
	function _dockeypress(devt) {
		if(_activedg) _activedg._keypress(devt);
	}

	
	function _defStartEffect(dg) {
		var node = dg.node;
		node._$opacity = jq(node).css('opacity');
		_dragging[node] = true;
		new zk.eff.Opacity(node, {duration:0.2, from:node._$opacity, to:0.7}); 
	}
	function _defEndEffect(dg) {
		var node = dg.node,
			toOpacity = typeof node._$opacity == 'number' ? node._$opacity : 1.0;
		new zk.eff.Opacity(node, {duration:0.2, from:0.7,
			to:toOpacity, queue: {scope:'_draggable', position:'end'},
			afterFinish: function () { 
				delete _dragging[node];
			}
		});
	}
	function _defRevertEffect(dg, offset) {
		var dx, dy;
		if ((dx=offset[0]) || (dy=offset[1])) {
			var node = dg.node,
				orgpos = node.style.position,
				dur = Math.sqrt(Math.abs(dy^2)+Math.abs(dx^2))*0.02;
			new zk.eff.Move(node, { x: -dx, y: -dy,
				duration: dur, queue: {scope:'_draggable', position:'end'},
				afterFinish: function () {node.style.position = orgpos;}});
		}
	}
	

zk.Draggable = zk.$extends(zk.Object, {
	
	
	
	
	
	
	
	
	
	$init: function (control, node, opts) {
		if (!_stackup) {
		
			jq(_stackup = jq.newStackup(null, 'z_ddstkup')).hide();
			document.body.appendChild(_stackup);
		}

		this.control = control;
		this.node = node = node ? jq(node, zk)[0]: control.node || (control.$n ? control.$n() : null);
		if (!node)
			throw "Handle required for "+control;

		opts = zk.$default(opts, {

			scrollSensitivity: 20,
			scrollSpeed: 15,
			initSensitivity: 3,
			delay: 0,
			fireOnMove: true
		});

		if (opts.reverteffect == null)
			opts.reverteffect = _defRevertEffect;
		if (opts.endeffect == null) {
			opts.endeffect = _defEndEffect;
			if (opts.starteffect == null)
				opts.starteffect = _defStartEffect;
		}

		if(opts.handle) this.handle = jq(opts.handle, zk)[0];
		if(!this.handle) this.handle = node;

		if(opts.scroll && !opts.scroll.scrollTo && !opts.scroll.outerHTML) {
			opts.scroll = jq(opts.scroll, zk)[0];
			this._isScrollChild = zUtl.isAncestor(opts.scroll, node);
		}

		this.delta = this._currentDelta();
		this.opts = opts;
		this.dragging = false;   

		jq(this.handle).bind('zmousedown', this.proxy(this._mousedown));

		
		if(_drags.length == 0)
			jq(document).bind('zmouseup', _docmouseup)
				.bind('zmousemove', _docmousemove)
				.keypress(_dockeypress);
		_drags.push(this);
	},
	
	destroy: function () {
		if(this.dragging) {
			
			
			this._suicide = true;
			return;
		}
		jq(this.handle).unbind("zmousedown", this.proxy(this._mousedown));

		
		_drags.$remove(this);
		if(_drags.length == 0)
			jq(document).unbind("zmouseup", _docmouseup)
				.unbind("zmousemove", _docmousemove)
				.unbind("keypress", _dockeypress);
		if (_activedg == this) 
			_activedg = null;

		this.node = this.control = this.handle = null;
		this.dead = true;
	},

	
	_currentDelta: function () {
		var $node = jq(this.node);
		return [zk.parseInt($node.css('left')), zk.parseInt($node.css('top'))];
	},

	_startDrag: function (evt) {
		zWatch.fire('onStartDrag', this, evt);

		
		zk(document.body).disableSelection(); 
		jq.clearSelection(); 
		if (this.opts.overlay) { 
			var stackup = document.createElement("div");
			document.body.appendChild(stackup);
			stackup.className = "z-dd-stackup";
			zk(stackup).disableSelection();
			var st = (this.stackup = stackup).style;
			st.width = jq.px0(jq(document).width());
			st.height = jq.px0(jq(document).height());
		}
		zk.dragging = this.dragging = true;

		var node = this.node,
			opt;
		if(opt = this.opts.ghosting)
			if (typeof opt == 'function') {
				this.delta = this._currentDelta();
				this.orgnode = this.node;

				var $node = zk(this.node),
					ofs = $node.cmOffset();
				this.z_scrl = $node.scrollOffset();
				this.z_scrl[0] -= jq.innerX(); this.z_scrl[1] -= jq.innerY();
					
				ofs[0] -= this.z_scrl[0]; ofs[1] -= this.z_scrl[1];

				node = this.node = opt(this, ofs, evt);
			} else {
				this._clone = jq(node).clone()[0];
				this.z_orgpos = node.style.position; 
				if (this.z_orgpos != 'absolute')
					jq(node).absolutize();
				node.parentNode.insertBefore(this._clone, node);
			}

		if (this.opts.stackup) {
			if (zk(_stackup).isVisible()) 
				this._stackup = jq.newStackup(node, node.id + '-ddstk');
			else {
				this._stackup = _stackup;
				this._syncStackup();
				node.parentNode.insertBefore(_stackup, node);
			}
		}

		this.orgZ = -1;
		if(opt = this.opts.zIndex) { 
			if (typeof opt == 'function')
				opt = opt(this);
			if (opt >= 0) {
				this.orgZ = zk.parseInt(jq(node).css('z-index'));
				node.style.zIndex = opt;
			}
		}

		if(this.opts.scroll) {
			if (this.opts.scroll == window) {
				var where = this._getWndScroll(this.opts.scroll);
				this.orgScrlLeft = where.left;
				this.orgScrlTop = where.top;
			} else {
				this.orgScrlLeft = this.opts.scroll.scrollLeft;
				this.orgScrlTop = this.opts.scroll.scrollTop;
			}
		}

		if(this.opts.starteffect)
			this.opts.starteffect(this, evt);
	},
	_syncStackup: function () {
		if (this._stackup) {
			var node = this.node,
				st = this._stackup.style;
			st.display = 'block';
			st.left = node.offsetLeft + "px";
			st.top = node.offsetTop + "px";
			st.width = node.offsetWidth + "px";
			st.height = node.offsetHeight + "px";
		}
	},

	_updateDrag: function (pt, evt) {
		if(!this.dragging) {
			var v = this.opts.initSensitivity;
			if (v && pt[0] <= _initPt[0] + v && pt[0] >= _initPt[0] - v
			&& pt[1] <= _initPt[1] + v && pt[1] >= _initPt[1] - v)
				return;
			this._startDrag(evt);
		}
		this._updateInnerOfs();

		this._draw(pt, evt);
		if (this.opts.change) this.opts.change(this, pt, evt);
		this._syncStackup();

		if(this.opts.scroll) {
			this._stopScrolling();

			var p;
			if (this.opts.scroll == window) {
				var o = this._getWndScroll(this.opts.scroll);
				p = [o.left, o.top, o.left + o.width, o.top + o.height];
			} else {
				p = zk(this.opts.scroll).viewportOffset();
				p[0] += this.opts.scroll.scrollLeft + this._innerOfs[0];
				p[1] += this.opts.scroll.scrollTop + this._innerOfs[1];
				p.push(p[0]+this.opts.scroll.offsetWidth);
				p.push(p[1]+this.opts.scroll.offsetHeight);
			}

			var speed = [0,0],
				v = this.opts.scrollSensitivity;
			if(pt[0] < (p[0]+v)) speed[0] = pt[0]-(p[0]+v);
			if(pt[1] < (p[1]+v)) speed[1] = pt[1]-(p[1]+v);
			if(pt[0] > (p[2]-v)) speed[0] = pt[0]-(p[2]-v);
			if(pt[1] > (p[3]-v)) speed[1] = pt[1]-(p[3]-v);
			this._startScrolling(speed);
		}

		
		if(navigator.appVersion.indexOf('AppleWebKit')>0) window.scrollBy(0,0);

		evt.stop();
	},

	_finishDrag: function (evt, success) {
		this.dragging = false;
		if (this.stackup) {
			jq(this.stackup).remove();
			delete this.stackup;
		}

		
		zk(document.body).enableSelection();
		setTimeout(jq.clearSelection, 0);

		var stackup = this._stackup;
		if (stackup) {
			if (stackup == _stackup) jq(stackup).hide();
			else jq(stackup).remove();
			delete this._stackup;
		}

		var node = this.node;
		if(this.opts.ghosting)
			if (typeof this.opts.ghosting == 'function') {
				if (this.opts.endghosting)
					this.opts.endghosting(this, this.orgnode);
				if (node != this.orgnode) {
					jq(node).remove();
					this.node = this.orgnode;
				}
				delete this.orgnode;
			} else {
				if (this.z_orgpos != "absolute") { 
					zk(this.node).relativize();
					node.style.position = this.z_orgpos;
				}
				jq(this._clone).remove();
				this._clone = null;
			}

		var pt = [evt.pageX, evt.pageY];
		var revert = this.opts.revert;
		if(revert && typeof revert == 'function')
			revert = revert(this, pt, evt);

		var d = this._currentDelta(),
			d2 = this.delta;
		if(revert && this.opts.reverteffect) {
			this.opts.reverteffect(this,
				[d[0]-this.delta[0], d[1]-this.delta[1]]);
		} else {
			this.delta = d;
		}

		if(this.orgZ != -1)
			node.style.zIndex = this.orgZ;

		if(this.opts.endeffect) 
			this.opts.endeffect(this, evt);

		var wgt = this.control;
		if (this.opts.fireOnMove && zk.Widget.isInstance(wgt)) {
			if (d[0] != d2[0] || d[1] != d2[1]) {
				wgt.fire('onMove', zk.copy({
					left: node.style.left,
					top: node.style.top
				}, evt.data), {ignorable: true});
			}
		}
		_deactivate(this);
		var self = this;
		setTimeout(function(){
			zk.dragging=false;
			zWatch.fire("onEndDrag", self, evt);
		}, zk.ios ? 500: 0);
			
	},

	_mousedown: function (devt) {
		var node = this.node,
			evt = jq.Event.zk(devt);
		if(_dragging[node] || evt.which != 1)
			return;

		var pt = [evt.pageX, evt.pageY];
		if (this.opts.ignoredrag && this.opts.ignoredrag(this, pt, evt)) {
			if (evt.domStopped) devt.stop();
			return;
		}
		
		
		if(zk.safari && jq.nodeName(devt.target, 'select'))
			return;
		
		var pos = zk(node).cmOffset();
		this.offset = [pt[0] - pos[0], pt[1] - pos[1]];
		_activate(this, devt, pt);

		if (!zk.ie) {
			devt.stop();
			
			
			
			
			
			

			_dnEvt = jq.Event.zk(devt, this.control);
			
		}
	},
	_keypress: function (devt) {
		if(devt.keyCode == 27) {
			this._finishDrag(jq.Event.zk(devt), false);
			devt.stop();
		}
	},

	_endDrag: function (evt) {
		if(this.dragging) {
			this._stopScrolling();
			this._finishDrag(evt, true);
			evt.stop();
		} else
			_deactivate(this);
	},

	_draw: function (point, evt) {
		var node = this.node,
			$node = zk(node),
			pos = $node.cmOffset(),
			opts = this.opts;
		if(opts.ghosting) {
			var r = $node.scrollOffset();
			pos[0] += r[0] - this._innerOfs[0]; pos[1] += r[1] - this._innerOfs[1];
		}

		var d = this._currentDelta(),
			scroll = opts.scroll;
		pos[0] -= d[0]; pos[1] -= d[1];

		if(scroll && (scroll != window && this._isScrollChild)) {
			pos[0] -= scroll.scrollLeft-this.orgScrlLeft;
			pos[1] -= scroll.scrollTop-this.orgScrlTop;
		}

		var p = [point[0]-pos[0]-this.offset[0],
			point[1]-pos[1]-this.offset[1]],
			snap = opts.snap;

		if(snap)
			if(typeof snap == 'function') {
				p = snap(this, p);
			} else {
				if(snap instanceof Array) {
					p = [Math.round(p[0]/snap[0])*snap[0],
						Math.round(p[1]/snap[1])*snap[1]];
				} else {
					p = [Math.round(p[0]/snap)*snap,
						Math.round(p[1]/snap)*snap];
				}
			}

		
		if (this.z_scrl) {
			p[0] -= this.z_scrl[0]; p[1] -= this.z_scrl[1];
		}

		var style = node.style;
		if (typeof opts.draw == 'function') {
			opts.draw(this, this.snap_(p, opts), evt);
		} else if (typeof opts.constraint == 'function') {
			var np = opts.constraint(this, p, evt); 
			if (np) p = np;
			p = this.snap_(p, opts);
			style.left = jq.px(p[0]);
			style.top  = jq.px(p[1]);
		} else {
			p = this.snap_(p, opts);
			if((!opts.constraint) || (opts.constraint=='horizontal'))
				style.left = jq.px(p[0]);
			if((!opts.constraint) || (opts.constraint=='vertical'))
				style.top  = jq.px(p[1]);
		}

		if(style.visibility=="hidden") style.visibility = ""; 
	},

	_stopScrolling: function () {
		if(this.scrollInterval) {
			clearInterval(this.scrollInterval);
			this.scrollInterval = null;
			_lastScrlPt = null;
		}
	},
	_startScrolling: function (speed) {
		if(speed[0] || speed[1]) {
			this.scrollSpeed = [speed[0]*this.opts.scrollSpeed,speed[1]*this.opts.scrollSpeed];
			this.lastScrolled = new Date();
			this.scrollInterval = setInterval(this.proxy(this._scroll), 10);
		}
	},

	_scroll: function () {
		var current = new Date(),
			delta = current - this.lastScrolled;
		this.lastScrolled = current;
		if(this.opts.scroll == window) {
			if (this.scrollSpeed[0] || this.scrollSpeed[1]) {
				var o = this._getWndScroll(this.opts.scroll),
					d = delta / 1000;
				this.opts.scroll.scrollTo(o.left + d*this.scrollSpeed[0],
					o.top + d*this.scrollSpeed[1]);
			}
		} else {
			this.opts.scroll.scrollLeft += this.scrollSpeed[0] * delta / 1000;
			this.opts.scroll.scrollTop  += this.scrollSpeed[1] * delta / 1000;
		}

		this._updateInnerOfs();
		if (this._isScrollChild) {
			_lastScrlPt = _lastScrlPt || _lastPt;
			_lastScrlPt[0] += this.scrollSpeed[0] * delta / 1000;
			_lastScrlPt[1] += this.scrollSpeed[1] * delta / 1000;
			if (_lastScrlPt[0] < 0)
				_lastScrlPt[0] = 0;
			if (_lastScrlPt[1] < 0)
				_lastScrlPt[1] = 0;
			this._draw(_lastScrlPt);
		}

		if(this.opts.change) {
			var devt = window.event ? jq.event.fix(window.event): null,
				evt = devt ? jq.Event.zk(devt): null;
			this.opts.change(this,
				evt ? [evt.pageX, evt.pageY]: _lastPt, evt);
		}
	},

	_updateInnerOfs: function () {
		this._innerOfs = [jq.innerX(), jq.innerY()];
	},
	_getWndScroll: function (w) {
		var T, L, W, H,
			doc = w.document,
			de = doc.documentElement;
		if (de && de.scrollTop) {
			T = de.scrollTop;
			L = de.scrollLeft;
		} else if (w.document.body) {
			T = doc.body.scrollTop;
			L = doc.body.scrollLeft;
		}
		if (w.innerWidth) {
			W = w.innerWidth;
			H = w.innerHeight;
		} else if (de && de.clientWidth) {
			W = de.clientWidth;
			H = de.clientHeight;
		} else {
			W = doc.body.offsetWidth;
			H = doc.body.offsetHeight
		}
		return {top: T, left: L, width: W, height: H};
	},

	
	snap_: function (pos, opts) {
		if (!opts.snap && pos[1] < 0)
			pos[1] = 0;
		return pos;
	}

},{
	ignoreMouseUp: function () { 
		return zk.dragging ? true: _dnEvt;
	},
	ignoreClick: function () { 
		return zk.dragging;
	}
});
})();


(function() {

	var _defSKUOpts, _useSKU;
	function _getSKUOpts() {
		return _defSKUOpts
			|| (_defSKUOpts = {stackup: zk.eff.shallStackup()});
	}



zk.eff = {
	shallStackup: function () {
		return _useSKU;
	}
};

if (!zk.css3) {
	var _defShadowOpts = {left: 4, right: 4, top: 3, bottom: 3},
		_shadowEnding = zk.ie6_ ? '" class="z-shadow"></div>':
		'" class="z-shadow"><div class="z-shadow-tl"><div class="z-shadow-tr"></div></div>'
		+'<div class="z-shadow-cl"><div class="z-shadow-cr"><div class="z-shadow-cm">&#160;</div></div></div>'
		+'<div class="z-shadow-bl"><div class="z-shadow-br"></div></div></div>';

	
	zk.eff.Shadow = zk.$extends(zk.Object, {
		
		$init: function (element, opts) {
			opts = this.opts =
				zk.$default(zk.$default(opts, _defShadowOpts), _getSKUOpts());
			if (zk.ie6_) {
				opts.left -= 1;
				opts.right -= 8;
				opts.top -= 2;
				opts.bottom -= 6;
			}
	
			this.node = element;
			var sdwid = element.id + "-sdw";
			jq(element).before('<div id="' + sdwid + _shadowEnding);
			this.shadow = jq(sdwid, zk)[0];
		},
		
		destroy: function () {
			jq(this.shadow).remove();
			jq(this.stackup).remove();
			this.node = this.shadow = this.stackup = null;
		},
		
		hide: function(){
			jq(this.shadow).hide();
			jq(this.stackup).hide();
		},
		
		sync: function () {
			var node = this.node, $node = jq(node),
				shadow = this.shadow;
			if (!node || !$node.zk.isVisible(true)) {
				this.hide();
				return false;
			}
	
			for (var c = shadow;;) {
				if (!(c = c.nextSibling) || c.tagName) {
					if (c != node)
						node.parentNode.insertBefore(shadow, node);
					break;
				}
			}
	
			var opts = this.opts,
				l = node.offsetLeft, t = node.offsetTop,
				w = node.offsetWidth, h = node.offsetHeight,
				wd = Math.max(0, w - opts.left + opts.right),
				hgh = Math.max(0, h - opts.top + opts.bottom),
				st = shadow.style;
			st.left = jq.px(l + opts.left);
			st.top = jq.px(t + opts.top);
			st.width = jq.px0(wd);
			st.zIndex = zk.parseInt($node.css("zIndex"));
			st.display = "block";
			if (zk.ie6_) st.height = jq.px0(hgh);
			else {
				var cns = shadow.childNodes;
				cns[1].style.height = jq.px0(hgh - cns[0].offsetHeight - cns[2].offsetHeight);
			}
	
			var stackup = this.stackup;
			if(opts.stackup) {
				if(!stackup)
					stackup = this.stackup =
						jq.newStackup(node, node.id + '-sdwstk', shadow);
	
				st = stackup.style;
				st.left = jq.px(l);
				st.top = jq.px(t);
				st.width = jq.px0(w);
				st.height = jq.px0(h);
				st.zIndex = shadow.style.zIndex;
				st.display = "block";
			}
			return true;
		},
		
		getBottomElement: function () {
			return this.stackup || this.shadow;
		}
	});
} else {
	zk.eff.Shadow = zk.$extends(zk.Object, {
		$init: function (element, opts) {
			this.wgt = zk.Widget.$(element.id);
			this.opts = zk.$default(opts, _getSKUOpts());
			this.node = element;
		},
		destroy: function () {
			jq(this.stackup).remove();
			jq(this.node).removeClass(this.wgt.getZclass() + '-shadow');
			this.wgt = this.node = this.stackup = null;
		},
		hide: function(){
			jq(this.stackup).hide();
			jq(this.node).removeClass(this.wgt.getZclass() + '-shadow');
		},
		sync: function () {
			var node = this.node, $node = jq(node);
			if (!node || !$node.zk.isVisible(true)) {
				if (this.opts.stackup && node) {
					if (!this.stackup) 
						this.stackup = jq.newStackup(node, node.id + '-sdwstk', node);
				}
				this.hide();
				return false;
			}
			
			$node.addClass(this.wgt.getZclass() + '-shadow');
			
			var opts = this.opts,
				l = node.offsetLeft, t = node.offsetTop,
				w = node.offsetWidth, h = node.offsetHeight,
				stackup = this.stackup;
				
			if(opts.stackup) {
				if(!stackup)
					stackup = this.stackup =
						jq.newStackup(node, node.id + '-sdwstk', node);
	
				var st = stackup.style;
				st.left = jq.px(l);
				st.top = jq.px(t);
				st.width = jq.px0(w);
				st.height = jq.px0(h);
				st.zIndex = zk.parseInt($node.css("zIndex"));
				st.display = "block";
			}
			return true;
		},
		getBottomElement: function () {
			return this.stackup;
		}
	});
}

	
	
	function _syncMaskPos() {
		var n = this.mask,
			st = n.style;
		if (st.display != "none") {
			var ofs = zk(n).toStyleOffset(jq.innerX(), jq.innerY());
			st.left = jq.px(ofs[0]);
			st.top = jq.px(ofs[1]);
			st.width = jq.px0(jq.innerWidth());
			st.height = jq.px0(jq.innerHeight());

			if (n = this.stackup)
				zk.set(n.style, st, ["left", "top", "width", "height"]);
		}
	}


zk.eff.FullMask = zk.$extends(zk.Object, {
	
	$init: function (opts) {
		opts = zk.$default(opts, _getSKUOpts());
		var mask = this.mask = jq(opts.mask||[], zk)[0];
		if (this.mask) {
			if (opts.anchor)
				opts.anchor.parentNode.insertBefore(mask, opts.anchor);
			if (opts.id) mask.id = opts.id;
			if (opts.zIndex != null) mask.style.zIndex = opts.zIndex;
			if (opts.visible == false) mask.style.display = 'none';
		} else {
			var maskId = opts.id || 'z_mask',
				html = '<div id="' + maskId + '" class="z-modal-mask"';
			if (opts.zIndex != null || opts.visible == false) {
				html += ' style="';
				if (opts.zIndex != null) html += 'z-index:' + opts.zIndex;
				if (opts.visible == false) html += ';display:none';
				html +='"';
			}

			html += '></div>'
			if (opts.anchor)
				jq(opts.anchor, zk).before(html);
			else
				jq(document.body).append(html);
			mask = this.mask = jq(maskId, zk)[0];
		}
		if (opts.stackup)
			this.stackup = jq.newStackup(mask, mask.id + '-mkstk');

		_syncMaskPos.call(this);

		var f;
		jq(mask).click(jq.Event.stop); 
		jq(window).resize(f = this.proxy(_syncMaskPos))
			.scroll(f);
	},
	
	destroy: function () {
		var mask = this.mask, f;
		jq(mask).unbind("click", jq.Event.stop)
			.remove()
		jq(window).unbind("resize", f = this.proxy(_syncMaskPos))
			.unbind("scroll", f);
		jq(this.stackup).remove();
		this.mask = this.stackup = null;
	},
	
	hide: function () {
		this.mask.style.display = 'none';
		if (this.stackup) this.stackup.style.display = 'none';
	},
	
	sync: function (el) {
		if (!zk(el).isVisible(true)) {
			this.hide();
			return;
		}

		if (this.mask.nextSibling != el) {
			var p = el.parentNode;
			p.insertBefore(this.mask, el);
			if (this.stackup)
				p.insertBefore(this.stackup, this.mask);
		}

		var st = this.mask.style;
		st.display = 'block';
		st.zIndex = el.style.zIndex;

		_syncMaskPos.call(this, true);

		if (this.stackup) {
			st = this.stackup.style;
			st.display = 'block';
			st.zIndex = el.style.zIndex;
		}
	}
});

 
zk.eff.Mask = zk.$extends(zk.Object, {
	
	$init: function(opts) {
		opts = opts || {};
		var $anchor = zk(opts.anchor);
		
		if (!$anchor.jq.length || !$anchor.isRealVisible(true)) return; 
		
		this._opts = opts;
		
		var maskId = opts.id || 'z_applymask',
			progbox = jq(maskId, zk)[0];
		
		if (progbox) return this;
		
		var msg = opts.message || ((window.msgzk?msgzk.LOADING:"Loading")+'...'),
			n = document.createElement("div");
		
		document.body.appendChild(n);
		var xy = opts.offset || $anchor.revisedOffset(), 
			w = opts.width || $anchor.offsetWidth(),
			h = opts.height || $anchor.offsetHeight();
		jq(n).replaceWith(
		'<div id="'+maskId+'" style="visibility:hidden">' 
		+ '<div class="z-apply-mask" style="display:block;top:' + xy[1]
		+ 'px;left:' + xy[0] + 'px;width:' + w + 'px;height:' + h + 'px;"></div>'
		+ '<div id="'+maskId+'-z_loading" class="z-apply-loading"><div class="z-apply-loading-indicator">'
		+ '<span class="z-apply-loading-icon"></span> '
		+ msg+ '</div></div></div>');
		
		this.mask = jq(maskId, zk)[0];
		this.wgt = zk.Widget.$(opts.anchor);
		if (this.wgt) {
			zWatch.listen( {
				onShow: [
					this.wgt, this.onShow
				],
				onHide: [
					this.wgt, this.onHide
				],
				onSize: [
					this.wgt, this.onSize
				]
			});
			this.wgt.__mask = this;
		}
		
		this.sync();
	},
	
	hide: function () {
		this.mask.style.display = 'none';
	},
	onHide: function () {
		this.__mask.hide();
	}, 
	
	sync: function () {
		var $anchor = zk(this._opts.anchor);
		
		if (!$anchor.isVisible(true)) {
			this.hide();
			return;
		}
		
		var opts = this._opts,
			st = this.mask.firstChild.style,
			xy = opts.offset || $anchor.revisedOffset(), 
			w = opts.width || $anchor.offsetWidth(),
			h = opts.height || $anchor.offsetHeight();

		st.top = jq.px(xy[1]);
		st.left = jq.px(xy[0]);
		st.width = jq.px(w);
		st.height = jq.px(h);
		
		var zi = $anchor.jq.css('position') == 'absolute' ?
				$anchor.jq.css('z-index') : $anchor.jq.offsetParent().css('z-index');
		
		if (zk.ie && !zk.ie8)
			zi = zi == 0 ? 1 : zi;
			
		st.zIndex = zi;
		this.mask.lastChild.style.zIndex = zi;
		
		this.mask.style.display = 'block';
		
		var loading = jq(this.mask.id+"-z_loading", zk)[0];
		if (loading) {
			if (loading.offsetHeight > h) 
				loading.style.height = jq.px0(zk(loading).revisedHeight(h));
			if (loading.offsetWidth > w)
				loading.style.width = jq.px0(zk(loading).revisedWidth(w));
			loading.style.top = jq.px0(xy[1] + ((h - loading.offsetHeight) /2)); 
			loading.style.left = jq.px0(xy[0] + ((w - loading.offsetWidth) /2));
		}
		
		this.mask.style.visibility = "";
	},
	onSize: _zkf = function () {
		this.__mask.sync();
	},
	onShow: _zkf,
	
	destroy: function () {
		jq(this.mask).remove();
		if (this.wgt) {
			zWatch.unlisten({onShow: [this.wgt, this.onShow],
			      			 onHide: [this.wgt, this.onHide],
			      			onSize: [this.wgt, this.onSize]});
			delete this.wgt.__mask;
		}
		this.mask = this.wgt = null;
	}
});


zk.eff.Actions = {
	
	slideDown: function (n, opts) {
		zk(n).slideDown(this, opts);
	},
	
	slideUp: function (n, opts) {
		zk(n).slideUp(this, opts);
	},
	
	slideIn: function (n, opts) {
		zk(n).slideIn(this, opts);
	},
	
	slideOut: function (n, opts) {
		zk(n).slideOut(this, opts);
	}
};

jq(function() {
	
	var _lastFloat, _autohideCnt = 0, _callback;

	function _onFloatUp(ctl) {
		var wgt = ctl.origin;
		++_autohideCnt;
		setTimeout(function () {
			if (!--_autohideCnt) {
				if (wgt)
					wgt = wgt.getTopWidget();
				if (wgt != _lastFloat) {
					_lastFloat = wgt
					zk._wgtutl.autohide(); 
				}
			}
		}, 120); 
	}
	function _autohide() {
		_lastFloat = false; 
		++_autohideCnt;
		setTimeout(function () {
			if (!--_autohideCnt)
				zk._wgtutl.autohide();
		}, 100); 
	}

	_useSKU = zk.useStackup;
	if (_useSKU == "auto" || (_callback = _useSKU == "auto/gecko")) {
		if (zk.gecko && _callback)
			_useSKU = false;
		else {
			_callback = zk.safari || zk.opera;
			_useSKU = !_callback || zk.ie6_;
		}
	} else if (_useSKU == null)
		_useSKU = zk.ie6_;

	if (_callback) {
		var w2hide = function (name) {
			if (name == 'onSize' || name == 'onMove'
			|| name == 'onShow' || name == 'onHide'
			|| name == 'onResponse')
				_autohide();
		};
		zk.override(zWatch, _callback = {}, {
			fire: function (name) {
				_callback.fire.apply(this, arguments);
				w2hide(name);
			},
			fireDown: function (name) {
				_callback.fireDown.apply(this, arguments);
				w2hide(name);
			}
		});
		zWatch.listen({onFloatUp: ['', _onFloatUp]});
	}
}); 

})();



zk.BigDecimal = zk.$extends(zk.Object, {
	_precision: 0,
	$define: {
		
		
		precision: null
	},
	
	$init: function (value) {
		value = value ? '' + value: '0';
		var jdot = -1;
		for (var j = 0, len = value.length; j < len; ++j) {
			var cc = value.charAt(j);
			if (((cc < '0' || cc > '9') && cc != '-' && cc != '+') || 
				(j && (cc == '-' || cc == '+')))
				if (jdot < 0 && cc == '.') {
					jdot = j;
				} else {
					value = value.substring(0, j);
					break;
				}
		}
		if (jdot >= 0) {
			value = value.substring(0, jdot) + value.substring(jdot + 1);
			this._precision = value.length - jdot;
			this._dot = true;
		}
		this._value = value;
	},
	
	$toString: function() { 
		if (this._value.length == 0) return ''; 
		var j = this._value.length - this._precision,
			valFixed = '';
		if (j < 0)
			for(var len = -j; len-- > 0;)
				valFixed += '0';
		return this._value.substring(0, j) + (this._dot || this._precision ? '.' + valFixed + this._value.substring(j) : '');
	},
	
	$toLocaleString: function() { 
		if (this._value.length == 0) return ''; 
		var j = this._value.length - this._precision;
		if (j <= 0) {
			var valFixed = '';
			for(var len = -j; len-- > 0;)
				valFixed += '0';
			return '0' + (this._precision ? zk.DECIMAL + valFixed + this._value : '');
		}
		return this._value.substring(0, j) + (this._precision ? zk.DECIMAL + this._value.substring(j) : '');
	}
});


zk.Long = zk.$extends(zk.Object, {
	_precision: 0,
	$define: {
		
		
		precision: null
	},
	
	$init: function (value) {
	
	
	
		value = value ? '' + value: '0';
		var len = value.length;
		for (var j = 0; j < len; ++j) {
			var cc = value.charAt(j);
			if ((cc < '0' || cc > '9') && (j > 0 || (cc != '-' && cc != '+'))) {
				value = value.substring(0, j);
				break;
			}
		}
		if(len == 1) {
			var c = value.charAt(0);
			if(cc < '0' || cc > '9')
				value = 'NaN';
		}
		this._value = value;
	},
	
	$toString: zkf = function() { 
		if (this._value.length == 0) return ''; 
		var j = this._value.length - this._precision;
		return j <= 0 ? 0: this._value.substring(0, j);
	},
	
	$toLocaleString: zkf
});


(function () {
	var _decs = {lt: '<', gt: '>', amp: '&', quot: '"'},
		_encs = {};
	for (var v in _decs)
		_encs[_decs[v]] = v;

	function _pathname(url) {
		var j = url.indexOf("//");
		if (j > 0) {
			j = url.indexOf("/", j + 2);
			if (j > 0) return url.substring(j);
		}
	}

	function _frames(ary, w) {
		
		ary.push(w);
		for (var fs = w.frames, j = 0, l = fs.length; j < l; ++j)
			_frames(ary, fs[j]);
	}


zUtl = { 
	
    
	isChar: function (cc, opts) {
		return (opts.digit && cc >= '0' && cc <= '9')
			|| (opts.upper && cc >= 'A' && cc <= 'Z')
			|| (opts.lower && cc >= 'a' && cc <= 'z')
			|| (opts.whitespace && (cc == ' ' || cc == '\t' || cc == '\n' || cc == '\r'))
			|| opts[cc];
	},

	
	
	parseMap: function (text, separator, quote) {
		var map = {};
		if (text) {
			var ps = text.split(separator || ',');
			if (quote) {
				var tmp = [],
					re = new RegExp(quote, 'g'),
					key = '', t, pair;
				while((t = ps.shift()) !== undefined) {
					if ((pair = (key += t).match(re)) && pair.length != 1) {
						if (key)
							tmp.push(key);
						key = '';
					} else
						key += separator;
				}
				ps = tmp;
			}
			for (var len = ps.length; len--;) {
				var key = ps[len].trim(),
					index = key.indexOf('=');
				if (index != -1)
					map[key.substring(0, index)] = key.substring(index + 1, key.length).trim();
			}
		}
		return map;
	},

	
	encodeXML: function (txt, opts) {
		txt = txt != null ? String(txt):'';
		var tl = txt.length,
			pre = opts && opts.pre,
			multiline = pre || (opts && opts.multiline),
			maxlength = opts ? opts.maxlength : 0;

		if (!multiline && maxlength && tl > maxlength) {
			var j = maxlength;
			while (j > 0 && txt.charAt(j - 1) == ' ')
				--j;
			opts.maxlength = 0; 
			return zUtl.encodeXML(txt.substring(0, j) + '...', opts);
		}

		var out = [], k = 0, enc;
		if (multiline || pre)
			for (var j = 0; j < tl; ++j) {
				var cc = txt.charAt(j);
				if (enc = _encs[cc]) {
					out.push(txt.substring(k, j), '&', enc, ';');
					k = j + 1;
				} else if (multiline && cc == '\n') {
					out.push(txt.substring(k, j), "<br/>\n");
					k = j + 1;
				} else if (pre && (cc == ' ' || cc == '\t')) {
					out.push(txt.substring(k, j), "&nbsp;");
					if (cc == '\t')
						out.push("&nbsp;&nbsp;&nbsp;");
					k = j + 1;
				}
			}
		else
			for (var j = 0; j < tl; ++j)
				if (enc = _encs[txt.charAt(j)]) {
					out.push(txt.substring(k, j), '&', enc, ';');
					k = j + 1;
				}

		if (!k) return txt;
		if (k < tl)
			out.push(txt.substring(k));
		return out.join('');
	},
	
	decodeXML: function (txt) {
		var out = "";
		if (!txt) return out;

		var k = 0, tl = txt.length;
		for (var j = 0; j < tl; ++j) {
			var cc = txt.charAt(j);
			if (cc == '&') {
				var l = txt.indexOf(';', j + 1);
				if (l >= 0) {
					var dec = txt.charAt(j + 1) == '#' ?
						String.fromCharCode(txt.charAt(j + 2).toLowerCase() == 'x' ?
							parseInt(txt.substring(j + 3, l), 16):
							parseInt(txt.substring(j + 2, l), 10)):
						_decs[txt.substring(j + 1, l)];
					if (dec) {
						out += txt.substring(k, j) + dec;
						k = (j = l) + 1;
					}
				}
			}
		}
		return !k ? txt:
			k < tl ? out + txt.substring(k): out;
	},

	
 	cellps0: ' cellpadding="0" cellspacing="0" border="0"',
 	
 	img0: '<img style="height:0;width:0"/>',
 	
 	i0: '<i style="height:0;width:0"/>',
 
 	
	now: jq.now,
	
	
	today: function (fmt) {
		var d = new Date(), hr = 0, min = 0, sec = 0, msec = 0;
		if (typeof fmt == "string") {
			var fmt0 = fmt.toLowerCase();
			if (fmt0.indexOf('h') >= 0 || fmt0.indexOf('k') >= 0) hr = d.getHours();
			if (fmt.indexOf('m') >= 0) min = d.getMinutes();
			if (fmt.indexOf('s') >= 0) sec = d.getSeconds();
			if (fmt.indexOf('S') >= 0) msec = d.getMilliseconds();
		} else if (fmt)
			return d;
		return new Date(d.getFullYear(), d.getMonth(), d.getDate(),
			hr, min, sec, msec);
	},

	
	isAncestor: function (p, c) {
		if (!p) return true;
		for (; c; c = c.getParent ? c.getParent(): c.parent)
			if (p == c)
				return true;
		return false;
	},

	
	
	progressbox: function (id, msg, mask, icon, _opts) {
		if (mask && zk.Page.contained.length) {
			for (var c = zk.Page.contained.length, e = zk.Page.contained[--c]; e; e = zk.Page.contained[--c]) {
				if (!e._applyMask)
					e._applyMask = new zk.eff.Mask({
						id: e.uuid + "-mask",
						message: msg,
						anchor: e.$n()
					});
			}
			return;
		}

		if (_opts && _opts.busy) {
			zk.busy++;
			jq.focusOut(); 
		}

		var x = jq.innerX(), y = jq.innerY(),
			style = ' style="left:'+x+'px;top:'+y+'px"',
			idtxt = id + '-t',
			idmsk = id + '-m',
			html = '<div id="'+id+'"';
		if (mask)
			html += '><div id="' + idmsk + '" class="z-modal-mask"'+style+'></div';
		html += '><div id="'+idtxt+'" class="z-loading"'+style
			+'><div class="z-loading-indicator"><span class="z-loading-icon"></span> '
			+msg+'</div></div>';
		if (icon)
			html += '<div class="' + icon + '"></div>';
		jq(document.body).append(html + '</div>');

		var $n = jq(id, zk),
			n = $n[0],
			$txt = jq(idtxt, zk),
			txt = $txt[0],
			st = txt.style;
		if (mask)
			n.z_mask = new zk.eff.FullMask({
				mask: jq(idmsk, zk)[0],
				zIndex: $txt.css('z-index') - 1
			});

		if (mask && $txt.length) { 
			st.left = jq.px((jq.innerWidth() - txt.offsetWidth) / 2 + x);
			st.top = jq.px((jq.innerHeight() - txt.offsetHeight) / 2 + y);
		} else {
			var pos = zk.progPos;
			if (pos) {
				var left,
					top,
					width = jq.innerWidth(),
					height = jq.innerHeight(),
					wdgap = width - zk(txt).offsetWidth(),
					hghgap = height - zk(txt).offsetHeight();

				if (pos.indexOf("mouse") >= 0) {
					var offset = zk.currentPointer;
					left = offset[0] + 10;
					top = offset[1] + 10;
				} else {
					if (pos.indexOf("left") >= 0) left = x;
					else if (pos.indexOf("right") >= 0)	left = x + wdgap -1;
					else if (pos.indexOf("center") >= 0) left = x + wdgap / 2;
					else left = 0;
					
					if (pos.indexOf("top") >= 0) top = y;
					else if (pos.indexOf("bottom") >= 0) top = y + hghgap - 1;
					else if (pos.indexOf("center") >= 0) top = y + hghgap / 2;
					else top = 0;
					
					left = left < x ? x : left;
					top = top < y ? y : top;
				}
				st.left = jq.px(left);
				st.top = jq.px(top);
			}
		}

		$n.zk.cleanVisibility();
	},
	
	destroyProgressbox: function (id, _opts) {
		if (_opts && _opts.busy && --zk.busy < 0)
			zk.busy = 0;
		var $n = jq(id, zk), n;
		if ($n.length) {
			if (n = $n[0].z_mask) n.destroy();
			$n.remove();
		}

		for (var c = zk.Page.contained.length, e = zk.Page.contained[--c]; e; e = zk.Page.contained[--c])
			if (e._applyMask) {
				e._applyMask.destroy();
				e._applyMask = null;
			}
	},

	
	
	go: function (url, opts) {
		opts = opts || {};
		if (opts.target) {
			open(url, opts.target);
		} else if (opts.overwrite) {
			location.replace(url ? url: location.href);
		} else {
			if (url) {
				location.href = url;

				if (!opts.reload)
					return;

				var j = url.indexOf('#'),
					un = j >= 0 ? url.substring(0, j): url,
					pn = _pathname(location.href);
				j = pn.indexOf('#');
				if (j >= 0) pn = pn.substring(0, j);
				if (pn != un)
					return;
				
			}
			location.reload();
		}
	},

	
	frames: function (w) {
		var ary = [];
		_frames(ary, w);
		return ary;
	},

	
	intsToString: function (ary) {
		if (!ary) return "";

		var sb = [];
		for (var j = 0, k = ary.length; j < k; ++j)
			sb.push(ary[j]);
		return sb.join();
	},
	
	stringToInts: function (text, defaultValue) {
		if (text == null)
			return null;

		var list = [];
		for (var j = 0;;) {
			var k = text.indexOf(',', j),
				s = (k >= 0 ? text.substring(j, k): text.substring(j)).trim();
			if (s.length == 0) {
				if (k < 0) break;
				list.push(defaultValue);
			} else
				list.push(zk.parseInt(s));

			if (k < 0) break;
			j = k + 1;
		}
		return list;
	},
	
	mapToString: function (map, assign, separator) {
		assign = assign || '=';
		separator = separator || ' ';
		var out = [];
		for (var v in map)
			out.push(separator, v, assign, map[v]);
		out[0] = '';
		return out.join('');
	},
	
	
	appendAttr: function (nm, val, force)  {
		return val || force ? ' ' + nm + '="' + val + '"': "";
	}
};
})();



zk.Event = zk.$extends(zk.Object, {
	
	
	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	

	
	$init: function (target, name, data, opts, domEvent) {
		this.currentTarget = this.target = target;
		this.name = name;
		this.data = data;
		if (data && typeof data == 'object' && !jq.isArray(data))
			zk.$default(this, data);

		this.opts = opts||{rtags:{}};
		if (this.domEvent = domEvent)
			this.domTarget = domEvent.target;
	},
	
	addOptions: function (opts) {
		this.opts = zk.copy(this.opts, opts);
	},
	
	stop: function (opts) {
		var b = !opts || !opts.revoke;
		if (!opts || opts.propagation) this.stopped = b;
		if (!opts || opts.dom) this.domStopped = b;
		if (opts && opts.au) this.auStopped = b;
	}
});

zWatch = (function () {
	var _visiEvts = {onSize: true, onShow: true, onHide: true, beforeSize: true},
		_watches = {}, 
		_dirty,
		_Gun = zk.$extends(zk.Object, {
			$init: function (name, xinfs, args, org) {
				this.name = name;
				this.xinfs = xinfs;
				this.args = args;
				this.origin = org;
			},
			fire: function (ref) {
				var infs, inf, xinf,
					name = this.name,
					xinfs = this.xinfs,
					args = this.args;
				if (ref) {
					for (var j = 0, l = xinfs.length; j < l; ++j)
						if (xinfs[j][0] == ref) {
							infs = xinfs[j][1]
							xinfs.splice(j--, 1);
							--l;
							_invoke(name, infs, ref, args);
						}
				} else
					while (xinf = xinfs.shift())
						_invoke(name, xinf[1], xinf[0], args);
			},
			fireDown: function (ref) {
				if (!ref || ref.bindLevel == null)
					this.fire(ref);

				(new _Gun(this.name, _visiChildSubset(this.name, this.xinfs, ref, true), this.args, this.origin))
				.fire();
			}
		});

	function _invoke(name, infs, o, args) {
		for (var j = 0, l = infs.length; j < l;)
			_fn(infs[j++], o, name).apply(o, args);
	}
	
	function _visible(name, c) {
		return c.isWatchable_ && c.isWatchable_(name); 
	}
	
	function _visibleChild(name, p, c) {
		var cp = c;
		for (; cp; cp = cp.parent)
			if (p == cp) return _visible(name, c);
		return false;
	}
	
	function _visiChildSubset(name, xinfs, p, remove) {
		var found = [], bindLevel = p.bindLevel;
		for (var j = xinfs.length; j--;) { 
			var xinf = xinfs[j],
				o = xinf[0],
				diff = bindLevel > o.bindLevel;
			if (diff) break;
			if ((p == o && _visible(name, o)) || _visibleChild(name, p, o)) {
				if (remove)
					xinfs.splice(j, 1);
				found.unshift(xinf); 
			}
		}
		return found;
	}
	function _visiSubset(name, xinfs) {
		xinfs = xinfs.$clone(); 
		if (_visiEvts[name])
			for (var j = xinfs.length; j--;)
				if (!_visible(name, xinfs[j][0]))
					xinfs.splice(j, 1);
		return xinfs;
	}
	function _target(inf) {
		return jq.isArray(inf) ? inf[0]: inf;
	}
	function _fn(inf, o, name) {
		var fn = jq.isArray(inf) ? inf[1]: o[name];
		if (!fn)
			throw (o.className || o) + ':' + name + " not found";
		return fn;
	}
	function _sync() {
		if (!_dirty) return;

		_dirty = false;
		for (var nm in _watches) {
			var wts = _watches[nm];
			if (wts.length && wts[0][0].bindLevel != null)
				wts.sort(_cmpLevel);
		}
	}
	function _bindLevel(a) {
		return (a = a.bindLevel) == null || isNaN(a) ? -1: a;
	}
	function _cmpLevel(a, b) {
		return _bindLevel(a[0]) - _bindLevel(b[0]);
	}
	function _zsync(name, org) {
		if (name == 'onSize' || name == 'onShow' || name == 'onHide')
			jq.zsync(org);
	}
	function _fire(name, org, opts, vararg) {
		var wts = _watches[name];
		if (wts && wts.length) {
			var down = opts && opts.down && org.bindLevel != null;
			if (down) _sync();

			var args = [],
				gun = new _Gun(name,
					down ? _visiChildSubset(name, wts, org): _visiSubset(name, wts),
					args, org);
			args.push(gun);
			for (var j = 2, l = vararg.length; j < l;) 
				args.push(vararg[j++]);

			if (opts && opts.timeout >= 0)
				setTimeout(function () {gun.fire();_zsync(name, org);}, opts.timeout);
			else {
				gun.fire();
				_zsync(name, org);
			}
		} else
			_zsync(name, org);
	}


  return {
  	
	listen: function (infs) {
		for (var name in infs) {
			var wts = _watches[name],
				inf = infs[name],
				o = _target(inf),
				xinf = [o, [inf]];
			if (wts) {
				var bindLevel = o.bindLevel;
				if (bindLevel != null)
					for (var j = wts.length;;) {
						if (--j < 0) {
							wts.unshift(xinf);
							break;
						}
						if (wts[j][0] == o) {
							wts[j][1].push(inf);
							break;
						}
						if (bindLevel >= wts[j][0].bindLevel) { 
							wts.splice(j + 1, 0, xinf);
							break;
						}
					}
				else
					for (var j = wts.length;;) {
						if (--j < 0) {
							wts.push(xinf);
							break;
						}
						if (wts[j][0] == o) {
							wts[j][1].push(inf);
							break;
						}
					}
			} else
				_watches[name] = [xinf];
		}
	},
	
	unlisten: function (infs) {
		for (var name in infs) {
			var wts = _watches[name];
			if (wts) {
				var inf = infs[name],
					o = _target(inf);
				for (var j = wts.length; j--;)
					if (wts[j][0] == o) {
						wts[j][1].$remove(inf);
						if (!wts[j][1].length)
							wts.splice(j, 1);
						break;
					}
			}
		}
	},
	
	unlistenAll: function (name) {
		delete _watches[name];
	},
	
	fire: function (name, org, opts) {
		_fire(name, org, opts, arguments);
	},
	
	fireDown: function (name, org, opts) {
		_fire(name, org, zk.copy(opts,{down:true}), arguments);
	},
	onBindLevelMove: function () { 
		_dirty = true;
	}
  };
})();
zWatch.listen({onBindLevelMove: zWatch});


(function () {
	var _binds = {}, 
		_globals = {}, 
		_floatings = [], 
		_nextUuid = 0,
		_domevtfnm = {}, 
		_domevtnm = {onDoubleClick: 'dblclick'}, 
		_wgtcls = {}, 
		_hidden = [], 
		_noChildCallback, _noParentCallback, 
		_syncdt = jq.now() + 60000, 
		_rdque = [], _rdtid, 
		_ignCanActivate; 

	
	function _isProlog(el) {
		var txt;
		return el && el.nodeType == 3 
			&& (txt=el.nodeValue) && !txt.trim().length;
	}

	
	function _domEvtInf(wgt, evtnm, fn) { 
		if (typeof fn != "function") {
			if (!fn && !(fn = _domevtfnm[evtnm]))
				_domevtfnm[evtnm] = fn = '_do' + evtnm.substring(2);

			var f = wgt[fn];
			if (!f)
				throw 'Listener ' + fn + ' not found in ' + wgt.className;
			fn = f;
		}

		var domn = _domevtnm[evtnm];
		if (!domn)
			domn = _domevtnm[evtnm] = evtnm.substring(2).toLowerCase();
		return [domn, _domEvtProxy(wgt, fn)];
	}
	function _domEvtProxy(wgt, f) {
		var fps = wgt._$evproxs, fp;
		if (!fps) wgt._$evproxs = fps = {};
		else if (fp = fps[f]) return fp;
		return fps[f] = _domEvtProxy0(wgt, f);
	}
	function _domEvtProxy0(wgt, f) {
		return function (devt) {
			var args = [], evt;
			for (var j = arguments.length; --j > 0;)
				args.unshift(arguments[j]);
			args.unshift(evt = jq.Event.zk(devt, wgt));

			switch (devt.type){
			case 'focus':
				if (wgt.canActivate()) {
					zk.currentFocus = wgt;
					zWatch.fire('onFloatUp', wgt); 
					break;
				}
				return; 
			case 'blur':
				
				
				if (!zk._cfByMD) zk.currentFocus = null;
				break;
			case 'click':
			case 'dblclick':
			case 'mouseup': 
				if (zk.Draggable.ignoreClick())
					return;
			}

			var ret = f.apply(wgt, args);
			if (ret === undefined) ret = evt.returnValue;
			if (evt.domStopped) devt.stop();
			return devt.type == 'dblclick' && ret === undefined ? false: ret;
		};
	}

	function _unlink(wgt, child) {
		var p = child.previousSibling, n = child.nextSibling;
		if (p) p.nextSibling = n;
		else wgt.firstChild = n;
		if (n) n.previousSibling = p;
		else wgt.lastChild = p;
		child.nextSibling = child.previousSibling = child.parent = null;

		--wgt.nChildren;
	}
	
	function _replaceLink(from, to) {
		var p = to.parent = from.parent,
			q = to.previousSibling = from.previousSibling;
		if (q) q.nextSibling = to;
		else if (p) p.firstChild = to;

		q = to.nextSibling = from.nextSibling;
		if (q) q.previousSibling = to;
		else if (p) p.lastChild = to;
	}

	function _bind0(wgt) {
		_binds[wgt.uuid] = wgt;
		if (wgt.id)
			_addGlobal(wgt);
	}
	function _unbind0(wgt) {
		if (wgt.id)
			_rmGlobal(wgt);
		delete _binds[wgt.uuid];
		wgt.desktop = null;
		wgt.clearCache();
	}
	function _bindrod(wgt) {
		_bind0(wgt);
		if (!wgt.z_rod)
			wgt.z_rod = 9; 

		for (var child = wgt.firstChild; child; child = child.nextSibling)
			_bindrod(child);
	}
	function _unbindrod(wgt, nest) {
		_unbind0(wgt);

		if (!nest || wgt.z_rod === 9) { 
			delete wgt.z_rod;

			for (var child = wgt.firstChild; child; child = child.nextSibling)
				_unbindrod(child, true);
		}
	}

	function _fixBindLevel(wgt, v) {
		wgt.bindLevel = v++;
		for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
			_fixBindLevel(wgt, v);
	}

	function _addIdSpace(wgt) {
		if (wgt._fellows) wgt._fellows[wgt.id] = wgt;
		var p = wgt.parent;
		if (p) {
			p = p.$o();
			if (p) p._fellows[wgt.id] = wgt;
		}
	}
	function _rmIdSpace(wgt) {
		if (wgt._fellows) delete wgt._fellows[wgt.id];
		var p = wgt.parent;
		if (p) {
			p = p.$o();
			if (p) delete p._fellows[wgt.id];
		}
	}
	function _addIdSpaceDown(wgt) {
		var ow = wgt.parent;
		ow = ow ? ow.$o(): null;
		if (ow)
			_addIdSpaceDown0(wgt, ow);
	}
	function _addIdSpaceDown0(wgt, owner) {
		if (wgt.id) owner._fellows[wgt.id] = wgt;
		if (!wgt._fellows)
			for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
				_addIdSpaceDown0(wgt, owner);
	}
	function _rmIdSpaceDown(wgt) {
		var ow = wgt.parent;
		ow = ow ? ow.$o(): null;
		if (ow)
			_rmIdSpaceDown0(wgt, ow);
	}
	function _rmIdSpaceDown0(wgt, owner) {
		if (wgt.id)
			delete owner._fellows[wgt.id];
		if (!wgt._fellows)
			for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
				_rmIdSpaceDown0(wgt, owner);
	}
	
	function _addGlobal(wgt) {
		var gs = _globals[wgt.id];
		if (gs)
			gs.push(wgt);
		else
			_globals[wgt.id] = [wgt];
	}
	function _rmGlobal(wgt) {
		var gs = _globals[wgt.id];
		if (gs) {
			gs.$remove(wgt);
			if (!gs.length) delete _globals[wgt.id];
		}
	}
	function _fireClick(wgt, evt) {
		if (!wgt.shallIgnoreClick_(evt) && 
			!wgt.fireX(evt).stopped && evt.shallStop) {
			evt.stop();
			return false;	
		}
		return !evt.stopped;
	}

	function _rmDom(wgt, n) {
		
		
		
		var act;
		if (wgt._visible && (act = wgt.actions_["hide"])) {
			wgt._rmAftAnm = function () {
				jq(n).remove();
			};
			n.style.visibility = ""; 
			act[0].call(wgt, n, act[1]);
		} else
			jq(n).remove();
	}

	
	
	function _dragCtl(wgt, invoke) {
		var p;
		return wgt && (p = wgt.parent) && p.dragControl && (!invoke || p.dragControl(wgt));
	}

	
	function _bkFocus(wgt) {
		var cf = zk.currentFocus;
		if (cf && zUtl.isAncestor(wgt, cf)) {
			zk.currentFocus = null;
			return cf;
		}
	}
	
	function _rsFocus(cf) {
		if (cf && cf.desktop && !zk.currentFocus) {
			_ignCanActivate = true;
				
			try {
				cf.focus();
			} finally {
				_ignCanActivate = false;
			}
		}
	}

	
	function _fixMinFlex(wgtn, o) {
		var min = this.beforeMinFlex_(o);
		
		if (o == 'h') {
			if (this._vflexsz === undefined) { 
				var cwgt = this.firstChild, 
					n = wgtn,
					zkn = zk(n),
					max = 0,
					precalc = false;
				if (min != null)
					max = min;
				else {
					this.setFlexSize_({height:'auto'});
					var totalsz = 0,
						vmax = 0;
					if (cwgt){ 
						for (; cwgt; cwgt = cwgt.nextSibling) { 
							if (!cwgt.ignoreFlexSize_('h')) {
								var c = cwgt.$n();
								if (c) { 
									n = c.parentNode; 
									zkn = zk(n);
									var ntop = n.offsetTop,
										noffParent = n.offsetParent,
										tp = zkn.sumStyles("t", jq.paddings), 
										tbp = tp + zkn.sumStyles("t", jq.borders),
										
										zkc = zk(c),
										sameOffParent = c.offsetParent == noffParent,
										sz = cwgt._ignoreOffsetTop ? tbp : (c.offsetTop - (sameOffParent ? ntop + tbp : tp)); 
									if (cwgt._vflex == 'min') {
										if (zkc.isVisible()) {
											sz += cwgt._vflexsz === undefined ? _fixMinFlex.apply(cwgt, [c, o]) : cwgt._vflexsz;
											var tm = zkc.sumStyles("t", jq.margins);
											if (!zk.safari || tm >= 0)
												sz -= tm;
										} else
											sz += cwgt._vflexsz === undefined ? 0 : cwgt._vflexsz;
									} else {
										cwgt.beforeParentMinFlex_(o);
										sz += c.offsetHeight;
										var bm = zkc.sumStyles("b", jq.margins);
										if (!zk.safari || bm >= 0)
											sz += bm;
									}
									
									if (cwgt._maxFlexHeight && sz > vmax) 
										vmax = sz;
									else if (cwgt._sumFlexHeight) 
										totalsz += sz;
									else if (sz > max)
										max = sz;
								}
							}
						}
					} else {
						var c = wgtn.firstChild;
						if (c) { 
							
							var ignore = this.ignoreChildNodeOffset_('h');
							for(; c; c = c.nextSibling) {
								n = c.parentNode;
								zkn = zk(n);
								var ntop = n.offsetTop,
									noffParent = n.offsetParent,
									tp = zkn.sumStyles("t", jq.paddings),
									tbp = tp + zkn.sumStyles("t", jq.borders),
									zkc = zk(c),
									sz = 0;
								if (ignore) {
									var el = c.firstChild;
									for(; el; el = el.nextSibling) {
										var txt = el && el.nodeType == 3 ? el.nodeValue : null;
										if (txt) {
											var dim = zkc.textSize(txt);
											sz = dim[1]; 
											if (sz > max)
												max = sz;
										}
									}
								} else {
									var sameOffParent = c.offsetParent == noffParent;
									sz = c.offsetHeight + c.offsetTop - (sameOffParent ? ntop + tbp : tp);
								}
								if(c.nodeType != 3) {
									var bm = zkc.sumStyles(ignore ? "tb" : "b", jq.margins);
									if (!zk.safari || bm >= 0)
										sz += bm;
								}
								if (sz > max)
									max = sz;
							}
						} else 
							max = n.offsetHeight - zkn.padBorderHeight();
					}
					if (vmax)
						totalsz += vmax;
					if (totalsz > max)
						max = totalsz;
				}
				
				var pb = 0, body = document.body;
				while (n && n != body && n != wgtn) { 
					if (!precalc)
						pb += zkn.padBorderHeight();
					else {
						pb += zkn.sumStyles("b", jq.paddings);
						pb += zkn.sumStyles("b", jq.borders);
					}
					var p = n.parentNode,
						ptop = p ? p.offsetTop : 0,
						poffParent = p ? p.offsetParent : null;
					precalc = n.offsetParent == poffParent; 
					pb += n.offsetTop;
					if (precalc)
						pb -= ptop;
					var bm = zkn.sumStyles("b", jq.margins);
					if (!zk.safari || bm >=0)
						pb += bm;
					n = p;
					zkn = zk(n);
				}
				if (!precalc)
					pb += zkn.padBorderHeight();
				else {
					pb += zkn.sumStyles("b", jq.paddings);
					pb += zkn.sumStyles("b", jq.borders);
				}
				var margin = zk(wgtn).sumStyles("tb", jq.margins);
				if (zk.safari && margin < 0) 
					margin = 0;
				sz = this.setFlexSize_({height:(max + pb + margin)});
				if (sz && sz.height >= 0)
					this._vflexsz = sz.height + margin;
				this.afterChildrenMinFlex_('h');
			}
			return this._vflexsz;
			
		} else if (o == 'w') {
			if (this._hflexsz === undefined) { 
				var cwgt = this.firstChild, 
					n = wgtn,
					zkn = zk(n),
					max = 0,
					precalc = false;
				if (min != null)
					max = min;
				else {
					this.setFlexSize_({width:'auto'});
					var totalsz = 0;
					if (cwgt) { 
						for (; cwgt; cwgt = cwgt.nextSibling) { 
							if (!cwgt.ignoreFlexSize_('w')) {
								var c = cwgt.$n();
								if (c) { 
									n = c.parentNode; 
									zkn = zk(n);
									var	nleft = n.offsetLeft,
										noffParent = n.offsetParent,
										lp = zkn.sumStyles("l", jq.paddings), 
										lbp = lp + zkn.sumStyles("l", jq.borders), 
										
										zkc = zk(c),
										sameOffParent = c.offsetParent == noffParent,
										sz = c.offsetLeft - (sameOffParent ?  nleft + lbp: lp);
									if (cwgt._hflex == 'min') {
										if (zkc.isVisible()) {
											sz += cwgt._hflexsz === undefined ? _fixMinFlex.apply(cwgt, [c, o]) : cwgt._hflexsz;
											var lm = zkc.sumStyles("l", jq.margins);
											if (!zk.safari || lm >= 0)
												sz -= lm;
										} else
											sz += cwgt._hflexsz === undefined ? 0 : cwgt._hflexsz;
									} else {
										cwgt.beforeParentMinFlex_(o);
										sz += c.offsetWidth;
										var rm = zkc.sumStyles("r", jq.margins);
										if (!zk.safari || rm >= 0)
											sz += rm;
									}
									if (cwgt._sumFlexWidth) 
										totalsz += sz;
									else if (sz > max)
										max = sz;
								}
							}
						}
					} else {
						var c = wgtn.firstChild;
						if (c) { 
							
							var ignore = this.ignoreChildNodeOffset_('w');
							for(; c; c = c.nextSibling) {
								n = c.parentNode;
								zkn = zk(n);
								var	nleft = n.offsetLeft,
									noffParent = n.offsetParent,
									lp = zkn.sumStyles("l", jq.paddings),
									lbp = lp + zkn.sumStyles("l", jq.borders), 
									zkc = zk(c),
									sz = 0;
								if (ignore) {
									var el = c.firstChild;
									for(; el; el = el.nextSibling) {
										var txt = el && el.nodeType == 3 ? el.nodeValue : null;
										if (txt) {
											var dim = zkc.textSize(txt);
											sz = dim[0]; 
											if (sz > max)
												max = sz;
										}
									}
								} else {
									var	sameOffParent = c.offsetParent == noffParent;
									sz = c.offsetWidth + c.offsetLeft - (sameOffParent ? nleft + lbp : lp);
								}
								if(c.nodeType != 3) {
									var rm = zkc.sumStyles(ignore ? "lr" : "r", jq.margins);
									if (!zk.safari || rm >= 0)
										sz +=  rm;
								}
								if (sz > max)
									max = sz;
							}
						} else 
							max = n.offsetWidth - zkn.padBorderWidth();
					}
					if (totalsz > max)
						max = totalsz;
				}
				
				
				var pb = 0, body = document.body, oldFloat;
				while (n && n != body && n != wgtn) { 
					if (!precalc)
						pb += zkn.padBorderWidth();
					else {
						pb += zkn.sumStyles("r", jq.paddings);
						pb += zkn.sumStyles("r", jq.borders);
					}
					var p = n.parentNode,
						pleft = p ? p.offsetLeft : 0,
						poffParent = p ? p.offsetParent : null;
					precalc = n.offsetParent == poffParent; 
					pb += n.offsetLeft;
					if (precalc)
						pb -= pleft;
					
					
					
					if (zk.safari) { 
						oldFloat = n.style.cssFloat;
						n.style.cssFloat = 'left';
					}
					var rm = zkn.sumStyles("r", jq.margins);
					if (zk.safari)
						n.style.cssFloat = oldFloat;
					
					if (!zk.safari || rm >= 0)
						pb += rm; 
					n = p;
					zkn = zk(n);
				}
				if (!precalc)
					pb += zkn.padBorderWidth();
				else {
					pb += zkn.sumStyles("r", jq.paddings);
					pb += zkn.sumStyles("r", jq.borders);
				}
					
				
				
				var ignoreMargin = this._isIgnoreMargin && this._isIgnoreMargin(), 
					margin = ignoreMargin ? 0 : zk(wgtn).sumStyles("lr", jq.margins);
				if (zk.safari && margin < 0)
					margin = 0;
				var sz = this.setFlexSize_({width:(max + pb + margin)}, ignoreMargin);
				if (sz && sz.width >= 0)
					this._hflexsz = sz.width + margin;
				this.afterChildrenMinFlex_('w');
			}
			return this._hflexsz;
		} else
			return 0;
	}
	
	
	function _fixFlexX(ctl, opts, resize) {
		
		if ((this._vflex === undefined || (this._vflexsz && this._vflex == 'min'))
			&& (this._hflex === undefined || (this._hflexsz && this._hflex == 'min'))) 
			return;
		
		
		if (resize) {
			_fixFlex.apply(this);
			return;
		}
		
		
		var r1 = this, p1 = r1,
			j1 = -1;
		if (this._hflex == 'min' && this._hflexsz === undefined && !this.ignoreFlexSize_('w')) {
			++j1;
			while ((p1 = p1.parent) && p1._hflex == 'min') {
				delete p1._hflexsz;
				r1 = p1;
				++j1;
				if (p1.ignoreFlexSize_('w')) 
					break;
			}
		}
		var r2 = this, p2 = r2,
			j2 = -1;
		if (this._vflex == 'min' && this._vflexsz === undefined && !this.ignoreFlexSize_('h')) {
			++j2;
			while ((p2 = p2.parent) && p2._vflex == 'min') {
				delete p2._vflexsz;
				r2 = p2;
				++j2;
				if (p2.ignoreFlexSize_('h')) 
					break;
			}
		}
		if (j1 > 0 || j2 > 0)
			zWatch.fireDown('onSize', j1 > j2 ? r1 : r2, null, true); 
		else
			_fixFlex.apply(r2);

	}
	
	function _fixFlex() {
		
		if ((this._vflex === undefined || (this._vflexsz && this._vflex == 'min'))
			&& (this._hflex === undefined || (this._hflexsz && this._hflex == 'min'))) 
			return;
		
		if (!this.parent.beforeChildrenFlex_(this)) { 
			return;
		}
		
		if (this._flexFixed || (!this._nvflex && !this._nhflex)) { 
			delete this._flexFixed;
			return;
		}
		
		this._flexFixed = true;
		
		var pretxt = false, 
			prevflex = false, 
			prehflex = false, 
			vflexs = [],
			vflexsz = 0,
			hflexs = [],
			hflexsz = 0,
			p = this.$n().parentNode,
			zkp = zk(p),
			psz = this.getParentSize_(p),
			hgh = psz.height,
			wdh = psz.width,
			c = p.firstChild,
			scrWdh = jq.scrollbarWidth();
		
		
		
		if(wdh - p.clientWidth > 11)
			wdh -= scrWdh;
		
		if(hgh - p.clientHeight > 11)
			hgh -= scrWdh;
		
		for (; c; c = c.nextSibling)
			if (c.nodeType != 3) break; 
		
		
		var oldPos;
		if ((zk.ie6_ || zk.ie7_)&& jq.nodeName(p, 'div')) {
			oldPos = p.style.position;
			p.style.position = 'relative';
		}
		var ptop = p.offsetTop,
			pleft = p.offsetLeft,
			tp = zkp.sumStyles("t", jq.paddings), 
			tbp = zkp.sumStyles('t', jq.borders) + tp,
			lp = zkp.sumStyles("l", jq.paddings), 
			lbp = zkp.sumStyles('l', jq.borders) + lp, 
			segTop = 0,
			segLeft = 0,
			segBottom = segTop,
			segRight = segLeft,
			zkpOffsets = zk(p).revisedOffset();

		for (; c; c = c.nextSibling) {
			var zkc = zk(c);
			if (zkc.isVisible()) {
				
				if (c.nodeType === 3) { 
					pretxt = true;
					prevflex = prehflex = false;
					continue;
				}
				var offhgh = zkc.offsetHeight(),
					offwdh = offhgh > 0 ? zkc.offsetWidth() : 0, 
					zkcOffsets = zkc.revisedOffset(),
					offTop = zkcOffsets[1] - zkpOffsets[1],
					offLeft = zkcOffsets[0] - zkpOffsets[0],
					marginRight = offLeft + offwdh + zkc.sumStyles("r", jq.margins),
					marginBottom = offTop + offhgh + zkc.sumStyles("b", jq.margins),
					cwgt = _binds[c.id];
				
				
				if (cwgt && cwgt._nhflex) {
					if (cwgt !== this)
						cwgt._flexFixed = true; 
					if (cwgt._hflex == 'min') {
						var minwdh = _fixMinFlex.apply(cwgt, [c, 'w']);
						if (cwgt._sumWidth)
							wdh -= minwdh;
						else {
							
							offLeft = zkc.revisedOffset()[0] - zkpOffsets[0];
							offwdh = zkc.offsetWidth();
							marginRight = offLeft + offwdh + zkc.sumStyles('r', jq.margins);
							segRight = Math.max(segRight, marginRight);
						}
						prehflex = false;
					} else {
						if (pretxt) {
							var txtmarginRight = offTop - zkc.sumStyles('l', jq.margins);
							segRight = Math.max(segRight, txtmarginRight);
						}
						if (!prehflex && segRight > segLeft) {
							wdh -= segRight - segLeft;
						}
						if (zk.ie8_ && c.offsetParent == p && jq.nodeName(p, "td")) 
							wdh -= offLeft * 2;
						segLeft = segRight = marginRight;
						
						hflexs.push(cwgt);
						hflexsz += cwgt._nhflex;
						prehflex = true;
					}
				} else {
					if (cwgt && cwgt._sumWidth)
						wdh -= offwdh;
					else
						segRight = Math.max(segRight, marginRight);
					prehflex = false;
				}
				
				
				if (cwgt && cwgt._nvflex) {
					if (cwgt !== this)
						cwgt._flexFixed = true; 
					if (cwgt._vflex == 'min') {
						var minhgh = _fixMinFlex.apply(cwgt, [c, 'h']);
						if (cwgt._sumHeight)
							hgh -= minhgh;
						else {
							
							offTop = zkc.revisedOffset()[1] - zkpOffsets[1];
							offhgh = minhgh; 
							marginBottom = offTop + offhgh + zkc.sumStyles('b', jq.margins);
							segBottom = Math.max(segBottom, marginBottom);
						}
						prevflex = false;
					} else {
						if (pretxt) {
							var txtmarginBottom = offTop - zkc.sumStyles('t', jq.margins);
							segBottom = Math.max(segBottom, txtmarginBottom);
						}
						if (!prevflex && segBottom > segTop) {
							hgh -= segBottom - segTop;
						}
						segTop = segBottom = marginBottom;
						
						vflexs.push(cwgt);
						vflexsz += cwgt._nvflex;
						prevflex = true;
					}
				} else {
					if (cwgt && cwgt._sumHeight)
						hgh -= offhgh;
					else
						segBottom = Math.max(segBottom, marginBottom);
					prevflex = false;
				}
				pretxt = false;
			}
		}
		
		if ((zk.ie6_ || zk.ie7_) && jq.nodeName(p, 'div')) { 
			p.style.position = oldPos;
		}

		if (segBottom > segTop) {
			hgh -= segBottom - segTop;
		}
		if (segRight > segLeft) {
			wdh -= segRight - segLeft;
		}
		
		
		
		var lastsz = hgh > 0 ? hgh : 0;
		for (var j = vflexs.length - 1; j > 0; --j) {
			var cwgt = vflexs.shift(), 
				vsz = (cwgt._nvflex * hgh / vflexsz) | 0; 
			cwgt.setFlexSize_({height:vsz});
			cwgt._vflexsz = vsz;
			lastsz -= vsz;
		}
		
		if (vflexs.length) {
			var cwgt = vflexs.shift();
			cwgt.setFlexSize_({height:lastsz});
			cwgt._vflexsz = lastsz;
		}
		
		
		var newpsz = this.getParentSize_(p);
		if (newpsz.width > psz.width) 
			wdh += (newpsz.width - psz.width); 
		
		
		
		lastsz = wdh > 0 ? wdh : 0;
		for (var j = hflexs.length - 1; j > 0; --j) {
			var cwgt = hflexs.shift(), 
				hsz = (cwgt._nhflex * wdh / hflexsz) | 0; 
			cwgt.setFlexSize_({width:hsz});
			cwgt._hflexsz = hsz;
			lastsz -= hsz;
		}
		
		if (hflexs.length) {
			var cwgt = hflexs.shift();
			cwgt.setFlexSize_({width:lastsz});
			cwgt._hflexsz = lastsz;
		}
		
		
		this.parent.afterChildrenFlex_(this);
		this._flexFixed = false;
	}
	function _listenFlex(wgt) {
		if (!wgt._flexListened){
			zWatch.listen({onSize: [wgt, _fixFlexX], onShow: [wgt, _fixFlexX], beforeSize: wgt});
			wgt._flexListened = true;
		}
	}
	function _unlistenFlex(wgt) {
		if (wgt._flexListened) {
			zWatch.unlisten({onSize: [wgt, _fixFlexX], onShow: [wgt, _fixFlexX], beforeSize: wgt});
			delete wgt._flexListened;
		}
	}

	
	zk.DnD = { 
		
		getDrop: function (drag, pt, evt) {
			var wgt = evt.target;
			return wgt ? wgt.getDrop_(drag.control): null;
		},
		
		ghost: function (drag, ofs, msg) {
			if (msg != null)  {
				jq(document.body).append(
					'<div id="zk_ddghost" class="z-drop-ghost z-drop-disallow" style="position:absolute;top:'
					+ofs[1]+'px;left:'+ofs[0]+'px;"><div class="z-drop-cnt"><span id="zk_ddghost-img" class="z-drop-disallow"></span>&nbsp;'+msg+'</div></div>');
				drag._dragImg = jq("#zk_ddghost-img")[0];
				return jq("#zk_ddghost")[0];
			}

			var dgelm = jq(drag.node).clone()[0];
			dgelm.id = "zk_ddghost";
			zk.copy(dgelm.style, {
				position: "absolute", left: ofs[0] + "px", top: ofs[1] + "px"
			});
			jq(dgelm).addClass("z-drag-ghost");
			document.body.appendChild(dgelm);
			return dgelm;
		}
	};
	function DD_cleanLastDrop(drag) {
		if (drag) {
			var drop;
			if (drop = drag._lastDrop) {
				drag._lastDrop = null;
				drop.dropEffect_();
			}
			drag._lastDropTo = null;
		}
	}
	function DD_pointer(evt, height) {
		if (zk.ios)
			return [evt.pageX - 50, evt.pageY - height - 30];
		return [evt.pageX + 7, evt.pageY + 5];
	}
	function DD_enddrag(drag, evt) {
		DD_cleanLastDrop(drag);
		var pt = [evt.pageX, evt.pageY],
			wgt = zk.DnD.getDrop(drag, pt, evt);
		if (wgt) wgt.onDrop_(drag, evt);
	}
	function DD_dragging(drag, pt, evt) {
		var dropTo;
		if (!evt || (dropTo = evt.domTarget) == drag._lastDropTo)
			return;

		var dropw = zk.DnD.getDrop(drag, pt, evt),
			found = dropw && dropw == drag._lastDrop;
		if (!found) {
			DD_cleanLastDrop(drag); 
			if (dropw) {
				drag._lastDrop = dropw;
				dropw.dropEffect_(true);
				found = true;
			}
		}

		var dragImg = drag._dragImg;
		if (dragImg) {
			if (found)
				jq(drag.node).removeClass('z-drop-disallow').addClass('z-drop-allow');
			else
				jq(drag.node).removeClass('z-drop-allow').addClass('z-drop-disallow');
			
			dragImg.className = found ? 'z-drop-allow': 'z-drop-disallow';
		}

		drag._lastDropTo = dropTo; 
	}
	function DD_ghosting(drag, ofs, evt) {
		return drag.control.cloneDrag_(drag, DD_pointer(evt, jq(drag.node).height()));
	}
	function DD_endghosting(drag, origin) {
		drag.control.uncloneDrag_(drag);
		drag._dragImg = null;
	}
	function DD_constraint(drag, pt, evt) {
		return DD_pointer(evt, jq(drag.node).height());
	}
	function DD_ignoredrag(drag, pt, evt) {
		return drag.control.ignoreDrag_(pt);
	}

	function _topnode(n) {
		for (var v, body = document.body; n && n != body; n = n.parentNode) 
			if ((v=n.style) && ((v=v.position) == 'absolute' || v == 'relative'))
				return n;
	}
	function _zIndex(n) {
		return n ? zk.parseInt(n.style.zIndex): 0;
	}

	function _getFirstNodeDown(wgt) {
		var n = wgt.$n();
		if (n) return n;
		for (var w = wgt.firstChild; w; w = w.nextSibling) {
			n = w.getFirstNode_();
			if (n) return n;
		}
	}
	
	function _floatVisibleDependent(self, wgt) {
		for (; wgt; wgt = wgt.parent)
			if (wgt == self) return true;
			else if (!wgt.isVisible()) break;
		return false;
	}

	
	function _topZIndex(wgt) {
		var zi = 1800; 
		for (var j = _floatings.length; j--;) {
			var w = _floatings[j].widget,
				wzi = zk.parseInt(w.getFloatZIndex_(_floatings[j].node));
			if (wzi >= zi && !zUtl.isAncestor(wgt, w) && w.isVisible())
				zi = wzi + 1;
		}
		return zi;
	}

	function _prepareRemove(wgt, ary) {
		for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling) {
			var n = wgt.$n();
			if (n) ary.push(n);
			else _prepareRemove(wgt, ary);
		}
	}

	
	function _rdrender(wgt) {
		if (wgt._z$rd) { 
			delete wgt._z$rd;
			wgt._norenderdefer = true;
			wgt.replaceHTML('#' + wgt.uuid, wgt.parent ? wgt.parent.desktop: null, null, true);
		}
	}

	
	function _rerender(wgt, timeout) {
		if (_rdtid)
			clearTimeout(_rdtid);
		_rdque.push(wgt);
		_rdtid = setTimeout(_rerender0, timeout);
	}
	function _rerender0() {
		_rdtid = null;
		l_out:
		for (var wgt; wgt = _rdque.shift();) {
			if (!wgt.desktop)
				continue;

			for (var j = _rdque.length; j--;)
				if (zUtl.isAncestor(wgt, _rdque[j]))
					_rdque.splice(j, 1); 
				else if (zUtl.isAncestor(_rdque[j], wgt))
					continue l_out; 

			wgt.rerender();
		}
	}
	function _rerenderDone(wgt) {
		for (var j = _rdque.length; j--;)
			if (zUtl.isAncestor(wgt, _rdque[j]))
				_rdque.splice(j, 1);
	}

	var _dragoptions = {
		starteffect: zk.$void, 
		endeffect: DD_enddrag, change: DD_dragging,
		ghosting: DD_ghosting, endghosting: DD_endghosting,
		constraint: DD_constraint, 
		ignoredrag: DD_ignoredrag,
		zIndex: 88800
	};


zk.Widget = zk.$extends(zk.Object, {
	_visible: true,
	
	nChildren: 0,
	
	bindLevel: -1,
	_mold: 'default',
	
	className: 'zk.Widget',
	
	widgetName: "widget",

	
	
	actions_: {},

	_floating: false,

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	

	
	

	
	$init: function (props) {
		this._asaps = {}; 
		this._lsns = {}; 
		this._bklsns = {}; 
		this._subnodes = {}; 
		this.effects_ = {};

		
		
		
		if (props && zk.cut(props, "z$is"))
			this._fellows = {};

		this.afterInit(function () {
			if (props) {
				var mold = props.mold;
				if (mold != null) {
					if (mold) this._mold = mold;
					delete props.mold; 
				}
				for (var nm in props)
					this.set(nm, props[nm]);
			}

			if ((zk.spaceless || this.rawId) && this.id)
				this.uuid = this.id; 
			if (!this.uuid)
				this.uuid = zk.Widget.nextUuid();
		});
	},

	$define: {
		
		
		mold: function () {
			this.rerender();
		},
		
		
		style: function () {
			this.updateDomStyle_();
		},
		
		
		sclass: function () {
			this.updateDomClass_();
		},
		
		
		zclass: function (){
			this.rerender();
		},
		
		
		width: function (v) {
			if (!this._nhflex) {
				var n = this.$n();
				if (n) n.style.width = v || '';
			}
		},
		
		
		height: function (v) {
			if (!this._nvflex) {
				var n = this.$n();
				if (n) n.style.height = v || '';
			}
		},
		
		
		left: function (v) {
			var n = this.$n();
			if (n) n.style.left = v || '';
		},
		
		
		top: function (v) {
			var n = this.$n();
			if (n) n.style.top = v || '';
		},
		
		
		tooltiptext: function (v) {
			var n = this.$n();
			if (n) n.title = v || '';
		},

		
		
		droppable: [
			function (v) {
				return v && "false" != v ? v: null;
			},
			function (v) {
				var dropTypes;
				if (v && v != "true") {
					dropTypes = v.split(',');
					for (var j = dropTypes.length; j--;)
						if (!(dropTypes[j] = dropTypes[j].trim()))
							dropTypes.splice(j, 1);
				}
				this._dropTypes = dropTypes;
			}
		],
		
		
		vflex: function(v) {
			this._nvflex = (true === v || 'true' == v) ? 1 : v == 'min' ? -65500 : zk.parseInt(v);
			if (this._nvflex < 0 && v != 'min')
				this._nvflex = 0;
			if (_binds[this.uuid] === this) { 
				if (!this._nvflex) {
					this.setFlexSize_({height: ''}); 
					delete this._vflexsz;
					if (!this._nhflex)
						_unlistenFlex(this);
				} else
					_listenFlex(this);
				zWatch.fireDown('onSize', this.parent);
			}
		},
		
		
		hflex: function(v) {
			this.setHflex_(v);
			if (_binds[this.uuid] === this) { 
				zWatch.fireDown('onSize', this.parent);
			}
		},
		
		
		 renderdefer: null,
		
		
		action: function (v) {
			this.actions_ = {}; 
			if (v)
				for (var ps = v.split(';'), j = ps.length; j--;) {
					var p = ps[j], k = p.indexOf(':');
					if (k >= 0) {
						var nm = p.substring(0, k).trim(),
							val = p.substring(k + 1).trim(),
							opts, fn, l;
						if (nm && val) {
							k = val.indexOf('(');
							if (k >= 0) {
								if ((l = val.lastIndexOf(')')) > k)
									opts = jq.evalJSON(val.substring(k + 1, l));
								val = val.substring(0, k);
							}
							if (fn = zk.eff.Actions[val])
								this.actions_[nm] = [fn, opts];
							else
								zk.error("Unknown action: "+val);
							continue;
						}
					}
					zk.error("Illegal action: "+v+", "+this.className);
				}
		}
	},
	setHflex_: function (v) {
		this._nhflex = (true === v || 'true' == v) ? 1 : v == 'min' ? -65500 : zk.parseInt(v);
		if (this._nhflex < 0 && v != 'min')
			this._nhflex = 0; 
		if (_binds[this.uuid] === this) { 
			if (!this._nhflex) {
				this.setFlexSize_({width: ''}); 
				delete this._hflexsz;
				if (!this._nvflex)
					_unlistenFlex(this);
			} else
				_listenFlex(this);
		}
	},
	
	afterAnima_: function (visible) {
		var fn;
		if (fn = this._rmAftAnm) {
			this._rmAftAnm = null;
			fn();
		}
	},

	
	setDraggable: function (v) {
		if (!v && v != null) v = "false"; 
		this._draggable = v;

		if (this.desktop && !_dragCtl(this, true))
			if (v && v != "false") this.initDrag_();
			else this.cleanDrag_();
	},
	
	getDraggable: function () {
		var v = this._draggable;
		return v ? v: _dragCtl(this) ? "true": "false";
	},
	
	$o: function () {
		for (var w = this; w; w = w.parent)
			if (w._fellows) return w;
	},
	
	
	
	$f: function (id, global) {
		var f = this.$o();
		if (!arguments.length)
			return f ? f._fellows: {};
		for (var ids = id.split('/'), j = 0, len = ids.length; j < len; ++j) {
			id = ids[j];
			if (id) {
				if (f) f = f._fellows[id];
				if (!f && global && (f=_globals[id])) f = f[0];
				if (!f || zk.spaceless) break;
				global = false;
			}
		}
		return f;
	},
	
	getId: function () {
		return this.id;
	},
	
	setId: function (id) {
		if (id != this.id) {
			if (this.id) {
				_rmIdSpace(this);
				_rmGlobal(this); 
			}

			if (id && (zk.spaceless || this.rawId))
				zk._wgtutl.setUuid(this, id);
			this.id = id;

			if (id) {
				_addIdSpace(this);
				if (this.desktop || this.z_rod)
					_addGlobal(this);
			}
		}
		return this;
	},

	
	
	set: function (name, value, extra) {
		var cc;
		if (cc = this['set' + name.charAt(0).toUpperCase() + name.substring(1)]) {
		
			zk._set2(this, cc, null, value, extra);
			return this;
		}

		if ((cc = name.charAt(0)) == '$') {
			if (name.startsWith('$$on')) {
				var cls = this.$class,
					ime = cls._importantEvts;
				(ime || (cls._importantEvts = {}))[name.substring(2)] = value;
				return this;
			} else if (name.startsWith('$on')) {
				this._asaps[name.substring(1)] = value;
				return this;
			} else if (name.startsWith('$u$')) { 
				var self = this;
				zk.afterMount(function () {
					zk._set(self, name.substring(3), zk.Widget.$(value), extra);
				});
				return this;
			}
		} else if (cc == 'o' && name.charAt(1) == 'n'
			&& ((cc = name.charAt(2)) <= 'Z' && cc >= 'A')) {
			this.setListener(name, value);
			return this;
		}

		zk._set2(this, null, name, value, extra);
		return this;
	},
	
	get: function (name) {
		return zk.get(this, name);
	},
	
	getChildAt: function (j) {
		if (j >= 0 && j < this.nChildren)
			for (var w = this.firstChild; w; w = w.nextSibling)
				if (--j < 0)
					return w;
	},
	
	getChildIndex: function () {
		var w = this.parent, j = 0;
		if (w)
			for (w = w.firstChild; w; w = w.nextSibling, ++j)
				if (w == this)
					return j;
		return 0;
	},
	
	setChildren: function (children) {
		if (children)
			for (var j = 0, l = children.length; j < l;)
				this.appendChild(children[j++]);
		return this;
	},
	
	
	appendChild: function (child, ignoreDom) {
		if (child == this.lastChild)
			return false;

		var oldpt;
		if ((oldpt = child.parent) != this)
			child.beforeParentChanged_(this);

		if (oldpt) {
			_noParentCallback = true;
			try {
				oldpt.removeChild(child);
			} finally {
				_noParentCallback = false;
			}
		}

		child.parent = this;
		var ref = this.lastChild;
		if (ref) {
			ref.nextSibling = child;
			child.previousSibling = ref;
			this.lastChild = child;
		} else {
			this.firstChild = this.lastChild = child;
		}
		++this.nChildren;

		if (child.id || child.firstChild) 
			_addIdSpaceDown(child);

		if (!ignoreDom)
			if (this.shallChildROD_(child))
				_bindrod(child);
			else {
				var dt = this.desktop;
				if (dt) this.insertChildHTML_(child, null, dt);
			}

		child.afterParentChanged_(oldpt);
		if (!_noChildCallback)
			this.onChildAdded_(child);
		return true;
	},
	
	shallChildROD_: function (child) {
		return child.z_rod || this.z_rod;
	},
	
	insertBefore: function (child, sibling, ignoreDom) {
		if (!sibling || sibling.parent != this) {
			this.insertingBefore_ = true;
			try {
				return this.appendChild(child, ignoreDom);
			} finally {
				this.insertingBefore_ = false;
			}
		}

		if (child == sibling || child.nextSibling == sibling)
			return false;

		var oldpt;
		if ((oldpt = child.parent) != this)
			child.beforeParentChanged_(this);

		if (oldpt) {
			_noParentCallback = true;
			try {
				oldpt.removeChild(child);
			} finally {
				_noParentCallback = false;
			}
		}

		child.parent = this;
		var ref = sibling.previousSibling;
		if (ref) {
			child.previousSibling = ref;
			ref.nextSibling = child;
		} else this.firstChild = child;

		sibling.previousSibling = child;
		child.nextSibling = sibling;

		++this.nChildren;

		_addIdSpaceDown(child);

		if (!ignoreDom)
			if (this.shallChildROD_(child))
				_bindrod(child);
			else {
				var dt = this.desktop;
				if (dt) this.insertChildHTML_(child, sibling, dt);
			}

		child.afterParentChanged_(oldpt);
		if (!_noChildCallback)
			this.onChildAdded_(child);
		return true;
	},
	
	
	removeChild: function (child, ignoreDom) {
		var oldpt;
		if (!(oldpt = child.parent))
			return false;
		if (this != oldpt)
			return false;

		_rmIdSpaceDown(child);

		
		if (child.z_rod)
			_unbindrod(child);
		else if (child.desktop)
			this.removeChildHTML_(child, ignoreDom);

		if (!_noParentCallback)
			child.beforeParentChanged_(null);

		_unlink(this, child);


		if (!_noParentCallback)
			child.afterParentChanged_(oldpt);
		if (!_noChildCallback)
			this.onChildRemoved_(child);
		return true;
	},
	
	detach: function () {
		if (this.parent) this.parent.removeChild(this);
		else {
			var cf = zk.currentFocus;
			if (cf && zUtl.isAncestor(this, cf))
				zk.currentFocus = null;
			var n = this.$n();
			if (n) {
				this.unbind();
				_rmDom(this, n);
			}
		}
	},
	
	clear: function () {
		while (this.lastChild)
			this.removeChild(this.lastChild);
	},
	
	replaceWidget: function (newwgt) {
		_replaceLink(this, newwgt);

		_rmIdSpaceDown(this);
		_addIdSpaceDown(newwgt);

		var cf = zk.currentFocus;
		if (cf && zUtl.isAncestor(this, cf))
			zk.currentFocus = null;

		var node = this.$n(),
			p = this.parent, shallReplace,
			dt = newwgt.desktop || this.desktop;
		if (this.z_rod) {
			_unbindrod(this);
			if (!(shallReplace = (dt = dt || (p ? p.desktop: p))
			&& (node = jq('#' + this.uuid))))
				_bindrod(newwgt);
		} else
			shallReplace = dt;

		if (shallReplace) {
			if (node) newwgt.replaceHTML(node, dt, null, true);
			else {
				this.unbind();
				newwgt.bind(dt);
			}

			_fixBindLevel(newwgt, p ? p.bindLevel + 1: 0);
			zWatch.fire('onBindLevelMove', newwgt);
		}

		if (p)
			p.onChildReplaced_(this, newwgt);

		this.parent = this.nextSibling = this.previousSibling = null;
	},
	
	replaceCavedChildren_: function (subId, wgts, tagBeg, tagEnd) {
		_noChildCallback = true; 
		try {
			
			var cave = this.$n(subId), fc, oldwgts = [];
			for (var w = this.firstChild; w;) {
				var sib = w.nextSibling;
				if (jq.isAncestor(cave, w.$n())) {
					if (!fc || fc == w) fc = sib;
					this.removeChild(w, true); 
					oldwgts.push(w);
				}
				w = sib;
			}

			
			for (var j = 0, len = wgts.length; j < len; ++j)
				this.insertBefore(wgts[j], fc, true); 
		} finally {
			_noChildCallback = false;
		}

		if (fc = this.desktop) {
			
			var out = [];
			if (tagBeg) out.push(tagBeg);
			for (var j = 0, len = wgts.length; j < len; ++j)
				wgts[j].redraw(out);
			if (tagEnd) out.push(tagEnd);

			
			jq(cave).html(out.join(''));

			
			for (var j = 0, len = wgts.length; j < len; ++j) {
				wgts[j].bind(fc);
				this.onChildReplaced_(oldwgts[j], wgts[j]);
			}
		}
	},

	
	beforeParentChanged_: function () {
	},
	
	afterParentChanged_: function () {
	},

	
	
	isRealVisible: function (opts) {
		var dom = opts && opts.dom;
		for (var wgt = this; wgt; wgt = wgt.parent) {
			if (dom) {
				if (!zk(wgt.$n()).isVisible())
					return false;
			} else if (!wgt.isVisible())
				return false;

			
			var p = wgt.parent, n;
			if (p && p.isVisible() && (p=p.$n()) && (n=wgt.$n()))
				while ((n=zk(n).vparentNode(true)) && p != n)
					if ((n.style||{}).display == 'none')
						return false; 

			if (opts && opts.until == wgt)
				break;
		}
		return true;
	},
	
	
	isVisible: function (strict) {
		var visible = this._visible;
		if (!strict || !visible)
			return visible;
		var n = this.$n();
		return !n || zk(n).isVisible();
	},
	
	setVisible: function (visible) {
		if (this._visible != visible) {
			this._visible = visible;

			var p = this.parent, ocvCalled;
			if (this.desktop) {
				var parentVisible = !p || p.isRealVisible(),
					node = this.$n(),
					floating = this._floating;

				if (!parentVisible) {
					if (!floating) this.setDomVisible_(node, visible);
				} else if (visible) {
					var zi;
					if (floating)
						this.setZIndex(zi = _topZIndex(this), {fire:true});

					this.setDomVisible_(node, true);

					
					for (var j = 0, fl = _floatings.length; j < fl; ++j) {
						var w = _floatings[j].widget,
							n = _floatings[j].node;
						if (this == w)
							w.setDomVisible_(n, true, {visibility:1});
						else if (_floatVisibleDependent(this, w)) {
							zi = zi >= 0 ? ++zi: _topZIndex(w);
							w.setFloatZIndex_(n, zi);
							w.setDomVisible_(n, true, {visibility:1});
						}
					}

					if (ocvCalled = p) p.onChildVisible_(this);
						
					
					this.fire('onShow');
					if (!zk.animating())
						zWatch.fireDown('onShow', this);
				} else {
					this.fire('onHide');
					if (!zk.animating())
						zWatch.fireDown('onHide', this);

					for (var j = _floatings.length, bindLevel = this.bindLevel; j--;) {
						var w = _floatings[j].widget;
						if (bindLevel >= w.bindLevel)
							break; 
						if (_floatVisibleDependent(this, w))
							w.setDomVisible_(_floatings[j].node, false, {visibility:1});
					}

					this.setDomVisible_(node, false);
				}
			}
			if (p && !ocvCalled) p.onChildVisible_(this);
				
		}
		return this;
	},
	
	zsync: function () {
		for (var nm in this.effects_) {
			var ef = this.effects_[nm];
			if (ef && ef.sync) ef.sync();
		}
	},
	
	show: function () {return this.setVisible(true);},
	
	hide: function () {return this.setVisible(false);},
	
	setDomVisible_: function (n, visible, opts) {
		if (!opts || opts.display) {
			var act;
			if (act = this.actions_[visible ? "show": "hide"])
				act[0].call(this, n, act[1]);
			else
				n.style.display = visible ? '': 'none';
		}
		if (opts && opts.visibility)
			n.style.visibility = visible ? 'visible': 'hidden';
	},
	
	onChildAdded_: function () {
	},
	
	onChildRemoved_: function () {
	},
	
	onChildReplaced_: function (oldc, newc) {
		this.childReplacing_ = true;
		try {
			if (oldc) this.onChildRemoved_(oldc);
			if (newc) this.onChildAdded_(newc);
		} finally {
			this.childReplacing_ = false;
		}
	},
	
	onChildVisible_: function () {
	},
	
	setTopmost: function () {
		if (!this.desktop) return -1;

		for (var wgt = this; wgt; wgt = wgt.parent)
			if (wgt._floating) {
				var zi = _topZIndex(wgt);
				for (var j = 0, fl = _floatings.length; j < fl; ++j) { 
					var w = _floatings[j].widget,
						n = _floatings[j].node;
					if (wgt == w)
						w.setFloatZIndex_(n, zi); 
					else if (zUtl.isAncestor(wgt, w) && w.isVisible())
						w.setFloatZIndex_(n, ++zi);
				}
				return zi;
			}
		return -1;
	},
	
	setFloatZIndex_: function (node, zi) {
		if (node != this.$n()) node.style.zIndex = zi; 
		else this.setZIndex(zi, {fire:true});
	},
	
	getFloatZIndex_: function (node) {
		return node != this.$n() ? node.style.zIndex: this._zIndex;
	},
	
	getTopWidget: function () {
		for (var wgt = this; wgt; wgt = wgt.parent)
			if (wgt._floating)
				return wgt;
	},
	
	isFloating_: function () {
		return this._floating;
	},
	
	setFloating_: function (floating, opts) {
		if (this._floating != floating) {
			if (floating) {
				
				var inf = {widget: this, node: opts && opts.node? opts.node: this.$n()},
					bindLevel = this.bindLevel;
				for (var j = _floatings.length;;) {
					if (--j < 0) {
						_floatings.unshift(inf);
						break;
					}
					if (bindLevel >= _floatings[j].widget.bindLevel) { 
						_floatings.splice(j + 1, 0, inf);
						break;
					}
				}
				this._floating = true;
			} else {
				for (var j = _floatings.length; j--;)
					if (_floatings[j].widget == this)
						_floatings.splice(j, 1);
				this._floating = false;
			}
		}
		return this;
	},

	
	getZIndex: _zkf = function () {
		return this._zIndex;
	},
	getZindex: _zkf,
	
	setZIndex: _zkf = function (zIndex, opts) {
		if (this._zIndex != zIndex) {
			this._zIndex = zIndex;
			var n = this.$n();
			if (n) {
				n.style.zIndex = zIndex >= 0 ? zIndex: '';
				if (opts && opts.fire) this.fire('onZIndex', (zIndex > 0 || zIndex === 0) ? zIndex: -1, {ignorable: true});
			}
		}
		return this;
	},
	setZindex: _zkf,

	
	getScrollTop: function () {
		var n = this.$n();
		return n ? n.scrollTop: 0;
	},
	
	getScrollLeft: function () {
		var n = this.$n();
		return n ? n.scrollLeft: 0;
	},
	
	setScrollTop: function (val) {
		var n = this.$n();
		if (n) n.scrollTop = val;
		return this;
	},
	
	setScrollLeft: function (val) {
		var n = this.$n();
		if (n) n.scrollLeft = val;
		return this;
	},
	
	scrollIntoView: function () {
		zk(this.$n()).scrollIntoView();
		return this;
	},

	
	redraw: function (out) {
		if (!this.deferRedraw_(out)) {
			var s = this.prolog;
			if (s) out.push(s);

			for (var p = this, mold = this._mold; p; p = p.superclass) {
				var f = p.$class.molds;
				if (f && (f = f[mold]))
					return f.apply(this, arguments);
			}

			zk.error("Mold "+mold+" not found in "+this.className);
		}
	},
	
	deferRedraw_: function (out) {
		var delay;
		if ((delay = this._renderdefer) >= 0) {
			if (!this._norenderdefer) {
				this.z_rod = this._z$rd = true;
				this.deferRedrawHTML_(out);
				out = null; 

				var wgt = this;
				setTimeout(function () {_rdrender(wgt);}, delay);
				return true;
			}
			delete this._norenderdefer;
			delete this.z_rod;
		}
		return false;
	},
	
	deferRedrawHTML_: function (out) {
		out.push('<div', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></div>');
	},
	
	forcerender: function () {
		_rdrender(this);
	},
	
	updateDomClass_: function () {
		if (this.desktop) {
			var n = this.$n();
			if (n) n.className = this.domClass_();
			this.zsync();
		}
	},
	
	updateDomStyle_: function () {
		if (this.desktop) {
			var s = jq.parseStyle(this.domStyle_()),
				n = this.$n();
			zk(n).clearStyles().jq.css(s);

			var t = this.getTextNode();
			if (t && t != n)
				zk(t).clearStyles().jq.css(jq.filterTextStyle(s));
			this.zsync();
		}
	},
	
	getTextNode: function () {
	},

	
	domStyle_: function (no) {
		var out = [], s;
		if (s = this.z$display) 
			out.push("display:", s, ';');
		else if (!this.isVisible() && (!no || !no.visible))
			out.push("display:none;");

		if ((!no || !no.style) && (s = this.getStyle())) {
			out.push(s);
			if (s.charAt(s.length - 1) != ';')
				out.push(';');
		}
		if ((!no || !no.width) && (s = this.getWidth()))
			out.push('width:', s, ';');
		if ((!no || !no.height) && (s = this.getHeight()))
			out.push('height:', s, ';');
		if ((!no || !no.left) && (s = this.getLeft()))
			out.push('left:', s, ';');
		if ((!no || !no.top) && (s = this.getTop()))
			out.push('top:', s, ';');
		if ((!no || !no.zIndex) && (s = this.getZIndex()) >= 0)
			out.push('z-index:', s, ';');
		return out.join('');
	},
	
	domClass_: function (no) {
		var s, z;
		if (!no || !no.sclass)
			s = this.getSclass();
		if (!no || !no.zclass)
			z = this.getZclass();
		return s ? z ? s + ' ' + z: s: z||'';
	},
	
	domAttrs_: function (no) {
		var out = [], attrs, s;
		if ((!no || !no.id) && (s = this.uuid))
			out.push(' id="', s, '"')
		if ((!no || !no.domStyle) && (s = this.domStyle_(no)))
			out.push(' style="', s, '"');
		if ((!no || !no.domClass) && (s = this.domClass_(no)))
			out.push(' class="', s, '"');
		if ((!no || !no.tooltiptext) && (s = this.domTooltiptext_()))
			out.push(' title="', s, '"');
		for (var nm in (attrs = this.domExtraAttrs))
			out.push(' ', nm, '="', attrs[nm]||'', '"'); 
		return out.join('');
	},
	
	domTooltiptext_ : function () {
		return this.getTooltiptext();
	},
	
	domTextStyleAttr_: function () {
		var s = this.getStyle();
		return s ? zUtl.appendAttr("style", jq.filterTextStyle(s)): s;
	},

	
	replaceHTML: function (n, desktop, skipper, _trim_) {
		if (!desktop) {
			desktop = this.desktop;
			if (!zk.Desktop._ndt) zk.stateless();
		}

		var cf = skipper ? null: _bkFocus(this);

		var p = this.parent;
		if (p) p.replaceChildHTML_(this, n, desktop, skipper, _trim_);
		else {
			var oldwgt = this.getOldWidget_(n);
			if (oldwgt) oldwgt.unbind(skipper); 
			else if (this.z_rod) _unbindrod(this); 
			jq(n).replaceWith(this.redrawHTML_(skipper, _trim_));
			this.bind(desktop, skipper);
		}

		if (!skipper) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}

		_rsFocus(cf);
		return this;
	},
	
	getOldWidget_: function (n) {
		return zk.Widget.$(n, {strict:true});
	},
	
	redrawHTML_: function (skipper, trim) {
		var out = [];
		this.redraw(out, skipper);
		out = out.join('');
		return trim ? out.trim(): out;
			
			
	},
	
	
	rerender: function (skipper) {
		if (this.desktop) {
			if (typeof skipper == "number") {
				_rerender(this, skipper);
				return this;
			}

			var n = this.$n();
			if (n) {
				var oldrod = this.z$rod;
				this.z$rod = false;
					

				var skipInfo;
				if (skipper) {
					skipInfo = skipper.skip(this);
					if (skipInfo) {
						var cf = _bkFocus(this);

						this.replaceHTML(n, null, skipper, true);

						skipper.restore(this, skipInfo);

						zWatch.fireDown('onRestore', this);
							
						zWatch.fireDown('beforeSize', this);
						zWatch.fireDown('onSize', this);

						_rsFocus(cf);
					}
				}
				if (!skipInfo)
					this.replaceHTML(n, null, null, true);

				this.z$rod = oldrod;
			}
		}
		return this;
	},

	
	replaceChildHTML_: function (child, n, desktop, skipper, _trim_) {
		var oldwgt = child.getOldWidget_(n);
		if (oldwgt) oldwgt.unbind(skipper); 
		else if (this.shallChildROD_(child))
			_unbindrod(child); 
		jq(n).replaceWith(child.redrawHTML_(skipper, _trim_));
		child.bind(desktop, skipper);
	},
	
	insertChildHTML_: function (child, before, desktop) {
		var ben, html = child.redrawHTML_();
		if (before) {
			if (before.$instanceof(zk.Native)) { 
				ben = before.previousSibling;
				if (ben) {
					if (ben == child) 
						ben = ben.previousSibling;
					if (ben && (ben = ben.$n())) {
						jq(ben).after(html);
						child.bind(desktop);
						return;
					}
				}
				
			}
			before = before.getFirstNode_();
		}
		if (!before)
			for (var w = this;;) {
				ben = w.getCaveNode();
				if (ben) break;

				var w2 = w.nextSibling;
				if (w2 && (before = w2.getFirstNode_()))
					break;

				if (!(w = w.parent)) {
					ben = document.body;
					break;
				}
			}

		if (before) {
			var sib = before.previousSibling;
			if (_isProlog(sib)) before = sib;
			jq(before).before(html);
		} else
			jq(ben).append(html);
		child.bind(desktop);
	},
	
	getCaveNode: function () {
		return this.$n('cave') || this.$n();
	},
	
	getFirstNode_: function () {
		for (var w = this; w; w = w.nextSibling) {
			var n = _getFirstNodeDown(w);
			if (n) return n;
		}
	},
	
	removeChildHTML_: function (child, ignoreDom) {
		var cf = zk.currentFocus;
		if (cf && zUtl.isAncestor(child, cf))
			zk.currentFocus = null;

		var n = child.$n();
		if (n) {
			var sib = n.previousSibling;
			if (child.prolog && _isProlog(sib))
				jq(sib).remove();
		} else
			_prepareRemove(child, n = []);

		child.unbind();

		if (!ignoreDom)
			child.removeHTML_(n);
	},
	
	removeHTML_: function (n) {
		_rmDom(this, n);
		this.clearCache();
	},
	
	
	$n: function (subId) {
		if (subId) {
			var n = this._subnodes[subId];
			if (!n && this.desktop) {
				n = jq(this.uuid + '-' + subId, zk)[0];
				this._subnodes[subId] = n ? n : 'n/a';
			}
			return n == 'n/a' ? null : n;
		}
		var n = this._node;
		if (!n && this.desktop && !this._nodeSolved) {
			this._node = n = jq(this.uuid, zk)[0];
			this._nodeSolved = true;
		}
		return n;
	},
	
	clearCache: function () {
		this._node = null;
		this._subnodes = {};
		this._nodeSolved = false;
	},
	
	getPage: function () {
		var page, dt;
		for (page = this.parent; page; page = page.parent)
			if (page.$instanceof(zk.Page))
				return page;

		return (page = (dt = this.desktop)._bpg) ?
			page: (dt._bpg = new zk.Body(dt));
	},

	
	bind: function (desktop, skipper) {
		_rerenderDone(this); 
		if (this.z_rod) 
			_bindrod(this);
		else {
			var after = [], fn;
			this.bind_(desktop, skipper, after);
			while (fn = after.shift())
				fn();
		}
		return this;
	},
	
	unbind: function (skipper) {
		_rerenderDone(this); 
		if (this.z_rod)
			_unbindrod(this);
		else {
			var after = [];
			this.unbind_(skipper, after);
			for (var j = 0, len = after.length; j < len;)
				after[j++]();
		}
		return this;
	},

	
	bind_: function (desktop, skipper, after) {
		_bind0(this);

		this.desktop = desktop || (desktop = zk.Desktop.$(this.parent));

		var p = this.parent, v;
		this.bindLevel = p ? p.bindLevel + 1: 0;

		if ((v = this._draggable) && v != "false" && !_dragCtl(this))
			this.initDrag_();
		
		if (this._nvflex || this._nhflex)
			_listenFlex(this);

		this.bindChildren_(desktop, skipper, after);

		if (this.isListen('onBind')) {
			var self = this;
			zk.afterMount(function () {
				if (self.desktop) 
					self.fire('onBind');
			});
		}
	},
	
	bindChildren_: function (desktop, skipper, after) {
		for (var child = this.firstChild, nxt; child; child = nxt) {
			nxt = child.nextSibling;
				

			if (!skipper || !skipper.skipped(this, child))
				if (child.z_rod) _bindrod(child);
				else child.bind_(desktop, null, after); 
		}
	},

	
	unbind_: function (skipper, after) {
		_unbind0(this);
		_unlistenFlex(this);

		this.unbindChildren_(skipper, after);
		this.cleanDrag_(); 

		if (this.isListen('onUnbind')) {
			var self = this;
			zk.afterMount(function () {
				if (!self.desktop) 
					self.fire('onUnbind');
			});
		}

		for (var nm in this.effects_) {
			var ef = this.effects_[nm];
			if (ef) ef.destroy();
		}
		this.effects_ = {};
	},
	
	unbindChildren_: function (skipper, after) {
		for (var child = this.firstChild, nxt; child; child = nxt) {
			nxt = child.nextSibling; 

			
			if (!skipper || !skipper.skipped(this, child))
				if (child.z_rod) _unbindrod(child);
				else if (child.desktop) child.unbind_(null, after); 
		}
	},

	
	extraBind_: function (uuid, add) {
		if (add == false) delete _binds[uuid];
		else _binds[uuid] = this;
	},
	setFlexSize_: function(sz, ignoreMargins) {
		var n = this.$n(),
			zkn = zk(n);
		if (sz.height !== undefined) {
			if (sz.height == 'auto')
				n.style.height = '';
			else if (sz.height != '') 
				this.setFlexSizeH_(n, zkn, sz.height, ignoreMargins);
			else
				n.style.height = this._height || '';
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto')
				n.style.width = '';
			else if (sz.width != '') 
				this.setFlexSizeW_(n, zkn, sz.width, ignoreMargins);
			else
				n.style.width = this._width || '';
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	},
	setFlexSizeH_: function(n, zkn, height, ignoreMargins) {
		var h = zkn.revisedHeight(height, !ignoreMargins),
			newh = h,
			margins = zkn.sumStyles("tb", jq.margins);
		n.style.height = jq.px0(h);
		var newmargins = zkn.sumStyles("tb", jq.margins);
		if (h == jq(n).outerHeight(false)) 
			newh = height - ((zk.safari && newmargins >= 0 && newmargins < margins) ? newmargins : margins);
		else if (zk.safari && newmargins >= 0 && newmargins < margins)  
			newh = zkn.revisedHeight(height, !ignoreMargins);
		if (newh != h) 
			n.style.height = jq.px0(newh);
	},
	
	setFlexSizeW_: function(n, zkn, width, ignoreMargins) {
		var w = zkn.revisedWidth(width, !ignoreMargins),
			neww = w,
			margins = zkn.sumStyles("lr", jq.margins),
			pb = zkn.padBorderWidth();
		if (zk.safari && !ignoreMargins && width == (n.offsetWidth + margins)) 
			w = width - pb;
		n.style.width = jq.px0(w);
		if (w == jq(n).outerWidth(false)) 
			neww = w + pb;
		if (neww != w) 
			n.style.width = jq.px0(neww);
			 
	},
	beforeChildrenFlex_: function(kid) {
		
		return true; 
	},
	afterChildrenFlex_: function(kid) {
		
	},
	ignoreFlexSize_: function(attr) { 
		
		return false;
	},
	ignoreChildNodeOffset_: function(attr) { 
		
		return false;
	},
	beforeMinFlex_: function (attr) { 
		
		return null;
	},
	beforeParentMinFlex_: function (attr) { 
		
	},
	afterChildrenMinFlex_: function() {
		
	},
	afterResetChildSize_: function() {
		
	},
	getParentSize_: function(p) {
		
		var zkp = zk(p);
		return zkp ? {height: zkp.revisedHeight(p.offsetHeight), width: zkp.revisedWidth(p.offsetWidth)} : {};
	},
	fixFlex_: function() {
		_fixFlex.apply(this);
	},
	fixMinFlex_: function(n, orient) { 
		return _fixMinFlex.apply(this, arguments);
	},
	resetSize_: function(orient) {
		(this.$n()).style[orient == 'w' ? 'width': 'height'] = '';
	},
	beforeSize: function () {
		
		if (this.isRealVisible()) {
			if (this._hflex && this._hflex != 'min') {
				this.resetSize_('w');
				this.parent.afterResetChildSize_('w');
			}
			if (this._vflex && this._vflex != 'min') {
				this.resetSize_('h');
				this.parent.afterResetChildSize_('h');
			}
		}
	},
	
	initDrag_: function () {
		this._drag = new zk.Draggable(this, this.getDragNode(), this.getDragOptions_(_dragoptions));
	},
	
	cleanDrag_: function () {
		var drag = this._drag;
		if (drag) {
			this._drag = null;
			drag.destroy();
		}
	},
	
	getDragNode: function () {
		return this.$n();
	},
	
	getDragOptions_: function (map) {
		return map;
	},
	
	ignoreDrag_: function (pt) {
		return false;
	},
	
	getDrop_: function (dragged) {
		if (this != dragged) {
			var dropType = this._droppable,
				dragType = dragged._draggable;
			if (dropType == 'true') return this;
			if (dropType && dragType != "true")
				for (var dropTypes = this._dropTypes, j = dropTypes.length; j--;)
					if (dragType == dropTypes[j])
						return this;
		}
		return this.parent ? this.parent.getDrop_(dragged): null;
	},
	
	dropEffect_: function (over) {
		jq(this.$n()||[])[over ? "addClass" : "removeClass"]("z-drag-over");
	},
	
	getDragMessage_: function () {
		if (jq.nodeName(this.getDragNode(), "tr", "td", "th")) {
			var n = this.$n('real') || this.getCaveNode();
			return n ? n.textContent || n.innerText || '': '';
		}
	},
	
	onDrop_: function (drag, evt) {
		var data = zk.copy({dragged: drag.control}, evt.data);
		this.fire('onDrop', data, null, 38);
	},
	
	cloneDrag_: function (drag, ofs) {
		

		var msg = this.getDragMessage_();
		if (typeof msg == "string" && msg.length > 9)
			msg = msg.substring(0, 9) + "...";

		var dgelm = zk.DnD.ghost(drag, ofs, msg);

		drag._orgcursor = document.body.style.cursor;
		document.body.style.cursor = "pointer";
		jq(this.getDragNode()).addClass('z-dragged'); 
		return dgelm;
	},
	
	uncloneDrag_: function (drag) {
		document.body.style.cursor = drag._orgcursor || '';

		jq(this.getDragNode()).removeClass('z-dragged');
	},

	
	focus: function (timeout) {
		return this.canActivate({checkOnly:true})
			&& zk(this.$n()).isRealVisible()
			&& this.focus_(timeout);
	},
	
	focus_: function (timeout) {
		if (zk(this.$n()).focus(timeout)) {
			this.setTopmost();
			return true;
		}
		for (var w = this.firstChild; w; w = w.nextSibling)
			if (w.isVisible() && w.focus_(timeout))
				return true;
		return false;
	},
	
	canActivate: function (opts) {
		if (_ignCanActivate)
			return true;
		if (zk.busy && (!opts || !opts.checkOnly)) { 
			jq.focusOut(); 
			return false;
		}

		var modal = zk.currentModal;
		if (modal && !zUtl.isAncestor(modal, this)) {
			var wgt = this.getTopWidget();
			
			
			if (wgt && wgt != modal && wgt.getZIndex() > modal.getZIndex())
				return true;
			
			if (!opts || !opts.checkOnly) {
				var cf = zk.currentFocus;
				
				if (cf && zUtl.isAncestor(modal, cf)) cf.focus(0);
				else modal.focus(0);
			}
			return false;
		}
		return true;
	},

	
	
	smartUpdate: function (nm, val, timeout) {
		zAu.send(new zk.Event(this, 'setAttr', [nm, val]),
			timeout >= 0 ? timeout: -1);
		return this;
	},

	
	
	fireX: function (evt, timeout) {
		var oldtg = evt.currentTarget;
		evt.currentTarget = this;
		try {
			var evtnm = evt.name,
				lsns = this._lsns[evtnm],
				len = lsns ? lsns.length: 0;
			if (len) {
				for (var j = 0; j < len;) {
					var inf = lsns[j++], o = inf[0];
					(inf[1] || o[evtnm]).call(o, evt);
					if (evt.stopped) return evt; 
				}
			}

			if (!evt.auStopped) {
				var toServer = evt.opts && evt.opts.toServer;
				if (toServer || (this.inServer && this.desktop)) {
					var asap = toServer || this._asaps[evtnm];
					if (asap == null) {
						var ime = this.$class._importantEvts;
						if (ime) {
							var ime = ime[evtnm];
							if (ime != null) 
								asap = ime;
						}
					}
					if (asap != null 
					|| evt.opts.sendAhead)
						this.sendAU_(evt, asap ? timeout >= 0 ? timeout : 38 : -1);
				}
			}
			return evt;
		} finally {
			evt.currentTarget = oldtg;
		}
	},
	
	beforeSendAU_: function (wgt, evt) {
		var en = evt.name;
		if (en == 'onClick' || en == 'onRightClick' || en == 'onDoubleClick')
			evt.shallStop = true;
	},
	
	sendAU_: function (evt, timeout, opts) {
		(evt.target||this).beforeSendAU_(this, evt);
		evt = new zk.Event(this, evt.name, evt.data, evt.opts, evt.domEvent);
			
		if (evt.opts.sendAhead) zAu.sendAhead(evt, timeout);
		else zAu.send(evt, timeout);
	},
	
	shallIgnoreClick_: function (evt) {
	},

	
	fire: function (evtnm, data, opts, timeout) {
		return this.fireX(new zk.Event(this, evtnm, data, opts), timeout);
	},
	
	listen: function (infs, priority) {
		priority = priority ? priority: 0;
		for (var evt in infs) {
			var inf = infs[evt];
			if (jq.isArray(inf)) inf = [inf[0]||this, inf[1]];
			else if (typeof inf == 'function') inf = [this, inf];
			else inf = [inf||this, null];
			inf.priority = priority;

			var lsns = this._lsns[evt];
			if (!lsns) this._lsns[evt] = [inf];
			else
				for (var j = lsns.length;;)
					if (--j < 0 || lsns[j].priority >= priority) {
						lsns.splice(j + 1, 0, inf);
						break;
					}
		}
		return this;
	},
	
	unlisten: function (infs) {
		l_out:
		for (var evt in infs) {
			var inf = infs[evt],
				lsns = this._lsns[evt], lsn;
			for (var j = lsns ? lsns.length: 0; j--;) {
				lsn = lsns[j];
				if (jq.isArray(inf)) inf = [inf[0]||this, inf[1]];
				else if (typeof inf == 'function') inf = [this, inf];
				else inf = [inf||this, null];
				if (lsn[0] == inf[0] && lsn[1] == inf[1]) {
					lsns.splice(j, 1);
					continue l_out;
				}
			}
		}
		return this;
	},
	
	isListen: function (evt, opts) {
		var v = this._asaps[evt];
		if (v) return true;
		if (opts && opts.asapOnly) {
			v = this.$class._importantEvts;
			return v && v[evt];
		}
		if (opts && opts.any) {
			if (v != null) return true;
			v = this.$class._importantEvts;
			if (v && v[evt] != null) return true;
		}

		var lsns = this._lsns[evt];
		return lsns && lsns.length;
	},
	
	setListeners: function (infs) {
		for (var evt in infs)
			this.setListener(evt, infs[evt]);
	},
	
	
	setListener: function (evt, fn) { 
		if (jq.isArray(evt)) {
			fn = evt[1];
			evt = evt[0]
		}

		var bklsns = this._bklsns,
			oldfn = bklsns[evt],
			inf = {};
		if (oldfn) { 
			delete bklsns[evt];
			inf[evt] = oldfn
			this.unlisten(inf);
		}
		if (fn) {
			inf[evt] = bklsns[evt]
				= typeof fn != 'function' ? new Function("var event=arguments[0];"+fn): fn;
			this.listen(inf);
		}
	},
	setOverride: function (nm, val) { 
		if (jq.isArray(nm)) {
			val = nm[1];
			nm = nm[0];
		}
		if (val) {
			var oldnm = '$' + nm;
			if (this[oldnm] == null && this[nm]) 
				this[oldnm] = this[nm];
			this[nm] = val;
				
		} else {
			var oldnm = '$' + nm;
			this[nm] = this[oldnm]; 
			delete this[oldnm];
		}
	},
	setOverrides: function (infs) { 
		for (var nm in infs)
			this.setOverride(nm, infs[nm]);
	},

	
	
	doSelect_: function(evt) {
		if (!evt.stopped) {
			var p = this.parent;
			if (p) p.doSelect_(evt);
		}
	},
	
	doTooltipOver_: function (evt) {
		if (!evt.stopped) {
			var p = this.parent;
			if (p) p.doTooltipOver_(evt);
		}
	},
	
	doTooltipOut_: function (evt) {
		if (!evt.stopped) {
			var p = this.parent;
			if (p) p.doTooltipOut_(evt);
		}
	},
	
	doClick_: function (evt) {
		if (_fireClick(this, evt)) {
			var p = this.parent;
			if (p) p.doClick_(evt);
		}
	},
	
	doDoubleClick_: function (evt) {
		if (_fireClick(this, evt)) {
			var p = this.parent;
			if (p) p.doDoubleClick_(evt);
		}
	},
	
	doRightClick_: function (evt) {
		if (_fireClick(this, evt)) {
			var p = this.parent;
			if (p) p.doRightClick_(evt);
		}
	},
	
	doMouseOver_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseOver_(evt);
		}
	},
	
	doMouseOut_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseOut_(evt);
		}
	},
	
	doMouseDown_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseDown_(evt);
		}
	},
	
	doMouseUp_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseUp_(evt);
		}
	},
	
	doMouseMove_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseMove_(evt);
		}
	},

	
	doKeyDown_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doKeyDown_(evt);
		}
	},
	
	doKeyUp_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doKeyUp_(evt);
		}
	},
	
	doKeyPress_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doKeyPress_(evt);
		}
	},

	
	doFocus_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doFocus_(evt);
		}
	},
	
	doBlur_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doBlur_(evt);
		}
	},

	
	
	domListen_: function (n, evtnm, fn) {
		if (!this.$weave) {
			var inf = _domEvtInf(this, evtnm, fn);
			jq(n, zk).bind(inf[0], inf[1]);
		}
		return this;
	},
	
	domUnlisten_: function (n, evtnm, fn) {
		if (!this.$weave) {
			var inf = _domEvtInf(this, evtnm, fn);
			jq(n, zk).unbind(inf[0], inf[1]);
		}
		return this;
	},
	
	fromPageCoord: function (x, y) {
		var ofs = zk(this).revisedOffset();
		return [x - ofs[0], y - ofs[1]];
	},
	
	isWatchable_: function (name) {
		var n;
		return (n=this.$n()) && zk(n).isRealVisible(name!='onShow');
		
		
	},
	toJSON: function () { 
		return this.uuid;
	}

}, {
	
	$: function (n, opts) {
		if (n && n.zk && n.zk.jq == n) 
			n = n[0];

		if (!n || zk.Widget.isInstance(n))
			return n;

		var wgt, id;
		if (typeof n == "string") {
		
			if ((id = n.charAt(0)) == '#') n = n.substring(1);
			else if (id == '$') {
				id = _globals[n.substring(1)];
				return id ? id[0]: null;
			}
			wgt = _binds[n]; 
			if (!wgt)
				wgt = (id = n.indexOf('-')) >= 0 ? _binds[n.substring(0, id)]: null;
			return wgt;
		}

		if (!n.nodeType) { 
			var e1, e2;
			n = ((e1 = n.originalEvent) ? e1.z$target:null)
				|| ((e1 = n.target) && (e2 = e1.z$proxy) ? e2: e1) || n; 
		}

		opts = opts || {};
		if (opts.exact)
			return _binds[n.id];

		for (; n; n = zk(n).vparentNode(true)) {
			try {
				id = n.id || (n.getAttribute ? n.getAttribute("id") : '');
				if (id && typeof id == "string") {
					wgt = _binds[id]; 
					if (wgt)
						return wgt;

					var j = id.indexOf('-');
					if (j >= 0) {
						wgt = _binds[id = id.substring(0, j)];
						if (wgt) {
							if (!opts.child)
								return wgt;

							var n2 = wgt.$n();
							if (n2 && jq.isAncestor(n2, n))
								return wgt;
						}
					}
				}
			} catch (e) { 
			}
			if (opts.strict)
				break;
		}
		return null;
	},

	
	mimicMouseDown_: function (wgt, noFocusChange) { 
		var modal = zk.currentModal;
		if (modal && !wgt) {
			var cf = zk.currentFocus;
			
			
			if (cf && zUtl.isAncestor(modal, cf)) cf.focus(0);
			else modal.focus(0);
		} else if (!wgt || wgt.canActivate()) {
			if (!noFocusChange) {
				zk._prevFocus = zk.currentFocus;
				zk.currentFocus = wgt;
				zk._cfByMD = true;
				setTimeout(function(){zk._cfByMD = false; zk._prevFocus = null;}, 0);
					
			}

			if (wgt)
				zWatch.fire('onFloatUp', wgt); 
			else
				for (var dtid in zk.Desktop.all)
					zWatch.fire('onFloatUp', zk.Desktop.all[dtid]); 
		}
	},
	
	getElementsByName: function (name) {
		var els = [];
		for (var wid in _binds) {
			if (name == '*' || name == _binds[wid].widgetName) {
				var n = _binds[wid].$n();
				if (n) els.push(n);
			}
		}
		if (els.length)
			els.sort(function (a, b) {
				return zk.Widget.$(a).$oid - zk.Widget.$(b).$oid;
			});
		return els;
	},
	
	getElementsById: function (id) {
		var els = [];
		for (var n, wgts = _globals[id], i = wgts?wgts.length:0; i--;) {
			n = wgts[i].$n();
			if (n) els.unshift(n);
		}
		return els;
	},

	
	
	uuid: function (id) {
		var uuid = typeof id == 'object' ? id.id || '' : id,
			j = uuid.indexOf('-');
		return j >= 0 ? uuid.substring(0, j): id;
	},
	
	nextUuid: function () {
		return '_z_' + _nextUuid++;
	},

	
	isAutoId: function (id) {
		return !id;
	},

	
	register: function (clsnm, blankprev) {
		var cls = zk.$import(clsnm);
		cls.prototype.className = clsnm;
		var j = clsnm.lastIndexOf('.');
		if (j >= 0) clsnm = clsnm.substring(j + 1);
		_wgtcls[cls.prototype.widgetName = clsnm.toLowerCase()] = cls;
		if (blankprev) cls.prototype.blankPreserved = true;
	},
	
	getClass: function (wgtnm) {
		return _wgtcls[wgtnm];
	},
	
	newInstance: function (wgtnm, props) {
		var cls = _wgtcls[wgtnm];
		if (!cls) {
			zk.error(cls = 'Unknown widget: '+wgtnm);
			throw cls;
		}
		return new cls(props);
	}
});
zkreg = zk.Widget.register; 


zk.RefWidget = zk.$extends(zk.Widget, {
	
	className: "zk.RefWidget",
	
	widgetName: "refWidget",
	bind_: function () {
		var w = zk.Widget.$(this.uuid);
		if (!w) {
			zk.error("RefWidget not found: " + this.uuid);
			return;
		}

		var p;
		if (p = w.parent) 
			_unlink(p, w); 

		_replaceLink(this, w);
		this.parent = this.nextSibling = this.previousSibling = null;

		_addIdSpaceDown(w); 

		
	}
});



zk.Desktop = zk.$extends(zk.Widget, {
	bindLevel: 0,
	
	className: "zk.Desktop",
	
	widgetName: "desktop",

	
	$init: function (dtid, contextURI, updateURI, reqURI, stateless) {
		this.$super('$init', {uuid: dtid}); 

		var Desktop = zk.Desktop, dts = Desktop.all, dt = jq.now();
		if (dt > _syncdt) { 
			_syncdt = dt + 60000;
			Desktop.sync();
		}

		this._aureqs = [];
		

		if (dt = dts[dtid]) {
			if (updateURI != null) dt.updateURI = updateURI;
			if (contextURI != null) dt.contextURI = contextURI;
		} else {
			this.uuid = this.id = dtid;
			this.updateURI = updateURI != null ? updateURI: zk.updateURI;
			this.contextURI = contextURI != null ? contextURI: zk.contextURI;
			this.requestPath = reqURI || '';
			this.stateless = stateless;
			dts[dtid] = this;
			++Desktop._ndt;
			if (!Desktop._dt) Desktop._dt = this; 
		}
	},
	_exists: function () {
		if (this._pguid) 
			for (var w = this.firstChild; w; w = w.nextSibling) 
				if (w.$n())
					return true;
	},
	bind_: zk.$void,
	unbind_: zk.$void,
	
	setId: zk.$void
},{
	
	$: function (dtid) {
		var Desktop = zk.Desktop, w;
		if (dtid) {
			if (Desktop.isInstance(dtid))
				return dtid;

			w = Desktop.all[dtid];
			if (w)
				return w;

			w = zk.Widget.$(dtid);
			for (; w; w = w.parent) {
				if (w.desktop)
					return w.desktop;
				if (w.$instanceof(Desktop))
					return w;
			}
			return null;
		}

		if (w = Desktop._dt)
			return w;
		for (dtid in Desktop.all)
			return Desktop.all[dtid];
	},
	
	all: {},
	_ndt: 0, 
	
	sync: function () {
		var Desktop = zk.Desktop, dts = Desktop.all, dt;
		if ((dt = Desktop._dt) && !dt._exists()) 
			Desktop._dt = null;
		for (var dtid in dts) {
			if (!(dt = dts[dtid])._exists()) { 
				delete dts[dtid];
				--Desktop._ndt;
			} else if (!Desktop._dt)
				Desktop._dt = dt;
		}
		return Desktop._dt;
	}
});

zk._wgtutl = { 
	setUuid: function (wgt, uuid) { 
		if (!uuid)
			uuid = zk.Widget.nextUuid();
		if (uuid != wgt.uuid) {
			var n = wgt.$n();
			if (n) {
				
				if (!wgt.rawId)
					throw 'id immutable after bound'; 
				n.id = uuid;
				delete _binds[wgt.uuid];
				_binds[uuid] = wgt;
				wgt.clearCache();
			}
			wgt.uuid = uuid;
		}
	},
	replace: function (from, to) { 
		_replaceLink(from, to);
		to.lastChild = from.lastChild;
		for (var p = to.firstChild = from.firstChild; p; p = p.nextSibling)
			p.parent = to;
		from.parent = from.nextSibling = from.previousSibling =
		from.firstChild = from.lastChild = null;
	},

	autohide: function () { 
		if (!_floatings.length) {
			for (var n; n = _hidden.shift();)
				n.style.visibility = n.getAttribute('z_ahvis')||'';
			return;
		}

		for (var tns = ['IFRAME', 'APPLET'], i = 2; i--;)
			l_nxtel:
			for (var ns = document.getElementsByTagName(tns[i]), j = ns.length; j--;) {
				var n = ns[j], $n = zk(n), visi;
				if ((!(visi=$n.isVisible(true)) && !_hidden.$contains(n))
				|| (!i && !n.getAttribute("z_autohide") && !n.getAttribute("z.autohide"))) 
					continue; 

				var tc = _topnode(n);
				function hide(f) {
					var tf = _topnode(f);
					if (tf == tc || _zIndex(tf) < _zIndex(tc) || !$n.isOverlapped(f))
						return;

					if (visi) {
						_hidden.push(n);
						try {
							n.setAttribute('z_ahvis', n.style.visibility);
						} catch (e) {
						}
						n.style.visibility = 'hidden';
					}
					return true; 
				}

				for (var k = _floatings.length; k--;)
					if (hide(_floatings[k].node))
						continue l_nxtel;

				if (_hidden.$remove(n))
					n.style.visibility = n.getAttribute('z_ahvis')||'';
			}
	}
};
})();


zk.Page = zk.$extends(zk.Widget, {
	_style: "width:100%;height:100%",
	
	className: "zk.Page",
	
	widgetName: "page",

	
	$init: function (props, contained) {
		this._fellows = {};

		this.$super('$init', props);

		if (contained) zk.Page.contained.push(this);
	},
	
	redraw: function (out) {
		out.push('<div', this.domAttrs_(), '>');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</div>');
	}
},{
	
	contained: []
});
zkreg('zk.Page', true);


zk.Body = zk.$extends(zk.Page, {
	$init: function (dt) {
		this.$super('$init', {});
		this.desktop = dt;
	},
	$n: function (subId) {
		return subId ? null: document.body;
	},
	redraw: zk.$void
});

zk.Native = zk.$extends(zk.Widget, {
	
	className: "zk.Native",
	
	widgetName: "native",

	redraw: function (out) {
		var s = this.prolog;
		if (s) {
			out.push(s);
			if (this.value && s.startsWith("<textarea"))
				out.push(this.value);
		}

		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);

		s = this.epilog;
		if (s) out.push(s);
	}
});


zk.Macro = zk.$extends(zk.Widget, {
	
	className: "zk.Macro",
	
	widgetName: "macro",
	_enclosingTag: "span",

	$init: function () {
		this._fellows = {};
		this.$supers('$init', arguments);
	},
	$define: {
		
		
		enclosingTag: function () {
			this.rerender();
		}
	},

	
	redraw: function (out) {
		out.push('<', this._enclosingTag, this.domAttrs_(), '>');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</', this._enclosingTag, '>');
	}
});


zk.Skipper = zk.$extends(zk.Object, {
	
	skipped: function (wgt, child) {
		return wgt.caption != child;
	},
	
	skip: function (wgt, skipId) {
		var skip = jq(skipId || (wgt.uuid + '-cave'), zk)[0];
		if (skip && skip.firstChild) {
			skip.parentNode.removeChild(skip);
				
			return skip;
		}
	},
	
	restore: function (wgt, skip) {
		if (skip) {
			var loc = jq(skip.id, zk)[0];
			for (var el; el = skip.firstChild;) {
				skip.removeChild(el);
				loc.appendChild(el);

				zjq._fixIframe(el); 
			}
		}
	}
});


	
	

zk.Skipper.nonCaptionSkipper = new zk.Skipper();



function zkopt(opts) {
	for (var nm in opts) {
		var val = opts[nm];
		switch (nm) {
		case "pd": zk.procDelay = val; break;
		case "td": zk.tipDelay =  val; break;
		case "rd": zk.resendDelay = val; break;
		case "dj": zk.debugJS = val; break;
		case "kd": zk.keepDesktop = val; break;
		case "pf": zk.pfmeter = val; break;
		case "cd": zk.clickFilterDelay = val; break;
		case "ta": zk.timerAlive = val; break;
		case "gd": zk.groupingDenied = val; break;
		case "to":
			zk.timeout = val;
			zAu._resetTimeout();
			break;
		case "ed":
			switch (val) {
			case 'e':
				zk.feature.ee = true;
			case 'p':
				zk.feature.pe = true;
			}
			break;
		case 'eu': zAu.setErrorURI(val); break;
		case 'ppos': zk.progPos = val; break;
		case 'eup': zAu.setPushErrorURI(val);
		}
	}
}


zk.copy(zk, (function() {
	var _loaded = {'zk': true}, 
		_xloadings = [], 
		_loadedsemis = [], 
		_afterLoadFronts = [],
		_afterLoads = [],
		_afterPkgLoad = {}, 
		_pkgdepend = {},
		_pkgver = {},
		_pkghosts = {}, _defhost = [],
		_loading = zk.copy({}, _loaded); 

	
	
	function markLoading(nm) {
		
		_loading[nm] = true;

		_xloadings.push(nm);
		if (updCnt() == 1) {
			zk.disableESC();
		}
	}
	function doEnd(afs, wait) {
		for (var fn; fn = afs.shift();) {
			if (updCnt() || (wait && _loadedsemis.length)) {
				afs.unshift(fn);
				return;
			}
			fn();
		}
	}
	function updCnt() {
		return (zk.loading = _xloadings.length);
	}

  return { 
	setLoaded: _zkf = function (pkg, wait) { 
		_xloadings.$remove(pkg);
		_loading[pkg] = true;

		if (wait) {
			if (!_loaded[pkg]) _loadedsemis.push(pkg);
		} else {
			_loadedsemis.$remove(pkg);
			_loaded[pkg] = true;

			var afpk = _afterPkgLoad[pkg];
			if (afpk) {
				delete _afterPkgLoad[pkg];
				_afterLoadFronts.$addAll(afpk);
			}

			var deps = _pkgdepend[pkg];
			if (deps) {
				delete _pkgdepend[pkg];
				for (var pn; pn = deps.unshift();)
					zk.load(pn);
			}
		}

		if (!updCnt()) {
			try {
				zk.enableESC();
			} catch (ex) {
			}
			doEnd(_afterLoadFronts);
			doEnd(_afterLoads, 1);
		}
	},
	
	setScriptLoaded: _zkf,

	
	isLoaded: function (pkg, loading) {
		return (loading && _loading[pkg]) || _loaded[pkg];
	},
	
	
	load: function (pkg, dt, func) {
		if (typeof dt == 'function')
			if (func) throw 'At most one function allowed';
			else {
				func = dt;
				dt = null;
			}

		if (func) zk.afterLoad(pkg, func, true);

		var loading;
		for (var pkgs = pkg.split(','), j = pkgs.length; j--;) {
			pkg = pkgs[j].trim();
			if (!zk._load(pkg, dt))
				loading = true;
		}
		return !loading;
	},
	_load: function (pkg, dt) { 
		if (!pkg || _loading[pkg])
			return !zk.loading && !_loadedsemis.length;
			

		markLoading(pkg);

		var modver = zk.getVersion(pkg) || zk.build,
			e = document.createElement("script"),
			uri = pkg + ".wpd",
			host = zk.getHost(pkg, true);
		e.type = "text/javascript";
		e.charset = "UTF-8";

		if (uri.charAt(0) != '/') uri = '/' + uri;

		if (host) uri = host + "/web/js" + uri;
		else {
			if (modver) uri = "/web/_zv" + modver + "/js" + uri;
			else uri = "/web/js" + uri;
			uri = zk.ajaxURI(uri, {desktop:dt,au:true});
		}

		e.src = uri;
		jq.head().appendChild(e);
		return false;
	},

	
	loadScript: function (src, name, charset) {
		if (name)
			markLoading(name);

		var e = document.createElement("script");
		e.type = "text/javascript";
		e.charset = charset || "UTF-8";
		e.src = src;
		jq.head().appendChild(e);
		return this;
	},
	
	loadCSS: function (href, id, media) {
		var ln = document.createElement("link");
		if (id) ln.id = id;
		ln.rel = "stylesheet";
		ln.type = "text/css";
		ln.href = href;
		if (media) ln.media = media;
		jq.head().appendChild(ln);
		return this;
	},

	
	getVersion: function (pkg) {
		for (var ver; pkg; pkg = pkg.substring(0, pkg.lastIndexOf('.')))
			if (ver = _pkgver[pkg])
				return ver;
	},
	
	setVersion: function (pkg, ver) {
		_pkgver[pkg] = ver;
	},
	
	depends: function (a, b) {
		if (a && b) 
			if (_loaded[a]) zk.load(b);
			else {
				if (_pkgdepend[a]) _pkgdepend[a].push(b);
				else _pkgdepend[a] = [b];
			}
	},

	
	
	afterLoad: function (a, b, front) {
		if (typeof a == 'string') {
			if (!b) return true;

			for (var pkgs = a.split(','), j = pkgs.length; j--;) {
				var p = pkgs[j].trim();
				if (p && !_loaded[p]) {
					while (j--) {
						var p2 = pkgs[j].trim();
						if (p2 && !_loaded[p2]) { 
							var a1 = a, b1 = b;
							b = function () {
								zk.afterLoad(a1, b1, front); 
							};
							break;
						}
					}

					if (_afterPkgLoad[p]) _afterPkgLoad[p].push(b);
					else _afterPkgLoad[p] = [b];
					return false;
				}
			}

			
			a = b;
		}

		if (a) {
			if (zk.loading || _loadedsemis.length) {
				(front ? _afterLoadFronts: _afterLoads).push(a);
				return false;
			}
			a(); 
			return true;
		}
	},
	
	getHost: function (pkg, js) {
		for (var p in _pkghosts)
			if (pkg.startsWith(p))
				return _pkghosts[p][js ? 1: 0];
		return _defhost[js ? 1: 0];
	},
	
	setHost: function (host, updURI, pkgs) {
		var hostUpd = host + updURI;
		if (!_defhost.length)
			for (var scs = document.getElementsByTagName("script"), j = 0, len = scs.length;
			j < len; ++j) {
				var src = scs[j].src;
				if (src)
					if (src.startsWith(host)) {
						_defhost = [host, hostUpd];
						break;
					} else if (src.indexOf("/zk.wpd") >= 0)
						break;
			}
		for (var j = 0; j < pkgs.length; ++j)
			_pkghosts[pkgs[j]] = [host, hostUpd];
	}
  }
})());




function zkpi(nm, wv) {
	return zk.isLoaded(nm) ? null: {n: nm, p: zk.$package(nm, false, wv)};
}


function zkpb(pguid, dtid, contextURI, updateURI, reqURI, props) {
	zkx([0, pguid,
		zk.copy(props, {dt: dtid, cu: contextURI, uu: updateURI, ru: reqURI}),[]]);
}

zkpe = zk.$void;


function zkver(ver, build, ctxURI, updURI, modVers, opts) {
	zk.version = ver;
	zk.build = build;
	zk.contextURI = ctxURI;
	zk.updateURI = updURI;

	for (var nm in modVers)
		zk.setVersion(nm, modVers[nm]);

	zk.feature = {standard: true};
	zkopt(opts);
}


function zkmld(wgtcls, molds) {
	if (!wgtcls.superclass) {
		zk.afterLoad(function () {zkmld(wgtcls, molds);});
		return;
	}

	var ms = wgtcls.molds = {};
	for (var nm in molds) {
		var fn = molds[nm];
		ms[nm] = typeof fn == 'function' ? fn: fn[0].molds[fn[1]];
	}		
}


function zkamn(pkg, fn) {
	zk.load(pkg, function () {
		setTimeout(function(){
			zk.afterMount(fn);
		}, 20);
	});
}



function zkmprops(uuid, props) {
	
	var v;
	if (v = zk.cut(props, "z$ea")) {
		var embed = jq(uuid, zk)[0];
		if (embed) {
			var val = [], n;
			while (n = embed.firstChild) {
				val.push(n);
				embed.removeChild(n);
			}
			props[v] = val;
		}
	}

	
	if (v = zk.cut(props, "z$al"))
		zk.afterLoad(function () {
			for (var p in v)
				props[p] = v[p](); 
		});
}

(function () {
	var Widget = zk.Widget,
		_wgt_$ = Widget.$, 
		_createInf0 = [], 
		_createInf1 = [], 
		_aftMounts = [], 
		_mntctx = {}, 
		_paci = {s: 0, e: -1, f0: [], f1: []}, 
		_t0 = jq.now();

	
	
	
	
	
	
	
	jq(function () {
		function _stateless() {
			var dts = zk.Desktop.all;
			for (var dtid in dts)
				if (dts[dtid].stateless) return true;
		}
		_paci.i = setInterval(function () {
			var stateless;
			if ((zk.booted && !zk.mounting) || (stateless = _stateless()))
				if (stateless || _paci.s == _paci.e) { 
					clearInterval(_paci.i);
					var fs = _paci.f0.concat(_paci.f1);
					_paci = null;
					for (var f; f = fs.shift();)
						f();
				} else
					_paci.e = _paci.s;
		}, 25);
	});
	
	zk._apac = function (fn, _which_) {
		if (_paci)
			return _paci[_which_ || "f1"].push(fn);
		zk.afterMount(fn); 
	};



	
	

	zk.afterMount = function (fn, delay) { 
		if (fn)
			if (!jq.isReady)
				jq(function () {zk.afterMount(fn);}); 
			else if (zk.mounting)
				_aftMounts.push(fn); 
			else if (zk.loading)
				zk.afterLoad(fn);
			else if (delay < 0) {
				fn();
				return true; 
			} else
				setTimeout(fn, delay);
	};

	function _curdt() {
		return _mntctx.curdt || (_mntctx.curdt = zk.Desktop.$());
	}
	
	function mountpkg() {
		var types = {};
		for (var j = _createInf0.length; j--;) {
			var inf = _createInf0[j];
			if (!inf.pked) { 
				inf.pked = true;
				getTypes(types, inf[0], inf[1]);
			}
		}

		for (var type in types) {
			var j = type.lastIndexOf('.');
			if (j >= 0)
				zk._load(type.substring(0, j), types[type]); 
		}
	}
	
	function getTypes(types, dt, wi) {
		
		var v = zk.cut(wi[2], "z$pk");
		if (v) zk.load(v);

		var type = wi[0];
		if (type === 0) 
			type = wi[2].wc;
		else if (type === 1) 
			wi[0] = type = "zhtml.Widget";
		if (type)
			types[type] = dt;

		for (var children = wi[3], j = children.length; j--;)
			getTypes(types, dt, children[j]);
	}
	
	function mtBL() {
		if (zk.loading)
			return zk.afterLoad(mtBL);

		var inf = _createInf0.shift();
		if (inf) {
			_createInf1.push([inf[0], create(inf[3]||inf[0], inf[1], true), inf[2], inf[4]]);
				
				
				
				
				

			if (_createInf0.length)
				return run(mtBL);
		}

		mtBL0();
	}
	function mtBL0() {
		for (;;) {
			if (_createInf0.length)
				return; 

			if (zk.loading)
				return zk.afterLoad(mtBL0);

			if (zk.ie && !jq.isReady) 
				return jq(mtBL0);

			var inf = _createInf1.shift();
			if (!inf) break;

			var wgt = inf[1];
			if (inf[2])
				wgt.bind(inf[0]); 
			else
				wgt.replaceHTML('#' + wgt.uuid, inf[0]);

			doAuCmds(inf[3]); 
		}

		mtBL1();
	}
	function mtBL1() {
		if (_createInf0.length || _createInf1.length)
			return; 

		zk.booted = true;
		zk.mounting = false;
		doAfterMount(mtBL1);
		_paci && ++_paci.s;
		zk.endProcessing();

		zk.bmk.onURLChange();
		if (zk.pfmeter) {
			var dts = zk.Desktop.all;
			for (var dtid in dts)
				zAu._pfdone(dts[dtid], dtid);
		}
	}

	
	function mtAU() {
		if (zk.loading) {
			zk.afterLoad(mtAU);
			return;
		}

		try {
			var inf = _createInf0.shift(),
				filter, wgt;
			if (inf) {
				if (filter = inf[4][1])
					Widget.$ = function (n, opts) {return filter(_wgt_$(n, opts));}
				try {
					wgt = create(null, inf[1]);
				} finally {
					if (filter) Widget.$ = _wgt_$;
				}
				inf[4][0](wgt);
			}
		} finally {
			if (_createInf0.length)
				run(mtAU); 
			else
				mtAU0();
		}
	}
	function mtAU0() {
		zk.mounting = false;
		doAfterMount(mtAU0);

		zAu._doCmds(); 
		doAfterMount(mtAU0);
	}
	function doAfterMount(fnext) {
		for (var fn; fn = _aftMounts.shift();) {
			fn();
			if (zk.loading) {
				zk.afterLoad(fnext); 
				return true; 
			}
		}
	}

	function doAuCmds(cmds) {
		if (cmds && cmds.length)
			zk._apac(function () {
				for (var j = 0; j < cmds.length; j += 2)
					zAu.process(cmds[j], cmds[j + 1]);
			}, "f0");
	}

	
	function create(parent, wi, ignoreDom) {
		var wgt,
			type = wi[0],
			uuid = wi[1],
			props = wi[2]||{};
		if (type === 0) { 
			type = zk.cut(props, "wc")
			var cls = type ? zk.$import(type): zk.Page;
			(wgt = new cls({uuid: uuid}, zk.cut(props, "ct"))).inServer = true;
			if (parent) parent.appendChild(wgt, ignoreDom);
		} else {
			if (type == "#stub") { 
				if (!(wgt = _wgt_$(uuid) 
				|| zAu._wgt$(uuid))) 
					throw "Unknow stub "+uuid;
				var w = new Widget();
				zk._wgtutl.replace(wgt, w);
				wgt.unbind(); 
			} else {
				var cls = zk.$import(type),
					initOpts = {uuid: uuid}, v;
				if (!cls)
					throw 'Unknown widget: ' + type;
				if (v = wi[4]) initOpts.mold = v;
				if (v = zk.cut(props, "z$is")) initOpts.z$is = v;
				(wgt = new cls(initOpts)).inServer = true;
			}
			if (parent) parent.appendChild(wgt, ignoreDom);

			zkmprops(uuid, props);
		}

		for (var nm in props)
			wgt.set(nm, props[nm]);

		for (var j = 0, childs = wi[3], len = childs.length;
		j < len; ++j)
			create(wgt, childs[j]);
		return wgt;
	}

	
	function run(fn) {
		var t = jq.now(), dt = t - _t0;
		if (dt > 2500) { 
			_t0 = t;
			dt >>= 6;
			setTimeout(fn, dt < 10 ? dt: 10); 
				
		} else
			fn();
	}

  zk.copy(window, {
	
	zkdt: function (dtid, contextURI, updateURI, reqURI) {
		var dt = zk.Desktop.$(dtid);
		if (dt == null) {
			dt = new zk.Desktop(dtid, contextURI, updateURI, reqURI);
			if (zk.pfmeter) zAu._pfrecv(dt, dtid);
		} else {
			if (updateURI != null) dt.updateURI = updateURI;
			if (contextURI != null) dt.contextURI = contextURI;
			if (reqURI != null) dt.requestPath = reqURI;
		}
		_mntctx.curdt = dt;
		return dt;
	},

	
	zkx: function (wi, extra, aucmds, js) { 
		zk.mounting = true;

		try {
			if (js) jq.globalEval(js);

			var delay, mount = mtAU, owner;
			if (!extra || !extra.length) { 
				delay = extra;
				if (wi) {
					extra = aucmds;
					aucmds = null;
				}
				mount = mtBL;
			} 

			if (wi) {
				if (wi[0] === 0) { 
					var props = wi[2];
					zkdt(zk.cut(props, "dt"), zk.cut(props, "cu"), zk.cut(props, "uu"), zk.cut(props, "ru"))
						._pguid = wi[1];
					if (owner = zk.cut(props, "ow"))
						owner = Widget.$(owner);
				}

				_createInf0.push([_curdt(), wi, _mntctx.bindOnly, owner, extra]);
				mountpkg();
			}

			if (delay) setTimeout(mount, 0); 
			else run(mount);

			doAuCmds(aucmds);
		} catch (e) {
			zk.mounting = false;
			zk.error("Failed to mount: "+(e.message||e));
		}
	},
	
	
	zkx_: function (args, stub, filter) {
		_t0 = jq.now(); 
		args[1] = [stub, filter]; 
		zkx.apply(this, args); 
	},

	
	zkac: function () {
		doAuCmds(arguments);
	},

	
	zkmx: function () {
		zkmb();
		try {
			zkx.apply(window, arguments);
		} finally {
			zkme();
		}
	},

	
	zkmb: function (bindOnly) {
		_mntctx.bindOnly = bindOnly;
		var t = 390 - (jq.now() - _t0);
		zk.startProcessing(t > 0 ? t: 0);
	},
	
	zkme: function () {
		_mntctx.curdt = null;
		_mntctx.bindOnly = false;
	}
  });

})(window);


jq(function() {
	var Widget = zk.Widget,
		_bfUploads = [],
		_reszInf = {},
		_subevts = { 
			onClick: 'doSelect_',
			onRightClick: 'doSelect_',
			onMouseOver: 'doTooltipOver_',
			onMouseOut: 'doTooltipOut_'
		};

	
	zk.copy(zk, {
		
		beforeUnload: function (fn, opts) { 
			if (opts && opts.remove) _bfUploads.$remove(fn);
			else _bfUploads.push(fn);
		}
	});

	function _doEvt(wevt) {
		var wgt = wevt.target;
		if (wgt && !wgt.$weave) {
			var en = wevt.name,
				fn = _subevts[en];
			if (fn)
				wgt[fn].call(wgt, wevt);
			if (!wevt.stopped)
				wgt['do' + en.substring(2) + '_'].call(wgt, wevt);
			if (wevt.domStopped)
				wevt.domEvent.stop();
		}
	}
	
	function _docMouseDown(evt, wgt, noFocusChange) {
		zk.clickPointer[0] = evt.pageX;
		zk.clickPointer[1] = evt.pageY;

		if (!wgt) wgt = evt.target;

		var target = evt.domTarget,
			body = document.body,
			old = zk.currentFocus;
		if ((target != body && target != body.parentNode) ||
				(evt.pageX < body.clientWidth && evt.pageY < body.clientHeight)) 
			Widget.mimicMouseDown_(wgt, noFocusChange); 
			
		_doEvt(evt);
		
		
		if (old && zk.ie) {
			var n = jq(old)[0];
			if (n)
				setTimeout(function () {
					try {
						var cf = zk.currentFocus;
						if (cf != old && !n.offsetWidth && !n.offsetHeight)
							cf.focus();
					} catch (e) {}
				});
		}
	}
	
	function _docResize() {
		if (!_reszInf.time) return; 

		var now = jq.now();
		if (zk.mounting || zk.loading || now < _reszInf.time || zk.animating()) {
			setTimeout(_docResize, 10);
			return;
		}

		_reszInf.time = null; 
		_reszInf.lastTime = now + 1000;
			

		if (!zk.zkuery) zAu._onClientInfo();

		_reszInf.inResize = true;
		try {
			zWatch.fire('beforeSize'); 
			zWatch.fire('onSize'); 
			_reszInf.lastTime = jq.now() + 8;
		} finally {
			_reszInf.inResize = false;
		}
	}
	
	function _afterKeyDown(wevt) {
		var dts = zk.Desktop.all, Page = zk.Page;
		for (var dtid in dts)
			for (var wgt = dts[dtid].firstChild; wgt; wgt = wgt.nextSibling)
				if (wgt.$instanceof(Page)) {
					for (var w = wgt.firstChild; w; w = w.nextSibling)
						if (_afterKD(w, wevt))
							return;
				} else if (_afterKD(wgt, wevt))
					return; 
	}
	function _afterKD(wgt, wevt) {
		if (!wgt.afterKeyDown_)
			return; 
		wevt.target = wgt; 
		return wgt.afterKeyDown_(wevt);
	}

	jq(document)
	.keydown(function (evt) {
		var wgt = Widget.$(evt, {child:true}),
			wevt = new zk.Event(wgt, 'onKeyDown', evt.keyData(), null, evt);
		if (wgt) {
			_doEvt(wevt);
			if (!wevt.stopped && wgt.afterKeyDown_) {
				wgt.afterKeyDown_(wevt);
				if (wevt.domStopped)
					wevt.domEvent.stop();
			}
		} else
			_afterKeyDown(wevt);

		if (evt.keyCode == 27
		&& (zk._noESC > 0 || (!zk.zkuery && zAu.shallIgnoreESC()))) 
			return false; 
	})
	.keyup(function (evt) {
		var wgt = zk.keyCapture;
		if (wgt) zk.keyCapture = null;
		else wgt = Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onKeyUp', evt.keyData(), null, evt));
	})
	.keypress(function (evt) {
		var wgt = zk.keyCapture;
		if (!wgt) wgt = Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onKeyPress', evt.keyData(), null, evt));
	})
	.bind('zcontextmenu', function (evt) {
		
		
		
		zk.clickPointer[0] = evt.pageX;
		zk.clickPointer[1] = evt.pageY;

		var wgt = Widget.$(evt, {child:true});
		if (wgt) {
			if (zk.ie)
				evt.which = 3;
			var wevt = new zk.Event(wgt, 'onRightClick', evt.mouseData(), {ctl:true}, evt);
			_doEvt(wevt);
			if (wevt.domStopped)
				return false;
		}
		return !zk.ie || evt.returnValue;
	})
	.bind('zmousedown', function(evt){
		var wgt = Widget.$(evt, {child:true});
		_docMouseDown(
			new zk.Event(wgt, 'onMouseDown', evt.mouseData(), null, evt),
			wgt);
	})
	.bind('zmouseup', function(evt){
		var e = zk.Draggable.ignoreMouseUp(), wgt;
		if (e === true)
			return; 

		if (e != null) {
			_docMouseDown(e, null, true); 

			
			if ((wgt = e.target) && wgt != zk.currentFocus)
				try {wgt.focus();} catch (e) {}
				
		}

		wgt = zk.mouseCapture;
		if (wgt) zk.mouseCapture = null;
		else wgt = Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onMouseUp', evt.mouseData(), null, evt));
	})
	.bind('zmousemove', function(evt){
		zk.currentPointer[0] = evt.pageX;
		zk.currentPointer[1] = evt.pageY;

		var wgt = zk.mouseCapture;
		if (!wgt) wgt = Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onMouseMove', evt.mouseData(), null, evt));
	})
	.mouseover(function (evt) {
		if (zk.ios && zk.Draggable.ignoreClick()) return;
		zk.currentPointer[0] = evt.pageX;
		zk.currentPointer[1] = evt.pageY;

		_doEvt(new zk.Event(Widget.$(evt, {child:true}), 'onMouseOver', evt.mouseData(), {ignorable:1}, evt));
	})
	.mouseout(function (evt) {
		_doEvt(new zk.Event(Widget.$(evt, {child:true}), 'onMouseOut', evt.mouseData(), {ignorable:1}, evt));
	})
	.click(function (evt) {
		if (zk.Draggable.ignoreClick()) return;

		zjq._fixClick(evt);

		if (evt.which == 1)
			_doEvt(new zk.Event(Widget.$(evt, {child:true}),
				'onClick', evt.mouseData(), {ctl:true}, evt));
			
	})
	.bind('zdblclick', function (evt) {
		if (zk.Draggable.ignoreClick()) return;

		var wgt = Widget.$(evt, {child:true});
		if (wgt) {
			var wevt = new zk.Event(wgt, 'onDoubleClick', evt.mouseData(), {ctl:true}, evt);
			_doEvt(wevt);
			if (wevt.domStopped)
				return false;
		}
	});

	jq(window).resize(function () {
		if (zk.mounting || zk.skipResize)
			return; 

	
	
	
	
	
	
	
	

		var now = jq.now();
		if ((_reszInf.lastTime && now < _reszInf.lastTime) || _reszInf.inResize)
			return; 

		var delay = zk.ie ? 250: 50;
		_reszInf.time = now + delay - 1; 
		setTimeout(_docResize, delay);
	})
	.scroll(function () {
		zWatch.fire('onScroll'); 
	})
	.unload(function () {
		zk.unloading = true; 

		
		
		
		
		
		var bRmDesktop = !zk.opera && !zk.keepDesktop && !zk.zkuery;
		if (bRmDesktop || zk.pfmeter) {
			try {
				var dts = zk.Desktop.all;
				for (var dtid in dts) {
					var dt = dts[dtid];
					jq.ajax(zk.$default({
						url: zk.ajaxURI(null, {desktop:dt,au:true}),
						data: {dtid: dtid, cmd_0: bRmDesktop?"rmDesktop":"dummy", opt_0: "i"},
						beforeSend: function (xhr) {
							if (zk.pfmeter) zAu._pfsend(dt, xhr, true);
						},
						
						
						
						async: !zk.safari
					}, zAu.ajaxSettings), true);
				}
			} catch (e) { 
			}
		}
	});

	var _oldBfUnload = window.onbeforeunload;
	window.onbeforeunload = function () {
		if (!zk.skipBfUnload) {
			if (zk.confirmClose)
				return zk.confirmClose;

			for (var j = 0; j < _bfUploads.length; ++j) {
				var s = _bfUploads[j]();
				if (s) return s;
			}
		}

		if (_oldBfUnload) {
			var s = _oldBfUnload.apply(window, arguments);
			if (s) return s;
		}

		zk.unloading = true; 
		
	};
}); 












(function ($) {

    function f(n) {
        
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.valueOf() ? this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,

        meta = {    
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {






        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {



        var i,          
            k,          
            v,          
            length,
            mind = gap,
            partial,
            value = holder[key];



        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }




        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }



        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':



            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':





            return String(value);




        case 'object':




            if (!value) {
                return 'null';
            }




            partial = [];



            if (Object.prototype.toString.apply(value) === '[object Array]') {




                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }




                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }


                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }




            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }




        $.toJSON = function (value, replacer) {

            var i;
            gap = '';





            rep = replacer;





            return str('', {'': value});
        };

	$.evalJSON = function (s) {
		return (new Function('return (' + s +')'))(); 
		
	};
	$.j2d = function (s) {
		
		if (s == null) return null;
		var s = s.split('.');
		return new Date(parseInt(s[0], 10), parseInt(s[1]) - 1, parseInt(s[2]),
			parseInt(s[3]), parseInt(s[4]), parseInt(s[5]), parseInt(s[6]));
	};
	$.d2j = function (d) {
		return d ? [d.getFullYear(), d.getMonth() + 1, d.getDate(),
			d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()].join('.'): null;
	};

}(jq)); 



(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
	setup: function() {
		if ( this.addEventListener )
			for ( var i=types.length; i; )
				this.addEventListener( types[--i], handler, false );
		else
			this.onmousewheel = handler;
	},
	
	teardown: function() {
		if ( this.removeEventListener )
			for ( var i=types.length; i; )
				this.removeEventListener( types[--i], handler, false );
		else
			this.onmousewheel = null;
	}
};

$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});


function handler(event) {
	var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
	
	event = $.event.fix(event || window.event);
	event.type = "mousewheel";
	
	if ( event.wheelDelta ) delta = event.wheelDelta/120;
	if ( event.detail     ) delta = -event.detail/3;
	
	
	args.unshift(event, delta);

	return $.event.handle.apply(this, args);
}

})(jQuery);
}(function(){zk._p=zkpi('zul',true);try{
(function () {
	var $alert = jq.alert,
		icons = {QUESTION: "z-msgbox z-msgbox-question",
			EXCLAMATION: "z-msgbox z-msgbox-exclamation",
			INFORMATION: "z-msgbox z-msgbox-information",
			ERROR: "z-msgbox z-msgbox-error",
			NONE: 'z-msgbox z-msgbox-none'
		};

	function newButton(nm, f) {
		return new zul.wgt.Button({
			label: msgzul[nm.toUpperCase()]||nm,
			listeners: {
				onClick: function (evt) {
					if (typeof f == 'function')
						f.call(this, evt);
					this.$o().detach();
				}
			}
		});
	}
	function getButtons(opts) {
		var btns = [];
		for (var nm in opts) {
			var f = opts[nm];
			btns.push(newButton(nm, typeof f == 'function' ? f: null));
		}
		if (!btns.length)
			btns.push(newButton('OK'));
		return btns;
	}

	jq.alert = function (msg, opts) {
		if (opts && opts.mode == 'os')
			return $alert(msg);

		opts = opts || {};
		zk.load("zul.wnd,zul.wgt,zul.box", function () {
			var wnd = new zul.wnd.Window({
				closable: true,
				width: '250pt',
				title: opts.title||zk.appName,
				border: 'normal',
				children: [
					new zul.box.Box({
						mold: 'horizontal',
						children: [
							new zul.wgt.Div({sclass: icons[(opts.icon||'').toUpperCase()]||icons.INFORMATION}),
							new zul.wgt.Div({
								sclass: 'z-messagebox',
								width: '210pt',
								children: [
									new zul.wgt.Label({
										value: msg,
										multiline: true
									})
								]
							})
						]
					}),
					new zul.wgt.Separator({bar: true}),
					new zul.box.Box({
						mold: 'horizontal',
						style: 'margin-left:auto; margin-right:auto',
						children: getButtons(opts.button)
					})
				],
				mode: opts.mode||'modal'
			});

			var p = opts.desktop || zk.Desktop.$();
			if (p && (p = p.firstChild) && p.desktop)
				p.appendChild(wnd);
			else
				jq(document.body).append(wnd);
		});
  	};
	zAu.wrongValue_ = function(wgt, msg) {
		var efs = wgt.effects_;
		if (efs.errMesg) {
			efs.errMesg.destroy();
			delete efs.errMesg;
		}
		if (msg !== false) {
			efs.errMesg = {destroy: zk.$void};
			zk.load("zul.inp", function () {
				if (efs.errMesg) 
					(efs.errMesg = new zul.inp.Errorbox()).show(wgt, msg);
			});
		}
	};
})();





(function () {
	
	var _tt_inf, _tt_tmClosing, _tt_tip, _tt_ref;
	function _tt_beforeBegin(ref) {
		if (_tt_tip && !_tt_tip.isOpen()) { 
			_tt_clearOpening_();
			_tt_clearClosing_();
			_tt_tip = _tt_ref = null;
		}

		var overTip = _tt_tip && zUtl.isAncestor(_tt_tip, ref);
		if (overTip) _tt_clearClosing_(); 
		return !overTip;
	}
	function _tt_begin(tip, ref, params) {
		if (_tt_tip != tip || _tt_ref != ref) {
			_tt_close_();
			_tt_inf = {
				tip: tip, ref: ref, params: params,
				timer: setTimeout(_tt_open_, params.delay !== undefined ? params.delay : zk.tipDelay)
			};
		} else
			_tt_clearClosing_();
	}
	function _tt_end(ref) {
		if (_tt_ref == ref || _tt_tip == ref) {
			_tt_clearClosing_(); 
			_tt_tmClosing = setTimeout(_tt_close_, 100);
			
		} else
			_tt_clearOpening_();
	}
	function _tt_clearOpening_() {
		var inf = _tt_inf;
		if (inf) {
			_tt_inf = null;
			clearTimeout(inf.timer);
		}
	}
	function _tt_clearClosing_() {
		var tmClosing = _tt_tmClosing;
		if (tmClosing) {
			_tt_tmClosing = null;
			clearTimeout(tmClosing);
		}
	}
	function _tt_open_() {
		var inf = _tt_inf;
		if (inf) {
			_tt_tip = inf.tip,
			_tt_ref = inf.ref;
			_tt_inf = null;

			var n = _tt_ref.$n();
			if (n && !zk(n).isRealVisible()) 
				return _tt_tip = _tt_ref = null;

			var params = inf.params,
				xy = params.x !== undefined ? [params.x, params.y]
							: zk.currentPointer;
			_tt_tip.open(_tt_ref, xy, params.position ? params.position : params.x === null ? "after_pointer" : null, {sendOnOpen:true});
		}
	}
	function _tt_close_() {
		_tt_clearOpening_();
		_tt_clearClosing_();

		var tip = _tt_tip;
		if (tip) {
			_tt_tip = _tt_ref = null;
			tip.close({sendOnOpen:true});
		}
	}
	function _setCtrlKeysErr(msg) {
		zk.error("setCtrlKeys: " + msg);
	}


zul.Widget = zk.$extends(zk.Widget, {
	
	getContext: function () {
		return this._context;
	},
	
	
	setContext: function (context) {
		if (zk.Widget.isInstance(context))
			context = 'uuid(' + context.uuid + ')';
		this._context = context;
		return this;
	},
	
	getPopup: function () {
		return this._popup;
	},
	
	
	setPopup: function (popup) {
		if (zk.Widget.isInstance(popup))
			popup = 'uuid(' + popup.uuid + ')';
		this._popup = popup;
		return this;
	},
	
	getTooltip: function () {
		return this._tooltip;
	},
	
	
	setTooltip: function (tooltip) {
		if (zk.Widget.isInstance(tooltip))
			tooltip = 'uuid(' + tooltip.uuid + ')';
		this._tooltip = tooltip;
		return this;
	},
	
	getCtrlKeys: function () {
		return this._ctrlKeys;
	},
	
	setCtrlKeys: function (keys) {
		if (this._ctrlKeys == keys) return;
		if (!keys) {
			this._ctrlKeys = this._parsedCtlKeys = null;
			return;
		}

		var parsed = [{}, {}, {}, {}, {}], 
			which = 0;
		for (var j = 0, len = keys.length; j < len; ++j) {
			var cc = keys.charAt(j); 
			switch (cc) {
			case '^':
			case '$':
			case '@':
				if (which)
					return _setCtrlKeysErr("Combination of Shift, Alt and Ctrl not supported: "+keys);
				which = cc == '^' ? 1: cc == '@' ? 2: 3;
				break;
			case '#':
				var k = j + 1;
				for (; k < len; ++k) {
					var c2 = keys.charAt(k);
					if ((c2 > 'Z' || c2 < 'A') 	&& (c2 > 'z' || c2 < 'a')
					&& (c2 > '9' || c2 < '0'))
						break;
				}
				if (k == j + 1)
					return _setCtrlKeysErr("Unexpected character "+cc+" in "+keys);

				var s = keys.substring(j+1, k).toLowerCase();
				if ("pgup" == s) cc = 33;
				else if ("pgdn" == s) cc = 34;
				else if ("end" == s) cc = 35;
				else if ("home" == s) cc = 36;
				else if ("left" == s) cc = 37;
				else if ("up" == s) cc = 38;
				else if ("right" == s) cc = 39;
				else if ("down" == s) cc = 40;
				else if ("ins" == s) cc = 45;
				else if ("del" == s) cc = 46;
				else if (s.length > 1 && s.charAt(0) == 'f') {
					var v = zk.parseInt(s.substring(1));
					if (v == 0 || v > 12)
						return _setCtrlKeysErr("Unsupported function key: #f" + v);
					cc = 112 + v - 1;
				} else
					return _setCtrlKeysErr("Unknown #"+s+" in "+keys);

				parsed[which][cc] = true;
				which = 0;
				j = k - 1;
				break;
			default:
				if (!which || ((cc > 'Z' || cc < 'A') 
				&& (cc > 'z' || cc < 'a') && (cc > '9' || cc < '0')))
					return _setCtrlKeysErr("Unexpected character "+cc+" in "+keys);
				if (which == 3)
					return _setCtrlKeysErr("$a - $z not supported (found in "+keys+"). Allowed: $#f1, $#home and so on.");

				if (cc <= 'z' && cc >= 'a')
					cc = cc.toUpperCase();
				parsed[which][cc.charCodeAt(0)] = true;
				which = 0;
				break;
			}
		}

		this._parsedCtlKeys = parsed;
		this._ctrlKeys = keys;
		return this;
	},

	_parsePopParams: function (txt) {
		var params = {},
			index = txt.indexOf(','),
			start = txt.indexOf('='),
			t = txt;
		if (start != -1)
			t = txt.substring(0, txt.substring(0, start).lastIndexOf(','));
		
		if (index != -1) {
			params.id = t.substring(0, index).trim();
			var t2 = t.substring(index + 1, t.length);
			if (t2)
				params.position = t2.trim();				
			
			zk.copy(params, zUtl.parseMap(txt.substring(t.length, txt.length)));
		} else
			params.id = txt.trim();
		
		if (params.x)
			params.x = zk.parseInt(params.x);
		if (params.y)
			params.y = zk.parseInt(params.y);
		if (params.delay)
			params.delay = zk.parseInt(params.delay);
		return params;
	},
	
	doClick_: function (evt, popupOnly) {
		if (!this.shallIgnoreClick_(evt) && !evt.contextSelected) {
			var params = this._popup ? this._parsePopParams(this._popup) : {},
				popup = this._smartFellow(params.id);
			if (popup) {
				evt.contextSelected = true;
				
				
				var self = this,
					xy = params.x !== undefined ? [params.x, params.y]
							: [evt.pageX, evt.pageY];
				setTimeout(function() {
					popup.open(self, xy, params.position ? params.position : null, {sendOnOpen:true});
				}, 0);
				evt.stop({dom:true});
			}
		}
		if (popupOnly !== true)
			this.$supers('doClick_', arguments);
	},
	doRightClick_: function (evt) {
		if (!this.shallIgnoreClick_(evt) && !evt.contextSelected) {
			var params = this._context ? this._parsePopParams(this._context) : {},
				ctx = this._smartFellow(params.id);
			if (ctx) {
				evt.contextSelected = true;
				
				
				var self = this,
					xy = params.x !== undefined ? [params.x, params.y]
							: [evt.pageX, evt.pageY];
				setTimeout(function() {
					ctx.open(self, xy, params.position ? params.position : null, {sendOnOpen:true}); 
				}, 0);
				evt.stop({dom:true}); 
			}
		}
		this.$supers('doRightClick_', arguments);
	},
	doTooltipOver_: function (evt) {
		if (!evt.tooltipped && _tt_beforeBegin(this)) {
			var params = this._tooltip ? this._parsePopParams(this._tooltip) : {},
				tip = this._smartFellow(params.id);
			if (tip) {
				evt.tooltipped = true;
					
				_tt_begin(tip, this, params);
			}
		}
		this.$supers('doTooltipOver_', arguments);
	},
	doTooltipOut_: function (evt) {
		_tt_end(this);
		this.$supers('doTooltipOut_', arguments);
	},
	_smartFellow: function (id) {
		return id ? id.startsWith('uuid(') && id.endsWith(')') ?
			zk.Widget.$(id.substring(5, id.length - 1)):
			this.$f(id, true): null;
	},
	
	afterKeyDown_: function (evt) {
		var keyCode = evt.keyCode, evtnm = "onCtrlKey", okcancel;
		switch (keyCode) {
		case 13: 
			var target = evt.domTarget, tn = jq.nodeName(target);
			if (tn == "textarea" || (tn == "button"
			
			&& (!target.id || !target.id.endsWith('-a')))
			|| (tn == "input" && target.type.toLowerCase() == "button"))
				return; 
			okcancel = evtnm = "onOK";
			break;
		case 27: 
			okcancel = evtnm = "onCancel";
			break;
		case 16: 
		case 17: 
		case 18: 
			return;
		case 45: 
		case 46: 
			break;
		default:
			if ((keyCode >= 33 && keyCode <= 40) 
			|| (keyCode >= 112 && keyCode <= 123) 
			|| evt.ctrlKey || evt.altKey)
				break;
			return;
		}

		var target = evt.target, wgt = target;
		for (;; wgt = wgt.parent) {
			if (!wgt) return;
			if (!wgt.isListen(evtnm, {any:true})) continue;

			if (okcancel)
				break;

			var parsed = wgt._parsedCtlKeys;
			if (parsed
			&& parsed[evt.ctrlKey ? 1: evt.altKey ? 2: evt.shiftKey ? 3: 0][keyCode])
				break; 
		}

		for (var w = target;; w = w.parent) {
			if (w.beforeCtrlKeys_ && w.beforeCtrlKeys_(evt))
				return;

			if (w == wgt) break;
		}

		wgt.fire(evtnm, zk.copy({reference: target}, evt.data),
			{ctl: true});
		evt.stop();
		

		
		if (zk.ie && keyCode == 112) {
			zk._oldOnHelp = window.onhelp;
			window.onhelp = function () {return false;}
			setTimeout(function () {window.onhelp = zk._oldOnHelp; zk._oldOnHelp = null;}, 200);
		}
		return true; 
	},
	
	beforeCtrlKeys_: function (evt) {
	}
},{
	
	getOpenTooltip: function () {
		return _tt_tip && _tt_tip.isOpen() ? _tt_tip: null;
	}
});

})();


zul.LabelImageWidget = zk.$extends(zul.Widget, {
	_label: '',

	$define: {
		
		
		label: function () {
			this.updateDomContent_();
		},
		
		
		image: function (v) {
			var n = this.getImageNode();
			if (n) n.src = v || '';
			else (this.desktop) 
				this.updateDomContent_();
		},
		
		
		hoverImage: null
	},
	
	updateDomContent_: function () {
		this.rerender();
	},
	
	domImage_: function () {
		var img = this._image;
		return img ? '<img src="' + img + '" align="absmiddle" />': '';
	},
	
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel());
	},
	
	domContent_: function () {
		var label = this.domLabel_(),
			img = this.domImage_();
		return img ? label ? img + ' ' + label: img: label;
	},
	doMouseOver_: function () {
		var himg = this._hoverImage;
		if (himg) {
			var n = this.getImageNode();
			if (n) n.src = himg;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function () {
		if (this._hoverImage) {
			var n = this.getImageNode();
			if (n) n.src = this._image;
		}
		this.$supers('doMouseOut_', arguments);
	},
	
	getImageNode: function () {
		if (!this._eimg && this._image) {
			var n = this.$n();
			if (n) this._eimg = jq(n).find('img:first')[0];
		}
		return this._eimg;
	},
	
	clearCache: function () {
		this._eimg = null;
		this.$supers('clearCache', arguments);
	}
});



zul.Auxbutton = zk.$extends(zk.Object, {
	
	$init: function (wgt, btn, ref) {
		this._wgt = wgt;
		this._btn = btn;
		this._ref = ref;

		var $btn = jq(btn);
		$btn.zk.disableSelection();

		if (!wgt.$weave)
			$btn.mouseover(this.proxy(this._domOver))
				.mouseout(this.proxy(this._domOut))
				.bind('zmousedown', this.proxy(this._domDown));
	},
	
	cleanup: function () {
		var $btn = jq(this._btn);

		$btn.zk.enableSelection();

		if (!this._wgt.$weave)
			$btn.unbind('mouseover', this.proxy(this._domOver))
				.unbind('mouseout', this.proxy(this._domOut))
				.unbind('zmousedown', this.proxy(this._domDown));
	},
	_domOver: function () {
		var wgt = this._wgt,
			inp = wgt.getInputNode(),
			zcls = wgt.getZclass(),
			inRoundedMold = wgt.inRoundedMold();
		
		if (!wgt.isDisabled() && !zk.dragging) {
		
			if (inRoundedMold && !wgt._buttonVisible) return;
			
			jq(this._btn).addClass(zcls + "-btn-over");
			
			if (inRoundedMold && !jq(inp).hasClass(zcls + '-text-invalid'))
				jq(inp).addClass(zcls + "-inp-over");
		}
	},
	_domOut: function () {
		var wgt = this._wgt,
			zcls = wgt.getZclass();
		if (!wgt.isDisabled() && !zk.dragging) {
			jq(this._btn).removeClass(zcls + "-btn-over");
			jq(wgt.getInputNode()).removeClass(zcls + "-inp-over");
		}
	},
	_domDown: function () {
		var wgt = this._wgt,
			inp = wgt.getInputNode(),
			zcls = wgt.getZclass(),
			inRoundedMold = wgt.inRoundedMold();
			
		if (!wgt.isDisabled() && !zk.dragging) {
			var $Auxbutton = zul.Auxbutton,
				curab = $Auxbutton._curab;
			if (curab) curab._domUp();

			if (inRoundedMold && !wgt._buttonVisible) return;

			jq(this._btn).addClass(zcls + "-btn-clk");
			
			if (inRoundedMold && !wgt.isReadonly() && !jq(inp).hasClass(zcls + '-text-invalid'))
				jq(inp).addClass(zcls + "-inp-clk");			

			jq(document).bind('zmouseup', this.proxy(this._domUp));

			$Auxbutton._curab = this;
		}
	},
	_domUp: function () {
		var $Auxbutton = zul.Auxbutton,
			curab = $Auxbutton._curab;
		if (curab) {
			$Auxbutton._curab = null;
			var wgt = curab._wgt,
				zcls = wgt.getZclass();
				
			if (wgt.inRoundedMold() && !wgt._buttonVisible) return;
			
			jq(curab._btn).removeClass(zcls + "-btn-clk");
			jq(wgt.getInputNode()).removeClass(zcls + "-inp-clk");
			
			jq(document).unbind("zmouseup", curab.proxy(this._domUp));
		}
	}
});


(function () {

	function _cancel(o, sid, finish) {
		var key = o.getKey(sid),
			uplder = o.uploaders[key];
		if (uplder)
			uplder.destroy(finish);
		delete o.uploaders[key];
	}
	function _start(o, form, val) { 
		var key = o.getKey(o.sid),
			uplder = new zul.Uploader(o, key, form, val);
			
		zul.Upload.start(uplder);
		o.uploaders[key] = uplder;
		
		o.sid++;
		o.initContent();
	}

	function _onchange(evt) {
		var n = this,
			upload = n._ctrl,
			wgt = upload._wgt,
			dt = wgt.desktop,
			action = zk.ajaxURI('/upload', {desktop:dt,au:true}) + '?uuid=' + wgt.uuid + '&dtid=' + dt.uuid + '&sid=' + upload.sid
				+ (upload.maxsize !== '' ? '&maxsize=' + upload.maxsize : '')
				+ (upload.isNative ? '&native=true' : ''),
			form = n.form;
		form.action = action;
		
		
		var p = form.parentNode;
		p.parentNode.removeChild(p);
		_start(n._ctrl, form, n.value);		
	}


zul.Upload = zk.$extends(zk.Object, {
	sid: 0,
	uploaders: {},
	
	$init: function(wgt, parent, clsnm) {
		var cls;
		for (var attrs = clsnm.split(','), i = 0, len = attrs.length; i < len; i++) {
			if (attrs[i].startsWith('maxsize='))
				this.maxsize = attrs[i].match(new RegExp(/maxsize=([^,]*)/))[1];
			else if (attrs[i] == 'native')
				this.isNative = true;
			else if (attrs[i] != 'true')
				cls = attrs[i];
		}
		
		this._clsnm = cls || '';
		
		this._wgt = wgt;
		this._parent = parent;
		
		this.initContent();
	},
	
	sync: function () {
		var wgt = this._wgt,
			ref = wgt.$n(),
			parent = this._parent,
			outer = parent ? parent.lastChild : ref.nextSibling,
			inp = outer.firstChild.firstChild,
			refof = zk(ref).cmOffset(),
			outerof = jq(outer).css({top: '0', left: '0'}).zk.cmOffset(),
			diff = inp.offsetWidth - ref.offsetWidth,
			st = outer.style,
			dy = refof[1] - outerof[1];
		st.top = dy + "px";
		st.left = refof[0] - outerof[0] - diff + "px";
		inp.style.height = ref.offsetHeight + 'px';
		inp.style.clip = 'rect(auto,auto,auto,' + diff + 'px)';
	},
	initContent: function () {
		var wgt = this._wgt,
			parent = this._parent,
			ref = wgt.$n(), dt = wgt.desktop,
			html = '<span class="z-upload"><form enctype="multipart/form-data" method="POST">'
				 + '<input name="file" type="file" hidefocus="true" style="height:'
				 + ref.offsetHeight + 'px"/></form></span>';
		
		if (parent) 
			jq(parent).append(html);
		else 
			jq(wgt).after(html);
			
		this.sync();
		
		var outer = this._outer = parent ? parent.lastChild : ref.nextSibling,
			inp = outer.firstChild.firstChild;
			
		inp.z$proxy = ref;
		inp._ctrl = this;
		
		jq(inp).change(_onchange);
	},
	
	destroy: function () {
		jq(this._outer).remove();
		this._wgt = this._parent = null;
		for (var v in this.uploaders) {
			var uplder = this.uploaders[v];
			if (uplder) {
				delete this.uploaders[v];
				uplder.destroy();
			}
		}
	},
	
	getKey: function (sid) {
		return (this._wgt ? this._wgt.uuid : '' )+ '_uplder_' + sid; 
	},
	
	cancel: function (sid) { 
		_cancel(this, sid);
	},
	
	finish: function (sid) {
		_cancel(this, sid, true);
	}
},{
	
	error: function (msg, uuid, sid) {
		var wgt = zk.Widget.$(uuid);
		if (wgt) {
			jq.alert(msg, {desktop: wgt.desktop, icon: 'ERROR'});
			zul.Upload.close(uuid, sid);
		}
	},
	
	close: function (uuid, sid) {
		var wgt = zk.Widget.$(uuid);
		if (!wgt || !wgt._uplder) return;
		wgt._uplder.cancel(sid);
	},
	
	sendResult: function (uuid, contentId, sid) {
		var wgt = zk.Widget.$(uuid);
		if (!wgt || !wgt._uplder) return;
		wgt._uplder.finish(sid);
		zAu.send(new zk.Event(wgt.desktop, "updateResult", {
			contentId: contentId,
			wid: wgt.uuid,
			sid: sid
		}));
	},
	
	isFinish: function (wgt) {
		for (var key = (typeof wgt == 'string' ? wgt : wgt.uuid) + '_uplder_',
				f = zul.Upload.files, i = f.length; i--;)
			if (f[0].id.startsWith(key))
				return false;
		return true;
	},
	
	start: function (uplder) {
		var files = zul.Upload.files;
		if (uplder)
			files.push(uplder);
		if (files[0] && !files[0].isStart) {
			files[0].isStart = true;
			files[0].start();
		}
	},
	
	destroy: function (uplder) {
		for (var files = zul.Upload.files, i = files.length; i--;) 
			if (files[i].id == uplder.id) {
				files.splice(i, 1);
				break;
			}
		zul.Upload.start();
	},
	files: []
});

zul.Uploader = zk.$extends(zk.Object, {
	
	$init: function (upload, id, form, flnm) {
		this.id = id;
		this.flnm = flnm;
		this._upload = upload;
		this._form = form;
		this._parent = form.parentNode;
		this._sid = upload.sid;
		this._wgt = upload._wgt;
		
		var viewer, self = this;
		if (!upload._clsnm) viewer = new zul.UploadViewer(this, flnm);
		else
			zk.$import(upload._clsnm, function (cls) {
				viewer = new cls(self, flnm);
			});
		this.viewer = viewer;
	},
	
	getWidget: function () {
		return this._wgt;
	},
	
	destroy: function (finish) {
		this.end(finish);
		if (this._form) {
			jq(this._form.parentNode).remove();
			jq('#' + this.id + '_ifm').remove();
		}
		this._form = this._upload = this._wgt = null;
	},
	
	start: function () {
		var wgt = this._wgt,
			frameId = this.id + '_ifm';

		document.body.appendChild(this._parent);
		if (!jq('#' + frameId).length) 
			jq.newFrame(frameId);
		this._form.target = frameId;
		this._form.submit();
		this._form.style.display = "none";
		
		var uri = zk.ajaxURI('/upload', {desktop: wgt.desktop, au: true}),
			dtid = wgt.desktop.id,
			self = this,
			data = 'cmd=uploadInfo&dtid=' + dtid + '&wid=' + wgt.uuid + '&sid=' + this._sid;
		
		if (zul.Uploader._tmupload)
			clearInterval(zul.Uploader._tmupload);
		
		function t() {
			jq.ajax({
				type: 'POST',
				url: uri,
				data: data,
				success: function(data) {
					var d = data.split(',');
					if (data.startsWith('error:')) {
						zul.Uploader.clearInterval(self.id);
							var wgt = self.getWidget();
							if (wgt) {
								self.cancel();
								zul.Upload.error(data.substring(6, data.length), wgt.uuid, self._sid);
							}
					} else if (!self.update(zk.parseInt(d[0]), zk.parseInt(d[1])))
						zul.Uploader.clearInterval(self.id);
				},
				complete: function(req, status) {
					var v;
					if ((v = req.getResponseHeader("ZK-Error")) == "404" ||
							v == "410" || status == 'error' || status == 410) {
						zul.Uploader.clearInterval(self.id);
						var wgt = self.getWidget();
						if (wgt) {
							self.cancel();
							zul.Upload.error(msgzk.FAILED_TO_RESPONSE, wgt.uuid, self._sid);
						}
						return;
					}
				}
			});
		}
		t.id = this.id;
		
		zul.Uploader.clearInterval = function (id) {
			if (t.id == id) {
				clearInterval(zul.Uploader._tmupload);
				zul.Uploader._tmupload = undefined;
			}
		};
		zul.Uploader._tmupload = setInterval(t, 1000);
	},
	
	cancel: function () {
		zul.Uploader.clearInterval(this.id);
		if (this._upload)
			this._upload.cancel(this._sid);
	},
	
	update: function (sent, total) {
		var wgt = this.getWidget();
		if (!wgt || total <= 0) this.end();
		else if (zul.Uploader._tmupload) {
			if (sent >= 0 && sent <= 100)
				this.viewer.update(sent, total);
			return sent >= 0 && sent < 100;
		}
		return false;
	},
	
	end: function (finish) {
		this.viewer.destroy(finish);
		zul.Upload.destroy(this);
	}
});


	function _addUM(uplder, flnm) {
		var flman = zul.UploadViewer.flman;
		if (!flman || !flman.desktop) {
			if (flman) flman.detach();
			zul.UploadViewer.flman = flman = new zul.UploadManager();
			uplder.getWidget().getPage().appendChild(flman);
		}
		flman.removeFile(uplder);
		flman.addFile(uplder);
	}
	function _initUM(uplder, flnm) {
		if (zul.UploadManager)
			return _addUM(uplder, flnm);

		zk.load('zul.wgt,zul.box', function() {
			
			zul.UploadManager = zk.$extends(zul.wgt.Popup, {
				_files: {},
				$init: function () {
					this.$supers('$init', arguments);
					this.setSclass('z-fileupload-manager');
				},
				onFloatUp: function(ctl) {
					var wgt = ctl.origin;
					if (!this.isVisible()) 
						return;
					this.setTopmost();
				},
				
				getFileItem: function(id) {
					return this._files[id] || zk.Widget.$(id);
				},
				
				addFile: function(uplder) {
					var id = uplder.id,
						flnm = uplder.flnm,
						prog = this.getFileItem(id);
					if (!prog) {
						prog = new zul.wgt.Div({
							uuid: id,
							children: [new zul.wgt.Label({
								value: flnm + ':'
							}), new zul.box.Box({
								mold: 'horizontal',
								children: [new zul.wgt.Progressmeter({
									id: id,
									sclass: 'z-fileupload-progress'
								})
								, new zul.wgt.Div({
									sclass: 'z-fileupload-rm',
									listeners: {
										onClick: function () {
											var uuid = id.substring(0, id.indexOf('_uplder_'));
											zul.Uploader.clearInterval(id);
											var wgt = zk.Widget.$(uuid);
											if (wgt) wgt._uplder.cancel(id.substring(id.lastIndexOf('_')+1, id.length));
										}
									}
								})]
							}), new zul.wgt.Label({id: id + '_total'}), new zul.wgt.Separator()]
						});
						
						try {
							this.appendChild(prog);
						} catch (e) {}
						this._files[id] = prog;
					}
					return prog;
				},
				
				updateFile: function(uplder, val, total) {
					var id = uplder.id,
						prog = this.getFileItem(id);
					if (!prog) return;
					prog.$f(id).setValue(val);
					prog.$f(id + '_total').setValue(total);
				},
				
				removeFile: function(uplder) {
					var id = uplder.id,
						prog = this.getFileItem(id);
					if (prog) 
						prog.detach();
					delete this._files[id];
					var close = true;
					for (var p in this._files) 
						if (!(close = false)) 
							break;
					
					if (close) 
						this.close();
				},
				
				open: function(wgt, position) {
					this.$super('open', wgt, null, position || 'after_start', {
						sendOnOpen: false,
						disableMask: true
					});
				}
			});
			_addUM(uplder, flnm);
		});
	}

zul.UploadViewer = zk.$extends(zk.Object, {
	
	$init: function (uplder,  flnm) {
		this._uplder = uplder;
		_initUM(uplder, flnm);
	},
	
	update: function (sent, total) {
		var flman = zul.UploadViewer.flman;
		if (flman) {
			if (!flman.isOpen())
					flman.open(this._uplder.getWidget());
			flman.updateFile(this._uplder, sent, msgzk.FILE_SIZE+Math.round(total/1024)+msgzk.KBYTES);
		}
	},
	
	destroy: function () {
		var flman = zul.UploadViewer.flman;
		if (flman)
			flman.removeFile(this._uplder);
	}
});

})();


}finally{zk.setLoaded(zk._p.n);}})();