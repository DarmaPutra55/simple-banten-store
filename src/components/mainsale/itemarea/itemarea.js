import { Flex } from "@chakra-ui/react";
import Item from "../item/item";

export default function ItemArea() {
    return(
        <Flex
            flexWrap={"wrap"}
        >
            {Array(5).fill(' ').map((_, i)=>{return <Item key={i} />})} 
        </Flex>
    )
}