import React, { useEffect, useState } from "react";
import LoggedoutNav from "./LoggedoutNav";
import LoggedinNav from "./LoggedinNav";

const Navbar = () => {

    const [name, setName] = useState("");

    const setTheName = (val) => {
        setName(val);
    }

    useEffect(() => {
        const handleGetUserDetails = async () => {
            try {
                const logindata = JSON.parse(localStorage.getItem('loggedin-user'));
                setName(logindata.name);
            } catch (error) {
                setName("");
            }

        }
        handleGetUserDetails();
    }, []);

    return (
        <>
            {
                name === "" ?
                    <LoggedoutNav /> :
                    <LoggedinNav name={name} setTheName={setTheName} />
            }
        </>
    );
}

export default Navbar;