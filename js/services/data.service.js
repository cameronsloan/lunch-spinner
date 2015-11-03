globalapp.service('dataservice', ['$firebaseArray',
function($firebaseArray) {
    
    this.favList = [];
    this.userRef = false;
    
    this.createUser = function() {
        var tempRef = new Firebase("https://torrid-heat-4140.firebaseio.com");
		var newUser = tempRef.push();
		var cookieVal = newUser.path.w[0];
		this.userRef = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal);
		return cookieVal;
    }
    
    this.buildFavList = function(cookieVal) {
        if(!cookieVal) {
    		this.createUser();
    	} else {
    		this.userRef = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal);
    	}
        this.favList = $firebaseArray(this.userRef);
    };
    
    this.addFav = function(favName) {
        this.favList.$add({name: favName});  
    };
    
    this.delFav = function(item) {
        this.favList.$remove(item)
    }
}]);