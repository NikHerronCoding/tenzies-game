import React from 'react'

export default function(props) {

    let diceObjects = props.dice.map((die, index)=>{
        return (
            <div key={index} id={index} className={die.held? "die die-hold": "die" } onClick={props.hold}>
                <p> 
                    {die.number}
                </p>
            </div>
        )
    });

    return (
        <>
            <div className="dice-container" >
                {diceObjects}
                
            </div>
            <button className="roll-button" onClick={props.gameState? props.reset : props.roll}> {props.gameState? "Play Again" : "Roll"}</button>
        </>
    )
}