import { View, Text,StyleSheet,ImageBackground,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SectionItem from '../components/SectionItem'

const HomePageScreen = ({navigation})=>{
    return (
        <View style={{flex:1}}>
            <ImageBackground style={{flex:1}} source={require('../assets/images/bluebackground.jpg')} resizeMode="cover">
                <View style={{flexDirection:'row',paddingTop:15,paddingBottom:5,paddingHorizontal:10}}>
                    <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                        <Text style={{fontSize:24,fontWeight:'bold',color:"#000"}}>ລະບົບລາຍງານ</Text>
                        <Text style={{fontSize:14,}}>ທະນາຄານແຫ່ງ ສປປ ລາວ</Text>
                    </View>
                    
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity 
                            onPress={()=>{ navigation.openDrawer(); }}
                        >
                            <Ionicons name='menu' size={40} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,paddingHorizontal:10}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        
                        <SectionItem>
                            <View style={{flexDirection:'column',paddingHorizontal:20}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:"#000"}}>ວັນພະຫັດ</Text>
                                <Text style={{fontSize:14,}}>17 ພະຈິກ</Text>
                                <Text style={{fontSize:20,color:"#000"}}>2022</Text>
                            </View>
                        </SectionItem>

                        
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <SectionItem>
                                    <View style={{height:100,alignItems:'center',justifyContent:'center'}}>
                                        <Text>other 1.1</Text>
                                    </View>
                                </SectionItem>
                            </View>

                            <View style={{flex:1}}>
                                <SectionItem>
                                    <View style={{height:100,alignItems:'center',justifyContent:'center'}}>
                                        <Text>other 1.2</Text>
                                    </View>
                                </SectionItem>
                            </View>
                        </View>

                            <SectionItem>
                                <View style={{height:200,alignItems:'center',justifyContent:'center'}}>
                                    <Text>graph</Text>
                                </View>
                            </SectionItem>
                        
                        <SectionItem>
                            <View style={{height:100,alignItems:'center',justifyContent:'center'}}>
                                <Text>other 2</Text>
                            </View>
                        </SectionItem>

                        <SectionItem>
                            <View style={{height:100,alignItems:'center',justifyContent:'center'}}>
                            <Text>other 3</Text>
                        </View>
                        </SectionItem>
                    </ScrollView>
                </View>
            </ImageBackground>
            
        </View>
  )
}

export default HomePageScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image: {
        flex: 1,
    },
})