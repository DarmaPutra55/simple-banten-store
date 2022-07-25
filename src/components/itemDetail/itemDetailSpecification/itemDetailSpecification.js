import { Box, Stack, Flex, Text, Heading } from "@chakra-ui/react"

export default function ItemDetailSpecification(props){
    return (
        <Box backgroundColor={"white"}>
                <Stack p={"2"}>
                    <Heading size={"md"}>
                        Spesifikasi
                    </Heading>
                    <Stack spacing={"0px"} border={"1px"} borderColor={"gray.200"}>
                        <Flex borderBottom={"1px"} borderColor={"gray.200"}>
                            <Box w={"35%"} p={"2"} backgroundColor={"gray.100"}><Text>Kategori</Text></Box>
                            <Box flexGrow={"1"} p={"2"}><Text>{props.kategori}</Text></Box>
                        </Flex>
                        <Flex borderBottom={"1px"} borderColor={"gray.200"}>
                            <Box w={"35%"} p={"2"} backgroundColor={"gray.100"}><Text>Berat</Text></Box>
                            <Box flexGrow={"1"} p={"2"}><Text>{props.berat}</Text></Box>
                        </Flex>
                    </Stack>
                </Stack>
            </Box>
            
    )
}