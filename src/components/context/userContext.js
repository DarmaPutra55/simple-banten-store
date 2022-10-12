import { createContext } from "react";
import { useMutation, useQuery, useQueryClient, QueryCache } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import FullscreeLoading from "../smallcomponent/fullscreenLoading/fullscreenLoading";
import { useToast } from "@chakra-ui/react";



export const UserContext = createContext();


export default function UserContextProvider({ children }) {
    let navigate = useNavigate();
    const toast = useToast();
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
            toast({
                title: "Berhasil login",
                description: "Selamat datang kembali.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            queryClient.removeQueries(["fetchUser"]);
            navigate("/");
        },
        onError: ()=>{
            toast({
                title: "Gagal login",
                description: "Pengguna tidak ditemukan.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
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
            toast({
                title: "Akun berhasil dibuat",
                description: "Terimakasi telah bergabung dengan kami.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            queryClient.removeQueries(["fetchUser"]);
            navigate("/");
        },
        onError: ()=>{
            toast({
                title: "Gagal registrasi",
                description: "Terjadi kesalahan saat melakukan registrasi.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    })

    const logoutMutation = useMutation(()=>{
        return fetchApi("/logout", {
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
        })
    }, {
        retry: false,
        onSuccess: ()=>{
            toast({
                title: "Berhasil logout.",
                description: "Anda telah logout dari E-Banten.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            queryClient.removeQueries();
            navigate("/");
        },
        onError: ()=>{
            toast({
                title: "Gagal registrasi",
                description: "Terjadi kesalahan saat melakukan registrasi.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    })

    const login = (username, password) =>{
        loginMutation.mutate({username, password});
    }

    const register = (email, username, password) =>{
        registerMutation.mutate({email, username, password});
    }

    const logout = () =>{
        logoutMutation.mutate();
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
        <UserContext.Provider value={{user, login, register, logout}}>
            {
                userFetchStatus === 'fetching' ?
                    <FullscreeLoading />
                :
                    children
            }
        </UserContext.Provider>
    )
}