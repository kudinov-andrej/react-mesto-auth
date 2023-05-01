import React, { useState } from 'react';
import { useRoutes, NavLink } from 'react-router-dom';
import Headerlogo from '../image/logo.svg';


function Header({ logOut, userData }) {

  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false);

  const handleMenuClick = () => {
    setLoggedOut(false)
    setIsOpenMenu(!isOpenMenu)
  }

  const closeMenuPage = () => {
    setLoggedOut(true)
    logOut();
  }


  const routes = {
    "/sign-up": () => (
      <NavLink className='header__link header__link_type_word' to="/sign-in">Войти</NavLink>
    ),
    "/sign-in": () => (
      <NavLink className='header__link header__link_type_word' to="/sign-up">Регистрация</NavLink>
    ),
    "/": () => (
      <>
        <button type='button' className={loggedOut ? 'header__menu' : isOpenMenu ? 'header__menu_off' : 'header__menu'} onClick={handleMenuClick} />
        <div className={loggedOut ? 'header__link-conteiner' : isOpenMenu ? 'header__link-conteiner-activ' : 'header__link-conteiner'}>
          <p className='header__email'>{userData.data?.email || ''}</p>
          <NavLink className='header__link' to="/sign-up" onClick={closeMenuPage}>Выйти</NavLink>
        </div>
      </>
    )
  };

  const element = useRoutes(Object.keys(routes).map(path => ({
    path,
    element: routes[path]()
  })));

  return (
    <>
      <header className="header" style={{ flexDirection: loggedOut ? 'row' : isOpenMenu ? 'column-reverse' : 'row' }}>
        <div className='header__logo-conteiner'>
          <img className="header__logo" src={Headerlogo} alt="логотип" />
          <button type='button' onClick={handleMenuClick} className='header__button'
            style={{
              display: loggedOut ? 'none' : isOpenMenu ? 'block' : 'none'
            }}
          />
        </div>
        {element}
      </header>
    </>
  );
}

export default Header;

