import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import Header from './Header'
import TopBtns from './TopBtns'
import { useSelector, useDispatch } from 'react-redux';
import { Filter_Transactions_By_Name_Action,Get_All_Transactions_Action } from './redux/TenanantsReducer';
const SingleTenant = ({ navigation }) => {
    const SingleTenant = useSelector(state => state.Tenants.SingleTeanants);
    let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
   
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(Filter_Transactions_By_Name_Action(SingleTenant[0].id))
    }, [])
    useEffect(() => {
        dispatch(Get_All_Transactions_Action({
            OwnerId: Landlord[0].OwnerId,
            id: SingleTenant[0].id
      }))
    
      return () => {   
      }
    }, [])
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
              justifyContent:'center'
              
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
                  color:'black'
              }}>
                  {SingleTenant[0].leaseStarts}
              </Text>
              
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
    BioWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginVertical:10
    }
})