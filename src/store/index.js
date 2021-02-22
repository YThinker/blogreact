import { createStore, combineReducers } from 'redux';

import userReducer from './modules/user';

const rootReducer = combineReducers({
    user: userReducer
});

const store = createStore(rootReducer);

export default store;