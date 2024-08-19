import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const DeletedAccount = () => {
    const navigate = useNavigate()
    const onLogOut = () => {
        Cookies.remove("jwt")
        navigate('/go')
    }
  return (
    <div className='w-[100%] h-[100vh] flex flex-col items-center justify-center gap-[30px]'>
      <h1 className='text-[2.5rem] font-bold'>This account has deleted! ❌</h1>
      <button onClick={onLogOut} className='bg-red-500 text-white font-bold px-[30px] hover:bg-red-600 rounded-[10px] py-[10px]'><i className="fa-regular fa-person-to-door"></i> logout</button>
    </div>
  )
}

export default DeletedAccount
