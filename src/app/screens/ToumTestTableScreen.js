import { View, Text,ScrollView } from 'react-native'
import React,{useState,useContext} from 'react'
import { COLORS, SIZES } from '../../constant'
import { AuthContext } from '../help/AuthContext'
import HeaderComponent from '../components/HeaderComponent';
import YearPickerComponent from '../components/YearPickerComponent'
import SearchButtonComponent from '../components/SearchButtonComponent'
import TableComponent2 from '../components/TableComponent2';
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import Toast from 'react-native-toast-message'

const  API_URL = Config.API_URL;



const ToumTestTableScreen = () => {

    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState();

    const [year1,setYear1] = useState(new Date().getFullYear())
    const [year2,setYear2] = useState(new Date().getFullYear())
    const [y2Status,setY2Status] = useState(false) 
    const {token} = useContext(AuthContext);

    const SearchLoanBySectorReport_Y = async ()=>{
        setIsLoading(true)
        await axios.post(`${API_URL}/getFXSpotInterbank`,{
                report_type: 'InReport',
                date_type: 'Y', // D=>ປະຈຳວັນ, M=>ປະຈຳເດືອນ, T=>ປະຈຳໄຕມາດ, Y=>ປະຈຳປີ
                fromDate: year1,
                toDate: y2Status? year2 : year1,
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
                    setYear1(header[1])
                    setYear2(header[header.length-1])
                    setY2Status(true)
                }else{
                    setData()
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
            console.log('catch')
            console.log(e)
            setIsLoading(false)
            Toast.show({
              type: 'error',
              text1: 'ກະລຸນາກວດສອບອິນເຕີເນັດ',
            });
        })
    }

  return (
    <View style={{flex:1}}>
        <Spinner visible={isLoading}/>
        <HeaderComponent headerName={'Table Test'} />
        <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingVertical: 5}}>
            <View style={{flex:4}}>
                    <YearPickerComponent
                        year1={year1}
                        setYear1={setYear1}
                        year2={year2}
                        setYear2={setYear2}
                        y2Status={y2Status}
                        setY2Status={setY2Status}
                    />
            </View>
            <View style={{flex:1}}>
                <SearchButtonComponent searchFunction={SearchLoanBySectorReport_Y}/>
            </View>
        </View>
        {/* ---------------------- */}
        {
            data ?
                (
                    // ແບບເກົ່າ <TableComponent2 header={data.header} content={data.content}/>
                    // ແບບໃໝ່: ໃຊ້ ScrollView ແລ້ວ loop
                    <ScrollView>
                        <TableComponent2 date="ເດືອນທີ: 10/2022" header={data.header} content={data.content}/>
                        <TableComponent2 date="ເດືອນທີ: 11/2022" header={data.header} content={data.content}/>
                        <TableComponent2 date="ເດືອນທີ: 12/2022" header={data.header} content={data.content}/>
                        <TableComponent2 date="ເດືອນທີ: 1/2023" header={data.header} content={data.content}/>
                    </ScrollView>
                )
            : 
                (
                    <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color: COLORS.gray, fontSize: SIZES.large}}>ບໍ່ມີຂໍ້ມູນ</Text>
                    </View>
                )
        }
        <Toast />
    </View>
  )
}

export default ToumTestTableScreen