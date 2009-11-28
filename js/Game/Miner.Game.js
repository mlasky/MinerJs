var Miner = Miner || {};
Miner.Game = Miner.Game || {};

Miner.Game.Main = Miner.Game.Main || Class.extend({
    'init': function(o) {
        this._config = {
            'canvas': o.canvas || {},
            'map': o.map || {}
        };
        
        this._grid = new Miner.Engine.Grid({
            'game': this,
            'map': this._config.map
        });
        
        this._renderer = new Miner.Engine.Renderer({
            'game': this,
            'canvas': this._config.canvas,
            'grid': this._grid
        });
        
        this._start();
        
        return this;
    },
    
    '_start': function() {
        this._reset();
        this._showTitle();
    },

    '_showTitle': function() {
        return true;
    },
    
    '_reset': function() {
        return true;
    }
});