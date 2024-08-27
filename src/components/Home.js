import React from "react";
import typingman from "../typingman.png";
import { faBrain, faClockRotateLeft, faKeyboard, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row py-5 my-2 mx-auto first-section">
                        <div className="col-sm mx-auto">
                            <div>
                                <h4>
                                    Advantages of using our services:
                                </h4>
                                <ul>
                                    <li>
                                        Helps you evaluate your current typing abilities.
                                    </li>
                                    <li>
                                        Set goals for improvement.
                                    </li>
                                    <li>
                                        Track your progress over time.
                                    </li>
                                    <li>
                                        Substantial increase in productivity.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm mx-auto">
                            <div style={{ textAlign: "center" }}>
                                <img src={typingman} alt="typing-image" />
                            </div>
                            <div className="white-container">
                                <h5>
                                    Practice Typing
                                </h5>
                                <h6>
                                    Get yourself registered and keep tracking the increase in your typing speed.
                                    So, take the typing speed test now!
                                </h6>
                                <Link to="/test">
                                    <p>
                                        Start Test
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-inclined"></div>
            </section>
            <div className="container">
                <div className="row py-5 my-4 font-container">
                    <div className="col-sm">
                        <p>
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                        </p>
                        <h5>
                            Tracking History
                        </h5>
                    </div>
                    <div className="col-sm">
                        <p>
                            <FontAwesomeIcon icon={faUserTie} />
                        </p>
                        <h5>
                            Career Preperation
                        </h5>
                    </div>
                    <div className="col-sm">
                        <p>
                            <FontAwesomeIcon icon={faKeyboard} />
                        </p>
                        <h5>
                            Professional Typing practice
                        </h5>
                    </div>
                    <div className="col-sm">
                        <p>
                            <FontAwesomeIcon icon={faBrain} />
                        </p>
                        <h5>
                            Good UI & UX
                        </h5>
                    </div>
                </div>
            </div>
            <div className="left-inclined"></div></>
    );
}

export default Home;