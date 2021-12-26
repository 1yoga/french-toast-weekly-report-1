/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Header } from "../common/Header/Header.component";
import { NavLink } from "react-router-dom";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import moment from "moment";
import { MyReportsCard } from "../MyReports/MyReports.Card.component";
import * as Dates from "../common/Utiles/DateUtiles";
import getWeeklyReportHistory from "./WeeklyReport.service";
import { api } from "../api/api.service";
import { WeeklyOlderReports } from "./WeeklyReportHistory.OlderReports";
import { Loader } from "../common/Loader/Loader.component";
import { Context } from "../app/App.component";
import { baseUrl } from "../common/Utiles/function";

export const WeeklyReportHistory = () => {
    const [activeTeam, setActiveTeam] = useState(1);
    const [activePeriod, setActivePeriod] = useState(2);
    const [activeMoraleFilter, setActiveMoraleFilter] = useState(0);
    const [reportHistory, setReportHistory] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { currentUser } = useContext(Context);

    const [reports, setReports] = useState([]);
    const dates = Dates.getCurrentAndPreviousDate();
    const firstday = dates[0];
    const lastday = dates[1];
    const firstdayPrev = dates[2];
    const lastdayPrev = dates[3];
    const periods = [`Previous period: ${Dates.getPreviousPeriod()}`, `Current Period: ${Dates.getCurrentPeriod()}`, "Older Reports"];

    function expandAll() {
        const items = document.getElementsByClassName("accordion-collapse");
        const items2 = document.getElementsByClassName("accordion-button");
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute("class", "accordion-collapse collapse show");
            items2[i].setAttribute("aria-expanded", "true");
            items2[i].setAttribute("class", "accordion-button");
        }
    }

    async function getReports() {
        const companyId = currentUser.companyId;
        return [
            await api.get(`companies/${companyId}/team-members/0/reports/to/${Dates.DateToString(firstdayPrev)}/${Dates.DateToString(lastdayPrev)}`, { validateStatus: false })
                .then((response) => response.data), 
            await api.get(`companies/${companyId}/team-members/0/reports/to/${Dates.DateToString(firstday)}/${Dates.DateToString(lastday)}`, { validateStatus: false })
                .then((response) => response.data)];
    }

    async function InitReports() {
        const companyId = currentUser.companyId;
        const nineWeeksAgoMonday = moment().subtract(9, "week").startOf("isoWeek").format("YYYY-MM-DD");
        const currentMonday = moment().startOf("isoWeek").format("YYYY-MM-DD");
        const data = await getWeeklyReportHistory(companyId, nineWeeksAgoMonday, currentMonday);
        setReportHistory(data);
        let teamMembersTemp = [];
        data.forEach((item) => {
            teamMembersTemp.push(item["teamMemberName"]);
        });
        setTeamMembers(teamMembersTemp);
    }

    useEffect(InitReports, []);
    useEffect(async () => {
        try {
            setReports(await getReports());
            const url = new URL(window.location.href);
            const period = parseInt(url.searchParams.get("period"));
            const filter = parseInt(url.searchParams.get("filter"));
            setActivePeriod(period);
            isNaN(filter) ? setActiveMoraleFilter(0) : setActiveMoraleFilter(filter);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <HelmetComponent title="Weekly Report History" />
            <Header>
                <div className="pt-2">
                    {["Immediate Team", "Extended Team"].map((item, index) => {
                        const link = activePeriod === 2 ? `/weekly-report-history?period=${activePeriod}&filter=${activeMoraleFilter}#` : `/weekly-report-history?period=${activePeriod}`;
                        return (
                            <NavLink to={item === "Immediate Team" ? "/team-reports?period=1" : link} key={index} className={activeTeam === index ? "py-0 btn btn-dark btnActive" : "py-0 btn btn-dark btnDisable"} onClick={() => setActiveTeam(index)}>
                                {item}
                            </NavLink>
                        );
                    })}
                </div>
                <div className="header-info">
                    <div className="header-text team-title mt-4">
                        <b>Weekly Report History</b>
                    </div>
                    <div className="header-team-text mt-4">Get a bigger picture of how your team has been doing over time.</div>
                </div>
            </Header>
            <div className=" team-members row justify-content-md-center">
                <div className="col-md-9">
                    <div className="pb-4 text-center">
                        <div className="pt-5">
                            {periods.map((item, index) => (
                                <button
                                    key={index}
                                    className={activePeriod === index ? "py-0 btn btn-dark btnActive" : "py-0 btn btn-dark btnDisable"}
                                    onClick={() => {
                                        setActivePeriod(index);
                                        const path = new URL(window.location.href).toString().includes("weekly-report-history") ? "weekly-report-history" : "team-reports";
                                        index !== 2 ? history.pushState(null, null, baseUrl + "/" + path + `/?period=${index}`) : history.pushState(null, null, baseUrl + "/" + path + `/?period=${index}&filter=0`);
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        {activePeriod == 2 && <WeeklyOlderReports reports={reportHistory} members={teamMembers} activePeriod={activePeriod} activeMoraleFilter={activeMoraleFilter} setActiveMoraleFilter={setActiveMoraleFilter} />}
                        {activePeriod != 2 && (
                            <div>
                                <div className="pt-5">
                                    <strong>EXTENDED TEAM</strong>
                                    <div className="mt-3 short-line mx-auto"> </div>
                                </div>
                                <div className="w-100 mb-2 m-auto d-grid gap-2 d-flex justify-content-end">
                                    <button className="btn btn-dark text-light" id="allexpanded" onClick={expandAll}>
                                        Expand All
                                    </button>
                                </div>
                                <div className="row w-100 m-auto p-3 pe-4 bg-white mb-1">
                                    <div className="col-7"> </div>
                                    <div className="col-1 p-0 ms-2">Morale</div>
                                    <div className="col-1 p-0 ms-2">Stress</div>
                                    <div className="col-1 p-0">Workload</div>
                                </div>
                            </div>
                        )}
                        {activePeriod != 2 &&
                            reports[activePeriod].map((item, index) => {
                                return <MyReportsCard reportData={item} key={index} />;
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};
