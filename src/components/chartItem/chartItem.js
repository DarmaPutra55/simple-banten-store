import { Stack, Flex, Checkbox, Heading, Text, HStack, InputGroup, InputLeftAddon, InputRightAddon, Input, Link, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import ActionIcon from "../../components/smallcomponent/icons/icon";
import { Plus, Minus, Trash } from "react-feather";
import { useItemQunatity } from "./chartItemQuantityManager/itemQuantityHooks";
import ChartItemQuantitiyManager from './chartItemQuantityManager/chartItemQuantityManager';

export default function ChartItem({props}){
    const [itemBought, setItemBought] = useItemQunatity(props.itemQuantity, props.itemStock);

    return(
        <Stack
            py={"8px"}
            px={"10px"}
            bgColor={"white"}
        >
            <HStack
                spacing={"8px"}
            >
                <Flex
                    align={"flex-start"}
                    h={"65%"}
                >
                    <Checkbox 
                        defaultChecked
                    />
                </Flex>
                <Stack
                    spacing={"8px"}
                    flex={"3"}
                >
                    <Stack
                        spacing={"2px"}
                    >
                        <Text
                            fontSize={"sm"}
                        >
                            {props.itemName}
                        </Text>
                        <Heading 
                            as={"h2"}
                            fontSize={"md"}
                        >
                            ${props.itemPrice * itemBought}
                        </Heading>
                    </Stack>
                    <HStack
                        spacing={"15px"}
                    >
                        <ChartItemQuantitiyManager 
                            itemQuantity={itemBought}
                            setItemQuantity={setItemBought}
                        />
                        <Text
                            fontSize={"sm"}
                            color={"red.400"}
                        >
                            Stok tinggal {props.itemStock}
                        </Text>
                    </HStack>
                </Stack>
                <Stack
                    spacing={"20px"}
                    flex={"1"}
                >
                    <Link
                        as={RouterLink}
                        to={"/item/"+props.itemID}
                    >
                        <Flex
                            align={"center"}
                            justify={"center"}
                        >
                            <Image
                                fit={"contain"}
                                w={"80px"}
                                h={"80px"}
                                src={props.itemImg}
                                alt={"Sorry"}
                            />
                        </Flex>
                    </Link>
                    <ActionIcon
                        size={"sm"}
                        label={"Item Trash"}
                        icon={<Trash />}
                        onClick={()=>{console.log("Trash")}}
                    />
                </Stack>
            </HStack>
        </Stack>
    );
}
