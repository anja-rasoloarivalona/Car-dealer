import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore , applyMiddleware, compose, combineReducers} from 'redux';

import authReducer from './store/reducers/auth';
import productReducer from './store/reducers/product';
import userReducer from './store/reducers/user';
import parametersReducer from './store/reducers/parameters';

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    parameters: parametersReducer 
})

const store = createStore(
    rootReducer, 
   composeEnhancers(
       applyMiddleware(thunk)
));



ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    
, 

document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
