import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Далее в разметке используем переменную для условного рендеринга
  const deleteButtonClassName = `element__delete-card ${
    isOwn ? "element__delete-card_type_active" : ""
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-photo ${
    isLiked ? "element__like-photo_active" : ""
  }`;

  return (
    <div className="element">
      <button
        className={deleteButtonClassName}
        id="element__delete-card"
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
