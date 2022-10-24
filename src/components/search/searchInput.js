import { Input, InputGroup, InputLeftElement, Flex, Hide, useDisclosure } from '@chakra-ui/react'
import { Search } from "react-feather";
import ActionIcon from '../smallcomponent/icons/icon';
import SearchModal from './searchModal';

export default function SearchInput({ setSearchText, value, formSubmitHandler, searchPlaceholder }) {
    const { onOpen, isOpen, onClose } = useDisclosure();

    return (
        <>  <Hide below={"md"}>
            <Flex flexGrow={"1"} align={"center"} maxWidth={"2xl"}>
                <InputGroup pr={2}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={
                            <Search color='grey' size={20} />
                        }
                    />
                    <Input
                        variant={'outline'}
                        placeholder={searchPlaceholder}
                        value={value}
                        onClick={onOpen}
                        readOnly
                    />
                </InputGroup>
            </Flex>
            </Hide>
            <Hide above={"md"}>
                <ActionIcon
                    label={"Search"}
                    icon={<Search size={"2em"} />}
                    onClick={onOpen}
                />
            </Hide>
            <SearchModal
                searchPlaceholder={searchPlaceholder}
                searchText={value}
                setSearchText={setSearchText}
                isOpen={isOpen}
                onClose={onClose}
                formSubmitHandler={formSubmitHandler}
            />
        </>
    )

}