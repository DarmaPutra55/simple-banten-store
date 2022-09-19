import MainSale from "./pages/mainsale";
import ItemDetail from "./pages/itemDetail"
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom";
import Chart from "./pages/chart";
import SignIn from "./pages/signIn";
import ChartContextProvider from "./components/context/chartContext";
import UserContextProvider from "./components/context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ChartContextProvider>
            <Flex
              minH={"100vh"}
              minW={"100vw"}
            >
              <Routes>
                <Route path='*' element={<MainSale />} />
                <Route path='/' element={<MainSale />} />
                <Route path='/item/:itemID' element={<ItemDetail />} />
                <Route path='/chart' element={<Chart />} />
                <Route path='/register' element={<SignIn />} />
                <Route path='/login' element={<SignIn />}/>
              </Routes>
            </Flex>
          </ChartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
