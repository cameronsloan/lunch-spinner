globalapp.controller('yelpctrl', ["$scopt", "$firebaseArray",
function($scope, $firebaseArray) {
    $scope.lunchOptionsYelp = lunchOptionsYelp;
    $scope.yelpResponse = yelpResponse;
    
    $scope.addNewYelpFav = function(){
		var newFavString = $("#newFav").val();

		firebaseStuff(newFavString);
		
		$("#newFav").val('');
		if ($('#noFavList').is(':visible')) {
			window.location.replace("https://lunch-spinner-cameronsloan.c9.io/index.php?user-key="+cookieVal);
		}
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