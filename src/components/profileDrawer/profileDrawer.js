import {
    Text,
    Link,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Avatar,
    Stack,
    Flex,
    Divider,
    Box,
    Button
} from '@chakra-ui/react'
import { useContext } from 'react';

import {
    Link as ReactLink
} from "react-router-dom"

import { UserContext } from "../context/userContext";

export default function ProfileDrawer({ isOpen, onClose }) {
    const { user } = useContext(UserContext)

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent gap={2}>
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>

                <DrawerBody>
                    <Stack w={'full'}>
                        <Flex
                            justify={"center"}
                            align={"center"}
                            direction={"column"}
                            gap={"8px"}
                        >
                            <Avatar name={user?.id ? user.username : ""} size={"2xl"} />
                            <Text fontSize={"2xl"} fontWeight={"bold"}>{user?.id ? user?.username : "Guest"}</Text>
                        </Flex>
                        <Divider />
                        <Stack w={"full"}>
                            {user?.id ?
                                <>
                                    <Link as={ReactLink} to="/" _hover={"none"}>
                                        <Box w={"full"} fontSize={"1.2em"}>
                                            My Profile
                                        </Box>
                                    </Link>
                                    <Button
                                        _hover={{ "bgColor": "transparent" }}
                                        _active={{ "bgColor": "transparent" }}
                                        _focus={{ "bgColor": "transparent" }}
                                        w={"full"}
                                        p={0}
                                        fontSize={"1.2em"}
                                        textAlign={"left"}
                                        bgColor={"transparent"}
                                        justifyContent={"flex-start"}
                                        fontWeight={"normal"}
                                    >
                                        Logout
                                    </Button>
                                </>
                                :
                                <>
                                    <Link as={ReactLink} to="/login" _hover={{}}>
                                        <Box w={"full"} fontSize={"1.2em"}>
                                            Login
                                        </Box>
                                    </Link>
                                    <Link as={ReactLink} to="/register" _hover={{}}>
                                        <Box w={"full"} fontSize={"1.2em"}>
                                            Register
                                        </Box>
                                    </Link>
                                </>
                            }
                        </Stack>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}