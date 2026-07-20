import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

// import './scss/app.scss';
import './styles/styles.css';
import './styles/responsive.css';
import HeaderBottomBar from "./components/BurgerMenuNav";



const App = observer(() => {
    const { user } = useContext(Context)
    const { cart } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check()
            .catch(
                function (error) {
                    // выполнение сразу перейдет сюда
                    console.log(error);
                    console.log(cart.items);
                    // cart.getCartFromLS();
                }
            )
            .then(data => {
                // user.setUser();
                // user.setUser(true);
                if (data) {
                    user.setIsAuth(true);
                    user.setUser(data);
                    cart.getCartFromDB(user.user.id);
                };
                // user.setIsAuth()
            })
            .finally(() => setLoading(false))
            
    }, [])

    useEffect(() => {
        if (user.isAuth == false) {
        } else {
            check()
                .catch(
                    function (error) {
                        // выполнение сразу перейдет сюда
                        console.log(error);
                    }
                )
                .then(
                    data => {
                        if (data) {
                            user.setUser(data);
                            cart.getCartFromDB(user.user.id);
                        }
                    }
                )
        }
    }, [user.isAuth])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>

    );
});

export default App;


