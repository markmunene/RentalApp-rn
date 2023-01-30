import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { FAB } from 'react-native-paper'
import Header from './Header'
import TopBtns from './TopBtns'
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux';
import SpinnerModal from './SpinnerModal';
import { useToast } from 'react-native-toast-notifications';
import { Get_All_Transactions_Action } from './redux/TenanantsReducer'
const SingleTenantBalances = ({ navigation }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const SingleTenant = useSelector(state => state.Tenants.SingleTeanants);
    const Transactions = useSelector(state => state.Tenants.Transactions);
   
    let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);

    useEffect(() => {
        dispatch(Get_All_Transactions_Action({
            OwnerId: Landlord[0].OwnerId,
            id: SingleTenant[0].id
      }))
    
      return () => {   
      }
    }, [])
    
    let options = {
        title: "Share via whatsapp",
        message: "some awesome dangerous message",
        url: './src/file.pdf',
        social: Share.Social.WHATSAPP,
        whatsAppNumber: "254715950481",
        filename: 'files.pdf',
    }
    const HandleremiderSending = async () => {
        
       await Share.shareSingle(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
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
          <View style={{...styles.BioWrapper, backgroundColor:'#ffe6e6', height:50,paddingTop:10}}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  Jan 2023
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize:18, fontWeight:'800'
              }}>
                  Balance : 100000
              </Text>
          </View>
          {/* payment history */}
          <View style={{
              width: '100%',
              padding: 20, 
              justifyContent: 'center',
              alignItems:'center'
          }}>
              <Text style={{fontSize:16}}>
                  No Payment
              </Text>
          </View>
          {/* totals */}
          <View style={{...styles.BioWrapper, backgroundColor:'#ffe6e6', height:50,paddingTop:10}}>
              <Text style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight:'900'
              }}>
                  Total Balance
              </Text>
              <Text style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight:'900'
              }}>
                 5000
              </Text>
          </View>
          <FAB
              icon="share"
              style={styles.fabStyle}
              onPress={()=>HandleremiderSending()}
          />
    </View>
  )
}

export default SingleTenantBalances

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        
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