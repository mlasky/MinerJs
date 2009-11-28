var Miner = Miner || {};
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
    },
    
    'moneyData': {
        'silver': {
            'basePrice': 16
        },
        'gold': {
            'basePrice': 60
        },
        'platinum': {
            'basePrice': 2000
        }
    },

    'screenData': {
        'title': {
            'bgImage': 'images/title.png',
            'bindings': {
                'x': function(game) {
                    return game.gameMain(true);
                }
            } 
        }  
    },
    
    'cellData': {
        'Platinum': {
            'bgImage': 'images/platinum_dirt.png',
            'onPlayerEnter': function(player) {
                if (!player.transact({ 'gold': 1})) {
                    return false;
                }
                return true;
            }
        },
        'Gold': {
            'bgImage': 'images/gold_dirt.png',
            'onPlayerEnter': function(player) {
                if (!player.transact({ 'gold': 1})) {
                    return false;
                }
                return true;
            }
        },
        'Silver': {
            'bgImage': 'images/silver_dirt.png',
            'onPlayerEnter': function(player) {
                if (!player.transact({ 'silver': 1})) {
                    return false;
                }
                return true;
            }
        },
        'CaveIn': {
            'bgImage': 'images/cave.png',
            'dugImage': 'images/cave.png',
            'onPlayerEnter': function(player) {
                if (!player.injure(20)) {
                    return false;
                }
                if (Miner.Game.Util.Random.randomChance(15)) {
                    player.dropRandomItem();
                }
                
                var grid = player.cell.grid;
                var subGrid = grid.getRect(player.cell, 2);
                var lenSubGrid = subGrid.length;
                
                for (var i = 0; i < lenSubGrid; i++) {
                    var cell = subGrid[i];
                    if (cell.type === 'Tunnel') {
                        cell = new Miner.Engine.Cell.Dirt(cell);
                    }
                }
                return true;
            }
            
        },
        'Water': {
            'bgImage': 'images/water.png',
            'dugImage': 'images/water.png',
            'onPlayerEnter': function(player) {
                if (!player.injure(4)) {
                    return false;
                }
                return true;
            }
        },
        'WhirlPool': {
            'bgImage': 'images/wp.png',
            'dugImage': 'images/wp.png',
            'onPlayerEnter': function(player) {
                if (!player.injure(20)) {
                    return false;
                }
                if (Miner.Game.Util.Random.randomChance(15)) {
                    player.dropRandomItem();
                }
                
                var grid = player.cell.grid;
                var subGrid = grid.getRect(player.cell, 2);
                var lenSubGrid = subGrid.length;
                
                for (var i = 0; i < lenSubGrid; i++) {
                    var cell = subGrid[i];
                    if (cell.type === 'Tunnel') {
                        cell = new Miner.Engine.Cell.Water(cell);
                    }
                }
                return true;
            }
        },
        'Granite': {
            'bgImage': 'images/rock.png',
            'dugImage': 'images/rock.png'
        }
    }
};