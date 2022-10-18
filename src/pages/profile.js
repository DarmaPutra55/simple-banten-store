import { Stack, Flex, Avatar, Divider, Link, Text, Button, ButtonGroup, Input, HStack, FormControl } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { Link as ReactLink } from "react-router-dom";
import { UserContext } from "../components/context/userContext";
import SearchBar from "../components/searchbar/searchbar";
import PlainButtonLink from "../components/smallcomponent/plainLink/plainButtonLink";

export default function Profile() {
    const { user } = useContext(UserContext)
    const inputFileRef = useRef();
    const handleFileUploadClick = (e) => {
        e.preventDefault();
        inputFileRef?.current.click();
    }
    return (
        <Stack minW={"100%"} align={"center"} backgroundColor={"gray.100"}>
            <SearchBar />
            <Stack className="responsiveWidth" bgColor={"white"} p={"2rem"} spacing={"5"}>
                <Flex
                    justify={"center"}
                    align={"center"}
                    direction={"column"}
                    gap={"8px"}
                >
                    <Avatar name={user?.id ? user.username : ""} boxSize={"15rem"} size={"2xl"} />
                </Flex>
                <Divider />
                <Stack w={"full"}>
                    <Text fontSize={"xl"}>Username: {user?.username}</Text>
                    <HStack>
                        <Text fontSize={"xl"}>Avatar: </Text>
                        <Button onClick={handleFileUploadClick}>Upload avatar</Button>
                        <Input accept={".png, .jpg, .jpeg"} type={"file"} ref={inputFileRef} hidden />
                    </HStack>

                    <Flex
                        justify={"flex-end"}
                    >
                        <Button>Lihat transaksi</Button>
                    </Flex>
                </Stack>
            </Stack>
        </Stack>
    )
}