import axios from 'axios';
import { GET_STATISTICS, GET_STATISTICS_LAST, GET_STATISTICS_PAST, CLEAR_STATISTICS } from './types';

//get current year statistic monthly
export const getCurrentYearMonth = () => dispatch => {

    axios.get('api/reports/currentyear/month/ammount/january')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/february')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/march')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/april')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/may')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/june')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/july')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/august')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/september')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/october')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/november')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })

    axios.get('api/reports/currentyear/month/ammount/december')
        .then(res => {
            dispatch({
                type: GET_STATISTICS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS,
                payload: null
            })
        })
}

//get last year statistic monthly
export const getLastYearMonth = () => dispatch => {

    axios.get('api/reports/lastyear/month/ammount/january')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/february')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/march')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/april')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/may')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/june')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/july')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/august')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/september')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/october')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/november')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })

    axios.get('api/reports/lastyear/month/ammount/december')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_LAST,
                payload: null
            })
        })
}

export const getPastYearMonth = () => dispatch => {

    axios.get('api/reports/pastyear/month/ammount/january')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/february')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/march')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/april')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/may')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/june')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/july')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/august')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/september')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/october')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/november')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })

    axios.get('api/reports/pastyear/month/ammount/december')
        .then(res => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATISTICS_PAST,
                payload: null
            })
        })
}

export const clearStatistics = () => {
    return {
        type: CLEAR_STATISTICS,
        payload: []
    }
}