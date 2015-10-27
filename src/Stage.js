import React, {Component} from 'react';

export default class Stage extends Component {
    render() {
        return <div className="stage">
            {this.props.children}
        </div>;
    }
}