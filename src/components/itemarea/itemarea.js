import { Flex, useBoolean, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CurrencyFormatter from "../smallcomponent/currencyFormatter/currencyFormatter"
import Loading from "../smallcomponent/loading/loading";
import Item from "../item/item";
import fetchApi from "../smallcomponent/fetchApi/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from "react-router-dom";


export default function ItemArea() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [link, setLink] = useState('');
    const queryClient = useQueryClient();

    useEffect(()=>{
        let fetchLink = "/products";
        if (searchParams.has("nama")) fetchLink = fetchLink + "?nama=" + searchParams.get("nama");
        if (searchParams.has("kategori")) fetchLink = fetchLink + "?kategori=" + searchParams.get("kategori");
        queryClient.invalidateQueries(["items"]);
        setLink(fetchLink);
    }, [searchParams])

    const {data: items, isLoading: isItemsLoading} = useQuery(['items'], async ()=>{
        return await fetchApi(link)
    }, {
        retry: false,
        enabled: link ? true : false,
        onSettled: ()=>{
            setLink(''); //Reset the link after done fetching so it won't use the same link over and over again.
        }
    });
    

    return (
        <>
            {
                isItemsLoading ?
                    <Loading />
                    :

                    <Flex
                        flexWrap={"wrap"}
                        justify={["baseline", "baseline", "center"]}
                    >
                        {
                            items?.length > 0 ?
                            Array(items.length).fill('').map((_, i) => {
                                return <Item
                                    key={i}
                                    id={items[i].id}
                                    img={items[i].gambar}
                                    name={items[i].nama}
                                    price={items[i].diskon > 0 ? CurrencyFormatter((items[i].harga - (Math.round(items[i].harga * items[i].diskon) / 100))) : CurrencyFormatter(items[i].harga)}
                                    originalPrice={CurrencyFormatter(items[i].harga)}
                                    discount={items[i].diskon}
                                    rating={items[i].rating.rate}
                                    sold={items[i].sold}
                                />;
                            })
                            :
                            <Flex minWidth={"100%"} justify={"center"}>
                                <Text>Tidak ada barang yang ditemukan</Text>
                            </Flex>
                        }
                    </Flex>
            }
        </>
    )
}