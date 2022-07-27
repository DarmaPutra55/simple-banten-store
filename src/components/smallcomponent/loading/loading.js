import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading(){
    return(
        <Flex 
            minH={"100%"} 
            minW={"100%"} 
            justify={"center"} 
            align={"center"}
        >
            <Spinner size={"xl"} />
        </Flex>
    )
}