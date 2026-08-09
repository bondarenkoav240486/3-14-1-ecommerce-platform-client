import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
// import { HashRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
// import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

// import './scss/app.scss';
import './styles/styles.css';
import './styles/responsive.css';
// import HeaderBottomBar from "./components/BurgerMenuNav";



const App = observer(() => {
    // const { user } = useContext(Context)
    // const { cart } = useContext(Context)
    const { user, cart } = useContext(Context);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const init = async () => {
            try {
                const isAuth = await user.init();
                if (isAuth) {
                    // user.setUser(data);
                    // user.setIsAuth(true);
                    await cart.getCartFromDB();
                } else {
                    cart.getCartFromLSmethod();
                }
            // } catch (e) {
                // console.log(e);
                // user.setUser({});
                // user.setIsAuth(false);
                // cart.getCartFromLSmethod();

            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    // useEffect(() => {
    //     check()
    //         .catch(
    //             function (error) {
    //                 // выполнение сразу перейдет сюда
    //                 console.log(error);
    //                 console.log(cart.items);
    //                 // cart.getCartFromLS();
    //             }
    //         )
    //         .then(data => {
    //             // user.setUser();
    //             // user.setUser(true);
    //             if (data) {
    //                 user.setIsAuth(true);
    //                 user.setUser(data);
    //                 cart.getCartFromDB();
    //                 // user.setUser(data);

    //                 // cart.syncLocalCartToDB();
    //                 // user.setIsAuth(true);

    //             };
    //             // user.setIsAuth()
    //             user.setIsAuth(true);

    //         })
    //         .finally(() => setLoading(false))

    // }, [])
    // useEffect(() => {
    //     const init = async () => {
    //         try {
    //             const data = await check();

    //             if (data) {
    //                 user.setUser(data);
    //                 user.setIsAuth(true);

    //                 await cart.syncLocalCartToDB();
    //                 await cart.syncLocalCartToDB();
    //             }

    //         } catch (e) {
    //             console.log(e);

    //             user.setUser({});
    //             user.setIsAuth(false);

    //             cart.getCartFromLSmethod();

    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     init();
    // }, []);

    // useEffect(() => {
    //     if (user.isAuth == false) {

    //     } else {
    //         check()
    //             .catch(
    //                 function (error) {
    //                     // выполнение сразу перейдет сюда
    //                     console.log(error);
    //                 }
    //             )
    //             .then(
    //                 data => {
    //                     if (data) {
    //                         // user.setUser(data);
    //                         // cart.getCartFromDB();
    //                     }
    //                 }
    //             )
    //     }
    // }, [user.isAuth])

    // useEffect(() => {
    //     const init = async () => {
    //         await user.init(cart);
    //         setLoading(false);
    //     };
    //     init();
    // }, []);

    // useEffect(() => {
    //     const init = async () => {
    //         try {
    //             const isAuth = await user.init();

    //             if (isAuth) {
    //                 await cart.syncLocalCartToDB();
    //             } else {
    //                 cart.getCartFromLSmethod();
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     init();
    // }, [user, cart]);

    // if (loading) {
    //     return <Spinner animation={"grow"} />
    // }
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


