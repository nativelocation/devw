import React, { Component } from "react";

class FilterFulltime extends Component {
    handleSelect(e) {
        const { onChange } = this.props;
        const { value } = e.target;
        if (onChange) onChange(value);
    }

    render() {
        return (
            <div style={styles.position}>
                <h6 className="font-weight-light pl-2 m-0">Show:</h6>
                <select className="custom-select form-control-sm" onChange={this.handleSelect.bind(this)}>
                    <option value="0">All</option>
                    <option value="1">FullTime</option>
                    <option value="2">PartTime</option>
                </select>
            </div>
        )
    }
}

const styles = {
    position: {
        position: 'absolute',
        background: 'white',
        top: -10,
        width: '200px',
        zIndex: 2
    }
};

export default FilterFulltime;
