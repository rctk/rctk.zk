/*
 * The vlayout component is a simple vertical oriented layout. 
 * Added components will be placed underneath each other in a column.
 * Notice that hlayout and vlayout do not support splitter, alignment and packing.
 * Member functions are called in this order:
 * 1) create
 * 2) append, called for all child components to be appended to grid
 * 3) layout
 */


Onion.layout.VBox = function(jwin, parent, config) {
    Onion.layout.Layout.apply(this, arguments);
    config = config?config:{};
}

Onion.layout.VBox.prototype = new Onion.layout.Layout();

Onion.layout.VBox.prototype.create = function() {
    if(this.created) {
        return;
    }
    
    this.layoutcontrol = new zul.box.Vlayout;
    this.parent.container.appendChild(this.layoutcontrol);

    this.created = true;
    this.currRow = 0;
    this.children = [];
    
    //spacing - the spacing (such as "0", "5px", "3pt" or "1em"), or null to use the default spacing. 
    // If the spacing is set to "auto", the DOM style is left intact, so the spacing can be customized from CSS.
    //this.layoutcontrol.setSpacing()
}

Onion.layout.VBox.prototype.append = function(control, data) {
    this.create();    
    this.children.push(control.control);
    control.containingparent = this.parent;
}

Onion.layout.VBox.prototype.initialize = function(config) {
    this.create();
    this.rows = config.size[0];
    this.columns = config.size[1];

    this.cols = new zul.grid.Columns();
    this.layoutcontrol.appendChild(this.cols);
    for(var c=0; c < this.columns; c++) {
        var p = new zul.grid.Column();
        this.cols.appendChild(p);
    }
    var rws = new zul.grid.Rows();
    this.layoutcontrol.appendChild(rws);
    for(var r=0; r < this.rows; r++) {
        rws.appendChild(new zul.grid.Row());
    }

    // avoid duplicates
    this.children = [];
    for(var i=0; i < config.cells.length; i++) {
        var c = config.cells[i];
        var control = this.jwin.get_control(c.controlid);
        var info = {id:c.controlid, control:control, row:c.row, column:c.column, rowspan:c.rowspan, colspan:c.colspan};
        /* TODO: Dimitri
        info.padx = 'padx' in c? c.padx: this.padx;
        info.ipadx = 'ipadx' in c? c.ipadx: this.ipadx;
        info.pady = 'pady' in c? c.pady: this.pady;
        info.ipady = 'ipady' in c? c.ipady: this.ipady;
        info.static = 'static' in c? c.static: this.static;
        info.sticky = 'sticky' in c? c.sticky.toLowerCase(): this.sticky;
        */
        this.children.push(info);
    }
    
    var rowitr = this.layoutcontrol.getBodyWidgetIterator();
    while (rowitr.hasNext()) {
        var rowspan = "";
        var row = rowitr.next();
        for(var r=0; r < this.columns; r++) {
            this.children.reverse();
            if (this.children.length) {
                var info = this.children.pop();
                var cell = new zul.wgt.Cell();
                cell.appendChild(info.control.control); 
                cell.setColspan(info.colspan);
                cell.setRowspan(info.rowspan);
                cell.setAlign("center");
                cell.setValign("center");
                row.appendChild(cell);  
            }
        }      
    }
    
    /* TODO: Dimitri
    if('options' in config) {
        var options = config.options;
        if('padx' in options) {
            this.padx = options.padx;
        }
        if('pady' in options) {
            this.pady = options.pady;
        }
        if('ipadx' in options) {
            this.ipadx = options.ipadx;
        }
        if('ipady' in options) {
            this.ipady = options.ipady;
        }
        if('static' in options) {
            this.static = options.static;
        }
        if('sticky' in options) {
            this.sticky = options.sticky.toLowerCase();
        }
    }

    // avoid duplicates
    this.children = [];
    for(var i=0; i < config.cells.length; i++) {
        var c = config.cells[i];
        var control = this.jwin.get_control(c.controlid);
        var info = {id:c.controlid, control:control, row:c.row, column:c.column, rowspan:c.rowspan, colspan:c.colspan};
        info.padx = 'padx' in c? c.padx: this.padx;
        info.ipadx = 'ipadx' in c? c.ipadx: this.ipadx;
        info.pady = 'pady' in c? c.pady: this.pady;
        info.ipady = 'ipady' in c? c.ipady: this.ipady;
        info.static = 'static' in c? c.static: this.static;
        info.sticky = 'sticky' in c? c.sticky.toLowerCase(): this.sticky;

        this.children.push(info);
    }
    */
}

Onion.layout.VBox.prototype.layout = function(config) {
    this.initialize(config);
}

Onion.layout.register('vbox', Onion.layout.VBox);

