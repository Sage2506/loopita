import React, { Component } from 'react';
import Logo1 from '../assets/img/logo.png';

export default class Footer extends Component {
  render (  ) {
    return(
      <footer className="footer__bar">
        <img
                  src={Logo1}
                  alt=""
                  className="logo"
              />
      </footer>
    );
  }
}