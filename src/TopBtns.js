import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const TopBtns = ({navigation}) => {
  return (
    <View style={styles.container}>
          <TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate("SingleTenant")} >
              <Text style={{
                  fontSize: 15,
                  fontWeight: '800'
                  ,color:'white'
              }}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate("SingleTenantBalances")}>
              <Text style={{
                  fontSize: 15,
                  fontWeight: '800',
                  color: 'white'
              }}>Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate("PaymentsHistory")}>
              <Text style={{
                  fontSize: 15,
                  fontWeight: '800',
                  color: 'white'
              }}>Payment</Text>
          </TouchableOpacity>
          
    </View>
  )
}

export default TopBtns

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        height: 40
        , flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems:'center',
        marginBottom:20

        
    },
    navBtn: {
        height: 40,
        width:'30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "grey",
        borderColor: 'black',
        borderRadius: 5,
        borderWidth:1
        
    }
})