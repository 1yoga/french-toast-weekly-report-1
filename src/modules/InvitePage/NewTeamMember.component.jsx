import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { Header } from "../common/Header/Header.component";
import React, { useContext } from "react";
import { Form, Formik } from "formik";
import { linkToObject } from "../common/Utiles/function";
import { Loader } from "../common/Loader/Loader.component";
import { useAuth0 } from "@auth0/auth0-react";
import { createNewTeamMember } from "./NewTeamMember.service";
import { Context } from "../app/App.component";
import { useHistory } from "react-router-dom";
import { TextInput } from "../common/Formik/textInput.component";

export const NewTeamMember = () => {
    let history = useHistory();
    const { setCreateNewMember } = useContext(Context);
    const { user } = useAuth0();
    const newMember = sessionStorage.getItem("href");
    const obj = linkToObject(newMember);

    const onSubmit = async (values, { setSubmitting }) => {
        await createNewTeamMember(values, obj.teamMemberTo);
        await setCreateNewMember(true);
        history.push("/");
        setSubmitting(false);
    };

    if (!obj || !user) {
        return <Loader />;
    }

    return (
        <div>
            <HelmetComponent title="Weekly Team Report" />
            <Header>
                <div>
                    <h1 className="header-title">Weekly Team Report</h1>
                </div>
            </Header>
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <div className="row mt-5">
                        <Formik
                            initialValues={{
                                FirstName: obj.FirstName,
                                LastName: obj.LastName,
                                Title: "",
                                Mail: user.email,
                                Subject: user.sub,
                                CompanyId: obj.companyId,
                            }}
                            onSubmit={onSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="card">
                                        <div className="card-body">
                                            <TextInput label="First Name" name="FirstName" type="text" placeholder="" />
                                            <TextInput label="Last Name" name="LastName" type="text" placeholder="" />
                                            <TextInput label="Title" name="Title" type="text" placeholder="" />
                                            <div className="form-group">
                                                <button className="btn btn-warning shadow-none" type="submit" disabled={isSubmitting}>
                                                    Continue
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
        </div>
    );
};
