import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { reverseStringInDate } from '../help/Functions'

export default function TableComponent({header, content, date_type}) {
    const {width,height} = useWindowDimensions()
    const tableHeader =(data)=>{
        return (
            <View 
                style={{
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: COLORS.primary,//"#37C2D0",
                    height: 50,
                    paddingHorizontal: 2,
                    marginTop:5,
                    borderTopLeftRadius:5,
                    borderTopRightRadius:5
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
                                    }}>{reverseStringInDate(item, date_type)}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    const tableContent =(data)=>{
        return (
            <View style={{marginBottom: 10}}>
            {
                data.map((item,index)=>{
                    return (
                        <View key ={index}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: index%2 ? COLORS.secondary: COLORS.gray_ligth,
                                // height: 50,
                                paddingVertical:10
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
            </ScrollView>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})