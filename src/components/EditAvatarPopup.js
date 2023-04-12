import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!avatarRef}
      buttonText={"Сохранить"}
    >
      <div className="popup__label">
        <input
          className="popup__input  popup__input_type_avatar"
          type="url"
          name="AvatarInput"
          id="AvatarInput"
          required
          placeholder="Ссылка на новый аватар"
          ref={avatarRef}
        />
        <span className="AvatarInput-error error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
