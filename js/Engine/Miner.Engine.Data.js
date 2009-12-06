var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};
Miner.Engine.Data = Miner.Engine.Data || {
    'keyCodes': {
        'Left':     37,
        'Up':       38,
        'Right':    39,
        'Down':     40,
        'x':        88,
        's':        83,
        'r':        82,
        'd':        68,
        'p':        80,
        'e':        69
    },
    
    'cellData': {
        'Platinum': {
            'bgImage': 'images/platinum_dirt.png',
            'onPlayerEnter': function(player) {
                if (!player.transact({'type': 'platinum', 'amount': 1})) {
                    return false;
                }
                return player.position.cell.y === this.y ||
                        player.position.cell.x === this.x;
            }
        },
        'Gold': {
            'bgImage': 'images/gold_dirt.png',
            'onPlayerEnter': function(player) {
                if (!player.transact({'type': 'gold', 'amount': 1})) {
                    return false;
                }
                return player.position.cell.y === this.y ||
                        player.position.cell.x === this.x;
            }
        },
        'Silver': {
            'bgImage': 'images/silver_dirt.png',
            'onPlayerEnter': function(player) {
                if (!player.transact({'type': 'silver', 'amount': 1})) {
                    return false;
                }
                return player.position.cell.y === this.y ||
                        player.position.cell.x === this.x;
            }
        },
        'CaveIn': {
            'bgImage': 'images/cave.png',
            'dugImage': 'images/cave.png',
            'onPlayerEnter': function(player) {
                if (!player.injure(20)) {
                    return false;
                }
                if (Miner.Engine.Util.randomChance(15)) {
                    //player.dropRandomItem();
                }
                
                var grid = player.position.cell.grid;
                var player_cell = player.position.cell;
                
                var subGrid = grid.getRect(5, grid.getCell(player_cell.x - 2, player_cell.y - 2));
                var lenSubGrid = subGrid.length;
                
                for (var i = 0; i < lenSubGrid; i++) {
                    var cell = subGrid[i];
                    if ((cell.type === 'Dirt' && cell.dug === true) &&
                        !(cell.x === player_cell.x && cell.y === player_cell.y)) 
                    {
                        cell = new Miner.Engine.Cell.Dirt({
                            'grid': grid,
                            'game': player.game,
                            'x': cell.x,
                            'y': cell.y,
                        });
                        grid.setCell(cell.x, cell.y, cell);
                    }
                }
                
                return player.position.cell.y === this.y ||
                        player.position.cell.x === this.x;
            }
            
        },
        'Water': {
            'bgImage': 'images/water.png',
            'dugImage': 'images/water.png',
            'onPlayerEnter': function(player) {
                if (!player.injure(4)) {
                    return false;
                }
                return false;
            }
        },
        'WhirlPool': {
            'bgImage': 'images/wp.png',
            'dugImage': 'images/wp.png',
            'onPlayerEnter': function(player) {
                if (!player.injure(20)) {
                    return false;
                }
                if (Miner.Engine.Util.randomChance(15)) {
                    player.dropRandomItem();
                }
                
                var grid = player.position.cell.grid;
                var player_cell = player.position.cell;
                var subGrid = grid.getRect(5, grid.getCell(player_cell.x-2, player_cell.y));
                var lenSubGrid = subGrid.length;
                
                for (var i = 0; i < lenSubGrid; i++) {
                    var cell = subGrid[i];
                    if ((cell.type === 'Dirt' && cell.dug === true) &&
                        !(cell.x === player_cell.x && cell.y === player_cell.y)) 
                    {
                        cell = new Miner.Engine.Cell.Dirt({
                            'modifier': 'Water',
                            'grid': grid,
                            'game': player.game,
                            'x': cell.x,
                            'y': cell.y
                        });
                        grid.setCell(cell.x, cell.y, cell);
                    }
                }
                return player.position.cell.y === this.y ||
                        player.position.cell.x === this.x;
            }
        },
        'Granite': {
            'bgImage': 'images/rock.png',
            'dugImage': 'images/rock.png',
            
            'onPlayerEnter': function() {
                console.log('false')
                return false;
            }
        }
    }
};