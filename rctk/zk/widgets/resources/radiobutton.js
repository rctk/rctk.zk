Onion.widget.Root.prototype.getRadioGroup = function (name) {
	if (this.radiogroups == undefined) {
		this.radiogroups = new Array();
	}
	var radiogroup = this.radiogroups[name];
	if (radiogroup == undefined) {                
		radiogroup = new zul.wgt.Radiogroup();
		this.radiogroups[name] = radiogroup;
	}

	return radiogroup;
};


Onion.widget.RadioButton = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.name = "radiobutton";
}

Onion.widget.RadioButton.prototype = new Onion.widget.Control();

Onion.widget.RadioButton.prototype.create = function(data) {
    var controlid = "ctrl" + this.controlid;
	var self=this;
    this.control = new zul.wgt.Radio({
        id: controlid,
		onCheck: function () {        
			self.changed();
			self.jwin.flush();			
		}
    });
	this.root = self.jwin.get_root();
    this.handle_click = false;
    this.set_properties(data);
}

Onion.widget.RadioButton.prototype.changed = function() {
    this.jwin.add_task("sync", "sync", this.controlid, {'checked':this.control.isChecked()});

    if(this.handle_click) {
        if(!this.busy) {
            this.jwin.add_task("event", "click", this.controlid);
            this.jwin.register_busy(this);
        }
    }
}

Onion.widget.RadioButton.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('checked' in data) {
        if(data.checked) {
			this.control.setChecked(true);
        } 
        else {
			this.control.setChecked(false);		
        }
    }
    if('group' in data && data.group) {
		var radiogroup = this.root.getRadioGroup(data.group);
		this.control.setRadiogroup(radiogroup);
    }
    if('text' in data) {
		this.control.setLabel(data.text);		
    }    
};

// register
Onion.widget.register("radiobutton", Onion.widget.RadioButton);
