import React, { useEffect, useState } from 'react'
import HomePage from '../components/HomePage'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { api } from '../models/config.model'
import DeletedAccount from '../components/DeletedAccount'
import Loading from '../components/Loading'

const Home = () => {
    const [data, setData] = useState("")
    const [isData, setIsData] = useState(false)
    useState(() => {
        const fetchData = () => {
            axios.get(api + "/jwt/" + Cookies.get("jwt"), { headers: { Authorization: process.env.REACT_APP_SERVER_PASSCODE } }).then(response => {
                setIsData(true)
                setData(response.data)
            })
        }

        const intervalId = setInterval(fetchData, 3000)

        return () => clearInterval(intervalId)
    }, [])
    
    if (!Cookies.get('jwt')) {
        return <Navigate to={'/auth'} />
    }

    if (isData !== false) {
        if (data.user) {
            return <HomePage data={data} />
        } else {
            return <DeletedAccount />
        }
    } else {
        return <Loading />
    }
}

export default Home
