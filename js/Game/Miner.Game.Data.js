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
    }
};