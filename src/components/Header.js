import React from 'react';
import { useRoutes, NavLink } from 'react-router-dom';
import Headerlogo from '../image/logo.svg';




function Header({ logOut, userData }) {

  const closePage = () => {
    logOut();
  }


  const routes = {
    "/sign-up": () => (
      <NavLink className='header__link' to="/sign-in">Войти</NavLink>
    ),
    "/sign-in": () => (
      <NavLink className='header__link' to="/sign-up">Регистрация</NavLink>
    ),
    "/": () => (
      <div className='header__link-conteiner'>
        <p className='header__email'>{userData.data?.email || ''}</p>
        <NavLink className='header__link' to="/sign-up" onClick={closePage}>Выйти</NavLink>
      </div>
    )
  };

  const element = useRoutes(Object.keys(routes).map(path => ({
    path,
    element: routes[path]()
  })));



  return (
    <>
      <header className="header">
        <img className="header__logo" src={Headerlogo} alt="логотип" />
        {element}
      </header>
    </>
  );
}



export default Header;

