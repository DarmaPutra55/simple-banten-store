import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Stack, Button, ButtonGroup } from "@chakra-ui/react";
import { UserContext } from "../components/context/userContext"
import SearchBar from "../components/searchbar/searchbar";
import RegisterForm from "../components/registerForm/registerForm";
import LoginForm from "../components/loginForm/loginForm";

export default function SignIn() {
    const navigation = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [acessLink, setAcessLink] = useState(location.pathname.includes("login") ? true : false);
    const { register, login } = useContext(UserContext);

    const registerFormSubmitHandler = () => {
        register(email, username, password);
    }

    const loginFormSubmitHandler = () => {
        login(username, password);
    }

    const clearState = () => {
        setUsername("");
        setPassword("");
        setEmail("");
    }

    useEffect(() => {
        setAcessLink(location.pathname.includes("login") ? true : false);
        clearState();
    }, [location])

    return (
        <Stack gap={"0px"} bgColor={"white"} p={"25px"} w={'full'} className={"responsiveWidthSmaller"}>
            <ButtonGroup spacing={"0px"}>
                <Button isActive={acessLink ? true : false} flexGrow={"1"} borderRadius={"0px"} onClick={(e) => {
                    navigation("/login")
                }}>Login</Button>
                <Button isActive={acessLink ? false : true} flexGrow={"1"} borderRadius={"0px"} onClick={(e) => {
                    navigation("/register")
                }}>Registrasi</Button>
            </ButtonGroup>
            {
                acessLink ?
                    <LoginForm setUsername={setUsername} setPassword={setPassword} loginFormSubmitHandler={loginFormSubmitHandler} />
                    :
                    <RegisterForm setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} registerFormSubmitHandler={registerFormSubmitHandler} />
            }
        </Stack>
    )
}