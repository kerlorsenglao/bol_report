import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'
import graph from '../../assets/images/graph.png'

export default function GraphComponent() {
  return (
    <View
        style={{
            height: 210,
            // backgroundColor: COLORS.secondary,
            marginTop:10,
            marginHorizontal: 2,
            borderRadius: 10
        }}
    >
        <View
            style={{
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <Text
                style={{
                    color: COLORS.gray,
                    fontSize: SIZES.medium,
                    fontWeight: 'bold'
                }}
            >ເສັ້ນສະແດງອັດຕາແລກປ່ຽນ</Text>
        </View>
        <View 
            style={{
                paddingHorizontal: 2
            }}
        >
            <Image
                source={graph}
                style={{
                    resizeMode:'stretch',
                    width: '100%',
                    height: 178,
                    borderRadius:10
                }}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})