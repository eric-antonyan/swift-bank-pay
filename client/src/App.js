import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './screens/Regsiter';
import { AnimatePresence } from 'framer-motion';
import Auth from './screens/Auth';
import RegisterSuccess from './screens/RegisterSuccess';
import Home from './screens/Home';
import ForgotPassword from './screens/ForgotPassword';
import SendMoney from './screens/SendMoney';
import { NextUIProvider } from '@nextui-org/react';
import SwiftPayUser from './screens/SwiftPayUser';
import General from './screens/General';
import Receipt from './screens/Receipt';
import Account from './screens/Account';

const App = () => {
  return (
    <AnimatePresence>
      <NextUIProvider> 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<General />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/auth' element={<Auth />}></Route>
            <Route path='/success' element={<RegisterSuccess />}></Route>
            <Route path='/go' element={<Home />}></Route>
            <Route path='/go/sendmoney' element={<SendMoney />} />
            <Route path='/go/sendmoney/spu' element={<SwiftPayUser />}></Route>
            <Route path='/fp' element={<ForgotPassword />}></Route>
            <Route path='/go/receipt/:receipt_identificator' element={<Receipt />}></Route>
            <Route path='/go/account/:account_identificator' element={<Account />}></Route>
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </AnimatePresence>
  );
}

export default App;