import { Flex, Link, Text, useDisclosure } from '@chakra-ui/react'
import ActionIcon from '../smallcomponent/icons/icon';
//import { useEffect, useState } from "react";
import { ShoppingCart, Search, User } from "react-feather";
import { useContext, useState } from 'react';
import { useSearchParams, Link as ReactLink } from 'react-router-dom';
import { ChartContext } from '../context/chartContext';
import SearchbarModal from './searchbarModal';
import SearcbarInput from './searchbarInput';

export default function SearchBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = useState("" || searchParams.get("nama"));
    const { detailedItems } = useContext(ChartContext);
    const cartCheckedItemCount = detailedItems?.length > 0 ? detailedItems.filter((item) => item.data.checked).length : 0;

    //Provide the searchTextChangeEvent props with callback function to handle what happen when searchbar value change.
    //Provide the submitEvent props to handle what will happen when user press enter.

    return (
        <>
            <Flex
                width={"100%"}
                p={"8px"}
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
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"bold"}
                                pr={2}
                            >
                                BanStore
                            </Text>
                        </Flex>
                    </Link>
                    <Flex
                        display={["flex", "none"]}
                    >
                        <ActionIcon
                            label={"Search"}
                            icon={<Search size={"2em"} />}
                            onClick={onOpen}
                        />
                    </Flex>
                    <Flex
                        display={["none", "flex"]}
                        px={"2em"}
                        flexGrow={1}
                        align={"center"}
                    >
                        <SearcbarInput
                            value={searchText || ""}
                            onClick={onOpen}
                        />
                    </Flex>
                    <Link
                        as={ReactLink}
                        to={"/chart"}
                    >
                        <Flex
                            position={"relative"}
                        >
                            <ActionIcon
                                label={"Cart"}
                                icon={<ShoppingCart size={"2em"} />}
                            />
                            <Flex
                                minW={"16px"}
                                minH={"16px"}
                                position={"absolute"}
                                bottom={"0"}
                                right={"0"}
                                display={cartCheckedItemCount > 0 ? "flex" : "none"}
                                bgColor={"red"}
                                borderRadius={"10px"}
                                justify={"center"}
                                align={"center"}
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
                            label={"User"}
                            icon={<User size={"2em"} />}
                        />
                    </Link>
                </Flex>
            </Flex>
            <SearchbarModal
                searchText={searchText}
                setSearchText={setSearchText}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
}
