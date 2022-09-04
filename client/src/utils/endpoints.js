export const ENDPOINTS = {
    MAIN: process.env.REACT_APP_ENVIRONMENT==='dev' ? 'http://localhost:5000' : null,
}
/*This file contains the main api endpoint for the app, depending 
on whether the app is in development or production
*/