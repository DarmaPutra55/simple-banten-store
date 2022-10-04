import SearchBar from "../components/searchbar/searchbar";
import ItemArea from "../components/itemarea/itemarea";
import { Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MainSale(){
    return(
        <Stack minW={"100%"}>
            <SearchBar />
            <ItemArea/>
        </Stack>
    );
}