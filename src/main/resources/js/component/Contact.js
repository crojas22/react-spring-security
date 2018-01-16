import React from "react";
import { connect } from "react-redux";
import { getUserInfoAction } from "../actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import MdAdd from "react-icons/lib/md/add";
import MdRemove from "react-icons/lib/md/remove";
import { BtnInput } from "./reusable/Buttons";
import ContactForm from "./contact/ContactForm";

class Contact extends React.Component {
    state = {
        addingContact: false
    };

    componentWillMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    changeState = (name, target) => this.setState({ [ name ] : target });

    renderAlphabetical = () => {
        const array = [];
        let counter = 65;
        while (counter < 91) {
            array.push(<li className="list-item">{ String.fromCharCode(counter) }</li>);
            counter++
        }
        return array;
    };

    render() {
        let { addingContact } = this.state;

        return(
            <div className="contact container">
                <div className="row justify-content-center">
                    <div className="col-sm-8 px-1 py-5">
                        <div>
                            <div className="col-auto">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <label htmlFor="search" className="input-group-text">@</label>
                                    </div>
                                    <input type="text" id="search" className="form-control" placeholder="Search"/>
                                </div>
                            </div>
                            <div>
                                <BtnInput title={addingContact ? <MdRemove size={24}/>:<MdAdd size={24}/>}
                                          classes={"btn-outline-" + (addingContact ? "danger":"primary")}
                                          onClick={() => this.changeState("addingContact", !addingContact)}/>
                            </div>
                            {
                                addingContact ? <ContactForm
                                    toggleContactForm={() => this.changeState("addingContact", !addingContact)}/> : null
                            }
                            <div>
                                <ul className="list-group py-3">
                                    {
                                        this.renderAlphabetical()
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUserInfoAction
    }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact));