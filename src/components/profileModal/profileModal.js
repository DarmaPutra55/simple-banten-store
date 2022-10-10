import { Box, Flex, Text, Stack, Link } from "@chakra-ui/react";
import {
    Link as ReactLink
} from "react-router-dom"

export default function ProfileModal({ topPos, isOpen, onClose }) {
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
            </Flex>
        </>
    )
}