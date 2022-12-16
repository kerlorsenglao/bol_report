import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen2 from '../screen/HomeScreen2'
import RegisterScreen from '../screen/RegisterScreen'
import LoginScreen from '../screen/LoginScreen'
import SearchScreen from '../screen/SearchScreen'
import ResultScreen from '../screen/ResultScreen'
import SplashScreen from '../screen/SplashScreen'
import { AuthContext } from '../context/AuthContext'
import HomeScreen3 from '../screen/HomeScreen3'

import InHomeScreen from '../app/screens/InHomeScreen'
import OutHomeScreen from '../app/screens/OutHomeScreen'
import StartScreen from '../app/screens/StartScreen'
// ກົມຄຸ້ມຄອງ
import BSDReportScreen from '../app/screens/BSD/BSDReportScreen'
// ກົມນະໂຍບາຍ
import MPDReportScreen from '../app/screens/MPD/MPDReportScreen'
import BOPQuaterly from '../app/screens/MPD/Report1/BOPQuaterly'
import Monestatistic from '../app/screens/MPD/Report10/Monestatistic'
import Testing from '../app/screens/Testing'
// ກົມບໍລິການ
import BODReportScreen from '../app/screens/BOD/BODReportScreen'
import BODForeignReserveScreen from '../app/screens/BOD/BODForeignReserve/BODForeignReserveScreen'
import BODLoanScreen from '../app/screens/BOD/BODLoan/BODLoanScreen'
import BODInternalMoneyMarketScreen from '../app/screens/BOD/BODInternalMoneyMarket/BODInternalMoneyMarketScreen'
import BODAccountingServiceScreen from '../app/screens/BOD/BODAccountingService/BODAccountingServiceScreen'
import BODDepositBalanceScreen from '../app/screens/BOD/BODDepositBalance/BODDepositBalanceScreen'
import BODExchangeRateFxSpotScreen from '../app/screens/BOD/BODExchangeRateFxSpot/BODExchangeRateFxSpotScreen'

import { COLORS } from '../constant'
import ToumTestScreen from '../app/screens/ToumTestScreen'

const StackNavigation = createNativeStackNavigator();

export default function Navigation() {
    const {token, splashLoading} = useContext(AuthContext);

    return (
        <NavigationContainer>
            <StackNavigation.Navigator
                screenOptions={
                    {
                        contentStyle:{
                            backgroundColor: COLORS.gray_ligth,
                        }
                    }
                }
            >
                {
                    splashLoading ?
                    (
                        <StackNavigation.Screen
                            name = "Splash"
                            component={SplashScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                    ):
                        token ?
                        (
                            <>
                            {/* <StackNavigation.Screen 
                                name="Testing"
                                component={Testing}
                                options={{
                                    headerShown: false,
                                }}
                            /> */}
                            {/* <StackNavigation.Screen 
                                name="toumtest"
                                component={ToumTestScreen}
                                options={{
                                    headerShown: false,
                                }}
                            /> */}
                            <StackNavigation.Screen 
                                name="Start"
                                component={StartScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <StackNavigation.Screen 
                                name="InHome"
                                component={InHomeScreen}
                                options={{
                                    headerShown: false,
                                    // title:'ລາຍງານພາຍໃນ',
                                    // headerTitleAlign:'center',
                                    // headerTitleStyle:{
                                    //     color: COLORS.white,
                                    //     fontWeight: 'bold'
                                    // },
                                    // headerStyle:{
                                    //     backgroundColor: COLORS.primary
                                    // },
                                }}
                                
                            />
                             <StackNavigation.Screen 
                                name="OutHome"
                                component={OutHomeScreen}
                                options={{
                                    // headerShown: false
                                    title:'ລາຍງານພາຍນອກ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        fontWeight: 'bold'
                                    },
                                    headerStyle:{
                                        backgroundColor: '#669999'
                                    }
                                }}
                            />
                            
                            <StackNavigation.Screen 
                                name="BSD"
                                component={BSDReportScreen}
                                options={{
                                    title:'ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        // fontWeight: 'bold'
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            <StackNavigation.Screen 
                                name="MPD"
                                component={MPDReportScreen}
                                options={{
                                    headerShown:false
                                    // title:'ກົມນະໂຍບາຍເງີນຕາ',
                                    // headerTitleAlign:'center',
                                    // headerTitleStyle:{
                                    //     color: COLORS.white,
                                    //     // fontWeight: 'bold'
                                    // },
                                    // headerStyle:{
                                    //     backgroundColor: COLORS.primary
                                    // }
                                }}
                            />
                            <StackNavigation.Screen 
                                name="MPD_BOPQuaterly"
                                component={BOPQuaterly}
                                options={{
                                    title:'ກົມນະໂຍບາຍເງີນຕາ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        // fontWeight: 'bold'
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            <StackNavigation.Screen 
                                name="Monestatistic"
                                component={Monestatistic}
                                options={{
                                    title:'ກົມນະໂຍບາຍເງີນຕາ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        // fontWeight: 'bold'
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* ໜ້າລາຍງານຂອງກົມບໍລິການ */}
                            <StackNavigation.Screen 
                                name="BOD"
                                component={BODReportScreen}
                                options={{
                                    title:'ກົມບໍລິການທະນາຄານທຸລະກິດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        // fontWeight: 'bold'
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            
                            <StackNavigation.Screen 
                                name="BODForeignReserve"
                                component={BODForeignReserveScreen}
                                options={{
                                    title:'ການບໍລິຫານຄັງສຳຮອງເງິນຕາຕ່າງປະເທດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        fontSize:17
                                        // fontWeight: 'bold'
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            <StackNavigation.Screen 
                                name="BODLoan"
                                component={BODLoanScreen}
                                options={{
                                    title:'ວຽກງານສິນເຊື່ອ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            <StackNavigation.Screen 
                                name="BODInternalMoneyMarket"
                                component={BODInternalMoneyMarketScreen}
                                options={{
                                    title:'ວຽກງານຕະຫຼາດເງິນພາຍໃນ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            <StackNavigation.Screen 
                                name="BODAccountingService"
                                component={BODAccountingServiceScreen}
                                options={{
                                    title:'ວຽກງານບັນຊີ-ບໍລິການ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            <StackNavigation.Screen 
                                name="BODDepositBalance"
                                component={BODDepositBalanceScreen}
                                options={{
                                    title:'ຍອດເງິນຝາກຂອງແຕ່ລະພາກສ່ວນ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            <StackNavigation.Screen 
                                name="BODExchangeRateFxSpot"
                                component={BODExchangeRateFxSpotScreen}
                                options={{
                                    title:'ອັດຕາແລກປ່ຽນສະເລ່ຍຂອງການຊື້-ຂາຍເງິນຕາຕ່າງປະເທດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        fontSize:12
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            </>
                        ):
                        (
                            <>
                            <StackNavigation.Screen 
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    headerShown:false
                                }}
                            />
                            <StackNavigation.Screen 
                                name="Register"
                                component={RegisterScreen}
                                options={{
                                    headerShown:false
                                }}
                            />
                            </>
                        )
                }
                
                
               
                
            </StackNavigation.Navigator>
        </NavigationContainer>
    )
}