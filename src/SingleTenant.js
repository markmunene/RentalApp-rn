import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import TopBtns from './TopBtns'
const SingleTenant = ({navigation}) => {
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
                  Mark Munene
              </Text>
              <Text style={{
                  fontWeight: '800',
                  fontSize: 16,
                  color:'black'
              }}>
                  From 02/01/2013
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
                  0748406477
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
                  markmunene72@gmail.com
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
                  fontSize:18
              }}>
                monthy:  5000
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
                  5 days
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
                 5000
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