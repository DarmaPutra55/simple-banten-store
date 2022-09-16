import {
    AlertDialog as AlertDialogMain,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import { ChartContext } from '../context/chartContext';
import { useContext, useRef } from 'react'

export default function AlertDialog ({chartItemId, isOpen, onClose}) {
  const cancelRef = useRef()
  const { removeItem } = useContext(ChartContext);

  const removeItemHandler = () =>{
    removeItem(chartItemId)
    onClose()
  }

  return (
    <>
      <AlertDialogMain
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            alignSelf={"center"}
          >
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Hapus Barang
            </AlertDialogHeader>

            <AlertDialogBody>
              Hapus barang dari keranjang belanja?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={removeItemHandler} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialogMain>
    </>
  )
}