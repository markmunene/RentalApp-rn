import { StyleSheet, Text, TouchableOpacity, View , FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
// import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import Dropdown from './Dropdown';

import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { Add_New_Room_Action,Add_Dropdown_Properties_Action , Filter_SingleProperty_By_Id_Action} from './redux/PropertyReducer';

const AddRooms = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
    const [PropertiesArray, setProperties] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
  const [RoomNumber, setRoomNumber] = useState("");
  const [Tenant, setTenant] = useState(undefined);
  const [PropertyName, setPropertyName] = useState(undefined);
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
  let DropdownProperties = useSelector(state => state.Propertys.DropdownProperties);
  let properties = useSelector(state => state.Propertys.AllProperties);
  let SingleProperty = useSelector(state => state.Propertys.SingleProperty);

// console.log(SingleProperty, "am called men");

  useEffect(() => {
   dispatch(Add_Dropdown_Properties_Action())
  },[])
  const RenderItem = ({ item }) => {
    return (
        <View style={styles.BioWrapper}>
        <View style={{ width: '40%' }}>
       
          <Text style={{
              color: 'black',
            fontSize: 18,
              fontWeight:'900'
          }}>
              {item.PropertyName}
                </Text>
               
                <Text style={{
              color: 'black',
            fontSize: 12,
              
          }}>
              property
                </Text>
        </View>
        <View style={{
         
        }}>
          <Text style={{
              color: 'grey',
            fontSize: 18,
            fontWeight: '900'
          }}>
              {item.RoomNumber}
          </Text>
          <Text style={{
              color: 'black',
            fontSize: 12,
            alignSelf:'flex-end'
              
          }}>
              room
                </Text>

        </View>
      </View>
    )
}

  const HandleAddNewRoom = async () => {
    // console.log(PropertyName);
 try {
  if (PropertyName !== undefined && RoomNumber !== "") {
      console.log(PropertyName);
    let Rooms1 =  SingleProperty[0].Rooms ;
    Rooms1.push({
      PropertyName: PropertyName.label,
      RoomNumber
    })
    // console.log(Rooms1);
    

    await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").doc(PropertyName.value).update({
      Rooms:Rooms1
    }).then(res => {
      
      // dispatch(Filter_SingleProperty_By_Id_Action(PropertyName.value))
      dispatch(Add_New_Room_Action({
        ...SingleProperty[0],
        Rooms:Rooms1

      }));
      // setPropertyName(undefined)
      setRoomNumber("");

      toast.show("Room Created Successfully", {
        type: "success",
        placement: "bottom",
        duration: 2400,
        offset: 30,
        animationType: "zoom-in",
      });
    }).catch(err => {
      console.log(err);
    })
    
  }
  else {
    toast.show("All fields must be filled!", {
      type: "danger",
      placement: "bottom",
      duration: 2900,
      offset: 30,
      animationType: "zoom-in",
  });
  }
 } catch (error) {
  console.log(error);
 }

    
  }

   
  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
        height: 60
        
      }}>
        <Header Title="Add Rooms" toHome="home" iconName="arrow-left-bold" navigation={navigation}  />

      </View>
      <View style={{width:'100%'}}>

      
      <View style={{
        marginTop: 30, 
        width: '100%',
        justifyContent: 'center',
        alignItems:'center'
      }}>
        <Dropdown  label="Select Property" data={DropdownProperties} onSelect={setPropertyName} FilterProperty="Filter" />
           </View>
    
       <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20   
        }}
              onChangeText={text => setRoomNumber(text)}
              label="RoomNumber"
              value={RoomNumber}
              mode="outlined"
      />
     
          <Button icon="plus" mode='contained'
        style={{
        width: '50%',
        marginTop: 20, 
          backgroundColor: 'grey',
        alignSelf:'center'
        }}
        onPress={() => {
          HandleAddNewRoom()
        }}
      >
        Save
        </Button>
        </View>
      <View style={{marginTop:20, width:'100%', height:'55%'}}>
        <FlatList data={SingleProperty[0]?.Rooms} renderItem={RenderItem} keyExtractor={(item)=> item?.RoomNumber + item?.PropertyName} />
      </View>
    </View>
  )
}

export default AddRooms

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
    alignItems:'center'
  },
  BioWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical:10
}
  
})