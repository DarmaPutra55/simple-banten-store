import { Flex, useBoolean, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../smallcomponent/loading/loading";
import Item from "../item/item";
import CurrencyFormatter from "../smallcomponent/currencyFormatter/currencyFormatter";
import { Link as ReactLink } from "react-router-dom";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";

export default function ItemMoreLikeThis(props) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useBoolean(true);

    const intitializeItemMoreLikeThis = async () => {
        try {
            setIsLoading.on();
            const fetchedItems = (await fetchApi("http://192.168.1.24:3001/products/category/" + props.kategori + "?limit=5")).filter((fetchedItem)=> fetchedItem.id !== props.itemId);
            if(fetchedItems.length === 0) return;
            setItems(() => {
                return fetchedItems.map(fetchedItem => {
                    const item = {
                        "id": fetchedItem.id,
                        "img": fetchedItem.gambar,
                        "discount": fetchedItem.diskon,
                        "price": fetchedItem.diskon > 0 ? CurrencyFormatter((fetchedItem.harga - (Math.round(fetchedItem.harga * fetchedItem.diskon)/100))) : CurrencyFormatter(fetchedItem.harga),
                        "originalPrice": CurrencyFormatter(fetchedItem.harga),
                        "name": fetchedItem.nama,
                        "rating": fetchedItem.rating.rate,
                        "sold": fetchedItem.terjual
                    }

                    return item
                })
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setIsLoading.off()
        }
    }

    useEffect(() => {
        intitializeItemMoreLikeThis();
        console.log(items);
    }, [])

    return (
        items.length > 0 ?
            <Flex
                flexWrap={"nowrap"}
                maxW={"100vw"}
                overflowX={"scroll"}
                backgroundColor={"white"}
            >

                {isLoading ?
                    <Loading />
                    :
                    <Flex
                        flexDir={"column"}
                    >
                        <Flex justify={"end"}>
                            <Link
                                as={ReactLink}
                                to={"/?itemCategory=" + props.kategori}
                            >
                                <Text
                                    py={"4px"}
                                    px={"20px"}
                                    color={"blue.500"}
                                >
                                    More like this...
                                </Text>
                            </Link>
                        </Flex>
                        <Flex>
                            {
                                Array(items.length).fill('').map((_, i) => {
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
            : ""

    )
}