import MainSale from "./pages/mainsale";
import ItemDetail from "./pages/itemDetail"
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom";
import Chart from "./pages/chart";
import ChartContextProvider from "./components/context/chartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ChartContextProvider>
            <Flex 
              minH={"100vh"} 
              minW={"100vw"}
            >
              <Routes>
                  <Route path='/' element={<MainSale />} />
                  <Route path='/item/:itemID' element={<ItemDetail />}  />
                  <Route path='/chart' element={<Chart />}  />
                  <Route path='*' element={<MainSale />} />
              </Routes>
            </Flex>
        </ChartContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
