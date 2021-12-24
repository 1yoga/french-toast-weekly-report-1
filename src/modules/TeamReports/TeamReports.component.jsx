/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Header } from "../common/Header/Header.component";
import { NavLink } from "react-router-dom";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { api } from "../api/api.service";
import { MyReportsCard } from "../MyReports/MyReports.Card.component";
import * as Dates from "../common/Utiles/DateUtiles";
import { WeeklyOlderReports } from "../WeeklyReportHistory/WeeklyReportHistory.OlderReports";
import getWeeklyReportHistoryToUser from "../TeamReports/TeamReports.service";
import { Context } from "../app/App.component";

export const TeamReports = () => {
    const [activeTeam, setActiveTeam] = useState(0);
    const [activePeriod, setActivePeriod] = useState(1);
    const dates = Dates.getCurrentAndPreviousDate();
    const firstday = dates[0];
    const lastday = dates[1];
    const firstdayPrev = dates[2];
    const lastdayPrev = dates[3];
    const periods = ["Previous period: " + Dates.DateToString(firstdayPrev) + " — " + Dates.DateToString(lastdayPrev), "Current period: " + Dates.DateToString(firstday) + " — " + Dates.DateToString(lastday), "Older Reports"];
    const initials = (item) => {
        return item.split(" ").map((n) => n[0]).join("");
    };
    const [reports, setReports] = useState([]);
    const [teamMembersForInititals, setTeamMembersForInititals] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [reportHistory, setReportHistory] = useState([]);

    const { currentUser } = useContext(Context);

    async function InitReports() {
        const data = await getWeeklyReportHistoryToUser(currentUser.companyId, currentUser.teamMemberId, "20211018", "20211220");
        setReportHistory(data);
        let teamMembersTemp = [];
        data.forEach((item) => {
            teamMembersTemp.push(item["teamMemberName"]);
        });
        setTeamMembers(teamMembersTemp);
    }

    async function getReports() {
        const teamMemberId = currentUser.teamMemberId;
        return [await api.get(`companies/0/team-members/${teamMemberId}/reports/to/${Dates.DateToString(firstdayPrev)}/${Dates.DateToString(lastdayPrev)}`, { validateStatus: false }).then((response) => response.data), 
                await api.get(`companies/0/team-members/${teamMemberId}/reports/to/${Dates.DateToString(firstday)}/${Dates.DateToString(lastday)}`, { validateStatus: false }).then((response) => response.data)];
    }

    async function getTeamMembers() {
        const companyId = currentUser.companyId;
        return await api.get(`companies/${companyId}/team-members`, { validateStatus: false }).then((response) => response.data);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setReports(await getReports());
                setTeamMembersForInititals(await getTeamMembers());
                await InitReports();
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function expandAll() {
        const items = document.getElementsByClassName("accordion-collapse");
        const items2 = document.getElementsByClassName("accordion-button");
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute("class", "accordion-collapse collapse show");
            items2[i].setAttribute("aria-expanded", "true");
            items2[i].setAttribute("class", "accordion-button");
        }
    }

    return (
        <>
            <HelmetComponent title="Team Reports" />
            <Header>
                <div className="pt-2">
                    {["Immediate Team", "Extended Team"].map((item, index) => (
                        <NavLink to={item === "Extended Team" ? "weekly-report-history" : "#"} key={index} className={activeTeam === index ? "py-0 btn btn-dark btnActive" : "py-0 btn btn-dark btnDisable"} onClick={() => setActiveTeam(index)}>
                            {item}
                        </NavLink>
                    ))}
                </div>
                <div className="pt-4 d-flex mx-auto">
                    {teamMembersForInititals.slice(0, 4).map((item, index) => (
                        <div key={index} style={{ zIndex: teamMembersForInititals.length - index }} className="behind round p-2 rounded-circle">
                            {`${item.firstName[0]}${item.lastName[0]}`}
                        </div>
                    ))}
                    {teamMembersForInititals.length > 4 && (
                        <div style={{ zIndex: teamMembersForInititals.length }} className="round-yellow round p-2 rounded-circle">
                            +{teamMembersForInititals.length - 4}
                        </div>
                    )}
                </div>
            </Header>
            <div className="pb-2 text-center">
                <div className="pt-5">
                    {periods.map((item, index) => (
                        <button
                            key={index}
                            className={activePeriod === index ? "py-0 btn btn-dark btnActive" : "py-0 btn btn-dark btnDisable"}
                            onClick={() => {
                                setActivePeriod(index);
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                {activePeriod !== 2 && (
                    <div className="p-5">
                        <strong>IMMEDIATE TEAM</strong>
                        <div className="mt-3 short-line mx-auto"> </div>
                    </div>
                )}
            </div>
            {activePeriod !== 2 && (
                <>
                    <div className="w-75 mb-2 m-auto d-grid gap-2 d-flex justify-content-end">
                        <button className="btn btn-dark text-light" id="allexpanded" onClick={expandAll}>
                            Expand All
                        </button>
                    </div>
                    <div className="row w-75 m-auto p-3 pe-4 bg-white mb-1">
                        <div className="col-7"> </div>
                        <div className="col-1 p-0 ms-2">Morale</div>
                        <div className="col-1 p-0 ms-2">Stress</div>
                        <div className="col-1 p-0">Workload</div>
                    </div>
                    <div className="accordion w-75 m-auto mb-5" id="myAccordion">
                        {reports[activePeriod] ? (
                            reports[activePeriod].map((item, index) => {
                                return <MyReportsCard reportData={item} key={index} />;
                            })
                        ) : (
                            <div className="w-100 text-center bg-white mt-2 p-3">There are no members who send reports to you</div>
                        )}
                    </div>
                </>
            )}

            {activePeriod === 2 && (
                <div className="pb-4 text-center">
                    <WeeklyOlderReports reports={reportHistory} members={teamMembers} />
                </div>
            )}
        </>
    );
};
