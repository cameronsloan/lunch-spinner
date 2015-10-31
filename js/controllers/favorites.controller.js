globalapp.controller('favctrl', ['$scope', 'dataservice', 'cookieservice',
function($scope, dataservice, cookieservice) {
	
	// Take in userKey from php file as cookieVal
	var cookieVal = (userKey) ? userKey : false;
	$scope.datasvc = dataservice;
	
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
    
	$scope.datasvc.buildFavList(cookieVal);
	
	$scope.addFavManual = function() {
        var fav = $scope.favInput;
        $scope.datasvc.addFav( fav );
        $scope.favInput = "";
    }
    
    $scope.deleteFavorite = function(item) {
        $scope.datasvc.delFav(item);
    }
}]);