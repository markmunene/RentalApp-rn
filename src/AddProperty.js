import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import firestore from '@react-native-firebase/firestore'

const AddProperty = ({navigation}) => {
    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    const [PropertyName, setPropertyName] = useState("");
  const [Location, setLocation] = useState("");
  
  const HandleAddingProperty = () => {
    
    
  }


    
  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
        height: 60
        
      }}>
        <Header Title="Add Property" iconName="arrow-left-bold" navigation={navigation}  />
      </View>
        
      <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20 
        }}
              onChangeText={text => setPropertyName(text)}
              label="Tenant"
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
    
      <Button icon="plus" mode='contained' style={{
        width: '50%',
        marginTop: 20, 
        backgroundColor:'grey'
      }}>
        Save
      </Button>
      
    </View>
  )
}

export default AddProperty

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
    
  alignItems:'center'
  }
  
})