import AuthForm from "./AuthForm";

function Login(props) {
  function handleSubmit(email, password) {
    props.onLogin(email, password);
  }

  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    />
  );
}

export default Login;