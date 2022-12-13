import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";

import { getKey} from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';

import YearPickerComponent from '../../components/YearPickerComponent';
import SearchButtonComponent from '../../components/SearchButtonComponent';
import SelectPickerComponent from '../../components/SelectPickerComponent';

import DatePicker from 'react-native-date-picker'
import TableComponent from '../../components/TableComponent';

const  API_URL = Config.API_URL;

const Yearly = () => {
    const navigation = useNavigation();
    // state
    const [isLoading,setIsLoading] = useState(false)
    const [bank,setBank] = useState('ALL_BANK')
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]
    const [data,setData] = useState();
    
    const [year1,setYear1] = useState(new Date().getFullYear())
    const [year2,setYear2] = useState(new Date().getFullYear())
    const [y2Status,setY2Status] = useState(false) 

    const report_type = 'InReport';
    const date_type = 'Y';
    const date_type_default = 'DEFAULT_Y'

    useEffect(()=>{
        getBSDReport(bank,report_type,date_type_default,year1,year2)
    },[])
    // function for YearLy
    const getBSDReport = async (bank,report_type,date_type,year1,year2)=>{
        if(date_type != date_type_default){
            setIsLoading(true)
        }
        await axios.post(`${API_URL}/BankSupervisionReport`,{
            webServiceUser: "bol_it",
            webServicePassword: "123456",
            bank_code: bank,
            report_type: report_type,
            date_type: date_type, // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
            fromDate: year1,
            toDate: year2,
            }
        )
        .then(res=>{
            console.log('Yearly =>',res.data.data)
            if(res.data.responseCode == '000'){
                if(res.data.data !=""){
                    let header = res.data.data[0].Header;
                    let content = res.data.data[1].Sub
                    setData({'header': header,'content': content})
                    setYear1(header[1])
                    setYear2(header[header.length-1])
                    setY2Status(true)
                }else{
                    setData()
                }
            }else{// error
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
        .catch(e =>{
            console.log(e)
            setIsLoading(false)
        })
    }
    const SearchBSDReport_Y=()=>{
        return null
    }
    return (
        <View style={{flex:1}}>
            <Spinner visible={isLoading} color='gray'/>   
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                paddingVertical: 5
            }}>
                <View style={{flex: 1}}>
                    <YearPickerComponent
                        year1={year1}
                        setYear1={setYear1}
                        year2={year2}
                        setYear2={setYear2}
                        y2Status={y2Status}
                        setY2Status={setY2Status}
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
                    <SearchButtonComponent searchFunction={SearchBSDReport_Y}/>
                </View>
            </View>
            {
                data ? 
                (
                    <TableComponent header={data.header} content={data.content}/>
                )
                : 
                (
                    <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color: COLORS.gray, fontSize: SIZES.large}}>ບໍ່ມີຂໍ້ມູນ</Text>
                    </View>
                )
            }
            <BackInHomeComponent navigation={navigation}/>
        </View>
    )
}

export default Yearly