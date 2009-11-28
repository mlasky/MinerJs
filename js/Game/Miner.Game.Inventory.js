var Miner = Miner || {};
Miner.Game = Miner.Game || {};
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