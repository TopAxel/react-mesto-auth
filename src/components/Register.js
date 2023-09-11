import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <section className="registration">
            <h2 className="registration__title">Регистрация</h2>
            <form className="registration__form" onSubmit={handleSubmit}>
                <input className="registration__field" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required />
                <input className="registration__field" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required />
                <button className="registration__submit-button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="registration__text">Уже зарегистрированы? <Link to="/sign-in" className="registration__link">Войти</Link> </p>
        </section>
    );
}

export default Register;