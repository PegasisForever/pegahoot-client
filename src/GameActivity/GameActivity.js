import React from "react"
import "./GameActivity.css"

export class GameActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textInput: ""
        }
    }

    render() {
        let questionSentences = this.props.questionSentence.split("__")
        return <div className={"full-page"}>
            <p className={"question-number"}>Question #{this.props.questionIndex}</p>
            <div className={"center"}>
                <p className={"question-text"}>{this.props.questionText}</p>
                <p className={"question-sentence"}>
                    {questionSentences[0]}
                    <input type="text"
                           className={"answer-input"}
                           value={this.state.textInput}
                           onChange={(event) => this.setState({textInput: event.target.value})}/>
                    {questionSentences[1]}
                </p>
                <button className={"submit-button"}
                        disabled={this.state.textInput === ""}>Submit</button>
            </div>
        </div>
    }
}