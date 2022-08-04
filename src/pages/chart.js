import { Flex, Heading, Stack, Box, Text, Button, useBoolean  } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import SearchBar from "../components/searchbar/searchbar";
import ChartItem from "../components/chartItem/chartItem";
import Loading from "../components/smallcomponent/loading/loading"

export default function Chart(){
    const [isLoading, setIsLoading] = useBoolean(false);
    const QunatityContext = createContext();

    
    return(
        <Stack
            bg={"gray.100"}
        >
            <QunatityContext.Provider value={""}>
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
            </QunatityContext.Provider>
        </Stack>
    );
}