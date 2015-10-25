
    var userRef = 'InetzSGList';
	var ref = new Firebase("https://torrid-heat-4140.firebaseio.com");
	var lunchOptions = [];
	
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
		//clear lunchOptions and the table
		lunchOptions = [];
		$("#favTBody").empty();
		
		//rebuild lunchOptions and the table
		if(typeof(snapshot.val() === 'object')){
			for(var k in snapshot.val()[userRef]) {
				lunchOptions.push(snapshot.val()[userRef][k].name.toUpperCase());
				$('#favTable > tbody:last-child').append('<tr><td>'+snapshot.val()[userRef][k].name+'<td><input type="checkbox" class="notToday"/></td><td id="'+k+'" class="glyphicon glyphicon-remove deleteFav" style="color: red;" onClick="deleteFavorite(this.id)"></td></tr>');
			}
		}
	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	
	$("#addNewFav").click(function(){
		var inputVal = $("#newFav").val();
		
		var favRef = ref.child(userRef);
		favRef.push({
			name: inputVal
		});
		
		$("#newFav").val('');
	});
	
	$(".addNewFavYelp").click(function(){
		var newFavYelp = $(this).next().text();
		
		var favRef = ref.child(userRef);
		favRef.push({
			name: newFavYelp
		});
	});
	
	function deleteFavorite(fireid) {
		console.log("Trying to delete");
		var favRef = new Firebase("https://torrid-heat-4140.firebaseio.com/"+userRef+"/"+fireid);
		console.log("https://torrid-heat-4140.firebaseio.com/"+userRef+"/"+fireid);
		
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
		easing : 'easeOutSine',
		time : 6000,
		loops : 5,
 		endNumbers: [],
		endNumFuncFav: function() {					
			var notToday = [];
			$('#favTBody > tr').each(function(){
				if($(this).eq(0).find(':checkbox').is(':checked')) {
					notToday.push( $(this).find("td").eq(0).text().toUpperCase() );
				}
			});
			console.log(notToday);
			
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
	// ---------------------------------------------------------------------- //
	// Fancybox
	// ---------------------------------------------------------------------- //
	$("a.fancybox").fancybox();