<?php
//-----------------------------------------------------------------------------
//
//                      YELP SETUP / PROCESSING FUNCTIONS
//
//-----------------------------------------------------------------------------
	require_once('lib/OAuth.php');
	
	$CONSUMER_KEY = 'v-TOHH51v0gCwIBW07trzw';
	$CONSUMER_SECRET = '8jzeqGcXohv5L5aRJmTTumZtBeI';
	$TOKEN = 'BuU46QPqgtpsnkw9yX5uOUwRKnVQIpmK';
	$TOKEN_SECRET = '4SpMmMcIuEUXiBsxI68PYbxsLUo';
	$API_HOST = 'api.yelp.com';
	$DEFAULT_TERM = 'dinner';
	$DEFAULT_LOCATION = 'St. George, UT';
	$SEARCH_LIMIT = 3;
	$SEARCH_PATH = '/v2/search/';
	$BUSINESS_PATH = '/v2/business/';
	
	function request($host, $path) {
	    $unsigned_url = "https://" . $host . $path;
	    // Token object built using the OAuth library
	    $token = new OAuthToken($GLOBALS['TOKEN'], $GLOBALS['TOKEN_SECRET']);
	    // Consumer object built using the OAuth library
	    $consumer = new OAuthConsumer($GLOBALS['CONSUMER_KEY'], $GLOBALS['CONSUMER_SECRET']);
	    // Yelp uses HMAC SHA1 encoding
	    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
	    $oauthrequest = OAuthRequest::from_consumer_and_token(
	        $consumer, 
	        $token, 
	        'GET', 
	        $unsigned_url
	    );
	    
	    // Sign the request
	    $oauthrequest->sign_request($signature_method, $consumer, $token);
	    
	    // Get the signed URL
	    $signed_url = $oauthrequest->to_url();
	    
	    // Send Yelp API Call
	    $ch = curl_init($signed_url);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_HEADER, 0);
	    $data = curl_exec($ch);
	    curl_close($ch);
	    
	    return $data;
	}
	
	function search($term, $location, $sort, $limit) {
	    $url_params = array();
	    
	    $url_params['term'] = $term ?: $GLOBALS['DEFAULT_TERM'];
	    $url_params['location'] = $location ?: $GLOBALS['DEFAULT_LOCATION'];
	    $url_params['sort'] = $sort ?: "";
	    $url_params['limit'] = $limit ?: $GLOBALS['SEARCH_LIMIT'];
	    $search_path = $GLOBALS['SEARCH_PATH'] . "?" . http_build_query($url_params);
	    
	    return request($GLOBALS['API_HOST'], $search_path);
	}
//-----------------------------------------------------------------------------
//
//                         END YELP FUNCTIONS
//
//-----------------------------------------------------------------------------
?>