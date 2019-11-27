import { GET_STATISTICS, GET_STATISTICS_LAST, GET_STATISTICS_PAST, CLEAR_STATISTICS } from '../actions/types'

const initialState = {
    statisticCurrent: [],
    statisticLast: [],
    statisticPast: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STATISTICS:
            return {
                ...state,
                statisticCurrent: [action.payload, ...state.statisticCurrent]
            }
        case GET_STATISTICS_LAST:
            return {
                ...state,
                statisticLast: [action.payload, ...state.statisticLast]
            }
        case GET_STATISTICS_PAST:
            return {
                ...state,
                statisticPast: [action.payload, ...state.statisticPast]
            }
        case CLEAR_STATISTICS:
            return {
                ...state,
                statisticCurrent: action.payload,
                statisticLast: action.payload,
                statisticPast: action.payload
            }
        default:
            return state;
    }
}