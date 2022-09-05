import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Config from 'react-native-config' // import for reading variable from .env file
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import TouchID from 'react-native-touch-id'
import { COLORS } from '../constant'

const API_URL = Config.API_URL;
export const AuthContext = createContext()


export const AuthProvider = ({children})=>{

    const [userInfo , setUserInfo ] = useState({});
    const [token , setToken ] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const [splashLoading , setSplashLoading] = useState(false)

    const optionalConfigObject = {
        title: '', // Android
        imageColor: COLORS.green, // Android #e00606
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'ຈ້ຳນິ້ວໃສ່ sensor', // Android
        sensorErrorDescription: 'ກະລຸນລອງອິກຄັ້ງ', // Android
        cancelText: 'ຍົກເລີກ', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

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
    const LoginTouch = ()=>{
        TouchID.isSupported(optionalConfigObject).then((biometryType =>{
            if (biometryType === 'FaceID') {
                console.log('FaceID is supported.');
            } else {
                console.log('TouchID is supported.');
                TouchID.authenticate('',optionalConfigObject)
                .then((success)=>{
                    console.log('Success =',success)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })).catch(err =>{
            console.log(err)
        })
    }
    const Logout =()=>{
        setIsloading(true)
        axios.post(`${API_URL}/logout`,
        {user_id: userInfo.user_id},
        {headers : {Authorization: `Bearer ${token}`}}
        )
        .then(res=>{
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
            value={{isLoading,userInfo,token,splashLoading,Register,Login,Logout,LoginTouch}}
        >
            {children}
        </AuthContext.Provider>
    )
}