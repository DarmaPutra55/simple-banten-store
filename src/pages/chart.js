import { Flex, Heading, Stack, Box, Text, Button, useBoolean } from "@chakra-ui/react";
import { useContext } from "react";
import ChartItem from "../components/chartItem/chartItem";
import Loading from "../components/smallcomponent/loading/loading"
import CurrencyFormatter from "../components/smallcomponent/currencyFormatter/currencyFormatter"
import { ChartContext } from "../components/context/chartContext";
import { ItemContext } from "../components/context/itemsContext";


export default function Chart() {
    const { totalChartPrice, cartItems, isCartItemMutationLoading } = useContext(ChartContext);
    const { items } = useContext(ItemContext);

    return (
        isCartItemMutationLoading ?
            <Loading />
            :
            <Stack className={"responsiveWidth"}>
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
                    cartItems?.length > 0 ? Array(cartItems.length).fill(' ').map((_, i) => {
                        const item = items?.find((item)=>item.id === cartItems[i].id_barang);
                        return <ChartItem key={i}
                            {...item} 
                            jumlah = {cartItems[i].jumlah} 
                            cartId = {cartItems[i].id} 
                            checked = {cartItems[i].checked}
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
                            <Text
                                fontWeight={"bold"}
                                fontSize={"large"}
                            >
                                {CurrencyFormatter(totalChartPrice)}
                            </Text>
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