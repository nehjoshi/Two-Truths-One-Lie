export const requestHeaderConfig = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + document.cookie.split('=')[1]
            'Authorization': 'Bearer ' + token
        }
    }
}