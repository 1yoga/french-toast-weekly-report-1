import React from "react";
import helpPng from "../../../img/Help.png";

export const HelpBtn = () => {
    return (
        <div className="d-flex btn btn-warning btn-help rounded-pill position-fixed end-0 bottom-0">
            <img className="help-img" src={helpPng} alt="help" />
            <div>Help</div>
        </div>
    );
};
