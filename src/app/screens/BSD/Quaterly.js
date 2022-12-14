import { Text, View,ToastAndroid} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";

import { getQuaterly,checkSelectDateValidation } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';

import TPickerComponent from '../../components/TPickerComponent';
import SelectPickerComponent from '../../components/SelectPickerComponent';
import SearchButtonComponent from '../../components/SearchButtonComponent';
import TableComponent from '../../components/TableComponent';


const  API_URL = Config.API_URL;

const Quaterly = () => {
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false)
    const [bank,setBank] = useState('ALL_BANK')
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]
    const [data,setData] = useState();

    const [t1,setT1] = useState("T1")
    const [y1,setY1] = useState(new Date().getFullYear().toString())

    const [t2,setT2] = useState("T1")
    const [y2,setY2] = useState(new Date().getFullYear().toString())
    const [ty2Status,setTY2Status] = useState(false)
    const report_type = 'InReport';
    const date_type= 'T';
    const date_type_default = 'DEFAULT_T'

    useEffect(()=>{
        getBSDReport(bank,report_type,date_type_default,t1,t2,y1,y2)
    },[])

    const getBSDReport = async (bank,report_type,date_type,t1,t2,y1,y2)=>{
        if(date_type_default != t1+'-'+t2){
            setIsLoading(true);
        }
        await axios.post(`${API_URL}/BankSupervisionReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                bank_code: bank,
                report_type: report_type,
                date_type: date_type == date_type_default ? date_type_default : t1+'-'+t2 ,
                fromDate: y1,
                toDate: y2,
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
                ToastAndroid.show(msg,ToastAndroid.SHORT)
            }
            setIsLoading(false)
        })
        .catch(e =>{
            console.log(e)
            setIsLoading(false)
            ToastAndroid.show('ກະລຸນາກວດສອບອິນເຕີເນັດ',ToastAndroid.SHORT)
        })
    }
    const SearchBSDReport_T = () =>{
        if(checkSelectDateValidation(y1,y2,date_type).result){
            getBSDReport(bank,report_type,date_type,t1,t2,y1,y2)
        }else{
            ToastAndroid.show(checkSelectDateValidation(y1,y2,date_type).msg,ToastAndroid.SHORT)
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
                    <SearchButtonComponent searchFunction={SearchBSDReport_T}/>
                </View>
            </View>

            {
              data ?  
                (
                    <TableComponent header={data.header} content={data.content} date_type={date_type}/>
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

export default Quaterly