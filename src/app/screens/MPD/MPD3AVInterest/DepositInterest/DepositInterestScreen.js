import { View, Text } from 'react-native'
import React,{ useEffect, useState, useContext } from 'react'
import Toast from 'react-native-toast-message'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import { AuthContext } from '../../../../help/AuthContext'

import { checkSelectDateValidation,monthYearFormat } from '../../../../help/Functions'
import BackInHomeComponent from '../../../../components/BackInHomeComponent';
import { COLORS, SIZES } from '../../../../../constant'
import TableComponent from '../../../../components/TableComponent';

import MonthYearPickerComponent from '../../../../components/MonthYearPickerComponent';
import SearchButtonComponent from '../../../../components/SearchButtonComponent'
import { useNavigation } from '@react-navigation/native';

const  API_URL = Config.API_URL;
const API_NAME = "???"

// this function create by Toum at 21/12/2022
const DepositInterestScreen = () => {

    const navigation = useNavigation()
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

    // useEffect
    useEffect(()=>{
      getDepositInterestReport_M(report_type,date_type_default,my1,my2)
    },[])

    // function for Yearly
    const getDepositInterestReport_M = async (report_type,date_type,my1,my2)=>{
        // setIsLoading(true)
        // await axios.post(`${API_URL}/${API_NAME}`,
        //     {
        //         webServiceUser: "bol_it",
        //         webServicePassword: "123456",
        //         report_type: report_type,
        //         date_type: date_type, // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
        //         fromDate: year1,
        //         toDate: year2,
        //     },
            // {
            //     headers : {Authorization: `Bearer ${token}`, Accept: "application/json"}
            // }
        // )
        // .then(res=>{
        //     if(res.data.responseCode == '000'){
        //         if(res.data.data !=""){
        //             let header = res.data.data[0].Header;
        //             let content = res.data.data[1].Sub
        //             setData({'header': header,'content': content})
        //             setYear1(header[1])
        //             setYear2(header[header.length-1])
        //             setY2Status(true)
        //         }else{
        //             setData()
        //         }
        //     }else{// error
        //         console.log('Not OK')
        //         let msg = res.data.msg
        //         Toast.show({
        //             type: 'error',
        //             text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
        //             text2: msg
        //         });
        //     }
        //     setIsLoading(false)
        // })
        // .catch(e =>{
        //     console.log(e)
        //     setIsLoading(false)
        //     Toast.show({
        //         type: 'error',
        //         text1: 'ກະລຸນາກວດສອບອິນເຕີເນັດ',
        //     });
        // })  

        // this is for test, delete it when we have API
        setIsLoading(true)
        Toast.show({
            type: 'success',
            text1: 'successfull!',
            text2: 'ທົດລອງ, ບໍ່ມີຂໍ້ມູນ'
        });
        setIsLoading(false)
    }

    const SearchDepositInterestReport_M = () =>{
        if(my2status==true){
            if(checkSelectDateValidation(my1,my2,date_type).result){
                getDepositInterestReport_M(report_type,date_type,my1,my2)
            }else{
                Toast.show({
                    type: 'error',
                    text1: checkSelectDateValidation(my1,my2,date_type).msg,
                });
            }
        }else{
            getDepositInterestReport_M(report_type,date_type,my1,my2)
        }
    }

  return (
    <View style={{flex:1}}>
        <Spinner visible={isLoading}/>   
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
                <SearchButtonComponent searchFunction={SearchDepositInterestReport_M}/>
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

export default DepositInterestScreen