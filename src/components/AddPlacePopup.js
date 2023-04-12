import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!name || !link}
      buttonText={"Создать"}
    >
      <div className="popup__label">
        <input
          className="popup__input  popup__input_type_img"
          type="text"
          name="imgInput"
          id="imgInput"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название места"
          value={name}
          onChange={handleNameChange}
        />
        <span className="imgInput-error error"></span>
      </div>
      <div className="popup__label">
        <input
          className="popup__input  popup__input_type_link"
          type="url"
          name="linkInput"
          id="linkInput"
          required
          placeholder="Ссылка на изображение"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="linkInput-error error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
