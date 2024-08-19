import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import Logo from './Logo';
import Code from './Code';
import SwiftBankLogo from './SwiftBankLogo';
import BankLogo from './BankLogo';
import { Link } from 'react-router-dom';

const SendMoneyPage = ({ user }) => {
  console.log(user);
  return user && (
    <>
      <Header user={user} />
      <div className='flex'>
        <Sidebar />
        <div style={{ maxWidth: "600px", height: "calc(100vh - 93px)" }} className='relative before:absolute before:w-[100%] before:h-[260px] before:top-0 pt-[80px] xs:pt-0 before:bg-[#235697] w-[100%] mx-auto before:z-0'>
          <div className='bg-[#fff] relative mx-auto overflow-hidden border-[#F3F3F3] rounded-[16px] border-[1px] border-solid w-[80%] xs:w-[100%] xs:border-none xs:rounded-[0px]'>
            <div className="py-[13px] border-b-[1px] xs:border-none border-solid border-[#F3F3F3] px-[20px] flex justify-center">
              <h1 className='text-[16px] font-[600]'>Send to Bank Account</h1>
            </div>
            <div className="w-[100%]">
              <Link to={'/go/sendmoney/spu'}>
              <div className="w-[100%] px-[20px] cursor-pointer flex items-center gap-[12px] relative hover:bg-[#e3e3e3] active:bg-[#ccc] py-[10px] transition duration-[500ms] ease-out">
                <div className="bg-[#F3F3F3] h-[2px] absolute bottom-0" style={{ width: "calc(100% - 40px)" }}></div>
                <div className='w-[50px] h-[50px] bg-[#F1F5F9] flex justify-center items-center rounded-[50%]'>
                  <SwiftBankLogo />
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-[500] xs:text-start'>Swift Pay User</h2>
                  <p className='text-[12px] font-[400] text-[#7D7C93]'>Send to a Swift Pay User or invite phone contact</p>
                </div>
                <i className='fa absolute top-[50%] translate-y-[-50%] right-[20px] fa-chevron-right text-[#7D7C93]'></i>
              </div>
              </Link>
              <div className="w-[100%] px-[20px] cursor-pointer flex items-center gap-[12px] relative hover:bg-[#e3e3e3] active:bg-[#ccc] py-[10px] transition duration-[500ms] ease-out">
                <div className="bg-[#F3F3F3] h-[2px] absolute bottom-0" style={{ width: "calc(100% - 40px)" }}></div>
                <div className='w-[50px] h-[50px] bg-[#F1F5F9] flex justify-center items-center rounded-[50%]'>
                  <BankLogo />
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-[500] xs:text-start'>Bank Account</h2>
                  <p className='text-[12px] font-[400] text-[#7D7C93]'>Send to a Send to a bank account</p>
                </div>
                <i className='fa absolute top-[50%] translate-y-[-50%] right-[20px] fa-chevron-right text-[#7D7C93]'></i>
              </div>
            </div>
            <div className='text-[#C7C4C4] mt-4 px-[20px] flex items-center gap-3'>
              <div className='bg-[#C7C4C4] w-[100%] h-[1px]'></div>
              <p>OR</p>
              <div className='bg-[#C7C4C4] w-[100%] h-[1px]'></div>
            </div>
            <div className='px-[20px] flex items-center gap-[12px] cursor-pointer mt-[16px] relative hover:bg-[#e3e3e3] active:bg-[#ccc] py-[10px] transition duration-200'>
              <img className='w-[50px] h-[50px]' src="https://www.mts.am/images/default-source/app/icon_egg.png" alt="" />
              <div className='flex flex-col'>
                  <h2 className='font-[500] xs:text-start'>VivaCell MTC</h2>
                  <p className='text-[12px] font-[400] text-[#7D7C93]'>Add to VivaCell MTC balance</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendMoneyPage
