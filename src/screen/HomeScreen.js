import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import data_sharing from '../assets/images/data-sharing-service.json';
import LottieView from 'lottie-react-native';
import { COLORS } from '../constant';

export default function HomeScreen() {
    const window = useWindowDimensions()
    return (
        <View style={styles.container}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.green,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})