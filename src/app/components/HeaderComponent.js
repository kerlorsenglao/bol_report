import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constant'

const HeaderComponent = ({navigation,headerName,bold=true}) => {
  return (
    <View style={{width:"100%",height:55,backgroundColor:COLORS.primary,flexDirection:'row',alignItems:'center',justifyContent:'space-between',shadowColor: COLORS.black,
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.41,
                    shadowRadius: 9.11,
                    elevation: 14,}}
    >
        {/* back button */}
        <TouchableOpacity 
            style={{marginLeft:10}}
            onPress={()=>{ navigation.goBack(); }}
        >
            <Ionicons name='arrow-back-circle-sharp' size={35} color="#fff" />
        </TouchableOpacity>

        <Text style={{color: COLORS.white,fontSize:20,fontWeight:bold?'bold':null}}>{headerName}</Text>

        {/* menu button */}
        <TouchableOpacity 
            style={{marginRight:10}}
            onPress={()=>{ navigation.openDrawer(); }}
        >
            <Ionicons name='menu' size={30} color="#fff" />
        </TouchableOpacity>
    </View>
  )
}

export default HeaderComponent