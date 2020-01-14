import React from "react"
import logo from "../pegahoot_logo.png"
import "../JoinActivity/JoinActivity.css"
import "./loader.css"
import "./WaitActivity.css"

export function WaitActivity() {
    return <div className={"full-page"}>
        <img className={"logo"} src={logo} alt="Logo"/>
        <div className={"loader"}>Loading...</div>
        <p className={"wait-text"}>Waiting for game to start...</p>
    </div>
}