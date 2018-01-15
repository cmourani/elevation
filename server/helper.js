

const extractArtistsFromEvents = function(obj, cb){
	var artists = []
	obj = JSON.parse(obj)
	console.log(typeof obj)
	obj.events.event.forEach(function(event){
		if (event.performers !== null){
			if(Array.isArray(event.performers.performer)){
				event.performers.performer.forEach(function(artist){
					artists.push(artist.name)
				})
			} else{
				artists.push(event.performers.performer.name)
			}
		}
	})
	cb(artists)
}

module.exports = extractArtistsFromEvents