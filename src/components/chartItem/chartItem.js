import { Stack, Flex, Checkbox, Heading, Text, HStack, Link, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { Trash } from "react-feather";
import { useItemQunatity } from "./chartItemQuantityManager/itemQuantityHooks";
import { useContext, useEffect, useState } from 'react';
import { ChartContext } from '../context/chartContext';
import ChartItemQuantitiyManager from './chartItemQuantityManager/chartItemQuantityManager';
import ActionIcon from "../../components/smallcomponent/icons/icon";

export default function ChartItem({chartID, itemID, itemImg, itemName, itemQuantity, itemPrice, itemStock}){
    const [itemBought, setItemBought] = useItemQunatity(itemQuantity, itemStock);
    const [itemChecked, setItemChecked] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const {changeChartItemQuantity, itemCheckHandler, removeItem} = useContext(ChartContext);

    const checkClickHandler = () =>{
        setItemChecked(!itemChecked);
    }

    const trashClickHandler = () => {
        removeItem(chartID);
    }
    
    useEffect(()=>{
        setTotalPrice(itemPrice * itemBought);
        changeChartItemQuantity(chartID, itemBought);
    }, [itemBought])

    useEffect(()=>{
        itemCheckHandler(chartID, itemChecked)
    }, [itemChecked])

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
                        isChecked={itemChecked}
                        onChange={checkClickHandler}
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
                            {itemName}
                        </Text>
                        <Heading 
                            as={"h2"}
                            fontSize={"md"}
                        >
                            ${totalPrice}
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
                            Stok tinggal {itemStock}
                        </Text>
                    </HStack>
                </Stack>
                <Stack
                    spacing={"20px"}
                    flex={"1"}
                >
                    <Link
                        as={RouterLink}
                        to={"/item/"+itemID}
                    >
                        <Flex
                            align={"center"}
                            justify={"center"}
                        >
                            <Image
                                fit={"contain"}
                                w={"80px"}
                                h={"80px"}
                                src={itemImg}
                                alt={"Sorry"}
                            />
                        </Flex>
                    </Link>
                    <ActionIcon
                        size={"sm"}
                        label={"Item Trash"}
                        icon={<Trash />}
                        onClick={trashClickHandler}
                    />
                </Stack>
            </HStack>
        </Stack>
    );
}
