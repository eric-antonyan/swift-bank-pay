import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import axios from 'axios';
import { api } from '../models/config.model';
import Check from './Check';
import ReceiptInformation from './ReceiptInformation'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { motion } from 'framer-motion';
import { Avatar } from '@nextui-org/react'
import FloatingInput from './FloatingInput';

const AccountPage = ({ user, identificator }) => {
    const [data, setData] = useState({ success: 0, message: "" })

    const formattedDate = (date) => {
        // converting
        const newDate = new Date(date);

        // day/month/year
        const getMonth = newDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
        const getYear = newDate.getFullYear();
        const getDay = newDate.getDate(); // Use getDate() instead of getDay() to get the day of the month

        // hours/minute
        const getHours = newDate.getHours();
        const getMinutes = newDate.getMinutes();
        const getSeconds = newDate.getSeconds();

        return (getDay < 10 ? "0" + getDay : getDay) + "/" + (getMonth < 10 ? "0" + getMonth : getMonth) + "/" + getYear + ", " + (getHours < 10 ? "0" + getHours : getHours) + ":" + (getMinutes < 10 ? "0" + getMinutes : getMinutes) + ":" + (getSeconds < 10 ? "0" + getSeconds : getSeconds);
    }
    return user && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header user={user} />
            <div className='flex'>
                <Sidebar />
                <div style={{ maxWidth: "600px", height: "calc(100vh - 93px)" }} className='relative sendMoney before:absolute before:w-[100%] before:h-[260px] before:top-0 pt-[80px] before:bg-[#235697] xs:before:bg-[#fff] w-[100%] mx-auto before:z-0'>
                    <div className='w-[100%] bg-[#fff] sendMoneyWrapper relative mx-auto overflow-hidden border-[#F3F3F3] rounded-[16px] border-[1px] border-solid' style={{ width: "calc(80%)" }}>
                        <div className="w-[100%] border-b-[1px] border-solid border-[#F3F3F3] py-[24px] flex flex-col justify-center items-center gap-[8px]">
                            <Avatar className='w-[80px] h-[80px] profile' name={user.firstName[0].concat(user.lastName[0])} isBordered color='primary' />
                            <h1 className='font-[600] mt-[20px]'>{user.firstName + " " + user.lastName}</h1>
                        </div>
                    </div>
                    <div>
                        <form className="p-[20px] relative">
                            <p className='z-50 text-[#3A3C4C] font-[700] text-[18px]'>Account Information</p>
                            <FloatingInput disabled value={user.account} className={'mt-[30px]'} placeholder={'Account number'} />
                            <FloatingInput disabled value={user.firstName + " " + user.lastName} className={'mt-[30px]'} placeholder={'Account Name'} />
                            <FloatingInput disabled value={'Swift Bank OJCS'} className={'mt-[30px]'} placeholder={'Account number'} />
                            <FloatingInput disabled value={new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format
                            (user.balance)} className={'mt-[30px]'} placeholder={'Account balance'} />
                            <FloatingInput disabled value={formattedDate(user.createdAt)} className={'mt-[30px]'} placeholder={'Account number'} />
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default AccountPage