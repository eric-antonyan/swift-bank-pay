import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api } from '../models/config.model'
import SwiftPayUserPage from '../components/SwiftPayUserPage'
import Cookies from 'js-cookie'
import Loading from '../components/Loading'

const SwiftPayUser = () => {
    const [data, setData] = useState({})
    const [isData, setIsData] = useState(false)
    const {REACT_APP_SERVER_PASSCODE} = process.env
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(api + "/jwt/" + Cookies.get("jwt"), {headers: {Authorization: REACT_APP_SERVER_PASSCODE}})
            setData(response.data)
            setIsData(true)
        }

        const intervalId = setInterval(fetchData, 3000)
        return () => intervalId
    }, [])
  if (isData) {
    return (
        <SwiftPayUserPage user={data.user} />
      )
  } else {
    return <Loading />  
  }
}

export default SwiftPayUser
