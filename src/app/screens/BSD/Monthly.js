import { Text, View,ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";

import { checkSelectDateValidation,monthYearFormat } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';
import MonthYearPickerComponent from '../../components/MonthYearPickerComponent';
import SelectPickerComponent from '../../components/SelectPickerComponent';
import SearchButtonComponent from '../../components/SearchButtonComponent';
import TableComponent from '../../components/TableComponent';

const  API_URL = Config.API_URL;

export default function Monthly() {
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false)
    const [bank,setBank] = useState('ALL_BANK')
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]
    const [data,setData] = useState();
    const [my1,setMY1] = useState(new Date());
    const [show1,setShow1] = useState(false)
    const [my2,setMY2] = useState(new Date());
    const [show2,setShow2] = useState(false)
    const [my2status,setMY2status] = useState(false) 
    const report_type = 'InReport';
    const date_type = 'M';
    const date_type_default = 'DEFAULT_M'

    useEffect(()=>{
        getBSDReport(bank,report_type,date_type_default,my1,my2)
    },[])
    // function for MonthLy
    const getBSDReport = async (bank,report_type,date_type,my1,my2)=>{
        if(date_type != date_type_default){
            setIsLoading(true)
        }
        await axios.post(`${API_URL}/BankSupervisionReport`,{
            webServiceUser: "bol_it",
            webServicePassword: "123456",
            bank_code: bank,
            report_type: report_type,
            date_type: date_type, // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
            fromDate: monthYearFormat(my1),
            toDate: monthYearFormat(my2),
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
            }else{// error
                console.log('Not OK')
                let msg = res.data.msg
                ToastAndroid.show({
                    type: 'error',
                    text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
                    text2: msg
                });
            }
            setIsLoading(false)
        })
        .catch(e =>{
            console.log(e)
            setIsLoading(false)
        })
    }

    const SearchBSDReport_M = () =>{
        if(checkSelectDateValidation(my1,my2,date_type).result){
            getBSDReport(bank,report_type,date_type,my1,my2)
        }else{
            ToastAndroid.show(checkSelectDateValidation(my1,my2,date_type).msg,ToastAndroid.SHORT)
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
                    <SearchButtonComponent searchFunction={SearchBSDReport_M}/>
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
