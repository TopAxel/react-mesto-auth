import React from "react";

function Login(props) {
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
        props.onLogin(email, password);
    }

    return (
        <section className="registration">
            <h2 className="registration__title">Вход</h2>
            <form className="registration__form" onSubmit={handleSubmit}>
                <input className="registration__field" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required />
                <input className="registration__field" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required />
                <button className="registration__submit-button" type="submit">Войти</button>
            </form>
        </section>
    );
}

export default Login;