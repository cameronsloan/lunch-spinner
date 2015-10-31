globalapp.service('cookieservice', ['$cookies', function($cookies){
	
	this.areCookiesEnabled = function() {
		console.log("in areCookiesEnabled");
		cookiesEnabled = (navigator.cookieEnabled) ? true : false;
	
		if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
			document.cookie="testcookie";
			cookiesEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
		}
		return (cookiesEnabled);
	}
	
	this.setCookie = function(keyname, value, exdays) {
	    console.log("trying to set cookie");
	    console.log(value);
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
	    var trash = this.getCookie('lunch-spinner');
	}
	
	this.getCookie = function(keyname) {
		console.log("getting cookie");
		console.log($cookies.get(keyname));
		var cookie = $cookies.get(keyname);
		if(typeof(cookie) == 'string') {
			console.log("stripping quotes");
			console.log(cookie.length)
			var cookieVal = cookie.substring(1, cookie.length - 1);
			console.log(cookieVal);
			return cookieVal;
		}
		return false;
	}
}]);