import SearchBar from "../components/searchbar/searchbar";
import ItemArea from "../components/itemarea/itemarea";
import { Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export default function MainSale(){
    const [searchParams, setSearchParams] = useSearchParams();
    const getParams = () => {
        let searchParamsMap = new Map();

        if(searchParams.has("itemName")) searchParamsMap.set("itemName", searchParams.get("itemName").toLowerCase());
        if(searchParams.has("itemCategory")) searchParamsMap.set("itemCategory", searchParams.get("itemCategory").toLowerCase());

        return searchParamsMap;
    }
    return(
        <Stack minW={"100%"}>
            <SearchBar />
            <ItemArea searchParams = { getParams() }/>
        </Stack>
    );
}