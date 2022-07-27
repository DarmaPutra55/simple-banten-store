import { Stack, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Loading from "../smallcomponent/loading/loading";
import ItemDetailHeader from "./itemDetailHeader/itemDetailHeader";
import ItemDetailInformation from "./itemDetailInformation/itemDetailInformation";

export default function ItemDetail(){
    const itemID= 3;
    const [itemDetail, setItemDetail] = useState({});
    const [loading, setLoading] = useState(true);

    const getItem = async () =>{
        const response = await fetch("https://fakestoreapi.com/products/"+itemID);
        const result = await response.json();
        return result;
    }

    const setFetchedItem = async () =>{
        setItemDetail(await getItem());
        setLoading(false);
    }

    useEffect(()=>{
        setFetchedItem();
    }, [])

    return(
        <>
            {
                loading? 

                    <Loading />

                :

                    <Stack minH={"100vh"} backgroundColor={"gray.100"} spacing={"18px"}>
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
                    </Stack>
            }  
        </>
    );
}