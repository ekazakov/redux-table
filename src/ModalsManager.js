import React, {Component} from 'react';
import _ from 'lodash';

export default class ModalsManager extends Component {
    constructor(props) {
        super(props);
        this.counter = 0;
        this.state = {
            modals: {}
        };
    }

    render() {
        const Stage2 = connect(state => state.toObject())(Stage);

        if (_.keys(this.state.modals).length === 0) return null;

        return <Provider store={store}>
            <Stage2>
                {_.map(this.state.modals, (modal) => modal)}
            </Stage2>
        </Provider>;
    }

    addModals(modals) {
        modals = [].concat(modals)
            .reduce((result, Modal) => {
                const counter = this.counter;
                result[counter] = <Modal key={counter} id={counter}/>;
                this.counter++;
                return result;
            }, {});

        this.setState({
            modals: Object.assign(
                this.state.modals, modals)});
    }

    removeModal(componentId) {
        this.setState({
            modals: _.reduce(this.state.modals, (result, item) => {
                if (item.props.id !== componentId) {
                    result[item.props.id] = item;
                }

                return result;
            }, {})
        });
    }
}
