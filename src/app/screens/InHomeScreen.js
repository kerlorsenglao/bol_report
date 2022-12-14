import { StyleSheet, Text, View, ScrollView , TouchableOpacity} from 'react-native'
import React,{ useContext } from 'react'
import { COLORS, FONTS, SIZES } from '../../constant'

import GraphComponent from '../components/GraphComponent'
import DepartmentItem from '../components/DepartmentItem'
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerComponent from '../components/DrawerComponent';
import { AuthContext } from '../help/AuthContext'

import MPDReportScreen from './MPD/MPDReportScreen'
import BODReportScreen from './BOD/BODReportScreen'
import BOPExportImportScreen from './MPD/MPD2BOP/BOPExportImport/BOPExportImportScreen'
import FDInvestmentScreen from './MPD/MPD2BOP/FDInvestment/FDInvestmentScreen'
import ITRSofBankingScreen from './MPD/MPD2BOP/ITRSofBanking/ITRSofBankingScreen'

const Drawer = createDrawerNavigator();

export default function InHomeScreen({navigation}) {
    return (

        <Drawer.Navigator 
            initialRouteName='InHomePageScreen'
            backBehavior='history'
            screenOptions={({route})=>({
                headerShown:false
                
              })}
            
            drawerContent={(props)=> <DrawerComponent {...props}  />}
        >
          <Drawer.Screen name="InHomePageScreen" component={InHomePageScreen} />
          <Drawer.Screen name="MPD" component={MPDReportScreen} />
          <Drawer.Screen name="BOD" component={BODReportScreen} />
          <Drawer.Screen name="BOPExportImport" component={BOPExportImportScreen} />
          <Drawer.Screen name="FDInvestment" component={FDInvestmentScreen} />
          <Drawer.Screen name="ITRSofBanking" component={ITRSofBankingScreen} />
        </Drawer.Navigator>
      )
}


const styles = StyleSheet.create({})

const InHomePageScreen = ({navigation}) => {
    const {menu} = useContext(AuthContext);
    return (
        <View>
            <HeaderComponent headerName="?????????????????????????????????" navigation={navigation} bold={true} />
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
                        <Text style={{color: COLORS.black, fontSize: SIZES.medium, fontWeight: 'bold'}}>???????????????????????????????????????????????????</Text>
                    </View>
        
        
                    {/* add by toum 14/12/2022 */}
                    {
                        menu.includes("BANK_SUPERVISION") ? 
                        <DepartmentItem navigation={navigation} deptName="????????????????????????????????????????????????????????????????????????" screenName="BSD"/>
                        :
                        null
                    }
                    {
                        menu.includes("MONETARY_POLICY") ? 
                        <DepartmentItem navigation={navigation} deptName="????????????????????????????????????????????????" screenName="MPD"/>
                        :
                        null
                    }
                    {
                        menu.includes("BANKING_OPERATIONS") ? 
                        <DepartmentItem navigation={navigation} deptName="????????????????????????????????????????????????????????????????????????" screenName="BOD"/>
                        :
                        null
                    }
                    {
                        menu.includes("kk") ? 
                        <DepartmentItem navigation={navigation} deptName="????????????????????????????????????????????????????????????????????????" screenName=""/>
                        :
                        null
                    }
                    {
                        menu.includes("ss") ? 
                        <DepartmentItem navigation={navigation} deptName="????????????????????????????????????????????????????????????" screenName=""/>
                        :
                        null
                    }
                    
                    
                
        
                    <FooterComponent/>
                </View>
            </ScrollView>
        </View>
      )
}