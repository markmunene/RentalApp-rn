import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Header from './Header';

import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'

import { Add_New_Property_Action, Delete_Property_Action, Update_Property_Action } from './redux/PropertyReducer';
import firestore from '@react-native-firebase/firestore'
import { useToast } from 'react-native-toast-notifications';
import SpinnerModal from './SpinnerModal';

const AddProperty = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const toast = useToast();
  const [RentAmount, setRentAmount] = useState();
  const [UpdateItem, setUpdateItem] = useState(false);
  const [PropertyName, setPropertyName] = useState("");
  const [UpdateItems, setUpdateItems] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const [Location, setLocation] = useState("");
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
  let properties = useSelector(state => state.Propertys.AllProperties);

  
  const HandleAddingProperty = async () => {
    if (PropertyName !== "" && Location !== "") {
      setShowModal(true)
      await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").add({
        PropertyName,
        Location, 
        Rooms:[]
      }).then(res => {
setShowModal(false)
        dispatch(Add_New_Property_Action({
          Location, 
          PropertyName, 
          id: res.id, 
          Rooms:[]
        }));
        toast.show("Property Created Successfully", {
          type: "success",
          placement: "bottom",
          duration: 2400,
          offset: 30,
          animationType: "zoom-in",
        });
        setLocation("");
        setPropertyName("");
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
    
  }
  const HandleEditData = (item) => {
    setPropertyName(item.PropertyName);
    setLocation(item.Location);
    setUpdateItem(true);

    setUpdateItems(item)
  } 


  const HandlePropertyUpdate = async () => {
    if (PropertyName !== "" && Location !== "") {
      setShowModal(true)
      await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").doc(UpdateItems.id).update({
        PropertyName,
        Location, 
        Rooms:UpdateItems.Rooms
      }).then(res => {
        setShowModal(false)
        dispatch(Update_Property_Action({
          Location, 
          PropertyName, 
          id: UpdateItems.id, 
          Rooms:UpdateItems.Rooms
        }));
        toast.show("Property Updated Successfully", {
          type: "success",
          placement: "bottom",
          duration: 2400,
          offset: 30,
          animationType: "zoom-in",
        });
        setLocation("");
        setPropertyName("");
        setUpdateItem(false);
        setUpdateItems([])
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
  }
  const HandleDeleteProperty =  async (item) => {
    
    Alert.alert(
      'Delete action confirmation',
      'Are  u sure you want to delete this property',
      [
        {
          text: 'Cancel',
          onPress: () => console.log("nah"),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
setShowModal(true)

              await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").doc(item.id)
                .delete().then(res => {

setShowModal(false)
                  
                  dispatch(Delete_Property_Action(item))
                  toast.show("Property Deleted Successfully", {
                    type: "danger",
                    placement: "bottom",
                    duration: 2400,
                    offset: 30,
                    animationType: "zoom-in",
                  });
                  
              })
           
            } catch (error) {
              console.log('fire ', error);
            }
          },
        },
      ],
    );
  
  }

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
          onPress={()=> HandleDeleteProperty(item)}
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
          onPress={()=> HandleEditData(item)}
        >
          <Icon2 name="edit" size={30} color="green" style={{
            alignSelf:'flex-start'
          }} />
          </TouchableOpacity>
          

        </View>
        <View style={{
         width:'35%'
        }}>
          <Text style={{
              color: 'grey',
            fontSize: 18,
            fontWeight: '900',
            alignSelf:'flex-end'
          }}>
              {item.Location}
          </Text>
          <Text style={{
              color: 'black',
            fontSize: 12,
            alignSelf:'flex-end'
              
          }}>
              location
                </Text>

        </View>
      </View>
    )
}   
  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
        height: 60
        
      }}>
        <Header Title="Add Property" toHome="home" iconName="arrow-left-bold" navigation={navigation}  />
      </View>
      <SpinnerModal showModal={showModal} title="please wait ..." />

      <View style={{
        width:'100%'
      }}>
        
      
      <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20 
        }}
              onChangeText={text => setPropertyName(text)}
              label="Property Name"
              value={PropertyName}
              mode="outlined"
      />
       <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
        }}
              onChangeText={text => setLocation(text)}
              label="Location"
              value={Location}
              mode="outlined"
      />
    
        <View style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          width:'90%'
        }}>
          
        <Button icon="plus" mode='contained' onPress={HandleAddingProperty} style={{
        width: '50%' ,
        marginTop: 20, 
          backgroundColor: 'grey',
        alignSelf:'center'
      }}>
        Save
          </Button>
   
          
          <Button icon="plus" mode='contained' onPress={HandlePropertyUpdate} style={{
        width: '50%',
            marginTop: 20, 
        marginLeft:10,
          backgroundColor: 'green',
        alignSelf:'center'
      }}>
        Update
        </Button>
          
  </View>
        </View>
      <View style={{marginTop:20, width:'100%', height:'55%'}}>
        <FlatList data={properties} renderItem={RenderItem}
          keyboardShouldPersistTaps={'handled'}
          
          keyExtractor={(item) => item?.id + item?.PropertyName} />
      </View>
      
    </View>
  )
}

export default AddProperty

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