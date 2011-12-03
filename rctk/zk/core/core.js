var rctk = rctk || {};

rctk.jquery = (function($) {
  // return a functions so we can create instances using new
  return function() {
    var core = null;
    var root = null;

    return {
        //root: $("#root"),

        run: function() {
            core = new rctk.core();
            core.handlers.request = rctk.util.proxy(this.rctk_request, this);
            core.handlers.construct = rctk.util.proxy(this.construct, this);
            root = new Onion.widget.Root(this);
            root.create();
            core.run(root);
        },
        rctk_request: function(path, callback, sessionid, data) {
            $.ajax({
                url:path,
                type: "POST",
                dataType: "json",
                data: data,
                headers: {"rctk-sid":sessionid},
                success: function(data, textStatus, jqXHR) {
                    callback(jqXHR.getResponseHeader('rctk-sid'), data);
                }
            });
        },
        construct: function(klass, parent, id) {
            var control_class = Onion.widget.map(klass);
            c = new control_class(this, parent, id);
            return c;
        },

        register_busy: function(c) {
            rctk.util.log("Deprecated jwin register_busy called");
            core.register_busy(c);
        },

        get_control: function(id) {
            rctk.util.log("Deprecated jwin get_control called");
            return core.get_control(id);
        },

        add_task: function(method, type, id, data) {
            rctk.util.log("Deprecated jwin add_task called");        
            core.push({'method':method, 'type':type, 'id':id, 'data':data});
        },

        flush: function() {
            // widgets call this to flush through self.jwin
            // completely replacing self.jwin with rctk.core not an option yet
            // due to busy registration
            rctk.util.log("Deprecated JWinClient.flush called");
            core.flush();
        },
        
        get_core: function() {
            // allow controls to access core this way, bypassing the obsole
            // jwin interface eventually
            return core;
        },
        
        get_root: function() {
            return root;
        },
    }
  }
})(jQuery);

