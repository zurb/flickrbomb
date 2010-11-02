define(['collections/flickrimages'], function (FlickrImages) {
  return Backbone.Model.extend({

    localStorage: new Store("flickrBombImages"),

    initialize: function () {
      this.flickrImages = new FlickrImages();
      this.flickrImages.fetch(this.get('keywords'));
      this.set({id: this.get("id") || this.get('keywords')});

      this.bind('change:src', this.changeSrc);
    },

    changeSrc: function () {
      this.save();
    }

  });
});