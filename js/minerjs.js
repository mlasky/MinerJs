var Miner = Miner || {};

Miner.Engine = Miner.Engine || {};
Miner.Engine.Data = Miner.Engine.Data || {
    'cellTypes': {
            'Ar': Miner.Grid.Cell.Air,
            'Dr': Miner.Grid.Cell.Door,
            'Dt': Miner.Grid.Cell.Dirt,
            'Tl': Miner.Grid.Cell.Tunnel,
            'El': Miner.Grid.Cell.Elevator,
            'Ec': Miner.Grid.Cell.ElevatorCar,
            'Rd': Miner.Grid.Cell.Road
    }    
};

Miner.Grid = Miner.Grid || function(o) {
    
    // Public 
    this.cols;
    this.rows;
    
    // "Private"
    this._rawMapArray = o.rawMapArray || {};
    this._map;
    
    return this._parseMap()._loadMap();
};

Miner.Grid.prototype = {
    '_loadMap': function() {
        var map = this._map;
        
        if (typeof map !== 'MinerJs Map Object') {
            throw new TypeError('Invalid Map Object');
        }
        
        return this;
    },
    
    'parseMap': function() {
        var map = this._rawMapArray;
        var cellTypes = Miner.Engine.Data.cellTypes;
        var rawMapSize = map.length;
        
        for (var i = 0; i < rawMapSize; i++) {
            console.log(map[i]);
        }
        return this;
    }
};

Miner.Grid.Cell = Miner.Cell || function(o) {
    this._bgImage = o.bgImage || null;    // bg for the cell
    this._blocking = false;             // blocks movement?
    this._hasPlayer = false;            // Player present (connonical)
    this._player = o.player || null;    // Player obj when player is on cell    
    this._soundMgr = o.soundMgr || {};  // Sound management object
    this._sounds = o.sounds || {};      // Sound effects for this cell
    this.grid = o.grid || {};           // Game grid object
    
    return this;
};

Miner.Grid.Cell.prototype = {
    
    'hasPlayer': function(player) {
        return this._hasPlayer;
    },
    
    'acceptsPlayer': function() {
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
};