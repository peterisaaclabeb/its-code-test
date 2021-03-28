import React, { Component } from 'react';

export class Items extends Component {

  constructor(props) {
    super(props);

  }

  renderItemsList(items) {
    return (items.map((item, index) =>
      <Item key={item.id} item={item} index={index} />
    ));
  }

  render() {
    let items = this.renderItemsList(this.props.items);

    return (
      <div className="items-container">
        <ul >
          {items}
        </ul>
        <form>
          <label> Title:        </label>   <input type="text" name="name" />
          <label> Description]:   </label>  <input type="text" name="name" />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}


class Item extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <li key={this.props.item.id}>
        <div>
          <div>
            {this.props.item.title}
          </div>
          <div>
            {this.props.item.description}
          </div>
        </div>
      </li>
    );
  }
}
