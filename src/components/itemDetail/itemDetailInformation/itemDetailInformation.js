import { Stack, Box, Text, Flex, Heading, Divider, Button, useBoolean, Collapse} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function ItemDetailInformation(props){
    const [readMore, setReadMore] = useBoolean(false);
    const [showMoreButton, setShowMoreButton] = useBoolean(false);
    const textRef = useRef();

    const checkTextHeight = () =>{
        const textHeight = textRef.current.clientHeight;
        if(textHeight > 100){
            setShowMoreButton.on();
        }
    }

    useEffect(()=>{
        checkTextHeight();
    }, []);

    return (
        <Box backgroundColor={"white"} overflowY={"hidden" }>
                <Stack p={"2"}>
                    <Heading size={"md"}>
                        Informasi Barang
                    </Heading>
                    <Stack spacing={"2px"}>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Kategori</Text></Box>
                            <Box p={"2"}><Text>{props.kategori[0].toUpperCase() + props.kategori.slice(1)}</Text></Box>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Stok</Text></Box>
                            <Box p={"2"}><Text>{props.stock}</Text></Box>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Terjual</Text></Box>
                            <Box p={"2"}><Text>{props.sold}</Text></Box>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Collapse in={readMore} startingHeight={"75px"}>
                        <Box textAlign={"justify"}>
                            <Text ref={textRef}>
                               {props.description}
                            </Text>
                        </Box>
                    </Collapse>
                    {showMoreButton ? 
                        <>
                            <Button _active={{"bgColor": "transparent"}} _focus={{"bgColor": "transparent"}} p={"0"} backgroundColor={"transparent"} border={"none"} textColor={"blue"} onClick={setReadMore.toggle}>Show {readMore? "Less":"More"}</Button>
                            <Divider />
                        </>:""
                    }
                    <Button _active={{"bgColor": "transparent"}} _focus={{"bgColor": "transparent"}} _hover={{"bgColor":"transparent"}} p={"0"} backgroundColor={"transparent"} border={"none"} textColor={"grey"}>Laporkan Barang</Button>
                </Stack>
            </Box>
    )
}