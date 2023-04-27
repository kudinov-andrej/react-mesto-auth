import './style/Register.css'
import React from 'react';

function login() {
    return (
        <section className='enter'>
        <h2 className='enter__title'>Вход</h2>
        <form className='enter__form'>
            <input className='enter__input' placeholder='Email' />
            <input className='enter__input' placeholder='Пароль' />
            <button type='submit' className='enter__button'>Войти</button>
        </form>
    </section>
    );
  }
  
  export default login;
