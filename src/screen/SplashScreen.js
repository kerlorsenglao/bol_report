import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import loading from '../assets/images/reveal-loading.json';
import { COLORS } from '../constant';

export default function SplashScreen() {
    const window = useWindowDimensions();
    return (
        <View style={styles.container}>
            <LottieView 
                source={loading} 
                autoPlay
                style={{
                    borderRadius: 10,
                    width: window.width*0.1,
                    height: window.height*0.1,
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
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: COLORS.white
    }
})