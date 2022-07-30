import { useState } from "react";

export default function useSearchItems(searchText = ""){
    const [searchParams, setSearchParams] = useState(searchText);

    return [searchParams, setSearchParams];
}