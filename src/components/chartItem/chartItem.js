import { Stack, Flex, Checkbox, Heading, Text, HStack, InputGroup, InputLeftAddon, InputRightAddon, Input, Link, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import ActionIcon from "../../components/smallcomponent/icons/icon";
import { Plus, Minus, Trash } from "react-feather";

export default function ChartItem(){
    const props = {
        itemID: 1,
        itemName: "Bibit Bunga Matahari",
        itemPrice: 300,
        itemQuantity: 2,
        itemStock: 4,
        itemImg: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }

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
                            ${props.itemPrice}
                        </Heading>
                    </Stack>
                    <HStack
                        spacing={"15px"}
                    >
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
                                    onClick={()=>{console.log("Plus")}}
                                />
                            </InputLeftAddon>
                            <Input
                                maxW={['15vw', "15w", "100px"]}
                                defaultValue={props.itemQuantity}
                                textAlign={"center"}
                            />
                            <InputRightAddon
                                px={"0"}
                            >
                                <ActionIcon
                                    size={"sm"}
                                    label={"Item Minus"}
                                    icon={<Minus />}
                                    onClick={()=>{console.log("Minus")}}
                                />
                            </InputRightAddon>
                        </InputGroup>
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
