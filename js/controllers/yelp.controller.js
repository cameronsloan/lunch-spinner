globalapp.controller('yelpctrl', ["$scope", 'dataservice', 'cookieservice',
function($scope, dataservice, cookieservice) {
    $scope.lunchOptionsYelp = lunchOptionsYelp;
    $scope.yelpResponse = yelpResponse;
    $scope.datasvc = dataservice;
    
    // Take in userKey from php file as cookieVal
	var cookieVal = (userKey) ? userKey : false;
	
	if(!cookieVal) {
    	if(cookieservice.areCookiesEnabled()) {
            cookieVal = cookieservice.getCookie('lunch-spinner');
        } else {
            cookieVal = false;
        }
    }
    
    if(!cookieVal) {
        cookieVal = $scope.datasvc.createUser();
        cookieservice.setCookie('lunch-spinner', cookieVal, 365);
    }

    $scope.addYelpFav = function(name){
        console.log("here");
        console.log(this.datasvc.favList);
        $scope.datasvc.addFav(name);
		
		/*$("#newFav").val('');
		if ($('#noFavList').is(':visible')) {
			window.location.replace("https://lunch-spinner-cameronsloan.c9.io/index.php?user-key="+cookieVal);
		}*/
	};
}])
.filter('numberEx', ['numberFilter', '$locale', function(number, $locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function(input, fractionSize) {
        //Get formatted value
        var formattedValue = number(input, fractionSize);
        
        //get the decimalSepPosition
        var decimalIdx = formattedValue.indexOf(formats.DECIMAL_SEP);
        
        //If no decimal just return
        if (decimalIdx == -1) return formattedValue;
        
        var whole = formattedValue.substring(0, decimalIdx);
        var decimal = (Number(formattedValue.substring(decimalIdx)) || "").toString();
        
        return whole +  decimal.substring(1);
    };
}]);