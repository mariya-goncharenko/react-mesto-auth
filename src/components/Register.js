import AuthForm from "./AuthForm";

function Register(props) {
  function handleSubmit(email, password) {
    props.onRegister(email, password);
  }

  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    />
  );
}

export default Register;
