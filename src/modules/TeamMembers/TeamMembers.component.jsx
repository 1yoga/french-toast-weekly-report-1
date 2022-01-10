import React, { useState, useContext, useEffect } from "react";
import { Header } from "../common/Header/Header.component";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { getTeamMembers } from "./TemMembers.service";
import { Context } from "../app/App.component";
import { TeamMemberCard } from "./TeamMemberCard.component";
import { getJoinDate } from "../common/Utiles/function";

export const TeamMembers = () => {
    const { currentUser } = useContext(Context);
    const [teamMembers, setTeamMembers] = useState(null);
    const dateTitle = getJoinDate(currentUser.joinDate);

    useEffect(async () => {
        try {
            const teamMemberResponse = await getTeamMembers(currentUser.companyId);
            setTeamMembers(teamMemberResponse);
        } catch (error) {
            console.error(error);
        }
    }, []);
    return (
        <>
            <HelmetComponent title="Team Members" />
            <Header>
                <div>
                    <h1 className="header-title">{currentUser.companyName}</h1>
                    <span className="header-subtitle">{dateTitle}</span>
                </div>
            </Header>
            <div className="team-members row justify-content-md-center">
                <div className="mb-5 col-md-9">
                    <div className="p-5 pb-4 text-center">
                        <strong>TEAM MEMBERS</strong>
                        <div className="mt-3 short-line mx-auto"> </div>
                    </div>
                    <ul className="list-group">{teamMembers ? teamMembers.map((item, index) => <TeamMemberCard key={index} item={item} />) : null}</ul>
                </div>
            </div>
        </>
    );
};
