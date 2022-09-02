import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Config from 'react-native-config' // import for reading variable from .env file
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const API_URL = Config.API_URL;
export const AuthContext = createContext()


export const AuthProvider = ({children})=>{

    const [userInfo , setUserInfo ] = useState({});
    const [token , setToken ] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const [splashLoading , setSplashLoading] = useState(false)

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
    const Login =(email,password)=>{
        if(email.trim().length ===0){
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'ກະລຸນາປ້ອນອີເມວ',
            });
            return 
        }
        if(password.trim().length ===0){
            Toast.show({
                type: 'error',
                text1: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ',
            });
            return 
        }
        setIsloading(true);
        axios.post(`${API_URL}/checklogin`,
        {username: email,password: password}
        )
        .then(res=>{
            if(res.data.code == 201){
                let userInfo = res.data.data
                let token = res.data.token
                setUserInfo(userInfo)
                setToken(token)
                AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
                AsyncStorage.setItem('token',token)
            }else{// res.data.code == 401
                let msg = res.data.msg
                Toast.show({
                    type: 'error',
                    text1: 'ເຂົ້າລະບົບບໍ່ສຳເລັດ!',
                    text2: msg
                });
            }
            setIsloading(false)
        })
        .catch(e =>{
            console.log(e)
            setIsloading(false)
        })
    }
    const Logout =()=>{
        setIsloading(true)
        axios.post(`${API_URL}/logout`,
        {user_id: userInfo.user_id},
        {headers : {Authorization: `Bearer ${token}`}}
        )
        .then(res=>{
            console.log(res.data)
            AsyncStorage.removeItem('userInfo')
            AsyncStorage.removeItem('token')
            setUserInfo({})
            setToken(null)
            setIsloading(false)
        })
        .catch(e=>{
            setIsloading(false)
            console.log(e)
        })

    }
    const checkIsLogined = async ()=>{
        try {
            setSplashLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo');
            let token = await AsyncStorage.getItem('token');
            userInfo = JSON.parse(userInfo);
            if(userInfo){
                setUserInfo(userInfo)
                setToken(token)
            }
            setSplashLoading(false)
        } catch (error) {
            setSplashLoading(false)
            console.log(`is logined error ${e}`)
        }
    }
    useEffect(()=>{
        checkIsLogined()
    },[])
    return (
        <AuthContext.Provider
            value={{isLoading,userInfo,token,splashLoading,Register,Login,Logout}}
        >
            {children}
        </AuthContext.Provider>
    )
}