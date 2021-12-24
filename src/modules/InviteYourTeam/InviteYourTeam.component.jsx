import React, {useContext, useEffect, useState} from "react";
import {Success} from "./Succsess.component";
import {Header} from "../common/Header/Header.component";
import {HelmetComponent} from "../common/Helmet/Helmet.component";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Context} from "../app/App.component";
import {createLink} from "../common/util/function";

export const InviteYourTeam = () => {
    const {currentUser} = useContext(Context);

    const [success, setSuccess] = useState(false);
    const [inviteLink, setInviteLink] = useState(null)

    useEffect(async () => {
        if(inviteLink) {
            console.log(inviteLink)
        }
    }, [inviteLink]);



    const onSubmit = async (values, {setSubmitting}) => {
        setSuccess(true);
        await setInviteLink("http://localhost:3000/invite?" + (createLink(values)))
        setSubmitting(false);
    }
    return (
        <>
            <HelmetComponent title="Invite Your Team"/>
            <Header>
                <h1>Invite Your Team</h1>
            </Header>
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    {success && <Success/>}
                    <div className="row mt-5">
                        <Formik
                            initialValues={{
                                FirstName: '',
                                LastName: '',
                                Mail: '',
                                companyId: currentUser.companyId,
                                teamMemberTo: currentUser.teamMemberId
                            }}
                            onSubmit={onSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title">Enter the team member you'd like to invite</h6>
                                            <p>Don't worry! You'll be able to add more team members later.</p>
                                            <div className="form-group">
                                                <label htmlFor="FirstName" className="form-label">
                                                    First Name
                                                </label>
                                                <Field className="form-control border-2 shadow-none" type="text"
                                                       name="FirstName"/>
                                                <ErrorMessage name="FirstName" component="div"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="LastName" className="form-label">
                                                    Last Name
                                                </label>
                                                <Field className="form-control border-2 shadow-none" type="text"
                                                       name="LastName"/>
                                                <ErrorMessage name="LastName" component="div"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="mail" className="form-label">
                                                    Email
                                                </label>
                                                <Field className="form-control border-2 shadow-none" type="email"
                                                       name="Mail"/>
                                                <ErrorMessage name="Mail" component="div"/>
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    className="btn btn-warning shadow-none"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >Invite
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};
