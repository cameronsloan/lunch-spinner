	
	var cookiesEnabled = '';
    var cookieName = 'lunch-spinner';
    var cookieVal = '';
	var lunchOptions = [];
	var ref = '';
	var userRef = '';
	
	if(areCookiesEnabled()) {
		cookiesEnabled = true;
		if(readCookie("lunch_spinner")) {
			cookieVal = readCookie("lunch-spinner");
		} else if(typeof(userKey) != 'undefined' && userKey != '') {
			cookieVal = userKey;
			setCookie(cookieName, cookieVal, 365);
		}
		
		if(cookieVal) {
			userRef = new Firebase("https://torrid-heat-4140.firebaseio.com/lunch-spinner-users/"+cookieVal);
			firebaseCallback();
		} else {
			$('#favList').hide();
			$('#noFavList').show();
		}
	} else {
		console.log("Cookies not enabled");
		alert("This site uses cookies. In order to save your favorites you will need to enable cookies in your browser. We do this to eliminate the need for you to create an account.")
	}
		
	
	// Spin from user's favorites
	$('.fancy .slot').jSlots({
		number : 32,
		onStart : function() {
			//document.getElementById('#pullArm').play();	
		},
		easing : 'swing',
		time : 4000,
		loops : 4,
 		endNumbers: [],
		endNumFuncFav: function() {					
			var notToday = [];
			$('#favTBody > tr').each(function(){
				if($(this).eq(0).find(':checkbox').is(':checked')) {
					notToday.push( $(this).find("td").eq(0).text().toUpperCase() );
				}
			});
			
			useableLunchOptions = [];
			jQuery.each(lunchOptions, function(index, value){
				if($.inArray(value, notToday) == -1) {
					useableLunchOptions.push(value);
				}	
			});
			console.log(useableLunchOptions);
			
			var lunchString = useableLunchOptions[Math.floor(Math.random()*useableLunchOptions.length)];
			//console.log(lunchString);
			var winner = [];
			var padding = Math.ceil((32 - lunchString.length) / 2);

			if(padding > 0) {
				for(var i=padding; i>0; i--) {
					winner.push(1);
				}
			}
			for(var x = 0, c=''; c = lunchString.charAt(x); x++) { 
				if(c === "'") {
					winner.push(28);
				} else if(c === '&') {
					winner.push(29);
				} else if(c === ' ') {
					winner.push(1);
				} else {
					winner.push(c.charCodeAt(0) - 63);
				}
			}
			
			var tmp = winner.length;
			for(var i = 0; i <= 32 - tmp; i++) {
				winner.push(1);
			}
			//console.log(winner);
			return winner;
		},
		endNumFuncYelp: function() {					
			var lunchString = lunchOptionsYelp[Math.floor(Math.random()*lunchOptionsYelp.length)];
			//console.log(lunchString);
			var winner = [];
			var padding = Math.ceil((32 - lunchString.length) / 2);
			
			if(padding > 0) {
				for(var i=padding; i>0; i--) {
					winner.push(1);
				}
			}
			for(var x = 0, c=''; c = lunchString.charAt(x); x++) { 
				if(c === "'") {
					winner.push(28);
				} else if(c === '&') {
					winner.push(29);
				} else if(c === ' ') {
					winner.push(1);
				} else {
					winner.push(c.charCodeAt(0) - 63);
				}
			}
			
			var tmp = winner.length;
			for(var i = 0; i <= 32 - tmp; i++) {
				winner.push(1);
			}
			//console.log(winner);
			return winner;
		}
		
	});	
	
	$('#yelpAddressBtn').on('click', function (e) {
        e.preventDefault();
        $("#yelpAddress").toggle('fast');
    });
	
	// ---------------------------------------------------------------------- //
	// Fancybox
	// ---------------------------------------------------------------------- //
	$("a.fancybox").fancybox();