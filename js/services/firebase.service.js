globalapp.service('firebase', ["$scope", function($scope){
    this.getRef = function(newFavString, cookieVal=null) {
		if(!cookieVal) {
			tempRef = new Firebase("https://torrid-heat-4140.firebaseio.com");
			var newUser = ref.push();
			cookieVal = newUser.path.w[1];
			userRef = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal);
			this.firebaseCallback(userRef);
		} else {
			userRef = new Firebase("https://torrid-heat-4140.firebaseio.com/"+cookieVal);
		}
		
		return [userRef, cookieVal];
    }
    
    this.writeFav = function(userRef, favString) {	
		userRef.push({
			name: favString
		});
    }
    
    this.addMessage = function(e) {
        //LISTEN FOR RETURN KEY
        if (e.keyCode === 13 && $scope.msg) {
            //ALLOW CUSTOM OR ANONYMOUS USER NAMES
            var name = $scope.name || "anonymous";
            $scope.messages.$add({ from: name, body: $scope.msg });
            //RESET MESSAGE
            $scope.msg = "";
        }
    }
    
    this.deleteFavorite = function(fireid) {
		var favRef = new Firebase("https://torrid-heat-4140.firebaseio.com/lunch-spinner-users/"+cookieVal+"/"+fireid);
		
		var onComplete = function(error) {
			if (error) {
				console.log('Synchronization failed');
			} else {
				console.log('Synchronization succeeded');
			}
		};
		favRef.remove(onComplete);
	};
    
		// If cookies are enabled - check / set
		if(cookiesEnabled) {
			setCookie(cookieName, cookieVal, 365);
		}
	}
	
	// Attach an asynchronous callback to read the data at our posts reference
	this.firebaseCallback = function(userRef) {
		userRef.on("value", function(snapshot) {
			//clear lunchOptions and the table
			lunchOptions = [];
			$("#favTBody").empty();
			//rebuild lunchOptions and the table
			if(typeof(snapshot.val()) === 'object') {
				for(var k in snapshot.val()) {
					lunchOptions.push(snapshot.val()[k].name.toUpperCase());
					$('#favTable > tbody:last-child').append('<tr><td style="width: 300px;">'+snapshot.val()[k].name+'</td><td><input type="checkbox" class="notToday"/></td><td id="'+k+'" class="glyphicon glyphicon-remove deleteFav" style="top: 0px !important; color: red" onClick="deleteFavorite(this.id)"></td></tr>');
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
}]);

