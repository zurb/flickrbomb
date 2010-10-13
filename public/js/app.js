$(document).ready(function() {

	var mainImg = $('.flickrbombWrapper img');

	$('.setupIcon').click(function() {
		$('#flickrbombFlyout').show();
	});
	
	$('#flickrbombFlyout a').click(function(e) {
		e.preventDefault();
		var newSrc = $(this).children().attr('src')
		mainImg.attr('src', newSrc);
		$('#flickrbombFlyout').hide();
	})
	
});