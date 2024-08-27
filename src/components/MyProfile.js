import axios from "axios";
import React, { useEffect, useState } from "react";
import { myProfile } from "../utils/APIRoutes";

const MyProfile = () => {

    const [scores, setScores] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        const fetchScores = async () => {
            const { data } = await axios.get(myProfile, {
                params: {
                    username: JSON.parse(localStorage.getItem('loggedin-user')).username,
                }
            });
            setFetched(true)
            setScores(data.score);
        }
        fetchScores();
    }, [fetched]);

    return (
        <div className="profile-container">
            <div>
                <h4>
                    Hi {JSON.parse(localStorage.getItem('loggedin-user')).name}!
                </h4>
                <h5>
                    Welcome to your profile.
                </h5>
                <div>
                    <h5>
                        <span>
                            Name:
                        </span>
                        {JSON.parse(localStorage.getItem('loggedin-user')).name}
                    </h5>
                    <h5>
                        <span>
                            Username:
                        </span>
                        {JSON.parse(localStorage.getItem('loggedin-user')).username}
                    </h5>
                    <h5>
                        <span>
                            Scores:
                        </span>
                    </h5>
                    <div>
                        {
                            scores.length === 0 ?
                                <p>No score found!</p>
                                :
                                scores.map((score) => {
                                    return (
                                        <div key={score._id}>
                                            <h6>
                                                <span>Test Duration:</span> {score.time}
                                            </h6>
                                            <h6>
                                                <span>Accuracy:</span> {score.accuracy}
                                            </h6>
                                            <h6>
                                                <span>WPM:</span> {score.wpm} wpm
                                            </h6>
                                            <p>
                                                <span>Time:</span> {score.timedetails}
                                            </p>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;