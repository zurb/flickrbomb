(function($){
	var currentValue = false,
	el = $('#demo-content span');
	el.focus(function(){
		currentValue = $(this).text();
	});
	el.keypress(function (e) {
		if (e.which == 13) {
			e.preventDefault();
			updateIMG($(this));
		}
	})
	el.focusout(function() {
		updateIMG($(this));
	});
	function updateIMG(argu) {
		if (argu.text() !== currentValue) {
			var keywords = $('#keywords').text(),
			width = $('#width').text(),
			height = $('#height').text();
			$('#demo-splash').html('<img src="flickr://' + keywords + '" width="' + width + '" height="' + height + '"><span>Loading New Demo Content</span>');
			startFlickrBomb();
		} else {
			return false;
		}
	}
})(jQuery);