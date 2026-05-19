import { useauth } from '../hooks/useauth'
import React, { useState } from 'react'
import { Navigate } from 'react-router'

const Protected = ({ children}) => {

    const { loading, user } = useauth(true)

    if(loading){
        return (<main> <h1>Loading...</h1> </main>)
    }

    if(!user){
        return <Navigate to={"/login"} />
    }

    return children
}

export default Protected