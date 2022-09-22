
import { Stack, Flex, FormControl, FormHelperText, FormErrorMessage, Input, Button, Text } from "@chakra-ui/react";
export default function LoginForm({setUsername, setPassword, loginFormSubmitHandler}) {

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            loginFormSubmitHandler();
        }}>
            <Flex justify={"center"}>
                <Stack w={'full'} gap={"2"}>
                    <Flex justify={"center"}><Text fontWeight={"bold"} fontSize={"2xl"}>Login</Text></Flex>
                    <FormControl>
                        <Input type={"text"} placeholder={"Username"} required={true} isRequired={true} onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                    </FormControl>
                    <FormControl>
                        <Input type={"password"} placeholder={"Password"} required={true} isRequired={true} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </FormControl>
                    <Button colorScheme={"green"} type={"submit"}>Masuk</Button>
                </Stack>
            </Flex>
        </form>
    )

}