import React from "react";
import { smilesStore } from "../../store/smilesStore";


function getSmileSet(id, reportHistory, filter) {
    let values;
    let userSmiles = [];
    let data = new Map(Object.entries(reportHistory));
    if (filter === 0) {
        try {
            values = data.get(id).teamMemberReports;
            values.forEach((value) => {
                let sum = value.reduce((a, b) => a + b, 0);
                userSmiles.push(smilesStore[Math.round(sum / value.length)]);
            });
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            values = data.get(id).teamMemberReports;
            values.forEach((value) => {
                userSmiles.push(smilesStore[value[filter - 1]]);
            });
        } catch (e) {
            console.log(e);
        }
    }
    return userSmiles;
}

export const WeeklyReportHistoryCard = ({ cardName, id, reportHistory, filter }) => {
    const userSmiles = getSmileSet(id, reportHistory, filter);

    return (
        <div className="card card-header d-flex flex-row text-start justify-content-between pt-3 pb-3 pr-0 mb-2">
            <div className="card-name mt-1">{cardName}</div>
            <div className="smiles d-flex align-items-center justify-content-between">
                {userSmiles.map((item, index) => (
                    <img key={index} className="smile mr-3" src={item.imageSmall} alt={item.alt} />
                ))}
            </div>
        </div>
    );
};
