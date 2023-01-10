import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'
import Header from './Header'
import TopBtns from './TopBtns'
import Share from 'react-native-share';

const PaymentsHistory = ({ navigation }) => {
   
   
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
          <View style={styles.BioWrapper}>
              <Text style={{
                  color: 'black',
                  fontSize:18
              }}>
                  7000
              </Text>
              <Text style={{
                  color: 'grey',
                  fontSize:18
              }}>
                  12/01/2023:12.44pm
              </Text>
          </View>
        
          <FAB
              icon="plus"
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
    BioWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginVertical:10
    }
})