import React, { Component } from 'react';
import './Country.css'




class Country extends Component {
  render() {
    return (
     <div className={this.props.className} id={this.props.id}>
      <span className='country-name'>{this.props.name}</span>
     </div>
    );
  }
}

export default Country;