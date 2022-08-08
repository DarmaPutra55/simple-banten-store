import { Flex, Heading, Stack, Box, Text, Button, useBoolean  } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import SearchBar from "../components/searchbar/searchbar";
import ChartItem from "../components/chartItem/chartItem";
import Loading from "../components/smallcomponent/loading/loading"

const fItems = [
    {
        itemID: 1,
        itemName: "Bibit Bunga Matahari",
        itemPrice: 300,
        itemQuantity: 2,
        itemStock: 4,
        itemImg: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }, 
    {   itemID: 1,
        itemName: "Bibit Bunga Matahari",
        itemPrice: 400,
        itemQuantity: 2,
        itemStock: 4,
        itemImg: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }
]

const getTotalPrice = (chartItems) => {
    let priceArray = [];
    chartItems.map((element)=>priceArray.push(element.itemPrice));
    let totalPrice = priceArray.reduce((a, b)=>a+b, 0);
    return totalPrice;
}

export default function Chart(){
    const [isLoading, setIsLoading] = useBoolean(false);
    const [items, setItems] = useState(fItems);
    const [totalPrice, setTotalPrice] = useState(0);
    const QunatityContext = createContext();

    useEffect(()=>{
        setTotalPrice(getTotalPrice(items));
    }, [items])

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

                {
                    Array(items.length).fill(' ').map((_, i)=>{
                        return <ChartItem key={i} props={items[i]} />;
                    })
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
                                ${totalPrice}
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