import {StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
// import Icon from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Get_All_Properties_Action, } from './redux/PropertyReducer';
import { Get_All_tenants_Action} from './redux/TenanantsReducer';
import Auth from '@react-native-firebase/auth'
import { Add_Auth_Landord_action } from './redux/OwnersReducer';
// import {useDrawerStatus} from '@react-navigation/drawer';

// import { ChangeSalesSecret } from '../Reducers/SalesReducer';

import { useDispatch , useSelector} from 'react-redux';

 

const Header = ({ navigation, Title, where, iconName, showIcons, toHome }) => {
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);

 const [count, setcount] = useState(0)
  
  const dispatch = useDispatch();
  const HandleSaleSecret = () => {

    setcount(count + 1)
    if (count >= 3) {
    //   console.log(count);
    //   dispatch(ChangeSalesSecret({saleType : "Cash"}))
      
    }
  }
  const HandleSignOut = () => {
    Auth().signOut().then(res => {
      dispatch(Add_Auth_Landord_action([]));
    })
  }
  const HandleSyncData = () => {
    dispatch(Get_All_Properties_Action({ OwnerId: Landlord[0].OwnerId }))
    dispatch(Get_All_tenants_Action({ OwnerId: Landlord[0].OwnerId }));

    
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <TouchableOpacity onPress={() => {
          if (toHome == "home") {
            console.log("datatttttttttttttttt");
            return   navigation.navigate("Hom") 
          } else {
            console.log("noniiiiiiiiieuuuuuuuuuuuuuu");
            return  navigation.goBack()
          }
        }} style={{width: '20%'}}>
          <Icon name={iconName} size={25} color="white" fontWeight="600"  />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            height: 80,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        
          }}>
          <TouchableWithoutFeedback style={{
            width: showIcons == "Yes" ? '50%' : '100%',
            backgroundColor:'red'
          }} onPress ={()=>HandleSaleSecret()}>
            <Text style={{
             fontWeight: '800',
             width: showIcons == "Yes" ? '50%' : '100%',
              textAlign: 'center', fontSize: 18,
              color:'white'

            }}>{Title}</Text>

          </TouchableWithoutFeedback>
          {showIcons == "Yes" ?
            <View style={{
              flexDirection: "row", justifyContent: 'space-between',
              width: showIcons == "Yes" ? '50%' : '10%',
               
            }}>
          <TouchableOpacity onPress={()=> HandleSyncData()} style={{width: '40%'}}>
            <Icon name="sync" size={25} color="green" fontWeight="600" />
            <Text style={{color:"green", fontWeight:'600'}}>Sync</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=> HandleSignOut()} style={{width: '40%'}}>
            <Icon name="logout" size={25} color="red" fontWeight="600" />
            <Text style={{color:"red", fontWeight:'600'}}>logout</Text>
          </TouchableOpacity>

            </View>
            : <View style={{width:'5%'}}></View>
          
          }
         
        </View>
      </View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    width: '100%',
    height: 80,
    alignItems: 'center',
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: 'black',
    padding: 10,
  },
});
