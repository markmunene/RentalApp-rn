import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { FAB, AnimatedFAB } from 'react-native-paper'
import Header from './Header'
import TopBtns from './TopBtns'
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux';
import SpinnerModal from './SpinnerModal';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment/moment'

const PaymentsHistory = ({ navigation }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const SingleTenant = useSelector(state => state.Tenants.SingleTeanants);
    const Transactions = useSelector(state => state.Tenants.Transactions);
//    console.log(Transactions);
    let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
    const [isExtended, setIsExtended] = React.useState(true);
    const [visible, setvisible] = React.useState(true);

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition =
          Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    
        setIsExtended(currentScrollPosition <= 0);
        setvisible(currentScrollPosition <= 0);

      };

    let options = {
        title: "Share via whatsapp",
        message: `Dear ${SingleTenant[0].Tenant} You have a Balance of
         ${SingleTenant[0].Balance} Please Clear Your Balance. with Regards ${Landlord[0].OwnerName} LandLord Thank You`,
       
        social: Share.Social.WHATSAPP,
        whatsAppNumber: `254${SingleTenant[0].PhoneNumber}`,
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
    const HandleRecieptSending = async (item) => {
        let options = {
            title: "Share via whatsapp",
            message: `Dear ${SingleTenant[0].Tenant} You have Paid Ksh: ${item.RentAmount}  Updated on ${moment(item.CreatedAt).format("DDMMMYY")} at ${moment(item.CreatedAt).format("HHMM")}. Your Remaining Balance is :${SingleTenant[0].Balance} and Over payment amount is: ${SingleTenant[0].OverDraft}. with Regards ${Landlord[0].OwnerName} LandLord Thank You`,
           
            social: Share.Social.WHATSAPP,
            whatsAppNumber: `254${SingleTenant[0].PhoneNumber}`,
           
        }
        await Share.shareSingle(options)
         .then((res) => {
           console.log(res);
         })
         .catch((err) => {
           err && console.log(err);
         });
    }
    const HandleMessageSending = async() => {
        let options = {
            title: "Share via Message",
            message: `Dear ${SingleTenant[0].Tenant} You have a Balance of
         ${SingleTenant[0].Balance} Please Clear Your Balance. with Regards ${Landlord[0].OwnerName} LandLord Thank You`,
       
            social: Share.Social.SMS,
            recipient: `254${SingleTenant[0].PhoneNumber}`,
           
        }
        await Share.shareSingle(options)
         .then((res) => {
           console.log(res);
         })
         .catch((err) => {
           err && console.log(err);
         });
    }
    const RenderItem = ({ item }) => {
        return (
            <View style={styles.BioWrapper}>
                <View style={{width:'40%'}}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  {item.RentAmount}
                    </Text>
                    <Text style={{
                  color: 'black',
                  fontSize:14,fontWeight:'900'
              }}>
             Method::  {item?.PaymentMethod}
              </Text>

                </View>
                <TouchableOpacity
                    onPress={() => HandleRecieptSending(item)}
                    
                    style={{
                    width: '20%',
                   
                    borderRadius: 15,
                    backgroundColor: '#ffe6e6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:'#ffe6e6',
                    elevation:3,
                    borderWidth: 1,
                    
                 
                    height: 40
                }}>
                    <Text style={{textAlign:'center', fontWeight:'900', color:'black',padding:5}}>
                    Reciept
                    </Text>
                </TouchableOpacity>
              <Text style={{
                  color: 'grey',
                  fontSize:18
              }}>
                  {moment(item.CreatedAt).format("DDMMMYY")}
              </Text>
          </View>
        )
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
                  {moment().format("MMMMYYYY")}
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize:18, fontWeight:'800'
              }}>
                  Balance : {SingleTenant[0].Balance}
              </Text>
          </View>
          <FlatList
              data={Transactions}
              renderItem={RenderItem}
              keyExtractor={(item) => item?.CreatedAt}
              onScroll={onScroll}
          />
            <AnimatedFAB
              icon="message-reply-text-outline"
              label={'Reminder Via sms'}
              visible={visible}
              animateFrom={'right'}
              extended={isExtended}
       style={styles.fabStyle3}
       onPress={()=>HandleMessageSending()}
   />
        
        <AnimatedFAB
              icon="whatsapp"
              label={'Reminder'}
              visible={visible}
              animateFrom={'right'}
              extended={isExtended}
       style={styles.fabStyle2}
       onPress={()=>HandleremiderSending()}
   />
          <AnimatedFAB
              icon="plus"
              label={'Add Payment'}
              visible={visible}
              animateFrom={'right'}
              extended={isExtended}
              style={styles.fabStyle}
              onPress={()=>navigation.navigate("addrent")}
          />
    </View>
  )
}

export default PaymentsHistory

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
    fabStyle2: {
        bottom: 100,
        right: 16,
        position: 'absolute',
    },
    fabStyle3: {
        bottom: 180,
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