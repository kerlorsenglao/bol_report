import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import BackInHomeComponent from '../../components/BackInHomeComponent'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, SIZES } from '../../../constant';

export default function MPDReportScreen({navigation}) {
  return (
    <View
      style={{
        flex:1
      }}
    >
      <ScrollView
        style={{
          marginTop: 10
        }}
      >
        <TouchableOpacity
            onPress={()=>navigation.navigate('MPD_BOPQuaterly')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>1. ສະຖິຕິດຸນການຊຳລະກັບຕ່າງປະເທດ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>2. ສະຖິຕິການນຳເຂົ້າ-ສົ່ງອອກສິນຄ້າແຍກຂະແໜງການ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>3. ສະຖິຕິການນຳເຂົ້າ-ສົ່ງອອກສິນຄ້າແຍກປະເທດ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>4. ການລົງທຶກໂດຍກົງຈາກຕ່າງປະເທດແຍກເປັນຂະແໜງການ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>5. ການລົງທຶກໂດຍກົງຈາກຕ່າງປະເທດແຍກເປັນປະເທດ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>6. ສະຖິຕິການລົງທຶນລະຫວ່າງປະເທດ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>7. ສະຖິຕິໜີ້ສິນຕໍ່ຕ່າງປະເທດ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>8. ສະຖິຕິໜີ້ສິນຕໍ່ຕ່າງປະເທດຂອງລັດຖະບານ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>9. ສະຖິຕິກະແສເງີນໂອນເຂົ້າ-ອອກປະເທດ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>10. ສະຖິຕິເງີນຕາ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={()=>navigation.navigate('BSD')}
            style={{
                backgroundColor: COLORS.gray_ligth,
                padding: 10,
                margin: 5,
                borderColor: COLORS.gray_ligth,
                borderWidth:1,
                borderRadius:20,
                borderColor: COLORS.primary,
                borderWidth: 1,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            >
            <Text style={{color: '#000000', fontSize: SIZES.mediumf,}}>11. form ທ້າຍສຸດ</Text>
        </TouchableOpacity>
      </ScrollView>
      <BackInHomeComponent navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({})