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

const ReceiptPage = ({ user, identificator }) => {
  const [data, setData] = useState({ success: 0, message: "" })

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(api + "/receipt", {
        receipt_identificator: identificator
      })
      setData(response.data)
    }

    const intervalId = setInterval(fetchData, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const saveAsPDF = () => {
    const receipt = document.getElementById("receipt")
    html2canvas(receipt).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = canvas.toDataURL();
      link.click();
      link.remove()
    })
  };

  const onShare = () => {
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Receipt',
            text: 'My receipt by code ' + identificator,
            url: window.location.href
          });
          console.log('Shared successfully');
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        // Fallback sharing mechanism for browsers that don't support navigator.share
        // You could use a different sharing library or a simple link to share the content
        console.log('Share API not supported, provide alternative sharing mechanism.');
      }
    }
    handleShare()
  }

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
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Header user={user} />
      <div className='flex'>
        <Sidebar />
        <div style={{ maxWidth: "600px", height: "calc(100vh - 93px)" }} className='relative sendMoney before:absolute before:w-[100%] before:h-[260px] before:top-0 pt-[80px] before:bg-[#235697] xs:before:bg-[#fff] w-[100%] mx-auto before:z-0'>
          <div className='w-[100%] bg-[#fff] sendMoneyWrapper relative mx-auto overflow-hidden border-[#F3F3F3] rounded-[16px] border-[1px] border-solid py-[30px]' style={{ width: "calc(80%)" }}>
            <div className="w-[100%] border-b-[1px] border-solid border-[#F3F3F3] py-[24px] flex flex-col justify-center items-center gap-[8px]">
              <Check />
              <h1 className='text-[15px] mt-[20px] font-[500]'>{data.receipt.from !== user.uuid ? "Transfer to Your Bank Account" : "Transfer to Bank Account"}</h1>
              <p className='text-[13px] text-[#7D7C93]'>On {formattedDate(data.receipt.createdAt)}</p>
              <div className='flex gap-[15px]'>
                <button onClick={onShare} className='py-[12px] bg-gradient-to-tr from-[#235697] to-[#114280] rounded-[8px] w-[160px] text-[#fff]'><i className="far fa-file-arrow-up"></i> Share</button>
                <button className='py-[12px] bg-none border-solid border-[1px] border-[#235697] rounded-[8px] w-[160px] text-[#235697]' onClick={saveAsPDF}><i className="far fa-file-arrow-down"></i> Download</button>
              </div>
            </div>
            <ReceiptInformation receipt={data.receipt} user={user} identificator={identificator} formattedDate={formattedDate} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ReceiptPage