import React from 'react';
import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const ref = useRef();

    useEffect(() => {
        ref.current.value = '';
      }, [props.isOpen]);

    function handleSubmitAvatar(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: ref.current.value       
        });
    }
   
    return (
        <PopupWithForm name="change-avatar" title="Обновить аватар" button="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseClick={props.onCloseClick}
            onSubmit={handleSubmitAvatar}
        >
            <input ref={ref} type="url" id="popap__input-avatar" className="popap__input popap__input_type_link popap__input_type_new-link" name="avatar" placeholder="Ссылка на картинку" required />
            <span className="popap__error popap__input-avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;