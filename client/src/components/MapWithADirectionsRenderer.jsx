import React from 'react'
import GoogleMapsLoader from 'google-maps'
import apiKey from '../../../server/key.js'
import Elevation from './Elevation.jsx'

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
var textColorBackground = ['floralwhite','lightblue', 'lavender', 'powderblue', 'peachpuff', 'palegreen', 'wheat'];


const Markers = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` , width: `700px`}} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
          origin: new google.maps.LatLng(this.props.origin.latitude, this.props.origin.longitude),
          destination: new google.maps.LatLng(this.props.destination.latitude, this.props.destination.longitude),
          travelMode: google.maps.TravelMode.WALKING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.props.directions.push(result)
            this.setState({directions : [result]})
            this.props.ren()
          } else {
            alert('U CANT WALK HERE DUMMY');
          }
        })
     }
  })
)(props =>
  <GoogleMap defaultZoom={6} defaultCenter={new google.maps.LatLng(40.7128, -74.0060)}>
  {props.directions.length ?    
      <DirectionsRenderer directions={props.directions[0]} /> : ''}

     {/*<div><b>ETA:</b> {props.directions[0].routes[0].legs[0].distance.text}</div>
         <div><b>Trip Time:</b> {props.directions[0].routes[0].legs[0].duration.text}</div>*/}
      
  </GoogleMap>
);

<Markers />


const PlacesWithStandaloneSearchBoxFrom = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          this.props.sendFrom(refs.searchBox.getPlaces()[0].geometry.location.lat(), refs.searchBox.getPlaces()[0].geometry.location.lng())
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="From:"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
  </div>
);

<PlacesWithStandaloneSearchBoxFrom />

const PlacesWithStandaloneSearchBoxTo = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          this.props.sendTo(refs.searchBox.getPlaces()[0].geometry.location.lat(), refs.searchBox.getPlaces()[0].geometry.location.lng())
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="To:"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
  </div>
);

<PlacesWithStandaloneSearchBoxTo />

const Search = (props) => (
<div>
  <div><PlacesWithStandaloneSearchBoxFrom sendFrom={props.sendFrom}/></div>
  <div><PlacesWithStandaloneSearchBoxTo sendTo={props.sendTo}/></div>
</div>
)

//{props.bool ? <MapWithADirectionsRenderer /> : <MapWithASearchBox getEventCoordinate={props.getEventCoordinate}/>}


class Maps extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      origin: [],
      destination: [],
      directions: [],
      rendered: false, 
      ren: false
    }
    this.sendFrom = this.sendFrom.bind(this)
    this.sendTo = this.sendTo.bind(this)
    this.ren = this.ren.bind(this)
  }

  sendFrom(latitude, longitude){
    this.setState({
      origin: {latitude: latitude, longitude: longitude}
    })
  }

  sendTo(latitude, longitude){
    this.setState({
      destination: {latitude: latitude, longitude: longitude},
      rendered: true
    })
  }

  ren(){
    this.setState({
      ren: true
    })
  }

  render(){
    if (this.state.ren){
      return(
        <div> 
          <Search sendFrom={this.sendFrom} sendTo={this.sendTo} />
          <Markers origin={this.state.origin} destination={this.state.destination} directions={[]} reset={this.ren}/>
          <Elevation origin={this.state.origin} destination={this.state.destination} />
        </div>
      )
    }
    if (this.state.rendered){
      return(
        <div> 
          <Search sendFrom={this.sendFrom} sendTo={this.sendTo} />
          <Markers origin={this.state.origin} destination={this.state.destination} directions={[]} ren={this.ren}/>
        </div>
      )
    } else {
      return (  
        <div> 
          <Search sendFrom={this.sendFrom} sendTo={this.sendTo} />
        </div>)
    }
  }
}

export default Maps

