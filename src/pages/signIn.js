import { useContext, useState } from "react";
import { Stack, Flex, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { UserContext } from "../components/context/userContext"
import SearchBar from "../components/searchbar/searchbar";
import RegisterForm from "../components/registerForm/registerForm";
import LoginForm from "../components/loginForm/loginForm";
import AuthRerouter from "../components/smallcomponent/authRerouter/authRerouter";

export default function SignIn() {
    const linkTarget = window.location.href.split("/");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [acessLink, setAcessLink] = useState(linkTarget[linkTarget.length - 1] === "login" ? true : false);
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

    return (
        <AuthRerouter>
            <Stack bgColor={"gray.100"} align={"center"} minW={"100%"}>
                <SearchBar />
                <Stack gap={"0px"} bgColor={"white"} p={"25px"} w={'full'} className={"responsiveWidthSmaller"}>
                    <ButtonGroup spacing={"0px"}>
                        <Button isActive={acessLink ? true : false} flexGrow={"1"} borderRadius={"0px"} onClick={(e) => {
                            clearState();
                            setAcessLink(true)
                        }}>Login</Button>
                        <Button isActive={acessLink ? false : true} flexGrow={"1"} borderRadius={"0px"} onClick={(e) => {
                            clearState();
                            setAcessLink(false)
                        }}>Registrasi</Button>
                    </ButtonGroup>
                    {
                        acessLink ?
                            <LoginForm setUsername={setUsername} setPassword={setPassword} loginFormSubmitHandler={loginFormSubmitHandler} />
                            :
                            <RegisterForm setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} registerFormSubmitHandler={registerFormSubmitHandler} />
                    }
                </Stack>
            </Stack>
        </AuthRerouter>
    )
}