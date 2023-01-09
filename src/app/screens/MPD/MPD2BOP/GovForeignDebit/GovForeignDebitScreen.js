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

import YearPickerComponent from '../../../../components/YearPickerComponent'
import SearchButtonComponent from '../../../../components/SearchButtonComponent'
import { useNavigation } from '@react-navigation/native';

const  API_URL = Config.API_URL;
const API_NAME = "getPublicExternalDebtReport"

// this function create by Toum at 21/12/2022
const GovForeignDebitScreen = () => {

    const navigation = useNavigation()
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();

    const [year1,setYear1] = useState(new Date().getFullYear())
    const [year2,setYear2] = useState(new Date().getFullYear())
    const [y2Status,setY2Status] = useState(false) 

    const report_type = 'InReport';
    const date_type = 'Y';
    const date_type_default = 'DEFAULT_Y'
    const {token} = useContext(AuthContext);

    // useEffect
    useEffect(()=>{
      getGovForeignDebitReport_Y(report_type,date_type_default,year1,year2)
    },[])

    // function for Yearly
    const getGovForeignDebitReport_Y = async (report_type,date_type,year1,year2)=>{
        setIsLoading(true)
        await axios.post(`${API_URL}/${API_NAME}`,
            {
                report_type: report_type,
                date_type: date_type, // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
                fromDate: year1,
                toDate: year2,
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
            Toast.show({
                type: 'error',
                text1: 'ກະລຸນາກວດສອບອິນເຕີເນັດ',
            });
        })  
    }

    const SearchGovForeignDebitReport_Y = () =>{
        if(y2Status==true){
            if(checkSelectDateValidation(year1,year2,date_type).result){
                getGovForeignDebitReport_Y(report_type,date_type,year1,year2)
            }else{
                Toast.show({
                    type: 'error',
                    text1: checkSelectDateValidation(year1,year2,date_type).msg,
                });
            }
        }else{
            getGovForeignDebitReport_Y(report_type,date_type,year1,year2)
        }
    }

  return (
    <View style={{flex:1}}>
        <Spinner visible={isLoading} cancelable={true}/>   
        <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingVertical: 5}}>
            <View style={{flex:4}}>
                    <YearPickerComponent
                        year1={year1}
                        setYear1={setYear1}
                        year2={year2}
                        setYear2={setYear2}
                        y2Status={y2Status}
                        setY2Status={setY2Status}
                    />
            </View>
            <View style={{flex:1}}>
                <SearchButtonComponent searchFunction={SearchGovForeignDebitReport_Y}/>
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

export default GovForeignDebitScreen