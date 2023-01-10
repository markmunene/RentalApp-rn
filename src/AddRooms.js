import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Header from './Header';

const AddRooms = ({navigation}) => {
    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    const [RoomNumber, setRoomNumber] = useState("");

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
           <DropDown
              label={"Property"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={Tenant}
              setValue={setTenant}
              list={colorList}
            />
    
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
     
          <Button icon="music" mode='contained'
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