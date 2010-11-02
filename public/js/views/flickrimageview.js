define(function () {
  return Backbone.View.extend({

    tagName: 'a',

    template: _.template($('#flickrImageTemplate').html()),

    events: {"click": "setImageSrc"},

    render: function() {
      $(this.el).html(this.template(this.model));
      return this;
    },

    setImageSrc: function (event) {
      this.options.image.set({'src': this.model.fullsize_url()});
    }

  });
});