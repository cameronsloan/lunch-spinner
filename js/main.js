var lunchOptions = [];

var favscope = '';
setTimeout(function(){ 
	favscope = getScope('favctrl');
	
	if(typeof(favscope.favList) != 'undefined') {
		jQuery.each(favscope.favList.favList[0] , function(index, value){
			if(value && value.name) {
				lunchOptions.push(value.name.toUpperCase());
			}
		});
	}
}, 3000);

function getScope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();
}

// Spin from user's favorites
$('.fancy .slot').jSlots({
	number : 32,
	onStart : function() {
		//document.getElementById('#pullArm').play();	
	},
	easing : 'swing',
	time : 4000,
	loops : 4,
 	endNumbers: [],
	endNumFuncFav: function() {					
		var notToday = [];
		$('#favTBody > tr').each(function(){
			if($(this).eq(0).find(':checkbox').is(':checked')) {
				notToday.push( $(this).find("td").eq(0).text().toUpperCase() );
			}
		});
		
		useableLunchOptions = [];
		jQuery.each(lunchOptions, function(index, value){
			if($.inArray(value, notToday) == -1) {
				useableLunchOptions.push(value);
			}	
		});
		
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

$('#yelpAddressBtn').on('click', function (e) {
    e.preventDefault();
    $("#yelpAddress").toggle('fast');
});

// ---------------------------------------------------------------------- //
// Fancybox
// ---------------------------------------------------------------------- //
$("a.fancybox").fancybox();