import { Flex, Heading, Input, InputGroup, InputLeftElement} from '@chakra-ui/react'
import Icon from '../../smallcomponent/icons/icon';
//import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "react-feather";

export default function SearchBar(props) {
    //Provide the searchTextChangeEvent props with callback function to handle what happen when searchbar value change.
    //Provide the submitEvent props to handle what will happen when user press enter.

    const doNothing = () => {
        return;
    }

    return(
        <Flex p={2}>
            <Heading as={"h1"} size={"md"} pr={2}>
                D-Lapak
            </Heading>
            <InputGroup size={"sm"} pr={2}>
                <InputLeftElement 
                    pointerEvents='none'
                    children={
                        <Search color='grey' size={20}/>
                    } 
                />
                <form onSubmit={props.submitEvent || doNothing()}>
                    <Input variant={'outline'} placeholder='Masukan nama barang...' onChange={props.searchTextChangeEvent || doNothing()}/>
                </form>
            </InputGroup>
            <Icon 
                size={"sm"}
                label={"Shopping chart"}
                icon={<ShoppingCart />}
                clickEvent={()=>{console.log("Chart")}}
            />
       </Flex>
    );
}
