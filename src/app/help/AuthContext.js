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
    const [token_id,setTokenID] = useState(null)
    const [menu,setMenu] = useState([]);
    const [splashLoading , setSplashLoading] = useState(false)
    const [isLoading, setIsloading] = useState(false)

    // login
    const Login = (username,password) => {
        // check username
        if(username.trim().length === 0 ){
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'ກະລຸນາປ້ອນລະຫັດຜູ້ໃຊ້',
            });
            return 
        }
        // check password
        if(password.trim().length ===0){
            Toast.show({
                type: 'error',
                text1: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ',
            });
            return 
        }

        setIsloading(true);
        // start request
        axios.post(`${API_URL}/login`,
            {
                username: username,
                password: password,
            }
        ).then(res=>{
            if(res.data.responseCode == '000'){
                let res_userInfo = res.data.data[0]
                let res_token = res.data.token.split("|");
                let res_menuList = res.data.menus_list
                setUserInfo(res_userInfo)
                setToken(res_token[1])
                setTokenID(res_token[0])
                setMenu(res_menuList)
                AsyncStorage.setItem('userInfo',JSON.stringify(res_userInfo))
                AsyncStorage.setItem('token',res_token[1])
                AsyncStorage.setItem('token_id',res_token[0])
                AsyncStorage.setItem('menu',res_menuList.toString())
            }else{// error
                console.log("error")
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
            console.log("catch")
            console.log(e)
            setIsloading(false)
        })
    }

    // Login finger Touch
    const LoginTouch = () => {
        console.log('LoginTouch')
    }

    // get data from store and check token
    const checkIsLogined = async () => {
        try {
            setSplashLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo');
            let token = await AsyncStorage.getItem('token');
            let token_id = await AsyncStorage.getItem('token_id');
            let menu = await AsyncStorage.getItem('menu');
            if(userInfo){
                setUserInfo(JSON.parse(userInfo))
                setToken(token)
                setTokenID(token_id)
                setMenu(menu.split(','))
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

    // logout
    const Logout = () => {
        setIsloading(true)
        axios.post(`${API_URL}/logOut`,
            {id: token_id},
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                AsyncStorage.removeItem('userInfo')
                AsyncStorage.removeItem('token')
                AsyncStorage.removeItem('token_id')
                AsyncStorage.removeItem('menu')
                setUserInfo({})
                setToken(null)
                setTokenID(null)
                setMenu([])
            }else{
                console.log("error")
                console.log(res.data)
                let msg = res.data.msg
                Toast.show({
                    type: 'error',
                    text1: 'ອອກລະບົບບໍ່ສຳເລັດ!',
                    text2: msg
                });
            }
            setIsloading(false)
            
        })
        .catch(e=>{
            setIsloading(false)
            console.log(e)
            Toast.show({
                type: 'error',
                text1: e
            });
        })
        
    }


    return (
        <AuthContext.Provider
            value={{
                // 1. global variable
                userInfo,token,menu,splashLoading,isLoading,
                // 2. Login , Logout ... function
                Login,Logout,LoginTouch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}