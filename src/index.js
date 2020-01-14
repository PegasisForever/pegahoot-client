import {Component} from "react"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import {JoinActivity} from "./JoinActivity"

const wsUrl = "ws://localhost:8080/client"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "activity": "JOIN",
            "name": null,
            "joinBtnErrorText": null,
            "score": null
        }
        this.socket = new WebSocket(wsUrl)
        let self = this

        this.socket.onopen = function (event) {
            console.log("Socket connected")
            // socket.send("My name is John");
        }

        this.socket.onmessage = function (event) {
            console.log(`Socket received: ${event.data}`)
            self.setState(JSON.parse(event.data))
        }

        this.socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(`Socket closed cleanly, code=${event.code} reason=${event.reason}`)
            } else {
                console.log('Socket died')
            }
        }

        this.socket.onerror = function (error) {
            alert(`Socket error: ${error.message}`)
        }
    }

    render() {
        if (this.state.activity==="JOIN"){
            return <JoinActivity users={this.state.users} startGame={this.startGame}/>
        }
        return <div/>
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
