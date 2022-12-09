import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay'
import Config from 'react-native-config'
import { convertJSToAR } from '../help/Functions'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS } from '../../constant'

import TableComponent from '../components/TableComponent'

import ListView from '../components/ListView'


const  API_URL = Config.API_URL;
const HeaderData = ['ລາຍການ',2015,2016,2017]//
const ContentData = [
  ['ຊັບສິນທັງໝົດ',400.000 ],//, 500.000 , 7.000 , 55.000 , 900.000
  ['ຊັບສິນທັງໝົດ',400.000],//,500.000,7.000,55.000,900.000
  ['ຊັບສິນທັງໝົດ',400.000],//500.000,7.000,55.000,900.000
  ['ຊັບສິນທັງໝົດ',400.000],//,500.000,7.000,55.000,900.000
]

let data = [
  {
    'Header':[]
  }
]

export default function Testing() {
  const [data,setData] = useState()
  const [isLoading, setIsLoading] =useState(false)

  
  // useEffect(()=>{
  //   getData()
  // },[])
  const   getData = async () =>  {
    setIsLoading(true);
    await axios.get(`${API_URL}/test_report3`)
    .then(res=>{
        
        let data = res.data
        
        for (const [key, value] of Object.entries(data)) {
          // console.log(value)
          value.map((item)=>{
            console.log(item)
          })
      }
        setIsLoading(false)
    })
    .catch(e =>{
        console.log(e)
        setIsLoading(false)
    })
   }
  return (
    <View style={{flex: 1, backgroundColor:'gray'}}>
      <Spinner visible={isLoading}/>
      {/* <TableComponent/> */}
      <View style={{backgroundColor:COLORS.green, height: '30%', justifyContent:'center',alignItems:'center'}}>
          <Text>Data Search</Text>
      </View>
      <ListView header={HeaderData} heigth='700%' content={ContentData}/>
      {/* <ScrollView horizontal>
        <ScrollView>
          <View style={{flexDirection:'row', backgroundColor: COLORS.primary}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.white, fontWeight:'bold'}}>ລາຍການ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.white, fontWeight:'bold'}}>2015</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.white, fontWeight:'bold'}}>2016</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.white, fontWeight:'bold'}}>2017</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.white, fontWeight:'bold'}}>2018</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ຄັງສຳຮອງທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#e6ffee'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ປະລີມານເງີນທັງໝົດທີ່ມີ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#f0f5f5'}}>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black, fontWeight:'bold'}}>ເງີນກຸ້ທັງໝົດ</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,000,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>2,100,000</Text>
            </View>
            <View style={{margin:5, height: 50,width:150, justifyContent:'center'}}>
              <Text style={{color:COLORS.black}}>45,000,000</Text>
            </View>
          </View>
        </ScrollView>
        
      

       

      </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({})