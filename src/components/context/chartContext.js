import { createContext, useEffect, useState } from "react";

const fItems = [
    {
        chartID: 0,
        itemID: 1,
        itemName: "Bibit Bunga Matahari",
        itemPrice: 300,
        itemQuantity: 2,
        itemStock: 4,
        itemImg: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }, 
    {   
        chartID: 1,
        itemID: 1,
        itemName: "Bibit Bunga Matahari",
        itemPrice: 400,
        itemQuantity: 2,
        itemStock: 4,
        itemImg: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }
]

export const ChartContext = createContext();

export default function ChartContextProvider({ children }) {
    const [items, setItems] = useState(fItems);
    const [prices, setPrices] = useState([]);
    const [totalChartPrice, setTotalChartPrice] = useState(0);

    const initializePriceArray = ()=>{
        setPrices(()=>{
            return items.map((element)=>
                    {
                        const item = {
                            "chartID": element.chartID,
                            "price": element.itemPrice * element.itemQuantity,
                            "checked": true,
                        }

                        return item
                    }
                )
            }
        )
    }

    const updatePrice = () => {
        setPrices(()=>{
            return prices.map((element, i)=>{
                element.price = items[i].itemPrice * items[i].itemQuantity
                return element
            })
        })
    }

    const itemCheckHandler = (chartID, checked) => {
        setPrices(()=>{
            return prices.map((element)=>{
                if(element.chartID === chartID){
                    element.checked = checked;
                }

                return element
            })
        })
    }

    const changeChartItemQuantity = (chartID, itemQuantity) =>{
        setItems(()=>{
            return items.map((element)=>{
                if(element.chartID === chartID){
                    element.itemQuantity = itemQuantity
                }

                return element;
            })
        })
    }


    useEffect(()=>{
        if(prices.length < 1) {  
            initializePriceArray()
        }

        else{
            updatePrice()
        }
    }, [items])

    useEffect(()=>{
        setTotalChartPrice(prices.reduce((previousPrice, price)=> price.checked ? previousPrice+price.price : previousPrice , 0))
    }, [prices])

    return(
        <ChartContext.Provider value={{items, changeChartItemQuantity, itemCheckHandler, totalChartPrice}}>
            { children }
        </ChartContext.Provider>
    )
}