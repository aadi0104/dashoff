import React from "react";
import testLoaderImage from "./Loader.gif";
import resultLoaderImage from "./resultLoader.gif";

const Loader = (props) => {
    return (
        <>
            {
                props.type === "test" ?
                    <div className="loader">
                        <div>
                            <img src={testLoaderImage} alt="Loader" />
                            <p>
                                Loading...
                            </p>
                        </div>
                    </div>
                    :
                    <div className="loader">
                        <div>
                            <img src={resultLoaderImage} alt="Loader" />
                            <p>
                                Generating Result...
                            </p>
                        </div>
                    </div>
            }
        </>
    );
}

export default Loader;