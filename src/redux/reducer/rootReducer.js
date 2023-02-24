import { combineReducers } from 'redux';
import rdcReducer from './rdcReducer';

const rootReducer = combineReducers({
    userManage: rdcReducer,
});

export default rootReducer;
