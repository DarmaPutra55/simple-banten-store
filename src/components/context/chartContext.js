import { useContext, createContext, useEffect, useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./userContext"
import Cookies from "universal-cookie"
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";
import GetLoginInformation from "../smallcomponent/getLoginInformation/getLoginInformation";
import Item from "../item/item";


export const ChartContext = createContext();


export default function ChartContextProvider({ children }) {
    const [totalChartPrice, setTotalChartPrice] = useState(0);
    const { user } = useContext(UserContext)
    const queryClient = useQueryClient();

    const { data: items, fetchStatus: itemFetchStatus } = useQuery(["fetchItems"], async () => {
        return await fetchApi("/carts/", {
            mode: "cors",
            credentials: 'include',
        });
    }, {
        enabled: user?.cartId ? true : false,
        retry: false,
    });

    /*const { data: detailedItems, fetchStatus: detailedItemsFetchStatus } = useQuery(["fetchedItemDetail"], async () => {
        return await Promise.all(items.table_cart_barang.map(async (item) => {
            const detailedItem = await fetchApi('/products/' + item.id_barang);
            item.gambar = detailedItem.gambar
            item.nama = detailedItem.nama;
            item.stok = detailedItem.stok;
            item.harga = detailedItem.harga;
            return item;
        }));
    }, {
        enabled: items?.id > 0 ? true : false,
        onSuccess: (items)=>{
            setTotalChartPrice(items?.length > 0 ? items.reduce((previousPrice, item) => item.checked ? previousPrice + item.harga * item.jumlah : previousPrice, 0) : 0)
        }
    })*/

    const detailedItems = useQueries({
        queries: items? items.table_cart_barang.map((item)=>{
            return {
                queryKey: ["item"+item.id],
                queryFn: async ()=>{
                    const detailedItem = await fetchApi('/products/' + item.id_barang);
                    item.gambar = detailedItem.gambar
                    item.nama = detailedItem.nama;
                    item.stok = detailedItem.stok;
                    item.harga = detailedItem.harga;
                    return item;
                },

                enabled: items?.id > 0 ? true : false,
            }
        }) : []
    })

    const detailedItemsFetchStatus = detailedItems.some(result => result.fetchStatus === "fetching")

    const cartRemoveItemMutation = useMutation(({ cartId, removedCartItemId }) => {
        return fetchApi('/carts/' + removedCartItemId,
            {
                credentials: 'include',
                method: "DELETE"
            });
    })

    const cartItemUpdateMutation = useMutation(({cartItemId, cartId, itemId, itemQuantity, checked}) => {
        return fetchApi("/carts/" + cartItemId, {
            credentials: 'include',
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_cart": cartId,
                "id_barang": itemId,
                "jumlah": itemQuantity,
                "checked": checked
            })
        });
    }, {
        onSuccess: (data)=>{
            const oldItemDetail = detailedItems.find((item)=> item.data.id === data.id);
            let newItemDetail = data;
            newItemDetail.gambar = oldItemDetail.data.gambar
            newItemDetail.nama = oldItemDetail.data.nama;
            newItemDetail.stok = oldItemDetail.data.stok;
            newItemDetail.harga = oldItemDetail.data.harga;
            queryClient.setQueriesData(["item"+data.id], newItemDetail);
            //setTotalChartPrice(detailedItems?.length > 0 ? detailedItems.reduce((previousPrice, item) => item?.data?.checked ? previousPrice + item.data.harga * item.data.jumlah : previousPrice, 0) : 0)
        }
    })

    const cartAddItemMutation = useMutation(({itemId, itemQuantity}) =>{
        return fetchApi("/carts/"+ user?.cartId, {
            mode: "cors",
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
    })

    const removeItem = (cartItemId, itemId, itemQuantity) => {
        if (typeof cartItemId !== 'number') return;
        cartRemoveItemMutation.mutate({ "cartId": user?.cartId, "removedCartItemId": cartItemId });
    }

    const addItem = (item) => {
        return;
    }

    const checkItem = (cartItemId) => {
        return;
    }

    const updateCartItemHandler = (cartItemId, itemId, itemQuantity, checked) => {
        if (typeof cartItemId !== 'number') return;
        if (typeof itemId !== 'number') return;
        if (typeof itemQuantity !== 'number') return;
        if (typeof checked !== 'boolean') return;
        cartItemUpdateMutation.mutate({
            "cartItemId": cartItemId,
            "cartId" : user?.cartId,
            "itemId" : itemId,
            "itemQuantity" : itemQuantity,
            "checked" : checked
        });
    }

    useEffect(()=>{
        setTotalChartPrice(detailedItems?.length > 0 ? detailedItems.reduce((previousPrice, item) => item?.data?.checked ? previousPrice + item.data.harga * item.data.jumlah : previousPrice, 0) : 0)
    }, [detailedItems])

    return (
        <ChartContext.Provider value={{detailedItems, totalChartPrice, removeItem, updateCartItemHandler }}>
            {
                detailedItemsFetchStatus || itemFetchStatus === 'fetching' ?
                    <FullscreeLoading />
                    :
                    children
            }
        </ChartContext.Provider>
    )
}