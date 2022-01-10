import React from "react";
import { NavLink } from "react-router-dom";

export const Card = ({ store, number }) => {
    return (
        <div className={"row g-0 p-main " + (number === 1 || number === 3 ? "row-reverse" : null)}>
            <div className="col-md-6">
                <div className="card-body py-5">
                    <h5 className="card-title fw-bold ">{store.title}</h5>
                    <p className="card-text  fs-5">{store.text}</p>
                    {store.button && (
                        <NavLink to="/invite-your-team">
                            <button className="btn btn-warning fw-bold">{store.button}</button>
                        </NavLink>
                    )}
                </div>
            </div>
            <div className="col-md-6">
                <div className="card-body">
                    <img src={store.image} className="img-fluid rounded-start" alt="..." />
                </div>
            </div>
        </div>
    );
};
