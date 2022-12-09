import { View, Text } from 'react-native'
import React,{useState} from 'react'

import SelectPickerComponent from '../components/SelectPickerComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import SearchButtonComponent from '../components/SearchButtonComponent';

const ToumTestScreen = () => {

    const [bank,setBank] = useState('ALL_BANK')
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]

    const [year,setYear] = useState("2022")
    const years = ["2022","2021","2020","2019"]

    // date picker from-date
    const [fdate,setFdate] = useState(new Date())
    const [fopen,setFopen] = useState(false)

    // date picker to-date
    const [tdate,setTdate] = useState(new Date())
    const [topen,setTopen] = useState(false)

    // function for search
    const search = () => {
      console.log('search')
    }

  return (
    <View>

        <SelectPickerComponent data={bank} setData={setBank} datas={banks} />
        <Text style={{fontWeight:"bold"}}>{bank}</Text>

        <SelectPickerComponent data={year} setData={setYear} datas={years} />
        <Text style={{fontWeight:"bold"}}>{year}</Text>


        <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
                <DatePickerComponent
                    fdate={fdate}
                    setFdate={setFdate}
                    fopen={fopen}
                    setFopen={setFopen}

                    tdate={tdate}
                    setTdate={setTdate}
                    topen={topen}
                    setTopen={setTopen}
                />
            </View>

            <View style={{}}>
                <SearchButtonComponent searchFunction={search} />
            </View>
            
            

        </View>
        


    </View>
  )
}

export default ToumTestScreen