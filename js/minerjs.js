$(document).ready(function() {
    var game = new Miner.Game.Main({
        'map': map,
        'canvas': $('#game-window').get(0)
    });
    
    console.log(game);
});