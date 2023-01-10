import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import DatePicker from 'react-native-modern-datepicker';

import Header from './Header';

const AddTenant = ({navigation}) => {
    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
  const [Tenant, setTenant] = useState("");
    const [Month, setMonth] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [paymentDue, setpaymentDue] = useState("");
    const [deposit, setdeposit] = useState("");
  const [leaseStarts, setleaseStarts] = useState("");
  const [occupants, setoccupants] = useState("");
  const [RentalFees, setRentalFees] = useState("");
  const [RoomNumber, setRoomNumber] = useState("");
  const [PropertyName, setPropertyName] = useState("");
    const [Email, setEmail] = useState("");
    
    
    
  

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
  
    const showPicker = useCallback((value) => setShow(value), []);
  
    const handleMONTH =( newDate) => {
        const selectedDate = newDate;
        // setShowspinner(true)
        showPicker(false);
        setDate(selectedDate);
        setleaseStarts(selectedDate)
     
      }
  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
        height: 60
        
      }}>
        <Header Title="Add Tenant" iconName="arrow-left-bold" navigation={navigation}  />

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
              contentContainerStyle={{ flex: 1 }} style={{ width: '100%', height: '100%' }}
            /> */}
      <View style={{
        width: '100%', 
        height: '80%', 
        marginTop: 10,
        
        
      }}>

      <ScrollView >
      <View style={{
          paddingHorizontal: 20,
          justifyContent: 'center',
          width: '100%', 
          backgroundColor: '#ffe6e6',
          height: 50, marginVertical: 10,
          marginTop:20
        }}>
          <Text style={{
            fontWeight: '900',
            fontSize:18
          }}>
            Personal Information
          </Text>
        </View>
          <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
       
              onChangeText={text => setTenant(text)}
              label="Name"
              value={Tenant}
              mode="outlined"
      />
      <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setEmail(text)}
              label="Email"
              value={Email}
              mode="outlined"
          />
           <View style={{ width: '50%', alignSelf: 'center',  justifyContent:'center', alignItems:'center', elevation:200, zIndex:900}}>
        {show && (
        <DatePicker
                mode="monthYear"
                selectorStartingYear={2023}
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
          
          <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setPhoneNumber(text)}
              label="PhoneNumber"
              value={PhoneNumber}
              mode="outlined"
          />
       
        <View style={{
          paddingHorizontal: 20,
          justifyContent: 'center',
          width: '100%', 
          backgroundColor: '#ffe6e6',
          height:50,marginVertical:10
        }}>
          <Text style={{
            fontWeight: '900',
            fontSize:18
          }}>
            Lease Details
          </Text>
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
          leaseStarts {leaseStarts}
        </Text>
        </TouchableOpacity>
        

<TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setoccupants(text)}
              label="occupants"
              value={occupants}
              mode="outlined"
        />
         <View style={{
          paddingHorizontal: 20,
          justifyContent: 'center',
          width: '100%', 
          backgroundColor: '#ffe6e6',
          height:50,marginVertical:10
        }}>
          <Text style={{
            fontWeight: '900',
            fontSize:18
          }}>
            Rental Details
          </Text>
        </View>
            <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:10
          
        }}
              onChangeText={text => setRentalFees(text)}
              label="RentalFees"
              value={RentalFees}
              mode="outlined"
        />
            <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setpaymentDue(text)}
              label="paymentDue"
              value={paymentDue}
              mode="outlined"
          />
            <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setdeposit(text)}
              label="deposit"
              value={deposit}
              mode="outlined"
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
        
       
      <Button icon="plus" mode='contained' style={{
        width: '50%',
        marginTop: 20, 
            backgroundColor: 'grey',
           alignSelf:'center'
        
      }}>
        Save
      </Button>
        </ScrollView>
      </View>
      
    </View>
  )
}

export default AddTenant

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
    
  alignItems:'center'
  }
  
})