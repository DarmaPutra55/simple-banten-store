import { useQuery } from "@tanstack/react-query";
import fetchApi from "../fetchApi/fetchApi";

export default function GetLoginInformation(option = {}){
    const { data: user, fetchStatus: userFetchStatus } = useQuery(["fetchUser"], async ()=>{
        return await fetchApi("/login", {
            credentials: 'include',
        });   
    }, option)

    return [user, userFetchStatus];
}