import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Loading from '../components/Loading';
import Input from '../components/Input';
import SelectInputGoals from '../components/SelectInputGoals';
import Button from '../components/Button';
import Error from '../components/Error';
import UserGoals from '../components/UserGoals';
import _ from "lodash";
import SweetAlert from "sweetalert-react";
import { COLORS, FONTS } from "../config/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var moment = require("moment");
class DailyGoals extends Component {
  state = {
    users: [],
    tasks: [],
    active: {},
    isGoing: false,
    process: 0,
    loading: true,
    wrapperWidth: 'calc(100% - 16.7%)',
    task: '',
    taskDate: 'today',
    taskDateFormat: '',
    alertProps: { title: "Alert" },
    alertShow: false,
    errorMessage: "",
    showCustom: false,
    customDate: new Date(),
    isChecked: false
  };

  handleCollapse(e) {
    let wrapperWidth = 'calc(100% - 16.7%)';
    if (!e) wrapperWidth = 'calc(100% - 50px)';
    this.setState({ wrapperWidth });
  }

  componentWillMount() {
    this.allData()
  }

  async allData() {
    const { account } = this.props;
    const tasks = await Api.GetGoalsByDate(account.tokenAuth, { date: moment().format("YYYYMMDD") });
    const users = await Api.GetAllUser(account.tokenAuth);
    this.setState({ tasks, users, loading: false });
  }

  onSubmit(e) {
    e.preventDefault();
    if (e) e.preventDefault();
    const { taskDate } = this.state;
    let taskDateFormat = "";

    switch (taskDate.toLowerCase()) {
      case "today": {
        taskDateFormat = moment().format("YYYYMMDD");
        break;
      }
      case "tomorrow": {
        taskDateFormat = moment().add(1, "days").format("YYYYMMDD");
        break;
      }
      case "monday": {
        taskDateFormat = moment().startOf('isoWeek').add(1, 'week').format("YYYYMMDD");
        break;
      }
      case "custom": {
        taskDateFormat = moment(this.state.customDate).format("YYYYMMDD");
        break;
      }
    }
    const { task } = this.state;
    if (_.isEmpty(task)) return this.setState({ errorMessage: 'Task is required' });
    this.setState({ alertShow: true, alertProps: this.getSaveAlertProps(), taskDateFormat });
  }

  saveTask() {
    const { account } = this.props;
    const userId = account._id;
    const { task, taskDateFormat } = this.state;
    const data = { userId, task, taskDate: taskDateFormat };

    this.setState({ loading: true });
    Api.CreateGoal(account.tokenAuth, data).then(res => {
      if (res.status === 201) {
        const alertProps = this.getSuccessAlertProps(() => {
          this.setState({ alertShow: false });
        });
        this.setState({ alertProps, errorMessage: "", loading: false, alertShow: true, task: "" });
        this.allData();
      } else {
        this.setState({
          errorMessage: res.message,
          alertShow: false,
          loading: false,
        });
      }
    }).catch(err => {
      this.setState({
        errorMessage: err.message,
        loading: false
      });
    });
  }

  onChange(e) {
    let showCustom = false;
    const { name, value } = e.target;
    if (e.target.value.toLowerCase() === "custom") showCustom = true;
    this.setState({ [name]: value, errorMessage: "", showCustom });
  }

  fromChange(date) {
    this.setState({ taskDate: date });
  }

  showDeleteUserAlert(id) {
    const alertProps = this.getDeleteAlertProps(id);
    this.setState({ alertShow: true, alertProps });
  }

  deleteUser(_id) {
    const { account } = this.props;
    const closeProcess = errorMessage => this.setState({ alertShow: false, errorMessage });
    if (_id) {
      Api.LogicDeleteGoal(account.tokenAuth, { _id }).then(res => {
        if (res.status === 201) {
          this.setState({ alertProps: this.getSuccessDeleteAlertProps() });
          this.allData();
        } else closeProcess(res.message);
      }).catch(err => { if (err.message) closeProcess(err.message); });
    } else closeProcess("Error Id Required");
  }

  onChecked(e, _id) {
    console.log('Daily ', e.target.checked, _id)
    const { account } = this.props;
    const checked = e.target.checked;
    const data = { checked, _id };
    console.log('Data ', data);
    Api.UpdateGoal(account.tokenAuth, data)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          this.allData();
        }
      })
      .catch(err => {
        console.log(err.message)
      });

  }

  render() {
    const { account } = this.props;
    const { loading, wrapperWidth, alertShow, alertProps, showCustom, task, tasks, users, customDate, errorMessage } = this.state;
    let listUsers = [];
    if (Object.keys(users).length > 0) {
      const myUser = users.data.find(u => u._id === account._id);
      const myGoals = tasks.data.filter(t => t.userId === account._id);
      const myComponent = <UserGoals key={-1} data={myGoals} user={myUser} onDelete={this.showDeleteUserAlert.bind(this)} onChecked={this.onChecked.bind(this)} />;
      const usersGoals = users.data.map((x, i) => {
        let userGoals = tasks.data.filter(t => t.userId === x._id)
        if (userGoals.length > 0 && x._id !== account._id) return <UserGoals key={i} data={userGoals} user={x} />
      });

      listUsers = [myComponent, ...usersGoals]
    }

    let custom = showCustom ? <DatePicker style={styles.datepicker} selected={customDate} onChange={this.fromChange.bind(this)} /> : undefined;
    return (

      <Fragment>
        <Sidebar onCollapse={this.handleCollapse.bind(this)} />
        <Wrapper maxWidth={wrapperWidth} title="Daily Goals" hideLink>
          <div>
            <div className='goalsBox mb-3'>
              {listUsers}
            </div>
            <form className='formTask' onSubmit={e => this.onSubmit(e)} >
              <Input value={task} name='task' placeholder='Type in Your Goals' onChange={this.onChange.bind(this)} />
              <div className='mt-2 d-md-flex flex-md-row justify-content-md-end'>
                <div className='col-md-12 d-flex flex-row justify-content-end p-0'>
                  <div className='d-md-flex flex-md-row col-md-12 p-0'>
                    <div className="col-md-6 text-right">
                      <Error text={errorMessage} />
                    </div>
                    <div className="d-md-flex flex-md-row col-md-6">
                      {custom}
                      <SelectInputGoals onChange={this.onChange.bind(this)} name='taskDate' />
                      <Button text='Add Goal' filter />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <SweetAlert show={alertShow} {...alertProps} />
          <Loading
            show={loading}
            absolute
            backgroundClass="bg-gray"
            textColor="#020202"
            text="LOADING.."
          />
        </Wrapper>
      </Fragment>
    );
  }

  getSaveAlertProps() {
    return {
      title: "Create Task",
      text: "Are you sure to create the task?",
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.saveTask.bind(this),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  getSuccessAlertProps(onClick) {
    return {
      title: "Task Created",
      text: `The task has been created successfully`,
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: onClick.bind(this)
    };
  }

  getDeleteAlertProps(id) {
    return {
      title: "Delete Task",
      text: "Are you sure to delete the task?",
      showCancelButton: true,
      type: "info",
      confirmButtonColor: COLORS.Danger,
      onConfirm: this.deleteUser.bind(this, id),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  getSuccessDeleteAlertProps() {
    return {
      title: "Task Deleted",
      text: "The task has been deleted",
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: () => this.setState({ alertShow: false, loading: false })
    };
  }

}

const styles = {
  titleDate: {
    fontFamily: FONTS.RobotoLight,
    fontSize: 14,
    paddingLeft: 10
  },
  calendarOne: {
    top: 55,
    left: 10,
    width: '20px',
    height: '100%',
    position: "relative",
    zIndex: 1
  },
  datepicker: {
    zIndex: 2
  }
};

export default connect(s => ({ account: s.account }))(DailyGoals);
