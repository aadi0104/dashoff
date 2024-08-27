import React, { useEffect, useState } from "react";
import topStar from "./star.png";
import { result } from "../utils/APIRoutes";
import axios from "axios";
import Loader from "./Loader";

const Result = () => {

    const [wpm, setWpm] = useState("");
    const [accuracy, setAccuracy] = useState("");
    const [time, setTime] = useState("");
    const [timedetails, setTimeDetails] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("User");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (JSON.parse(localStorage.getItem('loggedin-user'))) {
                    const { data } = await axios.get(result, {
                        params: {
                            username: JSON.parse(localStorage.getItem('loggedin-user')).username,
                        }
                    });
                    setName(JSON.parse(localStorage.getItem('loggedin-user')).name);
                    setWpm(data.score.wpm);
                    setAccuracy(data.score.accuracy);
                    setTime(data.score.time);
                    setTimeDetails(data.score.timedetails);
                    setIsLoading(false);
                } else {
                    let wpmData = JSON.parse(localStorage.getItem('userScore')).correct;
                    if (wpmData === "") {
                        setWpm(0);
                        setAccuracy("N/A");
                    }
                    else {
                        wpmData = (wpmData.split(" ").length / Number(JSON.parse(localStorage.getItem('userScore')).timespan)).toFixed(0);
                        setWpm(wpmData);
                        let acc = `${(100 - (JSON.parse(localStorage.getItem('userScore')).mistakes / JSON.parse(localStorage.getItem('userScore')).correct.length) * 100).toFixed(2)}%`;
                        setAccuracy(acc);
                    }
                    setTime(`0${JSON.parse(localStorage.getItem('userScore')).timespan}:00 min`);
                    setTimeDetails(Date(Date.now()).toString().slice(0, 24));
                    setIsLoading(false);
                    localStorage.removeItem("userScore");
                }
            } catch (error) {
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {
                isLoading ?
                    <Loader type="result" />
                    :
                    <div className="result-container">
                        <div>
                            <div>
                                <img src={topStar} alt="star-image" className="img-fluid" />
                                <h1>
                                    Congratulations!
                                </h1>
                            </div>
                            <h3>
                                Well Done {name}!
                            </h3>
                            <h4>
                                Check out your score,
                            </h4>
                            <div className="score">
                                <h5>
                                    <span>Test Duration:</span> {time}
                                </h5>
                                <h5>
                                    <span>Accuracy:</span> {accuracy}
                                </h5>
                                <h5>
                                    <span>WPM:</span> {wpm} wpm
                                </h5>
                                <p>
                                    <span>Time:</span> {timedetails}
                                </p>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default Result;