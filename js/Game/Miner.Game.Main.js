var Miner = Miner || {};
Miner.Game = Miner.Game || {};

Miner.Game.Main = Miner.Game.Main || Class.extend({
    'init': function(o) {
        this._config = {
            'canvas': o.canvas || {},
            'map': o.map || {}
        };
        
        this._data = Miner.Game.Data;
        
        this.grid = new Miner.Engine.Grid({
            'game': this,
            'map': this._config.map
        });
        
		this._events = new Miner.Engine.EventManager({
			'game': this
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
        this.reset();
        return this.showTitle();
    },

    'showTitle': function() {
        var data = this._data;
        if (!this._showScreen(data.screenData['title'])) {
            return false;
        }

        return true;
    },
    
    'gameMain': function(bindEvents) {
        bindEvents = bindEvents || false;
        
        if (bindEvents) {
            this._events.subscribe('Left', function(game) {
                this._player.moveLeft();
                return game.gameMain();
            });

            this._events.subscribe('Right', function(game) {
                this._player.moveRight();
                return game.gameMain();
            });

            this._events.subscribe('Up', function(game) {
                this._player.moveUp();
                return game.gameMain();
            });

            this._events.subscribe('Down', function(game) {
                this._player.moveDown();
                return game.gameMain();
            });

            this._events.subscribe('x', function(game) {
                return game.showCredits();
            });
        }
        
        if (!this._renderer.renderGame()) {
            return false;
        }
        
        return true;
    },
    
    'showCredits': function() {
        var data = this._data;
        if (!this._showScreen(data.screenData['credits'])) {
            return false;
        }
        
        return true;
    },
    
    '_showScreen': function(screen) {
	    screen = screen || {};
	    var bindings = screen.bindings || {};
	    
	    for (var k in bindings) {
	        if (!this._events.subscribe(k, bindings[k])) {
	            return false;
	        }
	    }
	    
	    if (!this._renderer.renderBg(screen.bgImage)) {
	        return false;
	    }
	    
		return true;
	},
    
    'reset': function() {
        if (!this._events.reset()) {
            return false;
        }
        return true;
    }
});