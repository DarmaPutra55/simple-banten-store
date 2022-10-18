import { Flex, useBoolean, Link, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Loading from "../smallcomponent/loading/loading";
import Item from "../item/item";
import CurrencyFormatter from "../smallcomponent/currencyFormatter/currencyFormatter";
import { Link as ReactLink } from "react-router-dom";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import { ItemContext } from "../context/itemsContext";

export default function ItemMoreLikeThis(props) {
    const [viewedItems, setViewedItems] = useState([]);
    const { items } = useContext(ItemContext);

    const intitializeItemMoreLikeThis = async () => {
        setViewedItems(items?.filter((item) => item.kategori.includes(props.kategori) && item.id !== props.itemId))
    }

    useEffect(() => {
        intitializeItemMoreLikeThis();
    }, [])

    return (
        viewedItems?.length > 0 ?
            <Flex
                className={"invisibleScrollbar"}
                flexWrap={"nowrap"}
                maxW={"100%"}
                overflowX={"scroll"}
                backgroundColor={"white"}
                p={"15px"}
            >

                <Flex
                    flexDir={"column"}
                    width={"100%"}
                >
                    <Flex justify={"end"}>
                        <Link
                            as={ReactLink}
                            to={"/?kategori=" + props.kategori}
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
                            Array(viewedItems.length).fill('').map((_, i) => {
                                return <Item
                                    key={i}
                                    id={viewedItems[i].id}
                                    img={viewedItems[i].gambar}
                                    name={viewedItems[i].nama}
                                    price={viewedItems[i].diskon > 0 ? CurrencyFormatter((viewedItems[i].harga - (Math.round(viewedItems[i].harga * viewedItems[i].diskon) / 100))) : CurrencyFormatter(viewedItems[i].harga)}
                                    originalPrice={CurrencyFormatter(viewedItems[i].harga)}
                                    discount={viewedItems[i].diskon}
                                    rating={viewedItems[i].rating.rate}
                                    sold={viewedItems[i].terjual}
                                />;
                            })
                        }
                    </Flex>
                </Flex>

            </Flex>
            : ""

    )
}