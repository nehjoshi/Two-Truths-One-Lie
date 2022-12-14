const URL = process.env.REACT_APP_ENVIRONMENT==='dev' ? 'http://localhost:5000' : null;
export const ENDPOINTS = {
    MAIN: URL,
    REGISTER: URL + '/register',
    LOGIN: URL + '/login',
    GET_TRUTHS_AND_LIES: URL + '/get-user-truths-and-lies',
    NEW_TRUTH: URL + '/new-truth',
    NEW_LIE: URL + '/new-lie',
    NEW_GAME: URL + '/init-game',
    GET_LOBBY_INFO: URL + '/get-lobby-info',
}
/*This file contains the main api endpoint for the app, depending 
on whether the app is in development or production
*/