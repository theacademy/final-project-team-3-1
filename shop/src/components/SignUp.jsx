import { useState } from "react";
import './SignUp.css'

function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [seller, setSeller] = useState("")

    function handleSubmitClick() {

    }

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <form className="sign-up-form">
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" type="text" onChange={(e) => setFirstName(e.target.value)}/>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" type="text" onChange={(e) => setLastName(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input name="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                <label htmlFor="seller">
                    Seller
                    <input type="checkbox" name="seller" onChange={(e) => setSeller(e.target.value)}/>
                </label>
            <button type="button" onClick={(e) => handleSubmitClick()}>Submit</button>
        </form>
        </div>
    );
}

export default SignUp;
