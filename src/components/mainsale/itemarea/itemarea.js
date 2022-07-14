import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Item from "../item/item";

export default function ItemArea(props) {
    const [items, setItems] = useState([]);
    const itemObj = {
        img: "https://bit.ly/2Z4KKcF",
        name: "Teh Celub Sosro - MMI - 91",
        price: "Rp 25rb",
        originalPrice: "Rp 32rb",
        discount: "-50%",
        rating: "4.7",
        sold: "140"
    }

    useEffect(()=>{
        let array = [itemObj, itemObj, itemObj, itemObj, itemObj]
        
        setItems(array.filter((val)=>{
            if(val.name.toLowerCase().includes(props.searchParams)){
                return val;
            }
        }));

        return;
    }, [props.searchParams])

    return(
        <Flex
            justify={"center"}
            flexWrap={"wrap"}
        >
            {
                Array(items.length).fill('').map((_, i)=>{
                    return <Item 
                                key={i} 
                                img={itemObj.img} 
                                name={itemObj.name} 
                                price={itemObj.price} 
                                originalPrice={itemObj.originalPrice} 
                                discount={itemObj.discount} 
                                rating={itemObj.rating} 
                                sold={itemObj.sold} 
                    />;
                })
            } 
        </Flex>
    )
}