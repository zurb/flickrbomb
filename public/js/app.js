require(['order!underscore', 'order!backbone', 'order!backbone-localstorage', 'order!views/imageview'], function (u, b, bl, ImageView) {
  require.ready(function () {
    $("img[src^='flickr://']").each(function () {
      var img = $(this);
      var imageView = new ImageView({img: img});
      img.replaceWith(imageView.render().el);
    });
    
  });
});
