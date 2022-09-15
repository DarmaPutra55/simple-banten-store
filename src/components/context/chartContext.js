import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie"
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";
import GetLoginInformation from "../smallcomponent/getLoginInformation/getLoginInformation";


export const ChartContext = createContext();


export default function ChartContextProvider({ children }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const [totalChartPrice, setTotalChartPrice] = useState(0);
    const isLocalCartEmpty = cart?.length > 0 ? false : true;
    const { data: login, fetchStatus: loginFetchStatus } = useQuery(["loginUser"], async () => {
        const form = JSON.stringify({
            "email": "testing9@testmail.com",
            "username": "Delta9",
            "password": "123"
        })

        /*const formData = new FormData()

        formData.append("email", "testing9@testmail.com");
        formData.append("username", "Delta9");
        formData.append('password', '123');*/
        return await fetchApi("http://192.168.1.22:3001/login", {
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: form
        })
    }, {
        retry: false
    })

    const [user, userFetchStatus] = GetLoginInformation({
        enabled: isLocalCartEmpty,
        retry: false
    })

    const { data: items, fetchStatus: itemFetchStatus } = useQuery(["fetchItems"], async () => {
        return await fetchApi("http://192.168.1.22:3001/carts/" + user?.cartId, {
            credentials: 'include',
        });
    }, {
        enabled: user?.cartId ? true : false,
        retry: false,
    });

    const { data: detailedItems, fetchStatus: detailedItemsFetchStatus } = useQuery(["fetchedItemDetail"], async () => {
        return await Promise.all(items.table_cart_barang.map(async (item) => {
            const detailedItem = await fetchApi('http://192.168.1.22:3001/products/' + item.id_barang);
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

    const cartRemoveItemMutation = useMutation(removedCartItemId => {
        return fetchApi('http://192.168.1.22:3001/carts/' + user?.cartId + "/" + removedCartItemId,
            {
                credentials: 'include',
                method: "DELETE"
            });
    })

    const cartCheckedItemMutation = useMutation(checkedCartItemId => {
        return fetchApi("http://192.168.1.22:3001/carts/" + user?.cartId + '/' + checkedCartItemId, {
            credentials: 'include',
            method: "UPDATE"
        });
    })

    const removeItem = (cartItemId) => {
        cartRemoveItemMutation.mutate(cartItemId);
        console.log("Done");
    }

    const addItem = (item) => {
        return;
    }

    const checkItem = (itemID) => {
        return;
    }

    const itemCheckHandler = (chartID, checked) => {
        return;
    }

    const changeChartItemQuantity = (chartID, itemQuantity) => {
        return;
    }

    const initializeItems = async () => {
        return;
    }

    const cartAddItemDetail = async () => {

    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setTotalChartPrice(cart?.length > 0 ? cart.reduce((previousPrice, item) => item.checked ? previousPrice + item.harga * item.jumlah : previousPrice, 0) : 0)
    }, [cart])

    //if(status === 'loading'){
    //  return <FullscreeLoading />
    //}

    return (
        <ChartContext.Provider value={{ cart, totalChartPrice }}>
            {
                detailedItemsFetchStatus === 'fetching' || userFetchStatus === 'fetching' || itemFetchStatus === 'fetching' || loginFetchStatus === 'fetchin' ?
                    <FullscreeLoading />
                    :
                    children
            }
        </ChartContext.Provider>
    )
}