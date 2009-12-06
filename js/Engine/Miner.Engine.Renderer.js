var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Renderer = Miner.Engine.Renderer || Class.extend({
    'init': function(o) {
        o = o || {};
        this._images = {};
        this._canvas = o.canvas || {};
        this._ctx = this._canvas.getContext("2d");
        this._buffer = o.buffer || $('<canvas />').attr({
            'style': $(this._canvas).attr('style'),
            'width': $(this._canvas).attr('width'),
            'height': $(this._canvas).attr('height')
        }).get(0);
        this._bCtx = this._buffer.getContext("2d");
        return this;
    },
    
	'render': function() {
	    var self = this;
	    window.setInterval(function() {
	        return self._ctx.drawImage(self._buffer, 0, 0);
	    }, 50);
	    return true;
	},
	
	'getCtx': function() { return this._bCtx; },
	
	'renderBg': function(imagePath, fn) {
	    var self = this;
	    var image;
	    
	    image = new Image();
	    image.onload = function() {
	        self.getCtx().drawImage(image,0,0);
	        if (typeof fn === 'function') {
	            fn(self);
	        }
	        return true;
	    };
	    
	    image.src = imagePath;
	    return true;
	},
	
	'drawImg': function(img, x, y) {
	    var self = this;
	    var image = new Image();
	    image.onload = function() {
	        self.getCtx().drawImage(image, x, y);
	    };
	    image.src = img;
	    return true;
	},
	
	'drawRect': function(x,y,width,height) {
	    var ctx = this.getCtx();
	    var random = Miner.Engine.Util.random;
	    var color_r = random(200, 2000);
	    var color_g = random(200, 2000);
	    var color_b = random(200, 2000);
	    
	    ctx.fillStyle = "rgba("+color_r+","+color_g+","+color_b+", 0.5)";
	    
	    ctx.fillRect(x,y,width,height);
	    
	    return true;
	}
});