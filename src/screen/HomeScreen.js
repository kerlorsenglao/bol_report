import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import data_sharing from '../assets/images/data-sharing-service.json';
import LottieView from 'lottie-react-native';
import { COLORS } from '../constant';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function HomeScreen() {
    const { Logout , isLoading } = useContext(AuthContext);
    const window = useWindowDimensions()
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
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
        backgroundColor: COLORS.primary
    },
    text:{
        color: COLORS.white,
        fontWeight: 'bold'
    }
})