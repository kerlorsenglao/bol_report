import { StyleSheet, Text, View, ScrollView , TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constant'

import GraphComponent from '../components/GraphComponent'
import DepartmentItem from '../components/DepartmentItem'
import FooterComponent from '../components/FooterComponent'

export default function HomeScreen() {
  return (
    <ScrollView>
        <GraphComponent/> 
        <View style={{ backgroundColor: COLORS.secondary,height:1,marginBottom:2,marginHorizontal:5}}/>
        <View
            style={{
                backgroundColor: COLORS.primary,
                marginHorizontal:5,
                height: 600,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
            }}
        >
            <View style={{ justifyContent:'center',alignItems:'center',marginTop:5,marginBottom:5}}>
                <Text style={{color: COLORS.white, fontSize: SIZES.medium, fontWeight: 'bold'}}>ລາຍງານຂອງບັນດາກົມ</Text>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#669999',
                    padding: 10,
                    margin: 5,
                    borderColor: COLORS.gray_ligth,
                    borderWidth:1,
                    borderRadius:10
                }}
                >
                <Text style={{color: '#ffffff', fontSize: SIZES.medium}}>ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: '#669999',
                    padding: 10,
                    margin: 5,
                    borderColor: COLORS.gray_ligth,
                    borderWidth:1,
                    borderRadius:10
                }}
                >
                <Text style={{color: '#ffffff', fontSize: SIZES.medium}}>ກົມນະໂຍບາຍເງີນຕາ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: '#669999',
                    padding: 10,
                    margin: 5,
                    borderColor: COLORS.gray_ligth,
                    borderWidth:1,
                    borderRadius:10
                }}
                >
                <Text style={{color: '#ffffff', fontSize: SIZES.medium}}>ກົມບໍລິການທະນະຄານທຸລະກິດ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: '#669999',
                    padding: 10,
                    margin: 5,
                    borderColor: COLORS.gray_ligth,
                    borderWidth:1,
                    borderRadius:10
                }}
                >
                <Text style={{color: '#ffffff', fontSize: SIZES.medium}}>ກົມຊຳລະ</Text>
            </TouchableOpacity>

            <FooterComponent/>
        </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({})