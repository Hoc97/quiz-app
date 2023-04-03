import { combineReducers } from 'redux';
import rdcAccount from './rdcAccount';
import rdcQuiz from './rdcQuiz';


const rootReducer = combineReducers({
    accountManage: rdcAccount,
    quizManage: rdcQuiz
});

export default rootReducer;
