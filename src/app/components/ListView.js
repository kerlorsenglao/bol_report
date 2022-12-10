import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ListView({header, content}) {
    const {width,height} = useWindowDimensions()
    const tableHeader =(data)=>{
        return (
            <View 
                style={{
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: COLORS.primary,//"#37C2D0",
                    height: 60,
                    paddingHorizontal: 2,
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
                                        ? header.length == 2 ?  width/2-1 : header.length ==3 ? index ==0 ? width/2-1: width/4-1 : 
                                        index==0 ?  width/3-1 : header.length > 3 ? width/5+15-1 : width/3-1: index==0 ? width/2-1 : header.length > 2 ? width/3-1 : width/2-1,
                                    paddingHorizontal: 2,
                                    paddingLeft: index ==0 ? 5 : 0,
                                }}
                                >
                                <Text style={{
                                    fontWeight:'bold', 
                                    alignSelf: index==0 ? null :'center',
                                    }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    const tableContent =(data)=>{
        return (
            <View >
            {
                data.map((item,index)=>{
                    return (
                        <View key ={index}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: index%2 ? COLORS.secondary: COLORS.gray_ligth,
                                height: 50,
                            }}>
                                {
                                    header.map((val,jndex)=>{
                                        let H = 'H_'
                                        let S = 'S_'
                                        return (
                                            <TouchableOpacity 
                                                key={jndex}
                                                style={{
                                                    width: width > height 
                                                        ? header.length == 2 ?  width/2-1 : header.length ==3 ? jndex ==0 ? width/2-1: width/4-1 : 
                                                        jndex==0 ?  width/3-1 : header.length > 3 ? width/5+15-1 : width/3-1: jndex==0 ? width/2-1 : header.length > 2 ? width/3-1 : width/2-1,
                                                    paddingHorizontal: 2,
                                                    paddingLeft: jndex ==0 ? 8 : 0,
                                                }}
                                                >
                                                <Text 
                                                    style={{
                                                        alignSelf: jndex==0 ? null :'center',
                                                        fontSize: item[val].toString().includes(H)?SIZES.medium: 14,
                                                        fontWeight: item[val].toString().includes(H) || item[val].toString().includes(S)  ? 'bold' : null,
                                                        color: item[val].toString().includes(S) ? '#595959' : COLORS.black,
                                                        
                                                        }}>{item[val].toString().includes(H) || item[val].toString().includes(S)? item[val].slice(2) : item[val]}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                        </View>
                    )
                })
            }
        </View>
        )
    }
  return (
    <View style={{flex: 1}}>
        <ScrollView horizontal>
            <ScrollView>
                {tableHeader(header)}
                {tableContent(content)}
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
               
                {/* {
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
                } */}

            </ScrollView>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})