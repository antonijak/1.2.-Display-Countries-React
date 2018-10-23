import React, { Component } from 'react';
import './App.css';
import Country from './Country';

const countries = ['Afghanistan',"Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


class App extends Component {

  state = {
    userInput: '',
    typeOfSearch: 'first',
    startContain: 'starting ',
    // for updating grammar in p expression in the header
    s: '',
    with: 'with',
    startsButtonClass: 'isClicked',
    anyButtonClass: 'buttons'
  }

// saves and updates user input and changes p expression
  updateInputValue = (e) => {
    this.setState({ userInput: e.target.value });
    this.findMatch()
  }

// defines if user wants starting word or any and sets the expression in the header aswell
  startingOrAny = (e) => { 
   
    if (e.target.value == 'first'){
    this.setState({ typeOfSearch: 'first', startContain: 'starting', with: ' with ', startsButtonClass: 'isClicked', anyButtonClass: 'buttons'}) 
    } else {
    this.setState({ typeOfSearch: 'any', startContain: 'that contain', with: '', startsButtonClass: 'buttons', anyButtonClass: 'isClicked'}) 
    }
  }

// returns an array of searched countries
  findMatch = () => {
    let result = countries.filter((country) => {
      let upperCaseCountry = country.toUpperCase();
      let userUpper = this.state.userInput.toUpperCase();
      let match;
      if(this.state.typeOfSearch == 'first'){
        match = upperCaseCountry.startsWith(userUpper);
      } else {
        match = upperCaseCountry.includes(userUpper);
      }
      if (match){ 
        return upperCaseCountry
      }   
    });
    return result
  }

// fills logical grammar to the verbs in the header p
  verbs = () => {if(this.findMatch().length === 1 && this.state.typeOfSearch === 'first'){
      return {verb: 'is', noun: 'country ', letter: ''}
    } else if(this.findMatch().length === 1 && this.state.typeOfSearch === 'any') {
      return {verb: 'is', noun: 'country ', letter: 's'}
    } else {
      return {verb: 'are', noun: 'countries ', letter: ''}
    }
  }

//colors every second country for better visibility
  twoColorsDisplay = (id) => {
    let remain = id % 2;
    if (remain === 0){
      return 'country'
    } else {
      return 'colored'
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>WORLD COUNTRIES LIST</h1>
          <p>There 
            <span id="verb" > {this.verbs().verb} </span>
            <span id="total">{this.findMatch().length} </span>
            <span id="countryies">{this.verbs().noun}</span>
            <span id="start-contain">{this.state.startContain}</span>
            <span>{this.verbs().letter}</span>
            <span>{this.state.with}</span>
            <span id="expression"> {this.state.userInput.toUpperCase()}</span>
          </p>

          <button id="starting-word" className={this.state.startsButtonClass} value="first" onClick={this.startingOrAny} >Starting Word</button>
          <button id="any-word" className={this.state.anyButtonClass} onClick={this.startingOrAny} value="any">Any word</button>
          <input type="text" placeholder="Search by..." id="search" onChange={this.updateInputValue} />
        </header>
        <main>
            {this.findMatch().map((matchCtr, i) =>
              <Country 
              name={matchCtr} 
              id={i} 
              className={this.twoColorsDisplay(i)} 
              />)}
        </main>
      </div>
    );
  }
}

export default App;
