import { Stack, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { MessageSquare } from "react-feather"
import CurrencyFormatter from "../components/smallcomponent/currencyFormatter/currencyFormatter";
import Loading from "../components/smallcomponent/loading/loading";
import ItemDetailHeader from "../components/itemDetail/itemDetailHeader/itemDetailHeader";
import ItemDetailInformation from "../components/itemDetail/itemDetailInformation/itemDetailInformation";
import ItemMoreLikeThis from "../components/itemMoreLikeThis/itemMoreLikeThis";
import ActionIcon from "../components/smallcomponent/icons/icon";
import BuyModal from "../components/buyModal/buyModal";
import fetchApi from "../components/smallcomponent/fetchApi/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ChartContext } from "../components/context/chartContext";

export default function ItemDetail() {
    const params = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isCartItemMutationLoading } = useContext(ChartContext);
    const { data: item, isLoading: isItemLoading } = useQuery(['item'], async () => {
        return await fetchApi("/products/"+params.itemID)
    }, {
        retry: false,
    });


    return (
        <>
            {isItemLoading || isCartItemMutationLoading ?
                <Loading />
                :
                !item?.id ?
                    <Flex justify={"center"} align={"center"}>
                        <Text>
                            Barang tidak ditemukan!
                        </Text>
                    </Flex>
                    :
                    <>
                        <Stack
                            className={"responsiveWidth"}
                            spacing={"18px"}
                        >
                            <BuyModal
                                productId={item.id}
                                productName={item.nama}
                                productDiscount={item.diskon}
                                productPrice={item.harga}
                                productImg={item.gambar}
                                productStok={item.stok}
                                isOpen={isOpen}
                                onClose={onClose}
                            />

                            <ItemDetailHeader
                                img={item.gambar}
                                name={item.nama}
                                rating={item.rating.rate}
                                price={item.diskon ? CurrencyFormatter((item.harga - (Math.round(item.harga * item.diskon) / 100))) : CurrencyFormatter(item.harga)}
                                originalPrice={CurrencyFormatter(item.harga)}
                                discount={item.diskon}
                                ulasan={item.ulasan} // Make rest api include ulasan!
                            />

                            <ItemDetailInformation
                                kategori={item.kategori}
                                stock={item.stok}
                                sold={item.terjual}
                                description={item.deskripsi}
                            />

                            <ItemMoreLikeThis
                                itemId={item.id}
                                kategori={item.kategori}
                            />
                            <HStack bgColor={"white"} padding={"5px"} position={"sticky"} bottom={"0px"} left={"0px"}>
                                <Button borderRadius={"0px"} colorScheme={"green"} flexGrow={"2"} onClick={onOpen}>Beli</Button>
                                <Flex minW={"10%"} justify={"center"} ><ActionIcon icon={<MessageSquare />} /></Flex>
                            </HStack>
                        </Stack>
                    </>
            }
        </>
    );
}