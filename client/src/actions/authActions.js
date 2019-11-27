import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS, DELETE_USER } from '../actions/types';

//Register
export const registerUser = (user, history) => dispatch => {

    axios.post('/api/users/register', user)
        .then(res => {
            history.push('/companies');
            console.log(res);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })

};

//Login
export const loginUser = user => dispatch => {

    axios.post('/api/users/login', user)
        .then(res => {

            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })

};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

//Logged user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//LOGOUT
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));

}

//delete user - admin 
export const deleteUser = id => dispatch => {

    if (window.confirm('Da li ste sigurni da zelite obrisati ovog korisnika?')) {
        axios.delete(`/api/users/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_USER,
                    payload: id
                })
            })
            .catch(err => console.log(err))
    }

}