import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getSteps, addStep, removeStep } from "../services/step-service"
import { getByStepId } from "../services/item-service"
import { Items } from "./Items"

import './Step.scss';

export class Step extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [],
            items: [],
            selectedStepId: -1
        };
    }

    componentDidMount() {
        this.populateSteps();
    }

    async populateSteps() {
        const data = await getSteps();
        this.setState({
            steps: data,
            items: [],
        });
    }

    async addStepHendler(e) {
        e.preventDefault();
        await addStep(`step ${this.state.steps.length + 1}`);
        await this.populateSteps();
    }

     removeStepHendler(id, e) {
        debugger;
        e.preventDefault();
        if (id == this.state.selectedStepId) {
            this.setState({
                items: [],
                selectedStepId: -1
            });
        }
         removeStep(id).then(()=>{
             await this.populateSteps();
         });
    }

    async displayItemsHendler(id, e) {
        e.preventDefault();
        var items = await getByStepId(id);
        this.setState({
            items: items,
            selectedStepId: id
        });
    }

    renderStepsList(steps) {
        return (steps.map((step, index) =>
            <li key={step.id}>
                <div onClick={this.displayItemsHendler.bind(this, step.id)}>
                    <span>
                        step {index + 1}
                    </span>
                    <FontAwesomeIcon icon={faMinus} onClick={this.removeStepHendler.bind(this, step.id)} />
                </div>
            </li>
        ));
    }

    render() {
        let steps = this.state.loading ? <p><em>Loading...</em></p> : this.renderStepsList(this.state.steps);
        return (
            <div className="content-holder">
                <ul className='step-list'>
                    {steps}
                    <li key="add-new" onClick={this.addStepHendler.bind(this)}>
                        <div>
                            <span>
                            </span>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </li>
                </ul>
                {
                    this.state.selectedStepId > -1 ? <Items items={this.state.items}></Items> : ""
                }
            </div>
        );
    }
}
