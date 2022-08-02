import SearchBar from "../components/searchbar/searchbar";
import { Flex, Heading, Stack, Box, Text, Button  } from "@chakra-ui/react";
import ChartItem from "../components/chartItem/chartItem";

export default function Chart(){
    
    return(
        <Stack
            bg={"gray.100"}
        >
            <SearchBar />
            <Flex
                bgColor={"white"}
                align={"center"}
                justify={"center"}
            >
                <Heading 
                    py={"10px"}
                    as={"h1"}
                    fontSize={"1.1em"} 
                >
                    Keranjang Belanja
                </Heading>
            </Flex>

           <ChartItem />

            <Flex
                bgColor={"white"}
                p={"14px"}
                justify={"space-between"}
            >
                <Stack
                    spacing={"2px"}
                >  
                    <Box
                    
                    >
                        <Text
                            color={"gray.400"}
                        >
                            Total Belanja
                        </Text>
                        <Heading 
                            as={"h1"}
                            fontSize={"1.6em"}
                        >
                            $300
                        </Heading>
                    </Box>
                </Stack>
                <Flex
                    align={"center"}
                    justify={"center"}
                >
                    <Button
                        py={"6px"}
                        px={"16px"}
                        h={"100%"}
                        w={"100%"}
                    >
                        Bayar
                    </Button>
                </Flex>
            </Flex>
        </Stack>
    );
}