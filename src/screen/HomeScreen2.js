import { View, Text,StyleSheet, Image,ScrollView,FlatList,TouchableOpacity,useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, FONTS } from '../constant'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {Picker} from '@react-native-picker/picker';
import CardItem from '../components/CardItem'


const HomeScreen2 = ({navigation}) => {
    const window = useWindowDimensions();
    const windowWidth = window.width;
    const windowHeight = window.height;

    const {isLoading,userInfo,Logout} = useContext(AuthContext);

    const menus = [
        {
            id:"CPI",
            name:"ຂໍ້ມູນເງິນເຟີ້",
            icon:"md-trending-up",
            time:1000
        },
        {
            id:"M2",
            name:"ປະລິມານເງິນ",
            icon:"layers-outline",
            time:1500
        },
        {
            id:"DEPO",
            name:"ຂໍ້ມູນເງິນກູ້",
            icon:"git-compare-outline",
            time:2000
        },
        {
            id:"INTER",
            name:"ຂໍ້ມູນເງິນຝາກ",
            icon:"pulse-outline",
            time:2500
        },
    ];

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            
            <View style={styles.header}>
                <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between'}}>
                    <View style={{}}>
                        <Text style={styles.text_welcome}>ຍິນດີຕ້ອນຮັບ</Text>
                        <Text style={styles.text_name}>{userInfo.full_Name}</Text>
                    </View>

                    <View style={{}}>
                        <TouchableOpacity
                            style={{padding: 5,}}
                            onPress={()=>{Logout()}}
                        >
                            <Animatable.View 
                                animation='bounceInRight'
                                duration={2000}
                            >
                                <Ionicons name='power-outline' size={30} color={COLORS.white} />
                            </Animatable.View>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    windowHeight>windowWidth ?
                    <View style={{flex:3,alignItems:'center'}}>
                        <Animatable.View 
                                animation='bounceIn'
                                duration={1000}
                            >
                                <Image 
                                    source={require('../assets/images/logo_bank.png')} 
                                    style={styles.bol_logo}
                                />
                            </Animatable.View>
                        
                    </View>
                    :
                    null
                }
                <View style={{flex:1,alignItems:'center'}}>
                    <Text style={styles.text_title}>ລະບົບລາຍງານ</Text>
                    <Text style={styles.text_small_title}>ທະນາຄານແຫ່ງ ສປປ ລາວ</Text>
                </View>
            </View>

            <Animatable.View 
                style={styles.footer}
                animation='fadeInUpBig'
                duration={1000}
            >
                    <View style={{alignItems:'center'}}>
                        <FlatList
                            numColumns={2}
                            data={menus}
                            keyExtractor={(item)=>item.id }
                            renderItem={({item})=>{
                                    return <CardItem 
                                                menuID={item.id}
                                                menuName={item.name} 
                                                menuIcon={item.icon} 
                                                time={item.time}
                                                windowWidth={windowWidth} 
                                                windowHeight={windowHeight}
                                                navigation={navigation}
                                            />
                                }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
            </Animatable.View>

        </View>
  )
}

export default HomeScreen2


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.primary
    },
    header:{
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical:20,
    },
    footer:{
        flex: 2,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    text_title:{
        fontSize: 20, 
        fontWeight: 'bold', 
        color: COLORS.white,
    },
    text_small_title:{
        fontSize:13,
        color:COLORS.white
    },
    text_welcome:{
        fontSize:16,
        color: COLORS.white,
    },
    text_name:{
        fontSize:13,
        color: COLORS.white,
        opacity:0.7
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
    bol_logo:{
        height:"100%",
        resizeMode:'contain'
        
    },
})