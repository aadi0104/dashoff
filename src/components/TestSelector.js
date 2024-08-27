import React from "react";
import { Link } from "react-router-dom";

const TestSelector = () => {

    return (
        <div className="container test-selector-content">
            <div>
                <h3>
                    Take the Typing test.
                </h3>
                <p>
                    Choose the duration of the typing test from the following set of choices.
                </p>
                <div className="row time-container">
                    <div className="col-md">
                        <p>1:00 min</p>
                        <Link to="/test/1-min">
                            <button>
                                Take 1-min test
                            </button>
                        </Link>
                    </div>
                    <div className="col-md">
                        <p>3:00 min</p>
                        <Link to="/test/3-min">
                            <button>
                                Take 3-min test
                            </button>
                        </Link>
                    </div>
                    <div className="col-md">
                        <p>5:00 min</p>
                        <Link to="/test/5-min">
                            <button>
                                Take 5-min test
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestSelector;