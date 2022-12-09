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
import { ScrollView } from 'react-native-gesture-handler';


const  API_URL = Config.API_URL;
export default function Daily() {
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [bank,setBank] = useState('ALL_BANK');
    const report_type = 'InReport';
    const date_type = 'D';

    const navigation = useNavigation();
    useEffect(()=>{
        // console.log(dateFormat(getDateBefore(new Date())))
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
                fromDate: '2022-12-06',
                toDate: '2022-12-07',
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                console.log(res.data.data[0].Header)
                if(res.data.data !=""){
                    setData(res.data.data[0])
                }else{
                    setData()
                }
            }else{// error
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
    const SearchBSDReport = () =>{
        getBSDReport(bank,report_type,date_type,toDate,fromDate)
    }
    return (
        <View style={{flex: 1}}>
            <Spinner visible={isLoading} color='gray'/>   
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                padding:5
            }}>
                <TouchableOpacity 
                    onPress={()=>setOpenDatePicker(true)}
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
                        // backgroundColor: COLORS.secondary
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        {
                            toDate ? dateShow(toDate) : dateShow(getDateBefore(new Date()))
                        }
                    </Text>
                </TouchableOpacity>
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
                            alignItems:'center'
                        }}
                        dropdownIconColor={COLORS.primary}
                        
                        >
                        <Picker.Item label="ALL_BANK" value='ALL_BANK'/>
                        <Picker.Item label="BCEL" value="BCEL" />
                        <Picker.Item label="LDB" value="LDB" />
                        <Picker.Item label="JDB" value="JDB" />
                        <Picker.Item label="BCEL" value="BCEL" />
                        <Picker.Item label="LDB" value="LDB" />
                        <Picker.Item label="JDB" value="JDB" />
                    </Picker>
                </View>
                <TouchableOpacity
                    onPress={()=>SearchBSDReport()}
                    style={{
                        flex:1,
                        width: 60,
                        backgroundColor:COLORS.primary,
                        justifyContent:'center',
                        alignItems:'center',
                        marginHorizontal:2,
                        borderRadius:5
                    }}
                >
                    <Text>ຄົ້ນຫາ</Text>
                </TouchableOpacity>
            </View>
            <DatePicker
                title='ເລືອກວັນທີ'
                modal
                confirmText='ຕົກລົງ'
                cancelText='ຍົກເລີກ'
                mode='date'
                textColor='#00b3b3'
                open={openDatePicker}
                date={toDate? toDate : new Date()}
                onConfirm={(date) => {
                    setOpenDatePicker(false)
                    setToDate(date)
                }}
                onCancel={() => {
                    setOpenDatePicker(false)
                }}
            />
            {
                data ?
                (
                <View style={{height: '81%'}}>
                    <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: COLORS.secondary,
                            paddingVertical:10,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                    }}>
                        <View style={{
                            flex: 3,
                            paddingLeft:5
                        }}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>ລາຍການ</Text>
                        </View>
                        <View style={{
                            flex:2,
                            justifyContent: 'center',
                            alignItems:'center'
                        }}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>ຈຳນວນ</Text>
                        </View>
                        <View style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems:'center'
                        }}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>ຫົວໜ່ວຍ</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: COLORS.primary, height:1, marginHorizontal: 5}}/>
                    <ScrollView>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            // backgroundColor: COLORS.secondary,
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.total_asset.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_asset.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_asset.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.total_debt.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_debt.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_debt.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            // backgroundColor: '#e6fffa',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.total_funds.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_funds.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_funds.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.total_profit_lose.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_profit_lose.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_profit_lose.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.total_lending.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_lending.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.total_lending.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.difficult_claim_debt.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.difficult_claim_debt.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.difficult_claim_debt.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.customer_deposits.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.customer_deposits.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.customer_deposits.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.bank_and_microbank_deposits.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.bank_and_microbank_deposits.value}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.bank_and_microbank_deposits.unit}</Text>
                            </View>
                        </View>
                        {/* <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.npls.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.npls.value ? data.npls.value : 0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.npls.unit}</Text>
                            </View>
                        </View> */}
                        {/* <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.vip_credit_and_total_credit.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.vip_credit_and_total_credit.value ? data.vip_credit_and_total_credit.value : 0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.vip_credit_and_total_credit.unit}</Text>
                            </View>
                        </View> */}
                        {/* <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.msme.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.msme.value ? data.msme.value : 0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.msme.unit}</Text>
                            </View>
                        </View> */}
                        {/* <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.roa.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.roa.value?data.roa.value:0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.roa.unit}</Text>
                            </View>
                        </View> */}
                        {/* <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.roe.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.roe.value ? data.roe.value: 0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.roe.unit}</Text>
                            </View>
                        </View> */}
                        {/* <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.fund_adequacy_ratio.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.fund_adequacy_ratio.value ? data.fund_adequacy_ratio.value:0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.fund_adequacy_ratio.unit}</Text>
                            </View>
                        </View> */}
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            // backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.debt_ratio.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.debt_ratio.value ? data.debt_ratio.value:0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.debt_ratio.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.outstanding_cash_ratio.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.outstanding_cash_ratio.value ? data.outstanding_cash_ratio.value:0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.outstanding_cash_ratio.unit}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:5,
                            // backgroundColor: '#ebebe0',
                            paddingVertical:10,
                        }}>
                            <View style={{
                                flex: 3,
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{data.cash_deposit_debt_other_bank.la_name}</Text>
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.cash_deposit_debt_other_bank.value ? data.cash_deposit_debt_other_bank.value:0}</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{data.cash_deposit_debt_other_bank.unit}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
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