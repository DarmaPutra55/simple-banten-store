import { Box, Flex, Button, Stack, Link } from "@chakra-ui/react";
import { useContext } from "react";
import {
    Link as ReactLink
} from "react-router-dom"
import { UserContext } from "../context/userContext";

export default function ProfileModal({ topPos, isOpen, onClose }) {
    const { user } = useContext(UserContext)
    return (
        <>
            <Box
                visibility={isOpen ? "visible" : "hidden"}
                opacity={isOpen ? 1 : 0}
                transition={"all 300ms ease"}
                pos={"Fixed"}
                top={0}
                left={0}
                zIndex={"200"}
                width={"100%"}
                height={"100%"}
                backgroundColor={"blackAlpha.400"}
                onClick={onClose}
            />
            <Flex
                minW={"120px"}
                borderRadius={"10px"}
                visibility={isOpen ? "visible" : "hidden"}
                scale={isOpen ? 1 : 0}
                transform={"auto"}
                padding={"8px"}
                transition={"all 300ms ease"}
                pos={"absolute"}
                top={topPos || 0}
                right={0}
                zIndex={"300"}
                backgroundColor={"white"}
            >
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
            </Flex>
        </>
    )
}