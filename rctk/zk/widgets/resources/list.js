/*
 * TODO:
 *
 * Support insertion at any position
 * Support deletion
 * Support Checkmark
 * Support Paging: autopaging="true" mold="paging" vflex="true" pagingPosition="both"
 */
 
ListIndexedComboitem = zk.$extends(zul.sel.Listitem, {
	key: -1,
});
 
Onion.widget.List = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.items = [];
    this.name = "list";
};

Onion.widget.List.prototype = new Onion.widget.Control();

Onion.widget.List.prototype.create = function(data) {
    var controlid = "ctrl" + this.controlid;
	var self=this;
    this.control = new zul.sel.Listbox({
        id: controlid,
		onSelect: function () {        
			self.changed();
			self.jwin.flush();			
		},
		onPaging: function () {        
		},
    });

	this.handle_click = false;

    this.control.setMultiple(false);

    if(data.items) {
        for(var i = 0; i < data.items.length; i++) {
            this.append_item(data.items[i][0], data.items[i][1]);
        }
    }
    if('multiple' in data) {
        if(data.multiple) {
		    this.control.setMultiple(true);	   
       }
    }
    this.set_properties(data);
};

Onion.widget.List.prototype.append_item = function(key, label) {
	var item = new ListIndexedComboitem({label: label});	
	item.key = key;
    this.control.appendChild(item);
    this.items.push({'key':key, 'item':item});    
};

Onion.widget.List.prototype.val = function() {
	var v = this.control.getSelectedItems();
    // a non-multiselect will return a single val. We want to be consistent
    // and always return arrays
    if(!jQuery.isArray(v)) {
        v = [v];
    }
    v = jQuery.map(v, function(v, i) { return parseInt(v.key, 10); });
    return v;    
};

Onion.widget.List.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if(data.item) {
        this.append_item(data.item[0], data.item[1]);
    }
    if('multiple' in data) {
        if(data.multiple) {
            this.control.setMultiple(true);	   
        }
        else {
			this.control.setMultiple(false);	   		
        }
    }
    if('selection' in data) {
        if(jQuery.isArray(data.selection)) {
            var converted = jQuery.map(data.selection, function(n, i) { return n.toString(); });
			for (var c = 0; c < converted.length; c++) {
				this.control.setSelectedItem(this.items[converted[c]]);
				break;
			}
        }
        else {
			for (var c = 0; c < data.selection.length; c++) {
				this.control.setSelectedItem(this.items[data.selection[c]]);
			}		
        }
    }
    if('clear' in data && data.clear) {
        this.control.clear(); 	
        this.items = [];		
    }
};


Onion.widget.List.prototype.changed = function() {
    this.jwin.add_task("sync", "sync", this.controlid, {'selection':this.val()});
    if(this.handle_click) {
        // find current selection.
        if(!this.busy) {
            this.jwin.add_task("event", "click", this.controlid);
            this.jwin.register_busy(this);
        }
    }
};

Onion.widget.register("list", Onion.widget.List);
