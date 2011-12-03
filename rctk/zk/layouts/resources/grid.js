/*
 * Grid Layout uses a Grid component without borders.
 * 
 * Member functions are called in this order:
 * 1) create
 * 2) append, called for all child components to be appended to grid
 * 3) layout
 * 
 * http://books.zkoss.org/wiki/ZK_Developer's_Reference/UI_Patterns/Grid's_Columns_and_Hflex
 */


Onion.layout.NewLayout = function(jwin, parent, config) {
    Onion.layout.Layout.apply(this, arguments);
    config = config?config:{};
}

Onion.layout.NewLayout.prototype = new Onion.layout.Layout();

Onion.layout.NewLayout.prototype.create = function() {
    if(this.created) {
        return;
    }
    
    this.layoutcontrol = new zul.grid.Grid({
        border:"normal",
        //height: "100%"
        //vflex: "true",
        //style: "overflow: auto;"
        //sizedByContent: "true",
        //hflex: "min"
    });
    this.layoutcontrol.setSclass("GridLayoutNoBorder");
    this.parent.container.appendChild(this.layoutcontrol);
    this.created = true;
    this.currRow = 0;
    this.children = [];

    // Sticky -- Align translation
    this.valignment = [];
    this.halignment = [];    
    this.valignment["n"] = "top";     
    this.halignment["e"] = "right";         
    this.valignment["s"] = "bottom";             
    this.halignment["w"] = "left";                 
    this.sticky = "center"; // default stickyness
    //this.sticky = undefined; // default stickyness
    
    /* TODO: Dimitri
    this.static = false; // no fixed cell size; scale rows/cols nicely
    this.padx = 0;
    this.pady = 0;
    this.ipadx = 0;
    this.ipady = 0;
    */
}

Onion.layout.NewLayout.prototype.append = function(control, data) {
    this.create();    
    this.children.push(control.control);
    control.containingparent = this.parent;
}

Onion.layout.NewLayout.prototype.initialize = function(config) {
    zk.light='1.0.0-RC';
    zk.zkuery='1.0.1';
    zk.spaceless=true;
    zAu={};
    zk.feature={standard:true};

    this.create();
    
    this.rows = config.size[0];    
    this.columns = config.size[1];    
    this.layoutcontrol.clear();
        
    this.cols = new zul.grid.Columns();
    this.layoutcontrol.appendChild(this.cols);
    for(var c=0; c < this.columns; c++) {
        var p = new zul.grid.Column(/*{hflex: "min"}*/);
        this.cols.appendChild(p);
    }
    var rws = new zul.grid.Rows();
    this.layoutcontrol.appendChild(rws);
    for(var r=0; r < this.rows; r++) {
        rws.appendChild(new zul.grid.Row());
    }        

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
    this.children = new Array();
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
        */
        
        info.sticky = 'sticky' in c ? c.sticky.toLowerCase() : this.sticky;
        this.children[info.row + "_" + info.column] = info;
    }
    
    var row_nr = 0;
    var rowitr = this.layoutcontrol.getBodyWidgetIterator();
    while (rowitr.hasNext()) {
        var rowspan = "";
        var row = rowitr.next();
        for(var c=0; c < this.columns; c++) {
            var info = this.children[row_nr + "_" + c];
            if (info) {                
                var cell = new zul.wgt.Cell();
                cell.appendChild(info.control.control); 
                
                cell.setColspan(info.colspan);
                cell.setRowspan(info.rowspan);

                if (info.sticky && info.sticky=="center") {
                    //cell.setAlign("center");
                    cell.setValign("center");                    
                }
                else if (info.sticky) {
                    var a = info.sticky.split('');
                    if (this.valignment[a[0]]) {
                        cell.setValign(this.valignment[a[0]]);                                        
                    }
                    else if (this.halignment[a[0]]) {
                        cell.setAlign(this.halignment[a[0]]);                                        
                    }
                    if (a.length > 1) {
                        if (this.valignment[a[1]]) {
                            cell.setValign(this.valignment[a[1]]);                                        
                        }
                        else if (this.halignment[a[1]]) {
                            cell.setAlign(this.halignment[a[1]]);                                        
                        }                    
                    }
                }
                row.appendChild(cell);  
            }
        } 
        row_nr++;
    }    
}

Onion.layout.NewLayout.prototype.layout = function(config) {
    this.initialize(config);
}

Onion.layout.register('new', Onion.layout.NewLayout);

