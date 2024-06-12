import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        } 
    })



    async function collectData(e) {
        e.preventDefault();
        
        // Clear previous error messages
        setErrorMessage("");

        // Validate form fields
        if (!name || !email || !password) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Log name, email, and password to the console
        console.log(name, email, password);

        let result = await fetch('http://localhost:5000/signup', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-type': 'application/json'
            },
        });

        // Assuming server returns user details along with other information
        result = await result.json();

        // Extract and log the desired response
        const user = { name, email, password };
        console.log(user);
        console.log(result);

        // Store user details in local storage
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Register</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={collectData}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                        autoComplete="name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email Address"
                        autoComplete="email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        autoComplete="current-password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
