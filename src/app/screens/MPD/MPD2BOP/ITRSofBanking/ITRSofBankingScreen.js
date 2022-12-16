import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../constant';
import HeaderComponent from '../../../../components/HeaderComponent';
import { ScrollView } from 'react-native-gesture-handler';

const ITRSofBankingScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <HeaderComponent navigation={navigation} headerName="ສະຖິຕິກະແສເງິນໂອນລະຫວ່າງປະເທດ" bold={false} />
      <View style={{flex:1,justifyContent:'center'}}>
        <View>
          <ScrollView>
            <BigMenuComponent bigMenuName='ແຍກຕາມຈຸດປະສົງ' navigation={navigation} screenName='ITRSbyPurpose' />
            <BigMenuComponent bigMenuName='ແຍກຕາມທະນາຄານ' navigation={navigation} screenName='ITRSbyBank' />
            <BigMenuComponent bigMenuName='ແຍກຕາມສະກຸນເງິນ' navigation={navigation} screenName='ITRSbyCurrency' />
          </ScrollView>
        </View>
        
      </View>
    </View>
  )
}

export default ITRSofBankingScreen

const BigMenuComponent = ({bigMenuName,navigation,screenName}) => {
  return (
      <TouchableOpacity
          style={{
              backgroundColor: '#daf0f7',
              paddingHorizontal: 20,
              paddingVertical:20,
              margin: 10,
              borderColor: COLORS.primary,
              borderWidth:1,
              borderRadius:15,
              shadowOffset: {width: 1, height: 1},
              shadowColor: '#000',
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation:7
          }}

          onPress={()=>{
                navigation.navigate(screenName)
          }}
      >
          <Text style={{color: '#000', fontSize: SIZES.medium,textAlign:'center'}}>{bigMenuName}</Text>
      </TouchableOpacity>
  )
}