import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import SelectInput from "./SelectInput";
import Button from "./Button";
import { connect } from "react-redux";
import Api from "../config/api";

class Collapse extends Component {
  state = {
    value: '',

  }

  async componentWillMount() {
    const { account } = this.props;
    const resProj = await Api.GetProjects(account.tokenAuth);
    const resPeople = await Api.GetPeople(account.tokenAuth);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('State ',this.state.value)

  }

  onChange(e){
    this.setState({value: e.target.value});
  }
  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit.bind(this)}>
          <p className="text-white ml-2" style={styles.titleDate}>
            Dates:
          </p>
          <div className="col-md-7 d-flex align-items-center ml-2">
            {/* <SelectInput onChange={this.handleChange} /> */}
            <div className="input-group">
                <select className="custom-select noBorder bg-secondary text-white" onChange={this.onChange.bind(this)}>
                    <option>today</option>
                    <option>yesterday</option>
                    <option>this month</option>
                    <option>last month</option>
                    <option>this year</option>
                    <option>last year</option>
                    <option>custom</option>
                </select>
            </div>
          </div>
          <hr />
          <p className="text-white ml-2" style={styles.titleDate}>
            Projects:
          </p>
          <hr />
          <p className="text-white ml-2" style={styles.titleDate}>
            Developers:
          </p>
          <hr />
          <div className="d-flex flex-row bg-info ml-2">
            <Button text="Apply" bigSize />
            <button type="button" className="btn btn-link">
              Clear
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const styles = {
  titleDate: {
    fontFamily: FONTS.RobotoLight,
    fontSize: 14,
    paddingLeft: 10
  }
};

export default connect(s => ({ account: s.account }))(Collapse);