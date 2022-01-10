import React from "react";
import img1 from "../../img/smiles/smile_bad.png";
import img2 from "../../img/smiles/smile_ducked_up.png";
import img3 from "../../img/smiles/smile_sad.png";
import img4 from "../../img/smiles/smile_alright.png";
import img5 from "../../img/smiles/smile_excelent.png";
import img0 from "../../img/smiles/smile_is_absent.png";
import Accordion from "react-bootstrap/Accordion";

export const FilledCard = (reportData, index) => {
    const imgArray = [img0, img1, img2, img3, img4, img5];
    const titleArray = ["Nothing", "VeryLow", "Low", "Okay", "Good", "Great"];
    //TODO разобраться с reportData.reportData
    return (
        <Accordion.Item className="p-0" eventKey={index}>
            <Accordion.Header>
                {reportData.reportData.firstName === null ? (
                    <div className="row w-100">
                        <div className="col-7 mt-3 me-4">{reportData.reportData.dateFrom + " - " + reportData.reportData.dateTo}</div>
                        <div className="col-1 ms-1">
                            <img alt="smile" className="smile-icon" src={imgArray[reportData.reportData.moraleValueId]} />
                        </div>
                        <div className="col-1 ms-2">
                            <img alt="smile" className="smile-icon" src={imgArray[reportData.reportData.stressValueId]} />
                        </div>
                        <div className="col-1 ms-3">
                            <img alt="smile" className="smile-icon" src={imgArray[reportData.reportData.workloadValueId]} />
                        </div>
                    </div>
                ) : (
                    <div className="row w-100">
                        <div className="col-1 p-0">
                            <div className="round p-3 rounded-circle">{reportData.reportData.firstName.substr(0, 1) + reportData.reportData.lastName.substr(0, 1)}</div>
                        </div>
                        <div className="col-6 mt-3 me-4">
                            <div className="name-team-report">{reportData.reportData.firstName + " " + reportData.reportData.lastName}</div>
                        </div>
                        <div className="col-1 ms-2 pt-1">
                            <img alt="smile" className="smile-icon" src={imgArray[reportData.reportData.moraleValueId]} />
                        </div>
                        <div className="col-1 ms-2 pt-1">
                            <img alt="smile" className="smile-icon" src={imgArray[reportData.reportData.stressValueId]} />
                        </div>
                        <div className="col-1 ms-3 pt-1">
                            <img alt="smile" className="smile-icon" src={imgArray[reportData.reportData.workloadValueId]} />
                        </div>
                    </div>
                )}
            </Accordion.Header>
            <Accordion.Body className="text-start">
                <div className="param d-flex align-items-start mb-2">
                    <div className="button-wrapper mr-3">
                        <img className="smile-icon" src={imgArray[reportData.reportData.moraleValueId]} alt="smile morale" />
                        <button className={"param-button button-" + titleArray[reportData.reportData.moraleValueId] + " btn text-left"} type="button">
                            MORALE
                        </button>
                    </div>
                    <div className="comment ms-4">
                        <i className="text-secondary">{reportData.reportData.moraleComment}</i>
                    </div>
                </div>
                <div className="param d-flex align-items-start mb-2">
                    <div className="button-wrapper mr-3">
                        <img className="smile-icon" src={imgArray[reportData.reportData.stressValueId]} alt="smile morale" />
                        <button className={"param-button button-" + titleArray[reportData.reportData.stressValueId] + " btn text-left"} type="button">
                            STRESS
                        </button>
                    </div>
                    <div className="comment ms-4">
                        <i className="text-secondary">{reportData.reportData.stressComment}</i>
                    </div>
                </div>
                <div className="param d-flex align-items-start mb-2">
                    <div className="button-wrapper mr-3">
                        <img className="smile-icon" src={imgArray[reportData.reportData.workloadValueId]} alt="smile morale" />
                        <button className={"param-button button-" + titleArray[reportData.reportData.workloadValueId] + " btn text-left"} type="button">
                            WORKLOAD
                        </button>
                    </div>
                    <div className="comment ms-4">
                        <i className="text-secondary">{reportData.reportData.workloadComment}</i>
                    </div>
                </div>
                <h5 className="pt-4">Weekly High</h5>
                <p className="pb-2">{reportData.reportData.weekHighComment}</p>
                <h5>Weekly Low</h5>
                <p className="pb-2">{reportData.reportData.weekLowComment}</p>
                <h5>Anything Else</h5>
                <p className="pb-2">{reportData.reportData.anythingElseComment}</p>
            </Accordion.Body>
        </Accordion.Item>
    );
};
export const NotFilledCard = (reportData) => {
    return (
        <div className="p-2">
            <div className="d-flex text-start">
                <div className="round p-3 rounded-circle">{reportData.reportData.firstName.substr(0, 1) + reportData.reportData.lastName.substr(0, 1)}</div>
                <div className="ms-3 my-1">
                    <div className="name-team-report">{reportData.reportData.firstName + " " + reportData.reportData.lastName}</div>
                    <div className="color-gray">is missing a report</div>
                </div>
            </div>
        </div>
    );
};

export const MyReportsCard = (reportData, key) => {
    return (
        <Accordion className="shadow-sm rounded mt-2 bg-white" defaultActiveKey="0">
            {reportData.reportData.dateTo ? <FilledCard reportData={reportData.reportData} index={key} /> : <NotFilledCard reportData={reportData.reportData} />}
        </Accordion>
    );
};
