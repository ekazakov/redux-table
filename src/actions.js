//export const FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE';
import _ from 'lodash';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const REQUEST_CARDS = 'REQUEST_CARDS';


const delay = (wait) => new Promise((resolve) => {
    setTimeout(resolve, wait);
});

export function receiveCards({rows, start, end, sort}) {
    return {
        type: RECEIVE_CARDS,
        rows,
        start,
        end,
        sort,
        loading: false
    };
}

export function requestCards() {
    return {
        type: REQUEST_CARDS,
        loading: true
    };
}

const getJson = _.partial(_.result, _, 'json');

export function fetchCards({start, end, sort} = {}) {
    return (dispatch) => {
        dispatch(requestCards());
        return delay(500)
            .then(() => fetch(`cards?_start=${start}&_end=${end}&_sort=${sort}`))
            .then(getJson)
            .then((rows) => dispatch(receiveCards({rows, start, end, sort})))
            .catch(error => {
                console.log(error);
            })
        ;
    };
}

function fetchData(fn) {
    return function _fetchData() {
        return (dispatch, getState) => {
            const state = getState();
            const options = fn(state);
            return dispatch(fetchCards(options));
        };
    }
}

function pagination (step) {
    return (state) => ({
        start: state.get('start') + step,
        end: state.get('end') + step,
        sort: state.get('sort')
    })
}

export const fetchFirstPage = fetchData((state) => ({
    start: state.get('start'),
    end: state.get('end'),
    sort: state.get('sort')
}));

export const fetchNextPage = fetchData(pagination(20));
export const fetchPrevPage = fetchData(pagination(-20));

export const fetchSorted = (sort) =>
    fetchData(state => ({
        start: state.get('start'),
        end: state.get('end'),
        sort
    }))();

