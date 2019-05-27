import React, { Component } from "react";
import EdiText from 'react-editext';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

class UserGoals extends Component {
    state = {
        showPriorityBox: [],
    }

    onDelete(id) {
        const { onDelete } = this.props;
        if (onDelete) onDelete(id);
    }

    changeGoalData(id, data) {
        const { changeGoalData } = this.props;
        if (changeGoalData) changeGoalData(id, data);
    }
    
    onChecked(e, id) {
        const { onChecked } = this.props;
        if (onChecked) onChecked(e, id)
    }

    onShowPriorityBox = (index, status) => {
        const { showPriorityBox: newV } = this.state;
        newV[index] = status;
        this.setState({ showPriorityBox: newV });
    }
    
    onSave = (id, newVal) => {
        console.log('Edited Value -> ', newVal);
        const { onEdit } = this.props;
        if (onEdit) onEdit(id,newVal);
      }
    render() {
        const { data, user, account } = this.props;
        const { showPriorityBox } = this.state;
        return (
            <div className={`d-flex flex-column pl-2 checkedBox ${account._id === user._id ? 'order-0' : ''}`}>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                {data && data.length <= 0 ? <span className='text-muted'>You don't have any task yet.</span> :
                    <div className='pl-2'>
                        {data.map((x, i) => {
                            return (
                                <div className="d-flex flex-row" key={i}>
                                    {account._id === x.userId ? (
                                        <React.Fragment>
                                            <span className='mt-1 mr-2'>
                                                <a href='javascript:;' onClick={() => this.onDelete(x._id)} className='nounderline text-dark'><Tooltip title="Delete Task"><i className="fa fa-trash-alt" aria-hidden="true"></i></Tooltip></a>
                                            </span>
                                            <div className="mt-1 mr-2">
                                                <DatePicker
                                                    customInput={
                                                        <span>
                                                            <a href='javascript:;' className='nounderline text-dark'><Tooltip title="Move Task"><i className="fa fa-calendar-alt" aria-hidden="true"></i></Tooltip></a>
                                                        </span>
                                                    }
                                                    onChange={(date) => this.changeGoalData(x._id, { checked: x.checked, taskDate: moment(date).format('YYYYMMDD') })} />
                                            </div>
                                            <div className="mt-1 mr-2">
                                                <span>
                                                    <a href='javascript:;' onClick={() => this.onShowPriorityBox(i, true)} className='nounderline text-dark'><Tooltip title="Choose Priority"><i className="fa fa-fire-extinguisher"></i></Tooltip></a>
                                                </span>
                                                {showPriorityBox[i] &&
                                                    <React.Fragment>
                                                        <select className="prioritybox-selector" value={x.priority} onChange={(e) => this.changeGoalData(x._id, { checked: x.checked, priority: e.target.value })}>
                                                            <option default value="">&nbsp;</option>
                                                            <option value="low">Low</option>
                                                            <option value="high">High</option>
                                                            <option value="urgent">Urgent</option>
                                                        </select>
                                                        <div className="prioritybox-wrapper" onClick={() => this.onShowPriorityBox(i, false)}></div>
                                                    </React.Fragment>
                                                }
                                            </div>
                                        </React.Fragment>
                                    ) : undefined}
                                    <div className="newTask">
                                    {x.priority &&
                                            <span className={`priority ${x.priority}`}>
                                                {x.priority}
                                            </span>
                                        }
                                        {account._id !== user._id  && x.priority ?
                                            <input type="checkbox" className="form-check-input" checked={x.checked} readOnly /> :
                                            <input type="checkbox" className="form-check-input" checked={x.checked} onChange={e => this.onChecked(e, x._id)} />}
                                            {account._id === x.userId ?
                                            <EdiText type='text' value={x.task} onSave={val=>this.onSave(x._id,val)}/>:
                                            <p>{x.task}</p>}
                                    </div>
                                </div>)
                        })}
                    </div>
                }
            </div>

        )
    }
};
export default connect(s => ({ account: s.account }))(UserGoals);