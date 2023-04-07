import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk'; // dùng thunk
import reduxSaga from 'redux-saga'; //dùng với saga
import middResa from './reducer/saga/middleResa'; //dùng với saga
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

/** Redux persist */
const persistConfig = {
    key: 'root',
    whitelist: ["accountManage", "quizManage", 'notiManage'],
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = reduxSaga();  //dùng với saga
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(middleware))); //dùng với saga
// const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));// dùng thunk

middleware.run(middResa);
let persistor = persistStore(store);
export { store, persistor };


