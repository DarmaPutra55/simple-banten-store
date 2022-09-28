import { Flex, Heading, Input, InputGroup, InputLeftElement, Box, Link, Text, Icon, Center } from '@chakra-ui/react'
import ActionIcon from '../smallcomponent/icons/icon';
//import { useEffect, useState } from "react";
import { ShoppingCart, Search, User } from "react-feather";
import { useContext, useState } from 'react';
import { useNavigate, useSearchParams, Link as ReactLink } from 'react-router-dom';
import { ChartContext } from '../context/chartContext';

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [searchParams] = useSearchParams();
    const { detailedItems } = useContext(ChartContext);
    const cartCheckedItemCount = detailedItems?.length > 0 ? detailedItems.filter((item) => item.data.checked).length : 0;
    const navigate = useNavigate();
    //Provide the searchTextChangeEvent props with callback function to handle what happen when searchbar value change.
    //Provide the submitEvent props to handle what will happen when user press enter.

    return (
        <Flex
            width={"100%"}
            p={"10px"}
            shadow={"sm"}
            position={"sticky"}
            top={"0"}
            left={"0"}
            bgColor={"white"}
            justify={"center"}
            zIndex={"100"}
        >
            <Flex
                className={"responsiveWidth"}
                justify={"space-between"}
            >
                <Link
                    as={ReactLink}
                    to={"/"}
                    h={"100%"}
                >
                    <Flex
                        h={"100%"}
                        align={"center"}
                        justify={"center"}
                    >
                        <Heading
                            as={"h1"}
                            fontSize={"1.1em"}
                            pr={2}
                        >
                            BanStore
                        </Heading>
                    </Flex>
                </Link>
                <Box flexGrow={"1"} maxW={["xs", "4xl"]}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(searchText ? "/?itemName=" + searchText : "/", { replace: true });
                    }}>
                        <InputGroup pr={2}>
                            <InputLeftElement
                                pointerEvents='none'
                                children={
                                    <Search color='grey' size={20} />
                                }
                            />
                            <Input variant={'outline'} placeholder='Masukan nama barang...' defaultValue={searchParams.get("itemName") || ""} onChange={(e) => { setSearchText(e.target.value) }} />
                        </InputGroup>
                    </form>
                </Box>
                <Link
                    as={ReactLink}
                    to={"/chart"}
                >
                    <Flex
                        p={"4px"}
                        position={"relative"}
                        h={"100%"}
                        alignContent={"center"}
                    >
                        <Center>
                            <Icon
                                label={"Shopping chart"}
                                as={ShoppingCart}
                                boxSize={6}
                            />
                        </Center>
                        <Flex
                            w={"15px"}
                            h={"15px"}
                            position={"absolute"}
                            bottom={"0"}
                            right={"0"}
                            display={cartCheckedItemCount > 0 ? "flex" : "none"}
                            bgColor={"red"}
                            borderRadius={"13px"}
                            justify={"center"}
                        >
                            <Text
                                p={0}
                                fontSize={"10px"}
                                fontWeight={"bold"}
                                color={"white"}
                            >
                                {cartCheckedItemCount}
                            </Text>
                        </Flex>
                    </Flex>
                </Link>
                <Link
                    as={ReactLink}
                    to={"/login"}
                >
                    <ActionIcon
                        size={"sm"}
                        label={"User"}
                        icon={<User />}
                    />
                </Link>
            </Flex>
        </Flex>
    );
}
