import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { Header } from "../common/Header/Header.component";

export const InvitePage = () => {
    const { loginWithRedirect } = useAuth0();
    const currentLocation = window.location;

    const onClickButton = () => {
        sessionStorage.setItem("href", currentLocation.search.substr(1));
        loginWithRedirect();
    };
    return (
        <div>
            <HelmetComponent title="Weekly Team Report" />
            <Header>
                <div>
                    <h1 className="header-title">Weekly Team Report</h1>
                </div>
            </Header>
            <div className="text-center ">
                <h1 className="m-5">Welcome to Weekly Team Report</h1>
                <p className="card-text  fs-5">Are you sure to join to company?</p>
                <button onClick={onClickButton} className="btn btn-warning shadow-none">
                    Yes
                </button>
            </div>
        </div>
    );
};
