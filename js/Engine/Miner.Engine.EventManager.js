var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};
Miner.Engine.EventManager = Miner.Engine.EventManager || Class.extend({
	'init': function(o) {
		o = o || {};
		this.game = o.game || {};
		
		return true;
	},
	
	'subscribe': function(keyCode, fn) {
		console.log("Subscribing " + keyCode);
	},
	
	'reset': function() {
		return true;
	}
});