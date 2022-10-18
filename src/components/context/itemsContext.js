import { useContext, createContext, useEffect, useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./userContext"
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";
import { useToast } from "@chakra-ui/react";


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