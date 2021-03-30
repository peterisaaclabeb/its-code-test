import React, { Component } from 'react';
import './Items.scss';
import { Item } from './Item';
import { updateItem, addItem, deleteItem } from '../services/item-service';

export class Items extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      description: ''
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearValues() {
    this.setState({
      id: '',
      title: '',
      description: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    this.clearValues();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  editItem(item) {
    this.setState({
      id: item.id,
      title: item.title,
      description: item.description,
    });
  }

  async removeItem(item) {
    await deleteItem(item.id);
    this.clearValues();
    this.props.onRefresh();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const item = {
      stepId: this.props.stepId,
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
    };

    if (item.id) {
      await updateItem(item);
    } else {
      delete item.id;
      await addItem(item);
    }

    this.clearValues();
    this.props.onRefresh();
  }

  render() {
    let items = (this.props.items.map((item, index) =>
      <Item key={item.id} item={item} index={index} onEdit={() => { this.editItem(item) }} onRemove={() => { this.removeItem(item) }} />
    ));


    return (
      <div className="items-container">
        <div className='right-content'>
          <input type="submit" value="Add new item" onClick={() => { this.clearValues(); }} />
        </div>
        <ul >
          {items}
        </ul>
        <div className="item-header">
          <div>
            <span>
              Add/Edit
            </span>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="id" value={this.state.id} />
          <div className='form-col'>
            <div className='form-group'>
              <label> Title: </label>
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <label> Description: </label>
              <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            </div>
          </div>
          <div className='form-col center-content'>
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    );
  }
}