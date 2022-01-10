import React from "react";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { Header } from "../common/Header/Header.component";
import { useAuth0 } from "@auth0/auth0-react";

export const WelcomePage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <HelmetComponent title="Weekly Team Report" />
            <Header>
                <div>
                    <h1 className="header-title">Weekly Team Report</h1>
                </div>
            </Header>
            <div className="text-center ">
                <h1 className="m-5">Welcome to Weekly Team Report</h1>
                <p className="card-text  fs-5">To continue working, please go through the authorization</p>
                <button onClick={() => loginWithRedirect()} className="btn btn-warning shadow-none">
                    Log In
                </button>
            </div>
        </>
    );
};

export default WelcomePage;
