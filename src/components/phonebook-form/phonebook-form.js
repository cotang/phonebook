import React, { Component } from 'react';

import './phonebook-form.css';

export default class PhonebookForm extends Component {
  state = {
    id: this.props.item ? this.props.item.id : '',
    name: this.props.item ? this.props.item.name : '',
    phone: this.props.item ? this.props.item.phone : ''
  };
  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }
  submitForm = (event) => {
    event.preventDefault();
    const item = { ...this.state }
    this.props.onSubmitted(item);
    this.setState({
      id: '',
      name: '',
      phone: ''
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        id: this.props.item.id,
        name: this.props.item.name,
        phone: this.props.item.phone
      });
    }
  }

  render() {
    const { name, phone } = this.state;
    const deleteButton = this.props.item ?
      <button
        onClick={() => this.props.onDeleted({ ...this.state })}
        type="button"
        className="btn btn-danger ml-2">Delete person</button> :
      null;

    return (
      <div className="phonebook-form">
        <h3 className="text-center my-3">{this.props.item ? 'Edit person' : 'Add new person'}</h3>
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={this.handleInputChange}
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telephone</label>
            <input
              value={phone}
              onChange={this.handleInputChange}
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="Enter telephone" />
          </div>
          <button type="submit" className="btn btn-primary">{this.props.item ? 'Save changes' : 'Save person'} </button>
          {deleteButton}
        </form>
      </div>
    );
  }
};

