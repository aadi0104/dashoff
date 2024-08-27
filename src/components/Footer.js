import React from "react";

import logo from "./Untitled-3.png";

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div>
                <h2>
                    <Link to="/dashoff">
                        <img src={logo} alt="logo" />
                    </Link>
                </h2>
                <h4>
                    <Link to="/test">
                        Take a typing speed test!
                    </Link>
                </h4>
                <p>
                    All Right Reserverd&reg;
                </p>
            </div>
        </footer>
    );
}

export default Footer;