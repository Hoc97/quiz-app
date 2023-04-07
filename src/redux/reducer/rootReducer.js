import { combineReducers } from 'redux';
import rdcAccount from './rdcAccount';
import rdcQuiz from './rdcQuiz';
import rdcNotification from './rdcNotification';


const rootReducer = combineReducers({
    accountManage: rdcAccount,
    quizManage: rdcQuiz,
    notiManage: rdcNotification
});

export default rootReducer;
