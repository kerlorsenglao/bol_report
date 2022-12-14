import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

import BackInHomeComponent from '../../components/BackInHomeComponent'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, SIZES } from '../../../constant';
import * as Animatable from 'react-native-animatable'

export default function BODReportScreen({navigation}) {
    const [show1,setShow1] = useState(true)
    const [show2,setShow2] = useState(true)
    const [show3,setShow3] = useState(true)
    const [show4,setShow4] = useState(true)
    const [show5,setShow5] = useState(true)
    const [show6,setShow6] = useState(true)
    return (
      <View style={{flex:1}}>
        <ScrollView style={{marginTop: 10}}>
  
          {/* add by toum 14/12/2022 */}
  
          <BigMenuComponent 
              bigMenuName="1. ການບໍລິຫານຄັງສຳຮອງເງິນຕາຕ່າງປະເທດ" 
              navigation={navigation} 
              // screenName='BSD' 
              show={show1} 
              setShow={setShow1}
          />
  
          <BigMenuComponent 
              bigMenuName="2. ວຽກງານສິນເຊື່ອ"
              navigation={navigation} 
              // screenName='BSD' 
              show={show2} 
              setShow={setShow2}
          />

          <BigMenuComponent
              bigMenuName="3. ວຽກງານຕະຫຼາດເງິນພາຍໃນ" 
              navigation={navigation} 
              // screenName='BSD' 
              show={show3} 
              setShow={setShow3}
          />

          <BigMenuComponent
              bigMenuName="4. ວຽກງານບັນຊີ-ບໍລິການ" 
              navigation={navigation} 
              // screenName='BSD' 
              show={show3} 
              setShow={setShow3}
          />

          <BigMenuComponent
              bigMenuName="5. ຍອດເງິນຝາກຂອງແຕ່ລະພາກສວ່ນ" 
              navigation={navigation} 
              // screenName='BSD' 
              show={show3} 
              setShow={setShow3}
          />

          <BigMenuComponent
              bigMenuName="6. ອັດຕາແລກປ່ຽນສະເລ່ຍຂອງການຊື້-ຂາຍເງິນຕາຕ່າງປະເທດ  (Fx Spot)" 
              navigation={navigation} 
              // screenName='BSD' 
              show={show3} 
              setShow={setShow3}
          />
  
        </ScrollView>
        <BackInHomeComponent navigation={navigation}/>
      </View>
    )
}

const styles = StyleSheet.create({})

const BigMenuComponent = ({bigMenuName,navigation,screenName='',show,setShow}) => {
  return (
      <TouchableOpacity
          style={{
              backgroundColor: '#daf0f7',
              paddingHorizontal: 20,
              paddingVertical:20,
              margin: 10,
              borderColor: COLORS.primary,
              borderWidth:1,
              borderRadius:15,
              shadowOffset: {width: 1, height: 1},
              shadowColor: '#000',
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation:7
          }}

          onPress={()=>{
              if(screenName==''){
                  setShow(!show)
              }else{
                  navigation.navigate(screenName)
              }
              
          }}
      >
          <Text style={{color: '#000', fontSize: SIZES.medium}}>{bigMenuName}</Text>
      </TouchableOpacity>
  )
}