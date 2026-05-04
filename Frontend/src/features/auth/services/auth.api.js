import React from 'react'
import axios from 'axios';

const api = axios.create({
    baseURL: "https://prepbot-backend-1ghi.onrender.com",
    withCredentials: true
})

export const register = async ({username, email, password}) => {
    
    try{

        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch(err){

        console.log("Register error:", err.response?.data)
        throw new Error(message)

    }
}

export const login = async ( {email, password}) => {
    
    try {
        const response = await api.post('/api/auth/login', { email, password })  
        return response.data
    } catch(err) {
        
    }
}

export const logout = async () => {
    
    try{

        const response = await  api.get('/api/auth/logout')

        return response.data

    } catch(err){

        console.log(err);

    }
}

export const getMe = async () => {
    
    try{

        const response = await api.get('/api/auth/get-me')

        return response.data

    } catch(err){

        if (err.response?.status === 401) return null  // return null
        console.log(err)

    }
}





