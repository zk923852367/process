import React, { Component } from 'react';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return(
      <div className="board" id="main" style={{width: '80%', height: '500px', margin: '0 auto', transform: '0 25%'}}>
      </div>
    )
  }
}