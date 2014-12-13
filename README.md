#PixzeletteJS

A Lightweight native JavaScript library for image manipulation on/using canvas.

<img src="http://i.imgur.com/2cyHLeX.png"></img>
####Include Pixzelette:
```html
<script type="text/javascript" src="path/to/pixzelette.min.js"></script>
```
####Initialise Pixzelette:
```javascript
var Pixzel = new Pixzelette(element); //element must be a valid image or canvas
```
---
```javascript
var args = {w: width, h: height, x: x-axis, y: y-axis}//args must be a valid javascript object 
var Pixzel = new Pixzelette(element, args); //element must be a valid image or canvas
```
####Types of manipulation:
* [Basics] (#basics)
* [Blends] (#blends)
* [Filters] (#filters)
* [Custom Gradients] (#custom-gradients)

####How to get data after manipulation?
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
####Basics:
```javascript
var basics = {brightness: 0.5, contrast: 0.5, red: 0.3};
Pixzel.effect(basics);//argument passed must be a valid javascript object
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
var element = document.getElementsByTagName("img")[1]; //must be a valid image or canvas
var mode = "addition"; //must be a valid javascript string
var opacity = 1; //must be a valid javascript integer or float. Range: 0 to 1
Pixzel.blend(element, mode, opacity);
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
var filter = "tamil";
Pixzel.filter(filter);//argument passed must be a valid javascript string
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
var gradient = "vignette"; //must be a valid javascript string
var opacity = 1; //must be a valid javascript integer or float. Range: 0 to 1
Pixzel.custom(gradient, opacity);
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

>Code licensed under MIT License | Created by Venkateswaran Selvan
