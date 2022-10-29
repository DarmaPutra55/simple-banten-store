import { Stack, Flex, Checkbox, Heading, Text, HStack, Link, Image, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { Trash } from "react-feather";
import { useItemQuantity } from "../smallcomponent/itemQuantityManager/itemQuantityHooks";
import { useContext, useEffect, useRef, useState } from 'react';
import { ChartContext } from '../context/chartContext';
import ItemQuantitiyManager from '../smallcomponent/itemQuantityManager/itemQuantityManager';
import ActionIcon from "../../components/smallcomponent/icons/icon";
import AlertDialog from '../alertDialog/alertDialog';
import CurrencyFormatter from "../../components/smallcomponent/currencyFormatter/currencyFormatter"
import { SmallLoading } from '../smallcomponent/loading/loading';

export default function ChartItem({ cartId: id, id: id_barang, diskon, gambar, nama, stok, harga, jumlah, checked, addMutatedCartItemHandler, removeMutatedCartItemHandler, isItemMutating }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [itemBought, setItemBought] = useItemQuantity(jumlah, stok);
    const [itemChecked, setItemChecked] = useState(checked);
    const [totalPrice, setTotalPrice] = useState(0);
    const { updateCartItemHandler, isCartItemMutationLoading } = useContext(ChartContext);
    let firstRender = useRef(true);

    const checkClickHandler = () => {
        setItemChecked(!itemChecked);
        //updateCartItemHandler(id, id_barang, itemBought, itemChecked);
    }

    const trashClickHandler = () => {
        onOpen();
    }

    const inputChangeHandler = (e) => {
        setItemBought(e.target.value);
        //updateCartItemHandler(id, id_barang, itemBought, itemChecked);
    }

    const plusChangeHandler = () => {
        setItemBought(itemBought + 1);
        //updateCartItemHandler(id, id_barang, itemBought, itemChecked);
    }

    const minusChangeHandler = () => {
        if (itemBought === 1) {
            onOpen()
        }
        else {
            setItemBought(itemBought - 1);
            //updateCartItemHandler(id, id_barang, itemBought, itemChecked);
        }
    }

    useEffect(() => {
        setTotalPrice((harga - (Math.round(harga * diskon) / 100)) * itemBought);
    }, [itemBought, harga])

    useEffect(() => {
        if(firstRender.current) { 
            firstRender.current = false 
        }
        else{
            addMutatedCartItemHandler(id);
            updateCartItemHandler(id, id_barang, itemBought, itemChecked, {
                onSuccess: ()=>{
                    removeMutatedCartItemHandler(id);

                }
            })
        }
    }, [itemBought, itemChecked])

    return (
        isCartItemMutationLoading && isItemMutating  ?
            <SmallLoading />
            :
            <Stack
                py={"8px"}
                px={"10px"}
                bgColor={"white"}
            >
                <AlertDialog
                    chartItemId={id}
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
                            <ItemQuantitiyManager
                                itemQuantity={itemBought}
                                setItemQuantity={setItemBought}
                                inputChangeHandler={inputChangeHandler}
                                plusChangeHandler={plusChangeHandler}
                                minusChangeHandler={minusChangeHandler}
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
                            to={"/item/" + id}
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
                        <Flex w={"100%"} justify={"center"}>
                            <ActionIcon
                                size={"sm"}
                                label={"Item Trash"}
                                icon={<Trash />}
                                onClick={trashClickHandler}
                            />
                        </Flex>

                    </Stack>
                </HStack>
            </Stack>
    );
}
