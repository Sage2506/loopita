import React, { Component } from 'react';
import Logo1 from '../assets/img/logo.png';
import Logo2 from '../assets/img/Asset_1.png';
export default class Layout extends Component {
  render (  ) {
    return(
     <div>
        <div className="class__header" >
            <nav className="nav__bar">
            <a href="/">
              <img
              src={Logo2}
                  alt=""
                  className="logo"
              />
            </a>
            </nav>
        </div>
      {this.props.children}
      <footer className="footer__bar">
        <img
                  src={Logo1}
                  alt=""
                  className="logo"
              />
      </footer>
     </div>
    );
  }
}