import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {NavLink} from "react-router-dom";
import {BsBoxArrowInRight} from "react-icons/bs";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <li className="nav-item">
            <NavLink onClick={() => loginWithRedirect()} className="nav-link d-flex align-items-center" activeClassName="active" to="/auth">
                <BsBoxArrowInRight /> Login
            </NavLink>
        </li>
    );
};

