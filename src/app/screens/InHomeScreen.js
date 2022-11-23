import { StyleSheet, Text, View, ScrollView , TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constant'
import { Picker } from '@react-native-picker/picker'

import GraphComponent from '../components/GraphComponent'
import DepartmentItem from '../components/DepartmentItem'
import FooterComponent from '../components/FooterComponent'

export default function InHomeScreen({navigation}) {
  return (
    <ScrollView>
        <GraphComponent/> 
        <View style={{ backgroundColor: COLORS.secondary,height:1,marginBottom:2,marginHorizontal:5}}/>
        <View
            style={{
                backgroundColor: COLORS.secondary,
                marginHorizontal:5,
                height: 600,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
            }}
        >
            <View style={{ justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:5}}>
                <Text style={{color: COLORS.black, fontSize: SIZES.medium, fontWeight: 'bold'}}>ລາຍງານຂອງບັນດາກົມ</Text>
            </View>
            <TouchableOpacity
                onPress={()=>navigation.navigate('BSD')}
                style={{
                    backgroundColor: COLORS.gray_ligth,
                    padding: 10,
                    margin: 5,
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
                <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>navigation.navigate('MPD')}
                style={{
                    backgroundColor: COLORS.gray_ligth,
                    padding: 10,
                    margin: 5,
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
                <Text style={{color: '#000000', fontSize: SIZES.medium}}>ກົມນະໂຍບາຍເງີນຕາ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>navigation.navigate('BOD')}
                style={{
                    backgroundColor: COLORS.gray_ligth,
                    padding: 10,
                    margin: 5,
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
                <Text style={{color: '#000000', fontSize: SIZES.medium}}>ກົມບໍລິການທະນາຄານທຸລະກິດ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.gray_ligth,
                    padding: 10,
                    margin: 5,
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
                <Text style={{color: '#000000', fontSize: SIZES.medium}}>ກົມຊຳລະ</Text>
            </TouchableOpacity>
           

            <FooterComponent/>
        </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({})