import React from 'react';
import logo from './Logo.svg';

class Header extends React.Component {


  constructor(props) {
    super(props);
    //this.handleRouteChange = this.handleRouteChange.bind(this);
    this.state = {
      activeLink: "active"
    };
  }


  // handleRouteChange(e) {
  //   this.props.onRouteChange(e.target.value);
  // }

  render() {
    //const route = this.props.route;

    return(
        <header>
          <div className="row">
            <div className="three columns">
              <img className="app-logo" src={logo} />
              <h1 className="app-name">Jobs HQ</h1>
            </div>
            <div className="nine columns">
              <ul className="navbar">
                <li className="main-link">
                  <a href="#" onClick={this.props.onRouteChange}>All</a>
                </li>

                 <li className="main-link">
                  <a href="#" onClick={this.props.onRouteChange}>Dev</a>
                </li>


                 <li className="main-link">
                  <a href="#" onClick={this.props.onRouteChange}>Design</a>
                </li>

                 <li className="main-link">
                  <a href="#" onClick={this.props.onRouteChange}>Marketing</a>
                </li>

                 <li className="main-link">
                  <a href="#" onClick={this.props.onRouteChange}>Interns</a>
                </li>

                 <li className="main-link">
                  <a href="#" onClick={this.props.onRouteChange}>Others</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
      );
  }
}


export default Header;