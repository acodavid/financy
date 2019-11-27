import { GET_COMPANIES, GET_ARHIVE, GET_STAT_PERSON, DELETE_USER } from '../actions/types';

const initialState = {
    companies: null,
    arhive: null,
    statistic: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload
            };
        case GET_ARHIVE:
            return {
                ...state,
                arhive: action.payload
            }
        case GET_STAT_PERSON:
            return {
                ...state,
                statistic: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                companies: state.companies.filter(user => user._id !== action.payload),
                arhive: state.arhive.filter(user => user._id !== action.payload),
                statistic: state.statistic.filter(user => user._id !== action.payload)
            }
        default:
            return state;
    }
}