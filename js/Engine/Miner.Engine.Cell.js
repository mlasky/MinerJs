var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Cell = Miner.Engine.Cell || Class.extend({
    'init': function(o) {
        o = o || {};
        this._bgImage = o.bgImage || null;  // bg for the cell
        this._blocking = false;             // blocks movement?
        this._hasPlayer = false;            // Player present (connonical)
        this._player = o.player || null;    // Player obj when player is on cell    
        this._soundMgr = o.soundMgr || {};  // Sound management object
        this._sounds = o.sounds || {};      // Sound effects for this cell
        this._grid = o.grid || {};           // Game grid object
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._hasPlayer;
    },

    'enter': function(player) {
        if (typeof player !== 'MinerJs Player Object') {
            throw new TypeError('Invalid Player Object');
        }
        
        return !this._blocking;
    },

    'registerPlayer': function(player) {
        
        if (typeof player !== 'MinerJs Player') {
            throw new TypeError('Invalid Player Object');
        }
        
        // sanity check, make sure we already don't have this player
        if (this.hasPlayer()) {
            return false;
        }
        
        player.Position.Cell.unregisterPlayer();
        player.Position.Cell = this;
        this._hasPlayer = true;
        
        this._playSound('playerEnter');
        
        return true;
    },

    'unregisterPlayer': function() {
        this._hasPlayer = false;
        this.player = null;
        return true;
    },

    'render': function() {
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

    'acceptsPlayer': function() {
        return this._super();
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function() {
        return this._super();
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

    'acceptsPlayer': function() {
        return this._super();
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function() {
        return this._super();
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.Dirt = Miner.Engine.Cell.Dirt || Miner.Engine.Cell.extend({
    'init': function(o) {
 
        this.type = 'Dirt';
        this._modifier = false;
        
        if (Miner.Engine.Util.randomChance()) {
            var rand = Miner.Engine.Util.random();
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
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },

    'acceptsPlayer': function() {
        return this._super();
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function() {
        return this._super();
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

    'acceptsPlayer': function() {
        return this._super();
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function() {
        return this._super();
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.Elevator = Miner.Engine.Cell.Elevator || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        this.type = 'Elevator';
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },

    'acceptsPlayer': function() {
        return this._super();
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function() {
        return this._super();
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.ElevatorCar = Miner.Engine.Cell.ElevatorCar || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        this.type = 'ElevatorCar';
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },

    'acceptsPlayer': function() {
        return this._super();
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function() {
        return this._super();
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});

Miner.Engine.Cell.Road = Miner.Engine.Cell.Road || Miner.Engine.Cell.extend({
    'init': function(o) {
        this._super(o);
        this.type = 'Road';
        return this;
    },
    
    'hasPlayer': function(player) {
        return this._super(player);
    },

    'acceptsPlayer': function() {
        return this._super();
    },

    'registerPlayer': function(player) {
        return this._super(player);
    },

    'unregisterPlayer': function() {
        return this._super();
    },

    'render': function() {
        return this._super();
    },

    '_playSound': function(soundLabel) {
        return this._super(soundLabel);
    }
});