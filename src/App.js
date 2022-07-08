import { useEffect, useState } from "react";
import MainSale from "./components/mainsale/mainsale";
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
        <MainSale />
    </ChakraProvider>
  );
}

export default App;
