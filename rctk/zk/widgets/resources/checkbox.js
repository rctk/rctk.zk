Onion.widget.CheckBox = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.name = "checkbox";
}

Onion.widget.CheckBox.prototype = new Onion.widget.Control();

Onion.widget.CheckBox.prototype.create = function(data) {
    var controlid = "ctrl" + this.controlid;
	var self=this;
    this.control = new zul.wgt.Checkbox({
        id: controlid,
		onCheck: function () {        
			self.changed();
			self.jwin.flush();			
		}
    });

    this.control.setChecked(data.defaultChecked);

    this.handle_click = false;
    this.set_properties(data);
}

/*
 * Handle change events, which means syncing the updated state and possibly
 * firing the 'click' event. By (ab)using change to detect clicks we can
 * guarantee sync will take place before click
 */
Onion.widget.CheckBox.prototype.changed = function() {
    this.jwin.add_task("sync", "sync", this.controlid, {'checked':this.control.isChecked()});
    if(this.handle_click) {
        if(!this.busy) {
            this.jwin.add_task("event", "click", this.controlid);
            this.jwin.register_busy(this);
        }
    }
}

Onion.widget.CheckBox.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('checked' in data) {
        this.control.setChecked(data.checked);
    }	
    if('text' in data) {
		this.control.setLabel(data.text);	
    }	
}

// register
Onion.widget.register("checkbox", Onion.widget.CheckBox);
