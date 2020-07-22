import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import store from './store';
import Login from './Login';
import Home from './Home';
import './App.css';
const history = syncHistoryWithStore(createBrowserHistory(), store);

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/login'>
							<Login action="logout"/>
						</Route>
						<Route path='/'>
							<Home />
						</Route>
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
