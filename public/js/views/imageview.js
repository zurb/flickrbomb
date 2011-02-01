define(['models/image', 'views/flickrimageview'], function (Image, FlickrImageView) {
  return Backbone.View.extend({

    tagName: "div",

    className: "flickrbombContainer",

    template: _.template($('#imageTemplate').html()),

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
      "click .flickrbombFlyout a.next": "nextFlickrPhotos"
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
      return parseInt(this.options.img.width());
    }

  });
});
