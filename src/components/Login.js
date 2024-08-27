import React, { useState } from "react";
import axios from "axios";
import { login } from "../utils/APIRoutes";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const toastObject = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation() === true) {
            const { username, password } = values;
            try {
                const { data } = await axios.post(login, {
                    username, password,
                });
                if (data.status === false) {
                    toast.error(data.message, toastObject)
                }

                if (data.status === true) {
                    localStorage.setItem("loggedin-user", JSON.stringify(data.userDetail));
                    window.location.href = "/dashoff";
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleValidation = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Username is required!", toastObject);
            return false;
        }
        if (password === "") {
            toast.error("Password is required!", toastObject);
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container login-content">
                <div className="mx-auto">
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div>
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <button type="submit" >Login</button>
                            <p>New user? <Link to="/signup" >Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;