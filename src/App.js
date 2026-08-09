import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";
import './styles/styles.css';
import './styles/responsive.css';

const App = observer(() => {
    const { user, cart } = useContext(Context);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const init = async () => {
            try {
                const isAuth = await user.init();
                if (isAuth) {
                    await cart.getCartFromDB();
                } else {
                    cart.getCartFromLSmethod();
                }
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="grow" />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>

    );
});

export default App;


