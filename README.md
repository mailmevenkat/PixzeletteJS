#PixzeletteJS

A Lightweight native JavaScript library for image manipulation on/using canvas.

<img src="http://i.imgur.com/2cyHLeX.png"></img>
####Include Pixzelette:
```html
<script type="text/javascript" src="path/to/pixzelette.min.js"></script>
```
####Topics:
* [How to apply "basic" effects?] (#basics)
* [How to "blend" two images?] (#blends)
* [How to apply pre-defined "filters"?] (#filters)
* [How to apply pre-defined "custom gradients"?] (#custom-gradients)
* [How to apply all effects together using callbacks?] (#multiple)
* [How to get data after manipulation?] (#data)

####Basics:
```javascript
var element = document.querySelector("#element1"); //must be a valid image or canvas
```
```javascript
var args = {w: width, h: height, x: x-axis, y: y-axis} //args must be a valid javascript object
```

---

```javascript
var args = null; //if set to null, default value is used
```
```javascript
var basics = {brightness: 0.5, contrast: 0.5, red: 0.3};
var Pixzel = new Pixzelette(element, args, function(that){
              that.effect(basics);
});
```
#####Available Effects:
* brightness [ -1 to 1 ]
* contrast [ -1 to 1 ]
* sepia [ -1 to 1 ]
* hue [ -1 to 1 ]
* saturation [ -1 to 1 ]
* value [ -1 to 1 ]
* red [ 0 to 1 ]
* green [ 0 to 1 ]
* blue [ 0 to 1 ]
* alpha [ 0 to 1 ]
* desaturate [ -1 to 1 ]

####Blends:
```javascript
var element = document.querySelector("#element1"); //must be a valid image or canvas
```
```javascript
var args = {w: width, h: height, x: x-axis, y: y-axis} //args must be a valid javascript object
```

---

```javascript
var args = null; //if set to null, default value is used
```
```javascript
var basics = {brightness: 0.5, contrast: 0.5, red: 0.3};
var Pixzel = new Pixzelette(element, args, function(that){
              var element = document.querySelector("#element2"); //must be a valid image or canvas
              var mode = "addition"; //must be a valid javascript string
              var opacity = 1; //must be a valid javascript integer or float. Range: 0 to 1
              that.blend(element, mode, opacity);
});
```
#####Available blends: (19 blends)
* none
* addition
* subtract
* multiply
* divide
* overlay
* screen
* darken
* lighten
* dodge
* burn
* soft light
* hard light
* difference
* exclusion
* hue
* saturation
* color
* luminosity

####Filters:
```javascript
var element = document.querySelector("#element1"); //must be a valid image or canvas
```
```javascript
var args = {w: width, h: height, x: x-axis, y: y-axis} //args must be a valid javascript object
```

---

```javascript
var args = null; //if set to null, default value is used
```
```javascript
var filter = "tamil";
var Pixzel = new Pixzelette(element, args, function(that){
              that.filter(filter);
});
```
#####Available Filters: (17 filters)
* antiq
* aqua
* beat
* cassie
* deveil
* ember
* evening
* hello
* may
* natalie
* nilam
* retro
* shallow
* sketchy
* tamil
* valet
* zephyr

####Custom Gradients:
```javascript
var element = document.querySelector("#element1"); //must be a valid image or canvas
```
```javascript
var args = {w: width, h: height, x: x-axis, y: y-axis} //args must be a valid javascript object
```

---

```javascript
var args = null; //if set to null, default value is used
```
```javascript
var Pixzel = new Pixzelette(element, args, function(that){
              var gradient = "vignette"; //must be a valid javascript string
              var opacity = 1; //must be a valid javascript integer or float. Range: 0 to 1
              that.custom(gradient, opacity);
});
```
#####Available Custom gradients: (8 gradients)
* vignette
* red
* green
* blue
* orange
* purple
* yellow
* cream

####Multiple

```javascript
var element = document.querySelector("#element1"); //must be a valid image or canvas
```
```javascript
var args = {w: width, h: height, x: x-axis, y: y-axis} //args must be a valid javascript object
```

---

```javascript
var args = null; //if set to null, default value is used
```
```javascript
var filter = "zephyr"; var gradient = "vignette"; //must be a valid javascript string
var opacity = 1; //must be a valid javascript integer or float. Range: 0 to 1
var Pixzel = new Pixzelette(element, args, function(that){
                  that.filter(filter).custom(gradient, opacity);
});
```
####Callback inside Callback:
```javascript
var element = document.querySelector("#element1"); //must be a valid image or canvas
```
```javascript
var args = {w: width, h: height, x: x-axis, y: y-axis} //args must be a valid javascript object
```

---

```javascript
var args = null; //if set to null, default value is used
```
```javascript
var filter = "zephyr"; var gradient = "vignette"; //must be a valid javascript string
var opacity = 1; //must be a valid javascript integer or float. Range: 0 to 1
var Pixzel = new Pixzelette(element, args, function(that){
                  that.filter(filter, function(that) {
                        that.custom(gradient, opacity);
                  }); 
});
```
####Data
```javascript
var Pixzel = new Pixzelette(element, args, function(that){...});
```
```javascript
Pixzel.getCanvas(); //returns canvas element
```
```javascript
var type = "jpg"; //must be a valid javascript string. Default is png
var quality = 0.8; //must be a valid javascript integer or float. Range: 0 to 1. Default is 1
Pixzel.getImage(type, quality); //returns image element
Pixzel.getDataURL(type, quality); //returns base64 encoded data url
```
#####Available types:
* png
* jpg
* jpeg
* webp

```javascript
Pixzel.getImageData(); //returns pixel data
```

#####Note:
This is possible
```javascript
Pixzel.effect({brightness: 0.1}).filter("cassie"); //all manipulators, returns back the object
```
This is not possible
```javascript
Pixzel.getCanvas().filter("cassie"); //since getCanvas(), returns back canvas element
```

>Code licensed under MIT License | Created by Venkateswaran Selvan
