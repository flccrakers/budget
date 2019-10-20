import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {persistStore, persistReducer, persistCombineReducers} from 'redux-persist'
import localForage from 'localforage'
import reducers from "./redux/reducers"

let middleware;
middleware = applyMiddleware(promise, thunk, createLogger());
const persistConfig = {
    key: 'root',
    storage: localForage,
  }
;
const persistedReducer = persistCombineReducers(persistConfig, reducers);
export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);


