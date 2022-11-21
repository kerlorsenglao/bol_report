import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState,useEffect,useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

const units = ['unit1','unit2','unit3','unit4','unit5','unit6']

const Daily = () => {
    
    const {isLoading,getBSDReport1,searchResult} = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date())
    const [bank, setBank] = useState("ALL_BANK");

    const [resultData,setResultData] = useState([]);

    useEffect(()=>{
        getBSDReport1("BCEL","InReport","D",dateFormat(date))
        if( Object.keys(searchResult).length === 0 ){
        }
        setNewResultData()
    },[]);


  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
        <Spinner visible={isLoading}/>

        <View style={{padding:10,flexDirection:'row'}}>

            {/* date picker */}
            <View style={{flex:1,borderWidth:1,borderColor:"#a4a4a4",borderRadius:5,marginRight:5}}>
                <TouchableOpacity 
                    style={{flex:1,alignItems:'center',justifyContent:'center'}}
                    onPress={()=> setOpen(true) }>
                    <Text style={{color:"#000",fontSize:18}}>
                        {date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()}
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    title='ເລືອກວັນທີ'
                    modal
                    confirmText='ຕົກລົງ'
                    cancelText='ຍົກເລີກ'
                    mode='date'
                    textColor='#00b3b3'
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />

            </View>

            {/* select bank */}
            <View style={{flex:1,borderWidth:1,borderColor:"#a4a4a4",borderRadius:5,marginLeft:5}}>
                <Picker
                    mode='dropdown'
                    selectedValue={bank}
                    onValueChange={(itemValue, itemIndex) =>
                        setBank(itemValue)
                    }>
                    <Picker.Item label="ALL_BANK" value='ALL_BANK' />
                    <Picker.Item label="BCEL" value="BCEL" />
                    <Picker.Item label="LDB" value="LDB" />
                    <Picker.Item label="JDB" value="JDB" />
                </Picker>
            </View>

        </View>

        {/* search button */}
        <View style={{}}>
            <TouchableOpacity
                onPress={()=>{
                    getBSDReport1(bank,"InReport","D",dateFormat(date))
                    setNewResultData()

                }}
            >
                <View style={{marginHorizontal:10,borderRadius: 5,backgroundColor:"#daf0f7",borderWidth:1,borderColor:"#a4a4a4",alignItems:'center'}}>
                    <Text style={{margin:10,fontSize:18,color:"#000",fontWeight:'bold'}}>ຄົ້ນຫາ</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/* show report data */}
        <View style={{flex:1}}>
            <ScrollView>
                {
                    resultData.length > 0 ?
                    resultData.map((item,index)=>{
                        if(item.rpValue !== null){
                            return <ReportItem key={index} item={item}></ReportItem>
                        }else{
                            return null;
                        }
                    })
                    :
                    null
                }
            </ScrollView>
        </View>
    </View>
  )

  function dateFormat(date) {
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
  }

  function setNewResultData(){
        // get unit
        let myUnit = []
        units.map((u)=>{
            if(u in searchResult){
                myUnit.push(u);
            }
        })

        // generate ResultData
        let new_resultData = []
        for(let i = 0; i < myUnit.length; i++){
            let unit = myUnit[i];
            let data = searchResult[unit];
            let rpUnit = data['unit']
            delete data['unit'];
            for (const [key, value] of Object.entries(data)) {
                new_resultData.push({rpKey:key,rpValue:value,rpUnit:rpUnit})
            }
        }
        setResultData(new_resultData);

        console.log(resultData)
  }
}

export default Daily

const ReportItem = ({item}) => {
    return (
        <View style={{padding:10,flexDirection:'row'}}>
            <View style={{flex:3}}>
                <Text style={{fontWeight:'bold'}}>{item.rpKey}</Text>
            </View>
            
            
            <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{paddingHorizontal:10}}>{item.rpValue}</Text>
                <Text>{item.rpUnit}</Text>
            </View>
            
        </View>
    )
}