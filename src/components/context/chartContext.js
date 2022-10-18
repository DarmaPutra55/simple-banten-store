import { useContext, createContext, useEffect, useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./userContext"
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";
import { useToast } from "@chakra-ui/react";


export const ChartContext = createContext();


export default function ChartContextProvider({ children }) {
    const [totalChartPrice, setTotalChartPrice] = useState(0);
    const { user } = useContext(UserContext)
    const queryClient = useQueryClient();
    const toast = useToast();

    const { data: items, fetchStatus: itemFetchStatus } = useQuery(["fetchChartItems"], async () => {
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
        queries: items ? items.table_cart_barang.map((item) => {
            return {
                queryKey: ["item" + item.id],
                queryFn: async () => {
                    const detailedItem = await fetchApi('/products/' + item.id_barang);
                    item.gambar = detailedItem.gambar
                    item.nama = detailedItem.nama;
                    item.stok = detailedItem.stok;
                    item.harga = detailedItem.harga;
                    item.diskon = detailedItem.diskon;
                    return item;
                },

                enabled: items?.id > 0 ? true : false,
            }
        }) : []
    })

    const detailedItemsFetchStatus = detailedItems.some(result => result.fetchStatus === "fetching")

    const cartRemoveItemMutation = useMutation(({ removedCartItemId }) => {
        return fetchApi('/carts/' + removedCartItemId,
            {
                credentials: 'include',
                method: "DELETE"
            });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("fetchChartItems");
        }
    })

    const cartItemUpdateMutation = useMutation(({ cartItemId, cartId, itemId, itemQuantity, checked }) => {
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
        onSuccess: (data) => {
            const oldItemDetail = detailedItems.find((item) => item.data.id === data.id);
            let newItemDetail = data;
            newItemDetail.gambar = oldItemDetail.data.gambar
            newItemDetail.nama = oldItemDetail.data.nama;
            newItemDetail.stok = oldItemDetail.data.stok;
            newItemDetail.harga = oldItemDetail.data.harga;
            newItemDetail.diskon = oldItemDetail.data.diskon;
            queryClient.setQueriesData(["item" + data.id], newItemDetail);
            //setTotalChartPrice(detailedItems?.length > 0 ? detailedItems.reduce((previousPrice, item) => item?.data?.checked ? previousPrice + item.data.harga * item.data.jumlah : previousPrice, 0) : 0)
        }
    })

    const cartAddItemMutation = useMutation(({ itemId, itemQuantity }) => {
        return fetchApi("/carts", {
            mode: "cors",
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_barang": itemId,
                "jumlah": itemQuantity,
            })
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("fetchChartItems");
        }
    })

    const removeItem = (cartItemId) => {
        if (typeof cartItemId !== 'number') return;
        cartRemoveItemMutation.mutate({ "removedCartItemId": cartItemId });
    }

    const addItem = (item) => {
        return;
    }

    const checkItem = (cartItemId) => {
        return;
    }

    const cartAddItemHandler = (itemId, itemQuantity) => {
        if (typeof itemId !== 'number') return;
        if (typeof itemQuantity !== 'number') return;
        cartAddItemMutation.mutate({ itemId, itemQuantity }, {
            onSuccess: () => {
                toast({
                    title: "Item ditambahkan",
                    description: "Item berhasil ditambah ke cart.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
            },
            onError: () => {
                toast({
                    title: "Gagal menambah item",
                    description: user?.id ? "Terjadi kesalahan saat menambahkan item." : "Silahkan login terlebih dahulu.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        })
    }

    const updateCartItemHandler = (cartItemId, itemId, itemQuantity, checked, option = {}) => {
        if (typeof cartItemId !== 'number') return;
        if (typeof itemId !== 'number') return;
        if (typeof itemQuantity !== 'number') return;
        if (typeof checked !== 'boolean') return;
        cartItemUpdateMutation.mutate({
            "cartItemId": cartItemId,
            "cartId": user?.cartId,
            "itemId": itemId,
            "itemQuantity": itemQuantity,
            "checked": checked
        }, option)
    }

    const updateCartItemHandlerWithToast = (cartItemId, itemId, itemQuantity, checked) => {
        updateCartItemHandler(cartItemId, itemId, itemQuantity, checked, {
            onSuccess: () => {
                toast({
                    title: "Item diupdate",
                    description: "Item berhasil diupdate.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            },
            onError: () => {
                toast({
                    title: "Gagal mengupdate item",
                    description: user?.id ? "Terjadi kesalahan saat mengupdate item." : "Silahkan login terlebih dahulu.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }
        })
    }

    useEffect(() => {
        setTotalChartPrice(detailedItems?.length > 0 ? detailedItems.reduce((previousPrice, item) => item?.data?.checked ? previousPrice + (item.data.harga - (Math.round(item.data.harga * item.data.diskon) / 100)) * item.data.jumlah : previousPrice, 0) : 0)
    }, [detailedItems])

    return (
        <ChartContext.Provider value={{
            detailedItems, totalChartPrice, removeItem, updateCartItemHandler, updateCartItemHandlerWithToast, cartAddItemHandler, "isCartItemMutationLoading":
                (cartAddItemMutation.isLoading ||
                    cartItemUpdateMutation.isLoading ||
                    cartRemoveItemMutation.isLoading ? true : false)
        }}>
            {
                detailedItemsFetchStatus ||
                    itemFetchStatus === 'fetching' ?

                    <FullscreeLoading />
                    :
                    children
            }
        </ChartContext.Provider>
    )
}