import { Flex, Heading, Input, InputGroup, InputLeftElement, Box} from '@chakra-ui/react'
import Icon from '../../smallcomponent/icons/icon';
//import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "react-feather";
import { useState } from 'react';

export default function SearchBar(props) {
    const [searchText, setSearchText] = useState("");
    //Provide the searchTextChangeEvent props with callback function to handle what happen when searchbar value change.
    //Provide the submitEvent props to handle what will happen when user press enter.

    return(
        <Flex 
            p={2}
            minW={"100vw"} 
            justify={"space-between"} 
            shadow={"sm"} 
            position={"sticky"} 
            top={"0"} 
            left={"0"} 
            bgColor={"white"} 
            zIndex={"100"}
        >
            <Heading as={"h1"} fontSize={"1.1em"} pr={2} alignSelf={"center"}>
                D-Lapak
            </Heading>
            <Box flexGrow={"1"} maxW={["xs", "4xl"]}>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    props.setSearchParams(searchText);
                }}>
                    <InputGroup pr={2}>
                        <InputLeftElement 
                            pointerEvents='none'
                            children={
                                <Search color='grey' size={20}/>
                            } 
                        />
                            <Input variant={'outline'} placeholder='Masukan nama barang...' onChange={(e)=>{setSearchText(e.target.value)}}/>
                    </InputGroup>
                </form>
            </Box>
            <Icon 
                size={"sm"}
                label={"Shopping chart"}
                icon={<ShoppingCart />}
                onClick={()=>{console.log("Chart")}}
            />
       </Flex>
    );
}
