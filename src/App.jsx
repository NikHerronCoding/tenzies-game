import { useState, useEffect } from 'react'


import DiceContainer from './components/DiceContainer';
import GameTitle from './components/GameTitle'
import RollCounter from './components/RollCounter'
import RecordInput from './components/RecordInput'


import './App.css'

function App() {

  //state variables
  
  let [gameOver, setGameOver] = useState(false)
  let [numRolls, setNumRolls] = useState(1)
  let [record, setRecord] = useState(localStorage.getItem('tenzies-record') ? JSON.parse(localStorage.getItem('tenzies-record')) : {score:'n/a', by:'n/a'} )
  let [displayModal, setDisplayModal] = useState(false)
  let [dice, setDice] = useState(initialize(10))
  let [recordName, setRecordName] = useState("")

  //this is a function to initialize the dice within the tenzies game
  function initialize(num) {
  let dice = []
  for (let i = 0; i < num; i++) {
    let  die = {
      number:(Math.ceil(Math.random() * 6)),
      held:false
    }
    dice.push(die)
  }
  return(dice)
  }

  function resetGame() {
    setDice(initialize(10))
    setNumRolls(1)
    setGameOver(false)
  }

  //prevents the selected dice from being rolled when the dice are rolled
  function holdDice(event) {
    
    let index = 0;
    if(event.target.tagName.localeCompare("P") === 0) {
      index = event.target.parentElement.id
    } else {
      index = event.target.id
    }
    let currentDie = {...dice[index]}
    currentDie.held = !currentDie.held;
    setDice(dice.map((die, diceIndex)=>{
      if (diceIndex == index) {
        
        return currentDie
      } else {
        
        return die
      }
    }))
  }
  //function to randomly roll the unheld dice
  function rollDice() {
    setNumRolls(prev=>prev+1)

    setDice(dice.map(
      (die)=> {
        if (die.held) {
          return die
        } else {
          return {held:die.held, number:(Math.ceil(Math.random() * 6))}
        }
      }
    ))
  }

  function changeRecord(event){
    setRecordName(event.target.value)
    console.log(event.target.value)
  }

  function saveRecord() {
    let record = {by: recordName, score: numRolls}
    localStorage.setItem('tenzies-record', JSON.stringify(record))
    setRecord(record)
    setDisplayModal(false)
  }

  //effect for checking if the game is over when the state of the dice change
  useEffect(()=>{
    setGameOver(dice.every(ele=>{
      return ele.number == dice[0].number}))
  }, [dice])

  //if game is over and a new record is reached, pop up the modal for score logging
  useEffect(()=>{
    if(gameOver && (record.score === 'n/a' || record.score > numRolls)) {
      //pop up modal
      setDisplayModal(true)
    } 
  }, [gameOver])


  return (
    <main className="main-content">
      {displayModal && <RecordInput 
                          change={changeRecord}
                          value={recordName}
                          save={saveRecord}
                          
                          />}

      <GameTitle 
        gameState={gameOver}
      />
      <DiceContainer
        gameState={gameOver}
        dice={dice}
        hold={holdDice}
        roll={rollDice}
        reset={resetGame}
      />
      <RollCounter 
        rolls={numRolls}
        record={record}
       
      />
      
    </main>
  )
}

export default App
