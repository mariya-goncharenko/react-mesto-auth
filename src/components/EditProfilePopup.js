import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setAbout(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!name || !about}
      buttonText={"Сохранить"}
    >
      <div className="popup__label">
        <input
          className="popup__input  popup__input_type_name"
          type="text"
          name="nameInput"
          id="nameInput"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
        />
        <span className="nameInput-error error"></span>
      </div>
      <div className="popup__label">
        <input
          className="popup__input  popup__input_type_job"
          type="text"
          name="jobInput"
          id="jobInput"
          minLength="2"
          maxLength="200"
          required
          placeholder="О себе"
          value={about}
          onChange={handleAboutChange}
        />
        <span className="jobInput-error error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
