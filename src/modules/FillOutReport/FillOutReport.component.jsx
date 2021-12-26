import React, { useState, useContext } from "react";
import { FillOutReportHeader } from "./FillOutReport.Header.component";
import { FillOutCard } from "./FillOutReport.Card.component";
import { DateRangePicker } from "rsuite";
import { HelmetComponent } from "../common/Helmet/Helmet.component";
import { ErrorMessage, Field, Form, Formik } from "formik";
import createWeeklyReport from "./FillOutReport.service";
import * as Yup from "yup";
import { Context } from "../app/App.component";

export const FillOutReport = () => {
    const [sendError, setSendError] = useState(false);
    const { currentUser } = useContext(Context);

    const SendError = () => <p className="text-danger fw-bold">All fields are required unless marked as optional.</p>;

    function sendReport() {
        setSendError(false);
        const requiredFields = document.getElementsByClassName("req");
        for (let i = 0; i < requiredFields.length; i++) {
            if (requiredFields[i].value === "") {
                setSendError(true);
            }
        }
        const dateRange = document.querySelector('#dateRange');
        if (dateRange.value === "") {
            setSendError(true);
        }
    }

    function resetFormFull(resetForm) {
        resetForm();
        ["MoraleValue", "StressValue", "WorkloadValue"].forEach(el => {
            document.querySelector("[name="+ el + "]")?.click();    
        })
        document.querySelector('[aria-label=Clear]').click();
    }

    const onSubmit = (values, { resetForm }) => {
        values.MoraleValueId = document.querySelector("[name=MoraleValue")?.getAttribute("id") ?? 0;
        values.StressValueId = document.querySelector("[name=StressValue")?.getAttribute("id") ?? 0;
        values.WorkloadValueId = document.querySelector("[name=WorkloadValue")?.getAttribute("id") ?? 0;
        [values.DateFrom, values.DateTo] = document.querySelector('input#dateRange').value.split(' ~ ');
        if (!sendError) {
            console.log(values);
            createWeeklyReport(values, currentUser.companyId, currentUser.teamMemberId).then(response => console.log(response));
        }
        resetFormFull(resetForm);
    }

    return (
        <>
            <HelmetComponent title="Fill Out Report" />
            <div className={"text-center"}>
                <FillOutReportHeader userName={currentUser.firstName}/>

                <Formik
                    initialValues={{
                        MoraleValueId: "",
                        StressValueId: "",
                        WorkloadValueId: "",
                        MoraleComment: "",
                        StressComment: "",
                        WorkloadComment: "",
                        WeekHighComment: "",
                        WeekLowComment: "",
                        AnythingElseComment: "",
                        DateFrom: "",
                        DateTo: "",
                        TeamMemberId: currentUser.teamMemberId
                    }}
                    validationSchema={Yup.object({
                        MoraleComment: Yup.string().max(600, 'Must be 600 characters or less'),
                        StressComment: Yup.string().max(600, 'Must be 600 characters or less'),
                        WorkloadComment: Yup.string().max(600, 'Must be 600 characters or less'),
                        WeekHighComment: Yup.string().max(600, 'Must be 600 characters or less'),
                        WeekLowComment: Yup.string().max(600, 'Must be 600 characters or less'),
                        AnythingElseComment: Yup.string().max(400, 'Must be 400 characters or less')
                    })}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <FillOutCard name="Morale" />
                        <FillOutCard name="Stress" />
                        <FillOutCard name="Workload" />

                        <h3 className={"fw-bold m-auto mt-5"}>What was your high this week?</h3>
                        <Field as="textarea" className="w-75 m-auto mt-3 form-control req" rows="5" placeholder="What was your personal or professional high this week? What's the one thing you accomplished at work this week?" name="WeekHighComment" />
                        <ErrorMessage name="WeekHighComment" component="div" />
                        <h3 className={"fw-bold m-auto mt-5"}>What was your low this week?</h3>
                        <Field as="textarea" className="w-75 m-auto mt-3 form-control req" rows="5" placeholder="What was your personal or professional low this week?" name="WeekLowComment" />
                        <ErrorMessage name="WeekLowComment" component="div" />
                        <h3 className={"fw-bold m-auto mt-5"}>Anything else?</h3>
                        <Field as="textarea" className="w-75 m-auto mt-3 form-control" rows="5" maxLength="400" placeholder="Is there anything else you would like to share with your leader? *Optional" name="AnythingElseComment" />
                        <ErrorMessage name="AnythingElseComment" component="div" />

                        <div className="w-50 m-auto mb-4 mt-5">
                            <p className="text-start mb-1">Choose date</p>
                            <DateRangePicker id="dateRange" name="dateRange" oneTap showOneCalendar hoverRange="week" isoWeek={true} ranges={[]} />
                        </div>

                        {sendError ? <SendError /> : null}
                        <button type="submit" className="btn btn-secondary fw-bold w-50 mb-5" onClick={sendReport}>
                            Send Weekly Report
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );
};
