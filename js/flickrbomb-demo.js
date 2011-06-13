//FlickrBomb by ZURB 2011; http://www.zurb.com/playground
var startFlickrBomb = function () {
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

		nodeID: null,

        template: _.template('<div id="<%= this.nodeID %>" class="flickrbombWrapper"><img class="flickrbomb" src="" /><a href="#" title="Setup" class="setupIcon"></a></div><div class="flickrbombFlyout"><div class="content"><a href="#" title="Previous Page" class="prev">&#9664;</a><a href="#" title="Next Page" class="next">&#9654;</a></div></div>'),

        initialize: function (options) {
          _.bindAll(this, 'addImage', 'updateSrc', 'setDimentions', 'updateDimentions');
          var keywords = options.img.attr('src').replace('flickr://', '');

          this.$el = $(this.el);
		  
          this.image = new Image({keywords: keywords, id: options.img.attr('id')});
          this.image.flickrImages.bind('add', this.addImage);
          this.image.bind('change:src', this.updateSrc);

		  this.nodeID = this.image.id.replace(/ /g,'');
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
    var imageView = new ImageView({img: img});
    img.replaceWith(imageView.render().el);
  });
  
})(jQuery);
}
startFlickrBomb();