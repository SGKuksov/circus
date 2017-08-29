/*

 API: http://airports-api.marinin.xyz/iata/<code>`
  
  */
import React, { Component } from 'react';

import './Airport.css';

class Airport extends Component {

		constructor() {
			super();
			this.state = {
				to: '',
				from: '',
				airports: {
					'CDG': {"icao":"LFPG","iata":"CDG","name":"Charles de Gaulle International Airport","city":"Paris","country":"FR","elevation":392,"lat":49.0127983093,"lon":2.5499999523,"tz":"Europe/Paris"},
					'LGA': {"icao":"KLGA","iata":"LGA","name":"La Guardia Airport","city":"New York","country":"US","elevation":21,"lat":40.77719879,"lon":-73.87259674,"tz":"America/New_York"}
				}
			}
		}

		loadAirport(code) {
			if (this.state.airports[code]) {
				return;
			}

			var req = new XMLHttpRequest()
			req.open('GET', 'http://airports-api.marinin.xyz/iata/' + code)
			req.addEventListener('load', () => {
				var parsed = JSON.parse(req.responseText)
				if (parsed.error) {
					console.log('Error while fetching' + code, parsed.error)
					return
				}
				var airports = this.state.airports
				airports[code] = parsed
				this.setState({
					airports: airports
				})
			})
			req.send()
		}

		formatDescription(airport) {
			var str='';
			if (airport) {
				str  = airport.iata + ' - ' + airport.name + ' in ' + airport.city + ', ' + airport.country
			} else {
				str = 'Errror'
			}
			return str
		}

		isValidIATA(code) {
			return code.length === 3
		}

		handleToChange(e) {
			var code = e.target.value
			if (this.isValidIATA(code)) {
				this.loadAirport(code)
				this.setState({
					to: code
				})
			}
		}

		handleFromChange(e) {
			var code = e.target.value
			if (this.isValidIATA(code)) {
				this.setState({
					from: code
				})
			}
		}

		render() {

			var to = this.state.to,
			toDescription = this.state.airports[to],
			from = this.state.from,
			fromDescription = this.state.airports[from],
			toString = this.formatDescription(toDescription),
			fromString = this.formatDescription(fromDescription);

		return (
			
			<form className="airports">
			  <img className="airports-img" src="https://image.flaticon.com/icons/png/512/476/476505.png"></img>
			  <h1>Grab your ticket</h1>

			  <input type="text" name="from" defaultValue={from} onChange={this.handleFromChange.bind(this)}></input>
			  <div className="about from">{fromString}</div>
			  <input type="text" name="to" defaultValue={to} onChange={this.handleToChange.bind(this)}></input>
			  <div className="about to">{toString}</div>

			  <button type="button">Buy</button>
			</form>

		)
	}
}

export default Airport;
