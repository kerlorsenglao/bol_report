import { View, Text,TouchableOpacity } from 'react-native'
import React,{ useEffect, useState, useContext } from 'react'
import Toast from 'react-native-toast-message'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import { AuthContext } from '../../../../help/AuthContext'

import { checkSelectDateValidation,monthYearFormat } from '../../../../help/Functions'
import BackInHomeComponent from '../../../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../../../constant'
import TableComponent from '../../../../components/TableComponent'
import YearPickerComponent from '../../../../components/YearPickerComponent'
import SelectPickerComponent from '../../../../components/SelectPickerComponent'
import SearchButtonComponent from '../../../../components/SearchButtonComponent'

const  API_URL = Config.API_URL;
const API_NAME = "getBOPQuaterlyReport"
const API_NAME_GDP = "getBOPQuaterlyGDPReport"

// this function create by Toum at 21/12/2022
const Yearly = () => {

    const navigation = useNavigation();
    const isFocus = useIsFocused()
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();

    const [option,setOption] = useState('ສະຖິຕິດຸນການຊໍາລະ')
    const options = ["ສະຖິຕິດຸນການຊໍາລະ","ສະຖິຕິດຸນການຊໍາລະເປັນເປີເຊັນທຽບໃສ່ GDP"]
    const [year1,setYear1] = useState(new Date().getFullYear())
    const [year2,setYear2] = useState(new Date().getFullYear())
    const [y2Status,setY2Status] = useState(false) 

    const report_type = 'InReport';
    const date_type = 'Y';
    const date_type_default = 'DEFAULT_Y'
    const {token} = useContext(AuthContext);

    const [visited,setVisited] = useState(false)
    // useEffect
    useEffect(()=>{
      if(!visited && isFocus) {
          getBOPStatisticReport_Y(report_type,date_type_default,year1,year2)
          setVisited(true)
      }
    },[isFocus])

    // function for Yearly
    const getBOPStatisticReport_Y = async (report_type,date_type,year1,year2)=>{
        let REQ_API_NAME = API_NAME
        if(option.includes("GDP")){
            REQ_API_NAME = API_NAME_GDP
        }
        setIsLoading(true)
        await axios.post(`${API_URL}/${REQ_API_NAME}`,
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

    const SearchBOPStatisticReport_Y = () =>{
        if(y2Status==true){
            if(checkSelectDateValidation(year1,year2,date_type).result){
                getBOPStatisticReport_Y(report_type,date_type,year1,year2)
            }else{
                Toast.show({
                    type: 'error',
                    text1: checkSelectDateValidation(year1,year2,date_type).msg,
                });
            }
        }else{
            getBOPStatisticReport_Y(report_type,date_type,year1,year2)
        }
    }

  return (
    <View style={{flex:1}}>
        <Spinner visible={isLoading} cancelable={true}/>   
        <View style={{flexDirection:'column'}}>
            
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
                    <SearchButtonComponent searchFunction={SearchBOPStatisticReport_Y}/>
                </View>
            </View>
            <View style={{height:45}}>
                <SelectPickerComponent data={option} setData={setOption} datas={options} />
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

export default Yearly