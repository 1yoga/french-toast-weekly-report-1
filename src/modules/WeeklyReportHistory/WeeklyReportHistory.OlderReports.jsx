import React, { useState } from "react";
import { WeekAgo } from "./WeekAgo.component";
import { WeeksHeader } from "./WeeksHeader.component";
import { weekAgoStore } from "../../store/weekAgoStore";
import { WeeklyReportHistoryCard } from "./WeeklyReportHistoryCard.component";
import { WeeklyReportHistoryCardAverage } from "./WeeklyReportHistoryCardAverage.component";

export const WeeklyOlderReports = ({reports, members}) => {
    const teamMembers = members;
    const reportHistory = reports;
    const [activeMoraleFilter, setActiveMoraleFilter] = useState(0);
    const averageMorales = ["Overall", "Morales", "Stress", "Workload"];
    return(
        <>
            <div className="pt-4">
            {["Overall", "Morale", "Stress", "Workload"].map((item, index) => (
                <button key={index} className={activeMoraleFilter === index ? "py-0 btn btn-dark btnActive" : "py-0 btn btn-dark btnDisable"} onClick={() => setActiveMoraleFilter(index)}>
                    {item}
                </button>
            ))}
            </div>
            <div className="pt-5">
                <strong>EXTENDED TEAM AVERAGE</strong>
                <div className="mt-3 short-line mx-auto"> </div>
            </div>
            <div className="overall container d-flex flex-column mt-5">
                <div className="weeks-block d-flex align-items-center justify-content-end">
                    <WeeksHeader align="between">
                        {weekAgoStore.map((item, index) => (
                            <WeekAgo key={index} period={item} />
                        ))}
                    </WeeksHeader>
                </div>

                <WeeklyReportHistoryCardAverage cardName={averageMorales[activeMoraleFilter]} reportHistory={reportHistory} filter={activeMoraleFilter} />
            </div>

            <div className="pt-5">
                <strong>EXTENDED TEAM</strong>
                <div className="mt-3 short-line mx-auto"> </div>
            </div>
            <div className="extended-team container d-flex flex-column mt-5">
                <div className="weeks-block d-flex align-items-center justify-content-end">
                    <WeeksHeader align="between">
                        {weekAgoStore.map((item, index) => (
                            <WeekAgo key={index} period={item} />
                        ))}
                    </WeeksHeader>
                </div>

                {teamMembers.map((item, index) => (
                    <WeeklyReportHistoryCard key={index} cardName={item} id={index.toString()} reportHistory={reportHistory} filter={activeMoraleFilter} />
                ))}
            </div>
        </>
    )
}
export default WeeklyOlderReports