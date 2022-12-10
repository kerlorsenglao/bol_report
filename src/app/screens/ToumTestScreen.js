import { View, Text } from 'react-native'
import React,{useState} from 'react'

import SelectPickerComponent from '../components/SelectPickerComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import SearchButtonComponent from '../components/SearchButtonComponent';
import MonthYearPickerComponent from '../components/MonthYearPickerComponent';
import YearPickerComponent from '../components/YearPickerComponent';

const ToumTestScreen = () => {

    // 1. SelectPickerComponent
    const [bank,setBank] = useState('ALL_BANK')
    const banks = ["ALL_BANK","BCEL","LDB","JDB"]

    const [year,setYear] = useState("2022")
    const years = ["2022","2021","2020","2019"]

    // 2. DatePickerComponent (from-date)
    const [fdate,setFdate] = useState(new Date())
    const [fopen,setFopen] = useState(false)

    // 2. DatePickerComponent (to-date)
    const [tdate,setTdate] = useState(new Date())
    const [topen,setTopen] = useState(false)
    const [tstatus,setTstatus] = useState(false)  // ສະຖານະວ່າຖືກເລືອກບໍ່

    // 3. SearchButtonComponent (function for search)
    const search = (bank,fdate,tdate) => {
      // do search ......
      console.log('search')
      console.log(bank+"-"+fdate.getDate()+"-"+tdate.getDate())
    }

    // 4. MonthYearPickerComponent (month-year1)
    const [my1,setMY1] = useState(new Date());
    const [show1,setShow1] = useState(false)

    // 4. MonthYearPickerComponent (month-year2)
    const [my2,setMY2] = useState(new Date());
    const [show2,setShow2] = useState(false)
    const [my2status,setMY2status] = useState(false)  // ສະຖານະວ່າຖືກເລືອກບໍ່

    // 5. YearPickerComponent 
    const [year1,setYear1] = useState(new Date().getFullYear())
    const [year2,setYear2] = useState(new Date().getFullYear())
    const [y2Status,setY2Status] = useState(false)    // ສະຖານະວ່າຖືກເລືອກບໍ່


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
                    tstatus={tstatus}
                    setTstatus={setTstatus}
                />
            </View>

            <View style={{}}>
                {/* search button */}
                <SearchButtonComponent searchFunction={ ()=>{ search(bank,fdate,tdate) }} />
            </View>
            
            

        </View>
        
        {/* Month year picker */}
        <MonthYearPickerComponent 
            my1={my1}
            setMY1={setMY1}
            show1={show1}
            setShow1={setShow1}

            my2={my2}
            setMY2={setMY2}
            show2={show2}
            setShow2={setShow2}
            my2status={my2status}
            setMY2status={setMY2status}
        />

        {/* only Year picker */}
        <YearPickerComponent 
            year1={year1}
            setYear1={setYear1}

            year2={year2}
            setYear2={setYear2}
            y2Status={y2Status}
            setY2Status={setY2Status}
        />


    </View>
  )
}

export default ToumTestScreen