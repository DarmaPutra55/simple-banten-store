import { useEffect, useState } from "react";
import MainSale from "./components/mainsale/mainsale";
import ItemDetail from "./components/itemDetail/itemDetail";
import { ChakraProvider, Flex } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <Flex 
        minH={"100vh"} 
        minW={"100vw"}
      >
        <MainSale />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
