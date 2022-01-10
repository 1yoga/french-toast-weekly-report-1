import React, { useContext, useEffect, useState } from "react";
import { Context } from "../app/App.component";
import { EditMemberInformation } from "./EditMemberInformation.component";
import { useParams } from "react-router-dom";
import { getMember } from "./EditMemberInformation.service";
import { Loader } from "../common/Loader/Loader.component";

export const Profile = ({ anotherMember }) => {
    const { currentUser } = useContext(Context);
    const params = useParams();
    const prodId = params.id;

    const [member, setMember] = useState();

    useEffect(async () => {
        if (prodId) {
            try {
                const data = await getMember(1, prodId);
                await setMember(data.data);
            } catch (error) {
                console.error(error);
            }
        }
    }, [prodId]);

    if (!member && prodId) {
        return <Loader />;
    }

    return (
        anotherMember
             ? <EditMemberInformation key={member.teamMemberId} edit={currentUser.teamMemberId !== member.teamMemberId} member={member}/>
             : <EditMemberInformation key={currentUser.teamMemberId} edit={false} member={currentUser}/>
    )
};
