import { StyleSheet, Text, View, ScrollView, FlatList, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ListView({heigth, header, content}) {
    const {width,height} = useWindowDimensions()
    const tableHeader =(data)=>{
        return (
            <View 
                style={{
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "#37C2D0",
                    height: 60,
                    // width:width
                }}
            >
                {
                    data.map((item,index)=>{
                        return (
                            <TouchableOpacity 
                                key={index}
                                style={{
                                    width: width > height 
                                    ? header.length == 2 ?  width/2 : header.length ==3 ? index ==0? width/2: width/4 : 
                                    index==0 ?  width/3 : header.length > 3 ? width/5+15 : width/3
                                    : index==0 ? width/2 : header.length > 2 ? width/3 : width/2,
                                    backgroundColor: 'blue',
                                    margin:1
                                }}
                                >
                                <Text>
                                    {item}-{header.length}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
  return (
    <View style={{}}>
        <ScrollView horizontal>
            <ScrollView>
                {/* <View style={{backgroundColor:COLORS.primary, flexDirection:'row'}}>
                    {
                        header.map((item,index)=>{
                            return (
                                <View style={{
                                    width: index == 0 ? 200 : 100, 
                                    paddingVertical: 10,
                                    backgroundColor: 'green',
                                    margin: 10
                                
                                    }} key={index}>
                                    <Text style={{fontWeight: index ==0 ? 'bold' : null}}>{item}</Text>
                                </View>
                            )
                        })
                    }
                </View> */}
                {tableHeader(header)}
                {
                    content.map((item,index)=>{

                        return (
                            <View style={{backgroundColor: index%2==0 ? COLORS.secondary: COLORS.gray_ligth, flexDirection:'row'}} key={index}>
                                {
                                    item.map((val,jndex)=>{
                                        console.log(val)
                                        return (
                                            <View style={{
                                                width: jndex ==0 ? '50%' : 100, 
                                                paddingVertical: 10}} 
                                                key={jndex}>
                                                <Text style={{fontWeight: jndex ==0 ? 'bold' : null,color: COLORS.black}}>{val}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }

            </ScrollView>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})