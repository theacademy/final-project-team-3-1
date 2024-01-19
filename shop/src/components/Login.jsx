import { useState } from "react";
import './Login.css'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    function handleSubmitClick(event) {
        event.preventDefault();
        const url = "http://127.0.0.1:8080/authenticate"
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: email,
                password: password
            })
        })
            .then((response) => response.json())
            .then(data => {
                // TODO: Enable redirect routing
                // this.setState({ ...this.state, bearer: data['accessToken'] })
                localStorage.setItem("shop_access_token", data['accessToken']);
            })
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form">
                <label htmlFor="email">Email</label>
                <input name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="button" onClick={(e) => handleSubmitClick(e)}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
