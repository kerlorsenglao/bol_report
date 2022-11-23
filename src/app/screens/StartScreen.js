import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS, SIZES } from '../../constant'

export default function StartScreen({navigation}) {
  return (
    <View
        style={{
            flex:1,
            justifyContent:'center',
            // alignItems:'center'
        }}
    >
      <View style={{ alignItems: 'center'}}>
        <Text style={{
            color: COLORS.primary, 
            fontSize: 25, 
            fontWeight: 'bold',
            }}>ລະບົບລາຍງານ ທຫລ</Text>
      </View>
      <View
        style={{
            flexDirection:'row',
            justifyContent:'space-around',
            marginTop: 20
        }}
      >
        <TouchableOpacity
            onPress={()=>navigation.navigate('InHome')}
            style={{
                backgroundColor: COLORS.primary,
                height: 100,width:130,
                justifyContent:'center',
                alignItems:'center',
                borderRadius:20,
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
            <Text style={{color: COLORS.white, fontSize:SIZES.medium, fontWeight:'bold'}}>ລາຍງານພາຍໃນ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>navigation.navigate('OutHome')}
            style={{
                backgroundColor: COLORS.gray,
                height:100, width: 130,
                justifyContent:'center',
                alignItems:'center',
                borderRadius:20,
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
            <Text style={{color: COLORS.white, fontSize: SIZES.medium, fontWeight: 'bold'}}>ລາຍງານພາຍນອກ</Text>   
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})