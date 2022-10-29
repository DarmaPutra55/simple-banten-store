import { Flex, Spinner } from "@chakra-ui/react";

export function SmallLoading(){
    return(
        <Flex 
            minH={"8em"} 
            minW={"100%"} 
            justify={"center"} 
            align={"center"}
        >
            <Spinner size={"xl"} />
        </Flex>
    )
}

export function Loading(){
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

export function FullscreeLoading() {
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