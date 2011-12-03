zk.load('zul.mesh',function(){zk._p=zkpi('zul.sel',true);try{



(function() {
	function _beforeChildKey(wgt, evt) {
		return zAu.processing() || wgt._shallIgnore(evt)
			|| (!wgt._focusItem && !wgt.getSelectedItem());
	}
	function _afterChildKey(evt) {
		switch (evt.data.keyCode) {
		case 33: 
		case 34: 
		case 38: 
		case 40: 
		case 37: 
		case 39: 
		case 32: 
		case 36: 
		case 35: 
			evt.stop();
			return false;
		}
		return true;
	}

	function _updHeaderCM(box) { 
		if (--box._nUpdHeaderCM <= 0 && box.desktop && box._headercm && box._multiple) {
			var zcls = zk.Widget.$(box._headercm).getZclass() + '-img-seld',
				$headercm = jq(box._headercm);
			var checked;
			for (var it = box.getBodyWidgetIterator(), w; (w = it.next());)
				if (w.isVisible() && !w.isDisabled() && !w.isSelected()) {
					checked = false;
					break;
				} else
					checked = true;

			$headercm[checked ? "addClass": "removeClass"](zcls);
		}
	}
	function _isButton(evt) {
		return evt.target.$button 
			|| (zk.isLoaded('zul.wgt')
			&& evt.target.$instanceof(zul.wgt.Button, zul.wgt.Toolbarbutton));
	}
	function _focusable(evt) {
		return (jq.nodeName(evt.domTarget, "input", "textarea", "button", "select", "option", "a")
				&& !evt.target.$instanceof(zul.sel.SelectWidget))
			|| _isButton(evt);
	}

var SelectWidget =

zul.sel.SelectWidget = zk.$extends(zul.mesh.MeshWidget, {
	_rows: 0,
	
	rightSelect: true,
	$init: function () {
		this.$supers('$init', arguments);
		this._selItems = [];
	},
	$define: {
		
		
		rows: function (rows) {
			var n = this.$n();
			if (n) {
				n._lastsz = null;
				this.onSize();
			}
		},
		
		
		checkmark: function (checkmark) {
			if (this.desktop)
				this.rerender();
		},
		
		
		multiple: function (multiple) {
			if (!this._multiple && this._selItems.length) {
				var item = this.getSelectedItem();
				for (var it; (it = this._selItems.pop());)
					if (it != item) {
						if (!this._checkmark)
							it._setSelectedDirectly(false);
						else it._selected = false;
					}

				this._selItems.push(item);
			}
			if (this._checkmark && this.desktop)
				this.rerender();
		},
		
		
		selectedIndex: [
			function (v) {
				return v < -1 || (!v && v !== 0) ? -1 : v;
			},
			function() {
				var selected = this._selectedIndex;
				this.clearSelection();
				this._selectedIndex = selected;
				if (selected > -1) {
					var w;
					for (var it = this.getBodyWidgetIterator(); selected-- >=0;)
						w = it.next();
					if (w) {
						this._selectOne(w, true);
						zk(w).scrollIntoView(this.ebody);
					}
				}
			}
		],
		
		
		name: function () {
			if (this.destkop) this.updateFormData();
		}
	},
	setChgSel: function (val) { 
		var sels = {};
		for (var j = 0;;) {
			var k = val.indexOf(',', j),
				s = (k >= 0 ? val.substring(j, k): val.substring(j)).trim();
			if (s) sels[s] = true;
			if (k < 0) break;
			j = k + 1;
		}
		for (var it = this.getBodyWidgetIterator(), w; (w = it.next());)
			this._changeSelect(w, sels[w.uuid] == true);
	},
	updateFormData: function () {
		if (this._name) {
			if (!this.efield)
				this.efield = jq(this.$n()).append('<div style="display:none;"></div>').find('> div:last-child')[0];

			jq(this.efield).children().remove();

			
			var data = [],
				tmp = '<input type="hidden" name="' + this._name + '" value="';
			for (var i = 0, j = this._selItems.length; i < j; i++)
				data.push(tmp, this._selItems[i].getValue(), '"/>');

			jq(this.efield).append(data.join(''));
		} else if (this.efield) {
			jq(this.efield).remove();
			this.efield = null;
		}
	},
	
	setSelectedItem: function (item) {
		if (!item)
			this.clearSelection();
		else if (item = zk.Widget.$(item)) {
			this._selectOne(item, true);
			zk(item).scrollIntoView(this.ebody);
		}
	},
	
	getSelectedItem: function () {
		return this._selItems[0];
	},
	
	getSelectedItems: function () {
		
		return this._selItems.$clone();
	},
	setHeight: function (height) {
		if (!this._nvflex && this._height != height) {
			this._height = height;
			var n = this.$n();
			if (n) {
				n.style.height = height || '';
				this.onSize();
			}
		}
	},
	setVflex: function(v) {
		this.$supers('setVflex', arguments);
		if (this.desktop) this.onSize();
	},
	setHflex: function(v) {
		this.$supers('setHflex', arguments);
		if (this.desktop) this.onSize();
	},
	_getEbodyWd: function () {
		var anchor = this.$n('a');
		
		if (zk.safari)
			anchor.style.display = 'none';

		
		var tblwd = this.ebody.clientWidth;

		if (zk.safari)
			anchor.style.display = '';
		return tblwd;
	},
	_beforeCalcSize: function () {
		
		if (zk.ie8) {
			var anchor = this.$n('a');
			this._oldCSS = anchor.style.display;
			anchor.style.display = "none";
		}

		
		if (zk.ie)
			this._syncFocus(this._focusItem);

		this._calcHgh();
	},
	_afterCalcSize: function () {
		
		if (zk.ie8) {
			this.$n('a').style.display = this._oldCSS;
			delete this._oldCSS;
		}
		this.$supers('_afterCalcSize', arguments);
	},
	_calcHgh: function () {
		var rows = this.ebodyrows,
			n = this.$n(),
			hgh = n.style.height,
			isHgh = hgh && hgh != "auto" && hgh.indexOf('%') < 0;
		if (isHgh) {
			hgh = zk.parseInt(hgh);
			if (hgh) {
				hgh -= this._headHgh(0);
				if (hgh < 20) hgh = 20;
				var sz = 0;
				l_out:
				for (var h, j = 0, rl = rows.length; j < rl; ++sz, ++j) {
					
					var r;
					for (;; ++j) {
						if (j >= rl) break l_out;
						r = rows[j];
						if (zk(r).isVisible()) break;
					}

					var $r = zk(r);
					h = $r.offsetTop() + $r.offsetHeight();
					if (h >= hgh) {
						if (h > hgh + 2) ++sz; 
						break;
					}
				}
				sz = Math.ceil(sz && h ? (hgh * sz)/h: hgh/this._headHgh(20));

				this._visibleRows(sz);

                hgh -= (this.efoot ? this.efoot.offsetHeight : 0);
                
                hgh -= (this.efrozen ? this.efrozen.offsetHeight : 0);
                this.ebody.style.height = (hgh < 0 ? 0 : hgh) + "px";

				
				if (zk.ie && this.ebody.offsetHeight) {} 
				
				
				return; 
			}
		}

		var nVisiRows = 0, nRows = this.getRows(), lastVisiRow, firstVisiRow, midVisiRow;
		for (var j = 0, rl = rows.length; j < rl; ++j) { 
			var r = rows[j];
			if (zk(r).isVisible()) {
				++nVisiRows;
				if (!firstVisiRow) firstVisiRow = r;

				if (nRows === nVisiRows) {
					midVisiRow = r;
					break;
					
					
				}
				lastVisiRow = r;
			}
		}

		hgh = 0;
		var diff = 2;
		if (!nRows) {
			if (this.isVflex()) {
				hgh = this._vflexSize(n.style.height);

				if (zk.ie && this._cachehgh != hgh) {
					hgh -= 1; 
					this._cachehgh = hgh;
				}
				if (hgh < 25) hgh = 25;

				var rowhgh = firstVisiRow ? zk(firstVisiRow).offsetHeight(): null;
				if (!rowhgh) rowhgh = this._headHgh(20);

				nRows = Math.round((hgh - diff)/ rowhgh);
			}
			this._visibleRows(nRows);
		}

		if (nRows) {
			if (!hgh) {
				if (!nVisiRows) hgh = this._headHgh(20) * nRows;
				else {
					
					
					var tpad = this.$n('tpad'),
						tpadoffsethgh = (tpad ? tpad.offsetHeight : 0),
						tpadhgh = tpadoffsethgh > 0 && this._padsz && this._padsz['tpad'] ? this._padsz['tpad'] : tpadoffsethgh < 0 ? 0 : tpadoffsethgh;
					if (nRows <= nVisiRows) {
						var $midVisiRow = zk(midVisiRow);
						hgh = $midVisiRow.offsetTop() + $midVisiRow.offsetHeight() - tpadhgh;
					} else {
						var $lastVisiRow = zk(lastVisiRow);
						hgh = $lastVisiRow.offsetTop() + $lastVisiRow.offsetHeight() - tpadhgh;
						hgh = Math.ceil((nRows * hgh) / nVisiRows);
					}
				}
				if (zk.ie) hgh += diff; 
			}

			this.ebody.style.height = hgh + "px";

			
			if (zk.ie && this.ebody.offsetHeight) {} 
			
			
			

			
			var h = n.style.height;
			if (!h || h == "auto") {

				
				
				if (zk.ie && !zk.ie8 && this.ebodytbl) {
					var ow = this.ebody.offsetWidth,
						cw = this.ebody.clientWidth,
						w = ow - cw;
					if (cw && w > 11) {
						if (ow == this.ebodytbl.offsetWidth)
							this.ebodytbl.style.width = jq.px0(zk(this.ebodytbl).revisedWidth(this.ebodytbl.offsetWidth - w));
					}
				}


			}
		} else {
			
			
			hgh = n.style.height;
			if (zk.ie && (!hgh || hgh == "auto")
			&& this.ebody.offsetWidth - this.ebody.clientWidth > 11) {
				if (!nVisiRows) this.ebody.style.height = ""; 
				else this.ebody.style.height =
						(this.ebody.offsetHeight * 2 - this.ebody.clientHeight) + "px";
			} else {
				this.ebody.style.height = "";
			}

			
			
		}
	},
	
	_visibleRows: function (v) {
		if ("number" == typeof v) {
			this._visiRows = v;
		} else
			return this.getRows() || this._visiRows || 0;
	},
	
	_headHgh: function (defVal) {
		var hgh = this.ehead ? this.ehead.offsetHeight : 0;
		if (this.paging) {
			var pgit = this.$n('pgit'),
				pgib = this.$n('pgib');
			if (pgit) hgh += pgit.offsetHeight;
			if (pgib) hgh += pgib.offsetHeight;
		}
		return hgh ? hgh: defVal;
	},
	
	indexOfItem: function (item) {
		if (item.getMeshWidget() == this) {
			for (var i = 0, it = this.getBodyWidgetIterator(), w; (w = it.next()); i++)
				if (w == item) return i;
		}
		return -1;
	},
	toggleItemSelection: function (item) {
		if (item.isSelected()) this._removeItemFromSelection(item);
		else this._addItemToSelection(item);
		this.updateFormData();
	},
	
	selectItem: function (item) {
		if (!item)
			this.setSelectedIndex(-1);
		else if (this._multiple || !item.isSelected())
			this.setSelectedIndex(this.indexOfItem(item));
	},
	_addItemToSelection: function (item) {
		if (!item.isSelected()) {
			if (!this._multiple) {
				this._selectedIndex = this.indexOfItem(item);
			} else {
				var index = this.indexOfItem(item);
				if (index < this._selectedIndex || this._selectedIndex < 0) {
					this._selectedIndex = index;
				}
				item._setSelectedDirectly(true);
			}
			this._selItems.push(item);
		}
	},
	_removeItemFromSelection: function (item) {
		if (item.isSelected()) {
			if (!this._multiple) {
				this.clearSelection();
			} else {
				item._setSelectedDirectly(false);
				this._selItems.$remove(item);
			}
		}
	},
	
	clearSelection: function () {
		if (this._selItems.length) {
			for(var item;(item = this._selItems.pop());)
				item._setSelectedDirectly(false);
			this._selectedIndex = -1;
			this._updHeaderCM();
		}
	},
	
	focus_: function (timeout) {
		var btn;
		if (btn = this.$n('a')) {
			if (this._focusItem)
				for (var it = this.getBodyWidgetIterator(), w; (w = it.next());)
					if (this._isFocus(w)) {
						w.focus_(timeout);
						break;
					}

			this.focusA_(btn, timeout);
			return true;
		}
		return false;
	},
	focusA_: function(btn, timeout) { 
		zk(btn).focus(timeout);
	},
	bind_: function () {
		this.$supers(SelectWidget, 'bind_', arguments);
		var btn = this.$n('a');
		if (btn)
			this.domListen_(btn, 'onFocus', 'doFocus_')
				.domListen_(btn, 'onKeyDown')
				.domListen_(btn, 'onBlur', 'doBlur_');
		this.updateFormData();
		this._updHeaderCM();
	},
	unbind_: function () {
		var btn = this.$n('a');
		if (btn)
			this.domUnlisten_(btn, 'onFocus', 'doFocus_')
				.domUnlisten_(btn, 'onKeyDown')
				.domUnlisten_(btn, 'onBlur', 'doBlur_');
		this.$supers(SelectWidget, 'unbind_', arguments);
	},
	clearCache: function () {
		this.$supers('clearCache', arguments);
		this.efield = null;
	},
	doFocus_: function (evt) {
		var row	= this._focusItem || this._lastSelectedItem;
		if (row) row._doFocusIn();
		this.$supers('doFocus_', arguments);
	},
	doBlur_: function (evt) {
		if (this._focusItem) {
			this._lastSelectedItem = this._focusItem;
			this._focusItem._doFocusOut();
		}
		this._focusItem = null;
		this.$supers('doBlur_', arguments);
	},
	
	shallIgnoreSelect_: function (evt) { 
		
		return evt.name == 'onRightClick' ? this.rightSelect ? -1: true: false;
	},
	
	_shallIgnore: function(evt, bSel) { 
		if (!evt.domTarget || !evt.target.canActivate())
			return true;

		if (bSel) {
			try {
				var el = evt.domTarget;
				if (el) 
					for (;;) {
						if (el.id == this.uuid) 
							break;
						if (!(el = el.parentNode))
							return true; 
					}
			} catch (e) {
			}

			if (typeof (bSel = this.nonselectableTags) == "string") {
				if (!bSel)
					return; 
				if (bSel == "*")
					return true;

				var tn = jq.nodeName(evt.domTarget),
					bInpBtn = tn == "input" && evt.domTarget.type.toLowerCase() == "button";
				if (bSel.indexOf(tn) < 0) {
					return bSel.indexOf("button") >= 0
						&& (_isButton(evt) || bInpBtn);
				}
				return !bInpBtn || bSel.indexOf("button") >= 0;
			}
		}

		return _focusable(evt);
	},
	_doItemSelect: function (row, evt) { 
		
		
		
		
		var alwaysSelect,
			cmClicked = this._checkmark && evt.domTarget == row.$n('cm');
		if (zk.dragging || (!cmClicked && (this._shallIgnore(evt, true)
		|| ((alwaysSelect = this.shallIgnoreSelect_(evt, row))
			&& !(alwaysSelect = alwaysSelect < 0)))))
			return;

		var skipFocus = _focusable(evt); 
		if (this._checkmark
		&& !evt.data.shiftKey && !(evt.data.ctrlKey || evt.data.metaKey) 
		&& (!this._cdo || cmClicked)) {
			
			this._syncFocus(row);

			if (this._multiple) {
				var seled = row.isSelected();
				if (!seled || !alwaysSelect)
					this._toggleSelect(row, !seled, evt, skipFocus);
			} else
				this._select(row, evt, skipFocus);
		} else {
		
		
		
			if ((zk.gecko || zk.safari) && row.isListen('onDoubleClick')) {
				var now = jq.now(), last = row._last;
				row._last = now;
				if (last && now - last < 900)
					return; 
			}
			this._syncFocus(row);
			if (this._multiple) {
				if (evt.data.shiftKey)
					this._selectUpto(row, evt, skipFocus);
				else if (evt.data.ctrlKey || evt.data.metaKey)
					this._toggleSelect(row, !row.isSelected(), evt, skipFocus);
				else 
					this._select(row, evt, skipFocus);
			} else
				this._select(row, evt, skipFocus);

			
			if (!skipFocus)
				row.focus();
			
			
			
		}
	},
	
	doKeyDown_: function (evt) {
		if (!this._shallIgnore(evt)) {

		
		
		
		
			switch (evt.data.keyCode) {
			case 33: 
			case 34: 
			case 38: 
			case 40: 
			case 37: 
			case 39: 
			case 32: 
			case 36: 
			case 35: 
				if (!jq.nodeName(evt.domTarget, "a"))
					this.focus();
				if (evt.domTarget == this.$n('a')) {
					if (evt.target == this) 
						evt.target = this._focusItem || this.getSelectedItem() || this;
					this._doKeyDown(evt);
				}
				evt.stop();
				return false;
			}
		}

		if (!zk.gecko3 || !jq.nodeName(evt.domTarget, "input", "textarea"))
			zk(this.$n()).disableSelection();

		
		if (evt.target == this) 
			evt.target = this._focusItem || this.getSelectedItem() || this;
		this.$supers('doKeyDown_', arguments);
	},
	doKeyUp_: function (evt) {
		zk(this.$n()).enableSelection();
		evt.stop({propagation: true});
		this.$supers('doKeyUp_', arguments);
	},
	_doKeyDown: function (evt) { 
		if (_beforeChildKey(this, evt))
			return true;

		var row = this._focusItem || this.getSelectedItem(),
			data = evt.data,
			shift = data.shiftKey, ctrl = (data.ctrlKey || data.metaKey);
		if (shift && !this._multiple)
			shift = false; 

		var endless = false, step, lastrow;

		
		if (zk.safari && typeof data.keyCode == "string")
			data.keyCode = zk.parseInt(data.keyCode);
		switch (data.keyCode) {
		case 33: 
		case 34: 
			step = this._visibleRows();
			if (step == 0) step = 20;
			if (data.keyCode == 33)
				step = -step;
			break;
		case 38: 
		case 40: 
			step = data.keyCode == 40 ? 1: -1;
			break;
		case 32: 
			if (this._multiple) this._toggleSelect(row, !row.isSelected(), evt);
			else this._select(row, evt);
			break;
		case 36: 
		case 35: 
			step = data.keyCode == 35 ? 1: -1;
			endless = true;
			break;
		case 37: 
			this._doLeft(row);
			break;
		case 39: 
			this._doRight(row);
			break;
		}

		if (step) {
			if (shift) this._toggleSelect(row, true, evt);
			var nrow = row.$n();
			for (;nrow && (nrow = step > 0 ? nrow.nextSibling: nrow.previousSibling);) {
				var r = zk.Widget.$(nrow);
				if (r.$instanceof(zul.sel.Treerow))
					r = r.parent;
				if (!r.isDisabled()) {
					if (shift) this._toggleSelect(r, true, evt);

					if (zk(nrow).isVisible()) {
						if (!shift) lastrow = r;
						if (!endless) {
							if (step > 0) --step;
							else ++step;
							if (step == 0) break;
						}
					}
				}
			}
		}
		if (lastrow) {
			if (ctrl) this._focus(lastrow);
			else this._select(lastrow, evt);
			this._syncFocus(lastrow);
			zk(lastrow).scrollIntoView(this.ebody); 
		}

		return _afterChildKey(evt);
	},
	_doKeyUp: function (evt) { 
		return _beforeChildKey(this, evt) || _afterChildKey(evt);
	},
	_doLeft: zk.$void,
	_doRight: zk.$void,
	
	_syncFocus: function (row) {
		var focusEl = this.$n('a'),
			offs, n;
		if (row && (n = row.$n())) {
			offs = zk(n).revisedOffset();
			offs = this._toStyleOffset(focusEl, offs[0] + this.ebody.scrollLeft, offs[1]);
		} else
			offs = [0, 0];
		focusEl.style.top = offs[1] + "px";
		focusEl.style.left = offs[0] + "px";
	},
	_toStyleOffset: function (el, x, y) {
		var ofs1 = zk(el).revisedOffset(),
			x2 = zk.parseInt(el.style.left), y2 = zk.parseInt(el.style.top);;
		return [x - ofs1[0] + x2, y  - ofs1[1] + y2];
	},
	
	_select: function (row, evt, skipFocus) {
		if (this._selectOne(row, skipFocus)) {
			
			this.fireOnSelect(row, evt);
		}
	},
	
	_selectUpto: function (row, evt, skipFocus) {
		if (row.isSelected()) {
			if (!skipFocus)
				this._focus(row);
			return; 
		}

		var focusfound = false, rowfound = false;
		for (var it = this.getBodyWidgetIterator(), w; (w = it.next());) {
			if (w.isDisabled()) continue; 
			if (focusfound) {
				this._changeSelect(w, true);
				if (w == row)
					break;
			} else if (rowfound) {
				this._changeSelect(w, true);
				if (this._isFocus(w) || w == this._lastSelectedItem)
					break;
			} else {
				rowfound = w == row;
				focusfound = this._isFocus(w) || w == this._lastSelectedItem;
				if (rowfound || focusfound) {
					this._changeSelect(w, true);
					if (rowfound && focusfound)
						break;
				}
			}
		}

		if (!skipFocus)
			this._focus(row);
		this.fireOnSelect(row, evt);
	},
	
	setSelectAll: _zkf = function (notify, evt) {
		for (var it = this.getBodyWidgetIterator(), w; (w = it.next());)
			if (!w.isDisabled())
				this._changeSelect(w, true);
		if (notify && evt !== true)
			this.fireOnSelect(this.getSelectedItem(), evt);
	},
	
	selectAll: _zkf,
	
	_selectOne: function (row, skipFocus) {
		var selItem = this.getSelectedItem();
		if (this._multiple) {
			if (row && !skipFocus) this._unsetFocusExcept(row);
			var changed = this._unsetSelectAllExcept(row);
			if (!changed && row && selItem == row) {
				if (!skipFocus) this._setFocus(row, true);
				return false; 
			}
		} else {
			if (selItem) {
				if (selItem == row) {
					if (!skipFocus) this._setFocus(row, true);
					return false; 
				}
				this._changeSelect(selItem, false);
				if (row)
					if(!skipFocus) this._setFocus(selItem, false);
			}
			if (row && !skipFocus) this._unsetFocusExcept(row);
		}
		
		if (row) {
			this._changeSelect(row, true);
			if (!skipFocus) this._setFocus(row, true);
		}
		return true;
	},
	
	_toggleSelect: function (row, toSel, evt, skipFocus) {
		if (!this._multiple) {
			var old = this.getSelectedItem();
			if (row != old && toSel)
				this._changeSelect(row, false);
		}

		this._changeSelect(row, toSel);
		if (!skipFocus)
			this._focus(row);

		
		this.fireOnSelect(row, evt);
	},
	
	fireOnSelect: function (ref, evt) {
		var data = [];

		for (var it = this.getSelectedItems(), j = it.length; j--;)
			if (it[j].isSelected())
				data.push(it[j]);

		var edata, keep;
		if (evt) {
			edata = evt.data
			if (this._multiple)
				keep = (edata.ctrlKey || edata.metaKey) || edata.shiftKey || (evt.domTarget.id && evt.domTarget.id.endsWith('-cm'));
		}

		this.fire('onSelect', zk.copy({items: data, reference: ref, clearFirst: !keep}, edata));
	},
	
	_focus: function (row) {
		if (this.canActivate({checkOnly:true})) {
			this._unsetFocusExcept(row);
			this._setFocus(row, true);
		}
	},
	
	_changeSelect: function (row, toSel) {
		var changed = row.isSelected() != toSel;
		if (changed) {
			row.setSelected(toSel);
			row._toggleEffect(true);
		}
		return changed;
	},
	_isFocus: function (row) {
		return this._focusItem == row;
	},
	
	_setFocus: function (row, bFocus) {
		var changed = this._isFocus(row) != bFocus;
		if (changed) {
			if (bFocus) {
				if (!row.focus())
					this.focus();

				if (!this.paging && zk.gecko)
					this.fireOnRender(5);
					
			}
		}
		if (!bFocus)
			row._doFocusOut();
		return changed;
	},
	
	_unsetSelectAllExcept: function (row) {
		var changed = false;
		for (var it = this.getSelectedItems(), j = it.length; j--;) {
			if (it[j] != row && this._changeSelect(it[j], false))
				changed = true;
		}
		return changed;
	},
	
	_unsetFocusExcept: function (row) {
		if (this._focusItem && this._focusItem != row)
			this._setFocus(this._focusItem, false)
		else
			this._focusItem = null;
	},
	_updHeaderCM: function () { 
		if (this._headercm && this._multiple) {
			var box = this, v;
			this._nUpdHeaderCM = (v = this._nUpdHeaderCM) > 0 ? v + 1: 1;
			setTimeout(function () {_updHeaderCM(box);}, 100); 
		}
	},
	_ignoreHghExt: function () {
		return this._rows > 0;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (this.desktop && child.$instanceof(zul.sel.ItemWidget) && child.isSelected())
			this._syncFocus(child);
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		var selItems = this._selItems, len;
		if (this.desktop && child.$instanceof(zul.sel.ItemWidget) && (len = selItems.length))
			this._syncFocus(selItems[len - 1]);
	}
});

})();


(function () {
	function _toggleEffect(wgt, undo) {
		var self = wgt;
		setTimeout(function () {
			var $n = jq(self.$n()),
				zcls = self.getZclass();
			if (undo) {
   				$n.removeClass(zcls + "-over-seld").removeClass(zcls + "-over");
   					
   					
			} else if (self._musin) {
				$n.addClass(self.isSelected() ? zcls + "-over-seld" : zcls + "-over");
				
				var musout = self.getMeshWidget()._musout;
				
				if (musout && $n[0] != musout.$n()) {
					jq(musout.$n()).removeClass(zcls + "-over-seld").removeClass(zcls + "-over");
					musout._musin = false;
					self.parent._musout = null;
				}
			}
		});
	}

zul.sel.ItemWidget = zk.$extends(zul.Widget, {
	_checkable: true,
	$define: {
		
		
		checkable: function () {
			if (this.desktop)
				this.rerender();
		},
		
		
		disabled: function () {
			if (this.desktop)
				this.rerender();
		},
		
		
		value: null
	},
	
	setSelected: function (selected) {
		if (this._selected != selected) {
			var box = this.getMeshWidget();
			if (box)
				box.toggleItemSelection(this);
				
			this._setSelectedDirectly(selected);
		}
	},
	_setSelectedDirectly: function (selected) {
		var n = this.$n();
		if (n) {
			jq(n)[selected ? 'addClass' : 'removeClass'](this.getZclass() + '-seld');
			this._updHeaderCM();
		}
		this._selected = selected;
	},
	
	getLabel: function () {
		return this.firstChild ? this.firstChild.getLabel() : null; 
	},
	
	isSelected: function () {
		return this._selected;
	},
	
	isStripeable_: function () {
		return true;
	},
	
	getMeshWidget: function () {
		return this.parent;
	},
	_getVisibleChild: function (row) {
		for (var i = 0, j = row.cells.length; i < j; i++)
			if (zk(row.cells[i]).isVisible()) return row.cells[i];
		return row;
	},
	
	setVisible: function (visible) {
		if (this._visible != visible) { 
			this.$supers('setVisible', arguments);
			if (this.isStripeable_()) {
				var p = this.getMeshWidget();
				if (p) p.stripe();
			}
		}
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass(),
				added = this.isDisabled() ? zcls + '-disd' : this.isSelected() ? zcls + '-seld' : '';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	
	_toggleEffect: function (undo) {
		_toggleEffect(this, undo);
	},
	focus_: function (timeout) {
		var mesh = this.getMeshWidget();
			mesh._focusItem = this;
		this._doFocusIn();
		mesh.focusA_(mesh.$n('a'), timeout);
		return true;
	},
	_doFocusIn: function () {
		var n = this.$n();
		if (n)
			jq(this._getVisibleChild(n)).addClass(this.getZclass() + "-focus");
		
		if (n = this.getMeshWidget())
			n._focusItem = this;			
	},
	_doFocusOut: function () {
		var n = this.$n();
		if (n) {
			var zcls = this.getZclass();
			jq(n).removeClass(zcls + "-focus");
			jq(n.cells).removeClass(zcls + "-focus");
		}
	},
	_updHeaderCM: function (bRemove) { 
		var box = this.getMeshWidget();
		if (box && box._headercm && box._multiple) {
			if (bRemove) {
				box._updHeaderCM();
				return;
			}

			var zcls = zk.Widget.$(box._headercm).getZclass() + '-img-seld',
				$headercm = jq(box._headercm);

			if (!this.isSelected())
				$headercm.removeClass(zcls);
			else if (!$headercm.hasClass(zcls))
				box._updHeaderCM(); 
		}
	},
	
	beforeParentChanged_: function (newp) {
		if (!newp) 
			this._updHeaderCM(true);
		this.$supers("beforeParentChanged_", arguments);
	},
	
	afterParentChanged_: function () {
		if (this.parent) 
			this._updHeaderCM();
		this.$supers("afterParentChanged_", arguments);
	},

	
	doSelect_: function(evt) {
		if (this.isDisabled()) return;
		if (!evt.itemSelected) {
			this.getMeshWidget()._doItemSelect(this, evt);
			evt.itemSelected = true;
		}
		this.$supers('doSelect_', arguments);
	},
	doMouseOver_: function(evt) {
		if (this._musin || this.isDisabled()) return;
		this._musin = true;
		this._toggleEffect();
		evt.stop();
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function(evt) {
		if (this.isDisabled() || (this._musin &&
					jq.isAncestor(this.$n(), evt.domEvent.relatedTarget ||
								evt.domEvent.toElement))) {
			
			this.getMeshWidget()._musout = this;
			return;
		}
		this._musin = false;
		this._toggleEffect(true);
		evt.stop({propagation: true});
		this.$supers('doMouseOut_', arguments);
	},
	doKeyDown_: function (evt) {
		var mate = this.getMeshWidget();
		if (!zk.gecko3 || !jq.nodeName(evt.domTarget, "input", "textarea"))
			zk(mate.$n()).disableSelection();
		mate._doKeyDown(evt);
		this.$supers('doKeyDown_', arguments);
	},
	doKeyUp_: function (evt) {
		var mate = this.getMeshWidget();
		zk(mate.$n()).enableSelection();
		mate._doKeyUp(evt);
		this.$supers('doKeyUp_', arguments);
	},
	deferRedrawHTML_: function (out) {
		out.push('<tr', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tr>');
	}
});
})();

(function () {

	function _isListgroup(wgt) {
		return zk.isLoaded('zkex.sel') && wgt.$instanceof(zkex.sel.Listgroup);
	}
	function _syncFrozen(wgt) {
		if (wgt && (wgt = wgt.frozen))
			wgt._syncFrozen();
	}

var Listbox =

zul.sel.Listbox = zk.$extends(zul.sel.SelectWidget, {
	_nrows: 0,
	
	groupSelect: false,
	$define:{
		emptyMessage:function(msg){
			if(this.desktop) jq("td",this.$n("empty")).html(msg);
		}
	},	
	$init: function () {
		this.$supers('$init', arguments);
		this._groupsInfo = [];
	},
	
	getGroupCount: function () {
		return this._groupsInfo.length;
	},
	
	getGroups: function () {
		return this._groupsInfo.$clone();
	},
	
	hasGroup: function () {
		return this._groupsInfo.length;
	},
	
	nextItem: function (p) {
		if (p)
			while ((p = p.nextSibling)
			&& !p.$instanceof(zul.sel.Listitem))
				;
		return p;
	},
	
	previousItem: function (p) {
		if (p)
			while ((p = p.previousSibling)
			&& !p.$instanceof(zul.sel.Listitem))
				;
		return p;
	},
	
	getOddRowSclass: function () {
		return this._scOddRow == null ? this.getZclass() + "-odd" : this._scOddRow;
	},
	
	setOddRowSclass: function (scls) {
		if (!scls) scls = null;
		if (this._scOddRow != scls) {
			this._scOddRow = scls;
			var n = this.$n();
			if (n && this.rows)
				this.stripe();
		}
		return this;
	},
	
	inSelectMold: function () {
		return "select" == this.getMold();
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(Listbox, 'bind_', arguments); 
		zWatch.listen({onResponse: this});
		this._shallStripe = true;
		var w = this;
		after.push(zk.booted ? function(){setTimeout(function(){w.onResponse();},0)}: this.proxy(this.stripe));
		after.push(function () {
			_syncFrozen(w);
		});
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		this.$supers(Listbox, 'unbind_', arguments);
	},
	onResponse: function () {
		if (this.desktop) {
			if (this._shallStripe) {
				this.stripe();
				if (this._shallSize) this.$supers('onResponse', arguments);
			}
			if (this._shallFixEmpty) 
				this._fixForEmpty();
		}
	},
	_syncStripe: function () {
		this._shallStripe = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	
	stripe: function () {
		var scOdd = this.getOddRowSclass();
		if (!scOdd) return;
		var odd = this._offset & 1;
		for (var j = 0, even = !odd, it = this.getBodyWidgetIterator(), w; (w = it.next()); j++) {
			if (w.isVisible() && w.isStripeable_()) {
				jq(w.$n())[even ? 'removeClass' : 'addClass'](scOdd);
				even = !even;
			}
		}
		this._shallStripe = false;
		return this;
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		this._syncStripe();		
		return this;
	},

	
	getFocusCell: function (el) {
		var tbody = this.getCaveNode();
		if (jq.isAncestor(tbody, el)) {
			var tds = jq(el).parents('td'), td;
			for (var i = 0, j = tds.length; i < j; i++) {
				td = tds[i];
				if (td.parentNode.parentNode == tbody) {
					return td;
				}
			}
		}
	},
	getCaveNode: function () {
		return this.$n('rows') || this.$n('cave');
	},	
	insertChildHTML_: function (child, before, desktop) {
		if (before = before && (!child.$instanceof(zul.sel.Listitem) || before.$instanceof(zul.sel.Listitem)) ? before.getFirstNode_(): null)
			jq(before).before(child.redrawHTML_());
		else
			jq(this.getCaveNode()).append(child.redrawHTML_());
		child.bind(desktop);
	},
	getZclass: function () {
		return this._zclass == null ? "z-listbox" : this._zclass;
	},
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling,
		ignoreDom || (!this.z_rod && !child.$instanceof(zul.sel.Listitem)))) {
			this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child,
		ignoreDom || (!this.z_rod && !child.$instanceof(zul.sel.Listitem)))) {
			if (!this.insertingBefore_) 
				this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom, stripe, ignoreAll) {
		var noRerender;
		if (child.$instanceof(zul.sel.Listitem)) {
			if (_isListgroup(child))
				this._groupsInfo.push(child);
			if (!this.firstItem || !this.previousItem(child))
				this.firstItem = child;
			if (!this.lastItem || !this.nextItem(child))
				this.lastItem = child;
			++this._nrows;
			if (child.isSelected() && !this._selItems.$contains(child))
				this._selItems.push(child);
			noRerender = stripe = true;
		} else if (child.$instanceof(zul.sel.Listhead)) {
			this.listhead = child;
		} else if (child.$instanceof(zul.mesh.Paging)) {
			this.paging = child;
		} else if (child.$instanceof(zul.sel.Listfoot)) {
			this.listfoot = child;
		} else if (child.$instanceof(zul.mesh.Frozen)) {
			this.frozen = child;
		}
		
		this._syncEmpty();
		
		if (!ignoreAll) {
			if (!ignoreDom && !noRerender)
				return this.rerender();
			if (stripe)
				this._syncStripe();
			if (!ignoreDom)
				this._syncSize();
			if (this.desktop)
				_syncFrozen(this);
		}
	},
	removeChild: function (child, ignoreDom) {
		if (this.$super('removeChild', child, ignoreDom)) {
			this._fixOnRemove(child, ignoreDom);
			return true;
		}
	},
	_fixOnRemove: function (child, ignoreDom) {
		var stripe;
		if (child == this.listhead)
			this.listhead = null;
		else if (child == this.paging)
			this.paging = null;
		else if (child == this.frozen)
			this.frozen = null;
		else if (child == this.listfoot)
			this.listfoot = null;
		else if (!child.$instanceof(zul.mesh.Auxhead)) {
			if (child == this.firstItem) {
				for (var p = this.firstChild, Listitem = zul.sel.Listitem;
				p && !p.$instanceof(Listitem); p = p.nextSibling)
					;
				this.firstItem = p;
			}
			if (child == this.lastItem) {
				for (var p = this.lastChild, Listitem = zul.sel.Listitem;
				p && !p.$instanceof(Listitem); p = p.previousSibling)
					;
				this.lastItem = p;
			}
			if (_isListgroup(child))
				this._groupsInfo.$remove(child);
			--this._nrows;
			
			if (child.isSelected())
				this._selItems.$remove(child);
			stripe = true;
		}
		this._syncEmpty();
		if (!ignoreDom) { 
			if (stripe) this._syncStripe();
			this._syncSize();
		}
	},
	
	redrawEmpty_: function (out) {
		var cols = (this.listhead && this.listhead.nChildren) || 1 , 
			uuid = this.uuid, zcls = this.getZclass();
		out.push('<tbody id="',uuid,'-empty" class="',zcls,'-empty-body" ', 
		((!this._emptyMessage || this._nrows) ? ' style="display:none"' : '' ),
			'><tr><td colspan="', cols ,'">' , this._emptyMessage ,'</td></tr></tbody>');
	},
	_syncEmpty: function () {
		this._shallFixEmpty = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	_fixForEmpty: function () {
		if (this.desktop) {
			if(this._nrows)
				jq(this.$n("empty")).hide();
			else
				jq(this.$n("empty")).show();
		}
	},
	onChildReplaced_: function (oldc, newc) {
		this.$supers('onChildReplaced_', arguments);

		if (oldc) this._fixOnRemove(oldc, true);
		if (newc) this._fixOnAdd(newc, true, false, true); 

		if ((oldc && oldc.$instanceof(zul.sel.Listitem))
		|| (newc && newc.$instanceof(zul.sel.Listitem)))
			this._syncStripe();
		this._syncSize();
		if (this.desktop)
			_syncFrozen(this);
	},
	
	getHeadWidgetClass: function () {
		return zul.sel.Listhead;
	},
	
	itemIterator: _zkf = function () {
		return new zul.sel.ItemIter(this);
	},
	
	getBodyWidgetIterator: _zkf
});

zul.sel.ItemIter = zk.$extends(zk.Object, {
	
	$init: function (box) {
		this.box = box;
	},
	_init: function () {
		if (!this._isInit) {
			this._isInit = true;
			this.p = this.box.firstItem;
		}
	},
	 
	hasNext: function () {
		this._init();
		return this.p;
	},
	
	next: function () {
		this._init();
		var p = this.p;
		if (p) this.p = p.parent.nextItem(p);
		return p;
	}
});

})();

zkreg('zul.sel.Listbox');zk._m={};
zk._m['paging']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		wdAttr = innerWidth == '100%' ? ' width="100%"' : '',
		wdStyle =  innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos,
		tag = zk.ie || zk.gecko ? "a" : "button";

	out.push('<div', this.domAttrs_(), '>');

	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}

	if(this.listhead){
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
			'<table', wdAttr, zUtl.cellps0,
			' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div><div class="', zcls, '-header-bg"></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');

	var hgh = this.getHeight();
	if (hgh) out.push(' style="overflow:hidden;height:', hgh, '"');
	else if (this.getRows() > 1) out.push(' style="overflow:hidden;height:', this.getRows() * 15, 'px"');
	
	out.push('><table', wdAttr, zUtl.cellps0, ' id="', uuid, '-cave"', ' style="table-layout:fixed;', wdStyle,'"');		
	out.push('>');
	
	if(this.listhead)
		this.domFaker_(out, '-bdfaker', zcls);

	if (this.domPad_ && !inPaging)
		this.domPad_(out, '-tpad');
	out.push('<tbody id="',uuid,'-rows">');
	for (var item = this.firstItem; item; item = this.nextItem(item))
		item.redraw(out);
	out.push('</tbody>');
	if (this.domPad_ && !inPaging)
		this.domPad_(out, '-bpad');
	
	this.redrawEmpty_(out);

	out.push('</table><', tag, ' id="', uuid,
		'-a" tabindex="-1" onclick="return false;" href="javascript:;" class="z-focus-a"></',
		tag, '>', "</div>");

	if (this.listfoot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
			'<table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.listhead) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.listfoot.redraw(out);
		out.push('</table></div>');
	}

	if (this.frozen) {
		out.push('<div id="', uuid, '-frozen" class="', zcls, '-frozen">');
		this.frozen.redraw(out);
		out.push('</div>');
	}
	
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}
;zk._m['select']=

function (out) {
	out.push('<select', this.domAttrs_(), '>');
	
	for (var w = this.firstChild; w; w = w.nextSibling) {
		if (w.$instanceof(zul.sel.Option) && w.isVisible()) w.redraw(out);
	}
		
	out.push('</select>');
}
;zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		wdAttr = innerWidth == '100%' ? ' width="100%"' : '',
		wdStyle =  innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos,
		tag = zk.ie || zk.gecko ? "a" : "button";

	out.push('<div', this.domAttrs_(), '>');

	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}

	if(this.listhead){
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
			'<table', wdAttr, zUtl.cellps0,
			' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div><div class="', zcls, '-header-bg"></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');

	var hgh = this.getHeight();
	if (hgh) out.push(' style="overflow:hidden;height:', hgh, '"');
	else if (this.getRows() > 1) out.push(' style="overflow:hidden;height:', this.getRows() * 15, 'px"');
	
	out.push('><table', wdAttr, zUtl.cellps0, ' id="', uuid, '-cave"', ' style="table-layout:fixed;', wdStyle,'"');		
	out.push('>');
	
	if(this.listhead)
		this.domFaker_(out, '-bdfaker', zcls);

	if (this.domPad_ && !inPaging)
		this.domPad_(out, '-tpad');
	out.push('<tbody id="',uuid,'-rows">');
	for (var item = this.firstItem; item; item = this.nextItem(item))
		item.redraw(out);
	out.push('</tbody>');
	if (this.domPad_ && !inPaging)
		this.domPad_(out, '-bpad');
	
	this.redrawEmpty_(out);

	out.push('</table><', tag, ' id="', uuid,
		'-a" tabindex="-1" onclick="return false;" href="javascript:;" class="z-focus-a"></',
		tag, '>', "</div>");

	if (this.listfoot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
			'<table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.listhead) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.listfoot.redraw(out);
		out.push('</table></div>');
	}

	if (this.frozen) {
		out.push('<div id="', uuid, '-frozen" class="', zcls, '-frozen">');
		this.frozen.redraw(out);
		out.push('</div>');
	}
	
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}
;zkmld(zk._p.p.Listbox,zk._m);

(function () {

	function _isPE() {
		return zk.isLoaded('zkex.sel');
	}

zul.sel.Listitem = zk.$extends(zul.sel.ItemWidget, {
	
	getListbox: zul.sel.ItemWidget.prototype.getMeshWidget,
	
	getListgroup: function () {
		
		if (_isPE() && this.parent && this.parent.hasGroup())
			for (var w = this; w; w = w.previousSibling)
				if (w.$instanceof(zkex.sel.Listgroup)) return w;
				
		return null;
	},
	
	setLabel: function (val) {
		this._autoFirstCell().setLabel(val);
	},
	
	setImage: function (val) {
		this._autoFirstCell().setImage(val);
	},
	_autoFirstCell: function () {
		if (!this.firstChild)
			this.appendChild(new zul.sel.Listcell());
		return this.firstChild;
	},
	
	getZclass: function () {
		return this._zclass == null ? "z-listitem" : this._zclass;
	},
	domStyle_: function (no) {
		if (_isPE() && (this.$instanceof(zkex.sel.Listgroup) || this.$instanceof(zkex.sel.Listgroupfoot))
				|| (no && no.visible))
			return this.$supers('domStyle_', arguments);
			
		var style = this.$supers('domStyle_', arguments),
			group = this.getListgroup();
		return group && !group.isOpen() ? style + "display:none;" : style;
	},
	domClass_: function () {
		var cls = this.$supers('domClass_', arguments),
			list = this.getListbox();
		if (list && jq(this.$n()).hasClass(list = list.getOddRowSclass()))
			return cls + ' ' + list; 
		return cls;
	},
	replaceWidget: function (newwgt) {
		this._syncListitems(newwgt);
		this.$supers('replaceWidget', arguments);
	},
	_syncListitems: function (newwgt) {
		var box = this.getListbox();
		if (box) {
			if (box.firstItem.uuid == newwgt.uuid)
				box.firstItem = newwgt;
			if (box.lastItem.uuid == newwgt.uuid)
				box.lastItem = newwgt;

			var items = box._selItems, b1, b2;
			if (b1 = this.isSelected())
				items.$remove(this);
			if (b2 = newwgt.isSelected())
				items.push(newwgt);
			if (b1 != b2)
				box._updHeaderCM();
		}
	}
});
})();
zkreg('zul.sel.Listitem');zk._m={};
zk._m['select']=

function (out) {
	out.push('<option', this.domAttrs_(), '>', this.domLabel_(), '</option>');
}

;zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Listitem,zk._m);

(function () {

	function _isListgroup(wgt) {
		return zk.isLoaded('zkex.sel') && wgt.$instanceof(zkex.sel.Listgroup);
	}	
	function _isListgroupfoot(wgt) {
		return zk.isLoaded('zkex.sel') && wgt.$instanceof(zkex.sel.Listgroupfoot);
	}	

zul.sel.Listcell = zk.$extends(zul.LabelImageWidget, {
	_colspan: 1,
	$define: {
    	
    	
		colspan: [
			function (colspan) {
				return colspan > 1 ? colspan: 1;
			},
			function () {
				var n = this.$n();
				if (n) n.colSpan = this._colspan;
			}]
	},
	setLabel: function () {
		this.$supers('setLabel', arguments);
		if (this.desktop) {
	 		if (_isListgroup(this.parent))
				this.parent.rerender();
			else if (this.parent.$instanceof(zul.sel.Option))
				this.getListbox().rerender(); 
		}
	},
	
	getListbox: function () {
		var p = this.parent;
		return p ? p.parent: null;
	},

	
	getZclass: function () {
		return this._zclass == null ? "z-listcell" : this._zclass;
	},
	getTextNode: function () {
		return jq(this.$n()).find('>div:first')[0];
	},
	
	getMaxlength: function () {
		var box = this.getListbox();
		if (!box) return 0;
		if (box.getMold() == 'select')
			return box.getMaxlength();
		var lc = this.getListheader();
		return lc ? lc.getMaxlength() : 0;
	},
	
	getListheader: function () {
		var box = this.getListbox();
		if (box && box.listhead) {
			var j = this.getChildIndex();
			if (j < box.listhead.nChildren)
				return box.listhead.getChildAt(j);
		}
		return null;
	},
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	},
	domContent_: function () {
		var s1 = this.$supers('domContent_', arguments),
			s2 = this._colHtmlPre();
		return s1 ? s2 ? s2 + '&nbsp;' + s1: s1: s2;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if ((!no || !no.zclass)
		&& (_isListgroup(this.parent) || _isListgroupfoot(this.parent))) {
			var zcls = this.parent.getZclass();
			scls += ' ' + zcls + '-inner';
		}
		return scls;
	},
	_colHtmlPre: function () {
		var s = '',
			box = this.getListbox(),
			p = this.parent,
			zcls = p.getZclass();
		if (box != null && p.firstChild == this) {
			var isGrp = _isListgroup(p);
			
			if (box.isCheckmark() && !_isListgroupfoot(p) &&
					(!isGrp || box.groupSelect)) {
				var chkable = p.isCheckable(),
					multi = box.isMultiple(),
					img = zcls + '-img';
				s += '<span id="' + p.uuid + '-cm" class="' + img + ' ' + img
					+ (multi ? '-checkbox' : '-radio');
				
				if (!chkable || p.isDisabled())
					s += ' ' + img + '-disd';
				
				s += '"';
				if (!chkable)
					s += ' style="visibility:hidden"';
					
				s += '></span>';
			}
			
			if (isGrp) {
				s += '<span id="' + p.uuid + '-img" class="' + zcls + '-img ' + zcls
					+ '-img-' + (p._open ? 'open' : 'close') + '"></span>';
			}
			if (s) return s;
		}
		return (!this.getImage() && !this.getLabel() && !this.firstChild) ? "&nbsp;": '';
	},
	doFocus_: function (evt) {
		this.$supers('doFocus_', arguments);
		
		
		var box, frozen, tbody, td, tds, node;
		if ((box = this.getListbox()) && box.efrozen && 
			(frozen = zk.Widget.$(box.efrozen.firstChild) && 
			(node = this.$n()))) {
			box._moveToHidingFocusCell(node.cellIndex);
		}
	},
	doMouseOver_: function(evt) {
		if (zk.gecko && (this._draggable || this.parent._draggable)
		&& !jq.nodeName(evt.domTarget, "input", "textarea")) {
			var n = this.$n();
			if (n) n.firstChild.style.MozUserSelect = "none";
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function(evt) {
		if (zk.gecko && (this._draggable || this.parent._draggable)) {
			var n = this.$n();
			if (n) n.firstChild.style.MozUserSelect = "none";
		}
		this.$supers('doMouseOut_', arguments);
	},
	domAttrs_: function () {
		var head = this.getListheader(),
			added;
		if (head)
			added = head.getColAttrs();
		return this.$supers('domAttrs_', arguments)
			+ (this._colspan > 1 ? ' colspan="' + this._colspan + '"' : '')
			+ (added ? ' ' + added : '');
	},
	
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments),
			head = this.getListheader();
		if (head && !head.isVisible())
			style += "display:none;";
		return style;
	},
	bindChildren_: function () {
		var p;
		if (!(p = this.parent) || !p.$instanceof(zul.sel.Option))
			this.$supers("bindChildren_", arguments);
	},
	unbindChildren_: function () {
		var p;
		if (!(p = this.parent) || !p.$instanceof(zul.sel.Option))
			this.$supers("unbindChildren_", arguments);
	},
	deferRedrawHTML_: function (out) {
		out.push('<td', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></td>');
	}
	
});
})();
zkreg('zul.sel.Listcell',true);zk._m={};
zk._m['default']=

function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass() + '-cnt');

	var box = this.getListbox();
	if (box != null && !box.isSizedByContent())
		out.push(' z-overflow-hidden');

	out.push('"', this.domTextStyleAttr_(), '>', this.domContent_());

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</div></td>');
}

;zkmld(zk._p.p.Listcell,zk._m);


zul.sel.Listhead = zk.$extends(zul.mesh.HeadWidget, {
	
	getZclass: function () {
		return this._zclass == null ? "z-listhead" : this._zclass;
	}
});
zkreg('zul.sel.Listhead');zk._m={};
zk._m['default']=

zul.mesh.HeadWidget.redraw
;zkmld(zk._p.p.Listhead,zk._m);


zul.sel.Listheader = zk.$extends(zul.mesh.SortWidget, {
	
	getListbox: zul.mesh.HeaderWidget.prototype.getMeshWidget,
	
	getMeshBody: zul.mesh.HeaderWidget.prototype.getMeshWidget,
	checkClientSort_: function (ascending) {
		var body;
		return !(!(body = this.getMeshBody()) || body.hasGroup()) && 
			this.$supers('checkClientSort_', arguments);
	},
	$define: {
		
		
		maxlength: [function (v) {
			return !v || v < 0 ? 0 : v; 
		}, function () {
			if (this.desktop) {
				this.rerender(0);
				this.updateCells_();
			}
		}]
	},
	
	updateCells_: function () {
		var box = this.getListbox();
		if (box == null || box.getMold() == 'select')
			return;

		var jcol = this.getChildIndex(), w;
		for (var it = box.getBodyWidgetIterator(); (w = it.next());)
			if (jcol < w.nChildren)
				w.getChildAt(jcol).rerender(0);

		w = box.listfoot;
		if (w && jcol < w.nChildren)
			w.getChildAt(jcol).rerender(0);
	},
	
	getZclass: function () {
		return this._zclass == null ? "z-listheader" : this._zclass;
	},
	bind_: function () {
		this.$supers(zul.sel.Listheader, 'bind_', arguments);
		var cm = this.$n('cm'),
			n = this.$n();
		if (cm) {
			var box = this.getListbox();
			if (box) box._headercm = cm;
			this.domListen_(cm, 'onClick')
				.domListen_(cm, 'onMouseOver')
				.domListen_(cm, 'onMouseOut');
		}
		if (n)
			this.domListen_(n, 'onMouseOver', '_doSortMouseEvt')
				.domListen_(n, 'onMouseOut', '_doSortMouseEvt');
	},
	unbind_: function () {
		var cm = this.$n('cm'),
			n = this.$n();
		if (cm) {
			var box = this.getListbox();
			if (box) box._headercm = null;
			this._checked = null;
			this.domUnlisten_(cm, 'onClick')
				.domUnlisten_(cm, 'onMouseOver')
				.domUnlisten_(cm, 'onMouseOut');
		}
		if (n)
			this.domUnlisten_(n, 'onMouseOver', '_doSortMouseEvt')
				.domUnlisten_(n, 'onMouseOut', '_doSortMouseEvt');
		this.$supers(zul.sel.Listheader, 'unbind_', arguments);
	},
	_doSortMouseEvt: function (evt) {
		var sort = this.getSortAscending();
		if (sort != 'none')
			jq(this.$n())[evt.name == 'onMouseOver' ? 'addClass' : 'removeClass'](this.getZclass() + '-sort-over');
	},
	_doMouseOver: function (evt) {
		 var cls = this._checked ? '-img-over-seld' : '-img-over';
		 jq(evt.domTarget).addClass(this.getZclass() + cls);
	},
	_doMouseOut: function (evt) {
		 var cls = this._checked ? '-img-over-seld' : '-img-over',
		 	$n = jq(evt.domTarget),
			zcls = this.getZclass();
		 $n.removeClass(zcls + cls);
		 if (this._checked)
		 	$n.addClass(zcls + '-img-seld');
	},
	_doClick: function (evt) {
		this._checked = !this._checked;
		var box = this.getListbox(),
			$n = jq(evt.domTarget),
			zcls = this.getZclass(); 
		if (this._checked) {
			$n.removeClass(zcls + '-img-over').addClass(zcls + '-img-over-seld');
			box.selectAll(true, evt)
		} else {
			$n.removeClass(zcls + '-img-over-seld')
				.removeClass(zcls + '-img-seld')
				.addClass(zcls + '-img-over');
			box._select(null, evt);
		}
	},
	
	doClick_: function (evt) {
		var box = this.getListbox();
		if (box && box._checkmark) {
			var n = evt.domTarget;
			if (n.id && n.id.endsWith("-cm"))
				return; 
		}
		this.$supers("doClick_", arguments);
	},
	
	domContent_: function () {
		var s = this.$supers('domContent_', arguments),
			box = this.getListbox();
		if (box != null && this.parent.firstChild == this 
		&& box._checkmark && box._multiple)
			s = '<span id="' + this.uuid + '-cm" class="' + this.getZclass() + '-img"></span>'
				+ (s ? '&nbsp;' + s:'');
		return s;
	},
	
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this._maxlength});
	}
});

zkreg('zul.sel.Listheader',true);zk._m={};
zk._m['default']=

zul.mesh.HeaderWidget.redraw
;zkmld(zk._p.p.Listheader,zk._m);


zul.sel.Listfoot = zk.$extends(zul.Widget, {
	
	getListbox: function () {
		return this.parent;
	},
	getZclass: function () {
		return this._zclass == null ? "z-listfoot" : this._zclass;
	},
	
	setVflex: function (v) { 
		v = false;
		this.$super(zul.sel.Listfoot, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(zul.sel.Listfoot, 'setHflex', v);
	},
	deferRedrawHTML_: function (out) {
		out.push('<tr', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tr>');
	}
});

zkreg('zul.sel.Listfoot');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Listfoot,zk._m);


zul.sel.Listfooter = zk.$extends(zul.mesh.FooterWidget, {
	
	
	getListbox: function () {
		return this.getMeshWidget();
	},
	
	getListheader: function () {
		return this.getHeaderWidget();
	},
	
	getMaxlength: function () {
		var lc = this.getListheader();
		return lc ? lc.getMaxlength() : 0;
	},
	
	getZclass: function () {
		return this._zclass == null ? "z-listfooter" : this._zclass;
	},
	
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	}
});

zkreg('zul.sel.Listfooter',true);zk._m={};
zk._m['default']=

function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass(), '-cnt">', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Listfooter,zk._m);


zul.sel.Option = zk.$extends(zul.Widget, {
	_selected: false,
	$define: {
    	
    	
		disabled: function (disabled) {
			var n = this.$n();
			if (n) n.disabled = disabled ? 'disabled' : '';
		},
		
		
		value: null
	},
	
	focus: function (timeout) {
		var p = this.parent;
		if (p) p.focus(timeout);
	},

	
	setVisible: function (visible) {
		if (this._visible != visible) {
			this._visible = visible;
			if (this.desktop)
				this.parent.rerender();
		}
	},
	
	setSelected: function (selected) {
		selected = selected || false;
		if (this._selected != selected) {
			if (this.parent)
				this.parent.toggleItemSelection(this);
			this._setSelectedDirectly(selected);
		}
	},
	_setSelectedDirectly: function (selected) {
		var n = this.$n();
		if (n) n.selected = selected ? 'selected' : '';
		this._selected = selected;
	},
	
	isSelected: function () {
		return this._selected;
	},
	
	getLabel: function () {
		return this.firstChild ? this.firstChild.getLabel() : null; 
	},
	
	getMaxlength: function () {
		return this.parent ? this.parent.getMaxlength() : 0;
	},
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	},
	domAttrs_: function () {
		var value = this.getValue();
		return this.$supers('domAttrs_', arguments) + (this.isDisabled() ? ' disabled="disabled"' :'') +
		(this.isSelected() ? ' selected="selected"' : '') + (value ? ' value="' + value + '"': '');
	},
	replaceWidget: function (newwgt) {
		this._syncItems(newwgt);
		this.$supers('replaceWidget', arguments);
	},
	_syncItems: function (newwgt) {
		if (this.parent && this.isSelected()) {
			var items = this.parent._selItems;
			if (items && items.$remove(this))
				items.push(newwgt);
		}
	}
});
zkreg('zul.sel.Option');

zul.sel.Select = zk.$extends(zul.Widget, {
	_selectedIndex: -1,
	
	_rows: 0,
	$init: function () {
		this.$supers('$init', arguments);
		this._selItems = [];
	},
	$define: {
		
		
		multiple: function (multiple) {
			var n = this.$n();
			if (n) n.multiple = multiple ? 'multiple' : '';
		},
		
		
		disabled: function (disabled) {
			var n = this.$n();
			if (n) n.disabled = disabled ? 'disabled' : '';
		},
		
		
		selectedIndex: function (selectedIndex) {
			var i = 0, j = 0, w, n = this.$n();
			this.clearSelection();
			for (w = this.firstChild; w && i < selectedIndex; w = w.nextSibling, i++) {
				if (w.$instanceof(zul.sel.Option)) {
    				if (!w.isVisible())
    					j++;
				} else i--;			
			}
				
			selectedIndex -= j;
			if (n)
				n.selectedIndex = selectedIndex;

			if (selectedIndex > -1 && w && w.$instanceof(zul.sel.Option)) {
				w.setSelected(true);
				this._selItems.push(w);
			}
		},
		
		
		tabindex: function (tabindex) {
			var n = this.$n();
			if (n) n.tabindex = tabindex||'';
		},
		
		
		name: function (name) {
			var n = this.$n();
			if (n) n.name = name;
		},
		
		
		rows: function (rows) {
			var n = this.$n();
			if (n) n.size = rows;
		},
		
		
		maxlength: function (maxlength) {
			if (this.desktop)
				this.rerender();
		}
	},
	
	toggleItemSelection: function (item) {
		if (item.isSelected()) this._removeItemFromSelection(item);
		else this._addItemToSelection(item);
	},
	
	selectItem: function (item) {
		if (!item)
			this.setSelectedIndex(-1);
		else if (this._multiple || !item.isSelected())
			this.setSelectedIndex(item.getChildIndex());
	},
	_addItemToSelection: function (item) {
		if (!item.isSelected()) {
			if (!this._multiple) {
				this.selectItem(item);
			} else {
				var index = item.getChildIndex();
				if (index < this._selectedIndex || this._selectedIndex < 0) {
					this._selectedIndex = index;
				}
				item._setSelectedDirectly(true);
				this._selItems.push(item);
			}
		}
	},
	_removeItemFromSelection: function (item) {
		if (item.isSelected()) {
			if (!this._multiple) {
				this.clearSelection();
			} else {
				item._setSelectedDirectly(false);
				this._selItems.$remove(item);				
			}
		}
	},
	
	clearSelection: function () {
		if (this._selItems.length) {
			var item;
			for(;(item = this._selItems.pop());)
				item._setSelectedDirectly(false);
			this._selectedIndex = -1;
		}
	},
	domAttrs_: function () {
		var v;
		return this.$supers('domAttrs_', arguments)
			+ (this.isDisabled() ? ' disabled="disabled"' :'')
			+ (this.isMultiple() ? ' multiple="multiple"' : '')
			+ ((v=this.getSelectedIndex()) > -1 ? ' selectedIndex="' + v + '"': '')
			+ ((v=this.getTabindex()) ? ' tabindex="' + v + '"': '')
			+ ((v=this.getRows()) > 0 ? ' size="' + v + '"': '')
			+ ((v=this.getName()) ? ' name="' + v + '"': '');
	},
	bind_: function () {
		this.$supers(zul.sel.Select, 'bind_', arguments);
		var n = this.$n();
		this.domListen_(n, 'onChange')
			.domListen_(n, 'onFocus', 'doFocus_')
			.domListen_(n, 'onBlur', 'doBlur_');
	},
	unbind_: function () {
		var n = this.$n();
		this.domUnlisten_(n, 'onChange')
			.domUnlisten_(n, 'onFocus', 'doFocus_')
			.domUnlisten_(n, 'onBlur', 'doBlur_')
			.$supers(zul.sel.Select, 'unbind_', arguments);
	},
	_doChange: function (evt) {		
		var data = [], reference, n = this.$n();
		if (this.isMultiple()) {
			var opts = n.options;
			for (var j = 0, ol = opts.length; j < ol; ++j) {
				var opt = opts[j],
					o = zk.Widget.$(opt.id);
				if (o) o.setSelected(opt.selected);
				if (opt.selected) {
					data.push(opt.id);
					if (!reference) reference = opt.id;
				}
			}
		} else {
			var opt = n.options[n.selectedIndex];
			this.setSelectedIndex(n.selectedIndex);
			data.push(opt.id);
			reference = opt.id;
		}
		
		this.fire('onSelect', {items: data, reference: reference});
	
		
		
	},
	doKeyUp_: function (evt) {
		if (zk.gecko || zk.safari) {
			if (this.isMultiple() || this.getSelectedIndex() === evt.domTarget.selectedIndex) 
				return; 
			this._doChange(evt);
		} else this.$supers('doKeyUp_', arguments);
	},
	onChildAdded_: function () {
		this.rerender();
	},
	onChildRemoved_: function () {
		if (!this.childReplacing_)
			this.rerender();
	}
});

zkreg('zul.sel.Select');

zul.sel.Tree = zk.$extends(zul.sel.SelectWidget, {
	
	_isTree: true,
	
	clear: function () {
		if (!this._treechildren || !this._treechildren.nChildren)
			return;
		for (var w = this._treechildren.firstChild; w; w = w.nextSibling)
			w.detach();
	},
	getZclass: function () {
		return this._zclass == null ? "z-tree" : this._zclass;
	},
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling, !this.z_rod)) {
			this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child, !this.z_rod)) {
			if (!this.insertingBefore_)
				this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom, _noSync) {
		if (child.$instanceof(zul.sel.Treecols))
			this.treecols = child;
		else if (child.$instanceof(zul.sel.Treechildren)) {
			this.treechildren = child;
			this._fixSelectedSet();
		} else if (child.$instanceof(zul.mesh.Paging))
			this.paging = child;
		else if (child.$instanceof(zul.sel.Treefoot))
			this.treefoot = child;
		if (!ignoreDom)
			this.rerender();
		if (!_noSync)
			this._syncSize();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);

		if (child == this.treecols)
			this.treecols = null;
		else if (child == this.treefoot)
			this.treefoot = null;
		else if (child == this.treechildren) {
			this.treechildren = null;
			this._selItems = [];
			this._sel = null;
		} else if (child == this.paging)
			this.paging = null;

		if (!this.childReplacing_) 
			this._syncSize();
	},
	onChildAdded_: function(child) {
		this.$supers('onChildAdded_', arguments);
		if (this.childReplacing_) 
			this._fixOnAdd(child, true);
		
	},
	_onTreeitemAdded: function (item) {
		this._fixNewChild(item);
		this._onTreechildrenAdded(item.treechildren);
	},
	_onTreeitemRemoved: function (item) {
		var fixSel, upperItem;
		if (item.isSelected()) {
			this._selItems.$remove(item);
			fixSel = this._sel == item;
			if (fixSel && !this._multiple) {
				this._sel = null;
			}
		}
		this._onTreechildrenRemoved(item.treechildren);
		if (fixSel) this._fixSelected();
		if (upperItem = item.previousSibling || item.getParentItem()) this._syncFocus(upperItem);
		else jq(this.$n('a')).offset({top: 0, left: 0});
	},
	_onTreechildrenAdded: function (tchs) {
		if (!tchs || tchs.parent == this)
			return; 

		
		for (var j = 0, items = tchs.getItems(), k = items.length; j < k; ++j)
			if (items[j]) this._fixNewChild(items[j]);
	},
	_onTreechildrenRemoved: function (tchs) {
		if (tchs == null || tchs.parent == this)
			return; 

		
		var item, fixSel;
		for (var j = 0, items = tchs.getItems(), k = items.length; j < k; ++j) {
			item = items[j];
			if (item.isSelected()) {
				this._selItems.$remove(item);
				if (this._sel == item) {
					if (!this._multiple) {
						this._sel = null;
						return; 
					}
					fixSel = true;
				}
			}
		}
		if (fixSel) this._fixSelected();
	},
	_fixNewChild: function (item) {
		if (item.isSelected()) {
			if (this._sel && !this._multiple) {
				item._selected = false;
				item.rerender();
			} else {
				if (!this._sel)
					this._sel = item;
				this._selItems.push(item);
			}
		}
	},
	_fixSelectedSet: function () {
		this._sel = null;
		this._selItems = [];
		for (var j = 0, items = this.getItems(), k = items.length; j < k; ++j) {
			if (items[j].isSelected()) {
				if (this._sel == null) {
					this._sel = items[j];
				} else if (!_multiple) {
					items[j]._selected = false;
					continue;
				}
				this._selItems.push(item);
			}
		}
	},
	_fixSelected: function () {
		var sel;
		switch (this._selItems.length) {
		case 1:
			sel = this._selItems[0];
		case 0:
			break;
		default:
			for (var j = 0, items = this.getItems(), k = items.length; j < k; ++j) {
				if (items[j].isSelected()) {
					sel = items[j];
					break;
				}
			}
		}

		if (sel != this._sel) {
			this._sel = sel;
			return true;
		}
		return false;
	},
	
	getHeadWidgetClass: function () {
		return zul.sel.Treecols;
	},
	
	itemIterator: _zkf = function () {
		return new zul.sel.TreeItemIter(this);
	},
	
	getBodyWidgetIterator: _zkf,

	
	getItems: function () {
		return this.treechildren ? this.treechildren.getItems(): [];
	},
	
	getItemCount: function () {
		return this.treechildren != null ? this.treechildren.getItemCount(): 0;
	},
	_doLeft: function (row) {
		if (row.isOpen()) {
			row.setOpen(false);
		}
	},
	_doRight: function (row) {
		if (!row.isOpen()) {
			row.setOpen(true);
		}
	},

	
	shallIgnoreSelect_: function (evt) {
		var n = evt.domTarget;
		return n && n.id && n.id.endsWith('-open') || (evt.name == 'onRightClick' && !this.rightSelect);
	}
});

zul.sel.TreeItemIter = zk.$extends(zk.Object, {
	
	$init: function (tree) {
		this.tree = tree;
	},
	_init: function () {
		if (!this._isInit) {
			this._isInit = true;
			this.items = this.tree.getItems();
			this.length = this.items.length;
			this.cur = 0;
		}
	},
	 
	hasNext: function () {
		this._init();
		return this.cur < this.length;
	},
	
	next: function () {
		this._init();
		return this.items[this.cur++];
	}
});


zkreg('zul.sel.Tree');zk._m={};
zk._m['paging']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		width = innerWidth == '100%' ? ' width="100%"' : '',
		wdStyle =  innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos,
		tag = zk.ie || zk.gecko ? 'a' : 'button';
		
	out.push('<div', this.domAttrs_(), '>');
	
	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}
	
	if (this.treecols) {
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
				'<table', width, zUtl.cellps0,
				' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"><table', width,	zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'"');
		
	out.push('>');
	
	if (this.treecols)
		this.domFaker_(out, '-bdfaker', zcls);
		
	if (this.treechildren)
		this.treechildren.redraw(out);
	
	out.push('</table><', tag, ' id="', uuid,
		'-a" tabindex="-1" onclick="return false;" href="javascript:;" class="z-focus-a"></',
		tag, '>');
	out.push("</div>");
	
	if (this.treefoot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
				'<table', width, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.treecols) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.treefoot.redraw(out);
		out.push('</table></div>');
	}
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}

;zk._m['default']=

function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		width = innerWidth == '100%' ? ' width="100%"' : '',
		wdStyle =  innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos,
		tag = zk.ie || zk.gecko ? 'a' : 'button';
		
	out.push('<div', this.domAttrs_(), '>');
	
	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}
	
	if (this.treecols) {
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
				'<table', width, zUtl.cellps0,
				' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"><table', width,	zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'"');
		
	out.push('>');
	
	if (this.treecols)
		this.domFaker_(out, '-bdfaker', zcls);
		
	if (this.treechildren)
		this.treechildren.redraw(out);
	
	out.push('</table><', tag, ' id="', uuid,
		'-a" tabindex="-1" onclick="return false;" href="javascript:;" class="z-focus-a"></',
		tag, '>');
	out.push("</div>");
	
	if (this.treefoot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
				'<table', width, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.treecols) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.treefoot.redraw(out);
		out.push('</table></div>');
	}
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}

;zkmld(zk._p.p.Tree,zk._m);

(function () {
	function _updCells(tch, jcol) {
		if (tch)
			for (var w = tch.firstChild, tr; w; w = w.nextSibling) {
				if ((tr = w.treerow) && jcol < tr.nChildren) 
					tr.getChildAt(jcol).rerender(0);

				_updCells(w.treechildren, jcol); 
			}
	}
	
	function _sort0(treechildren, col, dir, sorting, isNumber) {
		var d = []
		for (var i = 0, z = 0, w = treechildren.firstChild; w; w = w.nextSibling, z++) {
			if (w.treechildren) 
				_sort0(w.treechildren, col, dir, sorting, isNumber);
			for (var k = 0, cell = w.getFirstCell(); cell; cell = cell.nextSibling, k++)
				if (k == col) {
					d[i++] = {
						wgt: cell,
						index: z
					};
				}
		}
		var dsc = dir == "ascending" ? -1 : 1;
		d.sort(function(a, b) {
			var v = sorting(a.wgt, b.wgt, isNumber) * dsc;
			if (v == 0) {
				v = (a.index < b.index ? -1 : 1);
			}
			return v;
		});
		for (var i = 0, k = d.length; i < k; i++) {
			treechildren.appendChild(d[i].wgt.parent.parent);
		}
	}


zul.sel.Treecol = zk.$extends(zul.mesh.SortWidget, {
	
	getTree: zul.mesh.HeaderWidget.prototype.getMeshWidget,
	
	getMeshBody: function () {
		var tree = this.getTree();
		return tree ? tree.treechildren : null;  
	},
	checkClientSort_: function (ascending) {
		var tree;
		return !(!this.getMeshBody() || !(tree = this.getTree()) || ('paging' == tree._mold))
				&& this.$supers('checkClientSort_', arguments);
	},
	replaceCavedChildrenInOrder_: function (ascending) {
		var mesh = this.getMeshWidget(),
			body = this.getMeshBody(),
			desktop = body.desktop;
		try {
			body.unbind();
			_sort0(body, this.getChildIndex(), this.getSortDirection(), this.sorting, 
				(this[ascending ? '_sortAscending': '_sortDescending'] == 'client(number)'));
			this._fixDirection(ascending);
		} finally {
			var old = mesh._syncingbodyrows;
			mesh._syncingbodyrows = true;
			try {
				mesh.clearCache();
				jq(mesh.$n('rows')).replaceWith(body.redrawHTML_());
				body.bind(desktop);
				mesh._bindDomNode();
			} finally {
				mesh._syncingbodyrows = old;
			}
		}
	},
	$define: {
		
		
		maxlength: [function (v) {
			return !v || v < 0 ? 0 : v; 
		}, function () {
			if (this.desktop) {
				this.rerender(0);
				this.updateCells_();
			}
		}]
	},
	updateCells_: function () {
		var tree = this.getTree();
		if (tree) {
			var jcol = this.getChildIndex(),
				tf = tree.treefoot;

			_updCells(tree.treechildren, jcol);

			if (tf && jcol < tf.nChildren)
				tf.getChildAt(jcol).rerender(0);
		}
	},
	getZclass: function () {
		return this._zclass == null ? "z-treecol" : this._zclass;
	},
	bind_: function () {
		this.$supers(zul.sel.Treecol, 'bind_', arguments);
		var n;
		if (n = this.$n())
			this.domListen_(n, 'onMouseOver', '_doSortMouseEvt')
				.domListen_(n, 'onMouseOut', '_doSortMouseEvt');
	},
	unbind_: function () {
		var n;
		if (n = this.$n())
			this.domUnlisten_(n, 'onMouseOver', '_doSortMouseEvt')
				.domUnlisten_(n, 'onMouseOut', '_doSortMouseEvt');
		this.$supers(zul.sel.Treecol, 'unbind_', arguments);
	},
	_doSortMouseEvt: function (evt) {
		var sort = this.getSortAscending();
		if (sort != 'none')
			jq(this.$n())[evt.name == 'onMouseOver' ? 'addClass' : 'removeClass'](this.getZclass() + '-sort-over');
	},
	
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this._maxlength});
	}
});

})();
zkreg('zul.sel.Treecol',true);zk._m={};
zk._m['default']=

function (out) {
	var zcls = this.getZclass();
	out.push('<th', this.domAttrs_(), '><div id="', this.uuid, '-cave" class="',
			zcls, '-cnt"', this.domTextStyleAttr_(), '><div class="', zcls, '-sort-img"></div>', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></th>');	
}

;zkmld(zk._p.p.Treecol,zk._m);


zul.sel.Treecols = zk.$extends(zul.mesh.HeadWidget, {
	
	getTree: function () {
		return this.parent;
	},
	setVisible: function (visible) {
		if (this._visible != visible) {
			this.$supers('setVisible', arguments);
			this.getTree().rerender();
		}
	},
	getZclass: function () {
		return this._zclass == null ? "z-treecols" : this._zclass;
	}
});

zkreg('zul.sel.Treecols');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), ' align="left">');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Treecols,zk._m);

(function () {
	function _prevsib(child) {
		var p;
		if ((p=child.parent) && p.lastChild == child)
			return child.previousSibling;
	}
	function _fixOnAdd(oldsib, child, ignoreDom) {
		if (!ignoreDom) {
			if (oldsib) oldsib._syncIcon();
			var p;
			if ((p=child.parent) && p.lastChild == child
			&& (p=child.previousSibling))
				p._syncIcon();
		}
	}


zul.sel.Treechildren = zk.$extends(zul.Widget, {
	
	getTree: function () {
		return this.isTopmost() ? this.parent : this.parent ? this.parent.getTree() : null;
	},
	
	getLinkedTreerow: function () {
		
		return this.parent ? this.parent.treerow : null;
	},
	
	isTopmost: function () {
		return this.parent && this.parent._isTree;
	},
	
	insertBefore: function (child, sibling, ignoreDom) {
		var oldsib = _prevsib(child);
		if (this.$supers('insertBefore', arguments)) {
			_fixOnAdd(oldsib, child, ignoreDom);
			return true;
		}
	},
	
	appendChild: function (child, ignoreDom) {
		var oldsib = _prevsib(child);
		if (this.$supers('appendChild', arguments)) {
			if (!this.insertingBefore_)
				_fixOnAdd(oldsib, child, ignoreDom);
			return true;
		}
	},
	insertChildHTML_: function (child, before, desktop) {
		var ben, isTopmost = this.isTopmost();
		if (before)
			before = before.getFirstNode_();
		if (!before && !isTopmost)
			ben = this.getCaveNode() || this.parent.getCaveNode();

		if (before)
			jq(before).before(child.redrawHTML_());
		else if (ben)
			jq(ben).after(child.redrawHTML_());
		else {
			if (isTopmost)
				jq(this.parent.$n('rows')).append(child.redrawHTML_());
			else
				jq(this).append(child.redrawHTML_());
		}
		child.bind(desktop);
	},
	getCaveNode: function () {
		for (var cn, w = this.lastChild; w; w = w.previousSibling)
			if ((cn = w.getCaveNode())) {
				
				
				if (w.treechildren) {
					var _cn  = w.treechildren.getCaveNode();
					if (_cn)
						cn = _cn;
				}
				return cn;	
			}
	},
	isVisible: function () {
		if (!this.$supers('isVisible', arguments))
			return false;

		var p;
		return this.isTopmost()
			|| ((p = this.parent) && p.isOpen() && p.isVisible()); 
	},
	
	getItems: function (items) {
		items = items || [];
		for (var w = this.firstChild; w; w = w.nextSibling) {
			items.push(w);
			if (w.treechildren) 
				w.treechildren.getItems(items);
		}
		return items;
	},
	
	getItemCount: function () {
		var sz = 0;
		for (var w = this.firstChild; w; w = w.nextSibling, ++sz)
			if (w.treechildren)
				sz += w.treechildren.getItemCount();
		return sz;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treechildren" : this._zclass;
	},
	beforeParentChanged_: function (newParent) {
		var oldtree = this.getTree();
		if (oldtree)
			oldtree._onTreechildrenRemoved(this);
			
		if (newParent) {
			var tree = newParent._isTree ? newParent : newParent.getTree();
			if (tree) tree._onTreechildrenAdded(this);
		}
		this.$supers("beforeParentChanged_", arguments);
	},
	removeHTML_: function (n) {
		for (var cn, w = this.firstChild; w; w = w.nextSibling) {
			cn = w.$n();
			if (cn)
				w.removeHTML_(cn);
		}
		this.$supers('removeHTML_', arguments);
	},
	getOldWidget_: function (n) {
		var old = this.$supers('getOldWidget_', arguments);
		if (old && old.$instanceof(zul.sel.Treerow)) {
			var ti = old.parent;
			if (ti)
				return ti.treechildren;
			return null;
		}
		return old;
	},
	$n: function (nm) {
		if (this.firstChild)
			return nm ? this.firstChild.$n(nm) : this.firstChild.$n();
		return null;
	},
	replaceWidget: function (newwgt) {
		while (this.firstChild != this.lastChild)
			this.lastChild.detach();
		
		if (this.firstChild && this.firstChild.treechildren)
			this.firstChild.treechildren.detach();

		zul.sel.Treeitem._syncSelItems(this, newwgt);

		this.$supers('replaceWidget', arguments);
	}
});

})();
zkreg('zul.sel.Treechildren');zk._m={};
zk._m['default']=

function (out) {
	if (this.parent.$instanceof(zul.sel.Tree)) {
		out.push('<tbody id="',this.parent.uuid,'-rows" ', this.domAttrs_({id: 1}), '>');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</tbody>');
	} else
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
}

;zkmld(zk._p.p.Treechildren,zk._m);

(function () {
	
	function _closed(ti) {
		for (; ti && !ti.$instanceof(zul.sel.Tree); ti = ti.parent)
			if (ti.isOpen && !ti.isOpen())
				return true;
	}

	function _rmSelItemsDown(items, wgt) {
		if (wgt.isSelected())
			items.$remove(wgt);

		var w;
		if (w = wgt.treechildren)
			for (w = w.firstChild; w && items.length; w = w.nextSibling)
				_rmSelItemsDown(items, w);
	}
	function _addSelItemsDown(items, wgt) {
		if (wgt.isSelected())
			items.push(wgt);

		var w;
		if (w = wgt.treechildren)
			for (w = w.firstChild; w; w = w.nextSibling)
				_addSelItemsDown(items, w);
	}

	function _sizeOnOpen(tree) {
		var w, wd;
		if ((w = tree.treecols) && w.nChildren > 1)
			for (w = w.firstChild; w; w = w.nextSibling)
				if (!(wd = w._width) || wd == "auto")
					return tree.onSize();
	}

	function _showDOM(wgt, visible) {
		var n = wgt.$n();
		if (n)
			n.style.display = visible ? "" : "none";
		var chld;
		if (chld = wgt.treechildren)
			for (var w = chld.firstChild; w; w = w.nextSibling)
				if (w._visible && w._open) 
					_showDOM(w, visible);
	}
	

zul.sel.Treeitem = zk.$extends(zul.sel.ItemWidget, {
	_open: true,
	_checkable: true,
	$define: {
    	
    	
		open: function (open, fromServer) {
			var img = this.$n('open');
			if (!img || _closed(this.parent))
				return;

			var cn = img.className,
				tree = this.getTree(),
				ebodytbl = tree ? tree.ebodytbl: null,
				oldwd = ebodytbl ? ebodytbl.clientWidth: 0; 
			img.className = open ? cn.replace('-close', '-open') : cn.replace('-open', '-close');
			if (!open) zWatch.fireDown('onHide', this);
			this._showKids(open);
			if (open) zWatch.fireDown('onShow', this);
			if (tree) {
				_sizeOnOpen(tree);

				if (!fromServer)
					this.fire('onOpen', {open: open},
						{toServer: tree.inPagingMold() || tree.isModel()});

				tree._syncFocus(this);
				tree.focus();

				if (ebodytbl) {
					tree._fixhdwcnt = tree._fixhdwcnt || 0;
					if (!tree._fixhdwcnt++)
						tree._fixhdoldwd = oldwd;
					setTimeout(function () {
						if (!--tree._fixhdwcnt && tree.$n() && tree._fixhdoldwd != ebodytbl.clientWidth)
							tree._calcSize();
					}, 250);
				}
			}
		}
	},
	_showKids: function (open) {
		if (this.treechildren)
			for (var w = this.treechildren.firstChild; w; w = w.nextSibling) {
				w.$n().style.display = w.isVisible() && open ? '' : 'none';
				if (w.isOpen())
					w._showKids(open);
			}
	},
	isStripeable_: function () {
		return false;
	},
	
	getMeshWidget: _zkf = function () {
		return this.parent ? this.parent.getTree() : null;
	},
	
	getTree: _zkf,
	getZclass: function () {
		if (this.treerow) return this.treerow.getZclass();
		return null;
	},
	$n: function (nm) {
		if (this.treerow)
			return nm ? this.treerow.$n(nm) : this.treerow.$n() || jq(this.treerow.uuid, zk)[0];
		return null;
	},
	
	isContainer: function () {
		return this.treechildren != null;
	},
	
	isEmpty: function () {
		return !this.treechildren || !this.treechildren.nChildren;
	},
	
	getLevel: function () {
		var level = 0;
		for (var  item = this;; ++level) {
			if (!item.parent)
				break;

			item = item.parent.parent;
			if (!item || item.$instanceof(zul.sel.Tree))
				break;
		}
		return level;
	},
	
	getLabel: function () {
		var cell = this.getFirstCell();
		return cell ? cell.getLabel(): null;
	},
	
	setLabel: function (label) {
		this._autoFirstCell().setLabel(label);
	},
	
	getFirstCell: function () {
		return this.treerow ? this.treerow.firstChild : null;
	},
	_autoFirstCell: function () {
		if (!this.treerow)
			this.appendChild(new zul.sel.Treerow());

		var cell = this.treerow.firstChild;
		if (!cell) {
			cell = new zul.sel.Treecell();
			this.treerow.appendChild(cell);
		}
		return cell;
	},
	
	getImage: function () {
		var cell = this.getFirstCell();
		return cell ? cell.getImage(): null;
	},
	
	setImage: function (image) {
		this._autoFirstCell().setImage(image);
		return this;
	},
	
	getParentItem: function () {
		var p = this.parent && this.parent.parent ? this.parent.parent : null;
		return p && p.$instanceof(zul.sel.Treeitem) ? p : null;
	},
	isVisible: function () {
		var p;
		return this.$supers('isVisible', arguments) && (p = this.parent) && p.isVisible();
	},
	setVisible: function (visible) {
		if (this._visible != visible) { 
			this.$supers('setVisible', arguments);
			if (this.treerow) this.treerow.setVisible(visible);
			
			_showDOM(this, this.isVisible());
		}
		return this;
	},
	doMouseOver_: function (evt) {
		var ico = this.$n('open');
		if (evt.domTarget == ico)
			jq(this.$n()).addClass(this.getZclass() + '-ico-over');
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		var ico = this.$n('open');	
		if (evt.domTarget == ico)
			jq(this.$n()).removeClass(this.getZclass() + '-ico-over');
		this.$supers('doMouseOut_', arguments);
	},
	
	beforeParentChanged_: function(newParent) {
		var oldtree = this.getTree();
		if (oldtree) 
			oldtree._onTreeitemRemoved(this);
		
		if (newParent) {
			var tree = newParent.getTree();
			if (tree) 
				tree._onTreeitemAdded(this);
		}
		this.$supers("beforeParentChanged_", arguments);
	},
	
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling,
		ignoreDom || (!this.z_rod && child.$instanceof(zul.sel.Treechildren)))) {
			this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child,
		ignoreDom || (!this.z_rod && child.$instanceof(zul.sel.Treechildren)))) {
			if (!this.insertingBefore_)
				this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom) {
		if (child.$instanceof(zul.sel.Treerow)) 
			this.treerow = child;
		else if (child.$instanceof(zul.sel.Treechildren)) {
			this.treechildren = child;
			if (!ignoreDom && this.treerow) 
				this.rerender();
		}
	},
	onChildRemoved_: function(child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.treerow) 
			this.treerow = null;
		else if (child == this.treechildren) {
			this.treechildren = null;
			if (!this.childReplacing_) 
				this._syncIcon(); 
		}
	},
	onChildAdded_: function(child) {
		this.$supers('onChildAdded_', arguments);
		if (this.childReplacing_) 
			this._fixOnAdd(child, true);
		
	},
	removeHTML_: function (n) {
		for (var cn, w = this.firstChild; w; w = w.nextSibling) {
			cn = w.$n();
			if (cn)
				w.removeHTML_(cn);
		}
		this.$supers('removeHTML_', arguments);
	},
	replaceWidget: function (newwgt) {
		zul.sel.Treeitem._syncSelItems(this, newwgt);
		if (this.treechildren)
			this.treechildren.detach();
		this.$supers('replaceWidget', arguments);
	},
	_removeChildHTML: function (n) {
		for(var cn, w = this.firstChild; w; w = w.nextSibling) {
			if (w != this.treerow && (cn = w.$n()))
				w.removeHTML_(cn);
		}
	},
	_renderChildHTML: function (childHTML) {
		var w = this.previousSibling;
		for (;w; w = this.previousSibling)
			if (w.treerow) break;
		
		if (w) {
			jq(w.treerow.$n()).after(childHTML);
		} else if (w = this.nextSibling) {
			for (;w; w = this.nextSibling)
				if (w.treerow) break;
				
			if (w)
				jq(w.treerow.$n()).before(childHTML);
		} else if (w = this.getParentItem()) {
			w._renderChildHTML(childHTML);
		} else if ((w = this.getTree())) {
			jq(w.$n('rows')).append(childHTML);
		}
	},
	insertChildHTML_: function (child, before, desktop) {
		if (before = before ? before.getFirstNode_(): null)
			jq(before).before(child.redrawHTML_());
		else
			this._renderChildHTML(child.redrawHTML_());
				
		child.bind(desktop);
	},
	getOldWidget_: function (n) {
		var old = this.$supers('getOldWidget_', arguments);
		if (old && old.$instanceof(zul.sel.Treerow))
			return old.parent;
		return old;
	},
	replaceHTML: function (n, desktop, skipper) {
		this._removeChildHTML(n);
		this.$supers('replaceHTML', arguments);
	},
	_syncIcon: function () {
		if (this.desktop && this.treerow) {
			var i = this.treerow;
			if (i = i.firstChild)
				i._syncIcon();
			if (i = this.treechildren)
				for (i = i.firstChild; i; i = i.nextSibling)
					i._syncIcon();
		}
	}
},{
	
	_syncSelItems: function (oldwgt, newwgt) {
		var items;
		if ((items = oldwgt.getTree()) && (items = items._selItems))
			if (oldwgt.$instanceof(zul.sel.Treechildren)) {
				for (var item = oldwgt.firstChild; item; item = item.nextSibling)
					_rmSelItemsDown(items, item)
				for (var item = newwgt.firstChild; item; item = item.nextSibling)
					_addSelItemsDown(items, item);
			} else { 
				_rmSelItemsDown(items, oldwgt)
				_addSelItemsDown(items, newwgt);
			}
	}
});
})();
zkreg('zul.sel.Treeitem');zk._m={};
zk._m['default']=

function (out) {
	if (this.treerow) this.treerow.redraw(out);
	if (this.treechildren) this.treechildren.redraw(out);
}

;zkmld(zk._p.p.Treeitem,zk._m);


zul.sel.Treerow = zk.$extends(zul.Widget, {
	
	getTree: function () {
		return this.parent ? this.parent.getTree() : null;
	},
	
	getLevel: function () {
		return this.parent ? this.parent.getLevel(): 0;
	},
	
	getLinkedTreechildren: function () {
		return this.parent ? this.parent.treechildren : null;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var added = this.parent ? this.parent.isDisabled() ? this.getZclass() + '-disd'
					: this.parent.isSelected() ? this.getZclass() + '-seld' : '' : '';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treerow" : this._zclass;
	},
	domTooltiptext_ : function () {
		return this._tooltiptext || this.parent._tooltiptext || this.parent.parent._tooltiptext;
	},
	
	isVisible: function () {
		if (!this.parent || !this.$supers('isVisible', arguments))
			return false;
		if (!this.parent.isVisible())
			return false;
		var child = this.parent.parent;
		return child && child.isVisible();
	},
	
	removeChild: function (child) {
		for (var w = child.firstChild; w;) {
			var n = w.nextSibling; 
			child.removeChild(w); 
			w = n;
		}
		this.$supers('removeChild', arguments);
	},

	
	doClick_: function(evt) {
		var ti = this.parent;
		if (ti.isDisabled()) return;
		if (evt.domTarget == this.$n('open')) {
			ti.setOpen(!ti._open);
			evt.stop();
		} else this.$supers('doClick_', arguments);
	},
	deferRedrawHTML_: function (out) {
		out.push('<tr', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tr>');
	}
});
zkreg('zul.sel.Treerow');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Treerow,zk._m);


zul.sel.Treecell = zk.$extends(zul.LabelImageWidget, {
	
	setWidth: zk.$void, 
	_colspan: 1,
	$define: {
    	
    	
		colspan: [
			function (colspan) {
				return colspan > 1 ? colspan: 1;
			},
			function () {
				var n = this.$n();
				if (n) n.colSpan = this._colspan;
			}]
	},
	
	getTree: function () {
		return this.parent ? this.parent.getTree() : null;
	},
	domStyle_: function (no) {
		var style = this.$super('domStyle_', zk.copy(no, {width:true})),
				
			tc = this.getTreecol();
			return this.isVisible() && tc && !tc.isVisible() ? style +
				"display:none;" : style;
	},
	
	getTreecol: function () {
		var tree = this.getTree();
		if (tree && tree.treecols) {
			var j = this.getChildIndex();
			if (j < tree.treecols.nChildren)
				return tree.treecols.getChildAt(j);
		}
		return null;
	},
	
	getLevel: function () {
		return this.parent ? this.parent.getLevel(): 0;
	},
	
	getMaxlength: function () {
		var tc = this.getTreecol();
		return tc ? tc.getMaxlength() : 0;
	},
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	},
	getTextNode: function () {
		return this.getCaveNode();
	},
	domContent_: function () {
		var s1 = this.$supers('domContent_', arguments),
			s2 = this._colHtmlPre();
		return s1 ? s2 ? s2 + '&nbsp;' + s1: s1: s2;
	},
	_syncIcon: function () {
		this.rerender();
		var p;
		if (p = this.parent)
			p.clearCache(); 
	},
	_colHtmlPre: function () {
		if (this.parent.firstChild == this) {
			var item = this.parent.parent,
				tree = item.getTree(),
				sb = [];
			if (tree) {
				if (tree.isCheckmark()) {
					var chkable = item.isCheckable(),
						multi = tree.isMultiple(),
						zcls = item.getZclass(),
						img = zcls + '-img';
					sb.push('<span id="', this.parent.uuid, '-cm" class="', img,
						' ', img, (multi ? '-checkbox' : '-radio'));
					
					if (!chkable || item.isDisabled())
						sb.push(' ', img, '-disd');
					
					sb.push('"');
					if (!chkable)
						sb.push(' style="visibility:hidden"');
						
					sb.push('></span>');
				}
			}
			var iconScls = tree ? tree.getZclass() : "",
				pitems = this._getTreeitems(item, tree);
			for (var j = 0, k = pitems.length; j < k; ++j)
				this._appendIcon(sb, iconScls,
					j == 0 || this._isLastVisibleChild(pitems[j]) ? zul.sel.Treecell.SPACER: zul.sel.Treecell.VBAR, false);

			if (item.isContainer()) {
				this._appendIcon(sb, iconScls,
					item.isOpen() ?
						pitems.length == 0 ? zul.sel.Treecell.ROOT_OPEN:
							 this._isLastVisibleChild(item) ? zul.sel.Treecell.LAST_OPEN: zul.sel.Treecell.TEE_OPEN:
						pitems.length == 0 ? zul.sel.Treecell.ROOT_CLOSE:
							this._isLastVisibleChild(item) ? zul.sel.Treecell.LAST_CLOSE: zul.sel.Treecell.TEE_CLOSE,
						true);
			} else {
				this._appendIcon(sb, iconScls,
					pitems.length == 0 ? zul.sel.Treecell.FIRSTSPACER:
						this._isLastVisibleChild(item) ? zul.sel.Treecell.LAST: zul.sel.Treecell.TEE, false);
			}
			return sb.join('');
		} else {
			
			
			return !this.getImage() && !this.getLabel()	&& !this.nChildren ? "&nbsp;": null;
		}
	},
	_isLastVisibleChild: function (item) {
		var parent = item.parent;
		for (var w = parent.lastChild; w; w = w.previousSibling)
			if (w.isVisible()) return w == item;
		return false;
	},
	_getTreeitems: function (item, tree) {
		var pitems = [];
		for (;;) {
			var tch = item.parent;
			if (!tch)
				break;
			item = tch.parent;
			if (!item || item == tree)
				break;
			pitems.unshift(item);
		}
		return pitems;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treecell" : this._zclass;
	},
	_appendIcon: function (sb, iconScls, name, button) {
		sb.push('<span class="');
		if (name == zul.sel.Treecell.TEE || name == zul.sel.Treecell.LAST || name == zul.sel.Treecell.VBAR || name == zul.sel.Treecell.SPACER) {
			sb.push(iconScls + "-line ", iconScls, '-', name, '"');
		} else {
			sb.push(iconScls + "-ico ", iconScls, '-', name, '"');
		}
		if (button) {
			var item = this.parent.parent;
			if (item && item.treerow)
				sb.push(' id="', item.treerow.uuid, '-open"');
		}

		sb.push('></span>');
	},
	getWidth: function() {
		var col = this.getTreecol();
		return col ? col.getWidth() : null;
	},
	domAttrs_: function () {
		var head = this.getTreecol(),
			added;
		if (head)
			added = head.getColAttrs();
		return this.$supers('domAttrs_', arguments)
			+ (this._colspan > 1 ? ' colspan="' + this._colspan + '"' : '')
			+ (added ? ' ' + added : '');
	},
	updateDomContent_: function () {
		this.$supers('updateDomContent_', arguments);
		if (this.parent)
			this.parent.clearCache();
	},
	deferRedrawHTML_: function (out) {
		out.push('<td', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></td>');
	}
}, {
	ROOT_OPEN: "root-open",
	ROOT_CLOSE: "root-close",
	LAST_OPEN: "last-open",
	LAST_CLOSE: "last-close",
	TEE_OPEN: "tee-open",
	TEE_CLOSE: "tee-close",
	TEE: "tee",
	LAST: "last",
	VBAR: "vbar",
	SPACER: "spacer",
	FIRSTSPACER: "firstspacer"
});

zkreg('zul.sel.Treecell',true);zk._m={};
zk._m['default']=

function (out, skipper) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass() + '-cnt');

	var tree = this.getTree();
	if (tree != null && !tree.isSizedByContent())
		out.push(' z-overflow-hidden');

	out.push('"', this.domTextStyleAttr_(), '>', this.domContent_());

	if (!skipper)
    	for (var w = this.firstChild; w; w = w.nextSibling)
    		w.redraw(out);

	out.push('</div></td>');
}

;zkmld(zk._p.p.Treecell,zk._m);


zul.sel.Treefoot = zk.$extends(zul.Widget, {
	
	getTree: function () {
		return this.parent;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treefoot" : this._zclass;
	},
	
	setVflex: function (v) { 
		v = false;
		this.$super(zul.sel.Treefoot, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(zul.sel.Treefoot, 'setHflex', v);
	},
	deferRedrawHTML_: function (out) {
		out.push('<tr', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></tr>');
	}
});

zkreg('zul.sel.Treefoot');zk._m={};
zk._m['default']=

function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Treefoot,zk._m);


zul.sel.Treefooter = zk.$extends(zul.mesh.FooterWidget, {
	
	getTree: function () {
		return this.getMeshWidget();
	},
	
	getTreecol: function () {
		return this.getHeaderWidget();
	},
	
	getMaxlength: function () {
		var tc = this.getTreecol();
		return tc ? tc.getMaxlength() : 0;
	},
	
	getZclass: function () {
		return this._zclass == null ? "z-treefooter" : this._zclass;
	},
	
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	}
});

zkreg('zul.sel.Treefooter',true);zk._m={};
zk._m['default']=

function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass(), '">', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Treefooter,zk._m);

}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.sel',1);