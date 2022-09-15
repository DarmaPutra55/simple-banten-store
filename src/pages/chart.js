import { Flex, Heading, Stack, Box, Text, Button, useBoolean} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import SearchBar from "../components/searchbar/searchbar";
import ChartItem from "../components/chartItem/chartItem";
import Loading from "../components/smallcomponent/loading/loading"
import CurrencyFormatter from "../components/smallcomponent/currencyFormatter/currencyFormatter"
import { ChartContext } from "../components/context/chartContext";


export default function Chart(){
    const [isLoading, setIsLoading] = useBoolean(true);
    const {totalChartPrice, cart} = useContext(ChartContext);

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

                {
                    cart?.length > 0 ? Array(cart.length).fill(' ').map((_, i)=>{
                        return <ChartItem key={i} 
                            {...cart[i]}
                        />
                    })
                    : ""
                }

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
                                {CurrencyFormatter(totalChartPrice)}
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