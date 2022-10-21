import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Link as ReactLink } from "react-router-dom"
import { Stack, Button, ButtonGroup, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { UserContext } from "../components/context/userContext"
import RegisterForm from "../components/registerForm/registerForm";
import LoginForm from "../components/loginForm/loginForm";
import ResponsiveBreadcrumb from "../components/smallcomponent/responsiveBreadcrumb/responsiveBreadcrumb";

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
        <>
            <ResponsiveBreadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={ReactLink}
                        to="/"
                    >
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={ReactLink}
                        to="#"
                    >
                        {acessLink ? "Login" : "Registrasi"}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </ResponsiveBreadcrumb>

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
        </>
    )
}