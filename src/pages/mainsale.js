import SearchBar from "../components/searchbar/searchbar";
import ItemArea from "../components/itemarea/itemarea";
import { Stack } from "@chakra-ui/react";
import useSearchItems from "../components/itemarea/itemareahooks";
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