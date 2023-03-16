import { StyleSheet, Text, TouchableOpacity, View , FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
// import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import Dropdown from './Dropdown';

import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'

import { useToast } from 'react-native-toast-notifications';
import { Add_New_Room_Action,Add_Dropdown_Properties_Action , Filter_SingleProperty_By_Id_Action} from './redux/PropertyReducer';

const AddRooms = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
    const [PropertiesArray, setProperties] = useState([]);
  const [UpdateRoomstate, setUpdateRoomstate] = useState(false);
  const [RoomToUpdate, setRoomToUpdate] = useState('');
  
  const [RoomNumber, setRoomNumber] = useState("");
  const [Tenant, setTenant] = useState(undefined);
  const [PropertyName, setPropertyName] = useState(undefined);
  const [propertyId, setpropertyId] = useState("");

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
        <View style={{ width: '35%' }}>
       
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
          flexDirection: 'row',
          width:'30%'
        }}>
        <TouchableOpacity
          style={{
          
            justifyContent: 'center',
            alignItems: 'center',

            
          }}
          onPress={()=> HandleDeleteRooms(item)}
        >
          <Icon name="trash" size={25} color="red" style={{
            alignSelf:'flex-start'
          }} />
          </TouchableOpacity>
          <TouchableOpacity
          style={{
          
            justifyContent: 'center',
              alignItems: 'center',
            marginLeft:20  
          }}
          onPress={()=> HandleFillRoomsInput(item)}
        >
          <Icon2 name="edit" size={30} color="green" style={{
            alignSelf:'flex-start'
          }} />
          </TouchableOpacity>
          

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
  const HandleDeleteRooms = async (Room) => {
    try {
  
        
         
        let Rooms1 = SingleProperty[0].Rooms.filter(item => item.RoomNumber != Room.RoomNumber);

        let propertyId = properties.filter(item => {
          if (item.PropertyName === Room.PropertyName) {
            return item.id
          }
        })
        
        await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").doc(propertyId[0].id).update({
          Rooms:Rooms1
        }).then(res => {
          
          // dispatch(Filter_SingleProperty_By_Id_Action(PropertyName.value))
          dispatch(Add_New_Room_Action({
            ...SingleProperty[0],
            Rooms:Rooms1
    
          }));
          // setPropertyName(undefined)
          setRoomNumber("");
    
          toast.show("Room Deleted Successfully", {
            type: "success",
            placement: "bottom",
            duration: 2400,
            offset: 30,
            animationType: "zoom-in",
          });
        }).catch(err => {
          console.log(err);
        })
        
      
     
     } catch (error) {
      console.log(error);
     }
  }
  const HandleUpdateRooms = async () => {
    try {
      if ( RoomNumber !== "") {
         
        let Rooms1 = SingleProperty[0].Rooms.filter(item => item.RoomNumber != RoomToUpdate.RoomNumber);
        Rooms1.push({
          PropertyName: RoomToUpdate.PropertyName ,
          RoomNumber
        })
        let propertyId = properties.filter(item => {
          if (item.PropertyName === RoomToUpdate.PropertyName) {
            return item.id
          }
        })
       
        await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").doc(propertyId[0].id).update({
          Rooms:Rooms1
        }).then(res => {
          
          dispatch(Add_New_Room_Action({
            ...SingleProperty[0],
            Rooms:Rooms1
    
          }));
          // setPropertyName(undefined)
          setRoomNumber("");
          setRoomToUpdate("");
          setUpdateRoomstate(false);
    
          toast.show("Room Deleted Successfully", {
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

  const HandleFillRoomsInput = async (room) => {
    setUpdateRoomstate(true);
    setRoomToUpdate(room);
    setRoomNumber(room.RoomNumber)
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
        <Dropdown   label={RoomToUpdate =="" ? "Select property" : "Property:: "+ RoomToUpdate.PropertyName} data={DropdownProperties} onSelect={setPropertyName} FilterProperty="Filter" />
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
        <View style={{
          flexDirection: 'row',
          alignSelf:'center'
        }}>
          {
            !UpdateRoomstate ?
           
              <Button icon="plus" mode='contained'
                style={{
                  width: UpdateRoomstate ? '100%' : '50%',
                  marginTop: 20,
                  backgroundColor: 'grey',
                  alignSelf: 'center'
                }}
                onPress={() => {
                  HandleAddNewRoom()
                }}
              >
                Save
              </Button>
              :
              <Button icon="plus" mode='contained'
                style={{
                  width:  UpdateRoomstate ? '50%' : '100%',
                  marginTop: 20,
                  backgroundColor: 'green',
                  alignSelf: 'center'
                }}
                onPress={() => {
                  HandleUpdateRooms()
                }}
              >
                Update
              </Button>
      }
          
     </View>
        </View>
      <View style={{marginTop:20, width:'100%', height:'55%'}}>
        <FlatList
          data={SingleProperty[0]?.Rooms}
          renderItem={RenderItem}
          keyExtractor={(item) => item?.RoomNumber + item?.PropertyName}
          keyboardShouldPersistTaps={'handled'}
        />
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