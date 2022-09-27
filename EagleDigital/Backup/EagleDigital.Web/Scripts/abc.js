/* AB testing Callback script */

/*
	HUB to load the proper ABC script depending on the version 
	(default to PRO)

	04/22/2014: 
	Added abc=none detection to avoid redirect
*/

(function(){
	var ll = document.getElementsByTagName('html')[0].getAttribute('lang').split('-')[0] || 'en'; // Get Language code from lang attribute
	var cc = document.getElementsByTagName('html')[0].getAttribute('lang').split('-')[1] || document.location.pathname.split('/')[2] || 'us'; // Get Country code from lang attribute

	var abControl = '/abcontrol.js';
	
	if(window.ABC_ALREADY_LOADED){
		return;
	}
	window.ABC_ALREADY_LOADED = true;

	var abcPaths = {
		local: '../' + abControl,
		dev: 'http://whp-test.extweb.hp.com/country/' + cc + '/' + ll + abControl,
		pro: 'http://www.hp.com/country/' + cc + '/' + ll + abControl
		
	};

	
	// Load proper version of ABC script
	var version = window.location.search.match(/([?|&]+abcscript)=([^&]*)/);
	
	if(version){ // If abcscript param exists, load proper version
		switch(version[2]){
			case 'none': break;
			case 'local': writeScript(abcPaths.local); break;
			case 'dev': writeScript(abcPaths.dev); break;
			case 'pro': writeScript(abcPaths.pro); break;
			default: writeScript(abcPaths.pro);
		}
	}else{
		writeScript(abcPaths.pro);
	}

	function writeScript(source){
		document.write("<"+"scr"+'ipt src="'+source+'" type="text/javascript"><'+"/scr"+"ipt>");
	}
})();
