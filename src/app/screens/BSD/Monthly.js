import { StyleSheet, Text, View,TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";

import { getKey, getMonthYear, dateFormat,checkSelectDateValidation } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';
import { ScrollView } from 'react-native-gesture-handler';
import ShowItem from '../../components/ShowItem';
import MonthYearPickerComponent from '../../components/MonthYearPickerComponent';
import SelectPickerComponent from '../../components/SelectPickerComponent';
import SearchButtonComponent from '../../components/SearchButtonComponent';
import TableComponent from '../../components/TableComponent';

import DatePicker from 'react-native-date-picker'

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
            fromDate: getMonthYear(my1),
            toDate: getMonthYear(my2),
            }
        )
        .then(res=>{
            console.log("get Monthly=>",res.data)
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
        console.log('my1=>',my1)
        console.log('my2=>',my2)
        // if(checkSelectDateValidation(my1,my2).result){
            getBSDReport(bank,report_type,date_type,my1,my2)
        // }else{
        //     ToastAndroid.show(checkSelectDateValidation(my1,my2).msg,ToastAndroid.SHORT)
        // }
    }
    return (
        <View style={{flex:1}}>
            <Spinner visible={isLoading}/>   
            {/* ສ່ວນ Search */}
            {/* <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                padding:5,
            }}>
               
                <TouchableOpacity
                    style={{
                    flex: 2,
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        width:120,
                        marginHorizontal:2,
                        paddingTop:10,
                        paddingBottom: 3,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    onPress={()=>{
                        setOpenDatePicker(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>{(date.getMonth()+1)+"/"+date.getFullYear()}</Text>
                </TouchableOpacity>
                <DatePicker
                    title='ເລືອກເດືອນ ແລະ ປີ'
                    modal
                    confirmText='ຕົກລົງ'
                    cancelText='ຍົກເລີກ'
                    mode='date'
                    textColor='#00b3b3'
                    open={openDatePicker}
                    date={date}
                    onConfirm={(date) => {
                        setOpenDatePicker(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpenDatePicker(false)
                    }}
                />

             
                <View style={{
                    flex:3,
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    borderRadius:5,
                    marginHorizontal:2,
                  
                    }}>
                    <Picker
                        mode='dropdown'
                        selectedValue={bank}
                        onValueChange={(itemValue, itemIndex) =>
                            setBank(itemValue)
                        }
                        style={{
                            color: COLORS.primary,
                            height: 45,
                            alignItems:'center',
                            textAlign:'center'
                        }}
                        dropdownIconColor={COLORS.primary}
                        
                        >
                        <Picker.Item label="ALL_BANK" value='ALL_BANK' />
                        <Picker.Item label="BCEL" value="BCEL" />
                        <Picker.Item label="LDB" value="LDB" />
                        <Picker.Item label="JDB" value="JDB" />
                    </Picker>
                </View>

              
                <TouchableOpacity
                    style={{
                        flex:1,
                        width: 60,
                        backgroundColor:COLORS.primary,
                        justifyContent:'center',
                        alignItems:'center',
                        marginHorizontal:2,
                        borderRadius:5,
                    }}

                    onPress={()=>{
                        getBSDReport(bank,date);
                    }}
                >
                    <Text>ຄົ້ນຫາ</Text>
                </TouchableOpacity>
            </View> */}
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
