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
} from '@chakra-ui/react'

import {
    Link as ReactLink
} from "react-router-dom"

export default function ProfileDrawer({ isOpen, onClose }) {
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
                    <Stack>
                        <Flex 
                            justify={"center"} 
                            align={"center"}
                            direction={"column"}
                            gap={"8px"}
                        >
                            <Avatar size={"2xl"} />
                            <Text fontSize={"2xl"} fontWeight={"bold"}>Guest</Text>
                        </Flex>
                        <Divider />
                        <Link as={ReactLink} to="/login" fontSize={"1.2em"}>
                            Login
                        </Link>
                        <Link as={ReactLink} to="/register" fontSize={"1.2em"}>
                            Register
                        </Link>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}