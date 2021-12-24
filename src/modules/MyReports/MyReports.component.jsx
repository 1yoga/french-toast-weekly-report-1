import React, {useEffect, useState, useContext } from "react";
import {Header} from "../common/Header/Header.component";
import {MyReportsCard} from "./MyReports.Card.component";
import {HelmetComponent} from "../common/Helmet/Helmet.component";
import { api } from "../api/api.service";
import { Context } from "../app/App.component";

export const MyReports = () => {
    const [reports, setReports] = useState(null);
    const { currentUser } = useContext(Context);

    async function getReports(){
        const companyId = currentUser.companyId;
        const teamMemberId = currentUser.teamMemberId;
        return await api.get(`companies/${companyId}/team-members/${teamMemberId}/reports`, {validateStatus: false})
            .then((response)=> response.data);
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                setReports(await getReports());
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        
    },[]);
    


    function expandAll(){
        const items = document.getElementsByClassName('accordion-collapse');
        const items2 = document.getElementsByClassName('accordion-button');
        for(let i = 0; i<items.length;i++)
        {
            items[i].setAttribute('class', 'accordion-collapse collapse show');
            items2[i].setAttribute('aria-expanded','true');
            items2[i].setAttribute('class','accordion-button');
        }
    }
    const userName = `${currentUser.firstName} ${currentUser.lastName}`;
    const userMail = currentUser.mail;

    return(
        <>
            <HelmetComponent title="My Reports"/>
            <Header>
                <div className="mx-auto header-avatar">
                    <div>{`${currentUser.firstName[0]}${currentUser.lastName[0]}`}</div>
                </div>
                <h1 className="header-title">{userName}</h1>
                <span className="header-subtitle">{userMail}</span>
            </Header>
            <div className="p-5 pb-4 text-center">
                <strong>PAST WEEKLY REPORTS</strong>
                <div className="mt-3 short-line mx-auto"> </div>
            </div>
            <div className="w-75 mb-2 m-auto d-grid gap-2 d-flex justify-content-end">
                <button className="btn btn-dark text-light" id="allexpanded" onClick={expandAll}>Expand All</button>
            </div>
            <div className="row w-75 m-auto p-3 pe-4 bg-white mb-1">
                <div className="col-7"> </div>
                <div className="col-1 p-0 ms-2">Morale</div>
                <div className="col-1 p-0 ms-2">Stress</div>
                <div className="col-1 p-0">Workload</div>
            </div>
            <div className="accordion w-75 m-auto" id="myAccordion">
                {reports ? reports.map((item, index)=>{
                    return(
                        <MyReportsCard reportData={item} key={index}/>
                    )
                }) : <div className="w-100 text-center bg-white mt-2 p-3">There are no reports yet</div>}
            </div>
        </>
    )
}
