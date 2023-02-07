import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import DatePicker from 'react-native-modern-datepicker';
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux';
import SpinnerModal from './SpinnerModal';
import { useToast } from 'react-native-toast-notifications';
import { Add_New_Transaction_Action , Update_Tenant_By_Name_Action} from './redux/TenanantsReducer';



const AddRent = ({ navigation }) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const SingleTenant = useSelector(state => state.Tenants.SingleTeanants);
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);

  useEffect(() => {
    setTenant(SingleTenant[0].Tenant);
  
    return () => {
      
    }
  }, []);

    const [RentAmount, setRentAmount] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
  const [Tenant, setTenant] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");

  const [Month, setMonth] = useState("");
  
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const showPicker = useCallback((value) => setShow(value), []);

  const handleMONTH =( newDate) => {
      const selectedDate = newDate;
      // setShowspinner(true)
      showPicker(false);
      setDate(selectedDate);
      setMonth(selectedDate)
   
  }
  
  const HandleAddRent =  async() => {
    if (PaymentMethod != "" && RentAmount !== "") {
      setShowModal(true)
     
      let TotalCash = Number(RentAmount) + Number(SingleTenant[0].OverDraft);
      if (SingleTenant[0].Balance > TotalCash) {

        
        
        await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").doc(SingleTenant[0].id).update({
          Balance: SingleTenant[0].Balance - TotalCash
        });
        dispatch(Update_Tenant_By_Name_Action({
          ...SingleTenant[0],
          Balance: SingleTenant[0].Balance - TotalCash
        }))
        
      } else {
        let totalOverdraft = TotalCash- SingleTenant[0].Balance
        await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").doc(SingleTenant[0].id).update({
          Balance: 0,
          OverDraft : totalOverdraft > 0 ? totalOverdraft: 0
        })
        dispatch(Update_Tenant_By_Name_Action({
          ...SingleTenant[0],
          Balance: 0,
          OverDraft :totalOverdraft > 0 ? totalOverdraft: 0
        }))
      
        
      }
      let Data = {
       
        CreatedAt: Date.now(),
        Tenant: SingleTenant[0].id,
        RentAmount,
        PaymentMethod,
      }
      await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("Transactions")
        .doc(SingleTenant[0].id).collection("rent").add({
        ...Data
        }).then((res) => {
          // setMonth("");
          setRentAmount("");
          setPaymentMethod("")
          toast.show("Balance Updated Successfully", {
            type: "success",
            placement: "bottom",
            duration: 2400,
            offset: 30,
            animationType: "zoom-in",
          });
          navigation.goBack();
          setShowModal(false);
          dispatch(Add_New_Transaction_Action({ ...Data }));
      })
      
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
        <Header Title="Add Rent" iconName="arrow-left-bold" navigation={navigation}  />

      </View>
      <View style={{height:'10%'}}>
     <SpinnerModal title="Please wait..." showModal={showModal} />

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
        keyboardType="numeric"
              mode="outlined"
      />
       <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20
          
        }}
              onChangeText={text => setPaymentMethod(text)}
              label="Payment Method"
              value={PaymentMethod}
              mode="outlined"
      />
       {/* <View style={{ width: '50%', alignSelf: 'center',  justifyContent:'center', alignItems:'center', elevation:200, zIndex:900}}>
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
        </TouchableOpacity> */}

      
      <Button icon="plus" mode='contained' style={{
        width: '50%',
        marginTop: 20, 
        backgroundColor:'grey'
      }}
        onPress={HandleAddRent}
      >
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