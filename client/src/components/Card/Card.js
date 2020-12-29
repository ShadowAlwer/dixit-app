import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import './Card.css';

const ENDPOINT = 'localhost:5000';

let socket;

const Card = () => {
  const [imageBinData, setImage] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    loadImage(1)
  });

  useEffect(() => {
    socket.on('image', chunk => {
      setImage(imageBinData => [ ...imageBinData, chunk ]);
    });
    
}, []);

  const loadImage = (id) => {
    if(id && socket) {
        socket.emit('loadImage', id, () => console.log('Error: Failed to load image: id =' + id));
    }
  }


  return (
    <div className="cardContainer">
        <img className="cardImage" src={'data:image/jpeg;base64,' + window.btoa(imageBinData)}></img>
    </div>
  );
}

export default Card;
