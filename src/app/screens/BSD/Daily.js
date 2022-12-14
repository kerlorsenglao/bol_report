import { StyleSheet, Text, View,TouchableOpacity, ToastAndroid  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import Toast from 'react-native-toast-message'

import { dateFormat, getDateBefore, dateShow,checkSelectDateValidation } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';
import DatePickerComponent from '../../components/DatePickerComponent';
import SelectPickerComponent from '../../components/SelectPickerComponent';
import SearchButtonComponent from '../../components/SearchButtonComponent';
import TableComponent from '../../components/TableComponent';

const  API_URL = Config.API_URL;
export default function Daily() {
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();
    const [fromDate, setFromDate] = useState(new Date());
    const [fromOpen,setFromOpent] = useState(false);
    const [toDate, setToDate] = useState(new Date());
    const [toOpen, setToOpen] = useState(false);
    const [tstatus,setTstatus] = useState(false)
    const [bank,setBank] = useState('ALL_BANK');
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]
    const report_type = 'InReport';
    const date_type = 'D';
    const date_type_default = 'DEFAULT_D'

    const navigation = useNavigation();
    useEffect(()=>{
        getBSDReport(bank,report_type,date_type_default, fromDate,toDate);//? dateFormat(date) : dateFormat(getDateBefore(new Date()))
    },[])

    const getBSDReport = async (bank,report_type,date_type,toDate,fromDate) =>  {
        setIsLoading(true);
        await axios.post(`${API_URL}/BankSupervisionReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                bank_code: bank,
                report_type: report_type,
                date_type: date_type, // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
                fromDate: dateFormat(fromDate),
                toDate: dateFormat(toDate),
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                if(res.data.data !=""){
                    let header = res.data.data[0].Header;
                    let content = res.data.data[1].Sub
                    setData({'header': header,'content': content})
                    setFromDate(new Date(header[1]))
                    setToDate(new Date(header[header.length-1]))
                    setTstatus(true)
                }else{
                    setData()
                }
            }else{// error
                setData()
                let msg = res.data.msg
                //Toast.show({
                //     type: 'error',
                //     text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
                //     text2: msg
                // });
            }
            setIsLoading(false)
        })
        .catch(e =>{
            // console.log(e)
            setIsLoading(false)
        })
    }
    const SearchBSDReport = () =>{
        // console.log(toDate - fromDate)
        if(checkSelectDateValidation(fromDate,toDate,date_type).result){
            getBSDReport(bank,report_type,date_type,toDate,fromDate)
        }else{
            ToastAndroid.show(checkSelectDateValidation(fromDate,toDate,date_type).msg,ToastAndroid.SHORT)
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
                <View style={{flex: 1}}>
                    <DatePickerComponent 
                        fdate={fromDate} setFdate={setFromDate} 
                        fopen={fromOpen} setFopen={setFromOpent} 
                        tdate={toDate} setTdate={setToDate} 
                        topen={toOpen} setTopen={setToOpen}
                        tstatus={tstatus}
                        setTstatus={setTstatus}
                    />
                </View>
            </View>
            <View style={{
                flexDirection:'row',
                justifyContent: 'space-evenly',
                paddingHorizontal: 5,
                height: 42,
            }}>
                <SelectPickerComponent data={bank} setData={setBank} datas={banks}/>
                <View style={{width: '20%'}}/>
                <View style={{width: '20%'}}>
                    <SearchButtonComponent searchFunction={SearchBSDReport}/>
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
            <BackInHomeComponent navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({})