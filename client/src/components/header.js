import React from 'react';
import logo from './Logo.svg';

class Header extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      activeLink: "active"
    };
  }


  render() {

    return(
        <header>
          <div className="row">
            <div className="three columns">
              <img className="app-logo" src={logo} alt="Logo" />
              <h1 className="app-name">Jobs HQ</h1>
            </div>
            <div className="nine columns">
              <ul className="navbar">
                <li className="main-link">
                  <button onClick={this.props.onRouteChange}>All</button>
                </li>

                 <li className="main-link">
                  <button onClick={this.props.onRouteChange}>Dev</button>
                </li>


                 <li className="main-link">
                  <button onClick={this.props.onRouteChange}>Design</button>
                </li>

                 <li className="main-link">
                  <button onClick={this.props.onRouteChange}>Marketing</button>
                </li>

                 <li className="main-link">
                  <button onClick={this.props.onRouteChange}>Interns</button>
                </li>

                 <li className="main-link">
                  <button onClick={this.props.onRouteChange}>Others</button>
                </li>
              </ul>
            </div>
          </div>
        </header>
      );
  }
}


export default Header;