import React, { useEffect, useState } from 'react';
import './App.scss';
import Scissors from './images/icon-scissors.svg';
import Rock from './images/icon-rock.svg';
import Paper from './images/icon-paper.svg';
import Triangle from './images/bg-triangle.svg';
import Rules from "./images/image-rules.svg";

const randomHand = () =>{
  let randNum = Math.floor(Math.random()*3+1);
  return randNum===1? "Rock": randNum ===2? "Paper": "Scissors"
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      background:"",
      rule:true,
      score:0,
      game:"",
      played:false,
      myhand:"",
      househand:""
    }
    this.handleRules = this.handleRules.bind(this);
    this.whoWon = this.whoWon.bind(this);
    this.replayBtn = this.replayBtn.bind(this);
  }
  componentDidMount(){
    window.innerWidth>480? this.setState({background:"desktopBG"}):this.setState({background:"mobileBG"})
  }
  handleRules(){
    this.setState({
      rule:!this.state.rule
    })
  }
  clickNoise(){
    let click = document.getElementById("clickNoise");
    click.currentTime = 0.1;
    click.play();
  }

  whoWon(e){
    let myHand = e.target.getAttribute("myhand");
    let houseHand = randomHand();
    this.setState({myhand:myHand, househand:houseHand})

    if(myHand === "Rock"){
      if(houseHand ==="Paper"){
        this.setState({game:"YOU LOSE", played:true})
      }
      else if(houseHand==="Scissors"){
        this.setState({game:"YOU WON", played:true, score:this.state.score+1})
      }
      else{
        this.setState({game:"DRAW", played:true})
      }
    }
    else if(myHand === "Paper"){
      if(houseHand ==="Paper"){
        this.setState({game:"Draw", played:true})
      }
      else if(houseHand==="Scissors"){
        this.setState({game:"YOU LOSE", played:true})
      }
      else{
        this.setState({game:"YOU WON", played:true, score: this.state.score+1})
      }
    }
    else if(myHand === "Scissors"){
      if(houseHand ==="Paper"){
        this.setState({game:"YOU WON", played:true, score:this.state.score+1})
      }
      else if(houseHand==="Scissors"){
        this.setState({game:"DRAW", played:true})
      }
      else{
        this.setState({game:"YOU LOSE", played:true})
      }
    }
    this.clickNoise();
  }
  replayBtn(){
    this.setState({played:false});
    this.clickNoise();
  }

  render(){
    let ruleBox = this.state.rule? <RulesDisplay handleRules = {this.handleRules}/>:"";
    let playedRPS = this.state.played? <MatchResult myHand={this.state.myhand} houseHand ={this.state.househand} game={this.state.game} replayBtn = {this.replayBtn} clickNoise = {this.clickNoise} dropNoise = {this.dropNoise}/> : <RPSGame whoWon = {this.whoWon}/>;

    return (
      <div className = {this.state.background}>
        {ruleBox}
        <div className="titleBox">
          <div className="title">
            <h2>ROCK</h2>
            <h2>PAPER</h2>
            <h2>SCISSORS</h2>
          </div>
          <div className="scoreBox">
            <p>SCORE</p>
            <h1>{this.state.score}</h1>
          </div>
        </div>
        {playedRPS}
        <div className="ruleBtnBox">
          <div className="ruleBtn" onClick={this.handleRules}>RULES</div>
        </div>
        <p className = "signature">created by <a href="https://github.com/arthurlee945">Arthur Lee</a></p>
        <audio id="clickNoise" src ="https://github.com/arthurlee945/AudioLibrary/blob/main/switch-13.mp3?raw=true"/>
      </div>
    );
  }
}

const MatchResult =(props)=>{
  let myhand = props.myHand;
  let househand = props.houseHand;

  let myhandClass = myhand ==="Rock"? "RCPBtnR" : myhand ==="Paper"? "RCPBtnP" : "RCPBtnS";
  let househandClass = househand ==="Rock"? "RCPBtnR" : househand ==="Paper"? "RCPBtnP" : "RCPBtnS";

  let myhandIcon = myhand ==="Rock"? Rock : myhand ==="Paper"? Paper : Scissors;
  let househandIcon = househand ==="Rock"? Rock : househand ==="Paper"? Paper : Scissors;

  let myhandWins = props.game === "YOU WON" ? "winnerEffect":"";
  let househandWins = props.game ==="YOU LOSE"? "winnerEffect":"";
  

  const [houseHandDisplay, setHouseHandDisplay] = useState(<div className="placeholder"></div>);
  
  setTimeout(()=>{setHouseHandDisplay(<img className={`${househandClass} houseAni`} alt={househand} src={househandIcon} onClick={props.clickNoise}/>);}, 1000);
  
  if(window.innerWidth>480){
    return(
      <div className="resultBox">
        <div className="handBox">
          <h2 className ="handTag">YOU PICKED</h2>
          <img className={myhandClass} alt={myhand} src={myhandIcon} onClick={props.clickNoise}/>
          <div className ={myhandWins}></div>
        </div>
        <div className = "playagainBox">
          <h1 className="result">{props.game}</h1>
          <div className="againBtn" onClick ={props.replayBtn}>PLAY AGAIN</div>
        </div>
        <div className="handBox">
          <h2 className ="handTag">THE HOUSE PICKED</h2>
          {houseHandDisplay}
          <div className ={househandWins}></div>
        </div>
      </div>
    )
  }
  else{
    return(
        <div className = "mobileGameBox">
          <div className="resultBox">
            <div className="handBox">
              <img className={myhandClass} alt={myhand} src={myhandIcon} onClick={props.clickNoise}/>
              <h2 className ="handTag">YOU PICKED</h2>
              <div className ={myhandWins}></div>
            </div>
            <div className="handBox">
              {houseHandDisplay}
              <h2 className ="handTag">THE HOUSE PICKED</h2>
              <div className ={househandWins}></div>
            </div>
        </div>
        <div className ="replayBox">
          <div className = "playagainBox">
            <h1 className="result">{props.game}</h1>
            <div className="againBtn" onClick ={props.replayBtn}>PLAY AGAIN</div>
          </div>
        </div>
      </div>
      
    )
  }
  
}

const RPSGame = (props)=>{
  return(
    <div className ="RPSBox">
      <img alt ="triangleB" className="triangleB" src ={Triangle}/>
      <div className = "PSBox">
        <img myhand = "Paper" className="RCPBtnP" alt="Paper" src={Paper} onClick ={props.whoWon}/>
        <img myhand = "Scissors" className="RCPBtnS" alt="Scissors" src={Scissors} onClick ={props.whoWon}/>
      </div>
      <div className ="RBox">
        <img myhand = "Rock" className="RCPBtnR" alt="Rock" src={Rock} onClick ={props.whoWon}/>
      </div>
    </div>
  )
}

const RulesDisplay = (props) =>{
  if(window.innerWidth>480){
    return(
      <div className = "ruleBackground">
        <div className ="ruleBox">
          <div className ="ruleH">
            <h2>RULES</h2>
            <i className="fas fa-times" onClick ={props.handleRules}></i>
          </div>
          <img alt="rulesImg" src ={Rules}/>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className ="ruleMobileBg">
        <h2>RULES</h2>
        <img alt="rulesImg" src ={Rules}/>
        <i className="fas fa-times" onClick ={props.handleRules}></i>
      </div>
    )
  }
  
}

export default App;
