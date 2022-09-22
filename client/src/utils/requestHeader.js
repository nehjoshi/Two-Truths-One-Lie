export const requestHeaderConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': 'Bearer ' + document.cookie.split('=')[1]
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
};