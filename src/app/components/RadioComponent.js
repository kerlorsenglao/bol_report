import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../../constant'

export default function RadioComponent({title,status, onPress}) {
  return (
    <View style={styles.container}>
        <Text style={styles.txt}># {title}</Text>
        <TouchableOpacity
            style={{
                paddingTop: 2,
                flexDirection:'row'
            }}
            onPress={onPress}
        >
            <Fontisto
                name={status ? "toggle-on": "toggle-off"}
                size={30}
                color={status ? COLORS.green :COLORS.gray}
            />
            {/* <Text style={{color: COLORS.gray, marginTop:5, marginLeft:2}}>{status ?"(ເປີດໃຊ້ງານ)" :"(ປິດໃຊ້ງານ)"}</Text> */}
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    txt:{
        color: COLORS.black
    }
})