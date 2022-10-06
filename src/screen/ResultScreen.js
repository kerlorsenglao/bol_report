import React,{useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, FONTS } from '../constant'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {Picker} from '@react-native-picker/picker';

export default function ResultScreen({route,navigation}) {

    const {bank,CCY} = route.params;

    const {isLoading,Search,searchResult} = useContext(AuthContext);

    useEffect(()=>{
        Search(bank,CCY)
    },[])

    console.log(searchResult)

    
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <View style={styles.header}>
                <Text style={styles.text_title}>
                    ຂໍ້ມູນລາຍງານ
                </Text>
                
            </View>
            <Animatable.View 
                style={styles.footer}
                animation='fadeInUpBig'
                duration={1000}
            >
                    {
                        bank!=null?
                        <View style={styles.action}>
                            <Text style={styles.item_name}>ທະນາຄານ</Text>
                            <Text style={styles.itme_select}>{bank}</Text>
                        </View>
                        :
                        null
                    }
                    {
                        CCY!=null ? 
                        <View style={styles.action}>
                            <Text style={styles.item_name}>ສະກຸນເງິນ</Text>
                            <Text style={styles.itme_select}>{CCY}</Text>
                        </View>
                        :
                        null
                    }
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    

                    {
                        searchResult!=null?
                        <FlatList
                            data={searchResult} // array
                            renderItem={({item, index})=>{
                                return (
                                    <View style={styles.result_item}>
                                        <Text >{item.AC_NO}</Text>
                                        <Text style={{marginLeft:5}}>{item.bshortn}</Text>
                                        <Text style={{marginLeft:5}}>{item.CUR}</Text>
                                        <Text style={{marginLeft:5}}>{item.CR}</Text>
                                        <Text style={{marginLeft:5}}>{item.DR}</Text>
                                    </View>
                                    
                                )
                            }}
                            keyExtractor={(item)=>item.TRN_REF_NO} // ໃຫ້ມິ key ດຽວ
            
                        />
                        :
                        null
                    }
                    
                </ScrollView>
            </Animatable.View>
            <View style={{width: 50,position:'absolute',top: 10,left: 10}}>
                <TouchableOpacity
                    style={{padding: 5,}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <Ionicons name='arrow-back-circle' size={30} color={COLORS.white} />
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        marginTop: 10
    },
    item_name:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    itme_select:{
        flex:4,
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
    result_item:{
        flexDirection:"row",
        borderBottomWidth:1,
        marginTop:5
    }
})