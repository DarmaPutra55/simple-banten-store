import {createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import { FullscreeLoading } from "../smallcomponent/loading/loading";


export const ItemContext = createContext();


export default function ItemContextProvider({ children }) {
    const { data: items, isLoading: isItemsLoading } = useQuery(["fetchItem"], async () => {
        return await fetchApi("/products/", {
            mode: "cors",
            credentials: 'include',
        })
    }, {
        retry: false,
    })

    return (
        <ItemContext.Provider value={{items}}>
            {
                isItemsLoading ?

                    <FullscreeLoading />
                    :
                    children
            }
        </ItemContext.Provider>
    )
}