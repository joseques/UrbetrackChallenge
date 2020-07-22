import {
	replace
} from 'react-router-redux';
import store from './store';
const location = {
	pathname: '/login',
	state: {}
}
store.dispatch(replace(location));