import { View, Text,TouchableOpacity } from 'react-native'
import React,{ useEffect, useState, useContext } from 'react'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import { AuthContext } from '../../../../../help/AuthContext'

import { checkSelectDateValidation,monthYearFormat } from '../../../../../help/Functions'
import BackInHomeComponent from '../../../../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../../../../constant'
import TableComponent from '../../../../../components/TableComponent'
import MonthYearPickerComponent from '../../../../../components/MonthYearPickerComponent'
import SearchButtonComponent from '../../../../../components/SearchButtonComponent'

const API_URL = Config.API_URL;
const API_NAME = "getFDICountryReport"

// this function create by Toum at 21/12/2022
const Monthly = () => {

    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();

    const [my1,setMY1] = useState(new Date());
    const [show1,setShow1] = useState(false)
    const [my2,setMY2] = useState(new Date());
    const [show2,setShow2] = useState(false)
    const [my2status,setMY2status] = useState(false) 
    const report_type = 'InReport';
    const date_type = 'M';
    const date_type_default = 'DEFAULT_M'
    const {token} = useContext(AuthContext);

    useEffect(()=>{
        getFDIbyCountryReport_M(report_type,date_type_default,my1,my2)
    },[])

    // function for MonthLy
    const getFDIbyCountryReport_M = async (report_type,date_type,my1,my2)=>{
        setIsLoading(true)
        await axios.post(`${API_URL}/${API_NAME}`,{
                report_type: report_type,
                date_type: date_type, // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
                fromDate: monthYearFormat(my1),
                toDate: my2status ? monthYearFormat(my2): monthYearFormat(my1),
            },
            {
                headers : {Authorization: `Bearer ${token}`, Accept: "application/json"}
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                if(res.data.data !=""){
                    let header = res.data.data[0].Header;
                    let content = res.data.data[1].Sub
                    setData({'header': header,'content': content})
                    setMY1(new Date(header[1]))
                    setMY2(new Date(header[header.length-1]))
                    setMY2status(true)
                }else{
                    setData()
                }
            }
            else{// error
                console.log('Not OK')
                let msg = res.data.msg
                Toast.show({
                    type: 'error',
                    text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
                    text2: msg
                });
            }
            setIsLoading(false)
        })
        .catch(e => {
            console.log(e)
            Toast.show({
                    type: 'error',
                    text1: 'ກະລຸນາກວດສອບອິນເຕີເນັດ!',
            });
            setIsLoading(false)
        })
    }

  const SearchFDIbyCountryReport_M = () =>{
      if(my2status==true){
        if(checkSelectDateValidation(my1,my2,date_type).result){
            getFDIbyCountryReport_M(report_type,date_type,my1,my2)
        }else{
            Toast.show({
                    type: 'error',
                    text1: checkSelectDateValidation(my1,my2,date_type).msg,
            });
        }
      }else{
        getFDIbyCountryReport_M(report_type,date_type,my1,my2)
      }
  }

  return (
    <View style={{flex:1}}>
        <Spinner visible={isLoading} cancelable={true}/>   
        <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingVertical: 5}}>
            <View style={{flex:4}}>
                <MonthYearPickerComponent
                    my1={my1}
                    setMY1={setMY1}
                    show1={show1}
                    setShow1={setShow1}
                    
                    my2={my2}
                    setMY2={setMY2}
                    show2={show2}
                    setShow2={setShow2}
                    my2status={my2status}
                    setMY2status={setMY2status}
                />
            </View>
            <View style={{flex:1}}>
                <SearchButtonComponent searchFunction={SearchFDIbyCountryReport_M}/>
            </View>
        </View>


            {
                data ?
                (
                    <TableComponent header={data.header} content={data.content}/>
                )
                : (
                    <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color: COLORS.gray, fontSize: SIZES.large}}>ບໍ່ມີຂໍ້ມູນ</Text>
                    </View>
                )
            }
        <Toast />
        <BackInHomeComponent navigation={navigation}/>
    </View>
  )
}

export default Monthly