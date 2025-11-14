import { useState, useEffect } from "react"
import RollBtn from "./components/rollBtn";
import NewGameBtn from "./components/newGameBtn";
import Confetti from "react-confetti"
const width= window.innerWidth;
const height= window.innerHeight;

let count=0;
let traceValue= 6;

export default function App(){
  const [diceData, setDiceData]= useState([
    { id:0, value:2, shouldRoll: true},
    { id:1, value:3, shouldRoll: true},
    { id:2, value:4, shouldRoll: true},
    { id:3, value:6, shouldRoll: true},
    { id:4, value:3, shouldRoll: true},
    { id:5, value:1, shouldRoll: true},
    { id:6, value:1, shouldRoll: true},
    { id:7, value:2, shouldRoll: true},
    { id:8, value:1, shouldRoll: true},
    { id:9, value:4, shouldRoll: true}
  ]);
  
  
  function roll(){
    setDiceData( prevData=>( prevData.map( data=>(
      data.shouldRoll? {...data, value: Math.floor(Math.random()*6+1)}:data
    ))))
    console.log("roll");
    
  }
  

  function newGame(){
    setDiceData( prevData=>( prevData.map( data=>(
      {...data,shouldRoll: true, value:Math.floor(Math.random()*6+1)}
    ))))
    count=0;
    console.log("new game");
  }
  


  function toggle(id){
    
    if( count==0){
      traceValue= diceData[id].value;
    }
    
    if( diceData[id].value== traceValue){
      setDiceData( prevData=>(
      prevData.map( data=>(
        data.id==id? {...data, shouldRoll: !data.shouldRoll}: data
      ))
    ))

    count= diceData[id].shouldRoll? count+1:count-1;
    console.log(count);
    }
    else{
      window.alert("Please Go with single value on dice");
    }
    
  }

  if( count==10){
    console.log("game completed");
  }
  

  const diceHtml= diceData.map( data=>(
    <button key={data.id} onClick={()=>toggle(data.id)} className={ data.shouldRoll? "":"naah"}>{data.value}</button>
  ))

  return(
    <main>
      {count==10 && 
      <Confetti
      width={width}
      height={height}
    />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click<br />each dice to freeze it at its current value<br />between rolls.</p>
      <div className="dice-container">
        
        {diceHtml}
      </div>
      {count==10? <NewGameBtn newGame={newGame}/>: <RollBtn roll={roll}/>}
    </main>
  )
}