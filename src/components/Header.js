import React from 'react';
import Logo2 from '../assets/img/Asset_1.png';

export const Header = () => {
    return (
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
    )
}

