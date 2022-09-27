import { useContext, createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserContext } from "./userContext"
import Cookies from "universal-cookie"
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";
import GetLoginInformation from "../smallcomponent/getLoginInformation/getLoginInformation";
import Item from "../item/item";


export const ChartContext = createContext();


export default function ChartContextProvider({ children }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const [totalChartPrice, setTotalChartPrice] = useState(0);
    const isLocalCartEmpty = cart?.length > 0 ? false : true;
    const { user } = useContext(UserContext)

    const { data: items, fetchStatus: itemFetchStatus } = useQuery(["fetchItems"], async () => {
        return await fetchApi("/carts/" + user?.cartId, {
            credentials: 'include',
        });
    }, {
        enabled: user?.cartId && isLocalCartEmpty ? true : false,
        retry: false,
    });

    const { data: detailedItems, fetchStatus: detailedItemsFetchStatus } = useQuery(["fetchedItemDetail"], async () => {
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
        onSuccess: async (detailedItems) => {
            setCart(detailedItems)
            localStorage.setItem('cart', JSON.stringify(detailedItems));
        },
        onError: (err) => {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    })

    const cartRemoveItemMutation = useMutation(({ cartId, removedCartItemId }) => {
        return fetchApi('/carts/' + cartId + "/" + removedCartItemId,
            {
                credentials: 'include',
                method: "DELETE"
            });
    })

    const cartCheckedItemMutation = useMutation(checkedCartItemId => {
        return fetchApi("/carts/" + user?.cartId + '/' + checkedCartItemId, {
            credentials: 'include',
            method: "UPDATE"
        });
    })

    const cartAddItemMutation = useMutation(({itemId, itemQuantity}) =>{
        return fetchApi("/carts/"+ user?.cartId, {
            credentials: 'include',
            method: "POST"
        })
    })

    const removeItem = (cartItemId) => {
        if (typeof cartItemId !== 'number') return;
        cartRemoveItemMutation.mutate({ "cartId": user?.cartId, "removedCartItemId": cartItemId });
        setCart((cart) => { return cart.filter((item) => item?.id !== cartItemId) });
        console.log("Done");
    }

    const addItem = (item) => {
        return;
    }

    const checkItem = (cartItemId) => {
        return;
    }

    const itemCheckHandler = (cartItemId, checked) => {
        if (typeof checked !== 'boolean') return;
        setCart((cart) => {
            return cart.map((item) => {
                if (item?.id === cartItemId) item.checked = checked;
                return item;
            })
        })
    }

    const changeChartItemQuantity = (cartItemId, jumlah) => {
        if (typeof jumlah !== 'number') return;
        setCart((cart) => {
            return cart.map((item) => {
                if (item?.id === cartItemId) item.jumlah = jumlah;
                return item;
            })
        })
    }

    const initializeItems = async () => {
        return;
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setTotalChartPrice(cart?.length > 0 ? cart.reduce((previousPrice, item) => item.checked ? previousPrice + item.harga * item.jumlah : previousPrice, 0) : 0)
    }, [cart])

    //if(status === 'loading'){
    //  return <FullscreeLoading />
    //}

    return (
        <ChartContext.Provider value={{ cart, totalChartPrice, removeItem, itemCheckHandler, changeChartItemQuantity }}>
            {
                detailedItemsFetchStatus === 'fetching' || itemFetchStatus === 'fetching' ?
                    <FullscreeLoading />
                    :
                    children
            }
        </ChartContext.Provider>
    )
}