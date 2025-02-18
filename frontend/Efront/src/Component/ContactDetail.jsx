import React from "react";

const ContactDetails = () => {
    return (
        <div className="mb-4 border-bottom pb-3">
            <h3 className="mb-3">Contact Details</h3>
            <input type="email" className="form-control mb-3" placeholder="Email" />
            <div className="row g-3">
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Country Code" />
                </div>
                <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="Mobile Number" />
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;