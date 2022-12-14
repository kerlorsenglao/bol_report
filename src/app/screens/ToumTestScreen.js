import { View, Text,ScrollView, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

import SelectPickerComponent from '../components/SelectPickerComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import SearchButtonComponent from '../components/SearchButtonComponent';
import MonthYearPickerComponent from '../components/MonthYearPickerComponent';
import YearPickerComponent from '../components/YearPickerComponent';
import LineChartComponent from '../components/LineChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import TPickerComponent from '../components/TPickerComponent';

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
    const [year1,setYear1] = useState("2020")
    const [year2,setYear2] = useState("2021")
    const [y2Status,setY2Status] = useState(false)    // ສະຖານະວ່າຖືກເລືອກບໍ່

    // 6. LineChartComponent
    const line_years = ["2019","2020","2021","2022"];
    const graph_content = [
      'ຊັບສິນ​ທັງ​ໝົດ','ໜີ້ສິນທັງ​ໝົດ','ທຶນທັງ​ໝົດ','ກຳໄລ/ຂາດທຶນສະສົມ','ກຳໄລ/ຂາດທຶນໃນປີ',
      'ເງິນປ່ອຍກູ້ທັງ​ໝົດ','ໜີ້ຕ້ອງຮັບທວງຍາກ(ໃນຜັງ)','ເງິນຝາກຂອງລູກຄ້າ','ເງິນຝາກຂອງທະນາຄານ ແລະ ສະຖາບັນການເງິນອື່ນ'
    ];
    const datas = [
      // 4ປີ ມີ4ໂຕເລກ
      [
        Math.random()*100,
        Math.random()*100,
        Math.random()*100,
        Math.random()*100
      ],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
      [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
    ]


    // 7. TPickerComponent ໄຕມາດ ແລະ ປີ
    const [t1,setT1] = useState("T1")
    const [y1,setY1] = useState("2020")

    const [t2,setT2] = useState("T1")
    const [y2,setY2] = useState("2020")
    const [ty2Status,setTY2Status] = useState(false)  // ສະຖານະວ່າຖືກເລືອກບໍ່

  return (
    <View style={{flex:1}}>
{/* 
        <SelectPickerComponent data={bank} setData={setBank} datas={banks} />
        <Text style={{fontWeight:"bold"}}>{bank}</Text>

        <SelectPickerComponent data={year} setData={setYear} datas={years} />
        <Text style={{fontWeight:"bold"}}>{year}</Text>  */}


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

        {/* LineChartComponent */}
        {/* <LineChartComponent 
            line_years={line_years}
            graph_content={graph_content}
            datas={datas}
            unit="ລ້ານ"
        /> */}

        {/* TPickerComponent ໄຕມາດ ແລະ ປີ */}
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

        {/* PieChartComponent */}
        <PieChartComponent/>

    </View>
  )
}

export default ToumTestScreen