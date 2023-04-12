import { useLocation, Link } from "react-router-dom";
import logo from "../image/logo.svg";

function Header(props) {
  const location = useLocation();

  return (
    <div>
      <header className="header header__container ">
        <img className="header__logo" src={logo} alt="Логотип Место" />

        {location.pathname === "/sign-in" && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}

        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}

        {location.pathname === "/" && (
          <div className="header__user-info">
            <p className="header__email">{props.email}</p>
            <Link
              to="/sign-in"
              className="header__link"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
