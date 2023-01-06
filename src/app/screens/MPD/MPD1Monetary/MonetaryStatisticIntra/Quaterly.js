import { View, Text,TouchableOpacity } from 'react-native'
import React,{ useEffect, useState,useContext } from 'react'
import Toast from 'react-native-toast-message'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import { AuthContext } from '../../../../help/AuthContext'

import { getQuaterly, checkSelectDateValidation,monthYearFormat } from '../../../../help/Functions'
import BackInHomeComponent from '../../../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../../../constant'
import TableComponent from '../../../../components/TableComponent'
import TPickerComponent from '../../../../components/TPickerComponent'
import SearchButtonComponent from '../../../../components/SearchButtonComponent'

const  API_URL = Config.API_URL;

const Quaterly = () => {

    const navigation = useNavigation();
    const isFocus = useIsFocused()
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();

    const [t1,setT1] = useState("T1")
    const [y1,setY1] = useState(new Date().getFullYear().toString())

    const [t2,setT2] = useState("T1")
    const [y2,setY2] = useState(new Date().getFullYear().toString())
    const [ty2Status,setTY2Status] = useState(false)

    const report_type = 'InReport';
    const date_type= 'T';
    const date_type_default = 'DEFAULT_T'
    const {token} = useContext(AuthContext);

    const [visited,setVisited] = useState(false)
    // useEffect
    useEffect(()=>{
        if(!visited && isFocus) {
            getMonetaryStatisticIntraReport_Q(report_type,date_type_default,t1,t2,y1,y2)
            setVisited(true)
        }
    },[isFocus])

    // function for Quaterly
    const getMonetaryStatisticIntraReport_Q = async (report_type,date_type,t1,t2,y1,y2)=>{
        setIsLoading(true);
        await axios.post(`${API_URL}/MonetaryPolicyMSReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                report_type: report_type,
                date_type: date_type == date_type_default ? date_type_default : t1+'-'+t2 ,
                fromDate: y1,
                toDate: y2,
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
                    setT1(getQuaterly(header[1].trim().slice(0,7)))
                    setT2(getQuaterly(header[header.length-1].trim().slice(0,7)))
                    setY1(header[1].trim().slice(8))
                    setY2(header[header.length-1].trim().slice(8))
                    setTY2Status(true)
                }else{
                    setData()
                }
            }else{// error
                console.log('Not OK')
                let msg = res.data.msg
                Toast.show({
                  type: 'error',
                  text1: msg,
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

    const SearchMonetaryStatisticIntraReport_Q = () =>{
        if(ty2Status==true){
          if(checkSelectDateValidation(y1,y2,date_type).result){
            getMonetaryStatisticIntraReport_Q(report_type,date_type,t1,t2,y1,y2)
          }else{
              Toast.show({
                      type: 'error',
                      text1: checkSelectDateValidation(y1,y2,date_type).msg,
              });
          }
        }else{
            getMonetaryStatisticIntraReport_Q(report_type,date_type,t1,t2,y1,y2)
        }
    }

  return (
    <View style={{flex:1}}>
        <Spinner visible={isLoading}/> 
        <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingVertical: 5}}>
            <View style={{flex:4}}>
                <TPickerComponent
                    t1={t1}
                    setT1={setT1}
                    y1={y1}
                    setY1={setY1}

                    t2={t2}
                    setT2={setT2}
                    y2={y2}
                    setY2={setY2}
        
                    ty2Status={ty2Status}
                    setTY2Status={setTY2Status}
                />
            </View>
            <View style={{flex:1}}>
                <SearchButtonComponent searchFunction={SearchMonetaryStatisticIntraReport_Q}/>
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
      <Toast />
    </View>
  )
}

export default Quaterly