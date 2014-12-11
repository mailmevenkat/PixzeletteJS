/*
    Contributor: Venkateswaran mailmevenkat25(at)gmail(dot)com
    Project: pixzelette.js
    Version: 0.0.1
    Language: JavaScript
    Requirement: Browser with canvas support
*/

(function(){
    
        /*
            Public function: Constructor(element, args) 
             i. Initialises Pixzelette
             ii. element = image or canvas
             iii. args = {w: width, h: height, x: x-axis, y: y-axis} 
             iv. returns object
        */
        this.Pixzelette = function(element,args){
            
            /*
                Initializing canvas, context and pixels
            */
            this.canvas = null; 
            this.context = null;
            this.pixels = null;
            this.image = new Image();
            this.args = {
                w: element.naturalWidth,
                h: element.naturalHeight,
                x: 0,
                y: 0
            };
            
            /*
                Check whether the given element is image or canvas
            */
            
            var isImage = element.nodeName.toLowerCase() === 'img';
            var isCanvas = element.nodeName.toLowerCase() === 'canvas'; 
            
            /*
                If the given element is image, 
                 i. Create a canvas and assign it to variable 'canvas'
                 ii. Draw the image on the new canvas using context.
            */
            if(typeof args !== 'undefined')
            {
                this.args.w = typeof args.w !== 'undefined'? args.w : this.args.w;
                this.args.h = typeof args.h !== 'undefined'? args.h : this.args.h;
                this.args.x = typeof args.x !== 'undefined'? args.x : this.args.x;
                this.args.y = typeof args.y !== 'undefined'? args.y : this.args.y;
            }
            if(isImage){
                this.canvas = document.createElement('canvas');
                this.canvas.width = this.args.w;
                this.canvas.height = this.args.h;
                this.context = this.canvas.getContext('2d');
                this.context.drawImage(element,this.args.x,this.args.y);
            } 
            
            /*
              If the given element is canvas
                i. Assign the given element to the variable 'canvas'
            */
            
            else if(isCanvas){
                this.canvas = element;
                this.context = this.canvas.getContext('2d');
            }
            
            /*
              If the given element is not a valid image or canvas, return null
            */
            else{
                return null;
            }
            
            this.pixels = this.getImageData(); //get the image data and assign it to pixels
            this.image.width = this.canvas.width;
            this.image.height = this.canvas.height; 
            
            return this; //return the object back
        }
        
        /*
            Public function: effect(effects) 
             i. Accepts a javascript object as argument
             ii. Returns object
             
             Available effects:
                i.brightness ii.contrast iii.sepia iv.hue v.saturate
                vi.value vii.red vii.green ix.blue x.alpha xi.desaturate  
        */
        Pixzelette.prototype.effect = function(effects){
            
            var color; //declares a variable color
            
            if(effects == null){ //if no effects is provided, return object
                return this;
            }
            
            if(typeof(effects.brightness) !== 'undefined'){
                var brightness = Math.max(Math.min(effects.brightness * 255,255),-255);
            }
            
            if(typeof(effects.contrast) !== 'undefined'){ 
                effects.contrast = Math.max(Math.min(effects.contrast * 128,128),-128);
                var cFactor = (259 * (effects.contrast + 255)) / (255 * (259 - effects.contrast)); //calculates the contrast factor and assign it to cFactor
            }
            
            if(typeof(effects.sepia) !== 'undefined'){
                var sepia = effects.sepia; //assign effects.sepia to sepia
            }
            
            if(typeof(effects.hue) !== 'undefined'){
                var hue = effects.hue; //assign effects.hue to hue
            }
            
            if(typeof(effects.saturate) !== 'undefined'){
                var saturate = effects.saturate; //assign effects.saturate to saturate
            }
            
            if(typeof(effects.value) !== 'undefined'){
                var value = effects.value; //assign effects.value to value
            }
            
            if(typeof(effects.red) !== 'undefined'){
                var red = Math.max(Math.min(effects.red * 255,255),-255);
            }
            
            if(typeof(effects.green) !== 'undefined'){
                var green = Math.max(Math.min(effects.green * 255,255),-255);
            }
            
            if(typeof(effects.blue) !== 'undefined'){
                var blue = Math.max(Math.min(effects.blue * 255,255),-255);
            }
            
            if(typeof(effects.alpha) !== 'undefined'){
                var alpha = effects.alpha; //assign effects.alpha to alpha
            }
            
            if(typeof(effects.desaturate) !== 'undefined'){
                var desaturate = effects.desaturate; //assign effects.alpha to alpha
            }
            
            for (var i=0; i< this.pixels.data.length; i+=4) { //Loops through each pixel of the image
                
                for (var key in effects) { //Makes sure the effects are executed in the order it is provided
                    
                    /*
                        red -> pixels.data[i]
                        green -> pixels.data[i+1]
                        blue -> pixels.data[i+2]
                        alpha -> pixels.data[i+3]
                    */
                    
                    if(key == "brightness"){ //for brightness
                         this.pixels.data[i] += brightness;
                         this.pixels.data[i+1] += brightness;
                         this.pixels.data[i+2] += brightness;
                    }
                    
                    if(key == "contrast"){ //for contrast
                        this.pixels.data[i] = cFactor * (this.pixels.data[i] - 128) + 128;
                        this.pixels.data[i+1] = cFactor * (this.pixels.data[i+1] - 128) + 128;
                        this.pixels.data[i+2] = cFactor * (this.pixels.data[i+2] - 128) + 128;   
                    }
                    
                    if(key == "sepia"){ //for sepia
                        this.pixels.data[i] = (this.pixels.data[i] * 0.393 + this.pixels.data[i+1] * 0.769 + this.pixels.data[i+2] * 0.189) * sepia;
                this.pixels.data[i+1] = (this.pixels.data[i] * 0.349 + this.pixels.data[i+1] * 0.686 + this.pixels.data[i+2] * 0.168) * sepia;
                this.pixels.data[i+2] = (this.pixels.data[i] * 0.272 + this.pixels.data[i+1] * 0.534 + this.pixels.data[i+2] * 0.131) * sepia;
                    }
                    
                    if(key == "hue"){ //for hue
                        color = RGBtoHSV(this.pixels.data[i],this.pixels.data[i+1],this.pixels.data[i+2]);
                        color.hue *= hue;
                        color = HSVtoRGB(color.hue,color.saturation,color.value);
                        this.pixels.data[i] = color.red;
                        this.pixels.data[i+1] = color.green;
                        this.pixels.data[i+2] = color.blue;
                    }
                    
                    if(key == "saturate"){ //for saturate
                        color = RGBtoHSV(this.pixels.data[i],this.pixels.data[i+1],this.pixels.data[i+2]);
                        color.saturation *= saturate;
                        color = HSVtoRGB(color.hue,color.saturation,color.value);
                        this.pixels.data[i] = color.red;
                        this.pixels.data[i+1] = color.green;
                        this.pixels.data[i+2] = color.blue;
                    } 
                    
                    if(key == "value"){ //for value
                        color = RGBtoHSV(this.pixels.data[i],this.pixels.data[i+1],this.pixels.data[i+2]);
                        color.value *= value;
                        color = HSVtoRGB(color.hue,color.saturation,color.value);
                        this.pixels.data[i] = color.red;
                        this.pixels.data[i+1] = color.green;
                        this.pixels.data[i+2] = color.blue;
                    } 
                    
                    if(key == "red"){ //for red
                        this.pixels.data[i] += red;
                        this.pixels.data[i+1] -= red;
                        this.pixels.data[i+2] -= red;
                    }
                    
                    if(key == "green"){ //for green
                        this.pixels.data[i] -= green;
                        this.pixels.data[i+1] += green;
                        this.pixels.data[i+2] -= green;
                    }
                    
                    if(key == "blue"){ //for blue
                        this.pixels.data[i] -= blue;
                        this.pixels.data[i+1] -= blue;
                        this.pixels.data[i+2] += blue;
                    }
                    
                    if(key == "alpha"){ //for alpha
                        this.pixels.data[i+3] *= alpha;
                    }
                    
                    if(key == "desaturate"){
                        var g = (0.3 * this.pixels.data[i]) + (0.59 * this.pixels.data[i+1]) + (0.11 * this.pixels.data[i+2]); 
                        this.pixels.data[i] = this.pixels.data[i+1] = this.pixels.data[i+2] = g * desaturate;
                    }
                }
            }
            
            this.context.putImageData(this.pixels,0,0); //updates new pixel to context
            
            return this;
        };
    
        /*
            Public function: blend(element, mode, opacity) 
             i. Accepts element, mode and opacity as arguments
             ii. Returns back object
             
             Available filters:
                i.addition ii.subtract iii.multiply iv.divide v.overlay
                vi.screen vii.darken viii.lighten ix.dodge x.burn
                xi.soft light xii.hard light xiii.difference xiv.exclusion
                xv.hue xvi.saturation xvii.color xviii.luminosity
        */
        Pixzelette.prototype.blend = function(element, mode, opacity){
            
            var isImage = element.nodeName.toLowerCase() === 'img';
            var isCanvas = element.nodeName.toLowerCase() === 'canvas';
            
            if(!isImage && !isCanvas) return this;
                        
            switch(mode){
                    
                    case "addition": this.context.putImageData(blend_fix(element, this, "addition", opacity),0,0); return this;
                    
                    case "subtract": this.context.putImageData(blend_fix(element, this, "subtract", opacity),0,0); return this;
                    
                    case "multiply": this.context.globalCompositeOperation = "multiply"; break;
                    
                    case "divide":this.context.putImageData(blend_fix(element, this, "divide", opacity),0,0); return this;
                    
                    case "overlay": this.context.globalCompositeOperation = "overlay"; break;
                    
                    case "screen": this.context.globalCompositeOperation = "screen"; break;
                    
                    case "darken": this.context.globalCompositeOperation = "darken"; break;
                    
                    case "lighten": this.context.globalCompositeOperation = "lighten"; break;
                    
                    case "dodge": this.context.globalCompositeOperation = "color-dodge"; break;
                    
                    case "burn": this.context.globalCompositeOperation = "color-burn"; break;
                    
                    case "soft light": this.context.globalCompositeOperation = "soft-light"; break;
                    
                    case "hard light": this.context.globalCompositeOperation = "hard-light"; break;
                    
                    case "difference": this.context.globalCompositeOperation = "difference"; break;
                    
                    case "exclusion": this.context.globalCompositeOperation = "exclusion"; break;
                    
                    case "hue": this.context.globalCompositeOperation = "hue"; break;
                    
                    case "saturation": this.context.globalCompositeOperation = "saturation"; break;
                    
                    case "color": this.context.globalCompositeOperation = "color"; break;
                    
                    case "luminosity": this.context.globalCompositeOperation = "luminosity"; break;
            }
            
            if(typeof opacity !== 'undefined')
                this.context.globalAlpha = opacity;
            
            if(isCanvas)
                element = element.toDataURL();
            
            this.context.drawImage(element, 0, 0);
            
            this.pixels = this.getImageData(); //fetches the new pixels from context
            
            this.context.globalCompositeOperation = "source-over"; //resets global composite operation to default
            
            this.context.globalAlpha = 1; //resets global alpha to default
            
            return this;
            
        };

                
        /*
            Public function: filter(name) 
             i. Accepts filter name as argument
             ii. Returns object
             
             Available filters:
                i.mercury ii.venus iii.earth iv.mars v.jupiter
                vi.saturn vii.uranus viii.neptune 
        */
        
        Pixzelette.prototype.filter = function(name){
            
            switch(name){
                    
                    case "antiq": this.effect({sepia: 0.7, brightness: 0.2}); break;
                    
                    case "aqua": this.effect({brightness: 0.1, saturate: 2, blue: 0.08}); break;
                    
                    case "beat": this.custom("vignette",0.8).effect({red: 0.05, blue: 0.05}).custom("orange",0.6); break;
                    
                    case "cassie": this.custom("vignette",0.8).effect({red:0.05, blue:0.1}).custom("cream",0.4); break;
                    
                    case "deveil": this.effect({red: 0.05, sepia: 0.35, brightness:0.37, contrast: 0.8}); break;
                    
                    case "ember": this.effect({sepia: 0.6, brightness: 0.21, contrast: 0.4, red: 0.2}).effect({brightness: 0.15}).custom("vignette",0.7); break;
                    
                    case "evening": this.effect({contrast: 0.5, red: 0.1, green:0.1}).custom("blue",0.4); break;
                    
                    case "hello": this.effect({sepia: 1.1, brightness: -0.1, contrast: 0.1}); break;
                    
                    case "may": this.effect({contrast: 0.2, red: 0.07, blue:0.07}).custom("cream",0.4); break;
                    
                    case "natalie": this.effect({saturate: 0.35, contrast: 0.1}); break;
                    
                    case "nilam": this.effect({contrast: -0.1, green: 0.05, blue: 0.07, brightness:0.1}); break;
                    
                    case "retro": this.effect({red: 0.1, green: 0.07, blue: 0.1, contrast: 0.1, brightness: 0.25}); break;
                    
                    case "saturn": this.effect({hue: 0.1}); break;
                    
                    case "shallow": this.effect({saturate: 1.4, contrast: 0.3, desaturate: 1, brightness: 0.2}).custom("vignette",0.4); break;
                    
                    case "sketchy": this.effect({desaturate: 2.5}); break;
                    
                    case "tamil": this.effect({contrast: -0.1, brightness: 0.1, saturate: 2, red: 0.08, blue: 0.08}).custom("orange",0.4); break;
                    
                    case "valet": this.custom("vignette",0.8).effect({sepia: 0.9}).custom("purple",0.6); break;
                
                    case "zephyr": this.effect({brightness: 0.1, green: 0.02, red: 0.08}); break;
                    
                    default: this.effect();
            }
            
            this.context.putImageData(this.pixels,0,0); //updates new pixels to context
            
            return this;
        };
    
        /*
            Public function: custom(mode, value)
             i. Customized gradients filters
        */
        Pixzelette.prototype.custom = function(mode, value){
            
            var intensity = 1;
            var rad = Math.sqrt((Math.pow(this.canvas.width,2) + Math.pow(this.canvas.height,2)) / 2);
            
            if(typeof value !== 'undefined')
                intensity = value;
            
            switch(mode){
                    
                    case "vignette": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, rad/3, rad/1.25, 'rgba(0,0,0,0)', 'rgba(0,0,0,1)',this);
                                     this.blend(tImage,"darken",intensity);
                                     break;
                    
                    case "red": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, 1, rad/1.5, 'rgba(255,0,0,0.5)', 'rgba(0,0,0,0.2)',this);
                                this.blend(tImage,"addition",intensity);
                                break;
                    
                    case "green": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, 1, rad/1.5, 'rgba(0,255,0,0.5)', 'rgba(0,0,0,0.2)',this);
                                this.blend(tImage,"addition",intensity);
                                break;
                    
                    case "blue": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, 1, rad/1.5, 'rgba(0,0,255,0.5)', 'rgba(0,0,0,0.2)',this);
                                this.blend(tImage,"addition",intensity);
                                break;
                    
                    case "orange": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, 1, rad/1.5, 'rgba(255,165,0,0.5)', 'rgba(0,0,0,0.2)',this);
                                   this.blend(tImage,"addition",intensity);
                                   break;
                    
                    case "purple": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, 1, rad/1.5, 'rgba(128,0,128,0.5)', 'rgba(0,0,0,0.2)',this);
                                   this.blend(tImage,"addition",intensity);
                                   break;
                    
                    case "yellow": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, 1, rad/1.5, 'rgba(255,255,102,0.5)', 'rgba(0,0,0,0.2)',this);
                                   this.blend(tImage,"addition",intensity);
                                   break;
                    
                    case "cream": var tImage = gradient(this.canvas.width/2, this.canvas.height/2, 1, rad/1.5, 'rgba(255,255,204,0.5)', 'rgba(0,0,0,0.2)',this);
                                  this.blend(tImage,"addition",intensity);
                                  break;
            }
            
            this.context.putImageData(this.pixels,0,0); //updates the new pixels to context
            
            return this;
        }
        
        /*
            Public Function: getCanvas()
                i. Returns canvas element
        */
        Pixzelette.prototype.getCanvas = function(){
                return this.canvas; //returns a canvas element
        };
    
        /*
            Public Function: getImage(type, quality)
             i. Returns an Image
             
            Types:
                i. png ii.jpg iii.jpeg iv.webp
            Quality:
                range 0 to 1
             
        */
        Pixzelette.prototype.getImage = function(type,quality){
            
                var mode = "png";
                var qty = 1;
                var img = null;
            
                if(typeof type != 'undefined')
                    mode = type;
            
                if(typeof quality != 'undefined')
                    qty = quality;
            
                switch(mode){
                        
                        case "png": img = this.canvas.toDataURL("image/png",qty);
                                    break;
                        
                        case "jpg": 
                        case "jpeg": img = this.canvas.toDataURL("image/jpeg",qty);
                                     break;
                        
                        case "webp": img = this.canvas.toDataURL("image/webp",qty);
                                     break;
                        
                        case "default": img = this.canvas.toDataURL();
                                     break;
                }
            
                this.image.src = img;
                
                return this.image; //returns an image
        };
    
        /*
            Public Function: getDataURL(type, qualtity)
             i. Returns base64 encoded data url
            
            Types:
                i. png ii.jpg iii.jpeg iv.webp
            Quality:
                range 0 to 1
        */
        Pixzelette.prototype.getDataURL = function(type,quality){
                return this.getImage(type,quality).src;
        };
    
        /*
            Public Function: getImageData()
             i. Returns pixel from context for image manipulation
        */
        Pixzelette.prototype.getImageData = function(){
            return this.context.getImageData(0,0,this.canvas.width,this.canvas.height); //returns the image drawn on the canvas
        };
    
        /*
             Private Function: RGBtoHSV(red, green, blue)
             i. Converts rgb colours to hsv.
             ii. Returns an object with properties hue, saturation, value.
        */
    
        function RGBtoHSV(r,g,b) {
                var h,s,v,delta;
                min = Math.min( r, g, b );
                max = Math.max( r, g, b );
                v = max;
                delta = max - min;
                if( max != 0 )
                    s = delta / max;
                else {
                    s = 0;
                    h = -1;
                return {hue: h,saturation: s,value: undefined};
                }
                if( r === max )
                    h = ( g - b ) / delta; 
                else if( g === max )
                    h = 2 + ( b - r ) / delta;
                else
                    h = 4 + ( r - g ) / delta;
                h *= 60;
                if( h < 0 )
                    h += 360;
                if ( isNaN(h) )
                    h = 0;
                return {hue: h,saturation: s,value: v};
            };

            /*
                Private Function: HSVtoRGB(hue, saturation, value)
                 i. Converts hsv colours to rgb.
                 ii. Returns an object with properties red, green, blue.
            */
            function HSVtoRGB(h,s,v) {
                    var i;
                    var r,g,b;
                    if(s === 0 ) {
                        r = g = b = v;
                        return {red: r,green: g,blue: b};
                    }
                    h /= 60;
                    i = Math.floor( h );
                    f = h - i;
                    p = v * ( 1 - s );
                    q = v * ( 1 - s * f );
                    t = v * ( 1 - s * ( 1 - f ) );
                    switch( i ) {
                        case 0:
                            r = v;
                            g = t;
                            b = p;
                            break;
                        case 1:
                            r = q;
                            g = v;
                            b = p;
                            break;
                        case 2:
                            r = p;
                            g = v;
                            b = t;
                            break;
                        case 3:
                            r = p;
                            g = q;
                            b = v;
                            break;
                        case 4:
                            r = t;
                            g = p;
                            b = v;
                            break;
                        default:
                            r = v;
                            g = p;
                            b = q;
                            break;
                    }
                    return {red: r,green: g,blue: b};
                }
    
        
            /*
                Private Function: gradient(x,y,r0,r1,c0,c1)
                 i. Custom gradient maker
                 ii. Returns Image
            */

            function gradient(x,y,r0,r1,c0,c1,element){
                
                var gCanvas = document.createElement("canvas");
                gCanvas.width = element.canvas.width;
                gCanvas.height = element.canvas.height;
                
                var gContext = gCanvas.getContext('2d');
                
                gContext.rect(0, 0, gCanvas.width, gCanvas.height);
                             
                var gradient = gContext.createRadialGradient(x,y,r0,x,y,r1);
                
                gradient.addColorStop(0, c0);
                gradient.addColorStop(1, c1);
                
                gContext.fillStyle = gradient;
                
                gContext.fill();
                
                gImage = new Image();
                gImage.src = gCanvas.toDataURL();
                
                return gImage;
            }
            
            /*
                Private Function: blend_fix(element, mode ,opacity)
                 i. Fix for missing inbuild blend modes
            */
            function blend_fix(source, destination, mode, opacity){

                var args = {
                    w: destination.canvas.width,
                    h: destination.canvas.height
                };

                source = new Pixzelette(source,args);
                var opaque = typeof opacity !== 'undefined'? opacity : 0;
                if(source == null) return destination;
                if(mode == "addition"){
                    for(var i=0; i < destination.pixels.data.length; i+= 4){

                        destination.pixels.data[i] += source.pixels.data[i] * opaque;
                        destination.pixels.data[i+1] += source.pixels.data[i+1] * opaque;
                        destination.pixels.data[i+2] += source.pixels.data[i+2] * opaque;

                    }
                }

                if(mode == "subtract"){

                    for(var i=0; i < destination.pixels.data.length; i+= 4){

                        destination.pixels.data[i] -= source.pixels.data[i] * opaque;
                        destination.pixels.data[i+1] -= source.pixels.data[i+1] * opaque;
                        destination.pixels.data[i+2] -= source.pixels.data[i+2] * opaque;

                    }
                }

                if(mode == "divide"){

                    for(var i=0; i < destination.pixels.data.length; i+= 4){

                        destination.pixels.data[i] += (255 * opaque) - source.pixels.data[i];
                        destination.pixels.data[i+1] += (255 * opaque) - source.pixels.data[i+1];
                        destination.pixels.data[i+2] += (255 * opaque) - source.pixels.data[i+2];

                    }
                }
                return destination.pixels;

            }
})();