import { GET_DATA_LOGIN_SUCCESS } from '../action/action';

const intialState = {
    account: {
        access_token: '',
        refresh_token: '',
        email: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false,
};

const rdcReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case GET_DATA_LOGIN_SUCCESS:
            return {
                ...state,
                account: payload.DT,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default rdcReducer;
