import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Search from './components/Search.jsx'
import Iframe from 'react-iframe'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Link, LinkProps} from "react-router-dom";

class Player extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		if (this.props.currentUrl !== null){
			return(
			<div>
			<div>
			<Iframe url={this.props.currentEmbed}
		        width="300px"
		        height="380px"
		        id="myId"
		        className="myClassname"
		        frameborder="0"
		        allowtransparency="true"
		        display="initial"
		        position="relative"
		        allowFullScreen/></div>
		      <RaisedButton label="ew, skip" onClick={()=> this.props.changeArtist()}/>
						<RaisedButton secondary="true" href={this.props.currentUrl} label="i want to see them live!" />
				</div>
			)
		} else {
			return (<span></span>)
		}
	}
}
	


class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			location: [], 
			genres: {
				hiphop: false,
				pop: false, 
				electronic: false, 
				dance: false, 
				country: false, 
				classical: false, 
				opera: false, 
				jazz: false, 
				blues: false, 
				soul: false, 
				rock: false, 
				alternative: false, 
				heavyMetal: false
		  }, 
		  bool: {
		  	hiphop: false, 
		  	pop: false, 
		  	electronic: false, 
		  	jazz: false, 
		  	rock: false, 
		  	country: false, 
		  	classical: false
		  },
		  artists: [], 
		  currentArtist: null, 
		  currentUrl: null,
		  currentEmbed: null
		}
		this.getLocation = this.getLocation.bind(this)
		this.sendGenres = this.sendGenres.bind(this)
		this.toggle = this.toggle.bind(this)
		this.changeArtist = this.changeArtist.bind(this)
	}


  getEvents(location, genres){
  	var that = this
  	axios.post('/events', {location: location, genres: genres})
  	.then(function(data){
  		 that.setState({
  		 	artists: data.data, 
  		 	currentArtist: data.data[0][0], 
  		 	currentEmbed: "https://open.spotify.com/embed?uri=" + data.data[0][1],
  		 	currentUrl: data.data[0][2]
  		 })
  	})
  }

  getLocation(latitude, longitude){
    this.setState({
      location : [latitude, longitude]
    })
  }

  sendGenres(){
  	var toggled = []
  	for (let key in this.state.genres){
  		if (this.state.genres[key] === true){
  			toggled.push(key)
  		}
  	}
  	this.getEvents(this.state.location, toggled)
  }

  toggle(e){
  	var genres 

  	if (e.target.innerHTML === 'electronic'){
	    genres = ['electronic', 'dance']
  	} else if (e.target.innerHTML === 'classical'){
  		genres = ['classical', 'opera']
  	} else if (e.target.innerHTML === 'jazz'){
  		genres = ['jazz', 'blues', 'rb']
  	} else if (e.target.innerHTML === 'rock'){
      genres = ['rock', 'alternative', 'heavyMetal']
  	} else {
  		genres = [e.target.innerHTML]
  	}
  
  	var boolCopy = Object.assign({}, this.state.bool)
		boolCopy[e.target.innerHTML] = !this.state.bool[e.target.innerHTML]  
		this.setState({
			bool: boolCopy
		})
 
		var that = this
  	var genresCopy = Object.assign({}, this.state.genres)
  	genres.forEach(function(genre){
			genresCopy[genre] = !that.state.genres[genre]  
  	})
  	this.setState({genres: genresCopy})
  }

  changeArtist(){
  	this.setState((oldState) => ({
  		artists: oldState.artists.slice(1), 
  	}), function(){
  		if (this.state.artists.length){
  			console.log(this.state.artists[0])
	  		this.setState({
	  			currentArtist: this.state.artists[0][0], 
	  			currentEmbed: "https://open.spotify.com/embed?uri=" + this.state.artists[0][1], 
	  			currentUrl: this.state.artists[0][2]
	  		})
	  	} else {
	  		alert('thats all i got!')
	  	}
  	})
  }

	render(){
		return(
			<MuiThemeProvider>
			<div>
			<div>where u at?</div>
			<div>{''}</div>
			<div><Search getLocation={this.getLocation}/></div>
			<div>{''}</div>
			<div>what u like?</div>
			<div>{''}</div>
			<RaisedButton label="hiphop" onClick={this.toggle} secondary={this.state.bool['hiphop']} />
			<RaisedButton label="pop" onClick={this.toggle} secondary={this.state.bool['pop']} />
			<RaisedButton label="rock" onClick={this.toggle} secondary={this.state.bool['rock']} />
			<RaisedButton label="classical" onClick={this.toggle} secondary={this.state.bool['classical']} />
			<RaisedButton label="country" onClick={this.toggle} secondary={this.state.bool['country']} />
			<RaisedButton label="electronic" onClick={this.toggle} secondary={this.state.bool['electronic']} />
			<RaisedButton label="jazz" onClick={this.toggle} secondary={this.state.bool['jazz']} />
			<div>
		  <div>{''}</div>
			<FlatButton label="lemme grab u some tunes" onClick={()=> this.sendGenres()} />
			</div>
			<Player currentEmbed={this.state.currentEmbed} 
							currentUrl={this.state.currentUrl} 
							changeArtist={this.changeArtist} />
			</div>
			</MuiThemeProvider>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('elevation'));
export default App

