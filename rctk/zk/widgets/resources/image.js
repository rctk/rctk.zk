Onion.widget.Image = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
}

Onion.widget.Image.prototype = new Onion.widget.Control();

Onion.widget.Image.prototype.create = function(data) {   
    var controlid = "ctrl" + this.controlid;
	var self=this;
    this.control = new zul.wgt.Image({
        id: controlid,
    });
	
    this.set_properties(data);
}

Onion.widget.Image.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('resource' in data && data.resource) {
		this.control.setSrc("resources/"+data.resource);
    }
    if('url' in data && data.url) {
		this.control.setSrc(data.url);	
    }
    if ('title' in data) {
		this.control.setTooltip(data.title);	
    }
}

// register
Onion.widget.register("image", Onion.widget.Image);
