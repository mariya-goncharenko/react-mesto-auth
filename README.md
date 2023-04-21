# Проект: Место-React-Auth. Создано в рамках курса Интерфейсы с использованием React.

## Выполнила студентка 60 кагорты Мария Гончаренко.

### Описание проектной работы:

В данной проектной работе требовалось переписать уже существующий проект "Место" (https://github.com/mariya-goncharenko/mesto) с помощью технологии Create React App.

При работе с функциональными компонентами были использованы хуки "React.useState","React.useContext","React.useRef", "React.useHistory".
Добавлена подписка на контекст. В 12ПР была реализована регистрация и авторизация пользователей.

Все запросы на авторизацию, регистрацию и проверку токена работают через сервис `https://auth.nomoreparties.co`. Остальные запросы, не относящиеся к этой проектной работе были взяты из предыдущих спринтов.

Мной была партирована разметка и стили из прошлого проекта. HTML код был конвертирован в JSX.
Были созданы функциональные компоненты и переданы в App.js:
Card.js
Header.js
Main.js
Register.js
Login.js
ImagePopup.js
PopupWithForm.js
AddPlacePopup.js
EditAvatarPopup.js
EditProfaile.js
PopupDeleteCard.js
InfoToolTip.js
Footer.js

В проекте реализована работа с разными API. 

Все фотографии на данном сайте взяты с сервера, который предоставляет Я.Практикум и владельцев каждой карточки можно найти по уникальному токену.

В планах добавить мобильное меню, закрытие поп-ап окон по оверлею и при нажатии на клавишу Escape.