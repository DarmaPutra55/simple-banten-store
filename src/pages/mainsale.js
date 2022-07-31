import SearchBar from "../components/searchbar/searchbar";
import ItemArea from "../components/itemarea/itemarea";
import { Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export default function MainSale(){
    const [searchParams, setSearchParams] = useSearchParams();
    const getParams = () => {
        return searchParams.get("itemName") ? searchParams.get("itemName").toLowerCase() : "";
    }
    return(
        <Stack>
            <SearchBar />
            <ItemArea searchParams = { getParams() }/>
        </Stack>
    );
}