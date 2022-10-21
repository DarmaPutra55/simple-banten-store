import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Modal,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalFooter
} from '@chakra-ui/react'
import { useQuery } from "@tanstack/react-query";
import { useRef } from 'react';
import CurrencyFormatter from '../smallcomponent/currencyFormatter/currencyFormatter';
import ThEm from '../smallcomponent/thFontSizeBasedOnParentElement/thEm';


export default function PreviousTransactionModal({ isOpen, onClose }) {
    //const { data, isLoading } = useQuery();
    const closeButtonRef = useRef();

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={closeButtonRef} size={"4xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Transaksi</ModalHeader>
                <ModalCloseButton ref={closeButtonRef} />
                <ModalBody>
                    <TableContainer>
                        <Table variant='simple' fontSize = {"1em"}>
                            <Thead>
                                <Tr>
                                    <ThEm isNumeric>No</ThEm>
                                    <ThEm>Barang</ThEm>
                                    <ThEm isNumeric>Bayar</ThEm>
                                    <ThEm>Tanggal</ThEm>
                                    <ThEm>Status</ThEm>
                                </Tr>
                            </Thead>
                            <Tbody fontSize = {"1.1em"}>
                                <Tr>
                                    <Td isNumeric>1</Td>
                                    <Td>Tas</Td>
                                    <Td isNumeric>{CurrencyFormatter(50000)}</Td>
                                    <Td>Oct 21 2022 12:34:22</Td>
                                    <Td textColor={"green"}>Sukses</Td>
                                </Tr>
                                <Tr>
                                    <Td isNumeric>2</Td>
                                    <Td>Baju</Td>
                                    <Td isNumeric>{CurrencyFormatter(125000)}</Td>
                                    <Td>Oct 22 2022 12:34:22</Td>
                                    <Td textColor={""}>Sedang Dikirim</Td>
                                </Tr>
                                <Tr>
                                    <Td isNumeric>3</Td>
                                    <Td>Baju Kuning</Td>
                                    <Td isNumeric>{CurrencyFormatter(80000)}</Td>
                                    <Td>Oct 23 2022 12:34:22</Td>
                                    <Td textColor={"red"}>Gagal</Td>
                                </Tr>
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <ThEm isNumeric>No</ThEm>
                                    <ThEm>Barang</ThEm>
                                    <ThEm isNumeric>Bayar</ThEm>
                                    <ThEm>Tanggal</ThEm>
                                    <ThEm>Status</ThEm>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </ModalBody>

                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}