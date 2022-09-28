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

export default function ChartItem({ id, id_barang, gambar, nama, stok, harga, jumlah, checked }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [itemBought, setItemBought] = useItemQuantity(jumlah, stok);
    const [itemChecked, setItemChecked] = useState(checked);
    const [totalPrice, setTotalPrice] = useState(0);
    const { updateCartItemHandler } = useContext(ChartContext);
    let firstRender = useRef(true);

    const checkClickHandler = () => {
        setItemChecked(!itemChecked);
    }

    const trashClickHandler = () => {
        onOpen();
    }

    const inputChangeHandler = (e) => {
        setItemBought(e.target.value);
    }

    const plusChangeHandler = () => {
        setItemBought(itemBought + 1);
    }

    const minusChangeHandler = () => {
        if (itemBought === 1) {
            onOpen()
        }
        else {
            setItemBought(itemBought - 1);
        }
    }
   
    useEffect(() => {
        setTotalPrice(harga * itemBought);
    }, [itemBought, harga])

    useEffect(() => {
        firstRender.current ? firstRender.current = false : updateCartItemHandler(id, id_barang, itemBought, itemChecked);
    }, [itemBought, itemChecked])


    return (
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
                        to={"/item/" + id_barang}
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
