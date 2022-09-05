const URL = process.env.REACT_APP_ENVIRONMENT==='dev' ? 'http://localhost:5000' : null;
export const ENDPOINTS = {
    MAIN: URL,
    REGISTER: URL + '/register',
}
/*This file contains the main api endpoint for the app, depending 
on whether the app is in development or production
*/