
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

const rdcAccount = (state = intialState, { type, payload }) => {
    switch (type) {
        case 'GET_DATA_LOGIN':
            return {
                ...state,
                account: payload.DT,
                isAuthenticated: true,
            };
        case 'USER_LOGOUT':
            return {
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
        case 'USER_UPDATE':
            return {
                ...state,
                account: {
                    ...state.account,
                    username: payload.data.DT.username,
                    image: payload.image
                },
            };
        default:
            return state;
    }
};

export default rdcAccount;

