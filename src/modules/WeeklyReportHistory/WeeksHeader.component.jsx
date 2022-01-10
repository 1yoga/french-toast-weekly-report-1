import React from "react";

export const WeeksHeader = ({ align, children }) => {
    return <div className={`weeks d-flex align-items-center justify-content-${align} mb-1 mr-4`}>{children}</div>;
};
