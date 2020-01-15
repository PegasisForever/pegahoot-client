import React, {Fragment} from "react"
import "./GameWaitActivity.css"

export function GameWaitActivity(props) {
    return <div className={"full-page"}>
        <p className={"question-number"}>Question #{props.questionIndex}</p>
        <p className={"correct-text"}>{props.isCorrect ? "Correct ✔" : "Incorrect ✖"}</p>
        <div className={"info-div"}>
            {props.rank === null ?
                <p>Waiting for others to finish...</p> :
                <Fragment>
                    <p>You are in the {rank2Str(props.rank)} place{props.rank===1?".":","}</p>
                    {props.followingUser != null ?
                        <p>{props.scoreBehindFollowingUser} points behind {props.followingUser}.</p> :
                        null
                    }
                </Fragment>
            }
        </div>
    </div>
}

function rank2Str(rank) {
    if (rank === 1) {
        return "1st"
    } else if (rank === 2) {
        return "2nd"
    } else if (rank === 3) {
        return "3rd"
    } else {
        return rank + "th"
    }
}