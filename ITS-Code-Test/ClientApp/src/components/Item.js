import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

export class Item extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <li key={this.props.item.id}>
        <div className="item-header">
          <div onClick={this.props.onEdit}>
            <span>
              Item {this.props.index + 1}
            </span>
            <FontAwesomeIcon icon={faMinus} onClick={this.props.onRemove} />
          </div>
        </div>
        <div className='item-content'>
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
