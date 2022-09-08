import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";

export const ChartContext = createContext();


export default function ChartContextProvider({ children }) {
    const [items, setItems] = useState([]);
    const [totalChartPrice, setTotalChartPrice] = useState(0);
    /*const { data, status } = useQuery("fetchItems", async ()=>{
        return await fetchApi("https://fakestoreapi.com/carts/1")
    }, {
        onSuccess: (data) => {
            setItems(data.products);
        }
    });*/


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
        return;
    }

    const initializeItems = async () => {
        try {
            //setIsLoading.on();
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
    }


    useEffect(() => {
        //setTotalChartPrice(items.length > 0 ? (items.reduce((previousPrice, item) => item.checked ? previousPrice + item.itemPrice * item.itemQuantity : previousPrice, 0)).toFixed(1) : 0)
    }, [items])

    //if(status === 'loading'){
      //  return <FullscreeLoading />
    //}

    return (
        <ChartContext.Provider value={{ items, changeChartItemQuantity, itemCheckHandler, addItem, removeItem, totalChartPrice }}>
            {
                children
            }
        </ChartContext.Provider>
    )
}