Onion.widget.Button = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.name = "button";
}

Onion.widget.Button.prototype = new Onion.widget.Control();

Onion.widget.Button.prototype.create = function(data) {
    var controlid = "ctrl"+this.controlid;
	
    var self=this;	
    this.control = new zul.wgt.Button({
        id: controlid,
		label: data.text,
		onClick: function () {        
			// being busy means we've been clicked and the handler
	        // is still busy handling. Don't accept clicks untill
		    // it's finished.
		    if(!self.busy) {
			    self.clicked(); 
			    self.jwin.flush(); 
			    self.jwin.register_busy(self);
			}
			else {
			    rctk.util.log("Control busy", self);
			}		
		}
    });

    this.handle_click = false;
	
    this.set_properties(data);
}

Onion.widget.Button.prototype.clicked = function() {
    if(this.handle_click) {
        this.jwin.add_task("event", "click", this.controlid);
    }
}

Onion.widget.Button.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('text' in data) {
        this.control.setLabel(data.text);
    }
}

// register
Onion.widget.register("button", Onion.widget.Button);



