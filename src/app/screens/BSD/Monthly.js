import { StyleSheet, Text, View,TouchableOpacity,Modal,Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";

import {Picker} from '@react-native-picker/picker';

import { getKey, getMonthYear, dateFormat } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';
import { ScrollView } from 'react-native-gesture-handler';
import ShowItem from '../../components/ShowItem';

import DatePicker from 'react-native-modern-datepicker';

const  API_URL = Config.API_URL;

export default function Monthly() {
    const navigation = useNavigation();

    // state
    const [isLoading,setIsLoading] = useState(false)
    const [bank,setBank] = useState('ALL_BANK')
    const [data,setData] = useState({});
    const [keys,setKeys] = useState([]);

    const [show, setShow] = useState(false);
    const [date, setDate] = useState({month:new Date().getMonth() + 1 , year:new Date().getFullYear()});   


    useEffect(()=>{
        // get data
        getBSDReport(bank,date)
    },[])


    // function for MonthLy
    const getBSDReport = async (bnk,date)=>{
        setIsLoading(true);
        await axios.post(`${API_URL}/BankSupervisionReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                bank_code: bnk,
                report_type: "InReport",
                date_type: "M",
                date: date.year+'-'+date.month+'-16'
            }
        )
        .then(res=>{
            // console.log(res.data)
            if(res.data.responseCode == '000'){
                if(res.data.data !=""){
                    let newKey = getKey(res.data.data[0])
                    setKeys(newKey)
                    setData(res.data.data[0])
                }else{
                    setData({})
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

    return (
        <View style={{flex:1}}>
            <Spinner visible={isLoading} color='gray'/>   
            {/* ສ່ວນ Search */}
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                padding:5
            }}>
                {/* ເລືອກເດືອນ */}
                {/* <View style={{
                    flex:2,
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    borderRadius:5,
                    marginHorizontal:2,
                    // backgroundColor:'blue',
                    }}>
                    <Picker
                        mode='dropdown'
                        selectedValue={month}
                        onValueChange={(itemValue, itemIndex) =>{
                            setMonth(itemValue)
                        }
                        }
                        style={{
                            color: COLORS.primary,
                            height: 45,
                            alignItems:'center',
                            textAlign:'center'
                        }}
                        dropdownIconColor={COLORS.primary}
                        
                        >
                        <Picker.Item label="JAN" value={1} />
                        <Picker.Item label="FEB" value={2} />
                        <Picker.Item label="MAR" value={3} />
                        <Picker.Item label="APR" value={4} />
                        <Picker.Item label="MAY" value={5} />
                        <Picker.Item label="JUN" value={6} />
                        <Picker.Item label="JUL" value={7} />
                        <Picker.Item label="AUG" value={8} />
                        <Picker.Item label="SEP" value={9} />
                        <Picker.Item label="OCT" value={10} />
                        <Picker.Item label="NOV" value={11} />
                        <Picker.Item label="DEC" value={12} />
                    </Picker>
                </View> */}
                {/* select month V2 */}
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
                        setShow(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>{date.month+"/"+date.year}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={show}
                    onRequestClose={() => {
                        setShow(false);
                    }}
                >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:COLORS.primary}}>
                        <DatePicker
                            mode="monthYear"
                            selectorStartingYear={2000}
                            onMonthYearChange={selectedDate => {
                                setDate(getMonthYear(selectedDate))
                                setShow(false)
                            }}
                        />
                    </View>
                </Modal>

                {/* ເລືອກທະນາຄານ */}
                <View style={{
                    flex:3,
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    borderRadius:5,
                    marginHorizontal:2,
                    // backgroundColor:'blue',
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

                {/* ປຸ່ມຄົ້ນຫາ */}
                <TouchableOpacity
                    style={{
                        flex:1,
                        width: 60,
                        backgroundColor:COLORS.primary,
                        justifyContent:'center',
                        alignItems:'center',
                        marginHorizontal:2,
                        borderRadius:5
                    }}

                    onPress={()=>{
                        getBSDReport(bank,date);
                    }}
                >
                    <Text>ຄົ້ນຫາ</Text>
                </TouchableOpacity>
            </View>
            {/* end ສ່ວນ Search */}

            {/* ສ່ວນສະແດງລາຍງານ */}
            {
                Object.keys(data).length !== 0 ?
                (
                <View style={{height: '81%'}}>
                    {/* ຫົວຂໍ້ */}
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:5,backgroundColor: COLORS.secondary,paddingVertical:10,borderTopLeftRadius: 5,borderTopRightRadius: 5,}}>
                        <View style={{flex: 3,paddingLeft:5}}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>ລາຍການ</Text>
                        </View>
                        <View style={{flex:2,justifyContent: 'center',alignItems:'center'}}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>ຈຳນວນ</Text>
                        </View>
                        <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>ຫົວໜ່ວຍ</Text>
                        </View>
                    </View>
                    {/* ເສັ້ນຂິດ */}
                    <View style={{backgroundColor: COLORS.primary, height:1, marginHorizontal: 5}}/>
                    
                    {/* ສ່ວນສະແດງຂໍ້ມູນ */}
                    <ScrollView>
                        
                        
                        {
                            keys.map((mykey,index)=>{
                                return <ShowItem key={index} index={index} item={data[mykey]} />
                            })
                            
                        }
                    </ScrollView>
                </View>
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

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });