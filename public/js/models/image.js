define(['collections/flickrimages'], function (FlickrImages) {
  var localStorage = (supports_local_storage()) ? new Store("flickrBombImages") : null;
  return Backbone.Model.extend({

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

  });
});