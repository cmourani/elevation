const express = require('express')
const bodyParser = require('body-parser')
const app = express() 
const eventful = require('./eventful.js')
const extract = require('./helper.js')
const call = require('./apiCall.js')
const session = require('express-session')
const bcrypt = require('bcrypt')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.get('/events', function(req, res){
	call([40.75048649999999,-73.976401000000001], ['jazz', 'pop', 'blues', 'alternative'], function(events){
		extract(events, function(artists){
			sendToSpotify(artists, function(){

			})
		})
	})
})





const PORT = 8080;
app.listen(PORT, function() {
	console.log('listening on port 8080')
});