import { useEffect, useState } from "react";
import MainSale from "./pages/mainsale";
import ItemDetail from "./pages/itemDetail"
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <ChakraProvider>
      <Flex 
        minH={"100vh"} 
        minW={"100vw"}
      >
        <Routes>
          <Route path='/' element={<MainSale />} />
          <Route path='/item/:itemID' element={<ItemDetail />} />
        </Routes>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
