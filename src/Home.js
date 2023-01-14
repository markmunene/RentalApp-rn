import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Header from './Header'
import { MD2Colors, ProgressBar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDown from "react-native-paper-dropdown";
import DropDown1 from './Dropdown';


const Home = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [apartment, setapartment] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDown1, setShowDropDown1] = useState(false);
    const [showFilters, setshowFilters] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const data = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
    ];
    let Data2 = [
        { label: 'Paid', value: 'Paid' },
        { label: 'UnPaid', value: 'UnPaid' },
    ]
    const colorList = [
        {
          label: "rungai",
          value: "rungai",
        },
        {
          label: "utawala",
          value: "utawala",
        },
        {
          label: "umoja",
          value: "umoja",
        },
        {
          label: "pipeline",
          value: "pipeline",
        },
        {
          label: "dandora",
          value: "dandora",
        }
      ];
  return (
    <View style ={styles.container}>
          <View style={{width:'100%', height:60}} >
              <Header Title="Dashboard" navigation={navigation} iconName="arrow-left-bold" />
          </View>

          <View style={{
              flexDirection: 'row',
              width: '100%',
              height: 40,
              paddingHorizontal:20,
              marginTop:30,

              
          }}>
                 <Searchbar
                     placeholder="Tenant Name"
                     onChangeText={onChangeSearch}
                  value={searchQuery}
                  style={{
                width:'70%'
            }}
              />
              <TouchableOpacity style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '30%',
                  height:40
              }}
                  onPress={()=>setshowFilters(!showFilters)}
              >
                  <Icon name="filter-variant" size={25} color="black" />
                  <Text style={{
                      fontSize: 16,
                      fontWeight:'700'
                  }}>
                      Filters
                  </Text> 
                  
              </TouchableOpacity>
          </View>
          {
              showFilters ? 
              <View style={{
                flexDirection: 'row',
                width: '100%',
                alignSelf: "center"
                ,height:100
                
            }}>
                <TouchableOpacity style={{
                    width: '20%',
                    height: 100,
                    justifyContent: 'center',
                    alignItems:'center'
                }}>
                    <Text style={{fontWeight:'900', fontSize:18, marginLeft:5}}>All</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    width: '40%'
                    ,
                    justifyContent: 'center',
                    alignItems:'center'
                }}>
             
                    <DropDown1 label='Apartment' data={data} onSelect={setSelected} />
                    <Text style={{fontWeight:'900', fontSize:18, marginLeft:5}}>8</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '40%',
                
                    alignItems:'center'
                }}>
                <DropDown1 label='Payment Status' data={Data2} onSelect={setSelected} />
                    <Text style={{fontWeight:'900', fontSize:18, marginLeft:5}}>9</Text>
                </View>
                
                
            </View>
               : <View></View>
          }
      
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
              borderRadius: 10,
              marginTop: 20, 
              
              
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