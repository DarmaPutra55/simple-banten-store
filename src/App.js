import { useEffect, useState } from "react";
import MainSale from "./pages/mainsale";
import ItemDetail from "./pages/itemDetail"
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom";
import Chart from "./pages/chart";
import ChartContextProvider from "./components/context/chartContext";

function App() {
  const test = false;

  return (
    <ChakraProvider>
      <ChartContextProvider>
        <Flex 
          minH={"100vh"} 
          minW={"100vw"}
        >
          {
            test ? 
            ""
            :
            <Routes>
              <Route path='/' element={<MainSale />} />
              <Route path='/item/:itemID' element={<ItemDetail />}  />
              <Route path='/chart' element={<Chart />}  />
              <Route path='*' element={<MainSale />} />
          </Routes>
          }
        </Flex>
      </ChartContextProvider>
    </ChakraProvider>
  );
}

export default App;
