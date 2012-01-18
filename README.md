<<<<<<< HEAD
# flickrBomb

flickrBomb provides an easy way for you to fill your prototypes with relevant content, and not just those dull gray placeholder images.

## This is a fork

This version is slightly tweaked in that it does not rely on jeromegn/Backbone.localStorage included, that functionality is baked into the class. The reason is because the plugin is destructive and replaces `Backbone.sync` with localStorage, which is probably not what you want if you are using flickrBomb on a Backbone project.

I also made this a class instead of a single-fire or very inefficient function, in case you wanted to call `bomb()` manually after you dynamically add placeholders.

## Usage

Include `underscore.js` and `backbone.js`. Include `flickrbomb.js`, this creates a `flickrBomb` class.

* Create a bomb `var fbomb = flickrBomb()`
* Bombs away `fbomb.bomb()`
* Repeat
    * If you dynamically add more img tags with `flickr://puppy`, then call `fbomb.bomb()`, it will re-bomb those images only.

To create placeholders to be replaced with flickr images, create image tags like this `<img src="flickr://Kevin Bacon" width="175px" height="175px">`. "Kevin Bacon" will be the keyword used for the flickr search.

See http://www.zurb.com/playground/rapid-prototyping-with-flickrbomb for more info on options for placeholders.

```
=======
# Usage

* Include documentcloud/underscore and documentcloud/backbone.
* Include `flickrbomb.js`
* Add some flickr placeholders like this: `<img src="flickr://puppy" width="170px" height="170px">`
* Instantiate a bomb `var fbomb = flickrBomb();`
* Bombs away `fbomb.bomb()`
    * Repeat if you ever dynamically add more placeholder tags.

## Fork

This is a fork. Why?

* Original used jeromegn/Backbone.localStorage, which is destructive to `Backbone.sync`. Not what you want if you use this in a Backbone app.
* I traded convenience for flexibility. You can now call `bomb()` whenever you want instead of a one-off or inefficient function.
    
```
flickrBomb v1
>>>>>>> stuff
www.ZURB.com/playground
Copyright 2011, ZURB
Free to use under the MIT license.
http://www.opensource.org/licenses/mit-license.php
```