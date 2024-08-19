import React, { useEffect, useState } from 'react'
import AccountPage from '../components/AccountPage'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { api } from '../models/config.model'

const Account = () => {
    const [data, setData] = useState({})
    const { account_identificator } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(api + "/account" + account_identificator)
            setData(response.data)
        }

        fetchData()
    }, [])
    return (
        <>
            <AccountPage user={data.user} identificator={account_identificator} />
        </>
    )
}

export default Account
