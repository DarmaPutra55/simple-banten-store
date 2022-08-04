import { useEffect, useState } from "react";

export function useItemQunatity(itemQuantity, itemStock){
    const [tempItemQuantity, setTempItemQuantity] = useState();
    const [newItemQuantity, setNewItemQuantity] = useState(itemQuantity);
    
    useEffect(()=>{
        if(tempItemQuantity <= itemStock && tempItemQuantity > 0){
            setNewItemQuantity(tempItemQuantity)
        }
    }, [tempItemQuantity])

    return [newItemQuantity, setTempItemQuantity]
}