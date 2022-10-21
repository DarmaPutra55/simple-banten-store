import { BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useLocation, useSearchParams, Link as ReactLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../components/context/itemsContext";
import ItemArea from "../components/itemarea/itemarea";
import ResponsiveBreadcrumb from "../components/smallcomponent/responsiveBreadcrumb/responsiveBreadcrumb";

export default function MainSale() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewedItem, setViewedItem] = useState([]);
    const { items } = useContext(ItemContext);
    const location = useLocation();

    useEffect(() => {
        setViewedItem(items.filter((item) => {
            const isKategoriMatch = item.kategori.toLowerCase().includes(searchParams.has("kategori") ? searchParams.get("kategori") : "");
            const isNamaIncluded = item.nama.toLowerCase().includes(searchParams.has("nama") ? searchParams.get("nama") : "");
            if (isNamaIncluded && isKategoriMatch) return item;
        }));
    }, [location])

    /*const [link, setLink] = useState('');
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
    */
    return (
        <>
            <ResponsiveBreadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={ReactLink}
                        to="/"
                    >
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </ResponsiveBreadcrumb>
            <ItemArea items={viewedItem} />
        </>
    );
}