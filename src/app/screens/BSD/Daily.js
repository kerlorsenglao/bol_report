import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import DatePicker from 'react-native-date-picker'
import {Picker} from '@react-native-picker/picker';

import { dateFormat, getDateBefore, dateShow } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';
import DatePickerComponent from '../../components/DatePickerComponent';
import SelectPickerComponent from '../../components/SelectPickerComponent';
import SearchButtonComponent from '../../components/SearchButtonComponent';
import TableComponent from '../../components/TableComponent';

const  API_URL = Config.API_URL;
export default function Daily() {
    const [isLoading,setIsLoading] = useState(false)
    const [headerData,setHeaderData] = useState(null);
    const [contentData, setContentData ]= useState(null);
    const [fromDate, setFromDate] = useState(new Date());
    const [fromOpen,setFromOpent] = useState(false);
    const [toDate, setToDate] = useState(new Date());
    const [toOpen, setToOpen] = useState(false);
    const [bank,setBank] = useState('ALL_BANK');
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]
    const report_type = 'InReport';
    const date_type = 'D';

    const navigation = useNavigation();
    useEffect(()=>{
        getBSDReport(bank,report_type,date_type, fromDate,toDate);//? dateFormat(date) : dateFormat(getDateBefore(new Date()))
    },[])
    const getBSDReport = async (bank,report_type,date_type,toDate,fromDate) =>  {
        setIsLoading(true);
        await axios.post(`${API_URL}/BankSupervisionReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                bank_code: bank,
                report_type: report_type,
                date_type: date_type, //= T1, T2, T3,T4
                fromDate: '2022-12-09',
                toDate: '2022-12-09',
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                if(res.data.data !=""){
                    setHeaderData(res.data.data[0].Header)
                    setContentData(res.data.data[1].Sub)
                }else{
                    setData()
                }
            }else{// error
                let msg = res.data.msg
                //.show({
                //     type: 'error',
                //     text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
                //     text2: msg
                // });
            }
            setIsLoading(false)
        })
        .catch(e =>{
            console.log(e)
            setIsLoading(false)
        })
    }
    const SearchBSDReport = () =>{
        getBSDReport(bank,report_type,date_type,toDate,fromDate)
    }
    return (
        <View style={{flex:1}}>
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
                headerData && contentData ?
                (
                <TableComponent header={headerData} content={contentData}/>
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