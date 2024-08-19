import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api } from '../models/config.model'
import Cookies from 'js-cookie'
import ReceiptPage from '../components/ReceiptPage'
import { useParams } from 'react-router-dom'

const Receipt = () => {
  const [data, setData] = useState({})
  const { REACT_APP_SERVER_PASSCODE } = process.env
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(api + "/jwt/" + Cookies.get("jwt"), { headers: { Authorization: REACT_APP_SERVER_PASSCODE } }).then((response) => {
          setData(response.data)
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const { receipt_identificator } = useParams()
  return (
    <>
      <ReceiptPage user={data.user} identificator={receipt_identificator} />
    </>
  )
}

export default Receipt
