import React,{useContext, useState} from 'react'
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, FONTS } from '../../constant'
import { AuthContext } from '../help/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import Toast from 'react-native-toast-message'

export default function LoginScreen({navigation}) {
    const { isLoading,Login, LoginTouch, Logout} = useContext(AuthContext);
    const [data,setData] = useState({
        username:'',
        password:'',
        checkTextInput: false,
        secureTextInput: true
    })

    

    const onChangeUsername=(text)=>{
        if(text.length != 0){
            setData({
                ...data, 
                username: text,
                checkTextInput: true
            })
        }else{
            setData({
                ...data, 
                username: text,
                checkTextInput: false
            })
        }
    }
    const onChangePassword=(text)=>{
        setData({
            ...data, password: text
        })
    }
    const onChangeSecureText=()=>{
        setData({
            ...data,
            secureTextInput: !data.secureTextInput
        })
    }

    return (
        <View style={styles.container}>
            <Toast/>
            <Spinner visible={isLoading}/>
            <View style={styles.header}>
                <Text style={styles.text_title}>
                    BOL Report
                </Text>
                <Text style={styles.text_header}>ເຂົ້າສູ່ລະບົບ</Text>
            </View>

            
            <Animatable.View 
                    style={styles.footer}
                    animation='fadeInUpBig' 
                    duration={1000}
            >
                {/* ສ່ວນປ້ອນ username */}
                    <Text style={styles.text_footer}>ລະຫັດຜູ້ໃຊ້</Text>
                    <View style={styles.action}>
                        <Ionicons
                            name='person-outline'
                            size={20}
                            color={COLORS.gray}
                        />
                        <TextInput
                            placeholder='username'
                            placeholderTextColor={COLORS.gray}
                            autoCapitalize='none'
                            style={styles.text_input}
                            onChangeText={(text)=>onChangeUsername(text)}
                        />
                        {
                            data.checkTextInput ?
                            <Ionicons
                                name='md-checkmark-outline'
                                size={20}
                                color={COLORS.green}
                            />
                            : null
                        }
                    </View>

                {/* ສ່ວນປ້ອນ passsword */}
                    <Text style={[styles.text_footer,{marginTop: 20}]}>ລະຫັດຜ່ານ</Text>
                    <View style={styles.action}>
                        <Ionicons
                            name='md-lock-closed-outline'
                            size={20}
                            color={COLORS.gray}
                        />
                        <TextInput
                            placeholder='password'
                            placeholderTextColor={COLORS.gray}
                            autoCapitalize='none'
                            style={styles.text_input}
                            secureTextEntry={data.secureTextInput}
                            onChangeText={(text)=>onChangePassword(text)}
                        />
                        <Ionicons
                            name={data.secureTextInput ?'md-eye-off-outline':'md-eye-outline'}
                            size={20}
                            color={COLORS.gray}
                            onPress={onChangeSecureText}
                        />
                    </View>

                {/* ສ່ວນປຸ່ມ Login */}
                    <TouchableOpacity 
                        style={styles.button_signin}
                        onPress={()=>Login(data.username,data.password)}
                    >
                        <Text style={styles.button_text}>ເຂົ້າສູ່ລະບົບ</Text>
                    </TouchableOpacity>

                {/* ສ່ວນປຸ່ມ ລົງທະບຽນໃໝ່ */}
                    {/* <TouchableOpacity 
                        style={styles.button_forgot}
                        onPress={()=> null}>
                        <Text style={styles.text_forgot}>ຍັງບໍ່ມີບັນຊີ 
                            <Text style={{color:COLORS.primary, }}> ລົງທະບຽນໃໝ່</Text>
                        </Text>
                    </TouchableOpacity> */}

                
                {/* ສ່ວນປຸ່ມ ສະແກນລາຍມື */}
                    <View
                        style={styles.fingerScaner}
                    >
                        <TouchableOpacity
                            onPress={LoginTouch}
                        >
                            <Ionicons
                                name='finger-print-outline'
                                color={COLORS.green}
                                size={50}
                            />
                        </TouchableOpacity>
                        <Text style={{color: COLORS.gray}}>ສະແກນລາຍມື</Text>
                    </View>
                    
            </Animatable.View>
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
        
    },
    footer:{
        flex: 3,
        backgroundColor: COLORS.white,
        // borderRadius: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header:{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.large
    },
    text_title:{
        fontSize: SIZES.extraLarge, 
        fontWeight: 'bold', 
        marginBottom: 15,
        color: COLORS.white,
    },
    text_footer:{
        color: COLORS.primary,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        marginHorizontal:10,
    },
    action:{
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal:10,
        borderBottomWidth:1,
        borderBottomColor: COLORS.gray_ligth,
    },
    text_input:{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: COLORS.gray,
        paddingLeft: 10,
        paddingBottom: 2,
        fontSize: 16,
    },
    button_signin:{
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal:10,

    },
    button_text:{
        fontSize: SIZES.medium,
        color: COLORS.white,
        textAlign: 'center',
        marginVertical:10 ,
        fontWeight: "bold"
    },
    button_forgot:{
        // backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray_ligth,
        borderRadius: 5,
        marginTop: 8,
        marginHorizontal:10,
    },
    text_forgot:{
        fontSize: SIZES.medium,
        color: COLORS.gray,
        textAlign: 'center',
        marginVertical:8 
    },
    fingerScaner:{
        padding: 5,
        width:'100%',
        alignItems:'center',
        marginTop: 30
    }
})