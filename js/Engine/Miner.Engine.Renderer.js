var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Renderer = Miner.Engine.Renderer || Class.extend({
    'init': function(o) {
        o = o || {};
        this._canvas = o.canvas || {};
        this._ctx = this._canvas.getContext("2d");
		
		return this;
    },
	
	'getCtx': function() { return this._ctx; },
	
	'showScreen': function(screen) {
		return true;
	}
});