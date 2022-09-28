import React, { Suspense } from "react";
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom";
import ChartContextProvider from "./components/context/chartContext";
import UserContextProvider from "./components/context/userContext";
import AuthRerouter from "./components/smallcomponent/authRerouter/authRerouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style/chakra-util.css";
import { Helmet } from "react-helmet";
import FullscreeLoading from "./components/smallcomponent/fullscreenLoading/fullscreenLoading";

const ItemDetail = React.lazy(() => import("./pages/itemDetail"))
const MainSale = React.lazy(() => import("./pages/mainsale"));
const Chart = React.lazy(() => import("./pages/chart"));
const SignIn = React.lazy(() => import("./pages/signIn"));

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <Helmet>
        <title>Banstore</title>
        <meta charset="UTF-8" />
        <meta name="description" content="Banstore" />
        <meta name="keywords" content="Banten E-Store" />
        <meta name="author" content="Darma Putra" />
        <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ChartContextProvider>
            <Flex
              minH={"100vh"}
              minW={"100%"}
            >
              <React.Suspense fallback={<FullscreeLoading />}>
                <Routes>
                  <Route path='*' element={<MainSale />} />
                  <Route path='/' element={<MainSale />} />
                  <Route path='/item/:itemID' element={<ItemDetail />} />
                  <Route path='/chart' element={<Chart />} />
                  <Route path='/register' element={<AuthRerouter><SignIn /></AuthRerouter>} />
                  <Route path='/login' element={<AuthRerouter><SignIn /></AuthRerouter>} />
                </Routes>
              </React.Suspense>
            </Flex>
          </ChartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
