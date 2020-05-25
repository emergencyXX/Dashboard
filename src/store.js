import { applyMiddleware, compose, createStore } from 'redux';
import combineReducers from 'redux/src/combineReducers';
import reducer from "./reducer";


let reducers = combineReducers({
    app: reducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

export default store;
