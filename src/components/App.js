//Импорты react:
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

//Импорт стилей:
import "../App.css";

//Импорты компонентов:
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import PopupDeleteCard from "./PopupDeleteCard";
import InfoToolTip from "./InfoToolTip";

import CurrentUserContext from "../contexts/CurrentUserContext";

//Импорты API
import { api } from "../utils/Api";
import * as auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupDeleteCardOpen, setIsPopupDeleteCardOpen] = useState(false);
  const [cardIdWithDelete, setCardIdWithDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const history = useHistory();
  const [email, setEmail] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, [history]);

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  function handleUpdateUser({ name, about }) {
    api
      .setEditUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setEditAvatar({ avatar })
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handlePopupDeleteCard(card) {
    setIsPopupDeleteCardOpen(true);
    setCardIdWithDelete(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id, true)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === newCard._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === newCard._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCardMethod(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupDeleteCardOpen(false);
    setSelectedCard(null);
    setInfoToolTipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handlePopupDeleteCard}
            isLoggedIn={isLoggedIn}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit} />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        {isLoggedIn && <Footer />}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupDeleteCard
          cardId={cardIdWithDelete}
          onClose={closeAllPopups}
          isOpen={isPopupDeleteCardOpen}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
