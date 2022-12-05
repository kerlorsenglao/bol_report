import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant';


const ShowItem = ({item,index}) => {
  return (
    <View style={(index%2==0) ? styles.noneBg : styles.bg }>
        <View style={{flex: 3,}}>
            <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>{item.la_name}</Text>
        </View>

        <View style={{flex:2,justifyContent: 'center',alignItems:'center'}}>
            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{item.value}</Text>
        </View>
        <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>{item.unit} {item.currency}</Text>
        </View>
    </View>
  )
}

export default ShowItem

const styles = StyleSheet.create({
    noneBg:{
        flexDirection:'row',justifyContent:'space-between',marginHorizontal:5,paddingVertical:10
    },
    bg:{
        flexDirection:'row',justifyContent:'space-between',marginHorizontal:5,paddingVertical:10,backgroundColor: '#ebebe0',
    }
})