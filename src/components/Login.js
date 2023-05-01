import React from 'react';
import { useState } from 'react';

function Login({ loginUser }) {

    const [form, setForm] = useState({
        email: "",
        password: "",
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
        loginUser(form);

    }

    return (
        <section className='enter'>
            <h2 className='enter__title'>Вход</h2>
            <form className='enter__form' onSubmit={handleSabmit} >
                <input className='enter__input'
                    name='email'
                    placeholder='Email'
                    value={form.email}
                    onChange={handleChange}
                />
                <input className='enter__input'
                    name='password'
                    placeholder='Пароль'
                    value={form.password}
                    onChange={handleChange}
                />
                <button type='submit' className='enter__button'>Войти</button>
            </form>
        </section>
    );
}

export default Login;
