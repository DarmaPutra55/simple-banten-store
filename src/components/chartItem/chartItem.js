import { Stack, Flex, Checkbox, Heading, Text, HStack, Link, Image, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { Trash } from "react-feather";
import { useItemQunatity } from "./chartItemQuantityManager/itemQuantityHooks";
import { useContext, useEffect, useState } from 'react';
import { ChartContext } from '../context/chartContext';
import ChartItemQuantitiyManager from './chartItemQuantityManager/chartItemQuantityManager';
import ActionIcon from "../../components/smallcomponent/icons/icon";
import AlertDialog from '../alertDialog/alertDialog';
import CurrencyFormatter from "../../components/smallcomponent/currencyFormatter/currencyFormatter"

export default function ChartItem({id, id_barang, gambar, nama, stok, harga, jumlah, checked}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [itemBought, setItemBought] = useItemQunatity(jumlah, stok);
    const [itemChecked, setItemChecked] = useState(checked);
    const [totalPrice, setTotalPrice] = useState(0);
    const {changeChartItemQuantity, itemCheckHandler} = useContext(ChartContext);

    const checkClickHandler = () =>{
        setItemChecked(!itemChecked);
    }

    const trashClickHandler = () => {
        onOpen();
    }
    
    useEffect(()=>{
        setTotalPrice(harga * itemBought);
        //changeChartItemQuantity(chartID, itemBought);
    }, [itemBought, harga])

    useEffect(()=>{
        //itemCheckHandler(chartID, itemChecked)
    }, [itemChecked])

    return(
            <Stack
                py={"8px"}
                px={"10px"}
                bgColor={"white"}
            >
                <AlertDialog
                    chartID={id}
                    isOpen={isOpen}
                    onClose={onClose}
                />

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
                                {nama}
                            </Text>
                            <Heading 
                                as={"h2"}
                                fontSize={"md"}
                            >
                                {CurrencyFormatter(totalPrice)}
                            </Heading>
                        </Stack>
                        <HStack
                            spacing={"15px"}
                        >
                            <ChartItemQuantitiyManager 
                                onOpen={onOpen}
                                itemQuantity={itemBought}
                                setItemQuantity={setItemBought}
                            />
                            <Text
                                fontSize={"sm"}
                                color={"red.400"}
                            >
                                Stok tinggal {stok}
                            </Text>
                        </HStack>
                    </Stack>
                    <Stack
                        spacing={"20px"}
                        flex={"1"}
                    >
                        <Link
                            as={RouterLink}
                            to={"/item/"+id_barang}
                        >
                            <Flex
                                align={"center"}
                                justify={"center"}
                            >
                                <Image
                                    fit={"contain"}
                                    w={"80px"}
                                    h={"80px"}
                                    src={gambar}
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
