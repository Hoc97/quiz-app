import { combineReducers } from 'redux';
import rdcAccount from './rdcAccount';
import rdcQuiz from './rdcQuiz';
import rdcNotification from './rdcNotification';
import rdcUser from './rdcUser';



const rootReducer = combineReducers({
    accountManage: rdcAccount,
    quizManage: rdcQuiz,
    notiManage: rdcNotification,
    userManage: rdcUser
});

export default rootReducer;
