import { useState } from "react";
import { Link } from "react-router-dom";

function AuthForm({ title, buttonText, onSubmit, isSubmitting }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          placeholder="Email"
          name="email"
          type="email"
          required
          value={email || ""}
          onChange={handleEmailChange}
          autoComplete="off"
        />
        <input
          className="auth__form-input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={password || ""}
          onChange={handlePasswordChange}
          autoComplete="off"
        />

        <button
          className="auth__form-submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Сохранение..." : buttonText}
        </button>

        <div className="auth__signup">
          <p className="auth__signup_text">
            {title === "Регистрация" ? "Уже зарегистрированы?" : ""}
          </p>
          <Link
            to={title === "Регистрация" ? "sign-in" : "sign-up"}
            className="auth__signup_link"
          >
            {title === "Регистрация" ? "Войти" : ""}
          </Link>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
