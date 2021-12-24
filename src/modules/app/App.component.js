import React, {useEffect, useState} from "react";
import {Article} from "../common/Article/Article.component";
import {useAuth0} from '@auth0/auth0-react';
import WelcomePage from "../WelcomePage/WelcomePage";
import {InvitePage} from "../InvitePage/InvitePage.component";
import {NewCompany} from "../MyCompany/NewCompany.component";
import * as appService from "./App.service";
import {NewTeamMember} from "../InvitePage/NewTeamMember.component";
import {Loader} from "../common/Loader/Loader.component";

export const Context = React.createContext(null)

export function App() {
    const [currentUser, setCurrentUser] = useState()
    const {isAuthenticated, user, isLoading} = useAuth0();
    const currentLocation = window.location;
    const [hasCompany, setHasCompany] = useState(false)
    const [createNewCompany, setCreateNewCompany] = useState()
    const [createNewMember, setCreateNewMember] = useState()
    const [updateCompany, setUpdateCompany] = useState()
    const [updateMember, setUpdateMember] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (user && user.sub) {
            try {
                appService.getUserBySub(user.sub)
                    .then(res => {
                        res ? setHasCompany(true) : setHasCompany(false);
                    })
            } catch (error) {
                console.error(error)
            }
        }
    }, [user, createNewCompany, createNewMember])

    useEffect(async () => {
        if (user && user.sub) {
            try {
                const data = await appService.getUser(user.sub);
                await setCurrentUser(data);
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
    }, [user, updateCompany, updateMember, createNewMember, createNewCompany]);

    if (isAuthenticated && hasCompany && (isLoading || loading)) {
        return (
            <Loader/>
        )
    }

    return (
        <Context.Provider value={{
            currentUser,
            setUpdateMember,
            setUpdateCompany,
            setCreateNewMember,
            setCreateNewCompany,
            createNewMember
        }}>
            {currentLocation.pathname === "/invite"
                ? (isAuthenticated && hasCompany
                    ? <Article/>
                    : (isAuthenticated && !hasCompany)
                        ? <NewTeamMember/>
                        : <InvitePage/>)
                : (isAuthenticated && hasCompany)
                    ? <Article/>
                    : (isAuthenticated && !hasCompany)
                        ? <NewCompany/>
                        : <WelcomePage/>
            }
        </Context.Provider>
    );
}
