import React from "react";
import io from "socket.io-client";

import './Card.css';

const ENDPOINT = 'localhost:5000';

let socket;

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: io(ENDPOINT),
      toUpdate: true,
      name: 'name_not_loaded',
      imageBinData: []
    }
  }

  componentDidMount() {
    this.state.socket.on('image', chunk => {
      this.state.imageBinData = [ ...this.state.imageBinData, chunk ];
    });
    if (this.state.toUpdate) {
      // this.loadImage(1);
      // this.getCardName(1);
      this.state.toUpdate =  false;
    }
  }
    
    
  getCardName = (id) => {
    if (id && this.state.socket) {
      console.log('Loading card name for id: ' + id);
      this.state.socket.emit('getCardName', id, () => console.log('Error: Failed to get card name: id =' + id));
    }
  }
 
  render () {
    return (
      <div className="cardContainer">
          <img className="cardImage" alt={this.state.name} src={'http://localhost:5000/imgs/badger.jpg'}></img>
      </div>
    )
  }
  
}

export default Card;
