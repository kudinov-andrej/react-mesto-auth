import React from 'react';
import okImg from '../image/goodIcon.png'
import bedImg from '../image/bedIcon.png'

function InfoToLip(props) {
    return (
        <div className={`popap popap_type_${props.name} ${props.isOpen ? 'popap_opened' : ""}`} onClick={props.onCloseClick}>
            <div className="popap__conteiner">
                <button className="popap__button-close" type="button" onClick={props.onClose}></button>
                <img className='popap__img' src={props.isGoodImg ? okImg : bedImg} alt={props.isGoodAlt ? "Изображение, регистрация успешна" : "Изображение, регистрация не успешна"} />
                <h2 className="popap__title popap__title_typy_info" style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    maxWidth: '358px',
                    marginBottom: '60px'
                }}>{props.isGoodText ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}</h2>
            </div>
        </div>

    );
}

export default InfoToLip;
