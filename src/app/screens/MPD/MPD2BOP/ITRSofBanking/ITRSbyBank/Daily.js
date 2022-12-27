import { Text, View  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import Toast from 'react-native-toast-message'

import { dateFormat, getDateBefore, dateShow,checkSelectDateValidation } from '../../../../../help/Functions'
import BackInHomeComponent from '../../../../../components/BackInHomeComponent';
import { COLORS, SIZES } from '../../../../../../constant';
import DatePickerComponent from '../../../../../components/DatePickerComponent';
import SearchButtonComponent from '../../../../../components/SearchButtonComponent';
import TableComponent from '../../../../../components/TableComponent';

const  API_URL = Config.API_URL;
const API_NAME = "???"

const Daily = () => {
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();

    const [fromDate, setFromDate] = useState(new Date());
    const [fromOpen,setFromOpent] = useState(false);
    const [toDate, setToDate] = useState(new Date());
    const [toOpen, setToOpen] = useState(false);
    const [tstatus,setTstatus] = useState(false)
    
    const report_type = 'InReport';
    const date_type = 'D';
    const date_type_default = 'DEFAULT_D'

    // useEffect
    useEffect(()=>{
        getITRSbyBank_D(report_type,date_type_default, fromDate,toDate);
    },[])

    // function for Daily
    const getITRSbyBank_D = async (report_type,date_type,fromDate,toDate)=>{
        // setIsLoading(true)
        // await axios.post(`${API_URL}/${API_NAME}`,{
        //         webServiceUser: "bol_it",
        //         webServicePassword: "123456",
        //         report_type: report_type,
        //         date_type: date_type, // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
        //         fromDate: dateFormat(fromDate),
        //         toDate: dateFormat(toDate),
        //     }
        // )
        // .then(res=>{
        //     if(res.data.responseCode == '000'){
        //         if(res.data.data !=""){
        //             let header = res.data.data[0].Header;
        //             let content = res.data.data[1].Sub
        //             setData({'header': header,'content': content})
        //             setFromDate(new Date(header[1]))
        //             setToDate(new Date(header[header.length-1]))
        //             setTstatus(true)
        //         }else{
        //             setData()
        //         }
        //     }
        //     else{// error
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
        // .catch(e => {
        //     console.log(e)
        //     Toast.show({
        //             type: 'error',
        //             text1: 'ກະລຸນາກວດສອບອິນເຕີເນັດ!',
        //     });
        //     setIsLoading(false)
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

    const SearchITRSbyBank_D = () =>{
        if(tstatus==true){
          if(checkSelectDateValidation(fromDate,toDate,date_type).result){
            getITRSbyBank_D(report_type,date_type,fromDate,toDate)
          }else{
              Toast.show({
                      type: 'error',
                      text1: checkSelectDateValidation(fromDate,toDate,date_type).msg,
              });
          }
        }else{
            getITRSbyBank_D(report_type,date_type,fromDate,toDate)   
        }
    }

  return (
        <View style={{flex:1}}>
            <Spinner visible={isLoading}/>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                paddingVertical: 5
            }}>
                <View style={{flex: 6}}>
                    <DatePickerComponent 
                        fdate={fromDate} setFdate={setFromDate} 
                        fopen={fromOpen} setFopen={setFromOpent} 
                        tdate={toDate} setTdate={setToDate} 
                        topen={toOpen} setTopen={setToOpen}
                        tstatus={tstatus}
                        setTstatus={setTstatus}
                    />
                </View>
                <SearchButtonComponent searchFunction={SearchITRSbyBank_D}/>
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
            <Toast onPress={()=>{
                Toast.hide()
            }}/>
            <BackInHomeComponent navigation={navigation}/>
        </View>
  )
}

export default Daily