import { Flex, Heading, Input, InputGroup, InputLeftElement, Box, Link} from '@chakra-ui/react'
import ActionIcon from '../smallcomponent/icons/icon';
//import { useEffect, useState } from "react";
import { ShoppingCart, Search, User } from "react-feather";
import { useState } from 'react';
import { useNavigate, useSearchParams, Link as ReactLink } from 'react-router-dom';

export default function SearchBar(props) {
    const [searchText, setSearchText] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    //Provide the searchTextChangeEvent props with callback function to handle what happen when searchbar value change.
    //Provide the submitEvent props to handle what will happen when user press enter.

    return(
        <Flex 
            p={"10px"}
            minW={"100vw"} 
            justify={"space-between"} 
            shadow={"sm"} 
            position={"sticky"} 
            top={"0"} 
            left={"0"} 
            bgColor={"white"} 
            zIndex={"100"}
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
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    navigate(searchText ? "/?itemName="+searchText : "/", {replace:true});
                }}>
                    <InputGroup pr={2}>
                        <InputLeftElement 
                            pointerEvents='none'
                            children={
                                <Search color='grey' size={20}/>
                            } 
                        />
                            <Input variant={'outline'} placeholder='Masukan nama barang...' defaultValue={searchParams.get("itemName") || ""} onChange={(e)=>{setSearchText(e.target.value)}}/>
                    </InputGroup>
                </form>
            </Box>
            <ActionIcon 
                size={"sm"}
                label={"Shopping chart"}
                icon={<ShoppingCart />}
                onClick={()=>{console.log("Chart")}}
            />

            <ActionIcon 
                size={"sm"}
                label={"User"}
                icon={<User />}
                onClick={()=>{console.log("User")}}
            />
       </Flex>
    );
}
