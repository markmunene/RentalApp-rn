import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from './Header'
import { MD2Colors, ProgressBar } from 'react-native-paper';

const Home = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');

    
  return (
    <View style ={styles.container}>
          <View style={{width:'100%', height:60}} >
              <Header Title="Dashboard" navigation={navigation} iconName="arrow-left-bold" />
          </View>
          {/* Rent Totals */}
          <View style={{
              width: '100%',
              padding: 20,
              borderRadius: 20,
              height: '30%',
              
              
          }}>
              <View style={{
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  marginTop:10
              }}>
                  <Text style={{
                      fontWeight: '900',
                      fontSize:18
                  }}>
                      Rent
                  </Text>
                  <View style={
                      {
                          borderRadius: 3,
                          borderWidth: 1,
                          borderColor:'black',
                          width: '20%',
                          height: 25,
                          justifyContent: 'center',
                          alignItems: 'center', 
                          flexDirection:'row'
                      }
                  }>
                      <Text style={{fontWeight: '900',
                      fontSize:12}}>
                          jan 2023
                      </Text>
                  </View>

              </View>
              <View style={{marginBottom:20}}>
                  <Text style={{fontSize:18}}>Total rent for Jan</Text>
                  <Text style={{
                      fontWeight: '900',
                      fontSize:16
                  }}>Ksh 40480</Text>
              </View>
              <View style={{width:'100%', padding:10}}>
                  <ProgressBar progress={0.5} color="green" style={{
                      height: 10, borderRadius: 10,
                      backgroundColor:"red"
                  }} />
              </View>

              <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',     
              }}>
                  <View>
                      <Text style={{
                          color:'green'
                      }}>Collected</Text>
                      <Text style={{fontWeight: '900',
                      fontSize:16}}>
                          Ksh 125.00
                      </Text>
                  </View>
                  <View>
                      <Text style={{
                          color:'red'
                      }}>Pending</Text>
                      <Text style={{fontWeight: '900',
                      fontSize:16}}>
                          Ksh 3675.00
                      </Text>
                  </View>
                  
            </View>

          </View>
          {/* TENANTS */}
          <TouchableOpacity style={{
              width: '92%', height: 80, borderRadius: 10, padding: 10, elevation: 5, flexDirection: 'row', justifyContent: 'space-between',
              backgroundColor: 'white', 
              paddingTop: 15, 
              alignSelf: "center", 
              borderRadius:10
          }}
              onPress={()=>navigation.navigate("SingleTenant")}
          >
              <View>
                  <Text style={styles.textStyle}>Mark Munene</Text>
                  <Text style={{...styles.textStyle, fontSize:14}}>Room: 123 malindi apartment</Text>
              </View>
              <View>
                  <Text style={styles.textStyle}>Bal:6000</Text>
              <Text style={{...styles.textStyle, fontSize:14}}>jan 2023</Text>
                  
                  
              </View>
          </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    textStyle: {
        fontWeight: '900',
        fontSize:18
    }

})