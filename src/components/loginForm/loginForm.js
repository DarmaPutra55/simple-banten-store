
import { Stack, Flex, FormControl, FormHelperText, FormErrorMessage, Input, Button, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
export default function LoginForm({ setUsername, setPassword, loginFormSubmitHandler }) {
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            loginFormSubmitHandler();
        }}>
            <Flex justify={"center"}>
                <Stack w={'full'} gap={"2"}>
                    <Flex justify={"center"}><Text fontWeight={"bold"} fontSize={"2xl"}>Login</Text></Flex>
                    <FormControl isRequired={true} isInvalid={isUsernameInvalid}>
                        <Input type={"text"} placeholder={"Username"} ref={usernameInputRef} onChange={(e) => {
                            setIsUsernameInvalid(e.target.value.trim().length < 1 ? true : false)
                            setUsername(e.target.value)
                        }} />

                        {
                            isUsernameInvalid ?
                                <FormErrorMessage>
                                    Username tidak boleh kosong!
                                </FormErrorMessage>
                                :
                                ""
                        }
                    </FormControl>
                    <FormControl isRequired={true} isInvalid={isPasswordInvalid}>
                        <Input type={"password"} placeholder={"Password"} ref={passwordInputRef} onChange={(e) => {
                            setIsPasswordInvalid(e.target.value.trim().length < 1 ? true : false)
                            setPassword(e.target.value)
                        }} />
                        {
                            isPasswordInvalid ?
                                <FormErrorMessage>
                                    Password tidak boleh kosong!
                                </FormErrorMessage>
                                :
                                ""
                        }
                    </FormControl>
                    <Button colorScheme={"green"} type={"submit"} onClick={(e) => {
                        setIsUsernameInvalid(usernameInputRef.current.value.trim().length < 1 ? true : false)
                        setIsPasswordInvalid(passwordInputRef.current.value.trim().length < 1 ? true : false)
                    }}>Masuk</Button>
                </Stack>
            </Flex>
        </form>
    )

}