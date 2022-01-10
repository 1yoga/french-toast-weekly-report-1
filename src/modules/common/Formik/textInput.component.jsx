import { useField } from "formik";
import React from "react";

export const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={props.id || props.name}>
                {label}
            </label>
            <input className="form-control border-2 shadow-none" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
};
