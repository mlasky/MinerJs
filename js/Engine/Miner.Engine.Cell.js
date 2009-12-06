var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Cell = Miner.Engine.Cell || Class.extend({
    'init': function(o) {
        o = o || {};
        this._bgImage = o.bgImage || null;  // bg for the cell
        this._blocking = o._blocking || false;             // blocks movement?
        this._hasPlayer = o._hasPlayer || false;            // Player present (connonical)
        this._soundMgr = o.soundMgr || {};  // Sound management object
        this._sounds = o.sounds || {};      // Sound effects for this cell
        this.grid = o.grid || {};           // Game grid object
        this._game = o.game || {};
        this.x = o.x || 0;
        this.y = o.y || 0;
        this.width = o.width || 16;
        this.height = o.height || 24;
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._hasPlayer;
    },

    'enter': function(player) {
        return this.registerPlayer(player);
    },

    'registerPlayer': function(player) {
        player = player || {};
        
        // sanity check, make sure we already don't have this player
        if (this.hasPlayer()) {
            return false;
        }
        
        if (typeof this.onPlayerEnter === 'function') {
            if (!this.onPlayerEnter(player)) {
                return false;
            }
        }
        
        player.position.cell.unregisterPlayer();
        player.position.cell = this;
        this._hasPlayer = true;
        
        return true;
    },

    'unregisterPlayer': function() {
        this._hasPlayer = false;
        this.player = null;
        return true;
    },

    'render': function(x,y) {
        this.render_x = x;
        this.render_y = y;
        
        var bgImage = this._bgImage;
        if (bgImage) {
            this._game.renderer.drawImg(bgImage,x,y);
        }
        
        return true;
    },

    '_playSound': function(sound_label) {
        if (typeof this._sounds[sound_label] === 'undefined') {
            return false;
        }
        this._soundMgr.play(this._sounds[sound_label]);
        return true;
    }
});

Miner.Engine.Cell.Air = Miner.Engine.Cell.Air || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        this.type = 'Air';
        
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },
    
    'onPlayerEnter': function(player) {
        // Player is approaching from the left or right
        return (player.game.grid.left(player.position.cell) === this ||
                player.game.grid.right(player.position.cell) === this) &&
                player.position.cell.y === this.y;
    },
    
    'enter': function(player) {
        return this._super(player);
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function(x,y) {
        return this._super(x,y);
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.Door = Miner.Engine.Cell.Door || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        this.type = 'Door';
         
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },

    'enter': function(player) {
        return this._super(player);
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function(x,y) {
        return this._super(x,y);
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.Dirt = Miner.Engine.Cell.Dirt || Miner.Engine.Cell.extend({
    'init': function(o) {
        o = o || {};
        this._super(o);
        
        this._bgImage = (Miner.Engine.Util.randomChance(2))?
            'images/dirt1.png':
            'images/dirt2.png';
        
        this.type = 'Dirt';
        this.dug = false;
        
        
        if (Miner.Engine.Util.randomChance()) {
            var rand = Miner.Engine.Util.random(100, 1000);
            if (rand <= 3) {
                this._modifier = 'Platinum';
            } 
            else if (rand <= 13) {
                this._modifier = 'Gold';
            }
            else if (rand <= 45) {
                this._modifier = 'Silver';
            }
            else if (rand <= 60) {
                this._modifier = 'CaveIn';
            }
            else if (rand <= 65) {
                this._modifier = 'Water';
            }
            else if (rand <= 70) {
                this._modifier = 'WhirlPool';
            }
            else {
                this._modifier = 'Granite';
            }
        }
        o.modifier = o.modifier || false;
        this._modifier = o.modifier || this._modifier;
        
        if (this._modifier) {
            this._loadModifier(this._modifier);
        }
        
        return this;
    },
    
    '_loadModifier': function(modifier) {
        var modifiers = Miner.Engine.Data.cellData || {};
        modifier = modifiers[modifier];
        if (typeof modifier.onPlayerEnter === 'function') {
            this.onPlayerEnter = modifier.onPlayerEnter;
        }
        
        this._bgImage = modifier.bgImage || this._bgImage;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },
    
    'onPlayerEnter': function(player) {
        if (!(player.position.cell.y === this.y ||
            player.position.cell.x === this.x)) 
        {
            return false;
        }
        this.dug = true;
        this._bgImage = 'images/dug.png';
        return true;
    },

    'enter': function(player) {
        return this._super(player);
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function(x,y) {
        return this._super(x,y);
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.Tunnel = Miner.Engine.Cell.Tunnel || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        this.type = 'Tunnel';
        
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },

    'enter': function(player) {
        return this._super(player);
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function(x,y) {
        return this._super(x,y);
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.Elevator = Miner.Engine.Cell.Elevator || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        
        if (this.grid.up(this).type !== 'Air') {
            this._bgImage = 'images/elevator.png';
        }
        
        this.hasCar = o.hasCar || false;
        this.type = 'Elevator';
        
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },

    'enter': function(player) {
        return this._super(player);
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function(x,y) {
        return this._super(x,y);
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.ElevatorCar = Miner.Engine.Cell.ElevatorCar || Miner.Engine.Cell.extend({
    'init': function(o) {
        o.hasCar = true;
        return new Miner.Engine.Cell.Elevator(o);
    }
});

Miner.Engine.Cell.Road = Miner.Engine.Cell.Road || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        this._bgImage = 'images/divider.png';
        
        this.type = 'Road';
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },
    
    'onPlayerEnter': function(player) {
        return false;
    },

    'enter': function(player) {
        return this._super(player);
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function(x,y) {
        return this._super(x,y);
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});