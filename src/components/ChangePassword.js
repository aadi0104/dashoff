import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { changePassword } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

    const navigate = useNavigate();

    const toastObject = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const [values, setValues] = useState({
        oldpassword: "",
        newpassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidate() === true) {
            const { oldpassword, newpassword } = values;
            const { username } = JSON.parse(localStorage.getItem("loggedin-user"));
            try {
                const { data } = await axios.post(`${changePassword}`, {
                    username,
                    oldpassword,
                    newpassword,
                });
                if (data.status === false) {
                    toast.error(data.message, toastObject);
                }
                if (data.status === true) {
                   navigate("/");
                }
            } catch (error) {
            }
        }
    }

    const handleValidate = () => {
        const { oldpassword, newpassword } = values;
        if (oldpassword === "") {
            toast.error("Old Password is required!", toastObject);
            return false;
        }
        if (newpassword === "") {
            toast.error("New Password is required!", toastObject)
            return false;
        }
        if (newpassword.length < 8) {
            toast.error("Password should be more 8 characters!", toastObject)
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
                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div>
                            <label>Old Password</label>
                            <input type="password" name="oldpassword" placeholder="Username" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <label>New Password</label>
                            <input type="password" name="newpassword" placeholder="Password" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <button type="submit" >Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default ChangePassword;