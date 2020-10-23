import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, loggerMiddleware)
);
export { store };