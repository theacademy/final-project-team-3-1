import { useState } from "react";
import './SignUp.css'

function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSeller, setIsSeller] = useState("")

    function handleSubmitClick(event) {
        event.preventDefault();
        const url  = "http://127.0.0.1:8080/users/sign-up"
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                isSeller
            })
        })
            .then((response) => response.json())
            .then(data => {
                // TODO: Enable redirect routing
                // this.setState({ ...this.state, bearer: data['access_token'] })
                localStorage.setItem("access_token", data['access_token']);
                // window.location.replace(`${window.location.origin}/`);
            })
    }

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <form className="sign-up-form">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" onChange={(e) => setFirstName(e.target.value)}/>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" onChange={(e) => setLastName(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                <label htmlFor="isSeller">
                    Seller
                    <input id="isSeller" type="checkbox" name="isSeller" onChange={(e) => setIsSeller(e.target.value)}/>
                </label>
            <button type="button" onClick={(e) => handleSubmitClick(e)}>Submit</button>
        </form>
        </div>
    );
}

export default SignUp;
