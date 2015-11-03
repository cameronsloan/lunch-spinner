<?php
    include "lib/YelpAPI.php";
    
    $states = array('AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY');
    
    $term = "";
    
    if(isset($_GET['user-key'])) {
    	$userKey = "'".$_GET['user-key']."'";
    } else {
    	$userKey = 'false';
    }

    if(!empty($_POST)) {
        // User has submitted location info
        $location = array();
    	$location['address'] = isset($_POST['address']) ? $_POST['address'].", " : "";
        $location['city'] = isset($_POST['city']) ? $_POST['city'].", " : "";
        $location['state'] = isset($_POST['state']) ? $_POST['state']." " : "";
        $location['zip'] = isset($_POST['zip']) ? $_POST['zip'] : "";
    } else {
        // User has not submitted location info try to get from IP Address
        function getUserIP() {
            $client  = @$_SERVER['HTTP_CLIENT_IP'];
            $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
            $remote  = $_SERVER['REMOTE_ADDR'];
        
            if(filter_var($client, FILTER_VALIDATE_IP))
            {
                $ip = $client;
            }
            elseif(filter_var($forward, FILTER_VALIDATE_IP))
            {
                $ip = $forward;
            }
            else
            {
                $ip = $remote;
            }
        
            return $ip;
        }
        
        function ip_details($ip_addr) {
            return json_decode(file_get_contents("http://ipinfo.io/".$ip_addr));
        }
        
        $ip_addr = getUserIP();
        $details = ip_details($ip_addr);
        $location = array();
        $location['city'] = $details->city;
        $location['state'] = $details->region;
    }
    
    function getCoordinates($address){
	    $address = urlencode($address);
	    $url = "http://maps.google.com/maps/api/geocode/json?sensor=false&address=" . $address;
	    $coordResponse = file_get_contents($url);
	    $json = json_decode($coordResponse,true);
	 
	    $lat = $json['results'][0]['geometry']['location']['lat'];
	    $lng = $json['results'][0]['geometry']['location']['lng'];
	 
	    return array($lat, $lng);
	}
    
    if(isset($location)) {
    	if(isset($location['address'])) {
    		$coords = getCoordinates(implode(", " , $location));
    	}
       	
       	$yelpSearchObj = json_decode(search($term, implode(", ", $location), $coords, $sort = 1, $limit = 20));
 
        //print_r($response); die();
        // Process Yelp response for spinner
        $yelpSpinnerOpts = array();
        foreach($yelpSearchObj->businesses as $r) {
        	array_push($yelpSpinnerOpts, strtoupper($r->name));
        }
        $lunchOptionsYelp = json_encode($yelpSpinnerOpts);
    }
    
    // $response needs to be converted to json for javascript/angular
    $yelpSearchArr = (array)$yelpSearchObj;
    $yelpSearchJson = json_encode($yelpSearchArr);
    
?>


<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="js/vendor/fancybox/jquery.fancybox.css" type="text/css" media="screen" />

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
		<script src="js/vendor/angular.min.js"></script>
		<script src="js/vendor/angular-cookies.js"></script>
		<script src="js/vendor/jquery.easing.1.3.js"></script>
		<script src="js/vendor/jquery.jSlots.js"></script>
		<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
		<script src="https://cdn.firebase.com/libs/angularfire/1.0.0/angularfire.min.js"></script>
		<script type="text/javascript" src="js/vendor/fancybox/jquery.fancybox.pack.js"></script>
    </head>
    <body ng-app="globalapp">
		<!--<audio controls id="pullArm" style="display: none;">-->
		<!--	<source src="horse.ogg" type="audio/ogg">-->
		<!--	<source src="horse.mp3" type="audio/mpeg">-->
		<!--</audio>-->
    
		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">Lunch Picker</a>
				</div>
				<div class="navbar-collapse collapse">
				
				</div><!--/.navbar-collapse -->
			</div>
		</div>
	
	    <!-- Main jumbotron for a primary marketing message or call to action -->
	    <div class="jumbotron">
			<div class="container">
				<div class="row">
					<div class="fancy">
						<ul class="slot">
							<li><span>&nbsp;</span></li>
							<li><span>A</span></li>
							<li><span>B</span></li>
							<li><span>C</span></li>
							<li><span>D</span></li>
							<li><span>E</span></li>
							<li><span>F</span></li>
							<li><span>G</span></li>
							<li><span>H</span></li>
							<li><span>I</span></li>
							<li><span>J</span></li>
							<li><span>K</span></li>
							<li><span>L</span></li>
							<li><span>M</span></li>
							<li><span>N</span></li>
							<li><span>O</span></li>
							<li><span>P</span></li>
							<li><span>Q</span></li>
							<li><span>R</span></li>
							<li><span>S</span></li>
							<li><span>T</span></li>
							<li><span>U</span></li>
							<li><span>V</span></li>
							<li><span>W</span></li>
							<li><span>X</span></li>
							<li><span>Y</span></li>
							<li><span>Z</span></li>
							<li><span>'</span></li>
							<li><span>&amp;</span></li>
						</ul>
					</div>
				</div>
				<div class="row" style="margin-top: 30px;">
					<div class="col-md-4">
						<img src="http://lorempixel.com/200/200/sports/1/Dummy-Text"/>
					</div>
					<div class="col-md-4 text-center" style="margin-top: 30px">
							<input type="button" class="btn btn-primary btn-lg btn-block" id="playFancy" value="Spin My Favorites">
							<br />
					    	<input type="button" class="btn btn-warning btn-lg btn-block" id="playSuprise" value="Find Me Something New"/>
					    	<p class="button-details">Clicking this button will spin the Yelp results from below</p>
				    </div>
				    <div class="col-md-4 text-right">
				    	<img src="http://lorempixel.com/200/200/sports/1/Dummy-Text"/>
				    </div>
				</div>
			</div>
	    </div>
	
	    <div class="container">
			<!-- Example row of columns -->
			<div class="row">
				<div class="col-md-4" ng-controller="favctrl">
					<div id="favList">
						<table class="table favHeader">
							<thead>
								<tr>
									<th>Configured Favorites</th>
									<th>Not Today</th>
								</tr>
							</thead>
						</table>
						<div class="fav-body" ng-if="datasvc.favList">
							<table class="table table-striped" id="favTable">
								<tbody id="favTBody">
									<tr ng-repeat="f in datasvc.favList">
										<td style="width: 300px;">{{ f.name }}</td>
										<td><input type="checkbox" class="notToday"/></td>
										<td ng-click="deleteFavorite( f )" class="glyphicon glyphicon-remove deleteFav" style="top: 0px !important; color: red"></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div id="noFavList" style="display: none; text-align: center; padding-bottom: 50px;" ng-if="!datasvc.favList">
						<h4>No Saved Favorites</h4>
						<p>Your favoritie restaurants will be shown here once they are set up. Get started by entering your favorite restaurants using the form below, or you can select from the Yelp lings to the right. Clicking the green plus sign will add them directly to your saved favorits.</p>
					</div>
					<div style="width: 70%; margin: 20px auto;">
						<label for="exampleInputEmail1">New Favorite Restaurant</label>
						<input ng-model="favInput" class="form-control" id="newFav" />
						<br />
						<input type="button" class="btn btn-primary btn-lg btn-block" ng-click="addFavManual()" value="Add To Database">
					</div>
	
				</div>
				
				<div class="col-md-1">
					<!--THIS IS A SPACER BETWEEN THE TO TABLES-->
				</div>
				
				<div class="col-md-7">
					<table class="table favHeader">
						<thead>
							<tr>
								<th>
									<div style="float: left;" title="Search Yelp listings to find new favorites. Click the green + to add them to your favorite list. After your search, Click the 'Find Me Something New' button above to let Lunch Spinner choose for you!">Find New Favorites</div>
	
									<div id="yelpAddressBtn" style="float: right;"><a href="#">Enter Address <span class="glyphicon glyphicon-chevron-down"></a></span></div>
								</th>
							</tr>
							<tr>
								<th id="yelpAddress" style="display: none;">
									<form action="index.php" method="post">
									    <div class="suprise">
									        <div class="col-md-3 less-padding">
					                            <input type="text" class="form-control" id="address" name="address" value="<?if(isset($_POST['address'])) { echo htmlspecialchars($_POST['address']); } else { echo ''; }?>" placeholder="Address">
					                        </div>
					                        <div class="col-md-3 less-padding">
					                            <input type="text" class="form-control" id="city" name="city" value="<?if(isset($_POST['city'])) { echo htmlspecialchars($_POST['city']); } else { echo ''; }?>" placeholder="City">
					                        </div>
					                        <div class="col-md-2 less-padding">
					                            <select class="form-control" id="state" name="state" value="<?if(isset($_POST['state'])) { echo htmlspecialchars($_POST['state']); } else { echo ''; }?>" placeholder="State">
													<?php foreach($states as $key => $value) { ?>
														<option value="<?=$value?> <?if($state == $value) {echo "selected";}?>"><?php echo $value ?></option>
													<?php }?>
												</select>
					                            </select>
					                        </div>
					                        <div class="col-md-2 less-padding">
					                            <input type="text" class="form-control" id="zip" name="zip" value="<?if(isset($_POST['zip'])) { echo htmlspecialchars($_POST['zip']); } else { echo ''; }?>" placeholder="Zip">
					                        </div>
					                        <div class="col-md-2 less-padding">
					                        	<button type="submit" id="yelpSearch" class="btn btn-primary" value="Search">Search</button>
					                        </div>
					                    </div>
									</form>
								</th>
							</tr>
						</thead>
					</table>
					<div class="fav-body-yelp" ng-controller="yelpctrl">
						<table class="table table-striped">
							<tbody id="favTBody">
								<tr ng-if="yelpResponse" ng-repeat="b in yelpResponse.businesses">
									<td ng-click="addYelpFav(b.name)">
										<span class="glyphicon glyphicon-plus" style="color: green;"></span>
									</td>
									<td ng-if="b.img_url">
										<a class="fancybox" rel="gallery" href="{{ b.img_url }}"><span class="glyphicon glyphicon-picture"></span></a>&nbsp;<a href="{{ b.url }}" target="_blank">{{ b.name }}</a>
									</td>
									<td ng-if="!b.img_url">
										<a href="{{ b.url }}" target="_blank">{{ b.name }}</a>
									</td>
									<td>
										<img src="{{ b.rating_img_url_small }}"/>
									</td>
									<td>
										{{ b.location.address[0] }}
									</td>
									<td ng-if="b.distance">
										{{ (b.distance * 0.000621371) | numberEx:2 }} mi
									</td>
									<td ng-if="!b.distance"></td>
								</tr>
								<tr ng-if="!yelpResponse">
									<td colspan="5">Unable to determine search location</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div style="float: right; padding: 10px 20px 0 0;">
					<img src="//s3-media1.fl.yelpcdn.com/assets/srv0/developer_pages/dc8ff90d5d7d/assets/img/Powered_By_Yelp_Black.png" alt="Powered by Yelp" width="115" height="25">
				</div>
			</div>
			
			<hr>
	
			<footer>
				<p>&copy; GiantDude Software 2015</p>
				<script type="text/javascript">
					var userKey = <?=$userKey?>;
					var lunchOptionsYelp = <?=$lunchOptionsYelp?>;
					var yelpResponse = <?=$yelpSearchJson?>;
				</script>
				<script src="js/globalapp.js"></script>
				<script src="js/controllers/favorites.controller.js"></script>
				<script src="js/controllers/yelp.controller.js"></script>
				<script src="js/services/cookie.service.js"></script>
				<script src="js/services/data.service.js"></script>
				<script src="js/main.js"></script>
			</footer>
		</div>
	</body>
</html>
