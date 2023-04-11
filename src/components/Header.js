import { Switch, Route, Link } from "react-router-dom"
import logo from "../image/logo.svg";
import burgerMenu from "../image/burger_menu.svg"
import closeMenu from "../image/close_mobile_menu.svg"
import MobileMenu from "./MobileMenu"


function Header(props) {
  return (
    <div>
      <MobileMenu
        email={props.email}
        handleLogout={props.onSignOut}
        isMobileMenuOpen={props.isMobileMenuOpen}
      />
      <header className="header page__header mobile-menu__header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
        <Switch>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route exact path="/">
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
          </Route>
        </Switch>
        {props.isLoggedIn && (
          <button
            className="header__burger"
            type="button"
            onClick={props.handleClickOpenMobileMenu}
            style={{
              backgroundImage: `url(${
                props.isMobileMenuOpen ? closeMenu : burgerMenu
              })`,
            }}
          ></button>
        )}
      </header>
    </div>
  )
}

export default Header;
