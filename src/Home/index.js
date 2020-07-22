import React from 'react';
import { withRouter } from 'react-router-dom';
import './Home.css';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.addResults = this.addResults.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.loadResults = this.loadResults.bind(this);
		this.toggleAppTheme = this.toggleAppTheme.bind(this);
		this.state = {
			imageList: [],
			currentPage: 1,
			currentClass: 'DarkBody'
		}
		// this.user = React.createRef();
	}

	componentDidMount() {
		this.loadResults();
	}

	toggleAppTheme(themeClass) {
		if (this.state.currentClass !== themeClass) {
			document.body.classList = [themeClass];
			// this.setState(Object.assign({}, this.state, { currentClass: themeClass }));
		}
	}

	addResults() {
		this.setState(Object.assign({}, this.state, { currentPage: ++this.state.currentPage }));
		this.loadResults();
	}

	loadResults() {
		fetch('https://picsum.photos/v2/list?page=1&limit=15')
			.then((response) => response.json())
			.then(function (imageList) {
				this.state.imageList.push(...imageList);
				this.setState(this.state);
			}.bind(this));
	}

	handleLogout(){
		localStorage.clear();
		this.props.history.push('/login');
	}

	render() {
		return (
			<div className="wrapper">
				<header>
					<img className="urbetrack_logo" src={require("../images/urbelogo.png")} alt="Logo Urbetrack" />
				</header>
				<section class="columns">
					<div class="column sidebar">
						<p>Hola {localStorage.getItem('user')||'usuario'}!</p>
						<button className="sidebar-button" onClick={this.toggleAppTheme(this.state.currentClass == 'DarkBody' ? 'LightBody' : 'DarkBody')}>Cambiar tema</button>
						<button className="sidebar-button" onClick={this.handleLogout}>Cerrar sesión</button>
					</div>
					<div className="column grid">
						{this.state.imageList.map((result, i) => {
							return (
								<div className="tile" style={{ backgroundImage: `url(${result.download_url})` }}>
									<div className="text"><h2>{result.author}</h2>
									</div>
								</div>
							);
						})}
						<div className="tile" onClick={this.addResults} style={{ backgroundColor: '#333333' }}>
							<div className="text"><h2>Ver más</h2></div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
export default withRouter(Home);