jQuery(document).ready(function(){
	
//fancybox	
jQuery('[data-fancybox]').fancybox({
	youtube:{
		showinfo:0
	}, 
	loop: true
});
	
//scroll
//When distance from top = 250px fade button in/out	
jQuery(window).scroll(function(){
	if (jQuery(this).scrollTop() > 250) {
		jQuery('#scrollup').fadeIn(300);
	} else {
		jQuery('#scrollup').fadeOut(300);
	}
});	

//On click scroll to top of page t = 1000ms
jQuery('#scrollup').click(function(e){
	e.preventDefault();
	jQuery("html, body").stop(true).animate({ scrollTop: 0 }, 1000);
	return false;
});	
//this makes the screen smooth scroll down the page to the right area.	
jQuery(document).on('click', '.navBtn', function(){		
	var hash = this.hash;
	jQuery("html, body").stop().animate({ scrollTop: jQuery(hash).offset().top-150}, 1000);	
	return false;
});	
	
//change hero image based on screen size	
function changeHero() {
	var $windowWidth = jQuery(window).width();
	if ($windowWidth < 780) {
		jQuery('.heroImg').attr('src', 'img/hero/hero_sm.jpg');
	} else {
		jQuery('.heroImg').attr('src', 'img/hero/hero_lg.jpg');
	}
}
jQuery(window).resize(function() {
	changeHero();
});
changeHero();		
function changeIcons() {
	var $windowWidth = jQuery(window).width();
	if ($windowWidth < 640) {
		jQuery('.seven').attr('src', 'img/movewell/seven_white.png');
		jQuery('.customprograms').attr('src', 'img/movewell/customprograms_white.png');
		jQuery('.phone').attr('src', 'img/movewell/phone_white.png');
	} else {
		jQuery('.seven').attr('src', 'img/movewell/seven.png');
		jQuery('.customprograms').attr('src', 'img/movewell/customprograms.png');
		jQuery('.phone').attr('src', 'img/movewell/phone.png');
	}
}
jQuery(window).resize(function() {
	changeIcons();
});
changeIcons();		

//nav control active class
	
function checkNavActive() {
	jQuery('.navBtn h5').removeClass('active');
	if (jQuery(window).scrollTop() >= $('#contact').offset().top - 160) {		
		jQuery('.nav6 h5').addClass('active');
	} else if (jQuery(window).scrollTop() >= $('#wellness').offset().top - 160) {
		jQuery('.nav5 h5').addClass('active');
	} else if (jQuery(window).scrollTop() >= $('#experience').offset().top - 160) {
		jQuery('.nav4 h5').addClass('active');
	} else if(jQuery(window).scrollTop() >= $('#potential').offset().top - 160) {
		jQuery('.nav2 h5').addClass('active');
	} else if(jQuery(window).scrollTop() >= $('#knowledge').offset().top - 160) {
		jQuery('.nav1 h5').addClass('active');
	}
}		
	
//PUT THIS BACK IN WHEN ADDING BACK IN PACKAGES TO HOME PAGE
//function checkNavActive() {
//	jQuery('.navBtn h5').removeClass('active');
//	if (jQuery(window).scrollTop() >= $('#contact').offset().top - 160) {		
//		jQuery('.nav6 h5').addClass('active');
//	} else if (jQuery(window).scrollTop() >= $('#wellness').offset().top - 160) {
//		jQuery('.nav5 h5').addClass('active');
//	} else if (jQuery(window).scrollTop() >= $('#experience').offset().top - 160) {
//		jQuery('.nav4 h5').addClass('active');
//	} else if (jQuery(window).scrollTop() >= $('#packages').offset().top - 160) {
//		jQuery('.nav3 h5').addClass('active');
//	} else if(jQuery(window).scrollTop() >= $('#potential').offset().top - 160) {
//		jQuery('.nav2 h5').addClass('active');
//	} else if(jQuery(window).scrollTop() >= $('#knowledge').offset().top - 160) {
//		jQuery('.nav1 h5').addClass('active');
//	}
//}	
	
jQuery(window).on('scroll', function() {
	checkNavActive();
}); 	
	
jQuery('.navBtn h5').on('click', checkNavActive());	
checkNavActive();	

//trailer carousel using siema 	
var trailerCarousel = new Siema({
	perPage: {
		640: 2,
		769: 3, // 2 items for viewport wider than 800px
		1100: 4 // 3 items for viewport wider than 1240px
	},
	loop: true,
	duration: 400,
	selector: '.siema'
});	
var $prevTrailer = jQuery('.trailerPrev');
var $nextTrailer = jQuery('.trailerNext');
jQuery($prevTrailer).click(function(){
	trailerCarousel.prev(1);
});	
jQuery($nextTrailer).click(function(){
	trailerCarousel.next(1);
});	
		
	
//footer

var today = new Date();
var year = today.getFullYear();

var footerDate = document.getElementById("date");
footerDate.innerHTML = "<p>&copy;" + year + " OmniSport Fitness - All Rights Reserved</p>";

	
	
/*--- Newsletter ---*/

  var $submitButton = $("#mc_embed_signup .button");
  var $emailField = $("#mc-embedded-subscribe-form input.email");

	function emailIsValid(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

  // Enable/Disable the submit button if the conditions are met.
  function newsletterUpdateSubmit() {
	var emailText = $('input[type="email"]').val();
	if (emailIsValid(emailText)) {
		$submitButton.prop("disabled", false);
	} else {
		$submitButton.prop("disabled", true);
	}
  }

  $submitButton.prop("disabled", true);

  $emailField.keyup(function () {
	newsletterUpdateSubmit();
  });
	


//after submitting the form, this updates what is in the newsletter box and calls the checkClose function
	
	var response = '<span style="color: red; font-weight: 600;">ALMOST FINISHED...to complete the subscription process, please click the link in the email we just sent you.</span>';
	
	var originalText = 'Have questions, want to sign up for a virtual trial, or for any other inquiries, please email us at <a class="mailinglistEmailName" href="mailto:info@omnisportfitness.com">info@omnifitnesssports.com</a>.'
	
	jQuery('#mc-embedded-subscribe').click(function(){
//		var $responseText = jQuery('<p>', {
//			text: response,
//			class: "responseText"
//		})
		jQuery(".submittedRequest").html(response);
		
		setTimeout(function(){
			jQuery('.submittedRequest').html(originalText);
		},5000);
		setTimeout(function(){
			$submitButton.prop("disabled", true);
		},200);		
	});	

  /*--- END Newsletter ---*/		

//Contact Us 
	//note: need to grab the actual form so that on submit, "this" is the fields of the form. This is what you are serializing and sending to the php file. 
$("#contact-form").on('submit', function (e) {
	e.preventDefault();
	$('input[type="submit"]').attr('disabled', 'disabled');
	var url = "./mail_handler.php"; // the script where you handle the form input.

	$.ajax({
		type: "POST",
		url: url,
		data: $(this).serialize(), // serializes the form's elements.
		success: function () {
			var messageAlert = 'alert-success';
			var messageText = 'Success, information was sent';
			var alertBox = '<div class="alert ' + messageAlert + '">' + messageText + '</div>';
			if (messageAlert && messageText) {
				$('.formSentMessage').html(alertBox);
				setTimeout(function(){ 				
					$('.formSentMessage').html(""); 
				}, 5000);				
			}
			$('.formRow div input').val('');
			$('#contact-form textarea').val('');
		},
		error: function(){
			$('input[type="submit"]').removeAttr('disabled');
			var messageAlert = 'alert-danger';
			var messageText = 'Failure, information was not sent';
			var alertBox = '<div class="alert ' + messageAlert + '">' + messageText + '</div>';
			if (messageAlert && messageText) {
				$('.formSentMessage').html(alertBox);
				setTimeout(function(){ 				
					$('.formSentMessage').html(""); 
				}, 5000);	
			}
			$('.formRow div input').val('');
			$('#contact-form textarea').val('');
		}
	});
	return false; // avoid to execute the actual submit of the form.
});
	
	
//validation	
$('input[name="name"]').blur(function() {
	var firstName = $(this).val();
	var messageText="Please enter your name.";
	if (firstName.length < 2 || !(/\S/.test(firstName)) || !(/^[a-z ,.'-]+$/i.test(firstName)) ) {
		$('.formName p').html(messageText);
	} else {
		$('.formName p').html('');
	}	
});	

$('input[name="surname"]').blur(function() {
    var lastName = $(this).val();
    var messageText = 'Please enter your last name.';
    if (lastName.length < 2 || !(/\S/.test(lastName)) || !(/^[a-z ,.'-]+$/i.test(lastName)) ) {
        $('.formLastName p').html(messageText);
    } else {
        $('.formLastName p').html('');
    }
});

$('input[name="email"]').blur(function(){
	var isAlert = null;
    var email= $(this).val();
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        isAlert=true;
    } else {
        isAlert = false
	}
    var messageText = 'Please enter a valid email address.';
    if (isAlert) {
        $('.formEmail p').html(messageText);
    } else {
        $('.formEmail p').html('');
	}
});

$('input[name="phone"]').blur(function(){
	var phone = $(this).val();
	var phoneExp = new RegExp(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/);
	var result = phoneExp.test(phone);
    var messageText = 'Please enter a valid phone number.';
    if (!result || !(/\S/.test(phone))) {
        $('.formPhone p').html(messageText);
	} else {
        $('.formPhone p').html('');
	}
});

$('textarea').blur(function() {
    var note = $(this).val();
    var messageText = 'Please enter at least 10 characters.';
    if (note.length < 10 || !(/\S/.test(note))) {
        $('.formMessage p').html(messageText);
    } else {
        $('.formMessage p').html('');
    }
});	

(function() {
    $('.formRow input[type=text], textarea').on('keyup blur', function() {
		var allClear = false;
        var empty = true;
        if ($('.formName p').html() === '' && $('.formLastName p').html() === '' && $('.formPhone p').html() === '' &&
			$('.formEmail p').html()=== '' && $('.formMessage p').html() === '') {
            allClear = true;
		}
        $('.formRow input[type=text], textarea').each(function() {
            if (($(this).val() !== '') && allClear) {
                empty = false;
            } else {
                empty = true;
            }
        });
        if (!empty) {
            $('input[type="submit"]').removeAttr('disabled');
        } else {
            $('input[type="submit"]').attr('disabled', 'disabled');
        }
    });
})();	
//Google Maps

var forStyling = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]	

var icons = {
	gym: {
		icon: './img/map/kettebell_red.png'
	}
}
	
function initMap() {
	// The location of OSF
	var osf = {lat: 33.74302, lng: -117.82359};
	// The map, centered at Omnisport Fitness
	var map = new google.maps.Map(
	document.getElementById('map'), {
		zoom: 15, 
		center: osf,
		styles: forStyling,
		streetViewControl:false,
		overviewMapControl:false, 
		rotateControl:false,
		fullscreenControl: false,
		scrollwheel: false
	});
	// The marker, positioned at OSF
	var marker = new google.maps.Marker({
		position: osf, 
		map: map,
		icon: icons.gym.icon
	});
}
initMap();
	
});













