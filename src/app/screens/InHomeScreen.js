import { StyleSheet, Text, View, ScrollView , TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constant'

import GraphComponent from '../components/GraphComponent'
import DepartmentItem from '../components/DepartmentItem'
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerComponent from '../components/DrawerComponent';

import MPDReportScreen from './MPD/MPDReportScreen'
import BODReportScreen from './BOD/BODReportScreen'

const Drawer = createDrawerNavigator();

export default function InHomeScreen({navigation}) {
    return (

        <Drawer.Navigator 
            initialRouteName='InHomePageScreen'
            backBehavior='initialRoute'
            screenOptions={({route})=>({
                headerShown:false
                
              })}
            
            drawerContent={(props)=> <DrawerComponent {...props}  />}
        >
          <Drawer.Screen name="InHomePageScreen" component={InHomePageScreen} />
          <Drawer.Screen name="MPD" component={MPDReportScreen} />
          <Drawer.Screen name="BOD" component={BODReportScreen} />
        </Drawer.Navigator>
      )
}


const styles = StyleSheet.create({})

const InHomePageScreen = ({navigation}) => {
    return (
        <View>
            <HeaderComponent headerName="ລາຍງານພາຍໃນ" navigation={navigation} bold={true} />
            <ScrollView>
                <GraphComponent/> 
                {/* <View style={{ backgroundColor: COLORS.secondary,height:1,marginBottom:2,marginHorizontal:5}}/> */}
                <View
                    style={{
                        backgroundColor: COLORS.secondary,
                        marginHorizontal:10,
                        height: 600,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20
                    }}
                >
                    <View style={{ justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:5}}>
                        <Text style={{color: COLORS.black, fontSize: SIZES.medium, fontWeight: 'bold'}}>ລາຍງານຂອງບັນດາກົມ</Text>
                    </View>
        
        
                    {/* add by toum 14/12/2022 */}
                    <DepartmentItem navigation={navigation} deptName="ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ" screenName="BSD"/>
                    <DepartmentItem navigation={navigation} deptName="ກົມນະໂຍບາຍເງີນຕາ" screenName="MPD"/>
                    <DepartmentItem navigation={navigation} deptName="ກົມບໍລິການທະນາຄານທຸລະກິດ" screenName="BOD"/>
                
        
                    <FooterComponent/>
                </View>
            </ScrollView>
        </View>
      )
}