 
const eventful = require('./eventful.js')
const request = require('request')

const call = function(location, genres, cb){
  var subcategories = ''
	for (let i = 0; i < genres.length; i++){
		if (genres[i] === 'hiphop'){
		  subcategories += ',rap_hiphop'
  	} else if (genres[i] === 'heavyMetal'){
    	subcategories += ',metal'
  	} else 
		  subcategories += ',' + genres[i]
	}

	if (subcategories){
		subcategories = subcategories.substring(1)
	} else {
		subcategories = 'all'
	}

	console.log(subcategories)

	var url = `http://api.eventful.com/json/events/search?app_key=${eventful}&category=music&within=20&date=This+Week&location=${location[0]},${location[1]}&subcategory=${subcategories}&page_size=20`

  request(url, function(err, response, body){

    if (!err && response.statusCode === 200){
      cb(body)
    }
  })
	
}

module.exports = call

// music_rap_hiphop



// music_metal 