import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // dùng thunk
// import reduxSaga from 'redux-saga'; //dùng với saga
// import middRega from './reducer/saga/middleRega'; //dùng với saga
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware = reduxSaga();  //dùng với saga
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(middleware)));

// middleware.run(middRega);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store);
export { store, persistor };
