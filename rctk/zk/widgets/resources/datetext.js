Onion.widget.DateText = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.name = "datetext";
}

Onion.widget.DateText.prototype = new Onion.widget.Control();

Onion.widget.DateText.prototype.create = function(data) {
    var controlid = "ctrl" + this.controlid;
	var self=this;

    this.control = new zul.db.Datebox({
        id: controlid,
		cols: "12",
		format: "dd/MM/yyyy",
		mold: "rounded",
		onChange: function () {   
			self.changed();
			self.jwin.flush();			
		}
    });

    this.handle_change = false;
    this.set_properties(data);
}

Onion.widget.DateText.prototype.changed = function() {
    this.jwin.add_task("sync", "sync", this.controlid, {'value':this.control.getText()});
    if(this.handle_change) {
        this.jwin.add_task("event", "change", this.controlid);	
    }	
}

Onion.widget.DateText.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('value' in data) {
		this.control.setText(data.value);	
    }	
}

// register
Onion.widget.register("date", Onion.widget.DateText);
