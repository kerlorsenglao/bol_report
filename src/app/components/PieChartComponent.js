import { View, Text,useWindowDimensions,ScrollView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { VictoryPie} from "victory-native";
import Ionicons from 'react-native-vector-icons/Ionicons'


const PieChartComponent = ({propsData}) => {
    const myColors = [ "#d895f5","#F4511E", "#00897B", "#58c8f5", "#b70104", "#7fc4bd","#FFF59D","#8BC34A","#f59c58", "#006064"]
    let pie_data = [];
    let lables = [];
    const [selected,setSelected] = useState(0);
    // IIFE function
    (function(){
        // generate pie_data
        for(let i=0; i<propsData.length; i++){
            pie_data.push({
                x: Number(propsData[i].value)+""+propsData[i].unit,
                y: Number(propsData[i].value)
            })
            lables.push({
                la_name:propsData[i].la_name,
                value:Number(propsData[i].value)+""+propsData[i].unit,
            })
        }
    })()
    const window = useWindowDimensions();
    const windowWidth = window.width;
    const windowHeight= window.height;

  return (
    <ScrollView>
        <View style={{alignItems:'center',justifyContent:'center',backgroundColor:"white"}}>
            <VictoryPie
                style={{ labels: { fill: "black", fontWeight: "bold" } }}   // lables font
                height={windowHeight-windowWidth>0 ? windowWidth*3/4: windowHeight*3/4 }
                data={pie_data}
                colorScale={myColors}
                padAngle={3}
                radius={({ datum }) => {
                        if(windowHeight-windowWidth>0){
                            if(datum._x-1  == selected){
                                return windowWidth/4 + 15
                            }
                            return windowWidth/4
                        }else{
                            if(datum._x-1  == selected){
                                return windowHeight/4 + 15
                            }
                            return windowHeight/4
                        }
                    }
                }
                events={[
                    {
                    target: 'data',
                    eventHandlers: {
                        onPressIn: () => {
                            return [
                                {
                                    target: 'data',
                                    mutation: (dataProps) => {
                                        setSelected(dataProps.index)
                                        // console.log('item selected is',dataProps.index)
                                        return {}
                                    }
                                }
                            ]
                        },
                        onPressOut: () => {
                            // ....
                        }
                    }
                    }
                ]}
            />
        </View>     
        <View style={{alignItems:'center'}}>
            {
                lables.length > 0 ?
                lables.map((item,index)=>{
                    return  <TouchableOpacity
                                key={index}
                                style={{
                                    borderColor:myColors[index],
                                    borderWidth:1,
                                    borderRadius:10,
                                    backgroundColor:selected==index ? myColors[index] : null,
                                    width:windowWidth-20,
                                    marginVertical:5}}
                                onPress={()=>{
                                    setSelected(index)
                                }}
                            >
                                <View style={{
                                    paddingHorizontal:20,
                                    paddingVertical:10,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center'}}
                                >
                                    <View style={{flex:5,flexDirection:'row',alignItems:'center'}}>
                                        <Ionicons name='ellipse' size={25} color={selected==index ? "white" : myColors[index]} />
                                        <Text style={{paddingLeft:10,color:selected==index ? "white" : "black"}}>{item.la_name}</Text>
                                    </View>
                                    <Text style={{flex:1,textAlign:'right',color:selected==index ? "white" : "black"}}>{item.value}</Text>
                                </View>
                                
                            </TouchableOpacity>
                })
                :
                null
            }
        </View>
    </ScrollView>
  )
}

export default PieChartComponent