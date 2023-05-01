
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Register({ registerUser }) {
    const [form, setForm] = useState({
        password: "",
        email: "",

    })

    const handleChange = (evt) => {
        const input = evt.target
        setForm({
            ...form,
            [input.name]: input.value,
        });
    };

    const handleSabmit = (evt) => {
        evt.preventDefault();
        registerUser(form)

    }

    return (
        <section className='enter'>
            <h2 className='enter__title'>Регистрация</h2>
            <form className='enter__form' onSubmit={handleSabmit}>
                <input className='enter__input'
                    placeholder='Email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
                <input className='enter__input'
                    placeholder='Пароль'
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                />
                <button type='submit' className='enter__button enter__button_type_register'>Зарегистрироваться</button>
            </form>
            <NavLink className='enter__link' to="/sign-in">Уже зарегистрированы? Войти</NavLink>
        </section>
    );
}

export default Register;

