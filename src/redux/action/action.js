export const GET_DATA_LOGIN = 'GET_DATA_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';

export const getDataLogin = (data) => {
    return {
        type: GET_DATA_LOGIN,
        payload: data,
    };
};

export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};

export const userUpdate = (data, image) => {
    return {
        type: USER_UPDATE,
        payload: { data, image },
    };
};
