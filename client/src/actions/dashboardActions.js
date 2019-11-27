import axios from 'axios';
import { GET_ERRORS, GET_TODAYS_REPORTS, GET_TODAYS_AMMOUNT, GET_CURRENT_MONTH_AMMOUNT, GET_CURRENT_WEEK_AMMOUNT, GET_CURRENT_YEAR_AMMOUNT, GET_REPORT_BY_ID, UPDATE_REPORT, DELETE_REPORT, CLEAR_ERRORS, GET_BRAND } from './types';

//Create report
export const createReport = (newReport, history) => dispatch => {

    dispatch(clearErrors());
    axios.post('/api/reports', newReport)
        .then(res => {
            console.log(res);
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

}

//Get today's reports
export const getTodaysReports = () => dispatch => {

    axios.get('/api/reports/today')
        .then(res => {
            dispatch({
                type: GET_TODAYS_REPORTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_TODAYS_REPORTS,
                payload: null
            })
        })

}

//get todays ammount
export const getTodaysAmmount = () => dispatch => {

    axios.get('/api/reports/today/ammount')
        .then(res => {
            dispatch({
                type: GET_TODAYS_AMMOUNT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_TODAYS_AMMOUNT,
                payload: 0
            })
        })

}

//get current month ammount
export const getCurrentMonthAmmount = () => dispatch => {

    axios.get('/api/reports/month/current/ammount')
        .then(res => {
            dispatch({
                type: GET_CURRENT_MONTH_AMMOUNT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CURRENT_MONTH_AMMOUNT,
                payload: 0
            })
        })

}

//get current week ammount
export const getCurrentWeekAmmount = () => dispatch => {

    axios.get('/api/reports/week/current/ammount')
        .then(res => {
            dispatch({
                type: GET_CURRENT_WEEK_AMMOUNT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CURRENT_WEEK_AMMOUNT,
                payload: 0
            })
        })

}

//get current year ammount
export const getCurrentYearAmmount = () => dispatch => {

    axios.get('/api/reports/year/current/ammount')
        .then(res => {
            dispatch({
                type: GET_CURRENT_YEAR_AMMOUNT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CURRENT_YEAR_AMMOUNT,
                payload: 0
            })
        })

}

//Get report by ID 
export const getReportById = id => dispatch => {

    axios.get(`/api/reports/report/${id}`)
        .then(res => {
            dispatch({
                type: GET_REPORT_BY_ID,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_REPORT_BY_ID,
                payload: null
            })
        })

}

//Put/update report 
export const updateReport = (report, history) => dispatch => {
    dispatch(clearErrors());
    axios.put('/api/reports', report)
        .then(res => {
            dispatch({
                type: UPDATE_REPORT,
                payload: res.data
            });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

//Delete report with specific id
export const deleteReport = id => dispatch => {

    if (window.confirm('Da li ste sigurni da zelite obrisati izvjestaj?')) {
        axios.delete(`/api/reports/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_REPORT,
                    payload: id
                })
            })
            .catch(err => console.log(err))
    }

}

export const addBrand = (brand) => dispatch => {
    axios.post('/api/brand', brand)
        .then(res => console.log(res))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })
}

export const getBrand = () => dispatch => {
    axios.get('/api/brand')
        .then(res => {
            dispatch({
                type: GET_BRAND,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_BRAND,
                payload: null
            })
        })
}

