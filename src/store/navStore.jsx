import React from "react";
import { BsGear, BsBoxArrowLeft } from "react-icons/bs";

export const navGroup1 = [
    {
        Text: "Launch Guide",
        Link: "/",
        isExact: true
    },
    {
        Text: "Invite Your Team",
        Link: "/invite-your-team",
    },
    {
        Text: "Team Reports",
        Link: "/team-reports",
    },
    {
        Text: "My Reports",
        Link: "/my-reports",
    },
    {
        Text: "Fill out a Report",
        Link: "/fill-out-a-report",
        IsMarked: true,
    },
];

export const navGroup2 = [
    {
        Text: "Back to Elite",
        Link: "/back-to-elite",
    },
    {
        Text: "My Company",
        Link: "/my-company",
    },
    {
        Text: "My Profile",
        Link: "/my-profile",
        Icon: <BsGear />,
    },
    {
        Text: "Sign Out",
        Link: "/sign-out",
        Icon: <BsBoxArrowLeft />,
    },
];