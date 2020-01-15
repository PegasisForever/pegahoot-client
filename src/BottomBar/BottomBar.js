import React from "react"
import "./BottomBar.css"

export function BottomBar(props) {
    return <div className={"bottom-bar"}>
        <span className={"name-span"}>{props.name}</span>
        <span className={"score-span"}>Score: {props.score}</span>
    </div>
}