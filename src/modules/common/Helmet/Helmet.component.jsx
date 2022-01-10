import { Helmet } from "react-helmet";
import React from "react";

export const HelmetComponent = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};
