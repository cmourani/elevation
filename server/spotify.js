

const request = require('request'); // "Request" library

const client_id = require('./spotifyKeys.js').client_id
const client_secret = require('./spotifyKeys.js').client_secret

var spot = function(artists, cb){
// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var results = []
artists.forEach(function(artist){
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;

        var options = {
          url: `https://api.spotify.com/v1/search?q=artist:${artist[0]}&type=album&limit=1`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };

        var link = artist[1]
        var art = artist[0]
        request.get(options, function(error, response, body) {
          if (body.albums.items.length){
            results.push([body.albums.items[0].artists[0].name, body.albums.items[0].uri, link])
          }
          if (art === artists[artists.length -1][0]){
            cb(results)
          }
        })
      }
    });
  })
}


module.exports.spot = spot