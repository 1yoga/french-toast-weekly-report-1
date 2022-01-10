import React from "react";
import { NavLink } from "react-router-dom";

export const TeamMemberCard = ({ item }) => {
    const link = "/edit-member-information/" + item.teamMemberId;

    const fullName = item.firstName + " " + item.lastName;
    const initials = (item.firstName.charAt(0) + item.lastName.charAt(0)).toUpperCase();
    return (
        <li className="p-3 shadow-sm rounded list-group-item mb-2 d-flex border-1 align-items-center justify-content-between text-center">
            <div className="d-flex align-items-center">
                <div className="round p-2 rounded-circle">{initials}</div>
                <div className="m-3">{fullName}</div>
            </div>
            <NavLink onClick={() => {}} className="text-decoration-none text-reset" to={link}>
                Edit
            </NavLink>
        </li>
    );
};
