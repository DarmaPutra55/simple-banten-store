import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { Search, X } from "react-feather";
import React, { useRef } from 'react';

export default function SearchModal({ searchText, searchPlaceholder, formSubmitHandler, setSearchText, isOpen, onClose }) {
    const searchBarRef = useRef(null);

    const onTextSearchChangeHandler = (e) => {
        e.preventDefault();
        setSearchText((e.target.value).toLowerCase());
    }

    const crossIconClickHandler = (e) => {
        e.preventDefault();
        setSearchText("");
        searchBarRef.current.value = "";
        searchBarRef.current.focus();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={searchBarRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>

                        <form
                            onSubmit={formSubmitHandler}
                        >
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={
                                        <Search color='grey' size={20} />
                                    }
                                />
                                <Input
                                    ref={searchBarRef}
                                    variant={'outline'}
                                    placeholder={searchPlaceholder}
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
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}