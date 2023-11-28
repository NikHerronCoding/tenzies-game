import React from 'react'

export default function(props) {
    return (
        <div className="title">
            <h1 className="game-title">Tenzies</h1>
            <h3 className="game-instructions">
                {props.gameState? "You won!":"Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
            </h3>
        </div>
    )
}
