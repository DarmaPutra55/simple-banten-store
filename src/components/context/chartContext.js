import { createContext, useEffect, useState } from "react";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";

export const ChartContext = createContext();

export default function ChartContextProvider({ children }) {
    const [items, setItems] = useState([]);
    const [totalChartPrice, setTotalChartPrice] = useState(0);


    const removeItem = (chartID)=>{
        setItems(()=>{
            return items.filter((element)=> element.chartID !== chartID)
        })
    }

    const addItem = (item)=> {
        setItems([...items, item])
    }

    const checkItem = (itemID) =>{
        items.forEach(element => {
            if(element.itemID === itemID){
                return true
            }
        })

        return false
    }

    const itemCheckHandler = (chartID, checked) => {
        setItems(()=>{
            return items.map((element)=>{
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
       //initializeItems();
    }, [])

    useEffect(()=>{
        setTotalChartPrice(items.length > 0 ? items.reduce((previousPrice, item)=> item.checked ? previousPrice+item.itemPrice * item.itemQuantity : previousPrice , 0) : 0)
    }, [items])

    return(
        <ChartContext.Provider value={{items, changeChartItemQuantity, itemCheckHandler, addItem, removeItem, totalChartPrice}}>
            { children }
        </ChartContext.Provider>
    )
}