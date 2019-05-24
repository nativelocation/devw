import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Button from "../components/Button";
import { COLORS, FONTS } from "../config/constants";
import SelectInputGoals from "./SelectInputGoals";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import Api from "../config/api";
import SweetAlert from "sweetalert-react";
import "react-datepicker/dist/react-datepicker.css";

let moment = require("moment");

class UserGoals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCustom: false,
			customDate: new Date(),
			taskDate: "Today",
			checkedGoals: [],
			loading: false,
			alertShow: false,
			alertProps: { title: "Alert" },
			items: this.props.data,
			startDragIdx: 0,
			endDragIdx: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		const { user, account } = nextProps;
		user._id === account._id && this.setState({ items: nextProps.data });
	}

	onDelete(id, orderList) {
		const { onDelete } = this.props;
		if (onDelete) onDelete(id, orderList);
	}

	onChecked(e, id) {
		const { onChecked } = this.props;
		if (onChecked) onChecked(e, id);
	}

	fromChange(date) {
		this.setState({ customDate: date });
	}

	onChange(e) {
		let { showCustom } = this.state;
		const { name, value } = e.target;
		if (name === "taskDate") showCustom = e.target.value.toLowerCase() === "custom";
		this.setState({ [name]: value, errorMessage: "", showCustom });
	}

	showNoMoveAlert() {
		const alertProps = this.getNoMoveAlertProps();
		this.setState({ alertShow: true, alertProps });
	}

	getNoMoveAlertProps() {
		return {
			title: "No Goals to Move!",
			text: "Only checked goals can be moved.",
			showCancelButton: false,
			type: "info",
			confirmButtonColor: COLORS.Success,
			confirmButtonText: "I will check!",
			onConfirm: () => this.setState({ alertShow: false })
		};
	}

	showConfirmMoveAlert(tokenAuth, formData, taskDateFormat, taskDate, customDate) {
		const alertProps = this.getConfirmMoveAlertProps(tokenAuth, formData, taskDateFormat, taskDate, customDate);
		this.setState({ alertShow: true, alertProps: alertProps });
	}

	getConfirmMoveAlertProps(tokenAuth, formData, taskDateFormat, taskDate, customDate) {
		return {
			title: "Move Goals?",
			text: "Are you sure to move the checked goals to another day?",
			showCancelButton: true,
			type: "info",
			confirmButtonColor: COLORS.Success,
			confirmButtonText: "Move",
			onConfirm: () => {
				this.confirmMove(tokenAuth, formData, taskDateFormat, taskDate, customDate);
			},
			onCancel: () => this.setState({ loading: false, alertShow: false })
		};
	}

	getSuccessAlertProps(onClick) {
		return {
			title: "Success!",
			text: `Checked goals have been moved successfully`,
			type: "success",
			confirmButtonColor: COLORS.Success,
			onConfirm: onClick.bind(this)
		};
	}

	confirmMove(tokenAuth, formData, taskDateFormat, taskDate, customDate) {
		this.setState({ alertShow: false, loading: true });
		const closeProcess = errorMessage => this.setState({ loading: false, alertShow: false, errorMessage });
		setTimeout(async () => {
			await Api.UpdateGoalDate(tokenAuth, formData)
				.then(res => {
					if (res.status === 201) {
						this.setState({ alertShow: true, loading: false });
						this.props.onUpdateGoals(taskDateFormat, taskDate, customDate);
						const alertProps = this.getSuccessAlertProps(() => {
							this.setState({ alertShow: false });
						});
						this.setState({ alertProps, errorMessage: "" });
					} else {
						closeProcess(res.message);
					}
				})
				.catch(err => {
					if (err.message) closeProcess(err.message);
				});
		}, 500);
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
	};

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
	};

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
	};

	render() {
		const { data, user, account } = this.props;
		const { taskDate, showCustom, customDate, loading, alertShow, alertProps, items } = this.state;
		return (
			<Fragment>
				{user._id === account._id && (
					<React.Fragment>
						<div className='d-flex flex-column pl-2 checkedBox order-0'>
							<p>{`${user.firstName} ${user.lastName}`}</p>
							{items && items.length <= 0 ? (
								<span className='text-muted'>You don't have any task yet.</span>
							) : (
								<div className='pl-2'>
									{items.map((x, i) => {
										return (
											<div key={i} onDragOver={() => this.onDragOver(i)}>
												<div
													className={`d-flex flex-row`}
													onDragStart={e => this.onDragStart(e, i)}
													onDragEnd={this.onDragEnd}
													draggable
												>
													<span className='mr-2'>
														<a
															href='javascript:;'
															onClick={() => this.onDelete(x._id, x.orderList)}
															className='nounderline text-dark'
														>
															<i className='fa fa-trash-alt' aria-hidden='true' />
														</a>
													</span>
													<div className='form-check py-1'>
														<label className='form-check-label'>
															<input
																type='checkbox'
																className='form-check-input'
																checked={x.checked}
																onChange={e => this.onChecked(e, x._id)}
															/>
															{x.task}
														</label>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
						{items && items.length > 0 && (
							<div className='d-md-flex flex-md-row col-md-12 p-0'>
								<div className='col-md-1 text-left'>
									<label style={{ marginTop: 5 }}>Move&nbsp;to&nbsp;:</label>
								</div>
								<div className='col-md-2 col-sm-3 text-right'>
									<SelectInputGoals
										style={{ fontSize: 13 }}
										value={taskDate}
										onChange={this.onChange.bind(this)}
										name='taskDate'
									/>
								</div>
								{showCustom && (
									<div className='col-md-2 col-sm-3 text-center'>
										<DatePicker
											style={styles.datepicker}
											selected={customDate}
											onChange={this.fromChange.bind(this)}
											customInput={
												<input
													style={{ width: "100%", textAlign: "center", fontSize: "14px" }}
												/>
											}
										/>
									</div>
								)}
								<div className='col-md-3 col-sm-4'>
									<Button text='Move checked goals' filter onClick={this.handleMoveCheckedGoals} />
								</div>
							</div>
						)}
					</React.Fragment>
				)}
				{user._id !== account._id && (
					<div className='d-flex flex-column pl-2 checkedBox'>
						<p>{`${user.firstName} ${user.lastName}`}</p>
						{data && data.length <= 0 ? (
							<span className='text-muted'>You don't have any task yet.</span>
						) : (
							<div className='pl-2'>
								{data.map((x, i) => {
									return (
										<div className={`d-flex flex-row`} key={i}>
											<div className='form-check py-1'>
												<label className='form-check-label'>
													<input
														type='checkbox'
														className='form-check-input'
														checked={x.checked}
														readOnly
													/>
													{x.task}
												</label>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}

				{/* <Dnd /> */}
				<SweetAlert show={alertShow} {...alertProps} />
				<Loading show={loading} absolute backgroundClass='bg-gray' textColor='#020202' text='LOADING..' />
			</Fragment>
		);
	}
}

const styles = {
	titleDate: {
		fontFamily: FONTS.RobotoLight,
		fontSize: 14,
		paddingLeft: 10
	},
	selectinputgoals: {
		fontSize: 14
	},
	calendarOne: {
		top: 55,
		left: 10,
		width: "20px",
		height: "100%",
		position: "relative",
		zIndex: 1
	},
	datepicker: {
		width: "100%",
		zIndex: 2
	}
};

export default connect(s => ({ account: s.account }))(UserGoals);
