import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);


  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="photo-plase">
      <button type="button" className={`photo-plase__delete-button ${isOwn ? 'photo-plase__delete-button_show' : ''}`} onClick={handleDeleteClick}></button>
      <img className="photo-plase__image" src={props.link} alt={props.name} onClick={handleClick} />
      <div className="photo-plase__content">
        <h2 className="photo-plase__name">{props.name}</h2>
        <div className="photo-plase__like-conteiner">
          <button type="button" className={`photo-plase__hard ${isLiked ? 'hard_active' : ''}`} onClick={handleLikeClick}></button>
          <div className="photo-plase__counter-like">{props.likes}</div>
        </div>
      </div>
    </article>
  );
}



export default Card;