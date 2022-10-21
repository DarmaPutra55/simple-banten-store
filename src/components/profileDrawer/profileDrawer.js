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
import PlainButtonLink from '../smallcomponent/plainLink/plainButtonLink';

export default function ProfileDrawer({ isOpen, onClose }) {
    const { user, logout } = useContext(UserContext)

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
                            <Text fontSize={"2xl"} fontWeight={"bold"}>{user?.id ? user.username : "Guest"}</Text>
                        </Flex>
                        <Divider />
                        <Stack w={"full"}>
                            {user?.id ?
                                <>
                                    <Link as={ReactLink} to="/profile" _hover={{}} fontSize={"1.2em"} onClick={onClose}>
                                        My Profile
                                    </Link>
                                    <PlainButtonLink text={"Logout"} onClick={logout} />
                                </>
                                :
                                <>
                                    <Link as={ReactLink} to="/login" _hover={{}} fontSize={"1.2em"} onClick={onClose}>
                                        Login
                                    </Link>
                                    <Link as={ReactLink} to="/register" _hover={{}} fontSize={"1.2em"} onClick={onClose}>
                                        Register
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