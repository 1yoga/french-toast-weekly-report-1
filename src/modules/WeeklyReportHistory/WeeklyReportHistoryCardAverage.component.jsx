/* eslint-disable no-empty */
import React from "react";
import { smilesStore } from "../../store/smilesStore";

function getSmileSet(reportHistory, filter) {
    let userAverage = [];
    let averageSmiles = [];
    let sum;
    try {
        for (let i = 0; i < 10; i++) {
            sum = 0;
            if (filter === 0) {
                reportHistory.forEach((item) => {
                    sum += item.teamMemberReports[i].reduce((a, b) => a + b, 0) / 3;
                });
            } else {
                reportHistory.forEach((item) => {
                    sum += item.teamMemberReports[i][filter - 1];
                });
            }
            userAverage.push(Math.ceil(sum / reportHistory.length));
        }
        userAverage.forEach((value) => {
            averageSmiles.push(smilesStore[value]);
        });
        return averageSmiles;
    } catch (e) {
        console.log(e);
    }
}

export const WeeklyReportHistoryCardAverage = ({ cardName, reportHistory, filter }) => {
    const averageSmiles = getSmileSet(reportHistory, filter);

    return (
        <div className="card card-header d-flex flex-row align-items-center justify-content-between pt-3 pb-3 pr-0 mb-2">
            <div className="card-name">{cardName}</div>
            <div className="smiles d-flex align-items-center justify-content-between">
                {averageSmiles.map((item, index) => (
                    <img key={index} className="smile mr-3" src={item?.imageSmall} alt={item?.alt} />
                ))}
            </div>
        </div>
    );
};
