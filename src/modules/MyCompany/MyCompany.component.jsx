import { NavLink } from "react-router-dom";
import React, { useState, useContext } from "react";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { Header } from "../common/Header/Header.component";
import { Form, Formik } from "formik";
import { changeNameCompany } from "./MyCompany.service";
import { Context } from "../app/App.component";
import { getJoinDate } from "../common/Utiles/function";
import { TextInput } from "../common/Formik/textInput.component";
import { Message } from "../common/Message/Message.component";
import { CSSTransition } from "react-transition-group";

export const MyCompany = () => {
    const [showMessage, setShowMessage] = useState(false);

    const { currentUser, setUpdateCompany } = useContext(Context);

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        await changeNameCompany(currentUser.companyId, values.companyName);
        setUpdateCompany(true);
        setSubmitting(false);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 4000);
        resetForm();
    };
    const dateTitle = getJoinDate(currentUser.joinDate);

    return (
        <>
            <CSSTransition in={showMessage} classNames="message" timeout={300} unmountOnExit>
                <Message text="Success! You have renamed the company!" />
            </CSSTransition>
            <HelmetComponent title="My Company" />
            <Header>
                <div>
                    <h1 className="header-title">{currentUser.companyName}</h1>
                    <span className="header-subtitle">{dateTitle}</span>
                </div>
            </Header>
            <div className="container justify-content-md-center p-5">
                <div className="col-md-12 p-0">
                    <div className="page-title">
                        <h2>Edit {currentUser.companyName}'s Information</h2>
                        <p>You may edit the company name, as well as deactivate/activate the Weekly Report Tool functionality. If you need to edit a team member's information, you can access that information by seeing the list of team members.</p>
                    </div>
                    <div className="page-section">
                        <div className="title border-bottom">RENAME {currentUser.companyName.toUpperCase()}</div>
                        <Formik initialValues={{ companyName: "" }} onSubmit={onSubmit}>
                            {({ isSubmitting }) => (
                                <Form className="col-md-4">
                                    <TextInput label="Change company name" name="companyName" type="text" placeholder="" />
                                    <div className="form-group">
                                        <button disabled={isSubmitting} type="submit" className="btn btn-outline-dark border-2 shadow-none">
                                            Save name change
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="page-section">
                        <div className="title border-bottom">SEE A LIST OF {currentUser.companyName.toUpperCase()}'S TEAM MEMBERS</div>
                        <p className="page-text">
                            If you need to edit a particular team member, you can see a complete list of team members and visit their profile to make edits. <strong>You will not be able to see a team member's weekly report.</strong>
                        </p>
                        <NavLink to="/team-members" className="btn btn-outline-dark border-2 shadow-none">
                            See All Team Members
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};
