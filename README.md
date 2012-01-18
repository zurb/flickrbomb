# Usage

* Include https://github.com/documentcloud/underscore/ and https://github.com/documentcloud/backbone.
* Include `flickrbomb.js`
* Add some flickr placeholders like this: `<img src="flickr://puppy" width="170px" height="170px">`
* Instantiate a bomb `var fbomb = flickrBomb();`
* Bombs away `fbomb.bomb()`
    * Repeat if you ever dynamically add more placeholder tags.

See http://www.zurb.com/playground/rapid-prototyping-with-flickrbomb for more info on options for placeholders.


## Fork

This is a fork. Why?

* Original used jeromegn/Backbone.localStorage, which is destructive to `Backbone.sync`. Not what you want if you use this in a Backbone app.
* I traded convenience for flexibility. You can now call `bomb()` whenever you want instead of a one-off or inefficient function.
    
```
flickrBomb v1
www.ZURB.com/playground
Copyright 2011, ZURB
Free to use under the MIT license.
http://www.opensource.org/licenses/mit-license.php
```