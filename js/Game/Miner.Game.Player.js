var Miner = Miner || {};
Miner.Game = Miner.Game || {};
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
        this.health -= amount || 10;
        if (this.health < 0) {
            return this._die();
        }
        return true;
    },
    
    'moveLeft': function() {
        var nextCell = this.game.grid.getLeft(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveRight': function() {
        var nextCell = this.game.grid.getRight(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveUp': function() {
        var nextCell = this.game.grid.getUp(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
           this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveDown': function() {
        var nextCell = this.game.grid.getDown(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
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