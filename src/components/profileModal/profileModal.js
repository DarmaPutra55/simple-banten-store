import { Box, Flex, Stack, Link } from "@chakra-ui/react";
import { useContext } from "react";
import {
    Link as ReactLink
} from "react-router-dom"
import { UserContext } from "../context/userContext";
import PlainButtonLink from "../smallcomponent/plainLink/plainButtonLink";

export default function ProfileModal({ topPos, isOpen, onClose }) {
    const { user, logout } = useContext(UserContext)
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
                            <Link as={ReactLink} to="/" _hover={{}} fontSize={"1.2em"}>
                                My Profile
                            </Link>
                            <PlainButtonLink text={"Logout"} onClick={logout}/>
                        </>
                        :
                        <>
                            <Link as={ReactLink} to="/login" _hover={{}} fontSize={"1.2em"}>

                                Login

                            </Link>
                            <Link as={ReactLink} to="/register" _hover={{}} fontSize={"1.2em"}>

                                Register

                            </Link>
                        </>
                    }
                </Stack>
            </Flex>
        </>
    )
}