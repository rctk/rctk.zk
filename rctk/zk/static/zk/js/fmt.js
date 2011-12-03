zk.load('zul.lang',function(){zk._p=zkpi('zk.fmt',true);try{
(function () {
	function down(valStr, ri) {
		return valStr.substring(0, ri);
	}
	function up(valStr, ri) {
		var k = 1, val = '';
		for (var j = ri; k && --j >= 0;) {
			var ch = valStr.charAt(j);
			if (k == 1) {
				if (ch >= '0' && ch < '9') {
					ch = ch.$inc(1);
					k = 0;
				} else if (ch == '9')
					ch = '0';
			}
			val = ch + val;
		}
		if (j >= 0)
			val = valStr.substring(0, j) + val;
		return k ? '1'+val : val;
	}
	function compareHalf(valStr, ri) {
		var ch,
			result,
			base = '5';
		for (var j = ri, len = valStr.length; j < len; ++j) {
			result = valStr.charAt(j) - base;
			if (j == ri) { 
				base = '0';
			}
			if (result != 0) 
				return result;
		}
		return result;
	}
	function preDigit(valStr, ri) {
		for (var j = ri; --j >= 0;) {
			var ch = valStr.charAt(j);
			if (ch >= '0' && ch <= '9')
				return ch;
		}
		return null;
	}
zk.fmt.Number = {
	setScale: function (val, scale, rounding) { 
		if (scale === undefined || scale < 0)
			return val;
		var valStr = val.$toString(),
			indVal = valStr.indexOf('.'),
			valFixed = indVal >= 0 ? valStr.length - indVal - 1 : 0;
		if (valFixed <= scale) 
			return val;
		else {
			var ri = indVal + scale + 1;
			valStr = this.rounding(valStr, ri, rounding, valStr < 0);
			return new zk.BigDecimal(valStr);
		}
	},
	rounding: function (valStr, ri, rounding, minus) {
		switch(rounding) {
			case 0: 
				valStr = up(valStr, ri);
				break;
			case 1: 
				valStr = down(valStr, ri);
				break;
			case 2: 
				valStr = minus ? down(valStr, ri) : up(valStr, ri);
				break;
			case 3: 
				valStr = !minus ? down(valStr, ri) : up(valStr, ri);
				break;
			case 4: 
				var r = compareHalf(valStr, ri);
				valStr = r < 0 ? down(valStr, ri) : up(valStr, ri);
				break;
			case 5: 
				var r = compareHalf(valStr, ri);
				valStr = r > 0 ? up(valStr, ri) : down(valStr, ri);
				break;
			case 6: 
				
			default:
				var r = compareHalf(valStr, ri);
				if (r == 0) { 
					var evenChar = preDigit(valStr, ri);
					valStr = (evenChar & 1) ? up(valStr, ri) : down(valStr, ri);
				} else
					valStr = r < 0 ? down(valStr, ri) : up(valStr, ri);
		}
		return valStr;
	},
	format: function (fmt, val, rounding) {
		if (val == null) return '';
		if (!fmt) return val + '';
		
		var useMinsuFmt;
		if (fmt.indexOf(';') != -1) {
			fmt = fmt.split(';');
			useMinsuFmt = val < 0;
			fmt = fmt[useMinsuFmt ? 1 : 0];
		}
		
		
		var efmt = this._escapeQuote(fmt);
		fmt = efmt.fmt;
		var pureFmtStr = efmt.pureFmtStr,
			ind = efmt.purejdot,
			fixed = ind >= 0 ? pureFmtStr.length - ind - 1 : 0,
			valStr = (val + '').replace(/[^e\-0123456789.]/g, '').substring(val < 0 ? 1 : 0),
			ei = valStr.lastIndexOf('e'),
			indVal = valStr.indexOf('.'),
			valFixed = indVal >= 0 ? (ei < 0 ? valStr.length : ei) - indVal - 1 : 0,
			shift = efmt.shift + (ei < 0 ? 0 : parseInt(valStr.substring(ei+1), 10));
			
		if(ei > 0) valStr = valStr.substring(0, ei);
		if (shift > 0) {
			if (indVal >= 0) { 
				if (valFixed > shift) {
					valStr = valStr.substring(0, indVal) + valStr.substring(indVal+1, indVal+1+shift) + '.' + valStr.substring(indVal+1+shift);
					valFixed -= shift;
					indVal += shift;
				} else {
					valStr = valStr.substring(0, indVal) + valStr.substring(indVal+1);
					for(var len = shift - valFixed; len-- > 0;)
						valStr = valStr + '0';
					indVal = -1;
					valFixed = 0;
				}
			} else { 
				for(var len = shift; len-- > 0;)
					valStr = valStr + '0';
			}
		} else if (shift < 0) {
			var nind = (indVal < 0 ? varStr.length : indVal) + shift;
			if(nind > 0) {
				valStr = valStr.substring(0, nind) + '.' + 
					(indVal < 0 ? valStr.substring(nind) : valStr.substring(nind, indVar) + valStr.substring(indVar+1));
				valFixed -= shift;
				indVal = nind;
			} else {
				if(indVal >= 0)
					valStr = valStr.substring(0, indVal) + valStr.substring(indVal+1);
				for(; nind++ < 0;)
					valStr = '0' + valStr;
				valStr = '0.' + valStr;
				indVal = 1;
				valFixed = valStr.length - 2;
			}
		}
		
		
		if (valFixed <= fixed) {
			if (indVal == -1)
				valStr += '.';
			for(var len = fixed - valFixed; len-- > 0;)
				valStr = valStr + '0';
		} else { 
			var ri = indVal + fixed + 1;
			valStr = this.rounding(valStr, ri, rounding, val < 0);
		}
		var indFmt = efmt.jdot,
			pre = '', suf = '';
		
		
		indVal = valStr.indexOf('.');
		if (indVal == -1) 
			indVal = valStr.length;
		if (indFmt == -1) 
			indFmt = fmt.length;
		if (ind == -1)
			ind = pureFmtStr.length;
		
		
		var prefmt = indVal - ind;
		if (prefmt > 0) {
			var xfmt = '';
			for (var len = prefmt; --len >= 0; indFmt++)
				xfmt += '#';
		
			
    		var beg = this._extraFmtIndex(fmt);
    		prefmt += beg;
    		fmt = fmt.substring(0, beg) + xfmt + fmt.substring(beg, fmt.length);
		}
		for (var len = ind - indVal; --len >= 0; indVal++)
			valStr = '0' + valStr;
		
		var groupDigit = indFmt - fmt.substring(0, indFmt).lastIndexOf(',');
			
		for (var g = 1, i = indFmt - 1, j = indVal - 1; i >= 0 && j >= 0;) {
			if (g % groupDigit == 0 && pre.charAt(0) != ',') {
				pre = zk.GROUPING + pre;
				g++;
			}
			var fmtcc = fmt.charAt(i); 
			if (fmtcc == '#' || fmtcc == '0') {
				var cc = valStr.charAt(j);
				pre = (cc == '0' ? fmtcc : cc) + pre;
				i--;
				j--;
				g++;
			} else {
				var c = fmt.charAt(i);
				if (c != ',') {
					pre = c + pre;
					g++;
				}
				i--;
			}
		}
		if (j >= 0) 
			pre = valStr.substr(0, j + 1) + pre;
		
		
		var len = (indFmt < 0 ? fmt.length : indFmt) - (ind < 0 ? pureFmtStr.length : ind),
			prej = efmt.prej;
		if (len > 0) {
			var p = fmt.substring(prej, prefmt > 0 ? prefmt : len).replace(new RegExp("[#0.,]", 'g'), '');
			if (p)
				pre = p + pre;
		}
		
		for (var i = indFmt + 1, j = indVal + 1, fl = fmt.length, vl = valStr.length; i < fl; i++) {
			var fmtcc = fmt.charAt(i); 
			if (fmtcc == '#' || fmtcc == '0') {
				if (j < vl) {
					suf += valStr.charAt(j);
					j++;
				}
			} else
				suf += fmtcc == '%' ? zk.PERCENT : fmtcc;
		}
		if (j < valStr.length) 
			suf = valStr.substr(j, valStr.length);
		
		
		var e = -1;
		for (var m = suf.length, n = fmt.length; m > 0; --m) {
			var cc = suf.charAt(m-1),
				fmtcc = fmt.charAt(--n);
			if (cc == '0' &&  fmtcc == '#') { 
				if (e < 0) e = m;
			} else if (e >= 0 || /[1-9]/.test(cc))
				break;
		}
		if (e >= 0)
			suf = suf.substring(0, m) + suf.substring(e);
		
		
		if (pre)
			pre = fmt.substring(0, prej) + this._removePrefixSharps(pre);
		if (!pre && fmt.charAt(indFmt+1) == '#')
			pre = '0';
		if (!suf && (pre == zk.PERCENT || pre == zk.PER_MILL))
			pre = '0' + pre;
		var rexp = new RegExp('^0*['+zk.PERCENT+'|'+zk.PER_MILL+']?$'),
			shownZero = suf? rexp.test(suf) && /^0*$/.test(pre) : rexp.test(pre);
		return (val < 0 && !shownZero && !useMinsuFmt? zk.MINUS : '') + (suf ? pre + (/[\d]/.test(suf.charAt(0)) ? zk.DECIMAL : '') + suf : pre);
	},
	_escapeQuote: function (fmt) {
		
		var cc, q = -2, shift = 0, ret = '', jdot = -1, purejdot = -1, pure = '', prej= -1,
			validPercent = fmt ? !new RegExp('\(\'['+zk.PERCENT+'|'+zk.PER_MILL+']+\'\)', 'g').test(fmt) : true; 
			
		for (var j = 0, len = fmt.length; j < len; ++j) {
			cc = fmt.charAt(j);
			if (cc == '%' && validPercent)
				shift += 2;
			else if (cc == zk.PER_MILL && validPercent)
				shift += 3;
			
			if (cc == '\'') { 
				if (q >= 0) {
					ret += q == (j-1) ? '\'' : fmt.substring(q+1, j);
					q = -2;
				} else
					q = j; 
			} else if (q < 0) { 
				if (prej < 0 
					&& (cc == '#' || cc == '0' || cc == '.' || cc == '-' || cc == ',' || cc == 'E'))
					prej = ret.length;
					
				if (cc == '#' || cc == '0')
					pure += cc;
				else if(cc == '.') {
					if (purejdot < 0) 
						purejdot = pure.length;
					if (jdot < 0) 
						jdot = ret.length;
					pure += cc;
				}
				ret += cc;
			}
		}
		return {shift:shift, fmt:ret, pureFmtStr: pure, jdot:jdot, purejdot:purejdot, prej:prej};
	},
	_extraFmtIndex: function (fmt) {
		var j = 0;
		for(var len=fmt.length; j < len; ++j) {
			var c = fmt.charAt(j);
			if (c == '#' || c == '0' || c == ',')
				break;
		}
		return j;
	},	
	_removePrefixSharps: function (val) {
		var ret = '',
			sharp = true;
		for(var len = val.length, j=0; j < len; ++j) {
			var cc = val.charAt(j);
			if (sharp) {
				if (cc == '#' || cc == zk.GROUPING) continue;
				else if (/[\d]/.test(cc)) sharp = false; 
			}
			ret = ret + (cc == '#' ? '0' : cc);
		}
		return ret;
	},
	unformat: function (fmt, val, ignoreLocale) {
		if (!val) return {raw: val, divscale: 0};

		var divscale = 0, 
			minus, sb, cc, ignore,
			zkMinus = ignoreLocale ? '-': zk.MINUS,
			zkDecimal = ignoreLocale ? '.': zk.DECIMAL, 
			zkPercent = ignoreLocale ? '%': zk.PERCENT,
			permill = String.fromCharCode(0x2030),
			zkPermill = ignoreLocale ? permill: zk.PER_MILL, 
			zkGrouping = ignoreLocale ? ',': zk.GROUPING,
			validPercent = !new RegExp('\(\'[%|'+permill+']+\'\)', 'g').test(fmt); 
				
		for (var j = 0, len = val.length; j < len; ++j) {
			cc = val.charAt(j);
			ignore = true;

			
			if (cc == zkPercent && validPercent) divscale += 2;
			else if (cc == zkPermill && validPercent) divscale += 3;
			else if (cc == '(') minus = true;
			else if (cc != '+') ignore = false;

			
			if (!ignore)
				ignore = (cc < '0' || cc > '9')
				&& cc != zkDecimal && cc != zkMinus && cc != '+'
				&& (zUtl.isChar(cc,{whitespace:1}) || cc == zkGrouping
					|| cc == ')' || (fmt && fmt.indexOf(cc) >= 0));
			if (ignore) {
				if (sb == null) sb = val.substring(0, j);
			} else {
				var c2 = cc == zkMinus ? '-':
					cc == zkDecimal ? '.':  cc;
				if (cc != c2 && sb == null)
					sb = val.substring(0, j);
				if (sb != null) sb += c2;
			}
		}
		if (sb == null) sb = val;
		if (minus) sb = '-' + sb;
		for (;;) {
			cc = sb.charAt(0);
			if (cc == '+')
				sb = sb.substring(1);
			else if (cc == '-' && sb.charAt(1) == '-')
				sb = sb.substring(2);
			else
				break;
		}

		
		
		for (var j = 0, k, len = sb.length; j < len; ++j) {
			cc = sb.charAt(j);
			if (cc > '0' && cc <= '9') {
				if (k !== undefined)
					sb = sb.substring(0, k) + sb.substring(j);
				break; 
			} else if (cc == '0') {
				if (k === undefined)
					k = j;
			} else if (k !== undefined) {
				if (cc == '.' && j > ++k)
					sb = sb.substring(0, k) + sb.substring(j);
				break;
			} else if (cc == '.') { 
				break;
			}
		}
		return {raw: sb, divscale: divscale};
	}
};
})();


zk.fmt.Text = {
	format: function (msg) {
		var i = 0, sb = '';
		for (var j = 0, len = msg.length, cc, k; j < len; ++j) {
			cc = msg.charAt(j);
			if (cc == '\\') {
				if (++j >= len) break;
				sb += msg.substring(i, j);
				cc = msg.charAt(j);
				switch (cc) {
				case 'n': cc = '\n'; break;
				case 't': cc = '\t'; break;
				case 'r': cc = '\r'; break;
				}
				sb += cc;
				i = j + 1;
			} else if (cc == '{') {
				k = msg.indexOf('}', j + 1);
				if (k < 0) break;
				sb += msg.substring(i, j)
					+ arguments[zk.parseInt(msg.substring(j + 1, k)) + 1];
				i = j = k + 1;
			}
		}
		if (sb) sb += msg.substring(i);
		return sb || msg;
	}
};


}finally{zk.setLoaded(zk._p.n);}})();