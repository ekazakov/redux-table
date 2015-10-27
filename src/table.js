import React, {Component} from 'react';
import _ from 'lodash';

export default class Table extends Component {
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
        if (this.props.rows.isEmpty())
            return <tr><td>No Data</td></tr>;

        return this.props.rows.map(this._renderRow.bind(this));
    }

    _renderTable() {
        return <table style={this.props.style}>
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
                <th></th>
            </tr>
            </thead>
            <tbody>
            {this._renderData()}
            </tbody>
        </table>;
    }

    _renderRow(item, index) {
        return <tr key={index}>
            <td>{item.get('name')}</td>
            <td>{item.get('email')}</td>
            <td>{item.get('website')}</td>
            <td>{item.get('phone')}</td>
            <td>{item.getIn('address.city'.split('.'))}</td>
            <td>
                <button onClick={this.onRowEdit.bind(this, item)}>
                    Edit
                </button>
            </td>
        </tr>;
    }

    onRowEdit(item) {
        this.props.onEdit(item);
    }
}

Table.defaultProps = {
    rows: [],
    start: 0,
    end: 0,
    onEdit: _.noop
};