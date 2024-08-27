import React from "react";

import { Link } from "react-router-dom";

import logo from "./Untitled-3.png";

const LoggedoutNav = ({ setTheName }) => {

    return (
        <>
            <div className="logged-out">
                <ul className="container mx-auto">
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="nav">
                <div className="container-fluid">
                    <Link to="/dashoff"><img src={logo} alt="logo" /></Link>
                </div>
            </div>
        </>
    );
}

export default LoggedoutNav;