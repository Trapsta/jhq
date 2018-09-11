import React, { Component } from 'react';
import Header from './components/header';
import Jobs from './components/jobs';
import Footer from './components/footer';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
		}

		this.handleRoute = this.handleRoute.bind(this);
	}


	componentWillMount() {

	}


	handleRoute(e) {
		this.setState({
			currentRoute: e.target.text
		});
	}


	
  render() {

    return (
      <div className="main-content container u-full-width">
        <Header onRouteChange={this.handleRoute} />
        <Jobs category={this.state.currentRoute} />
        <Footer />
      </div>
    );
  }
}

export default App;
