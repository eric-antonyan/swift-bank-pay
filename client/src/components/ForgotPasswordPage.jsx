import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../models/config.model'
import axios from 'axios'
import FloatingInput from '../components/FloatingInput'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const ForgotPasswordPage = ({ page, setPage }) => {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState({ success: false, message: "" })
  const [verifyCode, setVerifyCode] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordIsShowed, setPasswordIsShowed] = useState(false)

  const navigate = useNavigate()

  const generateRandomAuthCode = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const onCheckEmail = async (e) => {
    setMsg({ success: false, message: "" })
    e.preventDefault()
    const config = {
      Authorization: process.env.REACT_APP_SERVER_PASSCODE,
    }
    const response = await axios.post(api + "/check/email", {
      email
    }, { headers: config })

    if (!response.data.success) {
      const randomCode = generateRandomAuthCode(999999, 111111)
      await axios.post(api + "/send-code", {
        verifyCode: randomCode,
        firstName: "",
        email
      })
      setVerifyCode(randomCode)
      setPage(prevPage => prevPage + 1)
    } else {
      setMsg({ message: `This email (${email}) does not exist`, success: false })
    }
  }

  if (page === 0) {
    return (
      <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Forgot Password?</h1>
          <h2 className='text-[1.2rem] font-medium text-[#7D7C93]'>Don't you have an account? <Link to="/auth">Get started</Link></h2>
        </div>
        <form onSubmit={onCheckEmail} action="#" style={{ maxWidth: "505px" }} className='w-[100%] px-[30px] flex flex-col gap-[30px]'>
          <FloatingInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email Address'} labelId={'emailAddress'} />
          <div className='relative'>
            <p className={`text-center mb-[26px] ${msg.success ? "text-green-500" : "text-red-500"} font-medium`}>{msg.message}</p>
            <button disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Submit</button>
          </div>
        </form>
      </motion.div>
    )
  } else if (page === 1) {
    const onSubmit = (e) => {
      e.preventDefault()
      if (parseInt(authCode) === verifyCode) {
        setMsg({ message: "", success: true })
        setPage(prevPage => prevPage + 1)
      } else {
        setMsg({ message: "Verification code is incorrect", success: false })
      }
    }
    return (
      <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Forgot Password?</h1>
          <h2 className='text-[1.2rem] font-medium text-[#7D7C93]'>Don't you have an account? <Link to="/auth">Get started</Link></h2>
        </div>
        <form onSubmit={onSubmit} action="#" style={{ maxWidth: "505px" }} className='w-[100%] px-[30px] flex flex-col gap-[30px]'>
          <p onClick={(e) => setPage(prevPage => prevPage - 1)} className='cursor-pointer flex flex-start w-[100%] items-center gap-[16px] mb-[30px]'><i className="fa fa-arrow-left"></i> Back</p>
          <FloatingInput type={'number'} value={authCode} onChange={(e) => setAuthCode(e.target.value)} placeholder={'6-digit code'} labelId={'authCode'} />
          <div className='relative'>
            <p className={`text-center mb-[26px] ${msg.success ? "text-green-500" : "text-red-500"} font-medium`}>{msg.message}</p>
            <button disabled={authCode.length !== 6} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Verify</button>
          </div>
        </form>
      </motion.div>
    )
  } else if (page === 2) {
    const onForgotPassword = async (e) => {
      e.preventDefault()
      await axios.post(api + "/fp", {
        email,
        newPassword
      })

      navigate('/auth')
    }
    return (
      <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Forgot Password?</h1>
          <h2 className='text-[1.2rem] font-medium text-[#7D7C93]'>Don't you have an account? <Link to="/auth">Get started</Link></h2>
        </div>
        <form onSubmit={onForgotPassword} style={{ maxWidth: "505px" }} className='w-[100%] px-[30px] flex flex-col gap-[30px]'>
          <FloatingInput passwordIsShowed={passwordIsShowed} setPasswordIsShowed={setPasswordIsShowed} advancedType={'password'} type={passwordIsShowed ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={'New Password'} labelId={'authCode'} />
          <div className='relative'>
            <p className={`text-center mb-[26px] ${msg.success ? "text-green-500" : "text-red-500"} font-medium`}>{msg.message}</p>
            <button type='submit' disabled={!newPassword} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Update Pssword</button>
          </div>
        </form>
      </motion.div>
    )
  }
}

export default ForgotPasswordPage
