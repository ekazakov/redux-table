//export const FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const REQUEST_CARDS = 'REQUEST_CARDS';


const delay = (wait) => new Promise((resolve) => {
    setTimeout(resolve, wait);
});

export function receiveCards({rows, start, end, sort, loading}) {
    return {
        type: RECEIVE_CARDS,
        rows,
        start,
        end,
        sort,
        loading
    };
}

export function requestCards() {
    return {
        type: REQUEST_CARDS,
        loading: true
    };
}

export function fetchCards({start = 0, end = 20, sort = '', loading = false} = {}) {
    return (dispatch) => {
        dispatch(requestCards());
        return delay(2000)
            .then(() => fetch(`cards?_start=${start}&_end=${end}&_sort=${sort}`))
            .then((response) => response.json())
            .then((rows) => dispatch(receiveCards({
                rows,
                start,
                end,
                sort,
                loading
            })))
            .catch(error => {
                console.log(error);
            })
        ;
    };
}