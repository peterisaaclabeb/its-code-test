import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getSteps, addStep, removeStep } from "../services/step-service"
import { getByStepId } from "../services/item-service"
import { Items } from "./Items"
import { Step } from "./Step"

import './Main.scss';
import './Step.scss';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [],
            items: [],
            selectedStepIndex: -1
        };
    }

    componentDidMount() {
        this.populateSteps();
    }

    moveStep(direction) {
        this.setState((state) => {
            return {
                selectedStepIndex: state.selectedStepIndex + direction
            };
        });
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

    async removeStepHendler(index, e) {
        e.stopPropagation();
        if (index === this.state.selectedStepIndex) {
            await this.setState({
                items: [],
                selectedStepIndex: -1
            });
        }
        await removeStep(this.state.steps[index].id);
        await this.populateSteps();

    }

    async displayItemsHendler(index, e) {
        if (index === -1) {
            return;
        }
        var items = await getByStepId(this.state.steps[index].id);
        this.setState({
            items: items,
            selectedStepIndex: index,
        });
    }

    renderStepsList(steps) {
        return (steps.map((step, index) =>
            <Step key={step.id} index={index} active={index === this.state.selectedStepIndex}
                onDisplay={this.displayItemsHendler.bind(this, index)}
                onRemove={this.removeStepHendler.bind(this, index)}>
            </Step>
        ));
    }

    render() {
        let steps = this.state.loading ? <p><em>Loading...</em></p> : this.renderStepsList(this.state.steps);
        let isStepSelected = this.state.selectedStepIndex > -1;
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
                    !isStepSelected ? "" : <Items items={this.state.items} stepId={this.state.steps[this.state.selectedStepIndex].id} onRefresh={() => this.displayItemsHendler(this.state.selectedStepIndex)}></Items>
                }
                {
                    !isStepSelected ? "" :
                        <div className='around-content button-holder'>
                            <div>
                                {
                                    this.state.selectedStepIndex < 1 ? '' : <input type="submit" value="Previous" onClick={() => { this.moveStep(-1); }} />
                                }
                            </div>
                            <div>
                                {
                                    this.state.selectedStepIndex === this.state.steps.length - 1 ? '' : <input type="submit" value="Next" onClick={() => { this.moveStep(1); }} />
                                }
                            </div>
                        </div>

                }

            </div>
        );
    }
}
