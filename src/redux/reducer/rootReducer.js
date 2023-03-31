import { combineReducers } from 'redux';
import rdcAccount from './rdcAccount';


const rootReducer = combineReducers({
    accountManage: rdcAccount,
    // quizManage: rdcQuiz
});

export default rootReducer;
