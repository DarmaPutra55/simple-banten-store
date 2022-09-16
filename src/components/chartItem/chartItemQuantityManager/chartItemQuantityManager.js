import { InputGroup, InputLeftAddon, InputRightAddon, Input } from '@chakra-ui/react'
import { Plus, Minus } from "react-feather";
import ActionIcon from "../../../components/smallcomponent/icons/icon";

export default function ChartItemQuantitiyManager({onOpen, itemQuantity, setItemQuantity}){
    
    const inputChangeHandler = (e) => {
        setItemQuantity(e.target.value);
    }

    const plusChangeHandler = () => {
        setItemQuantity(itemQuantity+1);
    }

    const minusChangeHandler = () => {
        if(itemQuantity === 1){
            onOpen()
        }
        else{
            setItemQuantity(itemQuantity-1);
        }
    }

    return(
        <InputGroup
            w={"fit-content"}
        >
            <InputLeftAddon
                px={"0"}
            >
                <ActionIcon
                    size={"sm"}
                    label={"Item Plus"}
                    icon={<Plus />}
                    onClick={plusChangeHandler}
                />
            </InputLeftAddon>
            <Input
                minW={'65px'}
                maxW={'65px'}
                value={itemQuantity}
                textAlign={"center"}
                onChange={inputChangeHandler}
            />
            <InputRightAddon
                px={"0"}
            >
                <ActionIcon
                    size={"sm"}
                    label={"Item Minus"}
                    icon={<Minus />}
                    onClick={minusChangeHandler}
                />
            </InputRightAddon>
        </InputGroup>
    )
}