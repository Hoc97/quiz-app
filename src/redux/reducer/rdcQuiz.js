
import _ from 'lodash';
const intialState = {
    listQuiz: [],
    listTimerQuiz: [],
    isRefreshListQuiz: true,
};

const rdcQuiz = (state = intialState, { type, payload, time }) => {
    switch (type) {

        case 'RUN_LIST_QUIZ':
            return {
                ...state,
                isRefreshListQuiz: false
            };
        case 'SET_LIST_QUIZ':
            return {
                ...state,
                listQuiz: payload.newArrQuiz,
                listTimerQuiz: payload.newListTimerQuiz
            };
        case 'SET_TIMER_QUIZ':
            let newListTimerQuiz = [...state.listTimerQuiz];
            newListTimerQuiz[payload] = time;
            return {
                ...state,
                listTimerQuiz: newListTimerQuiz
            };
        case 'SET_TIMER_ROOM':
            let setListQuizClone = _.cloneDeep(state.listQuiz);
            setListQuizClone[payload].isInTimerRoom = true;
            return {
                ...state,
                listQuiz: setListQuizClone
            };
        case 'RESET_TIMER_ROOM':
            let resetListQuizClone = _.cloneDeep(state.listQuiz);
            resetListQuizClone[payload].isInTimerRoom = false;
            return {
                ...state,
                listQuiz: resetListQuizClone
            };
        case 'REFRESH_LISTQUIZ':
            return {
                ...state,
                isRefreshListQuiz: true
            };
        case 'SET_ISFINISH_QUIZ':
            let setIsFinishListQuizClone = _.cloneDeep(state.listQuiz);
            setIsFinishListQuizClone[payload].ParticipantQuiz.is_finish = true;
            return {
                ...state,
                listQuiz: setIsFinishListQuizClone
            };
        default:
            return state;
    }
};

export default rdcQuiz;

