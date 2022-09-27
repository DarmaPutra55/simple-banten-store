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
    Image,
    Stack,
    Text,
    Flex
} from '@chakra-ui/react';
import { useItemQuantity } from '../smallcomponent/itemQuantityManager/itemQuantityHooks';
import ActionIcon from '../smallcomponent/icons/icon';
import ItemQuantitiyManager from '../smallcomponent/itemQuantityManager/itemQuantityManager';
import { useRef } from 'react';

export default function BuyModal({ productImg, productName, productStok,  isOpen, onClose }) {
    const [itemQuantity, setItemQuantity] = useItemQuantity(0, productStok);
    const closeButtonRef = useRef();

    const inputChangeHandler = (e) => {
      setItemQuantity(e.target.value);
  }

  const plusChangeHandler = () => {
      setItemQuantity(itemQuantity+1);
  }

  const minusChangeHandler = () => {
      setItemQuantity(itemQuantity-1);
  }

    return(
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={closeButtonRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Beli</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction={"row"}
            >
                <Box maxW={"50%"}>
                    <Image 
                        className="ratioSame"
                        fit={"contain"}
                        src={productImg} 
                        alt={productName}
                    />
                </Box>
                <Flex w={"100%"} maxW={"50%"} minH={"100%"} justify={"center"}>
                <Stack spacing={"18px"}>
                    <Text>{productName}</Text>
                    <ItemQuantitiyManager itemQuantity={itemQuantity} inputChangeHandler={inputChangeHandler} plusChangeHandler={plusChangeHandler} minusChangeHandler={minusChangeHandler}/>
                    <Text fontSize={"sm"} color={"red.400"}>  Stok tinggal {productStok} </Text>
                </Stack>
                </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"whatsapp"} mr={3}>Tambah ke keranjang</Button>
            <Button colorScheme={'red'} mr={3} onClick={onClose} ref={closeButtonRef}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}