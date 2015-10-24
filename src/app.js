import './main.css';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';
import {fetchCards} from './actions';

const log = console.log.bind(console);

class Table extends Component {

    _onPrevClick() {
        this.props.onPrev();
    }

    _onNextClick() {
        this.props.onNext();
    }

    _sortBy(field) {
        this.props.sortBy(field);
    }

    render() {
        return this._renderTable();
    }

    _renderData() {
        if (_.isEmpty(this.props.rows))
            return <tr><td>No Data</td></tr>;

        return _.map(this.props.rows, this._renderRow.bind(this));
    }

    _renderTable() {
        return <table>
            <thead>
                <tr>
                    <th><a href="#" onClick={() => this._onPrevClick()}>prev</a></th>
                    <th><a href="#" onClick={() => this._onNextClick()}>next</a></th>
                    <th>
                        records from {this.props.start} to {this.props.end}
                    </th>
                </tr>
                <tr>
                    <th style={{width: 200}}>
                        <b onClick={() => this._sortBy('name')}>Name</b>
                    </th>
                    <th style={{width: 250}}>
                        <b onClick={() => this._sortBy('email')}>Email</b>
                    </th>
                    <th><b>Website</b></th>
                    <th><b>Phone</b></th>
                    <th><b>City</b></th>
                </tr>
            </thead>
            <tbody>
                {this._renderData()}
            </tbody>
        </table>;
    }

    _renderRow(item, index) {
        return <tr key={index}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.website}</td>
            <td>{item.phone}</td>
            <td>{item.address.city}</td>
        </tr>;
    }
}

Table.defaultProps = {
    rows: [],
    start: 0,
    end: 0
};

const STEP = 20;

class App extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchCards());
    }

    render() {
        const dispatch = this.props.dispatch;
        const state = _.pick(this.props, ['rows', 'start', 'end']);
        const options = {
            ...state,
            onNext: () => {
                log('next');
                dispatch(fetchCards({
                    start: this.props.start + STEP,
                    end: this.props.end + STEP,
                    sort: this.props.sort
                }));
            },
            onPrev: () => {
                log('prev');
                dispatch(fetchCards({
                    start: this.props.start - STEP,
                    end: this.props.end - STEP,
                    sort: this.props.sort
                }));
            },
            sortBy: (field) => {
                log('sort');
                dispatch(fetchCards({
                    start: this.props.start,
                    end: this.props.end,
                    sort: field
                }));
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

App.defaultProps = {
    rows: [],
    start: 0,
    end: 20,
    sort: ''
};


const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
    //createLogger()
)(createStore);

let store = createStoreWithMiddleware(reducer);
let Root = connect(state => state)(App);



window.addEventListener('load', function () {
    ReactDom.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        document.getElementById('root')
    );
});