import React from 'react';
import moment from 'moment';
import { BtnInput } from "../reusable/Buttons";
import GoTriangleDown from "react-icons/lib/go/triangle-down";
import GoTriangleUp from "react-icons/lib/go/triangle-up";

class Event extends React.Component {
    state = {
        active: false
    };

    changeState = (name, target) => this.setState({ [ name ] : target });

    render() {
        return(
            <div>
                <BtnInput onClick={() => this.changeState("active", !this.state.active)}
                          title={this.state.active ? <GoTriangleUp/> : <GoTriangleDown/>}
                          classes={"py-0 rounded-0 border-0 btn-block"}/>
                <div className={"" + (this.state.active ? "" : "collapse")}>
                    <div className="d-flex">
                        <BtnInput title="Edit" classes="btn-primary border-0 btn-block"/>
                        <BtnInput title="Complete" classes="btn-primary border-0 btn-block m-0"/>
                        <BtnInput title="Delete" classes="btn-danger border-0 btn-block m-0"/>
                    </div>
                </div>
                <small className='text-muted mr-3'>Start:
                    {
                        moment(this.props.startTime, "hh:mm").format("hh:mm a")
                    }
                </small>
                <small className="text-muted">End:
                    {
                        moment(this.props.endTime, "hh:mm").format("hh:mm a")
                    }
                </small>
                <p className="m-0">
                    {
                        this.props.text
                    }
                </p>
            </div>
        )
    }
}

export default Event;