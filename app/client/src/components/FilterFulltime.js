import React, { Component } from "react";

class FilterFulltime extends Component {
    state = {
        checkbox0: true,
        checkbox1: true
    };

    handleCheckbox(e, type) {
        const { onChange } = this.props;
        const { checked } = e.target;
        this.setState({
            ['checkbox' + type]: checked
        });
        if (onChange) onChange(checked, type);
    }

    render() {
        const { checkbox0, checkbox1 } = this.state;
//do a select instead checkbox
        return (
            <div style={{ position: 'absolute', background: 'white', top: 0 }}>
                <h6 className="font-weight-light pl-2 m-0">Show:</h6>
                <div className="form-check form-check-inline mt-2 ml-2">
                    <input style={styles.checkBoxWidth} className="form-check-input mt-1" type="checkbox" id="checkbox1" checked={checkbox0} onChange={(e) => this.handleCheckbox(e, 0)} />
                    <label className="form-check-label" htmlFor="checkbox1" style={styles.checkBoxSize}>full-time</label>
                </div>
                <div className="form-check form-check-inline">
                    <input style={styles.checkBoxWidth} className="form-check-input mb-1" type="checkbox" id="checkbox2" checked={checkbox1} onChange={(e) => this.handleCheckbox(e, 1)} />
                    <label className="form-check-label" htmlFor="checkbox2" style={{ marginTop: -10, fontSize: 12 }}>part-time</label>
                </div>
            </div>
        )
    }
}

const styles = {
    flex: {
        flex: 1
    },
    checkBoxWidth: {
        width: 10
    },
    checkBoxSize: {
        fontSize: 12
    }
};

export default FilterFulltime;
