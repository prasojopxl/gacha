import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Login from "./common/login";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const [ls, setLs] = useState(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const [disabledDirectAccess, _] = useState(["/page"]);

    useEffect(() => {
        setLs(localStorage);
        setIsAuthenticated(localStorage.getItem("jwtGacha"));
    }, []);

    useEffect(() => {
        if (disabledDirectAccess.includes(router.route)) {
            window.location.href = "/login";
        }
    }, [disabledDirectAccess, router.route]);

    if (isAuthenticated) {
        return <Component ls={ls} {...pageProps} />;
    } else {
        return <Login ls={ls} />;
    }
}

export default MyApp;
