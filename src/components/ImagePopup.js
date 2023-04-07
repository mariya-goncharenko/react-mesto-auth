function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_img ${card ? "popup_opened" : ""}`}>
      <figure className="popup__img-container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__img" src={card?.link} alt={card?.name} />
        <figcaption className="popup__img-title">{card?.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
