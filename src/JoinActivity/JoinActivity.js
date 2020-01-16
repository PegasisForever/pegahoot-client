import React, {Component} from "react"
import logo from "../pegahoot_logo.png"
import "./JoinActivity.css"

export class JoinActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textInput: ""
        }
    }

    render() {
        return <div className={"full-page"}>
            <img className={"logo"} src={logo} alt="Logo"/>
            <p className={"enter-name"}>Enter your name:</p>
            <p className={"error-text"}>{this.props.errorText}</p>
            <form onSubmit={e=>{
                e.preventDefault()
                this.props.onSubmit(this.state.textInput)
            }}>
                <input type="text"
                       className={"name-input"}
                       value={this.state.textInput}
                       onChange={(event) => this.setState({textInput: event.target.value})}/>
                <button disabled={this.state.textInput === ""}
                        className={"join-button"}
                        type={"submit"}>
                    Join
                </button>
            </form>
        </div>
    }
}