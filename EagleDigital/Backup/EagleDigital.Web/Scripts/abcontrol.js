/* AB testing Callback script */

if(typeof Array.prototype.indexOf !== 'function'){
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    };
}

(function(){
	//If mobile user goes to m.hp.com without any further validation
	if (navigator.userAgent.match(/iPhone|Windows Phone|iPod|Android|webOS/)) {
		location.replace("http://m.hp.com/us/en/home.html");
	}

	var validSegments = {
		'hho': ['consumer.home','partner'],
		'banners': ['commercial.smb','commercial.large','commercial.pubsector','commercial.ga','commercial', 'commercial.b2b']
	};

	var getDestination = function(segment){
		for(var k in validSegments){
			if(validSegments.hasOwnProperty(k)){
				if(validSegments[k].indexOf(segment)>=0){
					return k;
				}
			}
		}

		// Commercial large allows a third level of data. E.g. Commercial.large.subsection
		// In that case we will validate if segment starts with commercial.large
		if(/^commercial.large\./.test(segment)){
			return 'banners';
		}

		return null;
	};

	var isCurrentPage = function(url){
		return window.location.origin+window.location.pathname==url;
	};

	var isCurrentPath = function(path){
		return window.location.pathname==path;
	};

	var getParameter = function(parameter){
		var param = window.location.search.match(/([?|&]+redirect)=([^&]*)/);
		if(param){
			return param[2];
		}else{
			return null;
		}
	};

	//Detect if user is part of AB (Optimost) testing
	var inOptimostTest = function(){
		// Optimost test cookie must NOT exist
		return document.cookie.indexOf('op1666homepagegum=')!=-1;
	};


	/* CALLBACKS WITH REDIRECTION */
	var urlParams = window.location.search;
	var gotoHHO = function(){
		// If not already in B page, redirects
		if(!isCurrentPath('/country/us/en/hho/welcome.html')){
			redirectTo('http://www.hp.com/country/us/en/hho/welcome.html'+urlParams);
		}
	};

	var gotoBlended = function(){
		// If not already in Blended page, redirects
		if(!isCurrentPath('/country/us/en/uc/welcome.html')){
			redirectTo('http://www.hp.com/country/us/en/uc/welcome.html'+urlParams);
		}
	};

	// Fallback to execute in case that conditions are not met
	var gotoHPcom = function(){
		// If in B page and not cookied to HHO, goes to current homepage
		if(isCurrentPath('/country/us/en/hho/welcome.html') || isCurrentPath('/country/us/en/uc/welcome.html')){
			redirectTo('http://www.hp.com'+urlParams); // Go to current homepage
		}
	};

	// Redirect function. Replace State to avoid overriding document.referrer
	var redirectTo = function(url){

		// Before redirection, saves the referrer in a cookie
		// to be properly passed to Omniture by the Analytics script.
		// Analytics reads the HP Home redirection (hp_hr) cookie
		// and assigns the value to the s.referrer;
		if(!!document.referrer){
			// Creating session cookie 'hp_hr' with document.referrer
			var d = new Date();
			d.setTime(d.getTime() + (30*60*1000)); // 30 minutes
			var expires = d.toGMTString();
			document.cookie="hp_hr="+document.referrer+";domain=.hp.com;path=/;expires="+expires;
		}
		window.location.replace(url);
	};

	// REDIRECT CONDITIONS
	// Get value of hp_last_segment cookie
	var lastSegmentCookie = document.cookie.match(/(hp_last_segment)=([^;]*)/),
		lastSegment = null;

	if(lastSegmentCookie){ //if cookie found, get the value
		lastSegment = lastSegmentCookie.pop();
		if(getDestination(lastSegment)=='hho'){ //If user is cookied to HHO
			gotoHHO();
		}else if(getDestination(lastSegment)=='banners'){
			gotoHPcom(); // Other VALID segments go back to hp.com
		}else{
			gotoBlended(); // go to blended (uncookied) page
		}
	}else{
		gotoBlended(); // if no cookie go to blended page
	}


})();