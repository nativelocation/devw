import React, { Component } from "react";
//import EditableLabel from 'react-editable-label';
import EasyEdit from 'react-easy-edit';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

class UserGoals extends Component {
    state = {
        showPriorityBox: [],
        items: this.props.data,
        startDragIdx: 0,
		endDragIdx: 0
    }

    componentWillReceiveProps(nextProps) {
		const { user, account } = nextProps;
		user._id === account._id && this.setState({ items: nextProps.data });
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
    
    onSave = (id, newVal, cheked) => {
        const { onEdit } = this.props;
        if (onEdit) onEdit(id, newVal, cheked);
    }

    handleMoveCheckedGoals = () => {
		const { taskDate, customDate } = this.state;
		const { data, account } = this.props;
		let checkedIds = [];
		let order = [];
		let belowData = [];

		data.filter(e => {
			if (e.checked) {
				order = [...order, e.orderList];
				checkedIds = [...checkedIds, e._id];
			}
		});
		belowData = data.slice(order[0], data.length);
		if (checkedIds.length === 0) {
			this.setState({ loading: false });
			this.showNoMoveAlert();
			return;
		}
		let taskDateFormat = "";
		switch (taskDate.toLowerCase()) {
			case "today": {
				taskDateFormat = moment().format("YYYYMMDD");
				break;
			}
			case "yesterday": {
				taskDateFormat = moment()
					.subtract(1, "days")
					.format("YYYYMMDD");
				break;
			}
			case "tomorrow": {
				taskDateFormat = moment()
					.add(1, "days")
					.format("YYYYMMDD");
				break;
			}
			case "monday": {
				taskDateFormat = moment()
					.startOf("isoWeek")
					.add(1, "week")
					.format("YYYYMMDD");
				break;
			}
			case "custom": {
				taskDateFormat = moment(customDate).format("YYYYMMDD");
				break;
			}
			default:
				taskDateFormat = moment().format("YYYYMMDD");
				break;
		}
		let orderListData = [];
		let count = 0;
		belowData.map(data => {
			if (data.checked) {
				count++;
			} else {
				orderListData = [...orderListData, { _id: data._id, orderList: data.orderList - count }];
			}
		});
		const formData = { userId: account._id, ids: checkedIds, taskDate: taskDateFormat, orderListData: orderListData };

		this.showConfirmMoveAlert(account.tokenAuth, formData, taskDateFormat, taskDate, customDate);
	};
    
    onDragStart = (e, index) => {
		this.setState({ startDragIdx: index });
		this.draggedItem = this.state.items[index];
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/html", e.target.parentNode);
		e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    }
    
    onDragOver = index => {
		const draggedOverItem = this.state.items[index];

		// if the item is dragged over itself, ignore
		if (this.draggedItem === draggedOverItem) {
			return;
		}

		// filter out the currently dragged item
		let items = this.state.items.filter(item => item !== this.draggedItem);

		// add the dragged item after the dragged over item
		items.splice(index, 0, this.draggedItem);

        this.setState({ items, endDragIdx: index });
    }

    onDragEnd = () => {
        const { startDragIdx, endDragIdx, items } = this.state;
		let subArray = [];
		let data = [];
		if (startDragIdx > endDragIdx) {
			subArray = items.slice(endDragIdx, startDragIdx + 1);
			subArray.map((e, idx) => {
				data = [...data, { _id: e._id, orderList: idx + endDragIdx }];
			});
		} else if (startDragIdx < endDragIdx) {
			subArray = items.slice(startDragIdx, endDragIdx + 1);
			subArray.map((e, idx) => {
				data = [...data, { _id: e._id, orderList: idx + startDragIdx }];
			});
		} else {
			return;
		}
        const { account } = this.props;
        this.props.onChangePriority(data, account._id);
        this.draggedIdx = null;
        this.forceUpdate();
        // this.props.onChange
        
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
                                <div key={i} onDragOver={() => this.onDragOver(i)}>
                                    <div className="d-flex flex-row task-row" onDragStart={e => this.onDragStart(e, i)} onDragEnd={this.onDragEnd} draggable >
                                        {account._id === x.userId ? (
                                            <React.Fragment>
                                                <span className='mt-1 mr-2'>
                                                    <a href='javascript:;' className='nounderline text-dark'><Tooltip title="Move Task"><i className="fa fa-grip-horizontal" aria-hidden="true"></i></Tooltip></a>
                                                </span>
                                                <span className='mt-1 mr-2'>
                                                    <a href='javascript:;' onClick={() => this.onDelete(x._id)} className='nounderline text-dark'><Tooltip title="Delete Task"><i className="fa fa-trash-alt" aria-hidden="true"></i></Tooltip></a>
                                                </span>
                                                <div className="mt-1 mr-2">
                                                    <DatePicker
                                                        customInput={
                                                            <span>
                                                                <a href='javascript:;' className='nounderline text-dark'><Tooltip title="Change Date"><i className="fa fa-calendar-alt" aria-hidden="true"></i></Tooltip></a>
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
                                                { account._id === x.userId ?
                                                <Tooltip title="Click me to modify"><div><EasyEdit type="text" placeholder={x.task} onSave={val=>this.onSave(x._id, val, x.checked)} onValidate={() => true}/></div></Tooltip> :
                                                <label className="labelTask">{x.task}</label>}
                                        </div>
                                    </div>
                                </div> )
                        })}
                    </div>
                }
            </div>
        )
    }
};
export default connect(s => ({ account: s.account }))(UserGoals);