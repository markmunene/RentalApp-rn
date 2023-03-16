import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
import Dropdown from './Dropdown';
import DatePicker from 'react-native-modern-datepicker';
import SpinnerModal from './SpinnerModal'
import firestore from '@react-native-firebase/firestore'
import { useToast } from 'react-native-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { Add_New_Tenant_Action,Update_Tenant_By_Name_Action } from './redux/TenanantsReducer';
import { Filter_SingleProperty_By_Id_Action
  
 } from './redux/PropertyReducer';

import Header from './Header';

const AddTenant = ({ navigation, route }) => {
  const NavData = route.params;
  const toast = useToast();
  const dispatch = useDispatch();
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
  let DropdownProperties = useSelector(state => state.Propertys.DropdownProperties);
  let SingleProperty = useSelector(state => state.Propertys.SingleProperty);

    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
  const [Tenant, setTenant] = useState("");
    const [Month, setMonth] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [paymentDue, setpaymentDue] = useState("");
  const [deposit, setdeposit] = useState("");
  const [BalanceState, setBalanceState] = useState("");
  
  const [leaseStarts, setleaseStarts] = useState("");
  const [occupants, setoccupants] = useState("");
  const [RentalFees, setRentalFees] = useState("");
  const [RoomNumber, setRoomNumber] = useState("");
  const [PropertyName, setPropertyName] = useState(undefined);
  const [Email, setEmail] = useState("");
  const [RoomsArray, setRoomsArray] = useState("");
  
  const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
  
    const showPicker = useCallback((value) => setShow(value), []);
  
    const handleMONTH =( newDate) => {
        const selectedDate = newDate;
        // setShowspinner(true)
        showPicker(false);
        setDate(selectedDate);
      setleaseStarts(selectedDate);  
  }
  useEffect(() => {
    let item = NavData?.item;
   
    if ( item != undefined) {

      console.log( item.Balance);
      setEmail(item.Email);
      setTenant(item.Tenant);
      setPhoneNumber(item.PhoneNumber);
      setpaymentDue(item.paymentDue);
      setdeposit(item.deposit);
      setleaseStarts(item.leaseStarts);
      setoccupants(item.occupants);
      setRentalFees(item.RentalFees);
      setBalanceState(item.Balance==0 ? "00":item.Balance.toString() )
      setRoomNumber(item.RoomNumber);
      setPropertyName(item.PropertyName);
      
    }
    
  },[])

  useEffect(
    () => {
     
      if (PropertyName !== undefined) {
       
        let Rooms1 = SingleProperty[0]?.Rooms;
        let tempRooms = Rooms1.map(item => {
          return {
            label: item.RoomNumber,
            value:item.RoomNumber,
          }
        })
        setRoomsArray(tempRooms)
        
      }
      
    },[PropertyName, SingleProperty]
  );
  const HandleSaveTenant = async () => {
    
    if (Tenant !== "" && PhoneNumber !== "" && paymentDue !== "" && deposit !== "" && leaseStarts !== "" && occupants !== "" && RentalFees !== "" && RoomNumber
      !== "" && PropertyName !== "" && Email !== "") {
      let data ={
        PropertyName:PropertyName.label,
        Tenant,
        PhoneNumber,
        paymentDue,
        deposit,
        leaseStarts,
        occupants,
        RentalFees,
        Email,
        Balance: Number(RentalFees) + Number(deposit),
        ActualBalance: Number(RentalFees) + Number(deposit),
        OverDraft:0,
        RoomNumber: RoomNumber.value,
        createdAt: Date.now(),
       
      }
      setShowModal(true)
      await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").add({
        ...data,
        
      }).then(res => {
        dispatch(Add_New_Tenant_Action({
          ...data,
          id: res.id
        }));
        setShowModal(false);
        setEmail("");
        setTenant("");
        setPhoneNumber("");
        setpaymentDue("");
        setdeposit("");
        setleaseStarts("");
        setoccupants("");
        setRentalFees("");
        setRoomNumber("");
        setPropertyName("");
        toast.show("Tenant Created Successfully", {
          type: "success",
          placement: "bottom",
          duration: 2400,
          offset: 30,
          animationType: "zoom-in",
        });
        navigation.goBack();
       }).catch(err => {
        console.log("error", err);
      });
  
} else {
  toast.show("All fields must be Filled", {
    
      type: "danger",
      placement: "bottom",
      duration: 2900,
      offset: 30,
      animationType: "zoom-in",
  
  })
  
}
    
  }

  const HandleUpdateTenant = async () => {
    if (Tenant !== "" && PhoneNumber !== "" && paymentDue !== "" && deposit !== "" && leaseStarts !== "" && occupants !== "" && RentalFees !== "" && RoomNumber
      !== "" && PropertyName !== "" && Email !== "") {
      let newRentalFees = Number(RentalFees) - Number(NavData?.item.RentalFees);
      let newDeposit = Number(deposit) - Number(NavData?.item.deposit);

      let data = {
        PropertyName: PropertyName?.label ? PropertyName.label: PropertyName,
        Tenant,
        PhoneNumber,
        paymentDue,
        deposit,
        leaseStarts,
        occupants,
        RentalFees,
        Email,
        Balance: newDeposit + newRentalFees + Number(NavData?.item.Balance),
        ActualBalance: Number(RentalFees) + Number(deposit),
        OverDraft: 0,
        RoomNumber: RoomNumber.value ? RoomNumber.value : RoomNumber,
        createdAt: Date.now(),
      }
    
      setShowModal(true)
      await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").doc(NavData?.item.id).update({
        ...data,
      
      }).then(res => {
        
        dispatch(Update_Tenant_By_Name_Action({
          ...data,
          id: NavData?.item.id
        }));
        setShowModal(false);
        setEmail("");
        setTenant("");
        setPhoneNumber("");
        setpaymentDue("");
        setdeposit("");
        setleaseStarts("");
        setoccupants("");
        setRentalFees("");
        setRoomNumber("");
        setPropertyName("");
        toast.show("Tenant updated Successfully", {
          type: "success",
          placement: "bottom",
          duration: 2400,
          offset: 30,
          animationType: "zoom-in",
        });
        navigation.goBack();

      }).catch(err => {
        console.log("error", err);
      });

    } else {
      toast.show("All fields must be Filled", {
  
        type: "danger",
        placement: "bottom",
        duration: 2900,
        offset: 30,
        animationType: "zoom-in",

      })
    }
  }

  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
        height: 60
        
      }}>
        <Header Title={NavData?.item == undefined ? "Add Tenant": "Update Tenant"} toHome="home" iconName="arrow-left-bold" showIcons="No" navigation={navigation}  />

      </View>
      <SpinnerModal showModal={showModal} title="please wait ..." />
           
      <View style={{
        width: '100%', 
        height: '80%', 
        marginTop: 10,
        
        
      }}>

      <ScrollView keyboardShouldPersistTaps={'handled'} >
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
           
            onChangeText={text => {
              if (text.toString().substr(0, 4) === '+254') {
                setPhoneNumber(text.toString().substr(4));
              }
              else if (text.toString().substr(0, 3) === '254') {
                setPhoneNumber(text.toString().substr(3));
              }
              else if (text.toString().substr(0, 1) === '0') {
                setPhoneNumber(text.toString().substr(1));
              }
          
              else {
                setPhoneNumber(text); 
              }
            }}
            label="PhoneNumber"
            keyboardType='numeric'
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
            keyboardType='numeric'
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
            keyboardType='numeric'
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
            keyboardType='numeric'
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
            keyboardType='numeric'
              value={deposit}
              mode="outlined"
          />
          {NavData?.item !== undefined &&
             <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setBalanceState(text)}
            label="Current Balance"
          
              value={BalanceState}
            mode="outlined"
          
          />
          
          }
          {/* property name */}
          <View style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: "center",
            marginVertical:10
          }}>
            <Dropdown  label={NavData?.item ==undefined? "Select property" : "Property:: "+ NavData?.item.PropertyName} FilterProperty="Filter" data={DropdownProperties}  onSelect={setPropertyName} />
            </View>
                {/* <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setPropertyName(text)}
              label="PropertyName"
              value={PropertyName}
              mode="outlined"
          /> */}

          {/* room number dropdown */}

          <View style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: "center",
            marginVertical:10
          }}>
          <Dropdown data={RoomsArray}   label={NavData?.item ==undefined? "select Room" : "Room:: "+NavData?.item.RoomNumber} onSelect={setRoomNumber} />
         </View>

            {/* <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setRoomNumber(text)}
              label="RoomNumber"
              value={RoomNumber}
              mode="outlined"
          /> */}
        
       
      <Button icon="plus" mode='contained' style={{
        width: '50%',
        marginTop: 20, 
            backgroundColor: 'grey',
           alignSelf:'center'
        
          }}
            onPress={()=> NavData?.item ==undefined ? HandleSaveTenant(): HandleUpdateTenant()}
          >
            {NavData?.item == undefined ?  "Save": "Update"}
       
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