Onion.widget.StaticText = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.name = "statichtml";
}

Onion.widget.StaticText.prototype = new Onion.widget.Control();

Onion.widget.StaticText.prototype.create = function(data) {
    this.control = new zul.wgt.Label({value: data.text});
    this.set_properties(data);  
	
	/* Pre, Hyphen, Maxlength and Multiline
	pre		multiline	maxlenth	Description
	true	any			any			All white spaces are preserved, including new lines, spaces and tabs.
	false	true		any			New lines are preserved.
	false	false		positive	The label only show its value up to the length of "maxlength".
	false	false		0			The label is displayed regularly.
	*/
    if('wrap' in data) {
        if(data.wrap) {
			this.control.setPre(true);
			this.control.setMultiline(true);
        }
        else {
			this.control.setPre(false);
			this.control.setMultiline(false);		
        }
    }
	
    var style = "";	
    if('bold' in data) {
        if(data.bold) {
            style = style + " font-weight:bold;";
        }
        else {
            style = style + " font-weight:normal;";        
        }
    }
    if('italic' in data) {
        if(data.italic) {
            style = style + " font-style: italic;";
        }
        else {
            style = style + " font-style: normal;";
        }
    }

    if('decoration' in data) {
        if(data.decoration == "underline") {
            style = style + " text-decoration: underline;";
        }
        else if(data.decoration == "overstrike") {
            style = style + " text-decoration: line-through;";        
        }
        else {
            style = style + " text-decoration: none;";                
        }
    }
	
    this.control.setStyle(this.control.getStyle() + style);
}

Onion.widget.StaticText.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('text' in data) {
        this.control.setValue(data.text);
		
        // Respect width/height settings.
        if(this.width) {
            this.control.setWidth(this.width);
        }
        //else if(this.maxwidth && this.control.width() > this.maxwidth) {
        //    this.control.width(this.maxwidth + "px"); 
       // }
       // if(this.height) {
       //     this.control.height(this.height + "px");
       // }
       // else if(this.maxheight && this.control.height() > this.maxheight) {
       //     this.control.height(this.maxheight + "px"); 
       // }
    }
}


////////////////////////////////////////////////////////////////

Onion.widget.StaticHTMLText = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.name = "statichtmltext";
}

Onion.widget.StaticHTMLText.prototype = new Onion.widget.Control();

Onion.widget.StaticHTMLText.prototype.create = function(data) {

    this.control = new zul.wgt.Html();
    this.set_properties(data);          
}

Onion.widget.StaticHTMLText.prototype.set_properties = function(data) {
    //Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('text' in data) {
        //this.control.setContent("<html><![CDATA[<body>"+data.text+"</body>]]></html>");
		this.control.setContent(data.text);
    }
}


////////////////////////////////////////////////////////////////

Onion.widget.register("statictext", Onion.widget.StaticText);
Onion.widget.register("statichtmltext", Onion.widget.StaticHTMLText);
