
import { Stack, Flex, FormControl, FormHelperText, FormErrorMessage, Input, Button, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
export default function RegisterForm({ setEmail, setUsername, setPassword, registerFormSubmitHandler }) {

    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const emailInputRef = useRef();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            registerFormSubmitHandler();
        }}>
            <Flex justify={"center"}>
                <Stack w={"full"} gap={"2"}>
                    <Flex justify={"center"}><Text fontWeight={"bold"} fontSize={"2xl"}>Registrasi</Text></Flex>
                    <FormControl isRequired={true} isInvalid={isEmailInvalid}>
                        <Input type={"email"} placeholder={"Email"} ref={emailInputRef} onChange={(e) => {
                            setIsEmailInvalid(e.target.value.trim().length < 1 ? true : false)
                            setEmail(e.target.value)
                        }} />

                        {
                            isEmailInvalid ?
                                <FormErrorMessage>
                                    Email tidak boleh kosong!
                                </FormErrorMessage>
                                :
                                ""
                        }
                    </FormControl>
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
                        setIsEmailInvalid(emailInputRef.current.value.trim().length < 1 ? true : false)
                    }}>Bergabung</Button>
                </Stack>
            </Flex>
        </form>
    )

}