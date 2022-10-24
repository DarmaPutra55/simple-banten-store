import { Breadcrumb, Flex } from "@chakra-ui/react";

export default function ResponsiveBreadcrumb({children}){
    return(
        <Flex className={"responsiveWidth"} px={"10px"}>
            <Breadcrumb fontWeight={"bold"} fontSize={"xl"} alignSelf={"flex-start"}>
                {children}
            </Breadcrumb>
        </Flex>
    )
}