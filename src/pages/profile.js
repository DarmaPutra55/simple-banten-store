import { Stack, Flex, Avatar, Divider, Link, Text, Button, Input, HStack, useDisclosure, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { Link as ReactLink } from "react-router-dom";
import { UserContext } from "../components/context/userContext";
import PreviousTransactionModal from "../components/previousTransactionModal/previousTransactionModal";
import ResponsiveBreadcrumb from "../components/smallcomponent/responsiveBreadcrumb/responsiveBreadcrumb";

export default function Profile() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useContext(UserContext);
    const inputFileRef = useRef();
    const fileUploadClickHandler = (e) => {
        e.preventDefault();
        inputFileRef?.current.click();
    }
    const lihatTransaksiClickHandler = (e) => {
        e.preventDefault();
        onOpen();
    }

    return (
        <>
            <PreviousTransactionModal
                isOpen={isOpen}
                onClose={onClose}
            />
            
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
                        Profile
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </ResponsiveBreadcrumb>

            <Stack minW={"100%"} align={"center"} backgroundColor={"gray.100"}>
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
                            <Button onClick={fileUploadClickHandler}>Upload avatar</Button>
                            <Input accept={".png, .jpg, .jpeg"} type={"file"} ref={inputFileRef} hidden />
                        </HStack>

                        <Flex
                            justify={"flex-end"}
                        >
                            <Button onClick={lihatTransaksiClickHandler}>Lihat transaksi</Button>
                        </Flex>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}