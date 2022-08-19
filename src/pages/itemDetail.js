import { Stack, useBoolean } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
            setItemDetail(await fetchApi("https://fakestoreapi.com/products/"+params.itemID));
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
                            <Stack 
                                minH={"100vh"} 
                                backgroundColor={"gray.100"} 
                                spacing={"18px"} 
                                maxW={"100vw"}
                            >
                                <ItemDetailHeader 
                                    img={itemDetail.image} 
                                    name={itemDetail.title} 
                                    rating={itemDetail.rating.rate} 
                                    price={itemDetail.price} 
                                    originalPrice={itemDetail.originalPrice} 
                                    discount={itemDetail.discount} 
                                    ulasan={itemDetail.rating.count} 
                                />

                                <ItemDetailInformation
                                    kategori={itemDetail.category}
                                    stock={20}
                                    sold={6}
                                    description={itemDetail.description}
                                />

                                <ItemMoreLikeThis 
                                    category={itemDetail.category} 
                                />
                            </Stack>
                        }
        </Stack>
    );
}