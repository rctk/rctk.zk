/*


*/

Onion.widget.Grid = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.items = [];
    this.name = "grid";
}

Onion.widget.Grid.prototype = new Onion.widget.Control();

Onion.widget.Grid.prototype.create = function(data) {
    var controlid = "ctrl"+this.controlid;
    this.container = new zul.grid.Grid({sizedByContent: "true"});
	//this.container.setSclass("gridcolumn");	
    this.container.setId(controlid);
    this.control = this.container;
    
	this.colModel = data.colModel;
    this.cols = new zul.grid.Columns();
    this.container.appendChild(this.cols);
    for(var c=0; c < data.colNames.length; c++) {
		var m = data.colModel[c];
        var p = new zul.grid.Column({label: data.colNames[c]});
		p.setSclass("GridColumnStyle");	
		if('width' in m && m.width) {
			p.setHflex("min");			
		}    
		else {
			p.setHflex("min");			
		}    
		
		if('align' in m && m.align) {
			p.setAlign(m.align);			
		}    
			
        this.cols.appendChild(p);
    }    
	
    this.rws = new zul.grid.Rows();
    this.container.appendChild(this.rws);	
	
	this.rowsids = {};	
}

Onion.widget.Grid.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if(data && 'addrow' in data) {
		var row = new zul.grid.Row({
			id: data.addrow.id,
			sclass: "GridRowStyle"									
		});

		for (var c = 0; c < this.colModel.length; c++) {
			var name = this.colModel[c].name;
			var type = this.colModel[c].sorttype;
			var format = this.colModel[c].datefmt;	
			if (type == "int") {
				row.appendChild(
					new zul.inp.Intbox({
						value: data.addrow.data[name],
						inplace: "true",
						//format: "#,##0",
						format: format,
						hflex: "1",						
						style: "margin-left: 0; margin-right: 10;"
					}));
			}
			else if (type == "float") {
				row.appendChild(
					new zul.inp.Decimalbox({
						value: data.addrow.data[name],
						inplace: "true",
						//format: "#,##0.##",
						format: format,						
						hflex: "1",
						style: "margin-left: 0; margin-right: 10;"						
					}));
			}
			else if (type == "date") {
				row.appendChild(new zul.wgt.Label({value: data.addrow.data[name]}));
				/*row.appendChild(
				    new zul.db.Datebox({
				        id: controlid,
						cols: "12",
						format: "dd/MM/yyyy",
						mold: "rounded",
						text: data.addrow.data[name]				
					}));	
				*/
			}
			else if (type == "text") {
				row.appendChild(new zul.wgt.Label({value: data.addrow.data[name], inplace: "true"}));
			}	
		}

		if (data.addrow.position == "last") {
			this.rws.appendChild(row);
			this.rowsids[data.addrow.id] = row;
		}
		else if (data.addrow.position == "before") {
			var srcrow = this.rowsids[data.addrow.srcrowid];
			if (srcrow) this.rws.insertBefore(row, srcrow); 
		}
		else if (data.addrow.position == "after") {
			var srcrow = this.rowsids[data.addrow.srcrowid];	
			if (srcrow) {
				srcrow = srcrow.nextSibling;
				if (srcrow) {
					this.rws.insertBefore(row, srcrow); 
				}
				else {
					this.rws.appendChild(row);			
				}
			}
		}
    }
    if('clear' in data && data.clear) {
        this.rws.clear(); 
    }
}

// register
Onion.widget.register("grid", Onion.widget.Grid);
