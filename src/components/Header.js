import React from 'react';

import Headerlogo  from '../image/logo.svg';

function Header () {
    return (
        <header className="header">
          <img className="header__logo" src={Headerlogo} alt="логотип"/>
        </header>
    );
  }
  
  export default Header;