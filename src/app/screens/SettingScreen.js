import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constant'
import RadioComponent from '../components/RadioComponent'
import { GenerateKey, Encrypt,Decrypt } from '../help/EncryptAnDecrypt'
import Aes from 'react-native-aes-crypto'

export default function SettingScreen() {
  const [status, setStatus] = useState(false)
  const [encryptPass, setEncryptPass] = useState('123456')


  const onChangeStatus = ()=>{

    GenerateKey('BOL', 'Secure',5000,256)
    .then(key=>{
      console.log('key=>',key)
      Encrypt(encryptPass,key)
      .then(({cipher,iv})=>{
        console.log('cipher=>',cipher)
        console.log('iv=>',iv)

        Decrypt({cipher,iv},key).then(pass=>{
          console.log('decrypt pass=>',pass)
        }).catch(error=>{
          console.log(error)
        })
      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(e=>{
      console.log(e)
    })
    setStatus(!status)
  }
  return (
    <View style={{
      flex: 1,
      paddingTop: 20,
      paddingRight: 20
    }}>
        <RadioComponent title='ເປິດການສະແກນລາຍມືເພື່ອເຂົ້າລະບົບ' status={status} onPress={onChangeStatus}/>
    </View>
  )
}

const styles = StyleSheet.create({})