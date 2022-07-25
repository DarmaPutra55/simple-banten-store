import { Stack} from "@chakra-ui/react";
import { useState } from "react";
import ItemDetailHeader from "./itemDetailHeader/itemDetailHeader";
import ItemDetailInformation from "./itemDetailInformation/itemDetailInformation";
import ItemDetailSpecification from "./itemDetailSpecification/itemDetailSpecification";

export default function ItemDetail(){

    const props = {
        img: "https://bit.ly/2Z4KKcF",
        name: "Teh Celub Sosro - MMI - 91",
        price: "Rp 25.000",
        originalPrice: "Rp 32.000",
        discount: "50%",
        rating: "4.7",
        ulasan: "25",
        sold: "140",
        kategori: "Banten",
        berat: "1kg",
        asal: "Rumah",
        stock: "49",
        fav: true
    }

    return(
        <Stack minH={"100vh"} backgroundColor={"gray.100"} spacing={"18px"} >
            <ItemDetailHeader 
                img={props.img} 
                name={props.name} 
                rating={props.rating} 
                price={props.price} 
                originalPrice={props.originalPrice} 
                discount={props.discount} 
                ulasan={props.ulasan} 
            />

            <ItemDetailInformation
                kategori={props.kategori}
                stock={props.stock}
                sold={props.sold}
            />

            
        </Stack>     
    );
}