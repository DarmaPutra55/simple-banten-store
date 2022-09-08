import { Flex, Spinner } from "@chakra-ui/react";

export default function FullscreeLoading() {
    return(
        <Flex 
            minH={"100vh"} 
            minW={"100vw"} 
            justify={"center"} 
            align={"center"}
        >
            <Spinner size={"xl"} />
        </Flex>
    )
}