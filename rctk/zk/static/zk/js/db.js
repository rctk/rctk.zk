zk.load('zk.fmt,zul.inp',function(){zk._p=zkpi('zul.db',true);try{
(function () {
	function _parseTextToArray(txt, fmt) {
		var ts = [], mindex = fmt.indexOf("MMM"), eindex = fmt.indexOf("EE"),
			fmtlen = fmt.length, ary = [],
			
			aa = fmt.indexOf('a'),
			tlen = txt.replace(/[^.]/g, '').length,
			flen = fmt.replace(/[^.]/g, '').length;
			
			
		for (var i = 0, k = 0, j = txt.length; k < j; i++, k++) {
			var c = txt.charAt(k),
				f = fmtlen > i ? fmt.charAt(i) : "";
			if (c.match(/\d/)) {
				ary.push(c);
			} else if ((mindex >= 0 && mindex <= i )
			|| (eindex >= 0 && eindex <= i) || (aa > -1 && aa <= i)) {
				if (c.match(/\w/)) {
					ary.push(c);
				} else {
					if (c.charCodeAt(0) < 128 && (c.charCodeAt(0) != 46 ||
								tlen == flen || f.charCodeAt(0) == 46)) {
						if (ary.length) {
							ts.push(ary.join(""));
							ary = [];
						}
					} else
						ary.push(c);
				}
			} else if (ary.length) {
				if (txt.charAt(k-1).match(/\d/))
					while (f == fmt.charAt(i-1) && f) {
						f = fmt.charAt(++i);
					}
				ts.push(ary.join(""));
				ary = [];
			} else if (c.match(/\w/))
				return; 
		}
		if (ary.length) ts.push(ary.join(""));
		return ts;
	}
	function _parseToken(token, ts, i, len) {
		if (len < 2) len = 2;
		if (token && token.length > len) {
			ts[i] = token.substring(len);
			return token.substring(0, len);
		}
		return token;
	}
	function _parseInt(v) {
		return parseInt(v, 10);
	}
	function _digitFixed(val, digits) {
		var s = "" + val;
		for (var j = digits - s.length; --j >= 0;)
			s = "0" + s;
		return s;
	}
	function _ckDate(ary, txt) {
		if (txt.length)
			for (var j = ary.length; j--;) {
				var k = txt.indexOf(ary[j]);
				if (k >= 0)
					txt = txt.substring(0, k) + txt.substring(k + ary[j].length);
			}
		return txt;
	}
	function _dayInYear(d, ref) {
		return Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate())-ref)/864e5);
	}
	



	
	function dayInYear(d, ref) {
		if (!ref) ref = new Date(d.getFullYear(), 0, 1);
		return _digitFixed(1 + _dayInYear(d, ref));
	}
	
	function dayInMonth(d) {
		return d.getDate();
	}
	
	function weekInYear(d, ref) {
		if (!ref) ref = new Date(d.getFullYear(), 0, 1);
		var wday = ref.getDay();
		if (wday == 7) wday = 0;
		return _digitFixed(1 + Math.floor((_dayInYear(d, ref) + wday) / 7));
	}
	
	function weekInMonth(d) {
		return weekInYear(d, new Date(d.getFullYear(), d.getMonth(), 1));
	}
	
	function dayOfWeekInMonth(d) {
		return _digitFixed(1 + Math.floor(_dayInYear(d, new Date(d.getFullYear(), d.getMonth(), 1)) / 7));
	}
	
	

zk.fmt.Date = {
	parseDate : function (txt, fmt, strict, refval) {
		if (!fmt) fmt = "yyyy/MM/dd";
		refval = refval || zUtl.today(fmt);
		var y = refval.getFullYear(),
			m = refval.getMonth(),
			d = refval.getDate(), dFound,
			hr = refval.getHours(),
			min = refval.getMinutes(),
			sec = refval.getSeconds(),
			msec = refval.getMilliseconds(),
			aa = fmt.indexOf('a'),
			hasAM = aa > -1,
			hasHour1 = hasAM && (fmt.indexOf('h') > -1 || fmt.indexOf('K') > -1),
			isAM,
			ts = _parseTextToArray(txt, fmt),
			isNumber = !isNaN(txt);

		if (!ts || !ts.length) return;
		for (var i = 0, j = 0, offs = 0, fl = fmt.length; j < fl; ++j) {
			var cc = fmt.charAt(j);
			if ((cc >= 'a' && cc <= 'z') || (cc >= 'A' && cc <= 'Z')) {
				var len = 1, k;
				for (k = j; ++k < fl; ++len)
					if (fmt.charAt(k) != cc)
						break;

				var nosep, nv; 
				if (k < fl) {
					var c2 = fmt.charAt(k);
					nosep = c2 == 'y' || c2 == 'M' || c2 == 'd' || c2 == 'E';
				}
				
				var token = isNumber ? ts[0].substring(j - offs, k - offs) : ts[i++];
				switch (cc) {
				case 'y':
					if (nosep) {
						if (len <= 3) len = 2;
						if (token && token.length > len) {
							ts[--i] = token.substring(len);
							token = token.substring(0, len);
						}
					}

					if (!isNaN(nv = _parseInt(token))) {
						y = Math.min(nv, 200000); 
						if (y < 100) y += y > 29 ? 1900 : 2000;
					}
					break;
				case 'M':
					var mon = token ? token.toLowerCase() : '',
						isNumber0 = !isNaN(token);
					if (!mon) break; 
					if (!isNumber0 && token)
						for (var index = zk.SMON.length; --index >= 0;) {
							var smon = zk.SMON[index].toLowerCase();
							if (mon.startsWith(smon)) {
								token = zk.SMON[index];
								m = index;
								break;
							}
						}
					if (len == 3 && token) {
						if (nosep)
							token = _parseToken(token, ts, --i, token.length);
						if (isNaN(nv = _parseInt(token)))
							break;
						m = nv - 1;
					} else if (len <= 2) {
						if (nosep && token && token.length > 2) {
							ts[--i] = token.substring(2);
							token = token.substring(0, 2);
						}
						if (isNaN(nv = _parseInt(token)))
							break; 
						m = nv - 1;
					} else {
						for (var l = 0;; ++l) {
							if (l == 12) return; 
							if (len == 3) {
								if (zk.SMON[l] == token) {
									m = l;
									break;
								}
							} else {
								if (token && zk.FMON[l].startsWith(token)) {
									m = l;
									break;
								}
							}
						}
					}
					if (m > 11 ) 
						return;
					break;
				case 'E':
					if (nosep)
						_parseToken(token, ts, --i, len);
					break;
				case 'd':
					if (nosep)
						token = _parseToken(token, ts, --i, len);
					if (!isNaN(nv = _parseInt(token))) {
						d = nv;
						dFound = true;
						if (d < 0 || d > 31) 
							return; 
					}
					break;
				case 'H':
				case 'h':
				case 'K':
				case 'k':
					if (hasHour1 ? (cc == 'H' || cc == 'k'): (cc == 'h' || cc == 'K'))
						break;
					if (nosep)
						token = _parseToken(token, ts, --i, len);
					if (!isNaN(nv = _parseInt(token)))
						hr = (cc == 'h' && nv == 12) || (cc == 'k' && nv == 24) ? 
							0 : cc == 'K' ? nv % 12 : nv;
					break;
				case 'm':
				case 's':
				case 'S':
					if (nosep)
						token = _parseToken(token, ts, --i, len);
					if (!isNaN(nv = _parseInt(token))) {
						if (cc == 'm') min = nv;
						else if (cc == 's') sec = nv;
						else msec = nv;
					}
					break;
				case 'a':
					if (!hasHour1)
						break;
					if (!token) return; 
					isAM = token.startsWith(zk.APM[0]);
					break
				
				}
				j = k - 1;
			} else offs++;
		}

		if (hasHour1 && isAM === false)
			hr += 12;
		var dt = new Date(y, m, d, hr, min, sec, msec);
		if (!dFound && dt.getMonth() != m)
			dt = new Date(y, m + 1, 0, hr, min, sec, msec); 
		if (strict) {
			if (dt.getFullYear() != y || dt.getMonth() != m || dt.getDate() != d ||
				dt.getHours() != hr || dt.getMinutes() != min || dt.getSeconds() != sec) 
				return; 

			txt = txt.trim();
			txt = _ckDate(zk.FDOW, txt);
			txt = _ckDate(zk.SDOW, txt);
			txt = _ckDate(zk.S2DOW, txt);
			txt = _ckDate(zk.FMON, txt);
			txt = _ckDate(zk.SMON, txt);
			txt = _ckDate(zk.S2MON, txt);
			txt = _ckDate(zk.APM, txt);
			for (var j = txt.length; j--;) {
				var cc = txt.charAt(j);
				if ((cc > '9' || cc < '0') && fmt.indexOf(cc) < 0)
					return; 
			}
		}
		return +dt == +refval ? refval: dt;
			
	},
	formatDate : function (val, fmt) {
		if (!fmt) fmt = "yyyy/MM/dd";

		var txt = "";
		for (var j = 0, fl = fmt.length; j < fl; ++j) {
			var cc = fmt.charAt(j);
			if ((cc >= 'a' && cc <= 'z') || (cc >= 'A' && cc <= 'Z')) {
				var len = 1, k;
				for (k = j; ++k < fl; ++len)
					if (fmt.charAt(k) != cc)
						break;

				switch (cc) {
				case 'y':
					if (len <= 3) txt += _digitFixed(val.getFullYear() % 100, 2);
					else txt += _digitFixed(val.getFullYear(), len);
					break;
				case 'M':
					if (len <= 2) txt += _digitFixed(val.getMonth()+1, len);
					else if (len == 3) txt += zk.SMON[val.getMonth()];
					else txt += zk.FMON[val.getMonth()];
					break;
				case 'd':
					txt += _digitFixed(dayInMonth(val), len);
					break;
				case 'E':
					if (len <= 3) txt += zk.SDOW[(val.getDay() - zk.DOW_1ST + 7) % 7];
					else txt += zk.FDOW[(val.getDay() - zk.DOW_1ST) % 7];
					break;
				case 'D':
					txt += dayInYear(val);
					break;
				case 'w':
					txt += weekInYear(val);
					break;
				case 'W':
					txt += weekInMonth(val);
					break;
				case 'G':
					txt += zk.ERA;
					break;
				case 'F':
					txt += dayOfWeekInMonth(val);
					break;
				case 'H':
					if (len <= 2) txt += _digitFixed(val.getHours(), len);
					break;
				case 'k':
					var h = val.getHours();
					if (h == 0)
						h = '24';
					if (len <= 2) txt += _digitFixed(h, len);
					break;
				case 'K':
					if (len <= 2) txt += _digitFixed(val.getHours() % 12, len);
					break;
				case 'h':
					var h = val.getHours();
					h %= 12;
					if (h == 0)
						h = '12';
					if (len <= 2) txt += _digitFixed(h, len);
					break;
				case 'm':
					if (len <= 2) txt += _digitFixed(val.getMinutes(), len);
					break;
				case 's':
					if (len <= 2) txt += _digitFixed(val.getSeconds(), len);
					break;
				case 'S':
					if (len <= 3) txt += _digitFixed(val.getMilliseconds(), len);
					break;
				case 'Z':
					txt += -(val.getTimezoneOffset()/60);
					break;
				case 'a':
					txt += zk.APM[val.getHours() > 11 ? 1 : 0];
					break;
				default:
					txt += '1';
					
					
				}
				j = k - 1;
			} else {
				txt += cc;
			}
		}
		return txt;
	}
};

zk.fmt.Calendar = zk.$extends(zk.Object, {
	_offset: zk.YDELTA,
	$init: function (date) {
		this._date = date;
	},
	getTime: function () {
		return this._date;
	},
	setTime: function (date) {
		this._date = date;
	},
	setYearOffset: function (val) {
		this._offset = val;
	},
	getYearOffset: function () {
		return this._offset;
	},
	formatDate: function (val, fmt) {
		var d;
		if (this._offset) {
			d = new Date(val);
			d.setFullYear(d.getFullYear() + this._offset);
		}
		return zk.fmt.Date.formatDate(d || val, fmt);
	},
    toUTCDate: function () {
        var d;
        if ((d = this._date) && this._offset)
            (d = new Date(d))
                .setFullYear(d.getFullYear() - this._offset);
        return d;
    }, 
	parseDate: function (txt, fmt, strict, refval) {
		var d = zk.fmt.Date.parseDate(txt, fmt, strict, refval);
		if (this._offset && fmt) {
			var cnt = 0;
			for (var i = fmt.length; i--;)
				if (fmt.charAt(i) == 'y')
					cnt++;
			if (cnt > 3)
				d.setFullYear(d.getFullYear() - this._offset);
			else if (cnt) {
				var year = d.getFullYear();
				if (year < 2000)
					d.setFullYear(year + (Math.ceil(this._offset / 100) * 100 - this._offset));
				else
					d.setFullYear(year - (this._offset % 100));
			}
		}
		return d;
	},
	getYear: function () {
		return this._date.getFullYear() + this._offset;
	}
});
})();


(function () {
	var LEGAL_CHARS = 'ahKHksm',
		
		MINUTE_FIELD = 1,
		
		SECOND_FIELD = 2,
		
		AM_PM_FIELD = 3,
		
		HOUR0_FIELD = 4,
		
		HOUR1_FIELD = 5,
		
		HOUR2_FIELD = 6,
		
		HOUR3_FIELD = 7;
	function _updFormat(wgt, fmt) {
		var index = [];
		for (var i = 0, l = fmt.length; i < l; i++) {
			var c = fmt.charAt(i);
			switch (c) {
			case 'a':
				var len = zk.APM[0].length;
				index.push(new zul.inp.AMPMHandler([i, i + len - 1], AM_PM_FIELD));
				break;
			case 'K':
				var start = i,
					end = fmt.charAt(i+1) == 'K' ? ++i : i;
				index.push(new zul.inp.HourHandler2([start, end], HOUR3_FIELD));
				break;
			case 'h':
				var start = i,
					end = fmt.charAt(i+1) == 'h' ? ++i : i;
				index.push(new zul.inp.HourHandler([start, end], HOUR2_FIELD));
				break;
			case 'H':
				var start = i,
					end = fmt.charAt(i+1) == 'H' ? ++i : i;
				index.push(new zul.inp.HourInDayHandler([start, end], HOUR0_FIELD));
				break;;
			case 'k':
				var start = i,
					end = fmt.charAt(i+1) == 'k' ? ++i : i;
				index.push(new zul.inp.HourInDayHandler2([start, end], HOUR1_FIELD));
				break;
			case 'm':
				var start = i,
					end = fmt.charAt(i+1) == 'm' ? ++i : i;
				index.push(new zul.inp.MinuteHandler([start, end], MINUTE_FIELD));
				break;
			case 's':
				var start = i,
					end = fmt.charAt(i+1) == 's' ? ++i : i;
				index.push(new zul.inp.SecondHandler([start, end], SECOND_FIELD));
				break;
			default:
				var ary = [],
					start = i,
					end = i;

				while ((ary.push(c)) && ++end < l) {
					c = fmt.charAt(end);
					if (LEGAL_CHARS.indexOf(c) != -1) {
						end--;
						break;
					}
				}
				index.push({index: [start, end], format: (function (text) {
					return function() {
						return text;
					};
				})(ary.join(''))});
				i = end;
			}
		}
		for (var shift, i = 0, l = index.length; i < l; i++) {
			if (index[i].type == AM_PM_FIELD) {
				shift = index[i].index[1] - index[i].index[0];
				if (!shift) break; 
			} else if (shift) {
				index[i].index[0] += shift;
				index[i].index[1] += shift;
			}
		}
		wgt._fmthdler = index;
	}
	function _cleanSelectionText (wgt, startHandler) {
		var inp = wgt.getInputNode(),
			sel = zk(inp).getSelectionRange(),
			pos = sel[0],
			selEnd = sel[1],
			fmthdler = wgt._fmthdler,
			index = fmthdler.$indexOf(startHandler),
			text = [],
			hdler = startHandler,
			isFirst = true,
			prevStart, ofs, hStart, hEnd, posOfs;
		
		
		do {
			hStart = hdler.index[0];
			hEnd = hdler.index[1] + 1;
			
			if (hdler.type && 
				(posOfs = hdler.isSingleLength())) {
				
				hdler._doShift(wgt, posOfs);
				selEnd--;					
			}
			
			
			if (hEnd >= selEnd && hdler.type) {
				ofs = selEnd - hStart;
				while (ofs-- > 0) 
					text.push(' ');
				break;
			}
			
			if (hdler.type) {
				prevStart = isFirst ? pos: hStart;
				isFirst = false
				continue;
			}
			ofs = hStart - prevStart;
			while (ofs-- > 0) 
				text.push(' ');
									
			text.push(hdler.format());
			
		} while (hdler = fmthdler[++index]);
		return text.join('');
	}
	function _getMaxLen (wgt) {
		var val = wgt.getInputNode().value,
			len = 0, th, lastTh;
		for (var i = 0, f = wgt._fmthdler, l = f.length; i < l; i++) {
			th = f[i];
			len += (th.type ? th.getText(val): th.format()).length;
			if (th.type) lastTh = th;
		}
		return (lastTh.digits == 1) ? ++len: len;
	}


zul.db.Timebox = zk.$extends(zul.inp.FormatWidget, {
	_buttonVisible: true,
	_format: 'HH:mm',
	$init: function() {
		this.$supers('$init', arguments);
		_updFormat(this, this._format);
	},
	$define: {
		
		
		buttonVisible: function(v){
			var n = this.$n('btn'),
				zcls = this.getZclass();
			if (n) {
				if (!this.inRoundedMold()) {
					jq(n)[v ? 'show': 'hide']();
					jq(this.getInputNode())[v ? 'removeClass': 'addClass'](zcls + '-right-edge');
				} else {
					var fnm = v ? 'removeClass': 'addClass';
					jq(n)[fnm](zcls + '-btn-right-edge');
					
					if (zk.ie6_) {
						jq(n)[fnm](zcls + 
							(this._readonly ? '-btn-right-edge-readonly': '-btn-right-edge'));
						
						if (jq(this.getInputNode()).hasClass(zcls + "-text-invalid"))
							jq(n)[fnm](zcls + "-btn-right-edge-invalid");
					}
				}
				this.onSize();
			}
		}
	},
	setFormat: function (fmt) {
		_updFormat(this, fmt);
		this.$supers('setFormat', arguments);
	},
	coerceToString_: function (date) {
		if (!this._changed && !date && arguments.length) return '';
		var out = [], th, text, offset;
		for (var i = 0, f = this._fmthdler, l = f.length; i < l; i++) {
			th = f[i];
			text = th.format(date);
			out.push(text);
			
			if (th.type && (offset = th.isSingleLength()) !== false && 
				(offset += text.length - 1))
				th._doShift(this, offset);
		}
		return out.join('');
	},
	coerceFromString_: function (val) {
		if (!val) return null;

		var date = zUtl.today(this._format),
			hasAM, isAM, hasHour1,
			fmt = [], emptyCount = 0;
		date.setSeconds(0);
		date.setMilliseconds(0);

		for (var i = 0, f = this._fmthdler, l = f.length; i < l; i++) {
			if (f[i].type == AM_PM_FIELD) {
				hasAM = true;
				isAM = f[i].unformat(date, val);
				if (!f[i].getText(val).trim().length)
					emptyCount++;
			} else if (f[i].type) {
				fmt.push(f[i]);
				if (!f[i].getText(val).trim().length)
					emptyCount++;
			}
		}
		
		if (fmt.length == 
			(hasAM ? --emptyCount: emptyCount)) {
			this._changed = false;
			return;
		}

		for (var i = 0, l = fmt.length; i < l; i++) {
			if (!hasAM && (fmt[i].type == HOUR2_FIELD || fmt[i].type == HOUR3_FIELD))
				isAM = true;
			date = fmt[i].unformat(date, val, isAM);
		}
		return date;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-timebox" + (this.inRoundedMold() ? "-rounded": "");
	},
	onSize: _zkf = function () {
		var width = this.getWidth(),
			inp = this.getInputNode();
		if (!width || width.indexOf('%') != -1)
			inp.style.width = '';

		if (inp && this._value && !inp.value)
			inp.value = this.coerceToString_(this._value);

		this.syncWidth();
	},
	onShow: _zkf,
	onHide: zul.inp.Textbox.onHide,
	validate: zul.inp.Intbox.validate,
	doClick_: function(evt) {
		if (evt.domTarget == this.getInputNode())
			this._doCheckPos();
		this.$supers('doClick_', arguments);
	},
	doKeyPress_: function (evt) {
		if (zk.opera && evt.keyCode != 9) {
			evt.stop();
			return;
		}
		this.$supers('doKeyPress_', arguments);
	},
	doKeyDown_: function(evt) {
		var inp = this.getInputNode();
		if (inp.disabled || inp.readOnly)
			return;

		var code = evt.keyCode;
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
			code = code - (code>=96?96:48);
			this._doType(code);
			evt.stop();
			return;
		case 35:
			this.lastPos = inp.value.length;
			return;
		case 36:
			this.lastPos = 0;
			return;
		case 37:
			if (this.lastPos > 0)
				this.lastPos--;
			return;
		case 39:
			if (this.lastPos < inp.value.length)
				this.lastPos++;
			return;
		case 38:
			this._doUp();
			evt.stop();
			return;
		case 40:
			this._doDown();
			evt.stop();
			return;
		case 46:
			this._doDel();
			evt.stop();
			return;
		case 8:
			this._doBack();
			evt.stop();
			return;
		case 9:
			
			break
		case 13: case 27:
			break;
		default:
			if (!(code >= 112 && code <= 123) 
			&& !evt.ctrlKey && !evt.altKey)
				evt.stop();
		}
		this.$supers('doKeyDown_', arguments);
	},
	_dodropbtnup: function (evt) {
		var zcls = this.getZclass();
		
		jq(this._currentbtn).removeClass(zcls + "-btn-clk");
		if (!this.inRoundedMold()) {
			jq(this._currentbtn).removeClass(zcls + "-btn-up-clk");
			jq(this._currentbtn).removeClass(zcls + "-btn-down-clk");
		}
		this.domUnlisten_(document.body, "onZMouseup", "_dodropbtnup");
		this._currentbtn = null;
	},
	_btnDown: function(evt) {
		var isRounded = this.inRoundedMold();
		if (isRounded && !this._buttonVisible) return;
		
		var inp;
		if(!(inp = this.getInputNode()) || inp.disabled) return;
		
		var btn = this.$n("btn"),
			zcls = this.getZclass();
			
		if (this._currentbtn)
			this._dodropbtnup(evt);
		jq(btn).addClass(zcls + "-btn-clk");
		this.domListen_(document.body, "onZMouseup", "_dodropbtnup");
		this._currentbtn = btn;

		if (!inp.value)
			inp.value = this.coerceToString_();
			
		var ofs = zk(btn).revisedOffset(),
			isOverUpBtn = (evt.pageY - ofs[1]) < btn.offsetHeight/2;
		if (isOverUpBtn) { 
			this._doUp();
			this._startAutoIncProc(true);
		} else {
			this._doDown();
			this._startAutoIncProc(false);
		}
		
		var sfx = isRounded? "" : 
					isOverUpBtn? "-up":"-down";
		if ((btn = this.$n("btn" + sfx)) && !isRounded) {
			jq(btn).addClass(zcls + "-btn" + sfx + "-clk");
			this._currentbtn = btn;
		}
		
		
		this._lastPos = this._getPos();
		this._changed = true;
		
		zk.Widget.mimicMouseDown_(this); 
		zk(inp).focus(); 
			

		
		evt.stop();
	},
	_btnUp: function(evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;

		var inp = this.getInputNode();
		if(inp.disabled || zk.dragging) return;

		if (zk.opera) zk(inp).focus();
			

		this._onChanging();
		this._stopAutoIncProc();
		
		if ((zk.ie || zk.safari) && this._lastPos)
			zk(inp).setSelectionRange(this._lastPos, this._lastPos);
	},
	_btnOut: function(evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		var inp = this.getInputNode();
		if(!inp || inp.disabled || zk.dragging) return;

		jq(this.$n("btn")).removeClass(this.getZclass()+"-btn-over");
		this._stopAutoIncProc();
	},
	_btnOver: function(evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (this.getInputNode() && !this.getInputNode().disabled && !zk.dragging)
			jq(this.$n("btn")).addClass(this.getZclass()+"-btn-over");
	},
	_getPos: function () {
		return zk(this.getInputNode()).getSelectionRange()[0];
	},
	_doCheckPos: function () {
		this.lastPos = this._getPos();
	},
	_doUp: function() {
		this._changed = true;
		this.getTimeHandler().increase(this, 1);
		this._onChanging();
	},
	_doDown: function() {
		this._changed = true;
		this.getTimeHandler().increase(this, -1);
		this._onChanging();
	},
	_doBack: function () {
		this._changed = true;
		this.getTimeHandler().deleteTime(this, true);
	},
	_doDel: function () {
		this._changed = true;
		this.getTimeHandler().deleteTime(this, false);
	},
	_doType: function (val) {
		this._changed = true;
		this.getTimeHandler().addTime(this, val);
	},
	getTimeHandler: function () {
		var pos = zk(this.getInputNode()).getSelectionRange()[0];
		for (var i = 0, f = this._fmthdler, l = f.length; i < l; i++) {
			if (!f[i].type) continue;
			if (f[i].index[0] <= pos && f[i].index[1] + 1 >= pos)
				return f[i];
		}
		return this._fmthdler[0];
	},
	getNextTimeHandler: function (th) {
		var f = this._fmthdler,
			index = f.$indexOf(th),
			lastHandler;
			
		while ((lastHandler = f[++index]) &&
			(!lastHandler.type || lastHandler.type == AM_PM_FIELD));
		
		return lastHandler;
	},
	_startAutoIncProc: function(up) {
		if (this.timerId)
			clearInterval(this.timerId);
		var self = this,
			fn = up ? '_doUp' : '_doDown';
		this.timerId = setInterval(function() {
			if ((zk.ie || zk.safari) && self._lastPos)
				zk(self.getInputNode()).setSelectionRange(self._lastPos, self._lastPos);
			self[fn]();
		}, 300);
	},
	_stopAutoIncProc: function() {
		if (this.timerId)
			clearTimeout(this.timerId);
		this.currentStep = this.defaultStep;
		this.timerId = null;
	},
	
	syncWidth: function () {
		zul.inp.RoundUtl.syncWidth(this, this.$n('btn'));
	},
	doFocus_: function (evt) {
		var n = this.$n(),
			inp = this.getInputNode(),
			selrng = zk(inp).getSelectionRange();
		if (this._inplace)
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));

		this.$supers('doFocus_', arguments);	

		if (!inp.value)
			inp.value = this.coerceToString_();

		this._doCheckPos();
		
		
		if (selrng[0] !== selrng[1]) {
			zk(inp).setSelectionRange(selrng[0], selrng[1]);
			this.lastPos = selrng[1];
		}
		if (this._inplace) {
			if (jq(n).hasClass(this.getInplaceCSS())) {
				jq(n).removeClass(this.getInplaceCSS());
				this.onSize();
			}
		}
	},
	doBlur_: function (evt) {
		var n = this.$n();
		if (this._inplace && this._inplaceout)
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));

		
		if (!this._value && !this._changed)
			this.getInputNode().value = this._lastRawValVld = '';

		this.$supers('doBlur_', arguments);

		if (this._inplace && this._inplaceout) {
			jq(n).addClass(this.getInplaceCSS());
			this.onSize();
			n.style.width = this.getWidth() || '';
		}
	},
	afterKeyDown_: function (evt) {
		if (this._inplace)
			jq(this.$n()).toggleClass(this.getInplaceCSS(),  evt.keyCode == 13 ? null : false);

		this.$supers('afterKeyDown_', arguments);
	},
	bind_: function () {
		this.$supers(zul.db.Timebox, 'bind_', arguments);
		var btn, inp = this.getInputNode();
	
		if (this._inplace)
			jq(inp).addClass(this.getInplaceCSS());
		
		if (btn = this.$n('btn'))
			this.domListen_(btn, "onZMouseDown", "_btnDown")
				.domListen_(btn, "onZMouseUp", "_btnUp")
				.domListen_(btn, "onMouseOut", "_btnOut")
				.domListen_(btn, "onMouseOver", "_btnOver");

		zWatch.listen({onSize: this, onShow: this});
	},
	unbind_: function () {
		if(this.timerId){
			clearTimeout(this.timerId);
			this.timerId = null;
		}
		zWatch.unlisten({onSize: this, onShow: this});
		var btn = this.$n("btn");
		if (btn) {
			this.domUnlisten_(btn, "onZMouseDown", "_btnDown")
				.domUnlisten_(btn, "onZMouseUp", "_btnUp")
				.domUnlisten_(btn, "onMouseOut", "_btnOut")
				.domUnlisten_(btn, "onMouseOver", "_btnOver");
		}
		this._changed = false;
		this.$supers(zul.db.Timebox, 'unbind_', arguments);
	}

});
zul.inp.TimeHandler = zk.$extends(zk.Object, {
	maxsize: 59,
	minsize: 0,
	digits: 2,
	$init: function (index, type) {
		this.index = index;
		this.type = type;
		if (index[0] == index[1])
			this.digits = 1;
	},
	format: function (date) {
		return '00';
	},
	unformat: function (date, val) {
		return date;
	},
	increase: function (wgt, up) {
		var inp = wgt.getInputNode(),
			start = this.index[0],
			end = this.index[1] + 1,
			val = inp.value,
			text = this.getText(val),
			singleLen = this.isSingleLength() !== false,
			ofs;

		text = zk.parseInt(singleLen ? text: 
				text.replace(/ /g, '0')) + up;
		
		var max = this.maxsize + 1;
		if (text < this.minsize) {
			text = this.maxsize;
			ofs = 1;
		} else if (text >= max) {
			text = this.minsize;
			ofs = -1;
		} else if (singleLen) 
			ofs = (up > 0) ? 
					(text == 10) ? 1: 0:
					(text == 9) ? -1: 0;

		if (text < 10 && !singleLen)
			 text = "0" + text;
		
		inp.value = val.substring(0, start) + text + val.substring(end);
		
		if (singleLen && ofs) {
			this._doShift(wgt, ofs);
			end += ofs; 
		}

		zk(inp).setSelectionRange(start, end);
	},
	deleteTime: function (wgt, backspace) {
		var inp = wgt.getInputNode(),
			sel = zk(inp).getSelectionRange(),
			pos = sel[0],
			val = inp.value,
			maxLength = _getMaxLen(wgt);
		
		
		if (val.length > maxLength) {
			val = inp.value = val.substr(0, maxLength);
			sel = [Math.min(sel[0], maxLength), Math.min(sel[1], maxLength)];
			pos = sel[0];
		}
		
		if (pos != sel[1]) { 
			
			inp.value = val.substring(0, pos) + _cleanSelectionText(wgt, this)
							+ val.substring(sel[1]);
		} else {
			var fmthdler = wgt._fmthdler,
				index = fmthdler.$indexOf(this),
				ofs = backspace? -1: 1,
				ofs2 = backspace? 0: 1,
				ofs3 = backspace? 1: 0,
				hdler, posOfs;
			if (pos == this.index[ofs2] + ofs2) {
				
				if (hdler = fmthdler[index + ofs * 2]) 
					pos = hdler.index[ofs3] + ofs3 + ofs;
			} else {
				pos += ofs;
				hdler = this;
			}
			if (hdler) {
				posOfs = hdler.isSingleLength();
				inp.value = val.substring(0, (ofs3 += pos)-1) + 
					(posOfs ? '': ' ') + val.substring(ofs3);
				if (posOfs)	
					hdler._doShift(wgt, posOfs);
			}
			if (posOfs && !backspace) pos--;
		}
		zk(inp).setSelectionRange(pos, pos);
	},
	_addNextTime: function (wgt, num) {
		var inp = wgt.getInputNode(),
			index, NTH;
		if (NTH = wgt.getNextTimeHandler(this)) {
			index = NTH.index[0];
			zk(inp).setSelectionRange(index, 
				Math.max(index, 
					zk(inp).getSelectionRange()[1]));
			NTH.addTime(wgt, num);
		}
	},
	addTime: function (wgt, num) {
		var inp = wgt.getInputNode(),
			sel = zk(inp).getSelectionRange(),
			val = inp.value,
			pos = sel[0],
			maxLength = _getMaxLen(wgt),
			posOfs = this.isSingleLength();
			
		
		if (val.length > maxLength) {
			val = inp.value = val.substr(0, maxLength);
			sel = [Math.min(sel[0], maxLength), Math.min(sel[1], maxLength)];
			pos = sel[0];
		}
		
		if (pos == maxLength)
			return;
		
		
		if (pos == this.index[0]) {
			var text = this.getText(val)
						.substring((posOfs === 0)? 0: 1).trim(),
				i;
			if (!text.length) text = '0';
			
			if ((i = zk.parseInt(num + text)) > this.maxsize) {
				if (posOfs !== 0) {
					val = inp.value = val.substring(0, pos) + (posOfs ? '0': '00')
						+ val.substring(pos + 2);
					if (!posOfs) pos++;
					zk(inp).setSelectionRange(pos, Math.max(sel[1], pos));
					sel = zk(inp).getSelectionRange();
				}
				if (posOfs)
					this._doShift(wgt, posOfs);
			}
		} else if (pos == (this.index[1] + 1)) {
			var i;
			if (posOfs !== false) {
				var text = this.getText(val);
				if ((i = zk.parseInt(text + num)) <= this.maxsize) {
					if (i && i < 10) 
						pos--;
					else if (i || posOfs) { 
						val = inp.value = val.substring(0, (pos + posOfs)) +
							(posOfs ? '' : '0') + val.substring(pos);
						if (i) 
							this._doShift(wgt, 1);
						else { 
							zk(inp).setSelectionRange(pos, Math.max(sel[1], pos));
							if (posOfs)
								this._doShift(wgt, posOfs);
						}
					}
				}
			}
			
			if (!i || i > this.maxsize) {
				this._addNextTime(wgt, num);
				return;
			}
		}
		
		if (pos != sel[1]) {
			
			var s = _cleanSelectionText(wgt, this),
				ofs;
			
			if (posOfs !== false && (ofs = pos - this.index[1]))
				this._doShift(wgt, ofs);
				
			inp.value = val.substring(0, pos++) + num 
				+ s.substring(ofs ? 0: 1)
				+ val.substring(sel[1]);
		} else {
			inp.value = val.substring(0, pos) 
				+ num + val.substring(++pos);
		}
		wgt.lastPos = pos;
		zk(inp).setSelectionRange(pos, pos);
	},
	getText: function (val) {
		var start = this.index[0],
			end = this.index[1] + 1;
		return val.substring(start, end);
	},
	_doShift: function (wgt, shift) {
		var f = wgt._fmthdler,
			index = f.$indexOf(this),
			NTH;
		this.index[1] += shift;	
		while (NTH = f[++index]) {
			NTH.index[0] += shift;
			NTH.index[1] += shift;
		}
	},
	isSingleLength: function () {
		return this.digits == 1 && (this.index[0] - this.index[1]);
	}
});
zul.inp.HourInDayHandler = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 23,
	minsize: 0,
	format: function (date) {
		var singleLen = this.digits == 1;
		if (!date) return singleLen ? '0': '00';
		else {
			var h = date.getHours();
			if (!singleLen && h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val) {
		date.setHours(zk.parseInt(this.getText(val)));
		return date;
	}
});
zul.inp.HourInDayHandler2 = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 24,
	minsize: 1,
	format: function (date) {
		if (!date) return '24';
		else {
			var h = date.getHours();
			if (h == 0)
				h = '24';
			else if (this.digits == 2 && h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val) {
		var hours = zk.parseInt(this.getText(val));
		if (hours == 24)
			hours = 0;
		date.setHours(hours);
		return date;
	}
});
zul.inp.HourHandler = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 12,
	minsize: 1,
	format: function (date) {
		if (!date) return '12';
		else {
			var h = date.getHours();
			h = (h % 12);
			if (h == 0)
				h = '12';
			else if (this.digits == 2 && h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val, am) {
		var hours = zk.parseInt(this.getText(val));
		if (hours == 12)
			hours = 0;
		date.setHours(am ? hours : hours + 12);
		return date;
	}
});
zul.inp.HourHandler2 = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 11,
	minsize: 0,
	format: function (date) {
		var singleLen = this.digits == 1;
		if (!date) return singleLen ? '0': '00';
		else {
			var h = date.getHours();
			h = (h % 12);
			if (!singleLen && h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val, am) {
		var hours = zk.parseInt(this.getText(val));
		date.setHours(am ? hours : hours + 12);
		return date;
	}
});
zul.inp.MinuteHandler = zk.$extends(zul.inp.TimeHandler, {
	format: function (date) {
		var singleLen = this.digits == 1;
		if (!date) return singleLen ? '0': '00';
		else {
			var m = date.getMinutes();
			if (!singleLen && m < 10)
				m = '0' + m;
			return m.toString();
		}
	},
	unformat: function (date, val) {
		date.setMinutes(zk.parseInt(this.getText(val)));
		return date;
	}
});
zul.inp.SecondHandler = zk.$extends(zul.inp.TimeHandler, {
	format: function (date) {
		var singleLen = this.digits == 1;
		if (!date) return  singleLen ? '0': '00';
		else {
			var s = date.getSeconds();
			if (!singleLen && s < 10)
				s = '0' + s;
			return s.toString();
		}
	},
	unformat: function (date, val) {
		date.setSeconds(zk.parseInt(this.getText(val)));
		return date;
	}
});
zul.inp.AMPMHandler = zk.$extends(zul.inp.TimeHandler, {
	format: function (date) {
		if (!date)
			return zk.APM[0];
		var h = date.getHours();
		return zk.APM[h < 12 ? 0 : 1];
	},
	unformat: function (date, val) {
		var text = this.getText(val).trim();
		return (text.length == zk.APM[0].length) ? 
			zk.APM[0] == text : true;
	},
	addTime: function (wgt, num) {
		var inp = wgt.getInputNode(),
			start = this.index[0],
			end = this.index[1] + 1,
			val = inp.value,
			text = val.substring(start, end);
		
		if (text != zk.APM[0] && text != zk.APM[1]) {
			text = zk.APM[0];
			inp.value = val.substring(0, start) + text + val.substring(end);
		}
		this._addNextTime(wgt, num);
	},
	increase: function (wgt, up) {
		var inp = wgt.getInputNode(),
			start = this.index[0],
			end = this.index[1] + 1,
			val = inp.value,
			text = val.substring(start, end);

		text = zk.APM[0] == text ? zk.APM[1] : zk.APM[0];
		inp.value = val.substring(0, start) + text + val.substring(end);
		zk(inp).setSelectionRange(start, end);
	}
});

})();
zkreg('zul.db.Timebox');zk._m={};
zk._m['rounded']=

zul.inp.Spinner.molds['default']
;zk._m['default']=

zul.inp.Spinner.molds['default']
;zkmld(zk._p.p.Timebox,zk._m);




(function () {
	
	var _doFocus = zk.gecko ? function (n, timeout) {
			if (timeout)
				setTimeout(function () {
					zk(n).focus();
				});
			else
				zk(n).focus();
		} : function (n) {
			zk(n).focus();
		};

	function _newDate(year, month, day, bFix) {
		var v = new Date(year, month, day);
		return bFix && v.getMonth() != month ?
			new Date(year, month + 1, 0): v;
	}


zul.db.Renderer = {
	
	cellHTML: function (cal, y, m, day, monthofs) {
		return day;
	},
	
	beforeRedraw: function (cal) {
	},
	
	disabled: function (cal, y, m, v, today) {
		var d = new Date(y, m, v, 0, 0, 0, 0),
			constraint;
		
		if ((constraint = cal._constraint)&& typeof constraint == 'string') {
			
			
			if ((constraint.indexOf("no past") > -1 && (d - today) / 86400000 < 0) ||
			    (constraint.indexOf("no future") > -1 && (today - d) / 86400000 < 0) ||
			    (constraint.indexOf("no today") > -1 && today - d == 0))
					return true;
		}
		
		var result = false;
		if (cal._beg && (result = (d - cal._beg) / 86400000 < 0))
			return result;
		if (cal._end && (result = (cal._end - d) / 86400000 < 0))
			return result;
		return result;
	}
};
var Calendar =

zul.db.Calendar = zk.$extends(zul.Widget, {
	_view : "day", 
	
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onChange: this}, -1000);
	},
	$define: {
		
		
		value: function() {
			this.rerender();
		},
		
		
		constraint: function() {
			var constraint = this._constraint || '';
			if (typeof this._constraint != 'string') return;
			if (constraint.startsWith("between")) {
				var j = constraint.indexOf("and", 7);
				if (j < 0 && zk.debugJS) 
					zk.error('Unknown constraint: ' + constraint);
				this._beg = new zk.fmt.Calendar().parseDate(constraint.substring(7, j), 'yyyyMMdd');
				this._end = new zk.fmt.Calendar().parseDate(constraint.substring(j + 3), 'yyyyMMdd');
				if (this._beg.getTime() > this._end.getTime()) {
					var d = this._beg;
					this._beg = this._end;
					this._end = d;
				}
				
				this._beg.setHours(0, 0, 0, 0);
				this._end.setHours(0, 0, 0, 0);
			} else if (constraint.startsWith("before")) {
				this._end = new zk.fmt.Calendar().parseDate(constraint.substring(6), 'yyyyMMdd');
				this._end.setHours(0, 0, 0, 0);
			} else if (constraint.startsWith("after")) {
				this._beg = new zk.fmt.Calendar().parseDate(constraint.substring(5), 'yyyyMMdd');
				this._beg.setHours(0, 0, 0, 0);
			}
		},
		
		
		name: function () {
			if (this.efield)
				this.efield.name = this._name;
		}
	},
	
	redraw: function () {
		zul.db.Renderer.beforeRedraw(this);
		this.$supers("redraw", arguments);
	},
	onChange: function (evt) {
		this._updFormData(evt.data.value);
	},
	doKeyDown_: function (evt) {
		var keyCode = evt.keyCode,
			ofs = keyCode == 37 ? -1 : keyCode == 39 ? 1 : keyCode == 38 ? -7 : keyCode == 40 ? 7 : 0;
		if (ofs) {
			this._shift(ofs);
		} else 
			this.$supers('doKeyDown_', arguments);
	},
	_shift: function (ofs, opts) {
		var oldTime = this.getTime();	
		
		switch(this._view) {
		case 'month':
		case 'year':
			if (ofs == 7)
				ofs = 4;
			else if (ofs == -7)
				ofs = -4;
			break;
		case 'decade':
			if (ofs == 7)
				ofs = 4;
			else if (ofs == -7)
				ofs = -4;
			ofs *= 10;
			
			var y = oldTime.getFullYear();
			if (y + ofs < 1900 || y + ofs > 2100)
				return;

		}		
		this._shiftDate(this._view, ofs);
		var newTime = this.getTime();
		switch(this._view) {
		case 'day':
			if (oldTime.getYear() == newTime.getYear() &&
				oldTime.getMonth() == newTime.getMonth()) {
				this._markCal(opts);
			} else 
				this.rerender();
			break;
		case 'month':
			if (oldTime.getYear() == newTime.getYear())
				this._markCal(opts);
			else
				this.rerender();
			break;
		default:			
			this.rerender();

		}
	},
	
	getFormat: function () {
		return this._fmt || "yyyy/MM/dd";
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-calendar";
	},
	_updFormData: function (val) {
		val = new zk.fmt.Calendar().formatDate(val, this.getFormat())
		if (this._name) {
			val = val || '';
			if (!this.efield)
				this.efield = jq.newHidden(this._name, val, this.$n());
			else
				this.efield.value = val;
		}
	},
	focus_: function (timeout) {
		if (this._view != 'decade') 
			this._markCal({timeout: timeout});
		else {
			var anc;
			if (anc = this.$n('a'))
				_doFocus(anc, true);
		}
		return true;
	},
	bind_: function (){
		this.$supers(Calendar, 'bind_', arguments);
		var node = this.$n(),
			title = this.$n("title"),
			mid = this.$n("mid"),
			tdl = this.$n("tdl"),
			tdr = this.$n("tdr"),
			zcls = this.getZclass();
		jq(title).hover(
			function () {
				jq(this).toggleClass(zcls + "-title-over");
			},
			function () {
				jq(this).toggleClass(zcls + "-title-over");
			}
		);
		if (this._view != 'decade') 
			this._markCal({silent: true});

		this.domListen_(title, "onClick", '_changeView')
			.domListen_(mid, "onClick", '_clickDate')
			.domListen_(tdl, "onClick", '_clickArrow')
			.domListen_(tdl, "onMouseOver", '_doMouseEffect')
			.domListen_(tdl, "onMouseOut", '_doMouseEffect')
			.domListen_(tdr, "onClick", '_clickArrow')
			.domListen_(tdr, "onMouseOver", '_doMouseEffect')
			.domListen_(tdr, "onMouseOut", '_doMouseEffect')
			.domListen_(mid, "onMouseOver", '_doMouseEffect')
			.domListen_(mid, "onMouseOut", '_doMouseEffect')
			.domListen_(node, 'onMousewheel');

		this._updFormData(this.getTime());
	},
	unbind_: function () {
		var node = this.$n(),
			title = this.$n("title"),
			mid = this.$n("mid"),
			tdl = this.$n("tdl"),
			tdr = this.$n("tdr");
		this.domUnlisten_(title, "onClick", '_changeView')
			.domUnlisten_(mid, "onClick", '_clickDate')
			.domUnlisten_(tdl, "onClick", '_clickArrow')			
			.domUnlisten_(tdl, "onMouseOver", '_doMouseEffect')
			.domUnlisten_(tdl, "onMouseOut", '_doMouseEffect')
			.domUnlisten_(tdr, "onClick", '_clickArrow')
			.domUnlisten_(tdr, "onMouseOver", '_doMouseEffect')
			.domUnlisten_(tdr, "onMouseOut", '_doMouseEffect')
			.domUnlisten_(mid, "onMouseOver", '_doMouseEffect')
			.domUnlisten_(mid, "onMouseOut", '_doMouseEffect')
			.domUnlisten_(node, 'onMousewheel')
			.$supers(Calendar, 'unbind_', arguments);
		this.efield = null;
	},
	rerender: function () {
		if (this.desktop) {
			var s = this.$n().style,
				w = s.width,
				h = s.height,
				result = this.$supers('rerender', arguments);
			s = this.$n().style;
			s.width = w;
			s.height = h;
			return result;
		}
	},
	_clickArrow: function (evt) {		
		var node = evt.domTarget.id.indexOf("-ly") > 0 ? this.$n("tdl") :
				   evt.domTarget.id.indexOf("-ry") > 0 ?  this.$n("tdr") :
				   evt.domTarget;
		if (jq(node).hasClass(this.getZclass() + '-icon-disd'))
			return;
		this._shiftView(node.id.indexOf("-tdl") > 0 ? -1 : 1);
	},
	_shiftView: function (ofs) {
		switch(this._view) {
		case "day" :
			this._shiftDate("month", ofs);
			break;
		case "month" :
			this._shiftDate("year", ofs);
			break;
		case "year" :
			this._shiftDate("year", ofs*10);
			break;
		case "decade" :
			this._shiftDate("year", ofs*100);

		}
		this.rerender();
	},
	_doMousewheel: function (evt, intDelta) {		
		if (jq(this.$n(-intDelta > 0 ? "tdr": "tdl")).hasClass(this.getZclass() + '-icon-disd'))
			return;
		this._shiftView(intDelta > 0 ? -1: 1);
		evt.stop();
	},
	_doMouseEffect: function (evt) {
		var	ly = this.$n("ly"),
			ry = this.$n("ry"), 
			$node = evt.domTarget == ly ? jq(this.$n("tdl")) :
					evt.domTarget == ry ? jq(this.$n("tdr")) : jq(evt.domTarget),
			zcls = this.getZclass();
		
		if ($node.hasClass(zcls + '-disd'))
			return;
			
		if ($node.is("."+zcls+"-seld")) {
			$node.removeClass(zcls + "-over")
				.toggleClass(zcls + "-over-seld");
		} else {
			$node.toggleClass(zcls + "-over");
		}
	},
	
	getTime: function () {
		return this._value || zUtl.today(this.getFormat());
	},
	_setTime: function (y, m, d, hr, mi) {
		var dateobj = this.getTime(),
			year = y != null ? y  : dateobj.getFullYear(),
			month = m != null ? m : dateobj.getMonth(),
			day = d != null ? d : dateobj.getDate();
		this._value = _newDate(year, month, day, d == null);
		this.fire('onChange', {value: this._value});
	},
	_clickDate: function (evt) {
		var target = evt.domTarget, val;
		for (; target; target = target.parentNode)
			try { 
				if ((val = jq(target).attr("_dt")) !== undefined) {
					val = zk.parseInt(val);
					break;
				}
			} catch (e) {
				continue; 
			}
		this._chooseDate(target, val);
		var anc;
		if (anc = this.$n('a'))
			_doFocus(anc, true);

		evt.stop();
	},
	_chooseDate: function (target, val) {
		if (target && !jq(target).hasClass(this.getZclass() + '-disd')) {
			var cell = target,
				dateobj = this.getTime();
			switch(this._view) {
			case "day" :
				var oldTime = this.getTime();
				this._setTime(null, cell._monofs != null && cell._monofs != 0 ?
						dateobj.getMonth() + cell._monofs : null, val);
				var newTime = this.getTime();
				if (oldTime.getYear() == newTime.getYear() &&
					oldTime.getMonth() == newTime.getMonth()) {
						this._markCal();
				} else
					this.rerender();
				break;
			case "month" :
				this._setTime(null, val);
				this._setView("day");
				break;
			case "year" :
				this._setTime(val);
				this._setView("month");
				break;
			case "decade" :
				
				this._setTime(val);
				this._setView("year");

			}
		}
	},
	_shiftDate: function (opt, ofs) {
		var dateobj = this.getTime(),
			year = dateobj.getFullYear(),
			month = dateobj.getMonth(),
			day = dateobj.getDate(),
			nofix;
		switch(opt) {
		case "day" :
			day += ofs;
			nofix = true;
			break;
		case "month" :
			month += ofs;
			break;
		case "year" :
			year += ofs;
			break;
		case "decade" :
			year += ofs;

		}
		this._value = _newDate(year, month, day, !nofix);
		this.fire('onChange', {value: this._value, shallClose: false});
	},
	_changeView : function (evt) {
		var tm = this.$n("tm"),
			ty = this.$n("ty"),
			tyd = this.$n("tyd"),
			title = this.$n("title");
		if (evt.domTarget == tm)
			this._setView("month");
		else if (evt.domTarget == ty)
			this._setView("year");
		else if (evt.domTarget == tyd )
			this._setView("decade");
		else if (tm != null && evt.domTarget == title)
			this._setView("month");
		evt.stop();
	},
	_setView : function (view) {
		if (view != this._view) {
			this._view = view;
			this.rerender();
		}
	},
	_markCal: function (opts) {
		var	zcls = this.getZclass(),
		 	seldate = this.getTime(),
		 	m = seldate.getMonth(),
			y = seldate.getFullYear();

		if (this._view == 'day') {
			var d = seldate.getDate(),
				v = new Date(y, m, 1).getDay()- zk.DOW_1ST,
				last = new Date(y, m + 1, 0).getDate(), 
				prev = new Date(y, m, 0).getDate(), 
				today = zUtl.today(); 
			if (v < 0) v += 7;
			for (var j = 0, cur = -v + 1; j < 6; ++j) {
				var week = this.$n("w" + j);
				if (week != null) {
					for (var k = 0; k < 7; ++k, ++cur) {
						v = cur <= 0 ? prev + cur: cur <= last ? cur: cur - last;
						if (k == 0 && cur > last)
							week.style.display = "none";
						else {
							if (k == 0) week.style.display = "";
							var $cell = jq(week.cells[k]),
								monofs = cur <= 0 ? -1: cur <= last ? 0: 1,
								bSel = cur == d;
								
							$cell[0]._monofs = monofs;
							$cell.css('textDecoration', '').
								removeClass(zcls+"-seld");
								
							if (bSel) {
								$cell.addClass(zcls+"-seld");
								if ($cell.hasClass(zcls + "-over"))
									$cell.addClass(zcls + "-over-seld");;
							} else
								$cell.removeClass(zcls+"-seld");
								
							
							$cell[monofs ? 'addClass': 'removeClass']("z-outside")
								[zul.db.Renderer.disabled(this, y, m + monofs, v, today) ? 
								'addClass': 'removeClass'](zcls+"-disd").
								html(zul.db.Renderer.cellHTML(this, y, m + monofs, v, monofs)).
								attr('_dt', v);
						}
					}
				}
			}
		} else {
			var isMon = this._view == 'month',
				field = isMon ? 'm': 'y',
				index = isMon? m: y % 10 + 1,
				node;
				
			for (var j = 0; j < 12; ++j)
				if (node = this.$n(field + j))
					jq(node)[index == j ? 'addClass': 'removeClass'](zcls+"-seld");
		}
		var anc;
		if ((anc = this.$n('a')) && (!opts || !opts.silent))
			_doFocus(anc, opts && opts.timeout );
	}
});
})();
zkreg('zul.db.Calendar');zk._m={};
zk._m['default']=

function (out) {
	var uuid = this.uuid,
		view = this._view,
		zcls = this.getZclass(),
		val = this.getTime(),
		m = val.getMonth(),
		d = val.getDate(),
		y = val.getFullYear(),
		ydelta = new zk.fmt.Calendar(val).getYear() - y, 
		yofs = y - (y % 10 + 1),
		ydec = zk.parseInt(y/100),
		tags = zk.ie || zk.gecko ? "a" : "button";
	out.push('<div id="', this.uuid, '"', this.domAttrs_(), '><table style="table-layout: fixed" width="100%"', zUtl.cellps0, '>',
			'<tr><td id="', uuid, '-tdl" class="', zcls, '-tdl');
	
	if (view == 'decade' && ydec*100 == 1900)
		out.push(' ', zcls, '-icon-disd');
		
	out.push('"><div  class="', zcls, '-left"><div id="', uuid, '-ly" class="', zcls, '-left-icon"></div></div></td>',
				'<td><table class="', zcls, '-calctrl" width="100%" border="0" cellspacing="0" cellpadding="0">',
				'<tr><td id="', uuid, '-title" class="', zcls, '-title">');
	switch(view) {
	case "day" :
		out.push('<span id="', uuid, '-tm" class="', zcls, '-ctrler">', zk.SMON[m], '</span> <span id="', uuid, '-ty" class="', zcls, '-ctrler">', y + ydelta, '</span>');
		break;
	case "month" :
		out.push('<span id="', uuid, '-tm" class="', zcls, '-ctrler">', zk.SMON[m], '</span> <span id="', uuid, '-ty" class="', zcls, '-ctrler">', y + ydelta, '</span>');
		break;
	case "year" :
		out.push('<span id="', uuid, '-tyd" class="', zcls, '-ctrler">', yofs + ydelta + 1, '-', yofs + ydelta + 10, '</span>');
		break;
	case "decade" :
		out.push('<span id="', uuid, '-tyd" class="', zcls, '-ctrler">', ydec*100 + ydelta, '-', ydec*100 + ydelta+ 99, '</span>');
		break;
	}
	out.push('</td></tr></table></td>',
		'<td id="', uuid, '-tdr" class="', zcls, '-tdr');
		
	if (view == 'decade' && ydec*100 == 2000)
		out.push(' ', zcls, '-icon-disd');
	
	out.push('"><div class="', zcls, '-right"><div id="', uuid, '-ry" class="', zcls, '-right-icon"></div></div></td></tr>');
	
	switch(view) {
	case "day" :
		out.push('<tr><td colspan="3"><table id="', uuid, '-mid" class="', zcls, '-calday" width="100%" border="0" cellspacing="0" cellpadding="0">',
				'<tr class="', zcls, '-caldow">');
			var sun = (7 - zk.DOW_1ST) % 7, sat = (6 + sun) % 7;
			for (var j = 0 ; j < 7; ++j) {
				out.push('<td');
				if (j == sun || j == sat) out.push(' class="z-weekend"');
				else out.push(' class="z-weekday"');
				out.push( '>' + zk.S2DOW[j] + '</td>');
			}
			out.push('</tr>');
			for (var j = 0; j < 6; ++j) { 
				out.push('<tr class="', zcls, '-caldayrow" id="', uuid, '-w', j, '" >');
				for (var k = 0; k < 7; ++k)
					out.push ('<td class="', (k == sun || k == sat) ? zcls + '-wkend ' : zcls + '-wkday ', '"></td>');
				out.push('</tr>');
			}
		break;
	case "month" :
		out.push('<tr><td colspan="3" ><table id="', uuid, '-mid" class="', zcls, '-calmon" width="100%" border="0" cellspacing="0" cellpadding="0">');
		for (var j = 0 ; j < 12; ++j) {
			if (!(j % 4)) out.push('<tr>');
			out.push('<td id="', uuid, '-m', j, '"_dt="', j ,'">', zk.SMON[j] + '</td>');
			if (!((j + 1) % 4)) out.push('</tr>');
		}
		break;
	case "year" :
		out.push('<tr><td colspan="3" ><table id="', uuid, '-mid" class="', zcls, '-calyear" width="100%" border="0" cellspacing="0" cellpadding="0">');

		for (var j = 0 ; j < 12; ++j) {
			if (!(j % 4)) out.push('<tr>');
			out.push('<td _dt="', yofs ,'" id="', uuid, '-y', j, '" >', yofs + ydelta, '</td>');
			if (!((j + 1) % 4)) out.push('</tr>');
			yofs++;
		}
		break;
	case "decade" :
		out.push('<tr><td colspan="3" ><table id="', uuid, '-mid" class="', zcls, '-calyear" width="100%" border="0" cellspacing="0" cellpadding="0">');
		var temp = ydec*100 - 10;
		for (var j = 0 ; j < 12; ++j, temp += 10) {
			if (!(j % 4)) out.push('<tr>');
			if (temp < 1900 || temp > 2090) {
				out.push('<td>&nbsp;</td>');
				if (j + 1 == 12)
					out.push('</tr>'); 
				continue;
			}
			
			out.push('<td _dt="', temp ,'" id="', uuid, '-de', j, '" class="', (y >= temp && y <= (temp + 9)) ? zcls + '-seld' : '', '"',
					' >', temp + ydelta, '-<br />', temp + ydelta + 9, '</td>');
			if (!((j + 1) % 4)) out.push('</tr>');
		}
		break;
	}
	out.push('</table><', tags, ' id="', uuid,
			'-a" tabindex="-1" onclick="return false;" href="javascript:;"',
			' class="z-focus-a"></td></tr></table></div>');
}
;zkmld(zk._p.p.Calendar,zk._m);

(function () {
	function _initPopup () {
		this._pop = new zul.db.CalendarPop();
		this._tm = new zul.db.CalendarTime();
		this.appendChild(this._pop);
		this.appendChild(this._tm);
	}
	function _reposition(db, silent) {
		if (!db.$n()) return;
		var pp = db.$n("pp"),
			inp = db.getInputNode();

		if(pp) {
			zk(pp).position(inp, "after_start");
			db._pop.syncShadow();
			if (!silent)
				zk(inp).focus();
		}
	}
	function _blurInplace(db) {
		var n;
		if (db._inplace && db._inplaceout && (n = db.$n())
		&& !jq(n).hasClass(db.getInplaceCSS())) {
			jq(n).addClass(db.getInplaceCSS());
			db.onSize();
			n.style.width = db.getWidth() || '';
		}
	}
	function _equalDate(d1, d2) {
		return (d1 == d2) || (d1 && d2 && d1.getTime() == d2.getTime());
	}
	function _prepareTimeFormat(h, m, s) {
		var o =[];
		if (h) o.push(h);
		if (m) o.push(m);
		if (s) o.push(s);
		return o.join(":");
	}
	
var Datebox =

zul.db.Datebox = zk.$extends(zul.inp.FormatWidget, {
	_buttonVisible: true,
	_lenient: true,
	$init: function() {
		this.$supers('$init', arguments);
		this.afterInit(_initPopup);
		this.listen({onChange: this}, -1000);
	},

	$define: {
		
		
		buttonVisible: function (v) {
			var n = this.$n('btn'),
				zcls = this.getZclass();
			if (n) {
				if (!this.inRoundedMold()) {
					jq(n)[v ? 'show': 'hide']();
					jq(this.getInputNode())[v ? 'removeClass': 'addClass'](zcls + '-right-edge');
				} else {
					var fnm = v ? 'removeClass': 'addClass';
					jq(n)[fnm](zcls + '-btn-right-edge');

					if (zk.ie6_) {
						jq(n)[fnm](zcls +
							(this._readonly ? '-btn-right-edge-readonly':'-btn-right-edge'));

						if (jq(this.getInputNode()).hasClass(zcls + "-text-invalid"))
							jq(n)[fnm](zcls + "-btn-right-edge-invalid");
					}
				}
				this.onSize();
			}
		},
		
		
		format: function () {
			if (this._pop) {
				this._pop.setFormat(this._format);
				if (this._value)
					this._value = this._pop.getTime();
			}
			var inp = this.getInputNode();
			if (inp)
				inp.value = this.getText();
		},
		
		
		constraint: function (cst) {
			if (typeof cst == 'string' && cst.charAt(0) != '[')
				this._cst = new zul.inp.SimpleDateConstraint(cst);
			else
				this._cst = cst;
			if (this._cst) delete this._lastRawValVld; 
			if (this._pop) {
				this._pop.setConstraint(this._constraint);
				this._pop.rerender();
			}
		},
		
		
		timeZone: function (timezone) {
			this._timezone = timezone;
			this._setTimeZonesIndex();
		},
		
		
		timeZonesReadonly: function (readonly) {
			var select = this.$n('dtzones');
			if (select) select.disabled = readonly ? "disabled" : "";
		},
		
		
		displayedTimeZones: function (dtzones) {
			this._dtzones = dtzones.split(",");
		},
		
		
		lenient: null
	},
	_setTimeZonesIndex: function () {
		var select = this.$n('dtzones');
		if (select && this._timezone) {
			var opts = jq(select).children('option');
			for (var i = opts.length; i--;) {
				if (opts[i].text == this._timezone) select.selectedIndex = i;
			}
		}
	},
	onSize: _zkf = function () {
		var width = this.getWidth();
		if (!width || width.indexOf('%') != -1)
			this.getInputNode().style.width = '';
		this.syncWidth();
	},
	onShow: _zkf,
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-datebox" + (this.inRoundedMold() ? "-rounded": "");
	},
	
	getTimeFormat: function () {
	
		var fmt = this._format,
			aa = fmt.indexOf('a'),
			hh = fmt.indexOf('h'),
			KK = fmt.indexOf('K'),
			HH= fmt.indexOf('HH'),
			kk = fmt.indexOf('k'),
			mm = fmt.indexOf('m'),
			ss = fmt.indexOf('s'),
			hasAM = aa > -1,
			
			hasHour1 = (hasAM || hh) ? hh > -1 || KK > -1 : false,
			hv,
			mv = mm > -1 ? 'mm' : '',
			sv = ss > -1 ? 'ss' : '';
		
		if (hasHour1) {
			var time = _prepareTimeFormat(hh < KK ? "KK" : "hh", mv, sv);
			if (aa == -1) 
				return time;
			else if ((hh != -1 && aa < hh) || (KK != -1 && aa < KK)) 
				return 'a ' + time;
			else
				return time + ' a';
		} else
			return _prepareTimeFormat(HH < kk ? 'kk' : HH > -1 ? 'HH' : '', mv, sv);
		
	},
	
	getDateFormat: function () {
		return this._format.replace(/[ahKHksm]/g, '');
	},
	
	setOpen: function(open, _focus_) {
		var pop;
		if (pop = this._pop)
			if (open) pop.open(!_focus_);
			else pop.close(!_focus_);
	},
	isOpen: function () {
		return this._pop && this._pop.isOpen();
	},
	coerceFromString_: function (val) {
		if (val) {
			var d = new zk.fmt.Calendar().parseDate(val, this.getFormat(), !this._lenient, this._value);
			if (!d) return {error: zk.fmt.Text.format(msgzul.DATE_REQUIRED + this.localizedFormat)};
			return d;
		}
		return null;
	},
	coerceToString_: function (val) {
		return val ? new zk.fmt.Calendar().formatDate(val, this.getFormat()) : '';
	},
	
	syncWidth: function () {
		zul.inp.RoundUtl.syncWidth(this, this.$n('btn'));
	},
	doFocus_: function (evt) {
		var n = this.$n();
		if (this._inplace)
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));

		this.$supers('doFocus_', arguments);

		if (this._inplace) {
			if (jq(n).hasClass(this.getInplaceCSS())) {
				jq(n).removeClass(this.getInplaceCSS());
				this.onSize();
			}
		}
	},
	doClick_: function (evt) {
		if (this._disabled) return;
		if (this._readonly && this._buttonVisible && this._pop && !this._pop.isOpen())
			this._pop.open();
		this.$supers('doClick_', arguments);
	},
	doBlur_: function (evt) {
		var n = this.$n();
		if (this._inplace && this._inplaceout)
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));

		this.$supers('doBlur_', arguments);

		_blurInplace(this);
	},
	doKeyDown_: function (evt) {
		this._doKeyDown(evt);
		if (!evt.stopped)
			this.$supers('doKeyDown_', arguments);
	},
	_doKeyDown: function (evt) {
		if (jq.nodeName(evt.domTarget, 'option', 'select'))
			return;
			
		var keyCode = evt.keyCode,
			bOpen = this._pop.isOpen();
		if (keyCode == 9 || (zk.safari && keyCode == 0)) { 
			if (bOpen) this._pop.close();
			return;
		}

		if (evt.altKey && (keyCode == 38 || keyCode == 40)) {
			if (bOpen) this._pop.close();
			else this._pop.open();

			
			var opts = {propagation:true};
			if (zk.ie) opts.dom = true;
			evt.stop(opts);
			return;
		}

		
		if (bOpen && (keyCode == 13 || keyCode == 27)) { 
			if (keyCode == 13) this.enterPressed_(evt);
			else this.escPressed_(evt);
			return;
		}

		if (keyCode == 18 || keyCode == 27 || keyCode == 13
		|| (keyCode >= 112 && keyCode <= 123)) 
			return; 

		if (this._pop.isOpen()) {
			var ofs = keyCode == 37 ? -1 : keyCode == 39 ? 1 : keyCode == 38 ? -7 : keyCode == 40 ? 7 : 0;
			if (ofs)
				this._pop._shift(ofs, {silent: true});
		}
	},
	
	enterPressed_: function (evt) {
		this._pop.close();
		this.updateChange_();
		evt.stop();
	},
	
	escPressed_: function (evt) {
		this._pop.close();
		evt.stop();
	},
	afterKeyDown_: function (evt) {
		if (this._inplace)
			jq(this.$n()).toggleClass(this.getInplaceCSS(),  evt.keyCode == 13 ? null : false);

		this.$supers('afterKeyDown_', arguments);
	},
	bind_: function (){
		this.$supers(Datebox, 'bind_', arguments);
		var btn, inp = this.getInputNode();

		if (this._inplace)
			jq(inp).addClass(this.getInplaceCSS());

		if (btn = this.$n('btn')) {
			this._auxb = new zul.Auxbutton(this, btn, inp);
			this.domListen_(btn, 'onClick', '_doBtnClick');
		}

		zWatch.listen({onSize: this, onShow: this});
		this._pop.setFormat(this._format);
	},
	unbind_: function () {
		var btn;
		if (btn = this._pop)
			btn.close(true);

		if (btn = this.$n('btn')) {
			this._auxb.cleanup();
			this._auxb = null;
			this.domUnlisten_(btn, 'onClick', '_doBtnClick');
		}

		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(Datebox, 'unbind_', arguments);
	},
	_doBtnClick: function (evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (!this._disabled)
			this.setOpen(!jq(this.$n("pp")).zk.isVisible(), true);
		evt.stop();
	},
	_doTimeZoneChange: function (evt) {
		var select = this.$n('dtzones'),
			timezone = select.value;
		this.updateChange_();
		this.fire("onTimeZoneChange", {timezone: timezone}, {toServer:true}, 150);
		if (this._pop) this._pop.close();
	},
	onChange: function (evt) {
		if (this._pop)
			this._pop.setValue(evt.data.value);
	},
	
	getTimeZoneLabel: function () {
		return "";
	},

	redrawpp_: function (out) {
		out.push('<div id="', this.uuid, '-pp" class="', this.getZclass(),
			'-pp" style="display:none" tabindex="-1">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);

		this._redrawTimezone(out);
		out.push('</div>');
	},
	_redrawTimezone: function (out) {
		var timezones = this._dtzones;
		if (timezones) {
			var cls = this.getZclass();
			out.push('<div class="', cls, '-timezone">');
			out.push(this.getTimeZoneLabel());
			out.push('<select id="', this.uuid, '-dtzones" class="', cls, '-timezone-body">');
			for (var i = 0, len = timezones.length; i < len; i++)
				out.push('<option value="', timezones[i], '" class="', cls, '-timezone-item">', timezones[i], '</option>');
			out.push('</select><div>');
		}
	}
});

var CalendarPop =
zul.db.CalendarPop = zk.$extends(zul.db.Calendar, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onChange: this}, -1000);
	},
	setFormat: function (fmt) {
		this._fmt = fmt;
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		if (this.desktop) this.syncShadow();
	},
	close: function (silent) {
		var db = this.parent,
			pp = db.$n("pp");

		if (!pp || !zk(pp).isVisible()) return;
		if (this._shadow) this._shadow.hide();

		var zcls = db.getZclass();
		pp.style.display = "none";
		pp.className = zcls + "-pp";

		jq(pp).zk.undoVParent();
		db.setFloating_(false);

		var btn = this.$n("btn");
		if (btn)
			jq(btn).removeClass(zcls + "-btn-over");

		if (silent)
			db.updateChange_();
		else
			zk(db.getInputNode()).focus();
	},
	isOpen: function () {
		return zk(this.parent.$n("pp")).isVisible();
	},
	open: function(silent) {
		var db = this.parent,
			dbn = db.$n(), pp = db.$n("pp");
		if (!dbn || !pp)
			return;

		db.setFloating_(true, {node:pp});
		zWatch.fire('onFloatUp', db); 
		var topZIndex = this.setTopmost();
		this._setView("day");
		var zcls = db.getZclass();

		pp.className = dbn.className + " " + pp.className;
		jq(pp).removeClass(zcls);

		pp.style.width = pp.style.height = "auto";
		pp.style.position = "absolute"; 
		
		pp.style.display = "block";
		pp.style.zIndex = topZIndex > 0 ? topZIndex : 1;

		
		
		jq(pp).zk.makeVParent();

		if (pp.offsetHeight > 200) {
			
			pp.style.width = "auto"; 
		} else if (pp.offsetHeight < 10) {
			pp.style.height = "10px"; 
		}
		if (pp.offsetWidth < dbn.offsetWidth) {
			pp.style.width = dbn.offsetWidth + "px";
		} else {
			var wd = jq.innerWidth() - 20;
			if (wd < dbn.offsetWidth)
				wd = dbn.offsetWidth;
			if (pp.offsetWidth > wd)
				pp.style.width = wd;
		}
		var inp = db.getInputNode();
		zk(pp).position(inp, "after_start");

		setTimeout(function() {
			_reposition(db, silent);
		}, 150);
		
		
		var fmt = db.getTimeFormat(),
			
			value = new zk.fmt.Calendar(zk.fmt.Date.parseDate(inp.value, db._format, false, db._value)).toUTCDate()
				|| (inp.value ? db._value: zUtl.today(fmt));
		
		if (value)
			this.setValue(value);
		if (fmt) {
			var tm = db._tm;
			tm.setVisible(true);
			tm.setFormat(fmt);
			tm.setValue(value || new Date());
			tm.onShow();
		} else {
			db._tm.setVisible(false);
		}
	},
	syncShadow: function () {
		if (!this._shadow)
			this._shadow = new zk.eff.Shadow(this.parent.$n('pp'), {
				left: -4, right: 4, top: 2, bottom: 3});
		this._shadow.sync();
	},
	onChange: function (evt) {
		var date = this.getTime(),
			db = this.parent,
			fmt = db.getTimeFormat(),
			oldDate = db.getValue(),
			readonly = db.isReadonly();

		if (oldDate)
			date = new Date(date.getFullYear(), date.getMonth(),
				date.getDate(), oldDate.getHours(),
				oldDate.getMinutes(), oldDate.getSeconds(), oldDate.getMilliseconds());
			
			

		if (fmt) {
			var tm = db._tm,
				time = tm.getValue();
			date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
		}
		
		db.getInputNode().value = db.coerceToString_(date);

		if (this._view == 'day' && evt.data.shallClose !== false) {
			this.close();
			db._inplaceout = true;
			
			
			evt.data.value = date;
			if(!_equalDate(date, oldDate))
				db.updateChange_();
		}
		evt.stop();
	},
	onFloatUp: function (ctl) {
		var db = this.parent;
		if (!zUtl.isAncestor(db, ctl.origin)) {
			this.close(true);
			db._inplaceout = true;
			_blurInplace(db);
		}
	},
	bind_: function () {
		this.$supers(CalendarPop, 'bind_', arguments);
		this._bindTimezoneEvt();

		zWatch.listen({onFloatUp: this});
	},
	unbind_: function () {
		zWatch.unlisten({onFloatUp: this});
		this._unbindfTimezoneEvt();
		if (this._shadow) {
			this._shadow.destroy();
			this._shadow = null;
		}
		this.$supers(CalendarPop, 'unbind_', arguments);
	},
	_bindTimezoneEvt: function () {
		var db = this.parent;
		var select = db.$n('dtzones');
		if (select) {
			select.disabled = db.isTimeZonesReadonly() ? "disable" : "";
			db.domListen_(select, 'onChange', '_doTimeZoneChange');
			db._setTimeZonesIndex();
		}
	},
	_unbindfTimezoneEvt: function () {
		var db = this.parent,
			select = db.$n('dtzones');
		if (select)
			db.domUnlisten_(select, 'onChange', '_doTimeZoneChange');
	},
	_setView: function (val) {
		if (this.parent.getTimeFormat())
			this.parent._tm.setVisible(val == 'day');
		this.$supers('_setView', arguments);
	}
});
zul.db.CalendarTime = zk.$extends(zul.db.Timebox, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onChanging: this}, -1000);
	},
	onChanging: function (evt) {
		var db = this.parent,
			date = this.coerceFromString_(evt.data.value), 
			oldDate = db.getValue();
		if (oldDate) {
			oldDate = new Date(oldDate); 
			oldDate.setHours(date.getHours());
			oldDate.setMinutes(date.getMinutes());
			oldDate.setSeconds(date.getSeconds());
			oldDate.setMilliseconds(date.getMilliseconds());
			date = oldDate;
		}
		db.getInputNode().value = evt.data.value
			= db.coerceToString_(date);

		db.fire(evt.name, evt.data); 
		if (this._view == 'day' && evt.data.shallClose !== false) {
			this.close();
			db._inplaceout = true;
		}
		evt.stop();
	}
});
})();

zkreg('zul.db.Datebox');zk._m={};
zk._m['rounded']=

zul.inp.ComboWidget.prototype.redraw_

;zk._m['default']=

zul.inp.ComboWidget.prototype.redraw_

;zkmld(zk._p.p.Datebox,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.db',1);