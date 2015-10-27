import React, {Component} from 'react';

export default class Modal extends Component {
    onClose() {
        this.props.onClose(this.props.id);
    }

    render() {
        return <div className="modal" {...this.props} ref="root">
            <div className="modalHeader">
                {this.props.title}
                <button className="modalClose" onClick={this.onClose.bind(this)}>×</button>
            </div>
            <div className="modalBody">
                {this.props.children}
            </div>
        </div>;
    }
}