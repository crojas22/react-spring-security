import React from 'react';

export const JustifyContentCenter = props => (
    <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 px-1 py-5">
                {
                    props.children
                }
            </div>
        </div>
    </div>
);

export const FormRowCol = props => (
    <div className="form-row">
        <div className="form-group col">
            {
                props.children
            }
        </div>
    </div>
);