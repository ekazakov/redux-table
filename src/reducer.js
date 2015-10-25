import {RECEIVE_CARDS, REQUEST_CARDS} from './actions';
import Immutable from 'immutable';
import _ from 'lodash';

const fromJs = (data) => Immutable.fromJS(data);

export default function reducer (state, action) {
    const {type} = action;
    action = fromJs(_.omit(action, 'type'));

    switch (type) {
        case RECEIVE_CARDS:
            return state.mergeDeep(action);

        case REQUEST_CARDS:
            return state.mergeDeep(action);

        default:
            return state;
    }
};