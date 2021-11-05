import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import postReducer from '../reducers/postReducer';
import taskReducer from '../reducers/taskReducer';


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducers = combineReducers({
    login: authReducer,
    posts: postReducer,
    tasks: taskReducer
})


export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);
