import React, { useEffect, useRef, useState } from "react";
import { result, test } from "../utils/APIRoutes";
import axios from "axios";
import Loader from "./Loader";

import { useNavigate } from "react-router-dom";

const StartTest = (props) => {

    const ref = useRef();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [time, setTime] = useState(`0${props.url[0]}:00`);

    const [paragraph, setParagraph] = useState(" ");

    const [correct, setCorrect] = useState("");
    const [incorrect, setIncorrect] = useState("");
    const [remaining, setRemaining] = useState("");
    const [mistakes, setMistakes] = useState(0);

    const [loggedin, setLoggedin] = useState(false);

    const [remainingTime, setRemainingTime] = useState();

    useEffect(() => {
        const handleFetchParagraph = async () => {
            const response = await axios.get(`${test}/${props.url}`);
            const para = await response.data.paragraph;
            if (JSON.parse(localStorage.getItem('loggedin-user'))) {
                setLoggedin(true);
            }
            setParagraph(para);
            setRemaining(para);
            setIsLoading(false);
        }
        handleFetchParagraph();
    }, [props.url]);

    useEffect(() => {
        const Timer = () => {
            var time = props.url[0];
            var seconds = 0;
            setInterval(function () {
                if (time === 0 && seconds === 0) {
                    setRemainingTime(0);
                } else {
                    var d = time;
                    var lefttime = 60 * d + seconds;
                    lefttime -= 1;
                    time = Math.floor(lefttime / 60);
                    seconds = lefttime - time * 60;
                    if (seconds < 10) {
                        setTime(`0${time}:0${seconds}`);
                    }
                    else {
                        setTime(`0${time}:${seconds}`);
                    }
                }
            }, 1000);
        }
        Timer();
    }, [navigate, props.url]);

    useEffect(() => {
        const handleSubmit = async () => {
            if (correct.length === paragraph.length || remainingTime === 0) {
                if (loggedin === true) {
                    const { data } = await axios.post(result, {
                        correct,
                        mistakes,
                        timespan: props.url[0],
                        username: JSON.parse(localStorage.getItem('loggedin-user')).username,
                    });
                    if (data.status === true) {
                        navigate("/test/result");
                    }
                }
                else {
                    const testData = {
                        correct,
                        mistakes,
                        timespan: props.url[0],
                        username: "User",
                    }
                    localStorage.setItem("userScore", JSON.stringify(testData));
                    navigate("/test/result");
                }
            }
        }
        handleSubmit();
    }, [correct, paragraph, remainingTime, props.url, mistakes, loggedin, navigate]);

    const handleChange = (e) => {
        if (correct.length === paragraph.length || remainingTime === 0) {
            setRemainingTime(0);
        } else {
            if (incorrect === "") {
                let typedValue = e.target.value;
                const typedLength = typedValue.length;
                const correctString = paragraph.slice(0, typedLength);
                if (typedValue === correctString) {
                    setCorrect(typedValue);
                    setRemaining(paragraph.slice(correct.length + 1));
                }
                if (typedValue !== correctString) {
                    let mistake = mistakes;
                    mistake += 1;
                    setMistakes(mistake);
                    setIncorrect(typedValue.slice(-1));
                    setRemaining(paragraph.slice(correct.length + 1));
                }
            }
            else {
                let typedValue = e.target.value;
                const typedLength = typedValue.length;
                const correctString = paragraph.slice(0, typedLength);
                if (typedValue === correctString) {
                    setIncorrect("");
                    setRemaining(paragraph.slice(correct.length));
                }
                else {
                    e.target.value = correct + incorrect;
                }
            }
        }
    }

    const scrollToElement = () => {
        const { current } = ref;
        if (current !== undefined) {
            current.scrollIntoView({ block: "center", behavior: "instant" });
        }
    }

    useEffect(() => {
        scrollToElement();
    }, [correct]);

    const handleInputFocus = () => {
        document.getElementById("inputref").focus();
    }

    return (
        <>
            {isLoading ?
                <Loader type="test" />
                :
                <>
                    <div className="time">
                        <p id="test">
                            Time: {time}
                        </p>
                    </div>
                    <div className="start-test-content">
                        <div className="container start-content">
                            <div>
                                <p onClick={() => handleInputFocus()}>
                                    <span className="correct">
                                        {correct}
                                    </span>
                                    <span className="incorrect" ref={ref}>
                                        {incorrect}
                                    </span>
                                    <span>
                                        {remaining}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <form>
                            <input type="text" id="inputref" onKeyUp={(e) => handleChange(e)} autoFocus />
                        </form>
                    </div>
                </>
            }
        </>
    );
}

export default StartTest;