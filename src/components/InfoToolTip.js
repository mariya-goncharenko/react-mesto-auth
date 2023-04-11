import SuccessIcon from "../image/success_icon.svg";
import FailIcon from "../image/fail_icon.svg";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__content">
        {props.isSuccess ? (
          <>
            <img
              src={`${SuccessIcon}`}
              alt="Регистрация прошла успешно."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${FailIcon}`}
              alt="Регистрация не была выполнена."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}

        <button type="button" className="popup__close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoToolTip;