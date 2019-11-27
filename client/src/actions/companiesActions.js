import axios from 'axios';
import { GET_COMPANIES, GET_ARHIVE, GET_STAT_PERSON } from './types';

//Get Companies
export const getCompanies = () => dispatch => {

    axios.get('/api/users/companies')
        .then(res => {
            dispatch({
                type: GET_COMPANIES,
                payload: res.data
            })
        })
        .catch(res => {
            dispatch({
                type: GET_COMPANIES,
                payload: null
            })
        })

}

export const getArhive = () => dispatch => {

    axios.get('/api/users/companies/arhive')
        .then(res => {
            dispatch({
                type: GET_ARHIVE,
                payload: res.data
            })
        })
        .catch(res => {
            dispatch({
                type: GET_ARHIVE,
                payload: null
            })
        })

}

export const getStatPerson = () => dispatch => {

    axios.get('/api/users/companies/statistic')
        .then(res => {
            dispatch({
                type: GET_STAT_PERSON,
                payload: res.data
            })
        })
        .catch(res => {
            dispatch({
                type: GET_STAT_PERSON,
                payload: null
            })
        })

}