
import { Stack, Flex, FormControl, FormHelperText, FormErrorMessage, Input, Button, Text } from "@chakra-ui/react";
export default function RegisterForm({setEmail, setUsername, setPassword, registerFormSubmitHandler}) {

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            registerFormSubmitHandler();
        }}>
            <Flex justify={"center"}>
                <Stack w={"full"} gap={"2"}>
                    <Flex justify={"center"}><Text fontWeight={"bold"} fontSize={"2xl"}>Registrasi</Text></Flex>
                    <FormControl>
                        <Input type={"email"} placeholder={"Email"} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </FormControl>
                    <FormControl>
                        <Input type={"text"} placeholder={"Username"} onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                    </FormControl>
                    <FormControl>
                        <Input type={"password"} placeholder={"Password"} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </FormControl>
                    <Button colorScheme={"green"} type={"submit"}>Bergabung</Button>
                </Stack>
            </Flex>
        </form>
    )

}