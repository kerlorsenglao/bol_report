import { View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'


const CardItem = ({menuID,menuName,menuIcon,windowWidth,windowHeight,time,navigation}) => {

  const cardWidth = windowHeight - windowWidth > 0 ? (windowWidth-100)/2 : (windowWidth-200)/2;

  return (
    
      <View style={{margin:10}}>
          <Animatable.View 
            animation='bounceIn'
            duration={time}
            delay={800}
          >
              <TouchableOpacity 
                  activeOpacity={0.5} 
                  style={[{alignItems:'center',width:cardWidth},styles.card]}
                  onPress={()=>{
                    console.log(menuID)
                    navigation.navigate('Search')
                  }}
              >
                  <Ionicons name={menuIcon} size={50} color="#000" />
                  <Text>{menuName}</Text>
              </TouchableOpacity>
          </Animatable.View>
        
      </View>
    
  )
}

export default CardItem

const styles = StyleSheet.create({
  card: {  
    backgroundColor: '#daf0f7',  
    borderRadius: 3,  
    paddingVertical: 20,
    shadowOffset: {width: 1, height: 1},  
    shadowColor: '#00b3b377',  
    shadowOpacity: 0.3,  
    shadowRadius: 5,  
    elevation:5
  },
})