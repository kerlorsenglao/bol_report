import { View, Text } from 'react-native'
import React,{useState} from 'react'

import SelectPickerComponent from '../components/SelectPickerComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import SearchButtonComponent from '../components/SearchButtonComponent';
import MonthYearPickerComponent from '../components/MonthYearPickerComponent';

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
    const search = (bank,fdate,tdate) => {
      // do search ......
      console.log('search')
      console.log(bank+"-"+fdate.getDate()+"-"+tdate.getDate())
    }

  return (
    <View>

        <SelectPickerComponent data={bank} setData={setBank} datas={banks} />
        <Text style={{fontWeight:"bold"}}>{bank}</Text>

        <SelectPickerComponent data={year} setData={setYear} datas={years} />
        <Text style={{fontWeight:"bold"}}>{year}</Text>


        <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              {/* date picker */}
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
                {/* search button */}
                <SearchButtonComponent searchFunction={ ()=>{ search(bank,fdate,tdate) }} />
            </View>
            
            

        </View>
        
        {/* Month year picker */}
        <MonthYearPickerComponent />

    </View>
  )
}

export default ToumTestScreen