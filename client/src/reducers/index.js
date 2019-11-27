import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import dashboardReducer from './dashboardReducer';
import statReducer from './statReducer';
import companyReducer from './companyReducer';
import archieveReducer from './archieveReducer';
import brandReducer from './brandReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    dashboard: dashboardReducer,
    statistic: statReducer,
    companies: companyReducer,
    archieve: archieveReducer,
    brand: brandReducer
});