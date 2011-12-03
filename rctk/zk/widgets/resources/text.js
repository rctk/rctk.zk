/*
 * Text is a simple text input. The serverside needs to be informed
 * of changes so we need to regularly submit changes, esp. for actions
 * that depend on it. An explicit <enter> is not sufficient, eventhandlers
 * may want to read the current value at any moment
 *
 * For now, use onchange to submit changes.
 */

 
Onion.widget.Text = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.name = "text";
}

Onion.widget.Text.prototype = new Onion.widget.Control();

Onion.widget.Text.prototype.create = function(data) {
    var controlid = "ctrl"+this.controlid;
    var self=this;    
    this.control = new zul.inp.Textbox({
        id: controlid, 	
		tabbable: "true",
		value: data.value,
		// ENTER keypress
		onOK: function (evnt) {  
			self.submit(); 
			self.jwin.flush();				
		},
		onChanging: function (evnt) {  
			self.changed(evnt); 
			self.jwin.flush();				
		}			
    });    

	this.control.setCols(data.columns);
	this.control.setRows(data.rows);
	if (data.rows > 1) {
		this.control.setMultiline(true);
	}

    this.set_properties(data);
}

Onion.widget.Text.prototype.changed = function(evnt) {
    this.jwin.add_task("sync", "sync", this.controlid, {'value':evnt.value});
    if(this.handle_change) {
        this.jwin.add_task("event", "change", this.controlid);
    }
    if(this.handle_keypress) {
        if(!this.busy) {
            this.jwin.register_busy(this);
            this.jwin.add_task("event", "keypress", this.controlid);
            return false;
        }
    }
}

Onion.widget.Text.prototype.submit = function() {
    // if this.handle_keypress: jwin.sync, post event
    // could use some optimization
    if(this.handle_submit) {
        if(!this.busy) {
            /*
             * Does it make sense to handle busy-ness here? This would mean
             * double-hitting enter..
             */
             this.jwin.register_busy(this);
             this.jwin.add_task("sync", "sync", this.controlid, {'value':this.control.getValue()});
             this.jwin.add_task("event", "submit", this.controlid);
             return false;
        }
    }
}

Onion.widget.Text.prototype.val = function() {
    return this.control.val();
}

Onion.widget.Text.prototype.set_properties = function(update) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('value' in update) {
        this.control.setValue(update.value);
    }
}

// register
Onion.widget.register("text", Onion.widget.Text);

