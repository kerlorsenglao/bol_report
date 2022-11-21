import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'

const SectionItem = ({children}) => {
  return (
    <Animatable.View 
        animation='fadeInUp'
        duration={500}
    >
        <View style={{margin:10}}>
            <View style={styles.card}>
                {children}
            </View>
            
        </View>
    </Animatable.View>
  )
}

export default SectionItem

const styles = StyleSheet.create({
    card: {  
      backgroundColor: '#daf0f7',  
      borderRadius: 30,  
      paddingVertical: 20,
      shadowOffset: {width: 1, height: 1},  
      shadowColor: '#00b3b377',  
      shadowOpacity: 0.3,  
      shadowRadius: 5,  
      elevation:5
    },
  })