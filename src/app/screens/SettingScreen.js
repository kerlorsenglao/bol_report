import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect,  } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../constant'
import RadioComponent from '../components/RadioComponent'
import { GenerateKey, Encrypt,Decrypt } from '../help/EncryptAnDecrypt'
import Aes from 'react-native-aes-crypto'
import { AuthContext } from '../help/AuthContext'

export default function SettingScreen() {
  const [inputPass , setInputPass] = useState();
  const {
    isLoading,
    setPasswordToSecureStore,
    deletePasswordOnSecure,
    senSorAvailable,checkSensorAvailable,
    scanStatus,
    // inputPassword,getInputPasswordOnSecure,
    BOL_P,BOL_K,BOL_V,BOL_USER
} = useContext(AuthContext)
  const [encryptPass, setEncryptPass] = useState('123456')
  


  // const onChangeStatus = ()=>{

  //   GenerateKey('BOL', 'Secure',5000,256)
  //   .then(key=>{
  //     console.log('key=>',key)
  //     Encrypt(encryptPass,key)
  //     .then(({cipher,iv})=>{
  //       console.log('cipher=>',cipher)
  //       console.log('iv=>',iv)

  //       Decrypt({cipher,iv},key).then(pass=>{
  //         console.log('decrypt pass=>',pass)
  //       }).catch(error=>{
  //         console.log(error)
  //       })
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     })
  //   })
  //   .catch(e=>{
  //     console.log(e)
  //   })
  //   setStatus(!status)
  // }
  const onChangeStatus =()=>{
    if(scanStatus){// ຖ້າມືສະຖານະສະແກນແມ່ນ true ໃນstoreແລ້ວສະແດງວ່າເປິດການສະແກນຢູ່ແລ້ວ ສະນັ້ນເມື່ອປ່ຽນສະຖານະກໍ່ແມ່ນການປິດ ດັ່ງນັ້ນຕ້ອງດຳເນີນການລືບລະຫັດຜ່ານອອກຈາກ RNSinfo(ຍົກເລີກການເຂົ້າລະບົບດ້ວຍການສະແກນ)
      deletePasswordOnSecure() // ລືບລະຫັດຜ່ານອອກຈາກ RNSinfo
      // saveScanStatus('false') // ປ່ຽນສະຖານະການສະແກນໃສ RNSinfo ເປັນ false (ສະແດງວ່າປິດການນຳໃຊ້ການສະແກນລາຍມື)
    }else{// ຖ້າມີບໍ່ມີ ຫຼື ເປັນ false ສະແດງວ່າເປັນການຕັ້ງຄ່າໃຫ້ສາມາດສະແກນລາຍມືເພື່ອເຂົ້າລະບົບ(ລົງທະບຽນການເຂົ້າລະບົບດ້ວຍການສະແກນ)
        if(senSorAvailable){// ຖ້າເຄື່ອງສະໜອງການສະແກນລາຍມື
          Decrypt({'cipher':BOL_P,'iv':BOL_V},BOL_K).then(decrypt_pass =>{
            setPasswordToSecureStore(decrypt_pass) // ບັນທຶກລະຫັດຜ່ານແບບຖາວອນໄປໃນ RNSinfo
          }).catch(err=>{
            console.log(err)
          })
        }else{//ຖ້າບໍ່ສະໜອງການສະແກນລາຍມືໃຫ້ແຈ້ງເຕືອນເຄື່ອງຜູ້ໃຊ້ບໍ່ສາມາດສະແກນໄດ້
            ToastAndroid.show("ມືຖືບໍ່ຕອບສະໜອງການສະແກນ",ToastAndroid.BOTTOM,ToastAndroid.SHORT);
        }
    }
  }
  useEffect(()=>{
    // setEncryptPass(AsyncStorage.getItem('BOL_P'))
  },[])
  return (
    <View style={{
      flex: 1,
      paddingTop: 20,
      paddingRight: 20
    }}>
        <RadioComponent title='ເປິດການສະແກນລາຍມືເພື່ອເຂົ້າລະບົບ' status={scanStatus} onPress={onChangeStatus}/>
    </View>
  )
}

const styles = StyleSheet.create({})