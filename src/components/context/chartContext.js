import { Flex, useBoolean } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import Loading from "../smallcomponent/loading/loading";

export const ChartContext = createContext();

export default function ChartContextProvider({ children }) {
    const [items, setItems] = useState([]);
    const [totalChartPrice, setTotalChartPrice] = useState(0);
    const [isLoading, setIsLoading] = useBoolean(true);


    const removeItem = (chartID) => {
        setItems(() => {
            return items.filter((item) => item.chartID !== chartID)
        })
    }

    const addItem = (item) => {
        setItems([...items, item])
    }

    const checkItem = (itemID) => {
        items.forEach(item => {
            if (item.itemID === itemID) {
                return true
            }
        })

        return false
    }

    const itemCheckHandler = (chartID, checked) => {
        setItems(() => {
            return items.map((item) => {
                if (item.chartID === chartID) {
                    item.checked = checked;
                }

                return item
            })
        })
    }

    const changeChartItemQuantity = (chartID, itemQuantity) => {
        setItems(() => {
            console.log(items)
            return items.map((item) => {
                if (item.chartID === chartID) {
                    item.itemQuantity = itemQuantity
                }

                return item;
            })
        })
    }

    const initializeItems = async () => {
        try {
            setIsLoading.on();
            const fetchedItems = await fetchApi("https://fakestoreapi.com/carts/1");
            console.log(fetchedItems.products);
            const temp_items = await Promise.all(fetchedItems.products.map(async (fetchedItem, index) => {
                const fetchedItemDetail = await fetchApi("https://fakestoreapi.com/products/" + fetchedItem.productId);
                const item = {
                    "chartID": index,
                    "itemID": fetchedItem.productId,
                    "itemImg": fetchedItemDetail.image,
                    "itemName": fetchedItemDetail.title,
                    "itemQuantity": fetchedItem.quantity,
                    "itemPrice": fetchedItemDetail.price,
                    "itemStock": 20,
                    "checked": true,
                };

                return item;
            }))

            setItems(temp_items)
        }

        catch (err) {
            console.log(err);
        }

        finally {
            setIsLoading.off();
        }
    }

    useEffect(() => {
        initializeItems();
    }, [])

    useEffect(() => {
        setTotalChartPrice(items.length > 0 ? (items.reduce((previousPrice, item) => item.checked ? previousPrice + item.itemPrice * item.itemQuantity : previousPrice, 0)).toFixed(1) : 0)
    }, [items])

    return (
        <ChartContext.Provider value={{ items, changeChartItemQuantity, itemCheckHandler, addItem, removeItem, totalChartPrice }}>
            {
                isLoading ? 
                    <Flex
                        minH={"100vh"}
                        minW={"100vw"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Loading />
                    </Flex> 
                : 
                    children
            }
        </ChartContext.Provider>
    )
}