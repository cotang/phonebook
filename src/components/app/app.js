import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';

import ErrorBoundry from '../error-boundry';
import FakeService from '../../services/fake-service.js';
import PhonebookList from '../phonebook-list';
import PhonebookForm from '../phonebook-form';

export default class App extends Component {
  fakeService = new FakeService();
  state = {
    phoneList: [],
    selectedItem: null,
    formShown: false
  };

  componentDidMount() {
    this.loadPhonebook();
  }

  showForm = () => {
    this.setState({
      formShown: true
    });
  }
  hideForm = () => {
    this.setState({
      selectedItem: null,
      formShown: false
    });
  }
  showDetails = (id) => {
    const item = this.state.phoneList.find((item) => item.id === id);
    this.setState({
      selectedItem: item,
      formShown: true
    });
  };

  loadPhonebook = () => {
    this.fakeService
      .getPhonebook()
      .then(phoneList => { this.setState({ phoneList }); });
  }
  addItem = (item) => {
    const newId = this.state.phoneList.length ?
      this.state.phoneList[this.state.phoneList.length - 1].id + 1 :
      1;
    item.id = newId;
    this.fakeService
      .createPerson(item)
      .then(this.setState(({ phoneList }) => {
        return {
          phoneList: [...phoneList, item]
        };
      }));
    this.hideForm();
  }
  deleteItem = (item) => {
    const { id } = item;
    this.fakeService
      .deletePerson(id)
      .then(this.setState(({ phoneList }) => {
        return {
          phoneList: phoneList.filter((item) => item.id !== id)
        };
      }));
    this.hideForm();
  }
  editItem = (item) => {
    const id = item.id;
    this.fakeService
      .updatePerson(item)
      .then(this.setState(({ phoneList }) => {
        const idx = phoneList.findIndex((item) => item.id === id);
        return {
          phoneList: [
            ...phoneList.slice(0, idx),
            item,
            ...phoneList.slice(idx + 1),
          ]
        };
      }));
    this.hideForm();
  }

  handleCSVUpload = (uploadedData) => {
    // filtering empty rows from csv
    const data = uploadedData.filter(item => item.name);

    this.state.phoneList.forEach(phoneItem => {
      const idx = data.findIndex(dataItem =>
        dataItem.name.toLowerCase() === phoneItem.name.toLowerCase());
      // deleting persons who are not in imported list
      if (idx === -1) {
        this.deleteItem(phoneItem);
      } else {
        const phone = data[idx].phone;
        // updating persons who are both in existing and imported list 
        // (if telephone is not the same)
        if (phoneItem.phone !== phone) {
          const newItem = { ...phoneItem, phone };
          this.editItem(newItem);
          data.splice(idx, 1);
        }
      }
    });
    // adding persons who are in imported list, but who wasn't in initial list
    data.forEach(dataItem => {
      this.addItem(dataItem);
    });
  }

  render() {
    const { phoneList, selectedItem, formShown } = this.state;

    const form = formShown ? selectedItem ?
      <PhonebookForm
        item={selectedItem}
        onSubmitted={this.editItem}
        onDeleted={this.deleteItem}
      /> :
      <PhonebookForm
        onSubmitted={this.addItem}
      /> : null;

    return (
      <ErrorBoundry>
        <div className="phonebook-app">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="text-center my-3">Phonebook</h1>
                <PhonebookList
                  list={phoneList}
                  onEdited={this.showDetails} />
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <button
                    onClick={formShown ? this.hideForm : this.showForm}
                    className="btn btn-outline-secondary"
                    type="button">{formShown ? 'Hide form' : 'Show adding form'}</button>
                  {form}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <CSVLink
                    data={phoneList}
                    filename={'my-phonebook.csv'}
                    className="btn btn-primary">
                    Download phonebook
                  </CSVLink>
                </div>
                <div className="mb-3">
                  <CSVReader
                    cssClass="custom-input-file-button"
                    inputId="customFile"
                    parserOptions={{ header: true }}
                    label={<span className="btn btn-primary">Upload phonebook</span>}
                    onFileLoaded={this.handleCSVUpload}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundry>
    );
  }
};
