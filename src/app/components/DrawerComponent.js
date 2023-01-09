import { View,StyleSheet } from 'react-native'
import React, { useState,useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../help/AuthContext'
import { Avatar,Title,Caption,Text,Drawer } from 'react-native-paper'
import Spinner from 'react-native-loading-spinner-overlay'

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const DrawerComponent = (props) => {
    const { userInfo, menu,Logout, isLoading } = useContext(AuthContext);
    const [menus,setMenus] = useState([])
    const [sub,setSub] = useState(Array(menus.length).fill(false));

    useEffect(()=>{
        generateMenu();
        setMenus(new_menu)
    },[])

    let new_menu = []
    const generateMenu = ()=>{
        if( menu.includes("BANK_SUPERVISION") ){
            new_menu.push(
                {menu_id:0,menu_name:'ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ',submenu:[
                    {sub_id:1,sub_name:'ລາຍງານຖານະການເງິນຂອງ ທທກ',screen:'BSD'},
                ]},
            )
        }
        if( menu.includes("MONETARY_POLICY") ){
            new_menu.push(
                {menu_id:1,menu_name:'ກົມນະໂຍບາຍເງິນຕາ',submenu:[
                    {sub_id:1,sub_name:'ຂໍ້ມູນສະຖິຕິດ້ານເງິນຕາ',screen:'MPD',show:1},
                    {sub_id:1,sub_name:'ຂໍ້ມູນດ້ານສະຖິຕິດຸນການຊໍາລະ',screen:'MPD',show:2},
                    {sub_id:1,sub_name:'ອັດຕາດອກເບ້ຍສະເລ່ຍຂອງ ທທກ',screen:'MPD',show:3},
                ]},
            )
        }
        if( menu.includes("BANKING_OPERATIONS") ){
            new_menu.push(
                {menu_id:2,menu_name:'ກົມບໍລິການທະນາຄານ',submenu:[
                    {sub_id:1,sub_name:'ການບໍລິຫານຄັງສຳຮອງເງິນຕາຕ່າງປະເທດ',screen:'BOD',show:1},
                    {sub_id:1,sub_name:'ວຽກງານສິນເຊື່ອ',screen:'BOD',show:2},
                    {sub_id:1,sub_name:'ວຽກງານຕະຫຼາດເງິນພາຍໃນ',screen:'BOD',show:3},
                    {sub_id:1,sub_name:'ວຽກງານບັນຊີ-ບໍລິການ',screen:'BOD',show:4},
                    {sub_id:1,sub_name:'ຍອດເງິນຝາກຂອງແຕ່ລະພາກສວ່ນ',screen:'BOD',show:5},
                    {sub_id:1,sub_name:'ອັດຕາແລກປ່ຽນສະເລ່ຍຂອງການຊື້-ຂາຍເງິນຕາຕ່າງປະເທດ',screen:'BOD',show:6},
        
                ]},
            )
        }
    }

  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView>
            <Spinner visible={isLoading} cancelable={true}/>
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
                            <Title style={styles.title}>{userInfo.fullname}</Title>
                            <Caption style={styles.caption}>@ວິຊາການ</Caption>
                        </View>
                    </View>
                </View>
            </View>

            <Drawer.Section>
                <DrawerItem
                    pressColor="#daf0f7"
                    label={() => <Text style={{color: '#000'}}>ໜ້າຫຼັກ</Text>} 
                    onPress={()=>{props.navigation.navigate('InHomePageScreen')}}

                />
            </Drawer.Section>
            {
                    menus.length > 0 ?
                    menus.map((item,idex)=>{

                            return  <Drawer.Section key={"drawer"+item.menu_id}>
                                        <DrawerItem pressColor='#fff'
                                            label={ () => ( <Text style={{color: '#000'}}>{item.menu_name}</Text>) }
                                            onPress={()=>{
                                                let new_sub = Array(menus.length).fill(false);
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
                                                        return <DrawerItem key={Math.random()+item.menu_id+"_sub_"+subItem.sub_id}
                                                                    pressColor="#daf0f7"
                                                                    label={ () => ( <View style={{flexDirection:'row',alignItems:'center'}}>
                                                                                        <Ionicons name='chevron-forward' />
                                                                                        <Text style={{color: '#666',fontSize:13,paddingLeft:10}}>{subItem.sub_name}</Text>
                                                                                    </View> ) }
                                                                    onPress={()=>{props.navigation.navigate(subItem.screen,{show:subItem.show})}}
                
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
                    onPress={()=>{Logout()}}
                />
        </Drawer.Section>
    </View>
  )
}

export default DrawerComponent

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