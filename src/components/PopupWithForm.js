import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popap popap_type_${props.name} ${props.isOpen ? 'popap_opened' : ""}`} onClick={props.onCloseClick}>
      <div className="popap__conteiner">
        <button className="popap__button-close" type="button" onClick={props.onClose}></button>
        <h2 className="popap__title">{props.title}</h2>
        <form className="popap__form popap__form_type_profile" action="#" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <input type="submit" className="popap__button popap__button_type_save-profile" value={props.button} />
        </form>
      </div>
    </div>

  );
}

export default PopupWithForm;


