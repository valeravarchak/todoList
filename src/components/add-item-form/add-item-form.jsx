import React, { Component } from 'react';

import './add-item-form.css';

export default class AddItemForm extends Component {

    state = {
        lable: ''
    };

    onLableChange = (e) => {
        this.setState({
            lable: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.lable)
        this.setState({
            lable: ''
        })
    };


    render() {
        return (
            <form className="add-item-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text" 
                       className="form-control"
                       onChange = { this.onLableChange }
                       placeholder = "What needs to be done.." 
                       value={this.state.lable}
                       />
                <button className="btn btn-outline-secondary">
                        Add.item
                </button>
            </form>
        );
    }
}