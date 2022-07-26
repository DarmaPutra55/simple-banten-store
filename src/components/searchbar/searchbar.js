import {
    Flex,
    Link,
    Text,
    useDisclosure,
    Avatar
} from '@chakra-ui/react'

import ActionIcon from '../smallcomponent/icons/icon';
//import { useEffect, useState } from "react";
import { UserContext } from '../context/userContext';
import { useQueryClient } from '@tanstack/react-query';
import { ShoppingCart, Search } from "react-feather";
import { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams, Link as ReactLink, useNavigate } from 'react-router-dom';
import { ChartContext } from '../context/chartContext';
import SearchInput from '../search/searchInput';
import ProfileModal from '../profileModal/profileModal';
import ProfileDrawer from '../profileDrawer/profileDrawer';

export default function SearchBar() {
    const { isOpen: isProfileDrawerOpen, onOpen: onProfileDrawerOpen, onClose: onProfileDrawerClose } = useDisclosure();
    const { isOpen: isProfileModalOpen, onOpen: onProfileModalOpen, onClose: onProfileModalClose } = useDisclosure();
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = useState("" || searchParams.get("nama"));
    const { cartItems } = useContext(ChartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const iconRef = useRef();
    const cartCheckedItemCount = cartItems?.length > 0 ? cartItems.filter((cartItem) => cartItem.checked).length : 0;

    const handleRezise = () => {
        const windowInnerWidth = window.innerWidth;
        if (isProfileDrawerOpen && windowInnerWidth > 800) {
            onProfileDrawerClose();
            onProfileModalOpen();
        }
        else if (isProfileModalOpen && windowInnerWidth < 800) {
            onProfileModalClose();
            onProfileDrawerOpen();
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleRezise);
        return () => {
            window.removeEventListener('resize', handleRezise);
        }
    }, [isProfileDrawerOpen, isProfileModalOpen])

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
                        _hover={{}}
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

                    <SearchInput
                        value={searchText || ""}
                        setSearchText={setSearchText}
                        formSubmitHandler={
                            (e) => {
                                e.preventDefault();
                                queryClient.resetQueries(['items']);
                                navigate(searchText ? "/?nama=" + searchText : "/", { replace: true })
                            }
                        }
                    />

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
                    <Flex
                        align={"center"}
                        position={"relative"}
                    >
                        <Avatar
                            name={user?.id ? user.username : ""}
                            ref={iconRef}
                            boxSize={"2em"}
                            bgColor={"lightgrey"}
                            onClick={(e) => {
                                e.preventDefault();
                                window.innerWidth < 800 ? onProfileDrawerOpen() : onProfileModalOpen();
                            }}
                        />
                        <ProfileModal
                            topPos={iconRef.current?.offsetHeight + 9}
                            isOpen={isProfileModalOpen}
                            onClose={onProfileModalClose}
                        />
                    </Flex>
                </Flex>
            </Flex>
            <ProfileDrawer
                isOpen={isProfileDrawerOpen}
                onClose={onProfileDrawerClose}
            />
        </>
    );
}
