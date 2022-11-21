import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import data_sharing from '../assets/images/data-sharing-service.json';
import LottieView from 'lottie-react-native';
import { COLORS, SIZES } from '../constant';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen({navigation}) {
    const { Logout , isLoading, userInfo } = useContext(AuthContext);
    const window = useWindowDimensions()
   
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <Text style={{color: COLORS.white, fontSize: SIZES.extraLarge}}>
                {/* Hi, <Text style={{fontWeight:'bold'}}>{userInfo.account}</Text> */}
                Hi, <Text style={{fontWeight:'bold'}}>AAAA</Text>
            </Text>
            <LottieView 
                source={data_sharing} 
                autoPlay
                style={{
                    borderRadius: 10,
                    width: window.width*0.2,
                    height: window.height*0.2,
                }}
                colorFilters={[
                    {
                        keypath: 'button',
                        color: 'red',
                    }]}
            />
            <TouchableOpacity
                style={styles.button}
                onPress = {()=>Logout()}
            >
                <Text style={styles.text}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress = {()=> navigation.navigate('Search')}
            >
                <Text style={styles.text}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.green,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        padding: 5,
        borderBottomColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 10,
        width: '50%',
        alignItems:'center',
        backgroundColor: COLORS.primary,
        marginTop:10
    },
    text:{
        color: COLORS.white,
        fontWeight: 'bold'
    }
})