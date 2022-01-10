import React from "react";
import { Switch, Route } from "react-router-dom";
import { LaunchGuide } from "../../LaunchGuide/LaunchGuide.component";
import { InviteYourTeam } from "../../InviteYourTeam/InviteYourTeam.component";
import { TeamMembers } from "../../TeamMembers/TeamMembers.component";
import { TeamReports } from "../../TeamReports/TeamReports.component";
import { FeedbackBtn } from "../buttons/FeedbackBtn..component";
import { HelpBtn } from "../buttons/HelpBtn..component";
import { FillOutReport } from "../../FillOutReport/FillOutReport.component";
import { MyReports } from "../../MyReports/MyReports.component";
import { WeeklyReportHistory } from "../../WeeklyReportHistory/WeeklyReportHistory.component";
import { Aside } from "../Aside/Aside.component";
import { MyCompany } from "../../MyCompany/MyCompany.component";
import { Profile } from "../../EditMemberInformation/Profile";

export const Article = () => {
    return (
        <div className="wrapper d-flex w-100 h-100">
            <Aside />
            <main className="flex-grow-1">
                <FeedbackBtn />
                <HelpBtn />
                <article className="w-100 h-100">
                    <Switch>
                        <Route exact path="/">
                            <LaunchGuide />
                        </Route>
                        <Route path="/invite-your-team">
                            <InviteYourTeam />
                        </Route>
                        <Route path="/my-reports">
                            <MyReports />
                        </Route>
                        <Route path="/fill-out-a-report">
                            <FillOutReport />
                        </Route>
                        <Route path="/team-reports">
                            <TeamReports />
                        </Route>
                        <Route path="/weekly-report-history">
                            <WeeklyReportHistory />
                        </Route>
                        <Route path="/my-company">
                            <MyCompany />
                        </Route>
                        <Route path="/team-members">
                            <TeamMembers />
                        </Route>
                        <Route path="/edit-member-information/:id">
                            <Profile anotherMember={true} />
                        </Route>
                        <Route path="/my-profile">
                            <Profile />
                        </Route>
                    </Switch>
                </article>
            </main>
        </div>
    );
};
