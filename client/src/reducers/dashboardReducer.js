import { GET_TODAYS_REPORTS, GET_TODAYS_AMMOUNT, GET_CURRENT_MONTH_AMMOUNT, GET_CURRENT_WEEK_AMMOUNT, GET_CURRENT_YEAR_AMMOUNT, GET_REPORT_BY_ID, UPDATE_REPORT, DELETE_REPORT } from '../actions/types';

const initialState = {
    today: null,
    todayAmmount: 0,
    weekAmmount: 0,
    monthAmmount: 0,
    yearAmmount: 0,
    report: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TODAYS_REPORTS:
            return {
                ...state,
                today: action.payload
            }
        case GET_TODAYS_AMMOUNT:
            return {
                ...state,
                todayAmmount: action.payload
            }
        case GET_CURRENT_MONTH_AMMOUNT:
            return {
                ...state,
                monthAmmount: action.payload
            }
        case GET_CURRENT_WEEK_AMMOUNT:
            return {
                ...state,
                weekAmmount: action.payload
            }
        case GET_CURRENT_YEAR_AMMOUNT:
            return {
                ...state,
                yearAmmount: action.payload
            }
        case GET_REPORT_BY_ID:
            return {
                ...state,
                report: action.payload
            }
        case UPDATE_REPORT:
            return {
                ...state,
                today: state.today.map(report => report._id === action.payload.id ? (report = action.payload) : report)
            }
        case DELETE_REPORT:
            return {
                ...state,
                today: state.today.filter(report => report._id !== action.payload)
            }
        default:
            return state;
    }
}