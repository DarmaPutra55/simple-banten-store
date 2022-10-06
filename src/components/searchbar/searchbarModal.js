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
    InputLeftElement
} from '@chakra-ui/react';
import { Search } from "react-feather";
import React, { useRef, useState } from 'react';

export default function SearchbarModal({ searchText, setSearchText, isOpen, onClose }) {
    const searchBarRef = useRef(null);

    const onTextSearchChangeHandler = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={searchBarRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Cari
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box flexGrow={"1"} maxW={["xs", "4xl"]}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                window.location.href = searchText ? "/?nama=" + searchText : "/";
                                //navigate(searchText ? "/?nama=" + searchText : "/", { replace: true });
                            }}>
                            <InputGroup pr={2}>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={
                                        <Search color='grey' size={20} />
                                    }
                                />
                                <Input
                                    ref={searchBarRef}
                                    variant={'outline'}
                                    placeholder='Masukan nama barang...'
                                    defaultValue={searchText /*searchParams.get("nama") || ""*/}
                                    onChange={onTextSearchChangeHandler}
                                />
                            </InputGroup>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}