 
const eventful = require('./eventful.js')
const request = require('request')

const call = function(location, genres, cb){
	var subcategories = genres[0]
	for (let i = 1; i < genres.length; i++){
		subcategories += ',' + genres[i]
	}

	var url = `http://api.eventful.com/json/events/search?app_key=${eventful}&category=music&within=20&date=This+Week&location=${location[0]},${location[1]}&subcategory=${subcategories}&sort_order=popularity&page_size=20`

  request(url, function(err, response, body){

    if (!err && response.statusCode === 200){
      cb(body)
    }
  })
	
}

module.exports = call

