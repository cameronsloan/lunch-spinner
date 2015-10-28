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