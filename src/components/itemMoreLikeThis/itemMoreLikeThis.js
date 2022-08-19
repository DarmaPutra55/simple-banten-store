import { Flex, useBoolean, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../smallcomponent/loading/loading";
import Item from "../item/item";
import { Link as ReactLink } from "react-router-dom";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";

export default function ItemMoreLikeThis(props) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useBoolean(true);

    const intitializeItemMoreLikeThis = async () => {
        try{
            setIsLoading.on();
            const fetchedItems = await fetchApi("https://fakestoreapi.com/products/category/"+props.category+"?limit=5");
            setItems(()=>{
                return fetchedItems.map(element => {
                    const item = {
                        "id": element.id,
                        "img": element.image,
                        "price": element.price,
                        "originalPrice": element.originalPrice,
                        "name": element.title,
                        "rating": element.rating.rate,
                        "sold": 130
                    }

                    return item
                })
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
        intitializeItemMoreLikeThis();
    }, [])

    return(
                    <Flex
                        flexWrap={"nowrap"}
                        maxW={"100vw"}
                        overflowX={"scroll"}
                        backgroundColor={"white"}
                    >
                        
                        {   isLoading ?
                            <Loading />
                            :
                            <Flex
                                flexDir={"column"}
                            >
                                <Flex justify={"end"}>
                                    <Link 
                                        as={ReactLink} 
                                        to={"/?itemCategory="+props.category}
                                    >
                                        <Text
                                            py={"4px"}
                                            px={"20px"}
                                            color={"blue.500"}
                                        >
                                            More like this
                                        </Text>
                                    </Link>
                                </Flex>
                                <Flex>
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
                            </Flex>
                        } 
                    </Flex>
    )
}