import { Flex, useBoolean, Text } from "@chakra-ui/react";
import CurrencyFormatter from "../smallcomponent/currencyFormatter/currencyFormatter"

import Item from "../item/item";


export default function ItemArea({ items }) {
    return (
        <>


            <Flex
                className="responsiveWidth"
                flexWrap={"wrap"}
                justify={["baseline", "baseline", "center"]}
                bgColor={"white"}
                height={"100%"}
            >
                {
                    items?.length > 0 ?
                        Array(items.length).fill('').map((_, i) => {
                            return <Item
                                key={i}
                                id={items[i].id}
                                img={items[i].gambar}
                                name={items[i].nama}
                                price={items[i].diskon > 0 ? CurrencyFormatter((items[i].harga - (Math.round(items[i].harga * items[i].diskon) / 100))) : CurrencyFormatter(items[i].harga)}
                                originalPrice={CurrencyFormatter(items[i].harga)}
                                discount={items[i].diskon}
                                rating={items[i].rating.rate}
                                sold={items[i].terjual}
                            />;
                        })
                        :
                        <Flex minWidth={"100%"} justify={"center"}>
                            <Text>Tidak ada barang yang ditemukan</Text>
                        </Flex>
                }
            </Flex>

        </>
    )
}