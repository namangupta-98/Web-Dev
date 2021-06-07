 import React, { useState, useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../actions/auth";
import Preloader from "./Preloader";

const Private = ({ children }) => {
    const [ok, setOK] = useState(false);
    useEffect(() => {
        if (!isAuth()) {
            Router.push(`/login`);
        }else{
            setOK(true);
        }
    }, []);
    return <React.Fragment>{ok ? children : <Preloader />}</React.Fragment>
}

export default Private;