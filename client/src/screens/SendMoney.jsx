import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { api } from '../models/config.model'
import SendMoneyPage from '../components/SendMoneyPage'
import DeletedAccount from '../components/DeletedAccount'
import Loading from '../components/Loading'

const SendMoney = () => {
  const [data, setData] = useState("")
  const [isData, setIsData] = useState(false)
  const { REACT_APP_SERVER_PASSCODE } = process.env
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(api + "/jwt/" + Cookies.get("jwt"), { headers: { Authorization: REACT_APP_SERVER_PASSCODE } })
      setData(response.data)
      setIsData(true)
    }

    const intervalId = setInterval(fetchData, 3000)
    return () => intervalId
  }, [])

  if (!Cookies.get('jwt')) {
    return <Navigate to={'/auth'} />
  }
  if (isData) {
    if (data.user) {
        return <SendMoneyPage user={data.user} />
    } else {
        return <DeletedAccount />
    }
} else {
    return <Loading />
}
}

export default SendMoney
