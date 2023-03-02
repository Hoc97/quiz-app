export const GET_DATA_LOGIN_SUCCESS = 'GET_DATA_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const getDataLogin = (data) => {
    return {
        type: GET_DATA_LOGIN_SUCCESS,
        payload: data,
    };
};

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    };
};
