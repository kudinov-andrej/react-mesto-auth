import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const [name, setPlaceName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        setPlaceName("");
        setLink("");
    }, [props.isOpen]);

    function handlePlaceNameChange(evt) {
        setPlaceName(evt.target.value)
    }

    function handlePlaceLinkChange(evt) {
        setLink(evt.target.value)
    }

    function handleSubmitPlace(evt) {
        evt.preventDefault();
        props.addPhoto({
            name: name,
            link: link
        });
        
    }

    return (
        <PopupWithForm name="place" title="Новое место" button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseClick={props.onCloseClick}
            onSubmit={handleSubmitPlace}

        >
            <input type="text" id="popap__input-place" className="popap__input popap__input_type_place-name popap__input_type_new-place"  name="name" value={name} placeholder="Название" required minLength="2" maxLength="30" onChange={handlePlaceNameChange} />
            <span className="popap__error popap__input-place-error"></span>
            <input type="url" id="popap__input-link" className="popap__input popap__input_type_link popap__input_type_new-link" name="link"  value={link} placeholder="Ссылка на картинку" required onChange={handlePlaceLinkChange} />
            <span className="popap__error popap__input-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;