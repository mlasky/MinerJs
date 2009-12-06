var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Grid = Miner.Engine.Grid || Class.extend({
    'init': function(o) {
        // "Private"
        this._map = o.map || {};
        this.game = o.game || {};
        
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
        
        this.cols = map.numCols();
        this.rows = map.numRows();
        
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
                grid.cell = new Miner.Engine.Cell[type]({
                    'grid': this,
                    'game': this.game,
                    'x': j,
                    'y': i
                });
                
            }
        }
        
        return this;
    },
    
    '_getOffset': function(x, y) {
        return (y * this.cols) + x;
    },
    
    'getCell': function(x, y) {
        return this._grid[this._getOffset(x, y)].cell;
    },
    
    'setCell': function(x, y, cell) {
        this._grid[this._getOffset(x, y)].cell = cell;
    },
    
    'left': function(cell) {
        cell = cell || {};
        var x = Number(cell.x) -1;
        var y = Number(cell.y);
        return this.getCell(x, y);
    },
    
    'right': function(cell) {
        cell = cell || {};
        var x = Number(cell.x) +1;
        var y = Number(cell.y);
        return this.getCell(x, y);
    },
    
    'up': function(cell) {
        cell = cell || {};
        var x = Number(cell.x);
        var y = Number(cell.y) - 1;
        return this.getCell(x, y);
    },
    
    'down': function(cell) {
        cell = cell || {};
        var x = Number(cell.x);
        var y = Number(cell.y) + 1;
        return this.getCell(x, y);
    },
    
    'render': function(x, y, width, height, fn) {
        var game = this.game;
        var grid = this._grid;
        var len = grid.length;
        width = width || this.cols;
        height = height || this.rows;
        
        
        for (i = 0; i < len; i++) {
            var cell = grid[i].cell;
            var row = cell.y;
            var col = cell.x;
         
            var render_x = x + (col * cell.width);
            var render_y = y + (row * cell.height);
            if (!(col > width) && !(row > height)) {
                cell.render(render_x, render_y);
            }
        }
        
        if (typeof fn === 'function') {
            fn(this);
        }
        
        return true;
    },
    
    'getRect': function(size, cell) {
        var rect = [];
        var x = cell.x;
        var y = cell.y;
        console.log(cell);
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var nCell = this.getCell(x + j, y + i);
                rect.push(nCell);
            }
        }
        return rect;
    }
});