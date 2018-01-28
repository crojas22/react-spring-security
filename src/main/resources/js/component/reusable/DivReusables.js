import React from 'react';

export const JustifyContentCenter = props => (
    <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-9 col-md-7 col-lg-6 px-2 py-5 max-width">
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