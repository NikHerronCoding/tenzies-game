import React from 'react'

export default function(props) {

    return ( 
    <div className="score-display">
        <p className="num-rolls">{"Rolls: " + props.rolls}</p>
        <p className="record">{"Record: " + props.record.score + " by " + props.record.by}</p>
    </div>

    )
}