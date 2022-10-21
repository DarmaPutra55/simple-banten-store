import { Avatar, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { MoreVertical, MessageSquare } from "react-feather";
import { Link as ReactLink } from "react-router-dom";
import { UserContext } from "../components/context/userContext";
import ActionIcon from "../components/smallcomponent/icons/icon";
import ResponsiveBreadcrumb from "../components/smallcomponent/responsiveBreadcrumb/responsiveBreadcrumb";

export default function Discussion() {
    const { user } = useContext(UserContext)

    return (
        <>
            <ResponsiveBreadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={ReactLink}
                        to="/"
                    >
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={ReactLink}
                        to="#"
                    >
                        Item
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={ReactLink}
                        to="#"
                    >
                        Discussion
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </ResponsiveBreadcrumb>
            <Flex className="responsiveWidth" bg={"white"} h={"100%"}>
                <Stack minW={"30%"} maxW={"30%"} shadow={"lg"}>
                    <Flex
                        p={"14px"}
                        justify={"space-between"}
                        bgColor={"gray.100"}
                    >
                        <Avatar 
                            name={user? user.username : ""}
                        />
                        <HStack>
                                <ActionIcon icon={<MessageSquare />} />
                                <ActionIcon icon={<MoreVertical />} />
                        </HStack>
                    </Flex>
                </Stack>
                <Stack minW={"70%"} maxW="70%" >

                </Stack>
            </Flex>
        </>
    )
}