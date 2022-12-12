import { View, Text,useWindowDimensions,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {LineChart} from "react-native-chart-kit";
import { COLORS, SIZES } from '../../constant'
import Ionicons from 'react-native-vector-icons/Ionicons'


const LineChartComponent = ({line_years,graph_content,datas,unit}) => {

    const colors = [
        `rgba(0, 0, 0, 1)`,

        `rgba(0, 0, 255, 1)`,
        `rgba(0, 255, 0, 1)`,
        `rgba(255, 0, 0, 1)`,

        `rgba(0, 255, 255, 1)`,
        `rgba(255, 0, 255, 1)`,
        `rgba(255, 255, 0, 1)`,

        `rgba(128, 0, 0, 1)`,
        `rgba(128, 0, 128, 1)`,
        `rgba(0, 128, 128, 1)`,

    ];
    let graph_data = [];

    // IIFE function
    (()=>{
        for(let i=0; i< datas.length ;i++){
            graph_data.push(
                {
                    data:datas[i],
                    color: ()=> colors[i],
                }
            )
        }
    })()

    const window = useWindowDimensions();
    const windowWidth = window.width;


  return (
    <View style={{flex:1}}>
        <ScrollView>
            {
                graph_data.length > 0 ?
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={{
                            labels: line_years,
                            datasets: graph_data,
                        }}
                        width={line_years.length<4? windowWidth-16 : windowWidth+line_years.length*20}
                        height={windowWidth*2/3}
                        withShadow={false}
                        // yAxisLabel="$"
                        yAxisSuffix={unit}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            propsForDots: {
                                r: "3",
                                strokeWidth: "1",
                                stroke: "#000"
                            },
                        }}
                        // bezier
                        style={{
                            marginVertical: 8,
                            marginHorizontal:8,
                            borderRadius: 5
                        }}
                        
                    />
                </ScrollView>
                
                :
                <View style={{width:windowWidth,height:windowWidth*1/2,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:COLORS.primary,fontSize:SIZES.medium}}>ບໍ່ມີຂໍ້ມູນ</Text>
                </View>
                
            }

            <View>
                {
                    graph_content.length > 0 ?
                    graph_content.map((content,index)=>{
                        return <View key={index} style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10}}>
                                    <Ionicons name='analytics-sharp' size={16} color={colors[index]} />
                                    <Text 
                                        style={{
                                            marginVertical:5,
                                            color:"#000",
                                            paddingHorizontal:10
                                        }}
                                    >
                                        {" "+content}
                                    </Text>
                                </View>
                        
                    })
                    :
                    null
                }
            </View>
        </ScrollView>
    </View>
    
  )
}

export default LineChartComponent