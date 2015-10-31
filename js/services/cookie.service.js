globalapp.service('cookieservice', '$cookies', function($cookies){
	
	this.areCookiesEnabled = function() {
		cookieEnabled = (navigator.cookieEnabled) ? true : false;
	
		if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
			document.cookie="testcookie";
			cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
		}
		return (cookieEnabled);
	}
	
	this.setCookie = function(keyname, value, exdays=null) {
	    (!exdays) ? exdays : 365;
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    
		var config = {
			/*path: '/a/b',
			domain: 'www.mywebsite.com',*/
			expires: expires,
			secure: true
		};
	    $cookies.putObject(keyname, value, config);

	    return true;
	}
	
	this.getCookie = function(keyname) {
		return $cookies.get(keyname);
	}
});