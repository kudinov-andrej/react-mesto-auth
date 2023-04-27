
import './style/Register.css'
import React from 'react';

function Register() {
    return (
        <section className='enter'>
        <h2 className='enter__title'>Регистрация</h2>
        <form className='enter__form'>
            <input className='enter__input' placeholder='Email' />
            <input className='enter__input' placeholder='Пароль' />
            <button type='submit' className='enter__button'>Зарегистрироваться</button>
        </form>
        <a className='enter__question-link'>Уже зарегистрированы? Войти</a>
    </section>
    );
  }
  
  export default Register;

