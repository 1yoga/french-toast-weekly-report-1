import React, { useContext } from "react";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { Header } from "../common/Header/Header.component";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../common/Formik/textInput.component";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { Context } from "../app/App.component";
import { addNewCompanyAndTeamMember } from "./MyCompany.service";

export const NewCompany = () => {
    const { setCreateNewCompany } = useContext(Context);
    let history = useHistory();
    const { user, logout } = useAuth0();

    const onSubmit = async (values, { setSubmitting }) => {
        await addNewCompanyAndTeamMember(values, user);
        await setCreateNewCompany(true);
        setSubmitting(false);
        history.push("/");
    };
    return (
        <>
            <HelmetComponent title="New Company" />
            <Header>
                <div>
                    <h1 className="header-title">New Company</h1>
                </div>
            </Header>
            <div className="new-company container p-5 align-content-center">
                <div className="col-md-12 p-0">
                    <div className="page-title border-bottom">
                        <h2>Registration form</h2>
                        <p>Register your company to be able to track your team's reports</p>
                    </div>
                    <div className="page-section">
                        <Formik
                            initialValues={{
                                companyName: "",
                                firstName: "",
                                lastName: "",
                            }}
                            validationSchema={Yup.object({
                                companyName: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
                                firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
                                lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
                            })}
                            onSubmit={onSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="col-md-4">
                                    <TextInput label="Enter your Company Name" name="companyName" type="text" placeholder="" />
                                    <TextInput label="Enter your First Name" name="firstName" type="text" placeholder="" />
                                    <TextInput label="Enter your Last Name" name="lastName" type="text" placeholder="" />
                                    <div className="form-group">
                                        <button disabled={isSubmitting} type="submit" className="btn btn-outline-dark border-2 shadow-none">
                                            Register Your Company
                                        </button>
                                        <button onClick={() => logout({ returnTo: window.location.origin })} className="ms-3 btn btn-outline-dark border-2 shadow-none">
                                            Sign Out
                                        </button>
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

export default NewCompany;
