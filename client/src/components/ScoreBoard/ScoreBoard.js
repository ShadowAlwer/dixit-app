import React from "react";

import './ScoreBoard.css';

const ENDPOINT = 'localhost:5000';

let socket



class ScoreBoard extends React.Component {

  MAX_POINTS = 10;
  MAX_PLAYERS = 4;
  TERRYTORY_WIDTH = 12;
  maxWidth;
  points = [];
  players = [];

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.maxWidth = this.TERRYTORY_WIDTH/ this.MAX_PLAYERS;
    this.debugInit();
    this.calculateRabbitsPosition();
  }

  componentDidUpdate(prevProps) {
  }

  refresh(){
    this.setState(this.state);
  }

  calculateRabbitsPosition() {
    this.players.forEach(player => {
      let height = 100/this.MAX_POINTS;
      let points = player.points <= this.MAX_POINTS ? player.points : this.MAX_POINTS;
      let rabbitSize = height < this.maxWidth ? height : this.maxWidth;
      let offset = height - rabbitSize
      let position = 100 - height*(points+1) + (height/this.MAX_POINTS)*points;
      
      // - (rabbitSize/this.MAX_POINTS)*points;
      player.rabbitTransform = {
        //maxWidth: this.maxWidth+'vw',
        //maxHeight: this.maxWidth+'vw',
        width: rabbitSize+'vh',
        height: rabbitSize+'vh',
        transform: 'translateY(calc('+position+'vh + '+ 0 +'vh)'
      }
    })
  }
    
  debugInit(){
    for(let i = this.MAX_POINTS; i >= 0; i--) {
      this.points.push(i);
    }

    this.players.push({id: 0, points: -1, color: 'green'});
    this.players.push({id: 1, points: -1, color: 'red'});
    this.players.push({id: 2, points: -1, color: 'pink'});
    this.players.push({id: 3, points: -1, color: ''});
    this.debugLoop(-5);
  }

  debugLoop(iteration) {
    if (iteration < this.MAX_POINTS) {
      this.players.forEach(player => player.points += 1);
      this.calculateRabbitsPosition();
      this.refresh();
      setTimeout(() => {
        iteration++;
        this.debugLoop(iteration)
      }, 2000);
    }
  }
    
 
  render () {
    return (
      <div className="scoreBoard">
        <div className="numberContainer">
          {this.points.map(number => 
          <div className="labelContainer">
            <label>{number}</label>
            <div className="numberFooter"></div>
          </div>)}
        </div>
        <div class="rabbitTerritory">
          {this.players.map(player => <img className={'rabbit ' + player.color} 
            alt={player.points} 
            style={player.rabbitTransform}
            src={'http://localhost:5000/imgs/'+'rabbit-shape'+'.svg'}></img>)}
          </div>
      </div>
    )
  }
  
}

export default ScoreBoard;
