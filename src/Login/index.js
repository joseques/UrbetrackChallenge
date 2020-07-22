import React from 'react';
import { withRouter } from 'react-router-dom';
import appReducer from '../reducers/app';
import './Login.css';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.clearError = this.clearError.bind(this);
		this.highlightError = this.highlightError.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.login = this.login.bind(this);
		this.user = React.createRef();
		this.passwordError = React.createRef();
		this.state = {
			user: null,
			passwordError: false
		};
	}
	componentDidMount() {
		document.body.classList.add('loginBody');
		var user = localStorage.getItem('user');
		if (user) {
			this.props.history.push('/home');
		}
	}
	clearError() {
		const action = {
			type: "SET_PASSWORD_ERROR",
			payload: {
				passwordError: false
			}
		};
		const newState = appReducer(this.state, action);
		this.setState(newState);
	}
	highlightError() {
		const action = {
			type: "SET_PASSWORD_ERROR",
			payload: {
				passwordError: true
			}
		};
		const newState = appReducer(this.state, action);
		this.setState(newState);
	}
	handleSubmit(event) {
		event.preventDefault();
		const userData = { user: event.target.user.value, password: event.target.password.value };
		this.login(userData);
	}
	login(userData) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		};
		fetch('http://localhost:1337/login', requestOptions)
			.then(function (response) {
				if (response.ok) {
					const action = {
						type: "SET_USER",
						payload: {
							user: userData.user
						}
					};
					const newState = appReducer(this.state, action);
					this.setState(newState);
					localStorage.setItem('user', userData.user);
					this.props.history.push('/home');
				} else {
					this.highlightError();
				}
			}.bind(this)).catch(response => {
				console.error(response);
			});
	}

	render() {
		return (
			<div className="login-container">
				<form action="" className="form-login" onSubmit={this.handleSubmit}>
					<img className="urbetrack_login_logo" src={require("../images/urbelogo.png")} alt="Logo Urbetrack" />
					<label for="login-input-user" className="login_label">
						Usuario
					</label>
					<input id="login-input-user" className="login_input" type="text" name="user" required />
					<label for="login-input-password" className="login_label">
						Contraseña
					</label>
					<input id="login-input-password" className={`login_input ${this.state.passwordError ? "login-input-error" : ""}`} onChange={this.clearError} type="password" name="password" required />
					<button className="login_submit" >Iniciar sesión</button>
				</form>
			</div>
		);
	}
}
export default withRouter(Login);