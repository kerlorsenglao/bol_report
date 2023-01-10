import React, { createContext, useEffect, useState } from 'react'
import { ToastAndroid} from 'react-native'
import axios from 'axios'
import Config from 'react-native-config' // import for reading variable from .env file
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import TouchID from 'react-native-touch-id'
import { COLORS } from '../constant'
import { GenerateKey, Encrypt, Decrypt } from './EncryptAnDecrypt'
import RNSinfo from 'react-native-sensitive-info'

const API_URL = Config.API_URL;

export const AuthContext = createContext()


export const AuthProvider = ({children})=>{
    const [userInfo , setUserInfo ] = useState({});
    const [token , setToken ] = useState(null);
    const [token_id,setTokenID] = useState(null)
    const [menu,setMenu] = useState([]);
    const [splashLoading , setSplashLoading] = useState(false)
    const [isLoading, setIsloading] = useState(false)

    const [senSorAvailable, setSensorAvailable] = useState(false);
    const [inputPassword, setInputPassword] = useState(null);
    const [scanStatus, setScanStatus] = useState(false);

    const [BOL_P, setBOL_P] = useState()
    const [BOL_V, setBOL_V] = useState()
    const [BOL_K, setBOL_K] = useState()
    const [BOL_USER, setBOL_USER] = useState()

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
                if(!scanStatus){
                    GenerateKey('BOL', 'Secure',5000,256)
                      .then(key=>{
                        Encrypt(password,key)
                        .then(({cipher,iv})=>{
                           AsyncStorage.setItem('BOL_P',cipher)// ລະຫັດຜ່ານທີ່ encrypt ແລ້ວ (ເມື່ອ logout ໃຫ້ clear)
                           AsyncStorage.setItem('BOL_V',iv) // ລະຫັດຖອນ encrypt (ເມື່ອ logout ໃຫ້ clear)
                           AsyncStorage.setItem('BOL_K',key) // ລະຫັດສ້າງ encrypt (ເມື່ອ logout ໃຫ້ clear)
                           AsyncStorage.setItem('BOL_USER',username) // ຊື່ຜູ້ໃຊ້ລ່າສຸດທີ່ເຂົ້າລະບົບ (ເກັບໄວ້ຖາວອນ)
                           console.log('username=>',username)
                           setBOL_P(cipher)
                           setBOL_V(iv)
                           setBOL_K(key)
                           setBOL_USER(username)
                        })
                        .catch(err=>{
                          console.log(err)
                        })
                      })
                      .catch(e=>{
                        console.log(e)
                      })
                }
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
    const LoginTouch = async() => {
        const secure_password = await RNSinfo.getItem('PASSWORD',{
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
            touchID: true,
            showModal: true,
            strings:{
                header: 'ເຂົ້າລະບົບ',
                description: 'ກະລຸນາສະແກນລາຍມື',
                cancel: 'ຍົກເລີກ',
            }
        })
        if(secure_password){
            console.log('BOL_USER=>',BOL_USER)
            console.log('BOL_USER=>',secure_password)
            Login(BOL_USER,secure_password)
            // ToastAndroid.show(secure_password,ToastAndroid.BOTTOM,ToastAndroid.SHORT)
        }else{
            ToastAndroid.show('ບໍ່ສາມາດສະແກນລາຍມືເພື່ອເຂົ້າລະບົບ',ToastAndroid.BOTTOM,ToastAndroid.SHORT)
        }
    }

    // get data from store and check token
    const checkIsLogined = async () => {
        setSplashLoading(true)
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            let token = await AsyncStorage.getItem('token');
            let token_id = await AsyncStorage.getItem('token_id');
            let menu = await AsyncStorage.getItem('menu');

            let BOL_P = await AsyncStorage.getItem('BOL_P');
            let BOL_V = await AsyncStorage.getItem('BOL_V');
            let BOL_K = await AsyncStorage.getItem('BOL_K');
            let BOL_USER = await AsyncStorage.getItem('BOL_USER');
            if(userInfo){
                setUserInfo(JSON.parse(userInfo))
                setToken(token)
                setTokenID(token_id)
                setMenu(menu.split(','))

                setBOL_P(BOL_P)
                setBOL_V(BOL_V)
                setBOL_K(BOL_K)
                setBOL_USER(BOL_USER)
            }
            setSplashLoading(false)
        } catch (error) {
            setSplashLoading(false)
            console.log(`is logined error ${e}`)
        }
    }

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
                AsyncStorage.removeItem('BOL_P')// ລະຫັດຜ່ານທີ່ encrypt ແລ້ວ (ເມື່ອ logout ໃຫ້ clear)
                AsyncStorage.removeItem('BOL_V') // ລະຫັດຖອນ encrypt (ເມື່ອ logout ໃຫ້ clear)
                AsyncStorage.removeItem('BOL_K') // ລະຫັດສ້າງ encrypt (ເມື່ອ logout ໃຫ້ clear)
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

    //ກວດສອບວ່າເຄື່ອງມີເຊັນເຊີເພື່ອສະແກນລາຍນິ້ວມືບໍ (ຖ້າມີ = true ບໍ່ມີ = false)
    const checkSensorAvailable = async() =>{
        const result = await RNSinfo.isSensorAvailable();
        if(result){
            // console.log('is sensor avialable=>',result)
            setSensorAvailable(result)
        }
    }

//+++++++++++++++++ 3 function ນີ້ໃຊ້ເພື່ອ ບັນທຶກ,ລຶບ,ດຶງເອົາ ລະຫັດຜ່ານທີ່ບັນທຶກໄວ້ຊົ່ວຄາວບົນ RNSinfo store ++++++++++++++
    // function ບັນທຶກ PASSWORD ໄວ້ຊົ່າຄາວຫຼັງຈາກເຂົ້າລະບົບສຳເລັດ
    //ທຸກຄັ້ງທີ login ສຳເລັດຈຳເປັນຕ້ອງເກັບລະຫັດໄວ້ໃນເຄື່ອງຊົ່ວຄາວ (ເມື່ອອອກຈາກລະບົບຈະລືບອອກ) ເພື່ອບໍ່ຕ້ອງcomfirmລະຫັດຜ່ານອິດເມື່ອຜູ້ໃຊ້ຕ້ອງການເປິດການນຳໃຊ້ສະແກນລາຍມື
    const setInputPasswordToSecure = async (inputpassword)=>{// ຄວາມຕ້ອງ encrypt ກ່ອນ
        await RNSinfo.setItem('INPUT_PASSWORD',inputpassword,{
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
        })
        // console.log('saved input password to secured');
    }
    // function ລືບ PASSWORD ທີ່ບັນທຶກໄວ້ຊົ່ວຄາວ
    //ທຸກຄັ້ງອອກຈາກລະບົບຕ້ອງລົບລະຫັດຜ່ານທີ່ບັນທຶກຊົ່ວຄາວນີ້ຖິ້ມ
    const deleteInputPassword = async ()=>{
        const delete_result = await RNSinfo.deleteItem('INPUT_PASSWORD',{
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
        })
        console.log('Delete result=',delete_result)
    }
    // function getເອົາລະຫັດຜ່ານທີ່ບັນທຶກຊົ່ວຄາວ
    //ເວລາທີ່ຜູ້ໃຊ້ເປິດການນຳໃຊ້ສະແກນລາຍນິ້ວມືແມ່ນຈະໄດ້ນຳເອົາລະຫັດຊົ່ວຄາວນີ້ໄປເກັບຖາວອນໃນ RNSinfo store
    const getInputPasswordOnSecure = async ()=>{
        const input_pw = await RNSinfo.getItem('INPUT_PASSWORD',{
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
        })
        if(input_pw){
            setInputPassword(input_pw)
        }
    }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++ 2 function ລຸ່ມແມ່ນໃຊ້ບັນທຶກສະຖານະການສະແກນລາຍນິ້ວມື ວ່າເປີດນຳໃຊ້ແລ້ວບໍ
    //function ບັນທຶກສະຖານະການເປິດສະແກນຂື້ນ RNSinfo store
    const saveScanStatus = async(status) =>{
        await RNSinfo.setItem('SCAN_STATUS',status,{
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
        })
    }
    //function ດຶງເອົາສະຖານະການສະແກນລາຍມືບົນ RNSinfo store

    const getScanStatus = async() =>{
        const status =await RNSinfo.getItem('SCAN_STATUS',{
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
        })
        setScanStatus(status==='true'? true : false);
    }

//+++++++++2 function ລຸ່ມແມ່ນໃຊ້ເພື່ອບັນທຶກ ແລະ ລືບຂໍ້ມູນ username & password ໃນ RNSinfo
    //function ບັນທຶກລະຫັດຜ່ານເຂົ້າໄປໃນ RNSinfo ແບບຖາວອນ ຕາບໃດທີ່ຜູ້ໃຊ້ປິດການສະແກນລາຍມືຈຶ່ງຈະລົບອອກ
    //ຕ້ອງການຢືນຢັນລາຍມືກ່ອນຈະເກັບລະຫັດຖາວອນ
    const setPasswordToSecureStore = async (password)=>{
        const result = await RNSinfo.setItem('PASSWORD', password, {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
            touchID: true, 
            showModal: true,
            strings: {
                header: 'ຢືນຢັັນລາຍມືເພື່ອເປິດໃຊ້ງານ',
                description: 'ກະລຸນາສະແກນລາຍມື',
                hint: 'Touch',
                cancel: 'ຍົກເລີກ',
                cancelled: 'Authentication was cancelled', // reject error message
            },
        })
        if(result){// successfully
            saveScanStatus("true")
            setScanStatus(true)
        }else{
            saveScanStatus("false")
            setScanStatus(false)
        }
    }
    //===> delete scure password from scurestore when user close scaning fingerprint
    const deletePasswordOnSecure = async ()=>{
        await RNSinfo.deleteItem('PASSWORD', {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        });
        await RNSinfo.deleteItem('SCAN_STATUS',{
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        })
        setScanStatus(false)
    }

    useEffect(()=>{
        // AsyncStorage.removeItem('userInfo')
        // AsyncStorage.removeItem('token')
        // AsyncStorage.removeItem('token_id')
        // AsyncStorage.removeItem('menu')

        checkSensorAvailable()
        getScanStatus()
        checkIsLogined()
    },[])

    return (
        <AuthContext.Provider
            value={{
                // 1. global variable
                userInfo,token,menu,splashLoading,isLoading,
                // 2. Login , Logout ... function
                Login,Logout,LoginTouch,
                senSorAvailable,checkSensorAvailable,
                scanStatus, getScanStatus,setScanStatus,
                setPasswordToSecureStore,
                deletePasswordOnSecure,
                // deleteInputPassword,
                // setInputPasswordToSecure,
                // inputPassword,getInputPasswordOnSecure,
                BOL_P,BOL_K,BOL_V,BOL_USER
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}