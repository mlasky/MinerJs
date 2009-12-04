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
	
	'renderBg': function(imagePath, fn) {
	    var self = this;
	    var image;
	    
	    image = new Image();
	    image.onload = function() {
	        self._ctx.drawImage(image,0,0);
	        if (typeof fn === 'function') {
	            fn(self);
	        }
	    };
	    
	    image.src = imagePath;
	    
	},
	
	'drawImg': function(img, x, y) {
	    var self = this;
	    var image = new Image();
	    image.onload = function() {
	        self._ctx.drawImage(image, x, y);
	    };
	    image.src = img;
	    return true;
	},
	
	'drawRect': function(x,y,width,height) {
	    var ctx = this._ctx;
	    var random = Miner.Engine.Util.random;
	    var color_r = random(200, 2000);
	    var color_g = random(200, 2000);
	    var color_b = random(200, 2000);
	    
	    ctx.fillStyle = "rgba("+color_r+","+color_g+","+color_b+", 0.5)";
	    
	    ctx.fillRect(x,y,width,height);
	}
});