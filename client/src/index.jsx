import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Maps from './components/MapWithADirectionsRenderer.jsx'


class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			location: {}
		}
		this.getEventCoordinate = this.getEventCoordinate.bind(this)
	}

	getEventCoordinate (location) {
    this.setState({
      location: location
    });
  }

  getEvents(){
  	axios.get('/events').then(()=> console.log('cool'))
  }


	render(){
		return(
			<div>
			<button onClick={()=> this.getEvents()}>Get events</button>
			<div><Maps getEventCoordinate={this.getEventCoordinate}/></div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('elevation'));
export default App