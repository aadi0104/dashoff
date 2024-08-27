import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { signup } from "../utils/APIRoutes";

const Signup = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        username: "",
        password: "",
        confirmpassword: "",
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
            try {
                const { name, username, password } = values;
                const { data } = await axios.post(signup, {
                    name,
                    username,
                    password,
                });
                if (data.status === false) {
                    toast.error(data.message, toastObject);
                }
                if (data.status === true) {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleValidation = () => {
        const { name, username, password, confirmpassword } = values;
        if (name === "") {
            toast.error("Name is required!", toastObject);
            return false;
        }
        if (username === "") {
            toast.error("Username is required!", toastObject);
            return false;
        }
        if (password === "") {
            toast.error("Password is required!", toastObject);
            return false;
        }

        if (password.length < 8) {
            toast.error("Password should be more 8 characters!", toastObject);
            return false;
        }

        if (confirmpassword === "") {
            toast.error("Confirm Password is required!", toastObject);
            return false;
        }
        if (password !== confirmpassword) {
            toast.error("Password and confirm password does not match!", toastObject);
            return false;
        }

        if (/[A-Z\W]/.test(username)) {
            toast.error("Username should be lowercase!", toastObject);
            return false;
        }
        return true;
    }

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container login-content">
                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Name" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input type="text" name="confirmpassword" placeholder="Confirm Password" onChange={(e) => handleChange(e)} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <button type="submit">Signup</button>
                            <p>Existing user? <Link to="/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Signup;