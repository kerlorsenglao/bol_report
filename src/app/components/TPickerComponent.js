import { View, Text, Modal, TouchableOpacity,useWindowDimensions } from 'react-native'
import React,{useState} from 'react'

import { COLORS, SIZES } from '../../constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Picker} from '@react-native-picker/picker';


const TPickerComponent = ({
            t1,setT1,
            y1,setY1,
            t2,setT2,
            y2,setY2,
            ty2Status,setTY2Status }) => 
{
    const window = useWindowDimensions();
    const windowWidth = window.width;
    const windowHeight = window.height;

    const [showModal1,setShowModal1] = useState(false)
    const [showModal2,setShowModal2] = useState(false)

    const [myT1,setMyT1] = useState(t1)
    const [myT2,setMyT2] = useState(t2)

    const LT = ["ໄຕມາດ1","ໄຕມາດ2","ໄຕມາດ3","ໄຕມາດ4"]
    const ET = ["T1","T2","T3","T4"]
    const T = {"T1":"ໄຕມາດ1","T2":"ໄຕມາດ2","T3":"ໄຕມາດ3","T4":"ໄຕມາດ4"}

    const [myYear1,setMyYear1] = useState(y1)
    const [myYear2,setMyYear2] = useState(y2)
  return (
    <View>
      <View style={{flexDirection:'row'}}>
            {/* ເລືອກ ໄຕມາດ 1 */}
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
                        setMyT1(t1)
                        setMyYear1(y1)
                        setShowModal1(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        { T[t1] + ' / '+ y1 }
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>ຫາ</Text>
            </View>

            {/* ເລືອກ ໄຕມາດ 2 */}
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
                        setMyT2(t2)
                        setMyYear2(y2)
                        setShowModal2(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        { ty2Status ? T[t2] + ' / '+ y2 : 'ໄຕມາດ / YYYY' }
                    </Text>
                </TouchableOpacity>
            </View>


        </View>


        {/* modal 1 */}
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
                        left:windowHeight>windowWidth? '5%' :'20%',
                        width:windowHeight>windowWidth? '90%' : '60%',
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
                    {/* select and year  */}
                    <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        {/* select T */}
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            {/* head */}
                            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color: COLORS.black,fontSize:SIZES.medium}}>ເລືອກໄຕມາດ</Text>
                            </View>
                            {/* picker */}
                            <View style={{flex:3,flexDirection:'row',alignItems:'flex-start',justifyContent:'center'}}>
                                <View style={{
                                    flex: 1,
                                    borderBottomColor: COLORS.primary, 
                                    borderBottomWidth: 1,
                                    marginLeft:30,
                                    marginRight:10,
                                    // backgroundColor:"blue",
                                    // marginBottom:20
                                }}>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={myT1}
                                        onValueChange={(itemValue, itemIndex) =>{
                                            setMyT1(itemValue)
                                        }}
                                        style={{
                                            color: COLORS.primary,
                                            height: 45,
                                            alignItems:'center',
                                            textAlign:'center',
                                            // borderBottomColor: COLORS.primary,
                                        }}
                                        dropdownIconColor={COLORS.primary}
                                                    
                                    >
                                        {
                                            LT.map((data,index)=>{
                                                return <Picker.Item key={index} label={data} value={ET[index]} />
                                            })
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        {/* year */}
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            {/* head */}
                            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color: COLORS.black,fontSize:SIZES.medium}}>ເລືອກປີ</Text>
                            </View>
                            {/* click */}
                            <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let num = Number(myYear1) - 1
                                            setMyYear1(num)
                                        }}
                                    >
                                        <Ionicons name='caret-back-sharp' size={25} color={COLORS.primary} />
                                    </TouchableOpacity>

                                    <Text style={{color: COLORS.primary,fontSize:20,marginHorizontal:20}}>{myYear1}</Text>

                                    <TouchableOpacity
                                        onPress={()=>{
                                            let num = Number(myYear1) + 1
                                            setMyYear1(num)
                                        }}
                                    >
                                        <Ionicons name='caret-forward-sharp' size={25} color={COLORS.primary} />
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        </View>
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
                                setT1(myT1)
                                setY1(myYear1)
                                setShowModal1(false)
                            }}
                        >
                            <Text style={{color: 'green'}}>ຕົກລົງ</Text>
                        </TouchableOpacity>
                        
                        
                    </View>
                </View>
            </View>
        </Modal>

        {/* modal 2 */}
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
                        left:windowHeight>windowWidth? '5%' :'20%',
                        width:windowHeight>windowWidth? '90%' : '60%',
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
                    {/* select and year  */}
                    <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        {/* select T */}
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            {/* head */}
                            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color: COLORS.black,fontSize:SIZES.medium}}>ເລືອກໄຕມາດ</Text>
                            </View>
                            {/* picker */}
                            <View style={{flex:3,flexDirection:'row',alignItems:'flex-start',justifyContent:'center'}}>
                                <View style={{
                                    flex: 1,
                                    borderBottomColor: COLORS.primary, 
                                    borderBottomWidth: 1,
                                    marginLeft:30,
                                    marginRight:10,
                                    // backgroundColor:"blue",
                                    // marginBottom:20
                                }}>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={myT2}
                                        onValueChange={(itemValue, itemIndex) =>{
                                            setMyT2(itemValue)
                                        }}
                                        style={{
                                            color: COLORS.primary,
                                            height: 45,
                                            alignItems:'center',
                                            textAlign:'center',
                                            // borderBottomColor: COLORS.primary,
                                        }}
                                        dropdownIconColor={COLORS.primary}
                                                    
                                    >
                                        {
                                            LT.map((data,index)=>{
                                                return <Picker.Item key={index} label={data} value={ET[index]} />
                                            })
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        {/* year */}
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            {/* head */}
                            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color: COLORS.black,fontSize:SIZES.medium}}>ເລືອກປີ</Text>
                            </View>
                            {/* click */}
                            <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let num = Number(myYear2) - 1
                                            setMyYear2(num)
                                        }}
                                    >
                                        <Ionicons name='caret-back-sharp' size={25} color={COLORS.primary} />
                                    </TouchableOpacity>

                                    <Text style={{color: COLORS.primary,fontSize:20,marginHorizontal:20}}>{myYear2}</Text>

                                    <TouchableOpacity
                                        onPress={()=>{
                                            let num = Number(myYear2) + 1
                                            setMyYear2(num)
                                        }}
                                    >
                                        <Ionicons name='caret-forward-sharp' size={25} color={COLORS.primary} />
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* button */}
                    <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={{marginHorizontal:20}}
                            onPress={()=>{
                                setTY2Status(false)
                                setShowModal2(false)
                            }}
                        >
                            <Text style={{color: '#a1a1a1'}}>ຍົກເລີກ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{marginHorizontal:20}}
                            onPress={()=>{
                                setT2(myT2)
                                setY2(myYear2)
                                setTY2Status(true)
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

export default TPickerComponent