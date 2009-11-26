var Miner = Miner || {};

Miner.Data = Miner.Data || {};
Miner.Data.cellTypes = {
        'Ar': Miner.Grid.Cell.Air,
        'Dr': Miner.Grid.Cell.Door,
        'Dt': Miner.Grid.Cell.Dirt,
        'Tl': Miner.Grid.Cell.Tunnel,
        'El': Miner.Grid.Cell.Elevator,
        'Ec': Miner.Grid.Cell.ElevatorCar,
        'Rd': Miner.Grid.Cell.Road
    }
};

Miner.Map = Miner.Map || function(mapArray) {
    
};

Miner.Map.prototype = {
    
};

Miner.Grid = Miner.Grid || function(o) {
    var map = o.map || null;
    this.width;
    this.height;
    this._map;
    
    return this._loadMap(map);
};

Miner.Grid.prototype = {
    '_loadMap': function(map) {
        if (typeof map !== 'MinerJs Map Object') {
            throw new TypeError('Invalid Map Object');
        }
        
        return this;
    }
};

Miner.Grid.Cell = Miner.Cell || function(o) {
    this._bgImage o.bgImage || null;    // bg for the cell
    this._blocking = false;             // blocks movement?
    this._hasPlayer = false;            // Player present
    this._sound = o.sound || null;      // Sound upon enter
    this._grid = o.grid || {};          // Game grid object
    this._player = o.player || null;    // Player obj when player is on cell
    
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
        
        if (typeof this.sound !== 'null') {
            this._playSound();
        }
        
        return true;
    },
    
    'unregisterPlayer': function() {
        this._hasPlayer = false;
        this.player = null;
    },
    
    'render': function() {
        return true;
    }
};