import React, { useContext, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Context } from "../app/App.component";
import { api } from "../api/api.service";
import { Loader } from "../common/Loader/Loader.component";

export const EditModal = ({ setShowEdit, teamMemberStore, title }) => {
    const { currentUser } = useContext(Context);
    const [deleteMember, setDeleteMember] = useState(false);
    const [insertedMember, setinsertedMember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [membersList, setmembersList] = useState([]);
    const [uniqueMembers] = useState([]);

    async function deleteLinkToMember(index, idMember) {
        setDeleteMember(true);
        let idMemberFrom, idMemberTo;
        if (title === "Edit Leader(s)") {
            idMemberFrom = currentUser.teamMemberId;
            idMemberTo = idMember;
        } else if (title === "Edit Member(s)") {
            idMemberFrom = idMember;
            idMemberTo = currentUser.teamMemberId;
        }
        await api.delete(`report-from-to/${idMemberTo}/${idMemberFrom}`, { validateStatus: false });
        teamMemberStore.splice(index, 1);
        setDeleteMember(false);
    }
    async function getAllMembers() {
        const companyId = currentUser.companyId;
        return await api.get(`companies/${companyId}/team-members`, { validateStatus: false }).then((response) => response.data);
    }
    async function insertMember() {
        setinsertedMember(true);
        var select = document.getElementById("selectObj");
        var option = select.options[select.selectedIndex].value;
        var name = select.options[select.selectedIndex].text.split(" ");
        let idMemberFrom, idMemberTo;
        if (title === "Edit Leader(s)") {
            idMemberFrom = currentUser.teamMemberId;
            idMemberTo = option;
        } else if (title === "Edit Member(s)") {
            idMemberFrom = option;
            idMemberTo = currentUser.teamMemberId;
        }
        await api.post(`report-from-to/`, {
            teamMemberFrom: idMemberFrom,
            teamMemberTo: idMemberTo,
        });
        teamMemberStore.push([option, name[0], name[1]]);
        setinsertedMember(false);
    }
    function getUniqueMembers() {
        uniqueMembers.splice(0, uniqueMembers.length);
        membersList.forEach((memberFromDB) => {
            var flag = true;
            if (memberFromDB.teamMemberId == currentUser.teamMemberId) {
                flag = false;
            } else {
                teamMemberStore.forEach((member) => {
                    if (member[0] == memberFromDB.teamMemberId) {
                        flag = false;
                    }
                });
            }
            if (flag) uniqueMembers.push([memberFromDB.teamMemberId, memberFromDB.firstName, memberFromDB.lastName]);
        });
    }
    useEffect(async () => {
        try {
            setmembersList(await getAllMembers());
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    if (!isLoading) {
        {
            getUniqueMembers();
        }
        return (
            <div className="modal1">
                <div className="modal-content">
                    <div className="modal-header">
                        <button onClick={() => setShowEdit(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            {" "}
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="page-title">
                            <h2>{title}</h2>
                            <p>By default, the person who sent you the invite will receive your weekly report. You may also select the person you report to directly as an additional leader.</p>
                            <p>Pro Tip: You can change who sees your report in your profile settings.</p>
                        </div>
                        <div className="tags">
                            {!deleteMember &&
                                teamMemberStore.map((item, index) => (
                                    <div key={index} className="d-flex tag input-group mb-3" onClick={() => deleteLinkToMember(index, item[0])}>
                                        <div className="btn btn-dark shadow-none">
                                            {item[1]} {item[2]} <IoMdClose className="name-btn" />
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <form>
                            {!insertedMember && (
                                <select id="selectObj" className="form-select mb-3" aria-label="Default select example" onChange={insertMember}>
                                    {title === "Edit Leader(s)" ? <option value={0}>Select company members to whom you will send reports.</option> : <option value={0}>Select company members who will send you reports.</option>}
                                    {uniqueMembers.map((item, index) => (
                                        <option key={index} value={item[0]}>
                                            {item[1] + " " + item[2]}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <button className="btn btn-warning" data-bs-dismiss="modal">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};
