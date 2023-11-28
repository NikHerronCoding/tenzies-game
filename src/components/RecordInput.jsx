import React from 'react'

export default function(props) {
    return (
        <div className="record-input">
            <p className="won-text">New Record!!! Enter your name to save: </p>
            <input type="text" placeholder="Name" value={props.value} onChange={props.change}/>
            <button className="submit-button" onClick={props.save}>Submit</button>
        </div>
    )
}