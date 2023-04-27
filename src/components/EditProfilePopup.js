import React from 'react';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from './PopupWithForm.js';


function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    if(props.isOpen) {
    setName(currentUser.name);
    setDescription(currentUser.about); 
  }
  }, [props.isOpen, currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,  
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" button="Редактировать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClick={props.onCloseClick}
      onSubmit={handleSubmit}
    >
      <input type="text" id="popap__input-name" className="popap__input popap__input_type_name" placeholder="Имя" name="name" value={name} required minLength="2" maxLength="40" onChange={handleNameChange} />
      <span className="popap__error popap__input-name-error"></span>
      <input type="text" id="popap__input-profession" className="popap__input popap__input_type_profession" placeholder="О себе" name="about" value={description} required minLength="2" maxLength="200" onChange={handleDescriptionChange} />
      <span className="popap__error popap__input-profession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;