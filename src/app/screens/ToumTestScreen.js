import { View, Text } from 'react-native'
import React,{useState} from 'react'

import SelectPickerComponent from '../components/SelectPickerComponent';

const ToumTestScreen = () => {

    const [bank,setBank] = useState('ALL_BANK')
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]

    const [year,setYear] = useState("2022")
    const years = ["2022","2021","2020","2019"]


  return (
    <View>

        <SelectPickerComponent data={bank} setData={setBank} datas={banks} />
        <Text style={{fontWeight:"bold"}}>{bank}</Text>

        <SelectPickerComponent data={year} setData={setYear} datas={years} />
        <Text style={{fontWeight:"bold"}}>{year}</Text>

    </View>
  )
}

export default ToumTestScreen