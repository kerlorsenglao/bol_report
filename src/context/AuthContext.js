import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [userInfo , setUserInfo ] = useState({});
    const [isLoading, setIsloading] = useState(false)


    const Register = ()=>{
        setIsloading(true)
        axios.get(`${API_URL}/test`)
        .then(res =>{
            console.log(res.data)
            setUserInfo(res.data)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsloading(false)
        })
        .catch(e=>{
            console.log(e)
            setIsloading(false)
        });
    }
    const Login =()=>{

    }
    const Logout =()=>{

    }
    return (
        <AuthContext.Provider
            value={{isLoading,userInfo,Register}}
        >
            {children}
        </AuthContext.Provider>
    )
}