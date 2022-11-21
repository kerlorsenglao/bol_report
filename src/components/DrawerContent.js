import { View,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
    Avatar,
    Title,
    Caption,
    Text,
    Drawer
} from 'react-native-paper'

import {
    DrawerContentScrollView,
    DrawerItem,
  } from '@react-navigation/drawer';


const DrawerContent = (props) => {

    const menu = [
        {menu_id:0,menu_name:'ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ',submenu:[
            {sub_id:1,sub_name:'ລາຍງານ',screen:'BSDReport1'},
        ]},
        {menu_id:1,menu_name:'ກົມນະໂຍບາຍເງິນຕາ',submenu:[
            {sub_id:1,sub_name:'test2.1',screen:'Menu1'},
            {sub_id:2,sub_name:'test2.2',screen:'Menu2'},
        ]},
    ];

    const [sub,setSub] = useState(Array(menu.length).fill(false))

  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView>
            <View style={styles.drawerContent}>
                <View style={[styles.userInfoSection]}>
                    {/* picture and Name */}
                    <View style={{flexDirection:'row',marginTop:15,alignItems:'center'}}>
                        <Avatar.Image
                            source={{
                                uri:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                            }}
                            size={50}
                        />
                        <View style={{flexDirection:'column',marginLeft:15,marginBottom:10}}>
                            <Title style={styles.title}>ດາວສະຫວ່າງ ເດດພົມມະເທດ</Title>
                            <Caption style={styles.caption}>@ວິຊາການ</Caption>
                        </View>
                    </View>
                </View>
            </View>

            <Drawer.Section>
                <DrawerItem
                    pressColor="#daf0f7"
                    label={() => <Text style={{color: '#000'}}>ໜ້າຫຼັກ</Text>} 
                    onPress={()=>{props.navigation.navigate('HomePage')}}

                />
            </Drawer.Section>

            {
                    menu.length > 0 ?
                    menu.map((item,idex)=>{

                            return  <Drawer.Section key={item.menu_id}>
                                        <DrawerItem pressColor='#fff'
                                            label={ () => ( <Text style={{color: '#000'}}>{item.menu_name}</Text>) }
                                            onPress={()=>{
                                                let new_sub = Array(menu.length).fill(false);
                                                new_sub[item.menu_id] = !sub[item.menu_id]
                                                setSub(new_sub)
                                                
                                            }}
                                        />
                                        {
                                            sub[item.menu_id] ? 
                                            <View>
                                                {
                                                    item.submenu.length > 0 ?
                                                    item.submenu.map((subItem)=>{
                                                        return <DrawerItem key={item.menu_id+"_sub_"+subItem.sub_id}
                                                                    pressColor="#daf0f7"
                                                                    label={ () => ( <View style={{flexDirection:'row',alignItems:'center'}}>
                                                                                        <Ionicons name='chevron-forward' />
                                                                                        <Text style={{color: '#aaa',fontSize:13,paddingLeft:10}}>{subItem.sub_name}</Text>
                                                                                    </View> ) }
                                                                    onPress={()=>{props.navigation.navigate(subItem.screen)}}
                
                                                                />
                                                    })
                                                    :
                                                    null
                                                }
                                            </View>
                                            :
                                            null
                                        }
                                    </Drawer.Section>

                    })
                    :
                    null
            }

      </DrawerContentScrollView>

        {/* log out */}
        <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    pressColor="#daf0f7"
                    icon={({color,size})=>(
                        <Ionicons name='power-outline' size={size} color="#000" />
                    )}
                    label={() => <Text style={{color: '#000'}}>ອອກຈາກລະບົບ</Text>}
                    onPress={()=>{}}
                />
        </Drawer.Section>
    </View>
  )
}

export default DrawerContent


const styles = StyleSheet.create({
    drawerContent:{
        flex:1,
    },
    userInfoSection:{
        paddingLeft:15,
        borderColor:"#fff",
        borderBottomColor: "#f4f4f4",
        borderWidth:1,
    },
    title:{
        fontSize:14,
        // marginTop:3,
        // fontWeight:'bold',
    },
    caption:{
        fontSize:12,
        lineHeight:14,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        
    },
    section:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15
    },
    paragraph:{
        fontWeight:'bold',
        marginRight:3,
    },
    drawerSection:{
        marginTop:15
    },

    bottomDrawerSection:{
        marginTop:15,
        borderTopColor: '#f4f4f4',
        borderTopWidth:1
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal:16
    }
})