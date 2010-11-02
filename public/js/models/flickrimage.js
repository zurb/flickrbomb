define(function () {
  return Backbone.Model.extend({

    fullsize_url: function () {
      return this.image_url('medium');
    },

    thumb_url: function () {
      return this.image_url('square');
    },

    image_url: function (size) {
      var size_code;
      switch (size) {
        case 'square': size_code = '_s'; break;
        case 'medium': size_code = '_z'; break;
        default: size_code = '';
      }
      return "http://farm" + this.get('farm') + ".static.flickr.com/" + this.get('server') + "/" + this.get('id') + "_" + this.get('secret') + size_code + ".jpg";
    }

  });
});