import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";

export const SignOutButton = () => {
    const { logout } = useAuth0();
    return (
        <li className="nav-item">
            <NavLink onClick={() => logout({ returnTo: window.location.origin, })}
                className="nav-link d-flex align-items-center" activeClassName="active" to="/auth">
                <BsBoxArrowLeft /> Sign Out
            </NavLink>
        </li>
    );
};

export default SignOutButton;
