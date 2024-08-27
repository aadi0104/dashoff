import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { Link } from "react-router-dom";

import logo from "./Untitled-3.png";

const LoggedinNav = ({ name, setTheName }) => {

    const [toggle, setToggle] = useState(false);

    const handleLogout = async () => {
        localStorage.removeItem("loggedin-user");
        setTheName("");
    }

    const handleToggle = () => {
        if (toggle === true) {
            document.getElementById("navtoggle").style.display = "none";
            setToggle(false);
        } else {
            document.getElementById("navtoggle").style.display = "block";
            setToggle(true);
        }
    }
    return (
        <>
            <div className="nav">
                <div className="container-fluid">
                    <Link to="/dashoff"><img src={logo} alt="logo" /></Link>
                    <div className="uppernav">
                        <p onClick={() => handleToggle()}>
                            Hi {name}! <FontAwesomeIcon icon={faCaretDown} />
                        </p>
                        <div id="navtoggle" onClick={() => handleToggle()}>
                            <Link to="/myprofile">
                                <p>
                                    My Profile
                                </p>
                            </Link>
                            <Link to="/changepassword">
                                <p>
                                    Change Password
                                </p>
                            </Link>
                            <Link to="/dashoff" onClick={() => handleLogout()}>
                                <p>
                                    Log Out
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoggedinNav;