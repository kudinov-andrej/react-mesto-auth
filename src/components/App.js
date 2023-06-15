import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from "../utils/api.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import * as auth from './auth.js';
import InfoToLip from './InfoTooltip.jsx';



function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsEditPlacePopupOpen] = useState(false);
  const [isInfoToLipPopupOpen, setIsInfoToLipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [isGoodImg, setIsGoodImg] = useState(false);
  const [isGoodText, setIsGoodText] = useState(false)
  const [isGoodAlt, setIsGoodAlt] = useState(false)


  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    setToken(jwt)

    if (!jwt) {
      setIsLoading(false);
    }
  }, [])


  useEffect(() => {
    if (!token) {
      return
    }
    auth.getUserData(token).then((data) => {
      setUserData(data);
      setIsloggedIn(true)
      navigate("/");
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token, navigate]);

  const registerUser = ({ password, email }) => {
    auth
      .register(password, email)
      .then((response) => {
        setUserData(response);
        setIsGoodImg(true);
        setIsGoodAlt(true)
        setIsGoodText(true);
        setIsInfoToLipPopupOpen(true);

      })
      .catch((err) => {
        setIsGoodImg(false);
        setIsGoodText(false);
        setIsGoodAlt(false)
        setIsInfoToLipPopupOpen(true);
        console.log(err);
      })
  }


  const loginUser = ({ password, email }) => {
    auth
      .authorize(password, email)
      .then((data) => {
        setUserData({
          password: data.password,
          email: data.email
        })
        localStorage.setItem('jwt', data.token);
        setToken(data.token);
        setIsloggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsloggedIn(false);
    setToken("")
    navigate("/sign-up")

  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleEditPlaceClick() {
    setIsEditPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  useEffect(() => {
    Promise.all([api.getCurrentUser(), api.getCards()]).then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  function closeAllPopups() {
    setIsEditPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function closePopupInfoToLip() {
    setIsInfoToLipPopupOpen(false)
    navigate("/sign-in");
  }

  function handlePopupCloseClick(evt) {
    if (isInfoToLipPopupOpen) {
      if (evt.target.classList.contains('popap')) {
        closePopupInfoToLip()
      }
    }
    if (evt.target.classList.contains('popap')) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoToLipPopupOpen) {
      function handleEsc(evt) {
        if (isInfoToLipPopupOpen) {
          if (evt.key === 'Escape') {
            closePopupInfoToLip()
          }
        }
        if (evt.key === 'Escape') {
          closeAllPopups()
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isInfoToLipPopupOpen, selectedCard]);


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.setLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }).catch((err) => {
        console.error(err);
      });
    }
  }


  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleAddPhoto(data) {
    api.createCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }


  if (location.pathname === '/') {
    if (isLoading) {
      return <div className="body__loader"></div>
    }
  }



  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <Header
          logOut={logOut}
          userData={userData} />
        <Routes>
          <Route path="/sign-up"
            element={<Register
              registerUser={registerUser}
            />}

          />
          <Route path="/sign-in" element={<Login
            loginUser={loginUser}
          />} />
          <Route path="/"
            element={<ProtectedRoute
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleEditPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              isloggedIn={isloggedIn}
            />}
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
          addPhoto={handleAddPhoto} />
        <PopupWithForm name="delete-photo" title="Вы уверены?" button="Да"
          onCloseClick={handlePopupCloseClick}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
        />
        <InfoToLip
          isOpen={isInfoToLipPopupOpen}
          isGoodImg={isGoodImg}
          isGoodText={isGoodText}
          isGoodAlt={isGoodAlt}
          onClose={closePopupInfoToLip}
          onCloseClick={handlePopupCloseClick} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
