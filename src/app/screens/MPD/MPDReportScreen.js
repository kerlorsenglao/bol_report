import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import BackInHomeComponent from '../../components/BackInHomeComponent'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, SIZES } from '../../../constant';
import * as Animatable from 'react-native-animatable'
import HeaderComponent from '../../components/HeaderComponent';
import { useIsFocused } from '@react-navigation/native';

export default function MPDReportScreen({route,navigation}) {

    const [show1,setShow1] = useState(true)
    const [show2,setShow2] = useState(true)
    const [show3,setShow3] = useState(true)

    const isFocus = useIsFocused()

    useEffect(()=>{
        checkShow()
    },[isFocus])

    const checkShow = ()=> {
        if(route.params != undefined){
            let _show = route.params.show
            // setShow(_show)
            setShow1((_show==1 ? true: false))
            setShow2((_show==2 ? true: false))
            setShow3((_show==3 ? true: false))
            
        }else{
            setShow1(true)
            setShow2(true)
            setShow3(true)
        }
    }
    
  return (
    <View style={{flex:1}}>

        <HeaderComponent headerName="ກົມນະໂຍບາຍເງີນຕາ" navigation={navigation} bold={false} />
        
      <ScrollView style={{marginTop: 5}}>

        {/* add by toum 14/12/2022 */}

        <BigMenuComponent 
            bigMenuName="1. ຂໍ້ມູນສະຖິຕິດ້ານເງິນຕາ" 
            navigation={navigation} 
            // screenName='BSD' 
            show={show1} 
            setShow={setShow1}
        />

        {
            // sub menu 1
            show1 ? 
            <Animatable.View 
                    style={styles.footer}
                    animation='fadeInDown'
                    duration={100}
            >
                <SubMenuComponent subMenuName="1.1 ສະຖິຕິເງິນຕາ (ຂໍ້ມູນລາຍງານພາຍໃນ)" navigation={navigation} screenName="MPD_BOPQuaterly" />
                <SubMenuComponent subMenuName="1.2 ສະຖິຕິເງິນຕາ (ຂໍ້ມູນລາຍງານພາຍນອກ)" navigation={navigation} screenName="" />
                <SubMenuComponent subMenuName="1.3 ສິນເຊື່ອແຍກຂະແໜງການ (ພາຍນອກ)" navigation={navigation} screenName="" />
                
            </Animatable.View>
            :
            null
        }

        <BigMenuComponent 
            bigMenuName="2. ຂໍ້ມູນດ້ານສະຖິຕິດຸນການຊໍາລະ"
            navigation={navigation} 
            // screenName='BSD' 
            show={show2} 
            setShow={setShow2}
        />
        {
            // sub menu 2
            show2 ? 
            <Animatable.View 
                    style={styles.footer}
                    animation='fadeInDown'
                    duration={100}
            >
                <SubMenuComponent subMenuName="2.1 ສະຖິຕິດຸນການຊໍາລະ" navigation={navigation} screenName="" />
                <SubMenuComponent subMenuName="2.2 ການສົ່ງອອກ ແລະ ນຳເຂົ້າ" navigation={navigation} screenName="" />
                <SubMenuComponent subMenuName="2.3 ການລົງທຶນໂດຍກົງຈາກຕ່າງປະເທດ (Foreign Direct Investment)" navigation={navigation} screenName="" />
                <SubMenuComponent subMenuName="2.4 ໜີ້ສິນຕໍ່ຕ່າງປະເທດຂອງລັດຖະບານ" navigation={navigation} screenName="" />
                <SubMenuComponent subMenuName="2.5 ສະຖິຕິກະແສເງິນໂອນລະຫວ່າງປະເທດຜ່ານລະບົບທະນາຄານ" navigation={navigation} screenName="" />
                
            </Animatable.View>
            :
            null
        }

        <BigMenuComponent
            bigMenuName="3. ອັດຕາດອກເບ້ຍສະເລ່ຍຂອງ ທທກ" 
            navigation={navigation} 
            // screenName='BSD' 
            show={show3} 
            setShow={setShow3}
        />

        {
            // sub menu 3
            show3 ? 
            <Animatable.View 
                    style={styles.footer}
                    animation='fadeInDown'
                    duration={100}
            >
                <SubMenuComponent subMenuName="3.1 ອັດຕາດອກເງິນຝາກ" navigation={navigation} screenName="" />
                <SubMenuComponent subMenuName="3.2 ອັດຕາດອກເງິນກູ້" navigation={navigation} screenName="" />
            </Animatable.View>
            :
            null
        }

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

const SubMenuComponent = ({subMenuName,navigation,screenName=''}) => {
    return (
        <TouchableOpacity
            onPress={()=>{
                if(screenName!=''){
                    navigation.navigate(screenName)
                }
            }}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                marginVertical: 5,
                marginLeft:40,
                marginRight:10,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.medium,paddingHorizontal:10}}>{subMenuName}</Text>
        </TouchableOpacity>
    )
}