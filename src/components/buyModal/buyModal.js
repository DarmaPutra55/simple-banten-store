import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Image,
  Stack,
  Text,
  Flex,
  useDisclosure
} from '@chakra-ui/react';
import { useItemQuantity } from '../smallcomponent/itemQuantityManager/itemQuantityHooks';
import ItemQuantitiyManager from '../smallcomponent/itemQuantityManager/itemQuantityManager';
import CurrencyFormatter from '../smallcomponent/currencyFormatter/currencyFormatter'
import { ChartContext } from '../context/chartContext'
import { useContext, useRef } from 'react';
import AlertDialog from '../alertDialog/alertDialog';

export default function BuyModal({ productId, productImg, productName, productDiscount, productPrice, productStok, isOpen, onClose }) {
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const { detailedItems, cartAddItemHandler, updateCartItemHandlerWithToast } = useContext(ChartContext);
  const thisItemInCart = detailedItems?.find((item) => item.data.id_barang === productId);
  const [itemQuantity, setItemQuantity] = useItemQuantity(thisItemInCart?.data.jumlah || 1, productStok);
  const closeButtonRef = useRef();

  const inputChangeHandler = (e) => {
    setItemQuantity(e.target.value);
  }

  const plusChangeHandler = () => {
    setItemQuantity(itemQuantity + 1);
  }

  const minusChangeHandler = () => {
    if (itemQuantity === 1 && thisItemInCart) {
      onAlertOpen();
    }
    else {
      setItemQuantity(itemQuantity - 1);
    }
  }

  const tambahButtonPressHandler = (e) => {
    e.preventDefault();
    if (thisItemInCart) {
      updateCartItemHandlerWithToast(thisItemInCart.data.id, thisItemInCart.data.id_barang, itemQuantity, thisItemInCart.data.checked);
      onClose();
    }
    else {
      cartAddItemHandler(productId, itemQuantity);
    }
  }

  return (
    <>
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        chartItemId={thisItemInCart?.data.id}
      />

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={closeButtonRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Tambah ke keranjang?</ModalHeader>
          <ModalCloseButton ref={closeButtonRef} />
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
                  <ItemQuantitiyManager itemQuantity={itemQuantity} inputChangeHandler={inputChangeHandler} plusChangeHandler={plusChangeHandler} minusChangeHandler={minusChangeHandler} />
                  <Text fontSize={"sm"} color={"red.400"}>  Stok tinggal {productStok} </Text>
                </Stack>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"whatsapp"} mr={3} onClick={tambahButtonPressHandler} >{thisItemInCart ? "Update" : "Tambah"}</Button>
            {
              thisItemInCart ?
                <Button colorScheme={'red'} mr={3} onClick={onAlertOpen}>
                  Batal
                </Button>
                :
                ""
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}