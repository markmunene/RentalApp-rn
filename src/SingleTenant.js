import { StyleSheet, Text, View ,Alert, TouchableOpacity} from 'react-native'
import React,{useState, useEffect} from 'react'
import Header from './Header'
import TopBtns from './TopBtns'
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'


import { AnimatedFAB } from 'react-native-paper'
import { Filter_SingleProperty_By_Name } from './redux/PropertyReducer';

import { Filter_Transactions_By_Name_Action,Get_All_Transactions_Action, Delete_Tenant_Action } from './redux/TenanantsReducer';
import { useToast } from 'react-native-toast-notifications';
const SingleTenant = ({ navigation }) => {
    
    const toast = useToast();
    const SingleTenant = useSelector(state => state.Tenants.SingleTeanants);
    let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
    const [isExtended, setIsExtended] = React.useState(true);
    const [visible, setvisible] = React.useState(true);


   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Filter_Transactions_By_Name_Action(SingleTenant[0].id))
        
    }, [])
    // console.log(SingleTenant[0]);
    useEffect(() => {
        dispatch(Get_All_Transactions_Action({
            OwnerId: Landlord[0].OwnerId,
            id: SingleTenant[0].id
        }))
        dispatch(Filter_SingleProperty_By_Name(
             SingleTenant[0].PropertyName
        ))
        
    
        return () => {
        }
    }, []);

    const HandleDeleteProperty =  async () => {
    
        Alert.alert(
          'Delete action confirmation',
          'Are  u sure you want to delete this Tenant',
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
                    // delete Transactions
                    await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("Transactions")
                        .doc(SingleTenant[0].id).collection("rent").get().then(res => {
                            Promise.all(res.docs.map(doc => doc.ref.delete()));
                            console.log("docs dead");
                         })
                      
                  await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").doc(SingleTenant[0].id)
                    .delete().then(res => {
                     
                      dispatch(Delete_Tenant_Action(SingleTenant[0]))
                      toast.show("Tenant Deleted Successfully", {
                        type: "danger",
                        placement: "bottom",
                        duration: 2400,
                        offset: 30,
                        animationType: "zoom-in",
                      });
                        navigation.goBack();
                      
                  })
               
                } catch (error) {
                  console.log('fire ', error);
                }
              },
            },
          ],
        );
      
    }
    
  
  return (
      <View style={styles.container}>
          <View style={{
              width: '100%',
              height: 60,
              marginBottom:25
          }}>
          <Header iconName="arrow-left-bold" Title="Tenant details" navigation={navigation} />
              
          </View>
          <View style={{
               width: '100%',
               height: 60,
               
          }}>
          <TopBtns navigation={navigation} />
              
          </View>
          {/* name section */}
          <View style={{
              width: '100%',
              height: 130,
              backgroundColor: '#ffe6e6',
              padding: 20, 
              flexDirection: 'row',
            justifyContent:'space-between',
             
              
          }}>
              <View  style={{
           
           justifyContent: 'center',
           alignItems: 'center',

           
         }}>
              <Text style={{
                  fontWeight: '900',
                  fontSize: 28,
                  color:'black'
              }}>
                  {SingleTenant[0].Tenant}
              </Text>
              <Text style={{
                  fontWeight: '800',
                  fontSize: 16,
                      color: 'black',
                  alignSelf:'flex-start'
              }}>
                  {SingleTenant[0].leaseStarts}
              </Text>
              </View>
              <TouchableOpacity
          style={{
           
            justifyContent: 'center',
            alignItems: 'center',

            
          }}
          onPress={()=> navigation.navigate("AddTenant", {item:SingleTenant[0]})}
        >
          <Icon2 name="edit" size={40} color="green" style={{
            alignSelf:'flex-start'
          }} />
        </TouchableOpacity>
              <TouchableOpacity
          style={{
           
            justifyContent: 'center',
            alignItems: 'center',

            
          }}
          onPress={()=> HandleDeleteProperty()}
        >
          <Icon name="trash" size={40} color="red" style={{
            alignSelf:'flex-start'
          }} />
        </TouchableOpacity>
              
          </View>
          {/* bio section  */}
          <View style={styles.BioWrapper}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  Phone
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize:18
              }}>
                 {SingleTenant[0].PhoneNumber}
              </Text>
          </View>
          <View style={styles.BioWrapper}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  Email
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize:18
              }}>
                  {SingleTenant[0].Email}
              </Text>
          </View>
          <View style={{...styles.BioWrapper, backgroundColor:'#ffe6e6', height:50,paddingTop:10}}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  Rent
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize: 18,
                  fontWeight:"900"
              }}>
                monthy: {SingleTenant[0].RentalFees}
             
              </Text>
          </View>
          <View style={{...styles.BioWrapper, backgroundColor:'#ffe6e6', height:50,paddingTop:10}}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  Over Payment
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize: 18,
                  fontWeight:"900"
              }}>
                 {SingleTenant[0].OverDraft}
             
              </Text>
          </View>
          <View style={styles.BioWrapper}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  Payment Due Date
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize:18
              }}>
                 {SingleTenant[0].paymentDue} days
              </Text>
          </View>
          <View style={{...styles.BioWrapper, backgroundColor:'#ffe6e6', height:50,paddingTop:10}}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  Deposit Paid
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize:18
              }}>
                {SingleTenant[0].deposit}
              </Text>
          </View>
          <AnimatedFAB
              icon="plus"
              label={'Add payment'}
              visible={true}
              animateFrom={'right'}
              extended={true}
              style={styles.fabStyle}
              onPress={()=>navigation.navigate("addrent")}
          />
        
    </View>
  )
}

export default SingleTenant

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
       height: '100%',
        width:'100%'
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    }, 
    BioWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginVertical:10
    }
})