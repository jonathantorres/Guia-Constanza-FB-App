var CONSTANZA = {}

CONSTANZA.app = new function() {

	/* LightBox Reglas */
	this.termsLightbox = function() {
		var $lightBox = $('div.lightbox');
		var $boxbg = $('.termsbox');
		
		$lightBox.fadeIn('fast', function() {
			$boxbg.fadeIn('fast');
		});
		
		/* Close the lightbox */
		$('a.closebtn').click(function(e) {
			e.preventDefault();
			
			$boxbg.fadeOut('fast', function() {
				$lightBox.fadeOut('fast');
			});
		});
	}
	
	/* Sharing Lightbox */
	this.shareLightbox = function() {
		var $lightBox = $('div.lightbox');
		var $sharebg = $('.sharebg');
		
		var $activeDiv = $('.sharecontent .active');
		var $nextDiv = $activeDiv.next();
		
		var $selectedLi = $('.sharenav li.selected');
		var $nextLi = $selectedLi.next();
		
		/* Show lightbox */
		$lightBox.fadeIn('fast', function() {
			$sharebg.css({ 'display' : 'block' });
			
			/* Make sure the current "active" div is always visible */
			if (!$activeDiv.is(':visible')) $activeDiv.show();
			
			/* click on "Saltar este paso" buttons */
			$('.sharecontent').find('a.skip').each(function() {
				$(this).click(function(e) {
					e.preventDefault();
					
					/* Fade out the "active" div : Same with the <ol> navigation */
					$activeDiv.fadeOut('fast', function() {
						$activeDiv.removeClass().addClass('invitations');
						
						$selectedLi.removeClass();
						$nextLi.addClass('selected');
						
						/* Fade in the next div, it becomes the "active" one : Same with the <ol> navigation */
						$nextDiv.fadeIn('fast', function() {
							$nextDiv.addClass('active');
							$activeDiv = $nextDiv;
							$nextDiv = $activeDiv.next();
							
							$selectedLi = $nextLi;
							$nextLi = $selectedLi.next();
						});
					});
				});
			});
			
			/* Invitar amigos : "compartir en mi muro" CTA */
			$('#invite_friends a.blue_btn').click(function(e) {
				e.preventDefault();
				console.log('Invitar amigos');
			});
			
			/* Compartir en mi muro : "compartir en mi muro" CTA */
			$('#share_fb a.blue_btn').click(function(e) {
				e.preventDefault();
				console.log('Compartir en mi muro');
			});
			
			/* Compartir en Twitter : "compartir Twitter" CTA */
			$('#share_twitter a.blue_btn').click(function(e) {
				e.preventDefault();
				console.log('Compartir en Twitter');
			});
			
			/* Close the lightbox */
			$('a.closebtn').click(function(e) {
				e.preventDefault();
				
				$sharebg.fadeOut('fast', function() {
					/* Reset everything back */
					$('#invite_friends').show().removeClass().addClass('invitations active');
					$('#share_fb').hide().removeClass().addClass('invitations');
					$('#share_twitter').hide().removeClass().addClass('invitations');
					$('.sharenav li').removeClass();
					$('.sharenav li#invite').addClass('selected');
					
					/* re-assing vars */
					$activeDiv = $('.sharecontent .active');
					$nextDiv = $activeDiv.next();
					$selectedLi = $('.sharenav li.selected');
					$nextLi = $selectedLi.next();
				
					$lightBox.fadeOut('fast');
				});
			});
		});
	}
	
	/* LightBox Hotel Details */
	this.hotelLightbox = function() {
		var $lightBox = $('div.lightbox');
		var $hotelbg = $('.hotel_details');
		var $hotelGallery = $('.hotel_gallery');
		var $rightArrow = $hotelGallery.find('span.arrow.right');
		var $leftArrow = $hotelGallery.find('span.arrow.left');
		var currentImg = 1;
		var numOfImages = 5;
		
		$lightBox.fadeIn('fast', function() {
			$hotelbg.fadeIn('fast');
		});
		
		/* Close the lightbox */
		$('a.closebtn').click(function(e) {
			e.preventDefault();
			currentImg = 1;
			
			$hotelbg.fadeOut('fast', function() {
				$lightBox.fadeOut('fast');
			});
		});
		
		/* Hotel Gallery */
		$hotelGallery.find('img').each(function(i) {
			if (i == 0) {
				$(this).css( { display: 'block' } );
			} else {
				$(this).css( { display: 'none' } );
			}
		});
		
		/* reset selected icons */
		$('.gallery_nav span').removeClass().addClass('item');
		$('.gallery_nav span#' + currentImg).addClass('selected');
		
		$rightArrow.click(function(e) {
			if (currentImg >= numOfImages) {
				currentImg = 5;
				return;
			}
			
			$hotelGallery.find('.img' + currentImg).fadeOut('fast');
			currentImg++;
			$hotelGallery.find('.img' + currentImg).fadeIn('fast');
			
			$('.gallery_nav span').removeClass().addClass('item');
			$('.gallery_nav span#' + currentImg).addClass('selected');
		});
		
		$leftArrow.click(function(e) {
			if (currentImg <= 1) {
				currentImg = 1;
				return;
			}
			
			$hotelGallery.find('.img' + currentImg).fadeOut('fast');
			currentImg--;
			$hotelGallery.find('.img' + currentImg).fadeIn('fast');
			
			$('.gallery_nav span').removeClass().addClass('item');
			$('.gallery_nav span#' + currentImg).addClass('selected');
		});
	}
}


$(document).ready(function() {
	/* click to open Reglas Lightbox */
	$('#copyrights a.the_terms').click(function(e) {
		e.preventDefault();
		CONSTANZA.app.termsLightbox();
	});
	
	/* click to open Hotel Details Lightbox */
	$('#hotel_lightbox').click(function(e) {
		e.preventDefault();
		CONSTANZA.app.hotelLightbox();
	});
	
	/* click to open sharing Lightbox */
	$('div.square').each(function() {
		/* Cant click on "done" / transparent squares */
		if ($(this).hasClass('done')) return;
		
		$(this).find('a.blue_btn').click(function(e) {
			e.preventDefault();
			CONSTANZA.app.shareLightbox();
		});
	});
});