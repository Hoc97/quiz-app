
import _ from 'lodash';
const intialState = {
    listQuiz: [],
    listTimerQuiz: [],
    isRefreshListQuiz: true,
    listQuestionPart: [10, 10, 12, 12, 12, 12, 12, 19],
    listTimerPart: {
        Part1: [0, 10, 0],
        Part2: [0, 1, 0],
        Part3: [0, 1, 0],
        Part4: [0, 1, 0],
        Part5: [0, 1, 0],
        Part6: [0, 1, 0],
        Part7: [0, 1, 0],
        Part8: [0, 1, 0],
    }
};
// [0, 5, 0],
// [0, 5, 0],
// [0, 6, 0],
// [0, 6, 0],
// [0, 6, 0],
// [0, 10, 0],
// [0, 15, 0],
// [0, 15, 0],
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
        case 'SET_LIST_QUIZ_CURRENT':
            return {
                ...state,
                listQuiz: payload
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
            let resetListTimerQuiz = _.cloneDeep(state.listTimerQuiz);
            resetListQuizClone[payload].isInTimerRoom = false;
            resetListTimerQuiz[payload] = 0;
            return {
                ...state,
                listQuiz: resetListQuizClone,
                listTimerQuiz: resetListTimerQuiz
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

