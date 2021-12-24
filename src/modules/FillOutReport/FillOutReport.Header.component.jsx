import React from "react";
import welcomeBack from "../../img/welcome-back.png"

export const FillOutReportHeader = ({userName}) =>
{
    return (
        <>
            <div className={"pt-5"}>
                <img alt="image" className="header-welcomeback" src={welcomeBack} />
                <h1 className={"fw-bold"}>{`${userName}!`}</h1>
                <p className={"pt-4"}>Let your leader know where you're winning and struggling this week - in less than 10 minutes.</p>
            </div>
        </>
    )
}
