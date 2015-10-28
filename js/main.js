	
	var cookiesEnabled = '';
    var cookieName = 'lunch-spinner';
    var cookieVal = '';
	var lunchOptions = [];
	var ref = '';
	
// ---------------------------------------------------------------------- //
//                    COOKIE FUNCTIONS
// ---------------------------------------------------------------------- //
	function areCookiesEnabled() {
		cookieEnabled = (navigator.cookieEnabled) ? true : false;
	
		if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
			document.cookie="testcookie";
			cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
		}
		return (cookieEnabled);
	}
	
	function setCookie(cname, cvalue, exdays) {
	    exdays = typeof exdays !== 'undefined' ? exdays : 365;
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	
	function readCookie(cname) {
		var nameEQ = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1,c.length);
			}
			
			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		return null;
	}
	
	if(areCookiesEnabled()) {
		cookiesEnabled = true;
		cookieVal = readCookie("lunch-spinner");
		if(cookieVal) {
			ref = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal);
			firebaseCallback();
		} else {
			$('#favList').hide();
			$('#noFavList').show();
		}
	} else {
		console.log("Cookies not enabled");
		alert("This site uses cookies. In order to save your favorites you will need to enable cookies in your browser. We do this to eliminate the need for you to create an account.")
	}

// ---------------------------------------------------------------------- //
//                    END COOKIE FUNCTIONS
// ---------------------------------------------------------------------- //	
	function makeID(idlength) {
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	    for( var i = 0; i < idlength; i++ )
	    {
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	
	    return text;
	}
	
	// Attach an asynchronous callback to read the data at our posts reference
	function firebaseCallback() {
		ref.on("value", function(snapshot) {
			//clear lunchOptions and the table
			lunchOptions = [];
			$("#favTBody").empty();
			console.log(snapshot.val());
			//rebuild lunchOptions and the table
			if(typeof(snapshot.val()) === 'object' && typeof(snapshot.val()[cookieVal]) !== 'undefined') {
				for(var k in snapshot.val()[cookieVal]) {
					lunchOptions.push(snapshot.val()[cookieVal][k].name.toUpperCase());
					$('#favTable > tbody:last-child').append('<tr><td style="width: 300px;">'+snapshot.val()[cookieVal][k].name+'</td><td><input type="checkbox" class="notToday"/></td><td id="'+k+'" class="glyphicon glyphicon-remove deleteFav" style="top: 0px !important; color: red" onClick="deleteFavorite(this.id)"></td></tr>');
				}
			} else {
				$('#favList').hide();
				$('#noFavList').show();
			}
		}, function (errorObject) {
				console.log("The read failed: " + errorObject.code);
			}
		);
	}
	
	$("#addNewFav").click(function(){
		var inputVal = $("#newFav").val();

		if(!cookieVal) {
			var fireUser = makeID(8);
			cookieVal = fireUser;
			ref = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal);
			firebaseCallback();
			var favRef = ref.child(fireUser);
		} else {
			var favRef = ref.child(cookieVal);
		}
		
		var pushResult = favRef.push({
			name: inputVal
		});

		// If cookies are enabled - check / set
		if(cookiesEnabled) {
			setCookie(cookieName, cookieVal, 365);
		}
		
		$("#newFav").val('');
		if ($('#noFavList').is(':visible')) {
			window.location.replace("https://lunch-spinner-cameronsloan.c9.io/index.php?user_ref="+cookieVal);
		}
	});
	
	$(".addNewFavYelp").click(function(){
		var newFavYelp = $(this).next().text();
		
		if(!cookieVal) {
			var fireUser = makeID(8);
			cookieVal = fireUser;
			ref = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal);
			firebaseCallback();
			var favRef = ref.child(fireUser);
		} else {
			var favRef = ref.child(cookieVal);
		}
		
		var pushResult = favRef.push({
			name: newFavYelp
		});
		
		// If cookies are enabled - check / set
		if(cookiesEnabled) {
			setCookie(cookieName, cookieVal, 365);
		}
		
		if ($('#noFavList').is(':visible')) {
			window.location.replace("https://lunch-spinner-cameronsloan.c9.io/index.php?user_ref="+cookieVal);
		}
	});
	
	function deleteFavorite(fireid) {
		var favRef = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal+"/"+fireid);
		
		var onComplete = function(error) {
			if (error) {
				console.log('Synchronization failed');
			} else {
				console.log('Synchronization succeeded');
			}
		};
		favRef.remove(onComplete);
	};
		
	
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