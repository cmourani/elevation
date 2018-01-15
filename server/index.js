const express = require('express')
const bodyParser = require('body-parser')
const app = express() 
const eventful = require('./eventful.js')
const extract = require('./helper.js')
const spot = require('./spotify.js').spot
const call = require('./apiCall.js')
const session = require('express-session')
const bcrypt = require('bcrypt')
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const client_id = require('./spotifyKeys.js').client_id
const client_secret = require('./spotifyKeys.js').client_secret
const redirect_uri = require('./spotifyKeys.js').redirect_uri


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())


app.post('/events', function(req, res){
	console.log(req.body.location, req.body.genres)
	call(req.body.location, req.body.genres, function(events){
		extract(events, function(artists){
			console.log(artists)
			var artistArray = []
			artists.forEach(function(artist){
				let text = artist[0].split(' ').join('%20')
				artistArray.push([text, artist[1]])
			})
			
			spot(artistArray, function(results){
				res.json(results)
			})
		})
	})
})


const PORT = process.env.PORT ||8080;
app.listen(PORT, function() {
	console.log('listening on port 8080')
});