
const intialState = {
    listUser: [],
};

const rdcUser = (state = intialState, { type, payload }) => {
    switch (type) {
        case 'SET_LIST_USER':
            return {
                ...state,
                listUser: payload,
            };


        default:
            return state;
    }
};

export default rdcUser;

