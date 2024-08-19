import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const General = () => {
    if (Cookies.get("jwt")) {
        return <Navigate to={'/go'} />
    } else {
        return <Navigate to={'/auth'} />
    }
}

export default General
