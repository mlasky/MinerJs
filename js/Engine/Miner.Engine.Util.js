var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Util = Miner.Engine.Util || {
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
};