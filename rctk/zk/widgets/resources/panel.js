/*
 * A panel is a simple container-control. Mostly used to
 * nest layoutmanagers. 
 */
  

Onion.widget.Panel = function(jwin, parent, controlid) {
    Onion.widget.Container.apply(this, arguments);
    this.name = "panel";	
}

Onion.widget.Panel.prototype = new Onion.widget.Container();

Onion.widget.Panel.prototype.create = function(data) {
    var controlid = "ctrl"+this.controlid;
    var self=this;
    this.control = new zul.wnd.Window({
		id: controlid,
		border: 'none',
		//vflex: "true"
		//height: "100%"
	});   
			
    this.container = this.control;	
    this.set_properties(data);	
};

Onion.widget.Panel.prototype.set_properties = function(data) {
    Onion.widget.Container.prototype.set_properties.apply(this, arguments);
    if('title' in data && data.title) {
		this.container.setTitle(data.title);
    }

    if(data.scrolling) {
		this.control.setStyle(this.control.getStyle()+"overflow: auto;");
        this.scrolling = true;
    }
    else {
		this.control.setStyle(this.control.getStyle()+"overflow: none;");	
        this.scrolling = false;
    }	
};


Onion.widget.register("panel", Onion.widget.Panel);


