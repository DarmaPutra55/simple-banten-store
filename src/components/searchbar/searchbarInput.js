import { Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react'
import { Search } from "react-feather";

export default function SearcbarInput({ searchText, value, onClick }) {
    return (
        <Box flexGrow={"1"} maxW={["xs", "4xl"]}>

            <InputGroup pr={2}>
                <InputLeftElement
                    pointerEvents='none'
                    children={
                        <Search color='grey' size={20} />
                    }
                />
                <Input
                    variant={'outline'}
                    placeholder='Masukan nama barang...'
                    value={value}
                    onClick={onClick}
                    readOnly
                />
            </InputGroup>

        </Box>
    )

}