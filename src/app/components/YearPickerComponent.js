import { View, Text, Modal, TouchableOpacity,useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constant'
import Ionicons from 'react-native-vector-icons/Ionicons'


const YearPickerComponent = ({year1,setYear1,year2,setYear2,y2Status,setY2Status}) => {
    const window = useWindowDimensions();
    const windowWidth = window.width;
    const windowHeight = window.height;

    const [showModal1,setShowModal1] = useState(false)
    const [showModal2,setShowModal2] = useState(false)
  return (
    <View>
        <View style={{flexDirection:'row'}}>
            {/* ເລືອກ year 1 */}
            <View style={{flex:3}}>
                <TouchableOpacity
                    style={{
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        marginHorizontal:10,
                        paddingTop:10,
                        paddingBottom: 3,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    onPress={()=>{
                        setShowModal1(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        {year1}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>ຫາ</Text>
            </View>

            {/* ເລືອກ year 2 */}
            <View style={{flex:3}}>
                <TouchableOpacity
                    style={{
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        marginHorizontal:10,
                        paddingTop:10,
                        paddingBottom: 3,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    onPress={()=>{
                        setShowModal2(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        { y2Status ? year2 : 'YYYY' }
                    </Text>
                </TouchableOpacity>
            </View>


        </View>


        {/* modal year1 */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal1}
            onRequestClose={() => {
                setShowModal1(false)
            }}
        >
            <View style={{flex:1}}>
                <View 
                    style={{
                        position:'absolute',
                        top:windowHeight>windowWidth ?'40%':'30%',
                        left:windowHeight>windowWidth? '10%' :'20%',
                        width:windowHeight>windowWidth? '80%' : '60%',
                        height: windowHeight>windowWidth ? '20%':'40%',
                        backgroundColor:"white",
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:10,
                        shadowColor: COLORS.black,
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        shadowOpacity: 0.41,
                        shadowRadius: 9.11,
                        elevation: 14,
                    }}
                >
                    {/* head */}
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color: COLORS.primary,fontSize:18}}>ເລືອກປີ</Text>
                    </View>

                    {/* click year */}
                    <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                            style={{flex:1,alignItems:'flex-end',justifyContent:'center',height:"100%"}}
                            onPress={()=>{
                                let num = Number(year1) - 1
                                setYear1(num)
                            }}
                        >
                            <Ionicons name='chevron-back-sharp' size={25} color={COLORS.primary} />
                        </TouchableOpacity>

                        <Text style={{color: COLORS.primary,fontSize:25,marginHorizontal:30}}>{year1}</Text>

                        <TouchableOpacity
                            style={{flex:1,alignItems:'flex-start',justifyContent:'center',height:"100%"}}
                            onPress={()=>{
                                let num = Number(year1) + 1
                                setYear1(num)
                            }}
                        >
                            <Ionicons name='chevron-forward' size={25} color={COLORS.primary} />
                        </TouchableOpacity>
                        
                    </View>

                    {/* button */}
                    <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={{marginHorizontal:20}}
                            onPress={()=>{
                                setShowModal1(false)
                            }}
                        >
                            <Text style={{color: '#a1a1a1'}}>ຍົກເລີກ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{marginHorizontal:20}}
                            onPress={()=>{
                                setYear1(year1);
                                setShowModal1(false)
                            }}
                        >
                            <Text style={{color: 'green'}}>ຕົກລົງ</Text>
                        </TouchableOpacity>
                        
                        
                    </View>
                </View>
            </View>
        </Modal>

        {/* modal year2 */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal2}
            onRequestClose={() => {
                setShowModal2(false)
            }}
        >
            <View style={{flex:1}}>
                <View 
                    style={{
                        position:'absolute',
                        top:windowHeight>windowWidth ?'40%':'30%',
                        left:windowHeight>windowWidth? '10%' :'20%',
                        width:windowHeight>windowWidth? '80%' : '60%',
                        height: windowHeight>windowWidth ? '20%':'40%',
                        backgroundColor:"white",
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:10,
                        shadowColor: COLORS.black,
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        shadowOpacity: 0.41,
                        shadowRadius: 9.11,
                        elevation: 14,
                    }}
                >
                    {/* head */}
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color: COLORS.primary,fontSize:18}}>ເລືອກປີ</Text>
                    </View>

                    {/* click year */}
                    <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                            style={{flex:1,alignItems:'flex-end',justifyContent:'center',height:"100%"}}
                            onPress={()=>{
                                let num = Number(year2) - 1
                                setYear2(num)
                            }}
                        >
                            <Ionicons name='chevron-back-sharp' size={25} color={COLORS.primary} />
                        </TouchableOpacity>

                        <Text style={{color: COLORS.primary,fontSize:25,marginHorizontal:30}}>{year2}</Text>

                        <TouchableOpacity
                            style={{flex:1,alignItems:'flex-start',justifyContent:'center',height:"100%"}}
                            onPress={()=>{
                                let num = Number(year2) + 1
                                setYear2(num)
                            }}
                        >
                            <Ionicons name='chevron-forward' size={25} color={COLORS.primary} />
                        </TouchableOpacity>
                        
                    </View>

                    {/* button */}
                    <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'center'}}>

                        <TouchableOpacity 
                            style={{marginHorizontal:20}}
                            onPress={()=>{
                                setY2Status(false)
                                setShowModal2(false)
                            }}
                        >
                            <Text style={{color: '#a1a1a1'}}>ຍົກເລີກ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{marginHorizontal:20}}
                            onPress={()=>{
                                setY2Status(true)
                                setShowModal2(false)
                            }}
                        >
                            <Text style={{color: 'green'}}>ຕົກລົງ</Text>
                        </TouchableOpacity>
                        
                        
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default YearPickerComponent