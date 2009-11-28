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
        this._reset();
        return this._showTitle();
    },

    '_showTitle': function() {
        var data = this._data;
        if (!this._renderer.showScreen(data.screenData['title'])) {
            return false;
        }

        return true;
    },
    
    'gameMain': function(bindEvents) {
        bindEvents = bindEvents || false;
        
        if (bindEvents) {
            this._events.subscribe('Left', function(e) {
                this._player.moveLeft();
                return this.gameMain();
            });

            this._events.subscribe('Right', function(e) {
                this._player.moveRight();
                return this.gameMain();
            });

            this._events.subscribe('Up', function(e) {
                this._player.moveUp();
                return this.gameMain();
            });

            this._events.subscribe('Down', function(e) {
                this._player.moveDown();
                return this.gameMain();
            });

            this._events.subscribe('x', function(e) {
                return this._showCredits();
            });
        }
        
        if (!this._renderer.renderGame()) {
            return false;
        }
        
        return true;
    },
    
    '_showCredits': function() {
        var data = this._data;
        if (!this._renderer.showScreen(data.screenData['credits'])) {
            return false;
        }
        
        return true;
    },
    
    '_reset': function() {
        if (!this._events.reset()) {
            return false;
        }
        return true;
    }
});