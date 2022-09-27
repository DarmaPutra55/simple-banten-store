import { Stack, Text, Flex, useBoolean, Button, HStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare } from "react-feather"
import CurrencyFormatter from "../components/smallcomponent/currencyFormatter/currencyFormatter";
import Loading from "../components/smallcomponent/loading/loading";
import ItemDetailHeader from "../components/itemDetail/itemDetailHeader/itemDetailHeader";
import ItemDetailInformation from "../components/itemDetail/itemDetailInformation/itemDetailInformation";
import ItemMoreLikeThis from "../components/itemMoreLikeThis/itemMoreLikeThis";
import SearchBar from "../components/searchbar/searchbar";
import fetchApi from "../components/smallcomponent/fetchApi/fetchApi";
import ActionIcon from "../components/smallcomponent/icons/icon";

export default function ItemDetail() {
    const params = useParams();
    const [itemDetail, setItemDetail] = useState({});
    const [isLoading, setIsLoading] = useBoolean(true);

    const setFetchedItem = async () => {
        try {
            setIsLoading.on();
            setItemDetail(await fetchApi("/products/" + params.itemID));
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading.off();
        }
    }

    useEffect(() => {
        setFetchedItem();
    }, [])

    return (
        <Stack align={"center"}  backgroundColor={"gray.100"}>
            <SearchBar />
            {isLoading ?
                <Loading />
                :
                !itemDetail?.id ?
                    <Flex justify={"center"} align={"center"}>
                        <Text>
                            Barang tidak ditemukan!
                        </Text>
                    </Flex>
                    :
                    <>
                        <Stack
                            minH={"100vh"}
                            spacing={"18px"}
                        >
                            <Stack
                                className={"responsiveWidth"}
                            >
                                <ItemDetailHeader
                                    img={itemDetail.gambar}
                                    name={itemDetail.nama}
                                    rating={itemDetail.rating.rate}
                                    price={itemDetail.diskon ? CurrencyFormatter((itemDetail.harga - (Math.round(itemDetail.harga * itemDetail.diskon) / 100))) : CurrencyFormatter(itemDetail.harga)}
                                    originalPrice={CurrencyFormatter(itemDetail.harga)}
                                    discount={itemDetail.diskon}
                                    ulasan={itemDetail.ulasan} // Make rest api include ulasan!
                                />

                                <ItemDetailInformation
                                    kategori={itemDetail.kategori}
                                    stock={itemDetail.stok}
                                    sold={itemDetail.terjual}
                                    description={itemDetail.deskripsi}
                                />

                                <ItemMoreLikeThis
                                    itemId={itemDetail.id}
                                    kategori={itemDetail.kategori}
                                />
                            </Stack>

                        </Stack>
                        <HStack bgColor={"white"} padding={"5px"} position={"sticky"} bottom={"0px"} left={"0px"} width={"100vw"}>
                            <Button borderRadius={"0px"} colorScheme={"green"} flexGrow={"2"}>Beli</Button>
                            <Flex minW={"10vw"} justify={"center"} ><ActionIcon icon={<MessageSquare />} /></Flex>
                        </HStack>
                    </>
            }
        </Stack>
    );
}