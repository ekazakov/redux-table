import './main.css';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';
import _ from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';
import {fetchNextPage, fetchPrevPage, fetchSorted, fetchFirstPage} from './actions';
import Table from './table';
import Stage from './stage';
import Modal from './Modal';
import ModalsManager from './ModalsManager';

const log = console.log.bind(console);

let ModalsManagerInstance;

class App extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchFirstPage());
    }

    render() {
        const dispatch = this.props.dispatch;
        const state = _.pick(this.props, ['rows', 'start', 'end']);
        const {rows, start, end} = this.props;

        const options = {
            ...state,
            onNext: () => {
                log('next');
                dispatch(fetchNextPage());
            },
            onPrev: () => {
                log('prev');
                dispatch(fetchPrevPage());
            },
            sortBy: (field) => {
                log('sort');
                dispatch(fetchSorted(field));
            }
        };

        return <div>
            {this.props.loading ? <div className="loading">...loading</div> : ''}
            <Table {...options}
                style={{width: 1100}}
                onEdit={this.onRowEdit.bind(this)}/>
            <div>
                <button onClick={this.showModal.bind(this)}>Show modal</button>
            </div>
        </div>;
    }

    onRowEdit(item) {
        const content = <table>
            <tbody>
                <tr><td>{item.get('name')}</td></tr>
                <tr><td>{item.get('email')}</td></tr>
                <tr><td>{item.get('website')}</td></tr>
                <tr><td>{item.get('phone')}</td></tr>
                <tr><td>{item.getIn('address.city'.split('.'))}</td></tr>
            </tbody>
        </table>;

        ModalsManagerInstance.addModals(
            modalFactory(content, 3,this.onModalClose));
    }

    onModalClose(componentId) {
        ModalsManagerInstance.removeModal(componentId);
    }

    showModal() {
        ModalsManagerInstance.addModals([
            modalFactory('Hello', 1, this.onModalClose),
            modalFactory('World', 2, this.onModalClose)
        ]);
    }
}

const createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware
        //, createLogger({transformer: state => state.toJS()})
)(createStore);

const initialState = Immutable.fromJS({
    rows: [],
    start: 0,
    end: 20,
    sort: '',
    loading: false
});

let store = createStoreWithMiddleware(reducer, initialState);

let Root = connect(state => {
    return {
        rows: state.get('rows'),
        start: state.get('start'),
        end: state.get('end'),
        sort: state.get('sort'),
        loading: state.get('loading')
    };
})(App);


window.addEventListener('load', function () {
    ReactDom.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        document.getElementById('root')
    );

    ModalsManagerInstance = ReactDom.render(<ModalsManager/>, document.getElementById('stage'));
});

function modalFactory(content, id, onClose) {
    return (props) => {
        const style = {
            marginLeft: 20*props.id,
            marginTop: 20*props.id
        };
        return <Modal
            title={`Modal Dialog #${id}`}
            style={style}
            onClose={onClose} id={props.id}>
            {content}
        </Modal>;
    };
}