import React, { Component } from "react";
import { connect } from "react-redux";

class UserGoals extends Component {
    onDelete(id) {
        const { onDelete } = this.props;
        if (onDelete) onDelete(id);
    }

    onChecked(e, id) {
        const { onChecked } = this.props;
        if (onChecked) onChecked(e, id)
    }

    render() {
        const { data, user, account } = this.props;
        return (
            <div className={`d-flex flex-column pl-2 checkedBox ${account._id === user._id ? 'order-0' : ''}`}>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                {data && data.length <= 0 ? <span className='text-muted'>You don't have any task yet.</span> :
                    <div className='pl-2'>
                        {data.map((x, i) => {
                            return (
                                <div className={`d-flex flex-row`} key={i}>
                                    {account._id === x.userId ? (<span className='mr-2'><a href='javascript:;' onClick={() => this.onDelete(x._id)} className='nounderline text-dark'><i className="fa fa-trash-alt" aria-hidden="true"></i></a></span>) : undefined}
                                    <div className="form-check py-1">
                                        <label className="form-check-label">
                                            {account._id !== user._id ?
                                                <input type="checkbox" className="form-check-input" checked={x.checked} readOnly /> :
                                                <input type="checkbox" className="form-check-input" checked={x.checked} onChange={e => this.onChecked(e, x._id)} />}
                                            {x.task}
                                        </label>
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