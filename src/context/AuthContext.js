import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Config from 'react-native-config' // import for reading variable from .env file
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import TouchID from 'react-native-touch-id'
import { COLORS } from '../constant'

const API_URL = Config.API_URL;
const webService = { webServiceUser: "bol_it", webServicePassword: "123456" };

export const AuthContext = createContext()


export const AuthProvider = ({children})=>{

    const [userInfo , setUserInfo ] = useState({});
    const [searchResult,setSearchResult] = useState({});
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

    const Login =(username,password)=>{
        if(username.trim().length ===0){
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'ກະລຸນາປ້ອນລະຫັດຜູ້ໃຊ້',
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
        axios.post(`${API_URL}/login`,
            {
                account: username,
                password: password,
                ...webService
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                let userInfo = res.data.data[0]
                let token = "token"
                console.log(userInfo)
                setUserInfo(userInfo)
                setToken(token)
                AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
                AsyncStorage.setItem('token',token)
            }else{// error
                console.log(res.data)

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

    // setToken for test
    const LoginForTest = ()=>{
        setToken("token")
    }

    const Logout =()=>{
        // setIsloading(true)
        // axios.post(`${API_URL}/logout`,
        // {user_id: userInfo.user_id},
        // {headers : {Authorization: `Bearer ${token}`}}
        // )
        // .then(res=>{
        //     AsyncStorage.removeItem('userInfo')
        //     AsyncStorage.removeItem('token')
        //     setUserInfo({})
        //     setToken(null)
        //     setIsloading(false)
        // })
        // .catch(e=>{
        //     setIsloading(false)
        //     console.log(e)
        // })

        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('token')
        setUserInfo({})
        setToken(null)

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

    const Search = async (bank,CCY)=>{
        setIsloading(true);
        axios.post(`${API_URL}/getStatement`,{
               webServicePassword:'123456',
                webServiceUser:'bol_it',
                bank_code: bank,
                currency: CCY,
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                setSearchResult(res.data.data)
            }else{// error
                console.log(res.data)
                let msg = res.data.msg
                Toast.show({
                    type: 'error',
                    text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
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

    const  getBSDReport1 = (bankCode,rpType,DateType,date) =>  {
        setIsloading(true);
        axios.post(`${API_URL}/BankSupervisionReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                bank_code: bankCode,
                report_type: rpType,
                date_type: DateType,
                date: date
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                console.log("OK")
            }else{// error
                console.log('Not OK')
                let msg = res.data.msg
                Toast.show({
                    type: 'error',
                    text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
                    text2: msg
                });
            }
            setIsloading(false)

            if(res.data.data === '' ){
                setSearchResult({})
            }else{
                setSearchResult(res.data.data[0])
            }
            
        })
        .catch(e =>{
            console.log(e)
            setIsloading(false)
        })
    }

    return (
        <AuthContext.Provider
            value={{
                // 1. global variable
                isLoading,userInfo,token,splashLoading,searchResult,
                // 2. Login , Logout ... function
                Register,Login,Logout,LoginTouch,Search,LoginForTest,
                // 3. get report function
                getBSDReport1
            }}
        >
            {children}
        </AuthContext.Provider>
    )

    
}