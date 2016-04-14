$(document).ready(function(){

	var wrapper = $("#wrapper");

	var config = require('./config/config.js');

	var giphy = require('giphy-api')(config.giphyKey);

	var fs = require('fs');
	

	// ANNYANG CONFIGURATION

	if(annyang){
		console.log("Annyang detected");

		annyang.debug();

		var commands = {
			"pico": activateListening
		}

		annyang.addCommands(commands);

		annyang.start();	
	}

	function mimicAnnyang(){
		// calls everything that happens when pico is detected
		// use this as backup which happens on a button press incase voice detection fails
		annyang.trigger('pico');
	}

	function activateListening(){
		console.log("You said peeqo");
		annyang.abort(); // pause causes it to continue detecting
		//annyang.pause();
		//apiAi.open();

		// init api.ai which will call subsequent functions to start detecting
		apiAi.init();
	}

	// API.AI CONFIGURATION
	

	var apiConfig = {
		server: config.server,
		token: config.token,
		sessionId: config.sessionId
	}

	var apiAi = new ApiAi(config);

	// API.AI EVENTS

	apiAi.onInit = function(){
		console.log("APIAI INITED")
		if(annyang.isListening()){
			console.log("ANNYANG LIES")
		}

		// attempt to reinitialize if it does not initialize
		if(apiAi.isInitialise()){
			apiAi.open();
		} else {
			console.log("Attempting to reinitialize")
			apiAi.init()
		}
		
	}

	apiAi.onOpen = function(){
		console.log("APIAI OPENED")
		apiAi.startListening();

		// start timer to auto stop listening
		stopListeningTimer();
	}

	apiAi.onClose = function(){
		console.log("APIAI CLOSED")
	}

	apiAi.onStartListening = function(){
		console.log("APIAI STARTED LISTENING")
	}

	apiAi.onStopListening = function(){
		console.log("APIAI STOP LISTENING")
	}

	apiAi.onResults = function(data){
		console.log(data.result);
		//apiAi.stopListening();
		apiAi.close();

		// restart annyang to start listening for keyword peeqo
		annyang.resume();
	}

	apiAi.onError = function(code , data){
		console.log("ERROR: " + code + " " + data)
	}

	function stopListeningTimer(){
		console.log("start timer")
		setTimeout(function(){
			apiAi.stopListening();
		}, 3000)
	}

	// ACTION FUNCTIONS - BASED ON API AI RESPONSES

	// stop everything that is happening and revert to default screen
	// maybe say fine before doing that
	function stopEverything(){

	}

	function getWeather(){

	}

	function getTime(){

	}

	function giveSupport(){

	}

	function setReminder(){

	}

	function greetPublic(){

	}

	function greetPrivate(){

	}

	function addNote(){

	}

	function playMusic(){

	}

	function motivate(){

	}

	function controlLights(){

	}

	function setGifPreference(){

	}

	function showExpression(expression){

		var dir_path = './images/gif/'+expression;
		var files = fs.readdirSync(dir_path);
		var numberOfGifs = files.length;
		var randomGif = Math.floor(Math.random()*numberOfGifs);

		var file_path = numberOfGifs[randomGif];

		// put image on screen
		// set gif preference prefix global variable

	}

	function takePicture(){

		// take a gif picture

		gifshot.createGIF({
			'gifWidth':800,
			'gifHeight':480,
			'text':'hello',
			'numFrames': 10,
			'completeCallback':function(){
				console.log('done');
			},
			'saveRenderingContexts': true,

		}, function(obj){
			if(!obj.error){
				var image = obj.image;
				var animateImage = document.createElement('img');
				animateImage.src = image;
				document.body.appendChild(animatedImage)

				// use this to save the image to be able to send/email
				var latestImage = obj.savedRenderingContexts[0];
			}
		})
	}
	
	function blockSite(){

	}

	function addSkill(){

	}

	function searchGiphy(query, prefix){


		giphy.search(query, function(err, res){

			if(err || !resp){
				//show sad local gif
				//try again
			}

			var randomGif = res.data[Math.floor(Math.random()*(resp.data.length))];

			var url = randomGif.images['original'].url;

			return url
		})

		giphy.random(query, function(err, res){

			var url = res.data.images['original'].url;
			return url;

		})

		giphy.translate(query, function(err, res){
			var url = res.data.images['original'].url;
			return url;
		})
	}

	// TEMPLATES

	var eyes = Handlebars.templates.eyes;

	function render_eye_template(){
		wrapper.html(eyes({"name":"abhishek"}))
	}

	// EVENT LISTENERS

	$("#test").on('click', function(){
		//wrapper.html(temp({"name":"abhishek"}))
		//annyang.start();
		//mimicAnnyang();
		activateListening();
	})

})