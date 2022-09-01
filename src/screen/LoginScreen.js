import React,{useContext, useState} from 'react'
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, FONTS } from '../constant'
import { AuthContext } from '../context/AuthContext'

export default function LoginScreen({navigation}) {
    const value = useContext(AuthContext);
    const [data,setData] = useState({
        email:'',
        password:'',
        checkTextInput: false,
        secureTextInput: true
    })

    const onChangeEmail=(text)=>{
        if(text.length != 0){
            setData({
                ...data, 
                email: text,
                checkTextInput: true
            })
        }else{
            setData({
                ...data, 
                email: text,
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
    const submitSignin=()=>{
        // alert('call api to login here');
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
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
                <Text style={styles.text_footer}>ອີເມວ</Text>
                <View style={styles.action}>
                    <Ionicons
                        name='person-outline'
                        size={20}
                        color={COLORS.gray}
                    />
                    <TextInput
                        placeholder='email'
                        placeholderTextColor={COLORS.gray}
                        autoCapitalize='none'
                        style={styles.text_input}
                        onChangeText={(text)=>onChangeEmail(text)}
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
                <TouchableOpacity 
                    style={styles.button_signin}
                    onPress={submitSignin}
                >
                    <Text style={styles.button_text}>ເຂົ້າລະບົບ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button_forgot}
                    onPress={()=> navigation.navigate('Register')}>
                    <Text style={styles.text_forgot}>ຍັງບໍ່ມີບັນຊີ 
                        <Text style={{color:COLORS.primary, }}> ລົງທະບຽນໃໝ່</Text>
                    </Text>
                </TouchableOpacity>
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
        paddingBottom: 5
    },
    footer:{
        flex: 4,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header:{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.large
    },
    text_title:{
        fontSize: SIZES.extraLarge, 
        fontWeight: 'bold', 
        marginBottom: 15
    },
    text_footer:{
        color: COLORS.primary,
        fontSize: SIZES.medium,
        // fontWeight: 'bold'
    },
    action:{
        flexDirection: 'row',
        marginTop: 10,
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
        marginTop: 20
    },
    button_text:{
        fontSize: SIZES.medium,
        color: COLORS.white,
        textAlign: 'center',
        marginVertical:8 
    },
    button_forgot:{
        // backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray_ligth,
        borderRadius: 5,
        marginTop: 8 
    },
    text_forgot:{
        fontSize: SIZES.medium,
        color: COLORS.gray,
        textAlign: 'center',
        marginVertical:8 
    }
})