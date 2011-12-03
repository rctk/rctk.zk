Onion.widget.Password = function(jwin, parent, controlid) {
    Onion.widget.Text.apply(this, arguments);
    this.name = "password";
}

Onion.widget.Password.prototype = new Onion.widget.Text();

Onion.widget.Password.prototype.create = function(data) {
    var controlid = "ctrl"+this.controlid;
    var self=this;    
    this.control = new zul.inp.Textbox({
        id: controlid, 	
		tabbable: "true",
		type: "password",
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

// register
Onion.widget.register("password", Onion.widget.Password);
