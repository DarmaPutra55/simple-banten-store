import { InputGroup, InputLeftAddon, InputRightAddon, Input } from '@chakra-ui/react'
import { Plus, Minus } from "react-feather";
import ActionIcon from "../icons/icon";

export default function ItemQuantitiyManager({itemQuantity, inputChangeHandler, plusChangeHandler, minusChangeHandler}){

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