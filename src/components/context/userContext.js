import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { serializeError } from "serialize-error";
import Cookies from "universal-cookie"
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";
import Item from "../item/item";


export const UserContext = createContext();


export default function UserContextProvider({ children }) {
    let navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: user, fetchStatus: userFetchStatus } = useQuery(["fetchUser"], async ()=>{
        return await fetchApi("/login", {
            credentials: 'include',
        });   
    }, {
        retry: false
    })

    const loginMutation = useMutation(({username, password})=>{
        const loginForm = JSON.stringify({
            "username": username,
            "password": password
        })

        return fetchApi("/login", {
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: loginForm
        })
    }, {
        retry: false,
        onSuccess: ()=>{
            queryClient.invalidateQueries(['fetchUser']);
            navigate("/");
        }
    })

    const registerMutation = useMutation(({email, username, password})=>{
        const registerForm = JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        })

        return fetchApi("/register", {
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: registerForm
        })
    }, {
        retry: false,
        onSuccess: ()=>{
            queryClient.invalidateQueries(['fetchUser']);
            navigate("/");
        }
    })

    const login = (username, password) =>{
        loginMutation.mutate({username, password});
    }

    const register = (email, username, password) =>{
        registerMutation.mutate({email, username, password})
    }
    
    /*const { data: login, fetchStatus: loginFetchStatus } = useQuery(["loginUser"], async () => {
        const form = JSON.stringify({
            "email": "testing9@testmail.com",
            "username": "Delta9",
            "password": "123"
        })

        const formData = new FormData()

        formData.append("email", "testing9@testmail.com");
        formData.append("username", "Delta9");
        formData.append('password', '123');
        return await fetchApi("/login", {
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: form
        })
    }, {
        retry: false
    }) */

    return (
        <UserContext.Provider value={{user, login, register}}>
            {
                userFetchStatus === 'fetching' ?
                    <FullscreeLoading />
                :
                    children
            }
        </UserContext.Provider>
    )
}