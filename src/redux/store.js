import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import sagaMiddleware from './reducer/saga/sagaMiddleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

/** Redux persist */
const persistConfig = {
    key: 'root',
    whitelist: ["accountManage", "quizManage", 'notiManage', 'userManage'],
    storage,
};

const middleware = reduxSaga();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(middleware)));

middleware.run(sagaMiddleware);
let persistor = persistStore(store);
export { store, persistor };


