import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {
    NavLink, useLocation,
    // useHistory,
    useNavigate
} from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
// import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const Auth = observer(() => {
    // const { user } = useContext(Context)
    // const { cart } = useContext(Context)
    const { user, cart } = useContext(Context);
    const location = useLocation()
    // console.log(location);
    // const history = useHistory()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    // const signIn = async () => {
    //     const response = await registration() 
    //     console.log(response)
    // }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            // let data;
            if (isLogin) {
                // data = await login(email, password);
                await user.login(email, password);
            } else {
                // data = await registration(email, password);
                await user.register(email, password);
            }
            // user.setUser(data)
            // user.setIsAuth(true)
            // await cart.getCartFromDB();
            await cart.syncLocalCartToDB();

            navigate(SHOP_ROUTE);
        } catch (e) {
            console.error(e);
            alert(e.response?.data?.message || 'Помилка авторизації');
        }
    }

    return (
        <Container
            className="Auth   d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5" >
                <h2 className="m-auto">{isLogin ? 'Авторизація' : "Реєстрація"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть  ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть  ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Немає акаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструйтеся!</NavLink>
                            </div>
                            :
                            <div>
                                Вже маєте акаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            className="mt-3 align-self-end"
                            onClick={click}
                        >
                            {isLogin ? 'Увійти' : 'Зареєструватися'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});
export default Auth;
