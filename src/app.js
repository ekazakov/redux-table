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

const log = console.log.bind(console);

class App extends Component {
    constructor(props) {
        super(props);
        //log(props);
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

        //if (this.state.error != null) {
        //    return <div>
        //        <Table {...options}/>
        //        <div>{this.state.error}</div>
        //    </div>;
        //}

        return <div>
            {this.props.loading ? <div className="loading">...loading</div> : ''}
            <Table {...options}/>
        </div>;
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
});