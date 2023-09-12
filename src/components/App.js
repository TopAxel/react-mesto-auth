import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ProfilePopup from './ProfilePopup.js';
import CardPopup from './CardPopup.js';
import AvatarPopup from './AvatarPopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import api from '../utils/Api.js';

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import * as Auth from '../utils/Auth.js'
import mistake from '../image/mistake/mistake.svg'
import successfully from '../image/successfully/successfully.svg'

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emailName, setEmailName] = React.useState("");
  const [tooltipImage, setPopupImage] = React.useState("");
  const [tooltipTitle, setPopupTitle] = React.useState("");
  const [isTooltipOpen, setInfoTooltip] = React.useState(false);


  function onRegister(email, password) {
    Auth.registerUser(email, password)
      .then(() => {
        setPopupImage(successfully);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupImage(mistake);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    Auth.loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch(() => {
        setPopupImage(mistake);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.data.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // обработчики 
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = () => {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  // закрытия по оверлею (popup)
  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopups();
  }

  // Выполняем запрос к API для получения информации о текущем пользователе
  React.useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  // редактирование данных пользователя 
  const handleUpdateUser = (updatedUser) => {
    api.editUserInfo(updatedUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // редактирование аватара
  function handleUpdateAvatar(AvatarLink) {
    api.editAvatar(AvatarLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }


  //при загрузке страницы получаем данные карточек
  React.useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [isLoggedIn]);


  // установка и снятия лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((updatedCard) => {
          setCards((prevCards) =>
            prevCards.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api.setLike(card._id)
        .then((updatedCard) => {
          setCards((prevCards) =>
            prevCards.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // добавление карточки 
  const handleAddPlace = (Card) => {
    api.addCard(Card)
      .then((addedCard) => {
        setCards([addedCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // удаление карточки
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName("");
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }


  // разметка 
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            } />

            <Route path="/sign-up" element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            } />

            <Route exact path="/" element={
              <>
                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  component={Main}
                  isLogged={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete} />
                <Footer />
              </>
            } />

            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>
          <ProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onOverlayClose={handleOverlayClickClose} />
          <CardPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            onOverlayClose={handleOverlayClickClose} />
          <AvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onOverlayClose={handleOverlayClickClose} />
          <DeleteCardPopup />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlayClose={handleOverlayClickClose} />
          <InfoTooltip
            image={tooltipImage}
            title={tooltipTitle}
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            onOverlayClose={handleOverlayClickClose}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
