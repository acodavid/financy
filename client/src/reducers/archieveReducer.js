import { GET_ALL_REPORTS } from '../actions/types';

const initialState = {
    reports: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_REPORTS:
            return {
                ...state,
                reports: action.payload
            }
        default:
            return state;
    }
}