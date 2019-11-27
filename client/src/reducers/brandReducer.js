import { GET_BRAND } from '../actions/types';

const initialState = {
    brand: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BRAND:
            return {
                ...state,
                brand: action.payload
            }
        default:
            return state;
    }
}