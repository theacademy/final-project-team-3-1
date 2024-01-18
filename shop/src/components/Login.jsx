import { useState } from "react";
import './Login.css'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    function handleSubmitClick() {

    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form">
                <label htmlFor="email">Email</label>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="button" onClick={(e) => handleSubmitClick()}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
