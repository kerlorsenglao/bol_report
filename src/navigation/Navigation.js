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
// 1
import MonetaryStatisticIntraScreen from '../app/screens/MPD/MPD1Monetary/MonetaryStatisticIntra/MonetaryStatisticIntraScreen'
import MonetaryStatisticExtraScreen from '../app/screens/MPD/MPD1Monetary/MonetaryStatisticExtra/MonetaryStatisticExtraScreen'
import LoanBySectorScreen from '../app/screens/MPD/MPD1Monetary/LoanBySector/LoanBySectorScreen'
// 2
import BOPStatisticScreen from '../app/screens/MPD/MPD2BOP/BOPStatistic/BOPStatisticScreen'
import BOPExportImportScreen from '../app/screens/MPD/MPD2BOP/BOPExportImport/BOPExportImportScreen'
import ExImByCountryScreen from '../app/screens/MPD/MPD2BOP/BOPExportImport/ExImByCountry/ExImByCountryScreen'
import ExImByProductScreen from '../app/screens/MPD/MPD2BOP/BOPExportImport/ExImByProduct/ExImByProductScreen'
import FDInvestmentScreen from '../app/screens/MPD/MPD2BOP/FDInvestment/FDInvestmentScreen'
import FDIbySectorScreen from '../app/screens/MPD/MPD2BOP/FDInvestment/FDIbySector/FDIbySectorScreen'
import FDIbyCountryScreen from '../app/screens/MPD/MPD2BOP/FDInvestment/FDIbyCountry/FDIbyCountryScreen'
import GovForeignDebitScreen from '../app/screens/MPD/MPD2BOP/GovForeignDebit/GovForeignDebitScreen'
import ITRSofBankingScreen from '../app/screens/MPD/MPD2BOP/ITRSofBanking/ITRSofBankingScreen'
import ITRSbyPurposeScreen from '../app/screens/MPD/MPD2BOP/ITRSofBanking/ITRSbyPurpose/ITRSbyPurposeScreen'
import ITRSbyBankScreen from '../app/screens/MPD/MPD2BOP/ITRSofBanking/ITRSbyBank/ITRSbyBankScreen'
import ITRSbyCurrencyScreen from '../app/screens/MPD/MPD2BOP/ITRSofBanking/ITRSbyCurrency/ITRSbyCurrencyScreen'
// 3
import DepositInterestScreen from '../app/screens/MPD/MPD3AVInterest/DepositInterest/DepositInterestScreen'
import LoanInterestScreen from '../app/screens/MPD/MPD3AVInterest/LoanInterest/LoanInterestScreen'


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
                            {/* I. ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ*/}
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

                            {/* II. ໜ້າລາຍງານຂອງກົມນະໂຍບາຍ */}
                            <StackNavigation.Screen 
                                name="MPD"
                                component={MPDReportScreen}
                                options={{
                                    headerShown:false
                                }}
                            />
                            {/* II) 1) 1.1. ສະຖິຕິເງິນຕາ (ຂໍ້ມູນລາຍງານພາຍໃນ) */}
                            <StackNavigation.Screen 
                                name="MonetaryStatisticIntra"
                                component={MonetaryStatisticIntraScreen}
                                options={{
                                    title:'ສະຖິຕິເງິນຕາ (ຂໍ້ມູນລາຍງານພາຍໃນ)',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 1) 1.2. ສະຖິຕິເງິນຕາ (ຂໍ້ມູນລາຍງານພາຍນອກ) */}
                            <StackNavigation.Screen 
                                name="MonetaryStatisticExtra"
                                component={MonetaryStatisticExtraScreen}
                                options={{
                                    title:'ສະຖິຕິເງິນຕາ (ຂໍ້ມູນລາຍງານພາຍນອກ)',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 1) 1.3. ສິນເຊື່ອແຍກຂະແໜງການ (ພາຍນອກ) */}
                            <StackNavigation.Screen 
                                name="LoanBySector"
                                component={LoanBySectorScreen}
                                options={{
                                    title:'ສິນເຊື່ອແຍກຂະແໜງການ (ພາຍນອກ)',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 2) 2.1. ສະຖິຕິດຸນການຊໍາລະ */}
                            <StackNavigation.Screen 
                                name="BOPStatistic"
                                component={BOPStatisticScreen}
                                options={{
                                    title:'ສະຖິຕິດຸນການຊໍາລະ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            {/* II) 2) 2.2. ການສົ່ງອອກ ແລະ ນຳເຂົ້າ */}
                            <StackNavigation.Screen 
                                name="BOPExportImport"
                                component={BOPExportImportScreen}
                                options={{
                                    headerShown:false,
                                    title:'ການສົ່ງອອກ ແລະ ນຳເຂົ້າ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 2) 2.2.1. ແຍກປະເພດສິນຄ້າ */}
                            <StackNavigation.Screen 
                                name="ExImByProduct"
                                component={ExImByProductScreen}
                                options={{
                                    title:'ແຍກຕາມປະເພດສິນຄ້າ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 2) 2.2.2. ແຍກຕາມປະເທດ */}
                            <StackNavigation.Screen 
                                name="ExImByCountry"
                                component={ExImByCountryScreen}
                                options={{
                                    title:'ແຍກຕາມປະເທດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            {/* II) 2) 2.3. ການລົງທຶນໂດຍກົງຈາກຕ່າງປະເທດ(Foreign Direct Investment) */}
                            <StackNavigation.Screen 
                                name="FDInvestment"
                                component={FDInvestmentScreen}
                                options={{
                                    headerShown:false,
                                    title:'ການລົງທຶນໂດຍກົງຈາກຕ່າງປະເທດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 2) 2.3.1. ລົງທຶນໂດຍກົງຈາກຕ່າງປະເທດແຍກຂະແໜງການ */}
                            <StackNavigation.Screen 
                                name="FDIbySector"
                                component={FDIbySectorScreen}
                                options={{
                                    title:'ແຍກຂະແໜງການ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 2) 2.3.2. ລົງທຶນໂດຍກົງຈາກຕ່າງປະເທດແຍກຕາມປະເທດ */}
                            <StackNavigation.Screen 
                                name="FDIbyCountry"
                                component={FDIbyCountryScreen}
                                options={{
                                    title:'ແຍກປະເທດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            {/* II) 2) 2.4. ໜີ້ສິນຕໍ່ຕ່າງປະເທດຂອງລັດຖະບານ */}
                            <StackNavigation.Screen 
                                name="GovForeignDebit"
                                component={GovForeignDebitScreen}
                                options={{
                                    title:'ໜີ້ສິນຕໍ່ຕ່າງປະເທດຂອງລັດຖະບານ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />

                            {/* II) 2) 2.5. ສະຖິຕິກະແສເງິນໂອນລະຫວ່າງປະເທດຜ່ານລະບົບທະນາຄານ */}
                            <StackNavigation.Screen 
                                name="ITRSofBanking"
                                component={ITRSofBankingScreen}
                                options={{
                                    headerShown:false,
                                    title:'ສະຖິຕິກະແສເງິນໂອນລະຫວ່າງປະເທດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary,
                                        
                                    }
                                }}
                            />
                            {/* II) 2) 2.5.1 ແຍກຕາມຈຸດປະສົງ */}
                            <StackNavigation.Screen 
                                name="ITRSbyPurpose"
                                component={ITRSbyPurposeScreen}
                                options={{
                                    title:'ແຍກຕາມຈຸດປະສົງ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary,
                                        
                                    }
                                }}
                            />
                            {/* II) 2) 2.5.2 ແຍກຕາມທະນາຄານ */}
                            <StackNavigation.Screen 
                                name="ITRSbyBank"
                                component={ITRSbyBankScreen}
                                options={{
                                    title:'ແຍກຕາມທະນາຄານ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary,
                                        
                                    }
                                }}
                            />
                            {/* II) 2) 2.5.3 ແຍກຕາມສະກຸນເງິນ */}
                            <StackNavigation.Screen 
                                name="ITRSbyCurrency"
                                component={ITRSbyCurrencyScreen}
                                options={{
                                    title:'ແຍກຕາມສະກຸນເງິນ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary,
                                        
                                    }
                                }}
                            />

                            {/* II) 3) 3.1. ອັດຕາດອກເງິນຝາກ */}
                            <StackNavigation.Screen 
                                name="DepositInterest"
                                component={DepositInterestScreen}
                                options={{
                                    title:'ອັດຕາດອກເງິນຝາກ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* II) 3) 3.2. ອັດຕາດອກເງິນກູ້ */}
                            <StackNavigation.Screen 
                                name="LoanInterest"
                                component={LoanInterestScreen}
                                options={{
                                    title:'ອັດຕາດອກເງິນກູ້',
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
                            {/* III. ໜ້າລາຍງານຂອງກົມບໍລິການ */}
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
                            {/* III) 1) ການບໍລິຫານຄັງສຳຮອງເງິນຕາຕ່າງປະເທດ */}
                            <StackNavigation.Screen 
                                name="BODForeignReserve"
                                component={BODForeignReserveScreen}
                                options={{
                                    title:'ການບໍລິຫານຄັງສຳຮອງເງິນຕາຕ່າງປະເທດ',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
                                        fontSize:18
                                        // fontWeight: 'bold'
                                    },
                                    headerStyle:{
                                        backgroundColor: COLORS.primary
                                    }
                                }}
                            />
                            {/* III) 2) ວຽກງານສິນເຊື່ອ */}
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
                            {/* III) 3) ວຽກງານຕະຫຼາດເງິນພາຍໃນ */}
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
                            {/* III) 4) ວຽກງານບັນຊີ-ບໍລິການ */}
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
                            {/* III) 5) ຍອດເງິນຝາກຂອງແຕ່ລະພາກສ່ວນ */}
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
                            {/* III) 6) ອັດຕາແລກປ່ຽນສະເລ່ຍຂອງການຊື້-ຂາຍເງິນຕາຕ່າງປະເທດ */}
                            <StackNavigation.Screen 
                                name="BODExchangeRateFxSpot"
                                component={BODExchangeRateFxSpotScreen}
                                options={{
                                    title:'ອັດຕາແລກປ່ຽນສະເລ່ຍ FX Spot',
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{
                                        color: COLORS.white,
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