
const intialState = {
    listNoti: [],
    listActive: [],
    numNoti: 0

};

const rdcNotification = (state = intialState, { type, payload }) => {
    switch (type) {
        case 'GET_DATA_NOTIFICATION':
            return {
                ...state,
                listNoti: [payload, ...state.listNoti],
                listActive: [payload, ...state.listActive],
                numNoti: state.numNoti + 1
            };
        case 'RESET_NUMBER_NOTIFICATION':
            return {
                ...state,
                numNoti: 0,
            };
        case 'RESET_ACTIVE':
            return {
                ...state,
                listActive: [],
            };

        case 'RESET_ALL':
            return {
                listNoti: [],
                listActive: [],
                numNoti: 0
            };
        default:
            return state;
    }
};

export default rdcNotification;