import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function GraphComponent() {
  return (
    <View style={{height: 210,marginHorizontal: 2,justifyContent:'center'}}>
        <View style={{flexDirection:'row'}}>
            {/* ອັດຕາແລກປ່ຽນ */}
            <TouchableOpacity 
                onPress={()=>{
                    console.log('Exchange Rate')
                }}
                style={[{marginLeft:10,marginRight:5},styles.card]}
            >
                <Ionicons name='bar-chart-sharp' size={50} color={COLORS.black} />
                <Text style={{color:COLORS.black,fontSize:SIZES.medium}}>ອັດຕາແລກປ່ຽນ</Text>
            </TouchableOpacity>

            {/* ອັດຕາເງິນເຟີ້ */}
            <TouchableOpacity 
                onPress={()=>{
                    console.log('Inflation')
                }}
                style={[{marginLeft:5,marginRight:10},styles.card]}
            >
                <Ionicons name='pulse-sharp' size={50} color={COLORS.black} />
                <Text style={{color:COLORS.black,fontSize:SIZES.medium}}>ອັດຕາເງິນເຟີ້</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        flex:1,
        height:180,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#daf0f7',
        borderRadius:30,
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#00b3b377',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation:5
    }
})