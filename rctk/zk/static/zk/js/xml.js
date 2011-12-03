(function(){zk._p=zkpi('zk.xml',true);try{




zk.xml.Utl = {
	
	loadXML: function (url, callback) {
		var doc = document.implementation;
		if (doc && doc.createDocument) {
			doc = doc.createDocument('', '', null); 
			if (callback)
				doc.onload = function () {callback(doc);};
		} else {
			doc = new ActiveXObject("Microsoft.XMLDOM");
			if (callback)
				doc.onreadystatechange = function() {
					if (doc.readyState == 4) callback(doc);
				};
		}
		if (!callback) doc.async = false;
		doc.load(url);
		return doc;
	},
	
	parseXML: function (text) {
		if (typeof DOMParser != "undefined")
			return (new DOMParser()).parseFromString(text, "text/xml");
			
	
		doc = new ActiveXObject("Microsoft.XMLDOM"); 
		doc.async = false;
		doc.loadXML(text);
		return doc;
	},
	
	renType: function (url, type) {
		var j = url.lastIndexOf(';');
		var suffix;
		if (j >= 0) {
			suffix = url.substring(j);
			url = url.substring(0, j);
		} else
			suffix = "";

		j = url.lastIndexOf('.');
		if (j < 0) j = url.length; 
		var	k = url.lastIndexOf('-'),
			m = url.lastIndexOf('/'),
			ext = j <= m ? "": url.substring(j),
			pref = k <= m ? j <= m ? url: url.substring(0, j): url.substring(0, k);
		if (type) type = "-" + type;
		else type = "";
		return pref + type + ext + suffix;
	},

	
	getElementValue: function (el) {
		var txt = "";
		for (el = el.firstChild; el; el = el.nextSibling)
			if (el.data) txt += el.data;
		return txt;
	}
};

}finally{zk.setLoaded(zk._p.n);}})();