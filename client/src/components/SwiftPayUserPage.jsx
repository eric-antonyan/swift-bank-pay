import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import Logo from './Logo';
import Code from './Code';
import SwiftBankLogo from './SwiftBankLogo';
import BankLogo from './BankLogo';
import FloatingInput from './FloatingInput';
import BankLogoNoText from './BankLogoNoText';
import axios from 'axios';
import { api } from '../models/config.model';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const SwiftPayUserPage = ({ user }) => {
  const [data, setData] = useState({ success: 0, message: "" })
  const [isData, setIsData] = useState(false)
  const [account, setAccount] = useState()
  const [amout, setAmout] = useState()

  const navigate = useNavigate()
  const onCheck = async (e) => {
    e.preventDefault()
    const response = await axios.post(api + "/account", { accountId: account, amount: amout, client: user.account })
    setData(response.data)
    if (response.data.success && response.data.receipter) {
      navigate('/go/receipt/' + response.data.receipter)
    }
  }
  return user && (
    <>
      <Header user={user} />
      <div className='flex'>
        <Sidebar />
        <div style={{ maxWidth: "600px", height: "calc(100vh - 93px)" }} className='relative sendMoney before:absolute before:w-[100%] before:h-[260px] before:top-0 pt-[80px] before:bg-[#235697] w-[100%] mx-auto before:z-0'>
          <div className='w-[100%] bg-[#fff] sendMoneyWrapper relative mx-auto overflow-hidden border-[#F3F3F3] rounded-[16px] border-[1px] border-solid px-[20px] py-[30px]' style={{ width: "calc(80%)" }}>
            <div className='bg-[#235697] w-[100%] h-[121px] rounded-[8px] before:bg-[#000000] before:opacity-[0.1] before:w-[290.14px] before:h-[290.14px] before:right-[-78.09px] before:rounded-[50%] before:top-[-13.44px] before:absolute relative overflow-hidden'>
              <BankLogoNoText className='absolute top-[20px] right-[20px]' />
              <div className='px-[40px] pt-[24px]'>
                <p className='text-[#FFFFFFCC] font-[600]'>Total Balance</p>
                <h1 className='text-[#fff] font-bold text-[28px]'>{
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(user.balance)
                }</h1>
              </div>
            </div>
            <form onSubmit={onCheck}>
              <FloatingInput type={'text'} className='mt-[28px]' placeholder={"Account Number"} labelId={'account'} onChange={(e) => setAccount(e.target.value)} value={account} />
              <FloatingInput onChange={(e) => setAmout(e.target.value)} value={amout} type={'number'}
                className='mt-[28px]' startContent='$' labelId={'amout'} placeholder={"Amout"} />
              <p className={'text-danger text-center mt-[15px]'}>{data.message}</p>
              <button disabled={!account || amout < 5 ? true : false} className='w-[100%] py-[16px] bg-[#114280] rounded-[8px] mt-[20px] cursor-pointer text-[#fff] disabled:bg-[#88A9C9]'>Continune</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SwiftPayUserPage