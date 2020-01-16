import {Component, Fragment} from "react"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import {JoinActivity} from "./JoinActivity/JoinActivity"
import {WaitActivity} from "./WaitActivity/WaitActivity"
import {CountDownActivity} from "./CountDownActivity/CountDownActivity"
import {BottomBar} from "./BottomBar/BottomBar"
import {GameActivity} from "./GameActivity/GameActivity"
import {GameWaitActivity} from "./GameWaitActivity/GameWaitActivity"

let wsUrl
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    wsUrl = "ws://localhost:5008/client"
} else {
    wsUrl = "wss://hoot.pegasis.site/ws/client"
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: "JOIN",
            name: null,
            joinBtnErrorText: null,
            score: null
        }
        this.socket = new WebSocket(wsUrl)
        let self = this

        this.socket.onopen = function (event) {
            console.log("Socket connected")
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

        this.submitName = this.submitName.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
    }

    submitName(name) {
        this.socket.send(JSON.stringify({
            command: "join",
            name: name
        }))
    }

    submitAnswer(index, answer) {
        this.socket.send(JSON.stringify({
            command: "submit",
            index: index,
            answer: answer
        }))
    }

    render() {
        if (this.state.activity === "JOIN") {
            return <JoinActivity
                onSubmit={this.submitName}
                errorText={this.state.joinBtnErrorText}/>
        } else if (this.state.activity === "WAIT") {
            return <WaitActivity/>
        } else if (this.state.activity === "COUNTDOWN") {
            return <Fragment>
                <CountDownActivity
                    questionIndex={this.state.questionIndex}
                    countDownSeconds={this.state.countDownSeconds}/>
                <BottomBar
                    name={this.state.name}
                    score={this.state.score}/>
            </Fragment>
        } else if (this.state.activity === "GAME") {
            return <Fragment>
                <GameActivity
                    questionIndex={this.state.questionIndex}
                    questionText={this.state.questionText}
                    questionSentence={this.state.questionSentence}
                    onSubmit={this.submitAnswer}/>
                <BottomBar
                    name={this.state.name}
                    score={this.state.score}/>
            </Fragment>
        } else if (this.state.activity === "GAMEWAIT") {
            return <Fragment>
                <GameWaitActivity
                    questionIndex={this.state.questionIndex}
                    isCorrect={this.state.isLastAnswerCorrect}
                    rank={this.state.rank}
                    followingUser={this.state.followingUser}
                    scoreBehindFollowingUser={this.state.scoreBehindFollowingUser}
                />
                <BottomBar
                    name={this.state.name}
                    score={this.state.score}/>
            </Fragment>
        }
        return <div/>
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
