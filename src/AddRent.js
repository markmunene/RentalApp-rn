import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import DatePicker from 'react-native-modern-datepicker';


const AddRent = ({navigation}) => {
    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
  const [Tenant, setTenant] = useState("");
  const [Month, setMonth] = useState("");
  
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const handleMONTH =( newDate) => {
      const selectedDate = newDate;
      // setShowspinner(true)
      showPicker(false);
      setDate(selectedDate);
      setMonth(selectedDate)
   
    }
 
  
  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
        height: 60
        
      }}>
        <Header Title="Add Rent" iconName="arrow-left-bold" navigation={navigation}  />

      </View>
     
           {/* <DropDown
              label={"Gender"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={Tenant}
              setValue={setTenant}
              list={colorList}
            /> */}
        <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
        disabled={true}
              onChangeText={text => setTenant(text)}
              label="Tenant"
              value={Tenant}
              mode="outlined"
      />
      <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setRentAmount(text)}
              label="Amount Paid"
              value={RentAmount}
              mode="outlined"
      />
       <View style={{ width: '50%', alignSelf: 'center',  justifyContent:'center', alignItems:'center', elevation:200, zIndex:900}}>
        {show && (
        <DatePicker
                mode="monthYear"
                selectorStartingYear={2022}
                onMonthYearChange={selectedDate => handleMONTH(selectedDate)}
                style={{
                  width: 300, height: 200,
                  justifySelf: 'center',
                  alignSelf: 'center',
                  zIndex: 400,

                }}
                options={{
                  backgroundColor: '#fff',
                  zIndex: 400,
                  elevation: 400,
                }}

      />
            )}
            </View>
       <TouchableOpacity
        style={{
          width: '90%',
          height:40,
          alignSelf: 'center',
          marginTop: 20,
          borderColor: 'black'
          , borderRadius: 3,
          borderWidth: 1,
          justifyContent: 'center',
          paddingHorizontal:20
          
          
        }}
        onPress={()=>setShow(!show)}
              
      >
        <Text style={{
          fontSize:18
        }}>
          Month {Month}
        </Text>
        </TouchableOpacity>

      <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setRentAmount(text)}
              label="Date recieved"
              value={RentAmount}
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

export default AddRent

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
    
  alignItems:'center'
  }
  
})