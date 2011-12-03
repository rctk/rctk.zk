Onion.widget.Control = function(jwin, parent, controlid) {
    this.cssclass = "control";
    this.name = "base";
    this.jwin = jwin;
    this.controlid = controlid;
    this.parent = parent;
    this.debug = false;
    this.busy = false;
    this.style = "";

    this.maxwidth = 0;
    this.maxheight = 0;
};

Onion.widget.Control.prototype.handle = function(type) {
    this["handle_"+type] = true;
};

Onion.widget.Control.prototype.set_properties = function(data) {
    if (data === undefined) {
        return;
    }
  
/*  // TODO: Dimitri
    if('enabled' in data) {
        if(data.enabled) { 
  //          this.control.removeAttr("disabled");
            this.control.setAttribute("disabled", 0);
        }
        else { 
            this.control.setAttribute("disabled", "disabled");        
//            this.control.attr("disabled", "disabled");
        }
    }
    */

    if ('visible' in data) {
        if (data.visible) {
            this.control.show();
        } else {
            this.control.hide();
        }
    }
    
    /*
    // handle base properties
    if ('debug' in data && data.debug !== undefined) {
        this.debug = data.debug;
    }
    */

    if ('css_class' in data && data.css_class) {
        this.control.setSclass(data.css_class);
    } 
    if ('width' in data && data.width) {
        this.width = data.width.toString();
        if (this.width.charAt(this.width.length-1) != 'px') {
            this.width = this.width + 'px'
        }
        else if (this.width.charAt(this.width.length-1) != '%') {
            this.width = this.width + 'px'
        }
        this.control.setWidth(this.width);
    }
    if ('height' in data && data.height) {
        this.height = data.height.toString();
        if (this.height.charAt(this.height.length-1) != 'px') {
            this.height = this.height + 'px'
        }
        else if (this.height.charAt(this.height.length-1) != '%') {
            this.height = this.height + 'px'
        }
        this.control.setHeight(this.height);        
    } 
    if ('foreground' in data && data.foreground) {
        this.style = this.style + "color: " + data.foreground +";";        
    }
    if ('background' in data && data.background) {
        this.style = this.style + "background: " + data.background +";";
    }    
    if ('font' in data) {
        for (property in data.font) {
            if (property == 'size') {
                //this.style = this.style + "font-size:" + data.font.size +";";
            } else {
                // e.g. font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif;
                //      font-weight:normal;
                //this.style = this.style + "font-" + property + ":" + data.font[property] +";";
            }
        }
    }
    if ('border' in data && data.border) {
        for (side in data.border) {
            for (property in data.border[side]) {
                if (property == 'width') {
                    //this.style = this.style + "border-" + side +" : " + data.border[side].width + "px solid;";
                } else {
                    //this.style = this.style + "border-" + side +" : " + data.border[side].width + "px solid;";                
                }
            }
        }
    }
    if ('margin' in data && data.margin) {
        for (side in data.margin) {
            // TODO: Dimitri
            //this.style = this.style + "margin-" + side ": " + data.margin[side] +"px;";
        }
    }
    if ('padding' in data && data.padding) {
        for (side in data.padding) {
            // TODO: Dimitri
            //this.style = this.style + "padding-" + side ": " + data.padding[side] +"px;";        
        }
    }
        
    this.control.setStyle(this.style);
    
};

Onion.widget.Control.prototype.create = function(data) {
    //var controlid = "ctrl"+this.controlid;
    //this.jwin.factory.append('<div id="' + controlid + '"></div>');
    //this.control = $("#"+controlid);
    zk.log("oooooooooooooooooooooops ");                        
    this.set_properties(data);
};

Onion.widget.Control.prototype.destroy = function() {
    this.control.remove();
};

Onion.widget.Control.prototype.max_size = function() {
    /*
     * return the maximum acceptable size that may be implicitly set 
     * (i.e. not actively by the user).
     * 0 means no restriction
     */
    return {width:this.maxwidth, height:this.maxheight}
};
/*
 * A container is a control that can contain controls, i.e. a window,
 * a layout manager. Its control may be different from its container
 * (i.e. a window, which has outer divs as decoration)
 */
Onion.widget.Container = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    // default layout manager
    this.layout = new Onion.layout.NewLayout(this.jwin, this);
};

Onion.widget.Container.prototype = new Onion.widget.Control();

Onion.widget.Container.prototype.create = function(data) {
    Onion.widget.Control.prototype.create.apply(this, arguments);
    this.container = this.control;
};

Onion.widget.Container.prototype.append = function(control, data) {
    this.layout.append(control, data);
};

Onion.widget.Container.prototype.remove = function(control, data) {
    this.layout.remove(control, data);
};

Onion.widget.Container.prototype.setLayout = function(type, config) {
    // unimplemented options:
    // hgap, vgap, resize (default true)
    var layout_class = Onion.layout.map(type);
    if (layout_class) {
        this.layout = new layout_class(this.jwin, this, config);
        this.layout.create();
    }
};

Onion.widget.Container.prototype.relayout = function(config) {
    this.layout.layout(config);
    this.layout_updated();
};

Onion.widget.Container.prototype.layout_updated = function() {};

Onion.widget.Container.prototype.resize = function(width, height) {
    this.container.setHeight(height);
    this.container.setWidth(width);
};

