define(['models/flickrimage'], function (FlickrImage) {
  return Backbone.Collection.extend({

    model: FlickrImage,

    key: '16bea98fa32f982f4502fb3df0903404',
    
    page: 1,

    fetch: function (keywords) {
      var self = this;
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
  			}
  		});
    },
    
    nextPage: function () {
      this.page += 1;
      this.remove(this.models);
      this.fetch();
    }

  });
});