import React,{useContext, useState} from 'react'
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, FONTS } from '../constant'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {Picker} from '@react-native-picker/picker';

export default function SearchScreen({navigation}) {

    const [bank, setBank] = useState(null);
    const [CCY, setCCY] = useState(null);

    const {isLoading,Search} = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            
            <View style={styles.header}>
                <Animatable.View
                    animation='fadeInDownBig'
                    duration={1000}
                >
                    <Text style={styles.text_title}>
                        ຄົ້ນຫາລາຍງານ
                    </Text>
                </Animatable.View>
                
            </View>
            <Animatable.View 
                style={styles.footer}
                animation='fadeInUpBig'
                duration={1000}
            >
                <ScrollView>
                    <View style={styles.action}>
                        <View style={styles.item_name}>
                            <Text>ທະນາຄານ</Text>
                        </View>
                        
                        <View style={styles.itme_select}>
                            <Picker
                                mode='dropdown'
                                selectedValue={bank}
                                onValueChange={(itemValue, itemIndex) =>
                                    setBank(itemValue)
                                }>
                                <Picker.Item color={COLORS.gray} label="ເລືອກທະນາຄານ" value={null} />
                                <Picker.Item color={COLORS.primary} label="BECL" value="BCEL" />
                                <Picker.Item color={COLORS.primary} label="LDB" value="LDB" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.action}>
                        <View style={styles.item_name}>
                            <Text>ສະກຸນເງິນ</Text>
                        </View>
                        
                        <View style={styles.itme_select}>
                            <Picker
                                mode='dropdown'
                                selectedValue={CCY}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCCY(itemValue)
                                }>
                                <Picker.Item color={COLORS.gray} label="ເລືອກສະກຸນເງິນ" value={null} />
                                <Picker.Item color={COLORS.primary} label="LAK" value="LAK" />
                                <Picker.Item color={COLORS.primary} label="USD" value="USD" />
                                <Picker.Item color={COLORS.primary} label="THB" value="THB" />
                            </Picker>
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.button_search}
                        onPress={()=>{
                            navigation.navigate('Result',{bank:bank,CCY:CCY})
                        }}
                    >
                        <Text style={styles.button_text}>ຄົ້ນຫາ</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
            <View style={{width: 50,position:'absolute',top: 10,left: 10}}>
                <TouchableOpacity
                    style={{padding: 5,}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <Animatable.View 
                        animation='bounceInRight'
                        duration={1000}
                    >
                        <Ionicons name='arrow-back-circle' size={30} color={COLORS.white} />
                    </Animatable.View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.primary
    },
    header:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingHorizontal: 20,
        paddingBottom: 5,
        justifyContent:'center'
    },
    footer:{
        flex: 6,
        // height:'100%',
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_title:{
        fontSize: SIZES.extraLarge, 
        fontWeight: 'bold', 
        color: COLORS.white,
    },
    text_footer:{
        color: COLORS.primary,
        fontSize: SIZES.medium,
    },
    action:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    item_name:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    itme_select:{
        flex:4,
        borderWidth:1,
        borderRadius:5,
        borderColor: COLORS.gray,
    },
    button_search:{
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginTop: 20
    },
    button_text:{
        fontSize: SIZES.medium,
        color: COLORS.white,
        textAlign: 'center',
        marginVertical:8 ,
        fontWeight: "bold"
    },
})