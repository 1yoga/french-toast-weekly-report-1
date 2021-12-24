import React, {useContext, useState, useEffect} from "react";
import {Header} from "../common/Header/Header.component";
import {EditModal} from "./EditModal.component";
import {HelmetComponent} from "../common/Helmet/Helmet.component";
import {Form, Formik} from "formik";
import {TextInput} from "../common/Formik/textInput.component";
import * as Yup from "yup";
import {changeMemberInfo} from "./EditMemberInformation.service";
import {getMemberInitials, getMembersFullName, getMembersName} from "../common/Utiles/function";
import {Context} from "../app/App.component";
import {api} from "../api/api.service";
import {Loader} from "../common/Loader/Loader.component";


export const EditMemberInformation = ({member, edit}) => {
    const {setUpdateMember} = useContext(Context);
    const {currentUser} = useContext(Context);
    const memberInitials = getMemberInitials(member)
    const membersFullName = getMembersFullName(member)
    const membersName = getMembersName(member)

    const [showEdit, setShowEdit] = useState(false)
    const [currentTitle, setCurrentTitle] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [reportFromTo, setReportsFromTo] = useState([]);
    const [modalData, setModalData] = useState([]);

    const onClickEdit = (e, data) => {
        setShowEdit(true);
        setCurrentTitle(e.target.text);
        setModalData(data);
    };

    const onSubmit = async (values, {setSubmitting}) => {
        await changeMemberInfo(member.companyId, values)
        setUpdateMember([values.firstName, values.lastName, values.title])
        setSubmitting(false);
    }

    async function getReports() {
        const teamMemberId = currentUser.teamMemberId;
        return [await api.get(`report-to/${teamMemberId}`, {validateStatus: false}).then((response) => response.data),
            await api.get(`report-from/${teamMemberId}`, {validateStatus: false}).then((response) => response.data)];
    }

    useEffect(async () => {
        try {
            setReportsFromTo(await getReports());
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <>
            <HelmetComponent title="Edit Member Information"/>
            <Header>
                <div className="mx-auto header-avatar">
                    <div>{memberInitials}</div>
                </div>
                <h1 className="header-title">{membersFullName}</h1>
                <span className="header-subtitle">{member.mail}</span>
            </Header>
            <div className="container justify-content-md-center p-5">
                <div className="col-md-12 p-0">
                    <div className="page-title">
                        <h1>{"Edit " + membersName + "'s Information"}</h1>
                        <p>You may assign leaders or team members to this person, as well as deactivate their account if
                            they no longer work for your organization.</p>
                    </div>
                    <div className="page-section">
                        <div className="title border-bottom">BASIC PROFILE INFORMATION</div>

                        <Formik
                            initialValues={{
                                firstName: member.firstName,
                                lastName: member.lastName,
                                title: member.title,
                                teamMemberId: member.teamMemberId
                            }}
                            validationSchema={Yup.object({
                                firstName: Yup.string()
                                    .max(20, 'Must be 20 characters or less'),
                                lastName: Yup.string()
                                    .max(20, 'Must be 20 characters or less'),
                                title: Yup.string()
                                    .max(100, 'Must be 100 characters or less'),
                            })}
                            onSubmit={onSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form className="col-md-4">
                                    <TextInput
                                        disabled={edit}
                                        label="First Name"
                                        name="firstName"
                                        type="text"
                                        placeholder=""
                                    />
                                    <TextInput
                                        disabled={edit}
                                        label="Last Name"
                                        name="lastName"
                                        type="text"
                                        placeholder=""
                                    />
                                    <TextInput
                                        disabled={edit}
                                        label="Title"
                                        name="title"
                                        type="text"
                                        placeholder=""
                                    />
                                    <div className="form-group">
                                        <button disabled={edit || isSubmitting} type="submit"
                                                className="btn btn-warning border-2 shadow-none">Save
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="page-section reports-control">
                        <div
                            className="title border-bottom">{membersName.toUpperCase() + " REPORTS TO THE FOLLOWING LEADERS:"}</div>
                        <div className="team">
                            {reportFromTo[1] !== [] && reportFromTo[1].map((item, index) => (
                                <a key={index} href="#" className="me-2 btn btn-dark shadow-none" placeholder={item[0]}>
                                    {item[1]} {item[2]}
                                </a>
                            ))}
                        </div>
                        <a onClick={(e) => onClickEdit(e, reportFromTo[1])}
                           className="btn btn-outline-dark border-2 shadow-none" data-bs-toggle="modal" role="button">
                            Edit Leader(s)
                        </a>
                    </div>
                    <div className="page-section reports-control">
                        <div
                            className="title border-bottom">{"THE FOLLOWING TEAM MEMBERS REPORT TO " + membersName.toUpperCase() + ":"}</div>
                        <div className="team">
                            {reportFromTo[0] !== [] ? reportFromTo[0].map((item, index) => (
                                <a key={index} href="#" className="me-2 btn btn-dark shadow-none" placeholder={item[0]}>
                                    {item[1]} {item[2]}
                                </a>
                            )) : null}
                        </div>
                        <a onClick={(e) => onClickEdit(e, reportFromTo[0])}
                           className="btn btn-outline-dark border-2 shadow-none" data-bs-toggle="modal" role="button">
                            Edit Member(s)
                        </a>
                    </div>
                    <div className="page-section reports-control">
                        <div className="title border-bottom">{membersName.toUpperCase() + "'S INVITE LINK"}</div>
                        <p>{"Share the following link to invite team members on " + membersName + "'s behalf."}</p>
                        <form className="text-center">
                            <textarea disabled className="text-area col-md-6"
                                      defaultValue="https://www.figma.com/file/xs4FaSfzPijgSJ5R3aqrJBxs4FaSfzPijgSJ5R3aqrJBxs4FaSfzPijgSJ5R3aqrJBxs4FaSfzPijgSJ5R3aqrJB/Weekly-Report?node-id=5%3A20"/>
                            <div className="p-2">
                                <button type="button" className="btn btn-warning shadow-none">
                                    Copy Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showEdit && <EditModal title={currentTitle} teamMemberStore={modalData} setShowEdit={setShowEdit}/>}
        </>
    );
};
