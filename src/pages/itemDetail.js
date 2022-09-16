import { Stack, Text, Flex, useBoolean } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CurrencyFormatter from "../components/smallcomponent/currencyFormatter/currencyFormatter";
import Loading from "../components/smallcomponent/loading/loading";
import ItemDetailHeader from "../components/itemDetail/itemDetailHeader/itemDetailHeader";
import ItemDetailInformation from "../components/itemDetail/itemDetailInformation/itemDetailInformation";
import ItemMoreLikeThis from "../components/itemMoreLikeThis/itemMoreLikeThis";
import SearchBar from "../components/searchbar/searchbar";
import fetchApi from "../components/smallcomponent/fetchApi/fetchApi";

export default function ItemDetail(){
    const params = useParams();
    const [itemDetail, setItemDetail] = useState({});
    const [isLoading, setIsLoading] = useBoolean(true);

    const setFetchedItem = async () =>{
        try{
            setIsLoading.on();
            setItemDetail(await fetchApi("/products/"+params.itemID));
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsLoading.off();
        }
    }

    useEffect(()=>{
        setFetchedItem();
    }, [])

    return(
        <Stack>
                    <SearchBar />
                        { isLoading ?
                            <Loading />
                            :
                            !itemDetail?.id ?
                            <Flex justify={"center"} align={"center"}> 
                                <Text>
                                    Barang tidak ditemukan!
                                </Text>
                            </Flex>
                            :
                            <Stack 
                                minH={"100vh"} 
                                backgroundColor={"gray.100"} 
                                spacing={"18px"} 
                                maxW={"100vw"}
                            >
                                <ItemDetailHeader 
                                    img={itemDetail.gambar} 
                                    name={itemDetail.nama} 
                                    rating={itemDetail.rating.rate} 
                                    price={itemDetail.diskon ? CurrencyFormatter((itemDetail.harga - (Math.round(itemDetail.harga * itemDetail.diskon)/100))) : CurrencyFormatter(itemDetail.harga)} 
                                    originalPrice = {CurrencyFormatter(itemDetail.harga)}
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
                        }
        </Stack>
    );
}