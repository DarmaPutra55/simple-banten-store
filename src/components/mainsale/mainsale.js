import SearchBar from "./searchbar/searchbar";
import ItemArea from "./itemarea/itemarea";
import { Stack } from "@chakra-ui/react";
import useSearchItems from "./itemarea/itemareahooks";
import { useEffect } from "react";

export default function MainSale(){
    const [searchParams, setSearchParams] = useSearchItems();
    return(
        <Stack>
            <SearchBar setSearchParams={(text)=>{setSearchParams(text)}} />
            <ItemArea searchParams = {searchParams.toLowerCase()}/>
        </Stack>
    );
}