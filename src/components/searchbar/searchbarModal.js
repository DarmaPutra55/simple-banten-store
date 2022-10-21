import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    HStack,
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    InputRightAddon
} from '@chakra-ui/react';
import { Search, X } from "react-feather";
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function SearchbarModal({ searchText, setSearchText, isOpen, onClose }) {
    const searchBarRef = useRef(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const onTextSearchChangeHandler = (e) => {
        e.preventDefault();
        setSearchText((e.target.value).toLowerCase());
    }

    const crossIconClickHandler = (e) => {
        e.preventDefault();
        setSearchText("");
        searchBarRef.current.value = "";
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={searchBarRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Box flexGrow={"1"} maxW={["xs", "4xl"]}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                queryClient.resetQueries(['items']);
                                navigate(searchText ? "/?nama=" + searchText : "/", { replace: true });
                            }}>
                            <InputGroup ref={searchBarRef}>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={
                                        <Search color='grey' size={20} />
                                    }
                                />
                                <Input
                                    variant={'outline'}
                                    placeholder='Masukan nama barang...'
                                    defaultValue={searchText /*searchParams.get("nama") || ""*/}
                                    onChange={onTextSearchChangeHandler}
                                />
                                {
                                    searchText ?
                                        <InputRightElement
                                            bgColor={"transparent"}
                                            //pointerEvents={"none"}
                                            children={
                                                <X color='red' size={20} />
                                            }
                                            onClick={crossIconClickHandler}
                                        />
                                        :
                                        ""
                                }
                            </InputGroup>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}