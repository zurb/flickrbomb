//FlickrBomb by ZURB 2011; http://www.zurb.com/playground
var startFlickrBomb = function () {
function supports_local_storage() { try { return 'localStorage' in window && window['localStorage'] !== null; } catch(e){ return false; } }

if (supports_local_storage()) {
  
  // A simple module to replace `Backbone.sync` with *localStorage*-based
  // persistence. Models are given GUIDS, and saved into a JSON object. Simple
  // as that.

  // Generate four random hex digits.
  function S4() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };

  // Generate a pseudo-GUID by concatenating random hexadecimal.
  function guid() {
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  };

  // Our Store is represented by a single JS object in *localStorage*. Create it
  // with a meaningful name, like the name you'd give a table.
  var Store = function(name) {
    this.name = name;
    var store = localStorage.getItem(this.name);
    this.data = (store && JSON.parse(store)) || {};
  };

  _.extend(Store.prototype, {

    // Save the current state of the **Store** to *localStorage*.
    save: function() {
      localStorage.setItem(this.name, JSON.stringify(this.data));
    },

    // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
    // have an id of it's own.
    create: function(model) {
      if (!model.id) model.id = model.attributes.id = guid();
      this.data[model.id] = model;
      this.save();
      return model;
    },

    // Update a model by replacing its copy in `this.data`.
    update: function(model) {
      this.data[model.id] = model;
      this.save();
      return model;
    },

    // Retrieve a model from `this.data` by id.
    find: function(model) {
      return this.data[model.id];
    },

    // Return the array of all models currently in storage.
    findAll: function() {
      return _.values(this.data);
    },

    // Delete a model from `this.data`, returning it.
    destroy: function(model) {
      delete this.data[model.id];
      this.save();
      return model;
    }

  });
  // Override `Backbone.sync` to use delegate to the model or collection's
  // *localStorage* property, which should be an instance of `Store`.
  Backbone.sync = function(method, model, success, error) {

    var resp;
    var store = model.localStorage || model.collection.localStorage;

    switch (method) {
      case "read":    resp = model.id ? store.find(model) : store.findAll(); break;
      case "create":  resp = store.create(model);                            break;
      case "update":  resp = store.update(model);                            break;
      case "delete":  resp = store.destroy(model);                           break;
    }

    if (resp) {
      success(resp);
    } else {
      // Swallow errors for now
      // error("Record not found");
    }
  };
} else {
  Backbone.sync = $.noop;
}
//FlickrBomb by ZURB 2011; http://www.zurb.com/playground
(function ($) {
  var localStorage = (supports_local_storage()) ? new Store("flickrBombImages") : null,

      FlickrImage = Backbone.Model.extend({

        fullsize_url: function () {
          return this.image_url('medium');
        },

        thumb_url: function () {
          return this.image_url('square');
        },

        image_url: function (size) {
          var size_code;
          switch (size) {
            case 'square': size_code = '_s'; break; // 75x75
            case 'medium': size_code = '_z'; break; // 640 on the longest side
            case 'large': size_code = '_b'; break; // 1024 on the longest side
            default: size_code = '';
          }
          return "http://farm" + this.get('farm') + ".static.flickr.com/" + this.get('server') + "/" + this.get('id') + "_" + this.get('secret') + size_code + ".jpg";
        }

      }),
      
      Image = Backbone.Model.extend({

        localStorage: localStorage,

        initialize: function () {
          _.bindAll(this, 'loadFirstImage');
          this.flickrImages = new FlickrImages();
          this.flickrImages.fetch(this.get('keywords'), this.loadFirstImage);
          this.set({id: this.get("id") || this.get('keywords')});
      
          this.bind('change:src', this.changeSrc);
        },

        changeSrc: function () {
          this.save();
        },
    
        loadFirstImage: function () {
          if (this.get('src') === undefined) {
            this.set({src: this.flickrImages.first().image_url()});
          }
        }

      }),
      
      FlickrImages = Backbone.Collection.extend({

        model: FlickrImage,

        key: '16bea98fa32f982f4502fb3df0903404',

        page: 1,

        fetch: function (keywords, success) {
          var self = this;
          success = success || $.noop;
          this.keywords = keywords || this.keywords;
          $.ajax({
      			url: 'http://api.flickr.com/services/rest/',
      			data: {
      				api_key: self.key,
      				format: 'json',
      				method: 'flickr.photos.search',
      				tags: this.keywords,
      				per_page: 9,
      				page: this.page
      			},
      			dataType: 'jsonp',
      			jsonp: 'jsoncallback',
      			success: function (response) {
      			  self.add(response.photos.photo);
      			  success();
      			}
      		});
        },

        nextPage: function () {
          this.page += 1;
          this.remove(this.models);
          this.fetch();
        },
		
		prevPage: function() {
		  if (this.page > 1) this.page -= 1;
		  this.remove(this.models);
		  this.fetch();
		}

      }),
      
      FlickrImageView = Backbone.View.extend({

        tagName: 'a',

        template: _.template('<img src="<%= thumb_url() %>" />'),

        className: 'photo',

        events: {"click": "setImageSrc"},

        render: function() {
          $(this.el).html(this.template(this.model));
          $(this.el).addClass('photo');
          return this;
        },

        setImageSrc: function (event) {
          this.options.image.set({'src': this.model.fullsize_url()});
        }

      }),
      
      ImageView = Backbone.View.extend({

        tagName: "div",

        className: "flickrbombContainer",

        template: _.template('<div class="flickrbombWrapper"><img class="flickrbomb" src="" /><a href="#" title="Setup" class="setupIcon"></a></div><div class="flickrbombFlyout"><div class="content"><a href="#" title="Previous Page" class="prev">&#9664;</a><a href="#" title="Next Page" class="next">&#9654;</a></div></div>'),

        initialize: function (options) {
          _.bindAll(this, 'addImage', 'updateSrc', 'setDimentions', 'updateDimentions');
          var keywords = options.img.attr('src').replace('flickr://', '');

          this.$el = $(this.el);

          this.image = new Image({keywords: keywords, id: options.img.attr('id')});
          this.image.flickrImages.bind('add', this.addImage);
          this.image.bind('change:src', this.updateSrc);
        },

        events: {
          "click .setupIcon": "clickSetup",
          "click .flickrbombFlyout a.photo": "selectImage",
          "click .flickrbombFlyout a.next": "nextFlickrPhotos",
		  "click .flickrbombFlyout a.prev": "prevFlickrPhotos"
        },

        render: function() {
          $(this.el).html(this.template());
          this.image.fetch();
          this.resize();
          return this;
        },

        updateSrc: function (model, src) {
          var self = this;
          this.$('img.flickrbomb')
              .css({top: 'auto', left: 'auto', width: 'auto', height: 'auto'})
              .attr('src', '')
              .bind('load', self.setDimentions)
              .attr('src', src);
        },

        setDimentions: function (event) {
          this.image.set({
            width: this.$('img').width(),
            height: this.$('img').height()
          });
          this.updateDimentions(this.image);
          $(event.target).unbind('load');
        },

        updateDimentions: function () {
          var image = this.$('img.flickrbomb'),
              flickrWidth = this.image.get('width'),
              flickrHeight = this.image.get('height'),
              flickrAspectRatio = flickrWidth / flickrHeight,
              clientWidth = this.$('div.flickrbombWrapper').width(),
              clientHeight = this.$('div.flickrbombWrapper').height(),
              clientAspectRatio = clientWidth / clientHeight;

          if (flickrAspectRatio < clientAspectRatio) {
            image.css({
                width: '100%',
                height: null
              });
            image.css({
                top: ((clientHeight - image.height()) / 2) + 'px',
                left: null
              });
          } else {
            image.css({
                height: '100%',
                width: null
            });
            image.css({
                left: ((clientWidth - image.width()) / 2) + 'px',
                top: null
              });
          }
        },

        addImage: function (image) {
          this.flickrImageView = new FlickrImageView({model: image, image: this.image});
          this.$('.flickrbombFlyout').append(this.flickrImageView.render().el);
        },

        clickSetup: function (event) {
          event.preventDefault();
          this.toggleFlyout();
        },

        toggleFlyout: function () {    
          this.$('.flickrbombFlyout').toggle();
        },

        selectImage: function (event) {
          event.preventDefault();

          this.toggleFlyout();
        },

        nextFlickrPhotos: function (event) {
          event.preventDefault();

          this.$('.flickrbombFlyout').find('a.photo').remove();
          this.image.flickrImages.nextPage();
        },
		prevFlickrPhotos: function (event) {
          event.preventDefault();

          this.$('.flickrbombFlyout').find('a.photo').remove();
          this.image.flickrImages.prevPage();
        },

        resize: function () {
          this.$('div.flickrbombWrapper').css({
              width: this.width() + 'px', 
              height: this.height() + 'px'
          });
        },

        width: function () {
          return parseInt(this.options.img.width());
        },

        height: function () {
          return parseInt(this.options.img.height());
        }

      });

  $("img[src^='flickr://']").each(function () {
    var img = $(this);
	$('.flickrbombContainer').css('height', img.height()+'px !important');
    var imageView = new ImageView({img: img});
    img.replaceWith(imageView.render().el);
  });
  
})(jQuery);
}
startFlickrBomb();