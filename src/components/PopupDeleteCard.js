import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function PopupDeleteCard({ cardId, isOpen, onClose, onCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(cardId);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Да"}
    ></PopupWithForm>
  );
}

export default PopupDeleteCard;
