import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
// import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import Dropdown from './Dropdown';

const AddRooms = ({navigation}) => {
    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
  const [RoomNumber, setRoomNumber] = useState("");
  const [Tenant, setTenant] = useState("");
  const [selected, setSelected] = useState(undefined);
  const data = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
      { label: 'Four', value: '4' },
      { label: 'Five', value: '5' },
  ];

    const colorList = [
        {
          label: "rungai",
          value: "rungai",
        },
        {
          label: "utawala",
          value: "utawala",
        },
        {
          label: "umoja",
          value: "umoja",
        },
        {
          label: "pipeline",
          value: "pipeline",
        },
        {
          label: "dandora",
          value: "dandora",
        }
      ];
  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
        height: 60
        
      }}>
        <Header Title="Add Rooms" iconName="arrow-left-bold" navigation={navigation}  />

      </View>
      <View style={{
        marginTop: 30, 
        width: '112%',
        justifyContent: 'center',
        alignItems:'center'
      }}>
        <Dropdown  label="Select Property" data={data} onSelect={setSelected} />
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
        backgroundColor:'grey'
      }}>
        Save
      </Button>
      
    </View>
  )
}

export default AddRooms

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
    alignItems:'center'
  }
  
})