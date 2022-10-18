import SearchBar from "../components/searchbar/searchbar";
import ItemArea from "../components/itemarea/itemarea";
import fetchApi from "../components/smallcomponent/fetchApi/fetchApi";
import Loading from "../components/smallcomponent/loading/loading";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "@chakra-ui/react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MainSale() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [link, setLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        let fetchLink = "/products";
        if (searchParams.has("nama")) fetchLink = fetchLink + "?nama=" + searchParams.get("nama");
        if (searchParams.has("kategori")) fetchLink = fetchLink + "?kategori=" + searchParams.get("kategori");
        setLink(fetchLink);
    }, [location])

    const { data: items, isLoading: isItemsLoading } = useQuery(['items'], async () => {
        return await fetchApi(link)
    }, {
        retry: false,
        enabled: link ? true : false,
        onSettled: () => {
            setLink(''); //Reset link after each fetch.
        }
    });

    return (
        isItemsLoading ? <Loading /> : <ItemArea items={items} />
    );
}