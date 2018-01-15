import React from 'react'
import apiKey from '../../../server/key.js'


class Elevation extends React.Component {
constructor(props){
  super(props)
}

componentDidMount(){
  var script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
  script.async = true;
  document.body.appendChild(script);
}



render(){
  return(
    <div >
    <div id="map"></div>
      <div id="elevation_chart"></div>
    </div>
  )
}
}


export default Elevation