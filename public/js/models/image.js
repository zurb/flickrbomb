define(['collections/flickrimages'], function (FlickrImages) {
  return Backbone.Model.extend({

    localStorage: new Store("flickrBombImages"),

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

  });
});