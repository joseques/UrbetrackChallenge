import {
	applyMiddleware,
	combineReducers,
	createStore,
} from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import appReducer from '../reducers/app';
const history = createHistory();
const reducers = combineReducers({
	appReducer,
	routing: routerReducer,
});
export default createStore(
	reducers,
	applyMiddleware(routerMiddleware(history))
);