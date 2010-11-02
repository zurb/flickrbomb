define(['models/image', 'views/flickrimageview'], function (Image, FlickrImageView) {
  return Backbone.View.extend({

    tagName: "div",

    className: "flickrbombContainer",

    template: _.template($('#imageTemplate').html()),

    initialize: function (options) {
      _.bindAll(this, 'addImage', 'updateSrc', 'setDimentions', 'updateDimentions');
      var keywords = options.img.attr('src').replace('flickr://', '');

      this.image = new Image({keywords: keywords, id: options.img.attr('id')});
      this.image.flickrImages.bind('add', this.addImage);
      this.image.bind('change:src', this.updateSrc);
      this.image.bind('change', this.updateDimentions);
    },

    events: {
      "click .setupIcon": "clickSetup",
      "click .flickrbombFlyout a": "selectImage",
      "load img.flickrbomb": "setDimentions"
    },

    render: function() {
      $(this.el).html(this.template());
      this.image.fetch();
      this.resizeAndCrop();
      return this;
    },

    updateSrc: function (model, src) {
      var self = this;
      this.$('img.flickrbomb').bind('load', self.setDimentions)
          .attr('src', src);
    },

    setDimentions: function (event) {
      this.image.set({
        width: $(event.target).width(),
        height: $(event.target).height()
      });
      $(event.target).unbind('load');
    },

    updateDimentions: function (model) {
      var image = this.$('img.flickrbomb'),
          flickrWidth = model.get('width'),
          flickrHeight = model.get('height'),
          flickrAspectRatio = flickrWidth / flickrHeight,
          clientWidth = this.width(),
          clientHeight = this.height(),
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
      var flickrImageView = new FlickrImageView({model: image, image: this.image});
      this.$('.flickrbombFlyout').append(flickrImageView.render().el);
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

    resizeAndCrop: function () {
      this.$('div.flickrbombWrapper').css({
          width: this.width() + 'px', 
          height: this.height() + 'px'
      });
    },

    width: function () {
      return parseInt(this.options.img.attr('data-width'));
    },

    height: function () {
      return parseInt(this.options.img.attr('data-height'));
    }

  });
});
