import { Flex, Heading, Stack, Box, Text, Button, BreadcrumbLink, BreadcrumbItem } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ChartContext } from "../components/context/chartContext";
import { ItemContext } from "../components/context/itemsContext";
import { Link as ReactLink } from "react-router-dom";
import ChartItem from "../components/chartItem/chartItem";
import CurrencyFormatter from "../components/smallcomponent/currencyFormatter/currencyFormatter"
import ResponsiveBreadcrumb from "../components/smallcomponent/responsiveBreadcrumb/responsiveBreadcrumb";


export default function Chart() {
    const [mutatedCartItemIds, setmutatedCartItemIds] = useState([]);
    const { totalChartPrice, cartItems } = useContext(ChartContext);
    const { items } = useContext(ItemContext);

    const addMutatedCartItemHandler = (mutatedCartItemId) => {
        setmutatedCartItemIds((mutatedCartItemIds)=>[...mutatedCartItemIds, mutatedCartItemId]);
    }

    const removeMutatedCartItemHandler = (mutatedCartItemId) => {
        setmutatedCartItemIds((mutatedCartItemIds)=>mutatedCartItemIds.filter((itemId)=>itemId !== mutatedCartItemId))
    }

    return (
            <>
                <ResponsiveBreadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            as={ReactLink}
                            to="/"
                        >
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            as={ReactLink}
                            to="#"
                        >
                            Cart
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </ResponsiveBreadcrumb>

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
                            const item = items?.find((item) => item.id === cartItems[i].id_barang);
                            return <ChartItem key={i}
                                {...item}
                                jumlah={cartItems[i].jumlah}
                                cartId={cartItems[i].id}
                                checked={cartItems[i].checked}
                                isItemMutating={mutatedCartItemIds?.includes(cartItems[i].id) ? true : false}
                                addMutatedCartItemHandler={addMutatedCartItemHandler}
                                removeMutatedCartItemHandler={removeMutatedCartItemHandler}
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
            </>
    );
}