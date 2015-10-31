globalapp.controller('favctrl', ["$scope", "$firebaseArray", "cookieservice", "firebase"
function($scope, $firebaseArray, cookieservice, firebase) {
    $scope.lunchOptionsYelp = lunchOptionsYelp;
    $scope.yelpResponse = yelpResponse;
    $scope.cookieVal = cookieservice.getCookie();
    
    var fireRef = firebase.getRef();
    $scope.favList = $firebaseArray(fireRef);
    
    $scope.addNewYelpFav = function(){
		var newFavString = $("#newFav").val();
		
		$("#newFav").val('');
		if ($('#noFavList').is(':visible')) {
			window.location.replace("https://lunch-spinner-cameronsloan.c9.io/index.php?user-key="+cookieVal);
		}
	};
}]);