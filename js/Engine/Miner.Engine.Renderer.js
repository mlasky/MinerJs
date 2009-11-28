var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Renderer = Miner.Engine.Renderer || Class.extend({
    'init': function(o) {
        o = o || {};
        this._images = {};
        this._canvas = o.canvas || {};
        this._ctx = this._canvas.getContext("2d");
		
		return this;
    },
	
	'getCtx': function() { return this._ctx; },
	
	'renderBg': function(imagePath) {
	    var self = this;
	    var image;
	    
	    image = new Image();
	    image.onload = function() {
	        console.log(image);
	        self._ctx.drawImage(image,0,0);
	    };
	    
	    image.src = imagePath;
	    
	},
	
	'renderGame': function() {
	    this.renderBg('images/base_bg.png');
	}
});