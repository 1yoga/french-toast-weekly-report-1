import React, { useContext, useState } from "react";
import { Success } from "./Succsess.component";
import { Header } from "../common/Header/Header.component";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { Form, Formik } from "formik";
import { Context } from "../app/App.component";
import { createLink, baseUrl } from "../common/Utiles/function";
import { TextInput } from "../common/Formik/textInput.component";
import * as Yup from "yup";
import { api } from "../api/api.service";
import { Message } from "../common/Message/Message.component";
import { CSSTransition } from "react-transition-group";

export const InviteYourTeam = () => {
    const { currentUser } = useContext(Context);
    const [success, setSuccess] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        const inviteLink = baseUrl + "/invite?" + createLink(values);
        await api
            .post("invite", {
                email: values.Mail,
                inviteLink: inviteLink,
                userName: `${values.FirstName} ${values.LastName}`,
                companyName: currentUser.companyName,
            })
            .then(() => {
                setSuccess(true);
                setSubmitting(false);
                resetForm();
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 4000);
            });
    };
    return (
        <>
            <CSSTransition in={showMessage} classNames="message" timeout={300} unmountOnExit>
                <Message text="Success! You have invited a new member!" />
            </CSSTransition>
            <HelmetComponent title="Invite Your Team" />
            <Header>
                <h1>Invite Your Team</h1>
            </Header>
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    {success && <Success />}
                    <div className="row mt-5">
                        <Formik
                            initialValues={{
                                FirstName: "",
                                LastName: "",
                                Mail: "",
                                companyId: currentUser.companyId,
                                teamMemberTo: currentUser.teamMemberId,
                            }}
                            validationSchema={Yup.object({
                                FirstName: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
                                LastName: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
                                Mail: Yup.string().email("Invalid email").required("Required"),
                            })}
                            onSubmit={onSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title">Enter the team member you'd like to invite</h6>
                                            <p>Don't worry! You'll be able to add more team members later.</p>
                                            <TextInput label="First Name" name="FirstName" type="text" placeholder="" />
                                            <TextInput label="Last Name" name="LastName" type="text" placeholder="" />
                                            <TextInput label="Email" name="Mail" type="email" placeholder="" />
                                            <div className="form-group">
                                                <button className="btn btn-warning shadow-none" type="submit" disabled={isSubmitting}>
                                                    Invite
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
