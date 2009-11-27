var Miner = Miner || {};

Miner.Engine = Miner.Engine || {};
Miner.Engine.Data = Miner.Engine.Data || {};

Miner.Engine.Util = Miner.Engine.Util || Class.extend({
    'random': function(max, multiplier) {
        max = max || 10;
        multiplier = multiplier || 100;
        return Math.round(Math.random() * multiplier) % max;
    },
    
    'randomChance': function(max, multiplier) {
        max = max || 10;
        multiplier = multiplier || 100;
        return Math.round(Math.random() * multiplier) % max === 1;
    }
});

Miner.Engine.Grid = Miner.Engine.Grid || Class.extend({
    'init': function(o) {
        // "Private"
        this._map = o.map || {};
        this._game = o.game || {};
        this._cellTypes = {
            'Ar': 'Air',
            'Do': 'Door',
            'Dt': 'Dirt',
            'Tl': 'Tunnel',
            'El': 'Elevator',
            'Ec': 'ElevatorCar',
            'Rd': 'Road'
        };

        // Public 
        this.cols;
        this.rows;
        this._grid = [];

        return this._loadMap();
    },
    
    '_loadMap': function() {
        var map = this._map;
        var mapArray = map.mapArray;
        var cellTypes = this._cellTypes;
        var len_mapArray = mapArray.length;
        
        this.numCols = map.numCols();
        this.numRows = map.numRows();
        
        for (var i = 0; i < len_mapArray; i++) {
            
            var row = mapArray[i];
            var len_row = row.length;
            
            for (var j = 0; j < len_row; j++) {
                
                var type = cellTypes[mapArray[i][j]];
                var offset = this._getOffset(j, i);
                
                if (typeof this._grid[offset] === 'undefined') {
                    this._grid[offset] = {};
                }
                
                var grid = this._grid[offset];
                grid.cell = new Miner.Engine.Cell[type]({'grid': this});
                grid.row = i;
                grid.col = j;
            }
        }
        
        return this;
    },
    
    '_getOffset': function(x, y) {
        return (y * this.numCols) + x;
    },
    
    'getCell': function(x, y) {
        return this._grid[this._getOffset(x, y)].cell;
    }
});

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
        
        if (Miner.Engine.Util.randomChance()) {
            var rand = Math.Engine.Util.random();
            if (rand <= 3) {
                return new Miner.Engine.Cell.Dirt.Platinum(o);
            } 
            else if (rand <= 13) {
                return new Miner.Engine.Cell.Dirt.Gold(o);
            }
            else if (rand <= 45) {
                return new Miner.Engine.Cell.Dirt.Silver(o);
            }
            else if (rand <= 60) {
                return new Miner.Engine.Cell.Dirt.CaveIn(o);
            }
            else if (rand <= 65) {
                return new Miner.Engine.Cell.Dirt.Water(o);
            }
            else if (rand <= 70) {
                return new Miner.Engine.Cell.Dirt.WhirlPool(o);
            }
            else {
                return new Miner.Engine.Cell.Dirt.Granite(o);
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

Miner.Engine.Renderer = Miner.Engine.Renderer || Class.extend({
    'init': function(o) {
        o = o || {};
        this._canvas = o.canvas || {};
        
    }
});

Miner.Game = Miner.Game || {};
Miner.Game.Data = Miner.Game.Data || {
    'InvObjectData': {
        'Shovel': {
            'name': 'Shovel', 
            'max': 1,
            'cost': 100,
            'description': 'A fine shovel'
        },
        'Pixaxe': {
            'name': 'Pickaxe',
            'max': 1,
            'cost': 150,
            'description': 'A pickaxe'
        },
        'Drill': {
            'name': 'Drill', 
            'max': 1,
            'cost': 250,
            'description': 'For drilling through granite'
        },
        'Lantern': {
            'name': 'Lantern', 
            'max': 1, 
            'fuel': 300,
            'cost': 100,
            'description': 'A coleman lantern'
        },
        'Bucket': {
            'name': 'Bucket', 
            'max': 1,
            'cost': 200,
            'description': 'Requires a pump?'
        },
        'Torch': {
            'name': 'Torch', 
            'max': 1, 
            'fuel': 100,
            'cost': 100,
            'description': 'Careful with fire'
        },
        'Dynamite': {
            'name': 'Dynamite', 
            'max': 1,
            'cost': 300,
            'description': "It's a blast!"
        },
        'Ring': {
            'name': 'Ring', 
            'max': 1,
            'cost': 100,
            'description': 'She will pretty much have to'
        },
        'Condom': {
            'name': 'Condom',
            'max': 1,
            'cost': 100,
            'description': 'For protection'
        },
        'Diamond': {
            'name': 'Diamond', 
            'cost': 1000,
            'description': 'Awesome'
        },
        'Pump': {
            'name': 'Pump', 
            'max': 1,
            'description': 'For pumping things'
        },
        'Clover': {
            'name': 'Clover',
            'description': 'Good luck!'
        }   
    }
};

Miner.Game.InventoryObject = Miner.Game.InventoryObject || Class.extend({
    'init': function(o) {
        this.name = o.name || '';
        this.quantity = o.quantity || 0;
        this.max = o.max || -1;
        this.canLose = o.canLose || true;
        this.fuel = o.fuel || null;
        this.cost = o.cost || 0;
        this.description = o.description || '';
        
        return this;
    }
});

Miner.Game.Player = Miner.Game.Player || Class.extend({
    'init': function(o) {
        this.health = o.health || 100;
        this.light = o.light || 0;
        this.luck = o.luck || 0;
        this.money = {
            'platinum': o.platinum || 0,
            'gold': o.gold || 0,
            'silver': o.silver || 0,
            'cash': o.cash || 1500
        };
        this.activate = o.activate || null;
        this.inventory = o.inventory || {};
        this.inventory.items = o.inventory.items || [];
        
        return this;
    },
    
    'addItem': function(item) {
        if (typeof item !== 'MinerJs Inventory Item') {
            throw new TypeError('Invalid Item');
        }
        
        this.inventory.items.push(item);
        return true;
    },
    
    'removeItem': function(itemName) {
        var numItems = this._numInvItems();
        for (var i = 0; i < numItems; i++) {
            if (this.inventory.items[i].name === itemName) {
                return this.inventory.items.splice(i, 1); 
            }
        }
        return false;
    },
    
    'hasItem': function(itemName) {
        var numItems = this._numInvItems();
        for (var i = 0; i < numItems; i++) {
            if (this.inventory.items[i].name === itemName) {
                return true;
            }
        }
        return false;
    },
    
    'numItems': function(itemName) {
        var numItems = this._numInvItems();
        var count = 0;
        for (var i = 0; i < numItems; i++) {
            if (this.inventory.items[i].name === itemName) {
                count++;
            }
        }
        return count;
    },
    
    'injure': function(amount) {
        this.health -= amount;
        if (this.health < 0) {
            this._die();
            return false;
        }
        return true;
    },
    
    'moveLeft': function() {
        var nextCell = this.game.grid.getLeft(this.position.cell);
        if (nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveRight': function() {
        var nextCell = this.game.grid.getRight(this.position.cell);
        if (nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveUp': function() {
        var nextCell = this.game.grid.getUp(this.position.cell);
        if (nextCell.enter(this)) {
           this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveDown': function() {
        var nextCell = this.game.grid.getDown(this.position.cell);
        if (nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    '_changePosition': function(cell) {
        this.position.cell = cell;
        return true;
    },
    
    '_die': function() {
        return true;
    },

    '_numInvItems': function() {
        return this.inventory.items.length;
    }
});

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

$(document).ready(function() {
    var game = new Miner.Game.Main({
        'map': map,
        'canvas': $('#game-window')
    });
});