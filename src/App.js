import { useEffect, useState } from "react";
import MainSale from "./components/mainsale/mainsale";
import ItemDetail from "./components/itemDetail/itemDetail";
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <ItemDetail />
    </ChakraProvider>
  );
}

export default App;
