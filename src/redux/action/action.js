export const GET_DATA_LOGIN_SUCCESS = 'GET_DATA_LOGIN_SUCCESS';
export const getDataLogin = (data) => {
    return {
        type: GET_DATA_LOGIN_SUCCESS,
        payload: data,
    };
};
