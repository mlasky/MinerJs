var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};
Miner.Engine.EventManager = Miner.Engine.EventManager || Class.extend({
	'init': function(o) {
	    var self = this;
		o = o || {};
		this.game = o.game || {};
		this._data = Miner.Engine.Data;
		$(document).keydown(function (key) {
		    self._dispatch(key.keyCode);
        });
        
        return true;
	},
	
	'subscribe': function(strKeyCode, fn) {
	    
	    this._events = this._events || {};
	    if (!(strKeyCode in this._events)) {
	        keyCode = String(this._data.keyCodes[strKeyCode]);
	        this._events[keyCode] = [];
	    }
	    this._events[keyCode].push(fn);
	    
	    return true;
	},
	
	'_dispatch': function(keyCode) {
	    if (keyCode in this._events) {
	        var events = this._events[keyCode];
	        var len_events = events.length;
	        for (var i = 0; i < len_events; i++) {
	            var event = events[i];
	            if (typeof event === 'function') {
	                event(this.game);
	            }
	        }
	    }
	},
	
	'reset': function() {
		return true;
	},
	
    'getKey': function(key) {
        if ( key == null ) {
            keycode = event.keyCode;
        } 
        else {
            keycode = key.keyCode;
        }
        // Return the key in lower case form
        return String.fromCharCode(keycode).toLowerCase();
    }
});