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
		
        this.renderer = new Miner.Engine.Renderer({
            'game': this,
            'canvas': this._config.canvas,
            'grid': this.grid
        });
        
        this._player = new Miner.Game.Player({
            'game': this
        });
        
        this._start();
        return this;
    },
    
    '_start': function() {
        this.reset();
        this.renderer.render();
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
        var self = this;
        
        if (bindEvents) {
            this._events.subscribe('Left', function(game) {
                self._player.moveLeft();
                return game.gameMain();
            });

            this._events.subscribe('Right', function(game) {
                self._player.moveRight();
                return game.gameMain();
            });

            this._events.subscribe('Up', function(game) {
                self._player.moveUp();
                return game.gameMain();
            });

            this._events.subscribe('Down', function(game) {
                self._player.moveDown();
                return game.gameMain();
            });

            this._events.subscribe('x', function(game) {
                return game.showCredits();
            });
        }
        
        if (!this.renderGame()) {
            return false;
        }
        
        return true;
    },
    
    'renderGame': function() {
	    this.renderer.renderBg('images/base_bg.png');
	    this.grid.render(16, 24, 40, 17);
	    this._player.render();
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
	            console.log('failed subscribe')
	            return false;
	        }
	    }
	    
	    if (!this.renderer.renderBg(screen.bgImage)) {
	        console.log('failed renderBg')
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