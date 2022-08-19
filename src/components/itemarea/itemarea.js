import { Flex, useBoolean } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../smallcomponent/loading/loading";
import Item from "../item/item";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";

export default function ItemArea(props) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useBoolean(true);

    const itemValidator = (element) => {
        if(props.searchParams.has("itemCategory") && element.category.toLowerCase() !== props.searchParams.get("itemCategory")) return false;
        if(props.searchParams.has("itemName") && !element.title.toLowerCase().includes(props.searchParams.get("itemName"))) return false;
        return true;
    }

    const searchItems = async () => {
        try{
            setIsLoading.on();
            const fetchedItems = await fetchApi("https://fakestoreapi.com/products");
            const temp_items = []
            
            fetchedItems.forEach(element => {
                if(itemValidator(element)){
                    const item = {
                        "id": element.id,
                        "img": element.image,
                        "price": element.price,
                        "originalPrice": element.originalPrice,
                        "name": element.title,
                        "rating": element.rating.rate,
                        "sold": 130
                    };
                    temp_items.push(item)
                }

                setItems(temp_items);
            });
        }
        catch(err){
            console.error(err);
        }
        finally{
            setIsLoading.off()
        }
    }

    useEffect(()=>{
        setItems([]);
        searchItems();
    }, [props.searchParams])

    return(
        <>
            {
                isLoading ?
                    <Loading />
                :
                    
                    <Flex
                        flexWrap={"wrap"}
                        justify={["baseline", "baseline", "center"]}
                    >
                        {
                            Array(items.length).fill('').map((_, i)=>{
                                return <Item 
                                            key={i} 
                                            id={items[i].id}
                                            img={items[i].img} 
                                            name={items[i].name} 
                                            price={items[i].price} 
                                            originalPrice={items[i].originalPrice} 
                                            discount={items[i].discount} 
                                            rating={items[i].rating} 
                                            sold={items[i].sold} 
                                />;
                            })
                        } 
                    </Flex>
            }
        </>
    )
}