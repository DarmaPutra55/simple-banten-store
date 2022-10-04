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
    Flex,
    others
} from '@chakra-ui/react';
import { useItemQuantity } from '../smallcomponent/itemQuantityManager/itemQuantityHooks';
import ActionIcon from '../smallcomponent/icons/icon';
import ItemQuantitiyManager from '../smallcomponent/itemQuantityManager/itemQuantityManager';
import CurrencyFormatter from '../smallcomponent/currencyFormatter/currencyFormatter'
import { ChartContext } from '../context/chartContext'
import { useContext, useRef } from 'react';

export default function BuyModal({ productId, productImg, productName, productDiscount, productPrice, productStok,  isOpen, onClose }) {
    const [itemQuantity, setItemQuantity] = useItemQuantity(1, productStok);
    const { cartAddItemHandler } = useContext(ChartContext);
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

  const tambahButtonPressHandler = (e) =>{
    e.preventDefault();
    cartAddItemHandler(productId, itemQuantity);
  }

    return(
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={closeButtonRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Tambah ke keranjang?</ModalHeader>
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
                <Stack spacing={"14px"}>
                    <Text fontSize={"large"}>{productName}</Text>
                    <Text fontSize={"large"}>  {CurrencyFormatter((productPrice - (Math.round(productPrice * productDiscount) / 100)) * itemQuantity)} </Text>
                    <ItemQuantitiyManager itemQuantity={itemQuantity} inputChangeHandler={inputChangeHandler} plusChangeHandler={plusChangeHandler} minusChangeHandler={minusChangeHandler}/>
                    <Text fontSize={"sm"} color={"red.400"}>  Stok tinggal {productStok} </Text>
                </Stack>
                </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"whatsapp"} mr={3} onClick={tambahButtonPressHandler} >Tambah</Button>
            <Button colorScheme={'red'} mr={3} onClick={onClose} ref={closeButtonRef}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}