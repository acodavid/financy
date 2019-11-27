import axios from 'axios';
import { GET_ALL_REPORTS } from './types';

export const getAllReports = () => dispatch => {

    axios.get('/api/reports')
        .then(res => {
            dispatch({
                type: GET_ALL_REPORTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_REPORTS,
                payload: null
            })
        })

}