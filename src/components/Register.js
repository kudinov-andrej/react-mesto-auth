
import './style/Register.css'
import React from 'react';
import { NavLink } from 'react-router-dom';

function Register() {
    return (
        <section className='enter'>
            <h2 className='enter__title'>Регистрация</h2>
            <form className='enter__form'>
                <input className='enter__input' placeholder='Email' />
                <input className='enter__input' placeholder='Пароль' />
                <button type='submit' className='enter__button enter__button_type_register'>Зарегистрироваться</button>
            </form>
            <NavLink className='header__link' to="/sign-up">Уже зарегистрированы? Войти</NavLink>
        </section>
    );
}

export default Register;

