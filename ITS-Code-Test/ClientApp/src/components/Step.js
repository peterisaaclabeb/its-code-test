import { faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export class Step extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <div onClick={this.props.onDisplay} className={this.props.active ? 'active' : ''}>
                    <span>
                        step {this.props.index + 1}
                    </span>
                    <FontAwesomeIcon icon={faMinus} onClick={this.props.onRemove} />
                </div>
            </li>
        );
    }
}
