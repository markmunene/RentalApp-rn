import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Header from './Header';

import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import { Add_New_Property_Action, Delete_Property_Action } from './redux/PropertyReducer';
import firestore from '@react-native-firebase/firestore'
import { useToast } from 'react-native-toast-notifications';

const AddProperty = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    const [PropertyName, setPropertyName] = useState("");
  const [Location, setLocation] = useState("");
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
  let properties = useSelector(state => state.Propertys.AllProperties);

  
  const HandleAddingProperty = async () => {
    if (PropertyName !== "" && Location !== "") {
      await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").add({
        PropertyName,
        Location, 
        Rooms:[]
      }).then(res => {

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
              await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("property").doc(item.id)
                .delete().then(res => {
                  console.log(res);
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
        <TouchableOpacity
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',

            
          }}
          onPress={()=> HandleDeleteProperty(item)}
        >
          <Icon name="trash" size={25} color="red" style={{
            alignSelf:'flex-start'
          }} />
        </TouchableOpacity>
        <View style={{
         width:'40%'
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
    
      <Button icon="plus" mode='contained' onPress={HandleAddingProperty} style={{
        width: '50%',
        marginTop: 20, 
          backgroundColor: 'grey',
        alignSelf:'center'
      }}>
        Save
        </Button>
        </View>
      <View style={{marginTop:20, width:'100%', height:'55%'}}>
        <FlatList data={properties} renderItem={RenderItem} keyExtractor={(item)=> item?.id + item?.PropertyName} />
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