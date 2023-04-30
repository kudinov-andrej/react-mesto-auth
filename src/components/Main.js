import { useContext } from 'react';
import Card from "../components/Card.js"
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Footer from './Footer.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);


  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__block">
            <button type="button" className="profile__button" onClick={props.onEditAvatar}>
              <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }}  ></div>
            </button>
            <div className="profile__content">
              <div className="profile__info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__profession">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>
        <section className="plase">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;