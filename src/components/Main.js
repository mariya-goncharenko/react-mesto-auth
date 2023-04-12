import React from "react";
import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  //Для информации о пользователе:
  const currentUser = useContext(CurrentUserContext);

  const cardElements = props.cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={props.onCardClick}
      onCardDelete={props.onCardDelete}
      onCardLike={props.onCardLike}
    />
  ));

  return (
    <>
      <main>
        {/*Информация о пользователе*/}
        <section className="profile">
          <div className="profile__avatar-container">
            <button
              className="profile__edit-avatar"
              type="button"
              aria-label="Изменить аватар"
              onClick={props.onEditAvatar}
            ></button>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Ваша фотография"
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
            <button
              className="profile__edit-profile"
              type="button"
              aria-label="Изменить данные профиля"
              onClick={props.onEditProfile}
            ></button>
          </div>

          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить карточку"
            onClick={props.onAddPlace}
          ></button>
        </section>

        {/*Карточки с фотографиями*/}
        <section className="elements">{cardElements}</section>
      </main>
    </>
  );
}

export default Main;
