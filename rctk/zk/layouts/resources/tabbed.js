Onion.layout.Tabbed = function(jwin, parent, config) {
    Onion.layout.Layout.apply(this, arguments);
    this.controls = [];
}

Onion.layout.Tabbed.prototype = new Onion.layout.Layout();

Onion.layout.Tabbed.prototype.create = function() {
    if(this.created) {
        return;
    }

    this.tabs = new zul.tab.Tabs();
	this.panels = new zul.tab.Tabpanels();
    
    this.layoutcontrol = new zul.tab.Tabbox({
		id: "layoutmgr" + this.parent.controlid,
		//vflex: "true", // grow the tabbox to fit the rest of the space
		//hflex: "1", 
		//height: "100%",
		//sizedByContent: "true",
        children: [   
			this.tabs,
			this.panels			
        ]
    });
	
    this.layoutcontrol.setSclass("nav_tabs");
    this.parent.container.appendChild(this.layoutcontrol);    
    this.created = true;
};

Onion.layout.Tabbed.prototype.append = function(control, data) {
    this.create();

	var tab = new zul.tab.Tab({
		id: "layoutctr" + control.controlid, 
		label: data.title});		
	this.tabs.appendChild(tab);

	var panel = new zul.tab.Tabpanel({
		//vflex: "true"
		height: "100%"
	});
	this.panels.appendChild(panel);
	panel.appendChild(control.control);
    control.containingparent = this.parent;	
    this.controls.push(control);
};

Onion.layout.Tabbed.prototype.layout = function() {
	var tab = this.tabs.firstChild;
	if (tab) {
		tab.setSelected(true);
	}
};

Onion.layout.register('tabbed', Onion.layout.Tabbed);
