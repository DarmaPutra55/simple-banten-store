import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie"
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";


export const ChartContext = createContext();


export default function ChartContextProvider({ children }) {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    const isLocalCartEmpty = localCart?.length > 0 ? false : true;
    const { data: login, fetchStatus: loginStatus } = useQuery(["loginUser"], async ()=>{
        const form = JSON.stringify({
            "email":"testing9@testmail.com",
            "username": "Delta9",
            "password": "123"
        })

        /*const formData = new FormData()

        formData.append("email", "testing9@testmail.com");
        formData.append("username", "Delta9");
        formData.append('password', '123');*/
        return await fetchApi("http://192.168.1.24:3001/login", {
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

    const { data: user, fetchStatus: userStatus } = useQuery(["fetchUser"], async ()=>{
        return await fetchApi("http://192.168.1.24:3001/login", {
            credentials: 'include',
        });   
    }, {
        enabled: isLocalCartEmpty,
        retry: false
    })
    
    const { data: items, fetchStatus: itemStatus } = useQuery(["fetchItems"], async ()=>{
        return await fetchApi("http://192.168.1.24:3001/carts/"+user?.cartId, {
            credentials: 'include',
        });
    }, {
        enabled: user?.cartId ? true : false,
        retry: false,
        onSuccess: (items) => {
            localStorage.setItem('cart', JSON.stringify(items.table_cart_barang));
        },
        onError: (err)=>{
            localStorage.setItem('cart', JSON.stringify([]));
        }
    });
    const [totalChartPrice, setTotalChartPrice] = useState(0);

    const removeItem = (chartID) => {
        return;
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


    useEffect(() => {
        //setTotalChartPrice(items.length > 0 ? (items.reduce((previousPrice, item) => item.checked ? previousPrice + item.itemPrice * item.itemQuantity : previousPrice, 0)).toFixed(1) : 0)
    }, [])

    //if(status === 'loading'){
      //  return <FullscreeLoading />
    //}

    return (
        <ChartContext.Provider value={{}}>
            {
                userStatus === 'fetching' || itemStatus === 'fetching' || loginStatus === 'fetchin' ? 
                    <FullscreeLoading/> 
                : 
                    children
            }
        </ChartContext.Provider>
    )
}