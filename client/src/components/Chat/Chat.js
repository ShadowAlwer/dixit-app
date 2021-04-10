import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';
import Card from "../Card/Card";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

const ENDPOINT = 'localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [toUpdate, setToUpdate] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    let playerID = localStorage.getItem('playerID');
    console.log(playerID);

    socket.emit('join', { name, room, playerID }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on('playerID', id => {

      localStorage.setItem('playerID', id);
      id = localStorage.getItem('playerID');
      console.log('Saved NEW player id:'+ id);
    });

    socket.on('setHand', cards => {
      console.log('SET_HAND');
      setCards(cards);
    })
}, []);

  const sendMessage = (event) => {
    event.preventDefault();
    let playerID = localStorage.getItem('playerID');
    if(message) {
      socket.emit('sendMessage', {message: message, id: playerID}, () => setMessage(''));
    }
  }

  const getCards = () => {
    setToUpdate(true);
    setTimeout( () => {
      setToUpdate(false);
    })
  }

  return (
    <div className="outerContainer">
      <ScoreBoard></ScoreBoard>
      <div class="innerContainer">
      <div className="gameBoard">
        <div className="cardsContainer">
          {cards.map(card => <Card name={card.fileName} key={card.id}></Card>)}
        </div>
        <button className="debugButton" onClick={getCards}>GetCards</button>
      </div>
        <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
