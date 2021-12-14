import React from "react";
import {Article} from "../common/Article/Article.component";
import {Aside} from "../common/Aside/Aside.component";
import {useAuth0} from '@auth0/auth0-react';


export function App() {
    const {isAuthenticated} = useAuth0();
    return (
        <div className="wrapper d-flex w-100 h-100">
            <Aside/>
            {isAuthenticated && <Article/>}
        </div>
    );
}
