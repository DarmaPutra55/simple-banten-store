import { Flex, useBoolean } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../smallcomponent/loading/loading";
import Item from "../item/item";

export default function ItemArea(props) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useBoolean(false);

    const getItems = async () => {
        const response = await fetch("https://fakestoreapi.com/products")
        const result = await response.json();
        return result;
    }

    const searchItems = async () => {
        try{
            setIsLoading.toggle();
            const fetchedItems = await getItems();
            const temp_items = []
            
            fetchedItems.forEach(element => {
                if(element.title.toLowerCase().includes(props.searchParams)){
                    temp_items.push({
                        "id": element.id,
                        "img": element.image,
                        "price": element.price,
                        "originalPrice": element.originalPrice,
                        "name": element.title,
                        "rating": element.rating.rate,
                        "sold": 130
                    })
                }

                setItems(temp_items);
            });
        }
        catch(err){
            console.error(err);
        }
        finally{
            setIsLoading.toggle()
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
                    >
                        {
                            Array(items.length).fill('').map((_, i)=>{
                                return <Item 
                                            key={items[i].id} 
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