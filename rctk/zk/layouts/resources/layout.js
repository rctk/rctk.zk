Onion.layout.Layout = function(jwin, parent, config) {
    this.jwin = jwin;
    this.parent = parent;
    this.config = config
    this.created = false;
}

Onion.layout.Layout.prototype.create = function() {
    if(this.created) {
        return;
    }
    zk.log("layout create 1 ");
    this.parent.container.append("<div id='layoutmgr" + this.parent.controlid + "'></div>");
    this.layoutcontrol = $("#layoutmgr" + this.parent.controlid);
    this.layoutcontrol.layout(this.config);
    this.created = true;
}

Onion.layout.Layout.prototype.append = function(control, options) {
    this.create();

    this.layoutcontrol.appendChild(control.control);
    //control.control.appendTo(this.layoutcontrol);
    control.containingparent = this.parent;
    //this.layoutcontrol.layout(this.config);
}

Onion.layout.Layout.prototype.remove = function(control, options) {
    var factory = $("#factory");
    control.control.appendTo(factory);
    control.containingparent = null;
}
