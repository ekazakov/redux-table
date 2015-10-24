import {RECEIVE_CARDS, REQUEST_CARDS} from './actions';

export default function reducer (state = {loading: false}, action) {
    switch (action.type) {
        case RECEIVE_CARDS:
            return Object.assign({}, state, action);

        case REQUEST_CARDS:
            return Object.assign({}, state, action);

        default:
            return state;
    }
};