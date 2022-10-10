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
    Box
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
                    <Stack w={'full'}>
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
                        <Link as={ReactLink} to="/login" _hover={"none"}>
                            <Box w={"full"} fontSize={"1.2em"}>
                                Login
                            </Box>
                        </Link>
                        <Link as={ReactLink} to="/register" _hover={"none"}>
                            <Box w={"full"} fontSize={"1.2em"}>
                                Register
                            </Box>
                        </Link>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}