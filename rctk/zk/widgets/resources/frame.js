/* 
Position:
	center
		Position the window at the center. Widget.setTop(_global_.String) and Widget.setLeft(_global_.String) are both ignored.
	left
		Position the window at the left edge. Widget.setLeft(_global_.String) is ignored.
	right
		Position the window at the right edge. Widget.setLeft(_global_.String) is ignored.
	top
		Position the window at the top edge. Widget.setTop(_global_.String) is ignored.
	bottom
		Position the window at the bottom edge. Widget.setTop(_global_.String) is ignored.
	parent
		Position the window relative to its parent. That is, the left and top (Widget.getTop() and Widget.getLeft()) is an offset to his parent's let-top corner.
	For example, "left,center" means to position it at the center of the left edge.
	
Modal:
	true	
		Makes this window as a modal dialog. It will automatically center the window
	false
		Makes this window as overlapped with other components.	
*/

Onion.widget.Frame = function(jwin, parent, controlid) {
    Onion.widget.Container.apply(this, arguments);
    this.name = "frame";
}

Onion.widget.Frame.prototype = new Onion.widget.Container();

Onion.widget.Frame.prototype.create = function(data) {
    var controlid = "ctrl"+this.controlid;

    // possibly request position, (open) state from the WindowManager
    var config = {'autoOpen':false, 'modal':false, 'resize':false, 'position':'top'};
    var self=this;
    this.control = new zul.wnd.Window({
		id: controlid,
		title: data.title,
		border: 'normal',
		//width: "500px",
		onClose: function () {        
	        self.closed();
	        self.jwin.flush();
		}
	});   
		
	this.control.setClosable(true); 
	this.control.setPosition(config.position);
	this.control.setSizable(config.resize);

    this.container = this.control;
	this.parent = self.jwin.get_root().toproot;
	
    this.set_properties(data);	
};

Onion.widget.Frame.prototype.closed = function() {
    this.jwin.add_task("sync", "sync", this.controlid, {'opened':false});
    if(this.handle_close) {
        this.jwin.add_task("event", "close", this.controlid);
    }
};

Onion.widget.Frame.prototype.set_properties = function(data) {
    Onion.widget.Container.prototype.set_properties.apply(this, arguments);
    if('opened' in data) {
        if(data.opened) {
			this.parent.appendChild(this.container);		
        }
        else {
			this.container.detach();
        }
    }
    if('title' in data && data.title) {
		this.container.setTitle(data.title);
    }
    if('modal' in data) {
		if (data.modal)
			this.container.doModal();
		else
			this.container.doOverlapped();
    }
    if('resizable' in data) {
		this.container.setSizable(data.resizable);	
    }
    if('position' in data && data.position) {
		this.container.setPosition(data.position);	
    }	
};

Onion.widget.Frame.prototype.resize = function(width, height) {
    this.container.dialog({width:width, height: height});
    //this.container.dialog({minWidth:width, minHeight: height});
};

Onion.widget.register("window", Onion.widget.Frame);
