import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect, useCallback, useRef} from 'react'
import Header from './Header'
import { MD2Colors, ProgressBar, Searchbar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore'

import { Add_Auth_Landord_action } from './redux/OwnersReducer';
import { Get_All_Properties_Action } from './redux/PropertyReducer';
import {
    Get_All_tenants_Action, Filter_Tenant_By_Name_Action,
    Filter_SingleTenant_By_Id_Action,
    Filter_Tenant_By_Property_Action,
    Filter_Tenant_By_BalanceAmount_Action,
    Update_Tenant_By_Name_Action
} from './redux/TenanantsReducer';
import DropDown1 from './Dropdown';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({ navigation }) => {
    let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
    let DropdownProperties = useSelector(state => state.Propertys.DropdownProperties);
    let AllTenants = useSelector(state => state.Tenants.Tenants);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const onChangeSearch = query => {
        setSearchQuery(query);
        dispatch(Filter_Tenant_By_Name_Action(query));
    };
    const [showFilters, setshowFilters] = useState(false);
    const [SearchBalance, setSearchBalance] = useState("");
    const [ActulaBalanceState, setActulaBalanceState] = useState(0);
    const [PaidBalanceState, setPaidBalanceState] = useState(0);
    const [ProgressState, setProgressState] = useState(0);
    const [selected, setSelected] = useState(undefined);
  
    // useEffect(() => {
        
    //     dispatch(Get_All_Properties_Action({ OwnerId: Landlord[0].OwnerId }))
    //     dispatch(Get_All_tenants_Action({ OwnerId: Landlord[0].OwnerId }));

      
        
    // }, []);
    useEffect(() => {
        // console.log(AllTenants);
      
        let tempPaidBalance = AllTenants.reduce((a, b) => {
            return Number(b.Balance) + Number(a)
        }, 0);
       
        let tempActualBalance = AllTenants.reduce((a, b) => {
        
            return Number(b.ActualBalance) + a;  
        }, 0)
        
        setActulaBalanceState(tempActualBalance);
        setPaidBalanceState(tempPaidBalance);
        if (tempActualBalance>0) {
            setProgressState((tempActualBalance - tempPaidBalance) / tempActualBalance);
        } else {
            setProgressState(0);   
        }
      
    
      return () => {
        
      }
    }, [AllTenants])
    

    const RenderItem = ({ item }) => {
       
        return (
            <TouchableOpacity style={{
                width: '92%', height: 80,
                borderRadius: 10, padding: 10,
                elevation: 5, flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white', 
                paddingTop: 15, 
                alignSelf: "center", 
                borderRadius: 10,
                marginTop: 10, 
                
                
            }}
                onPress={() => {
                    dispatch(Filter_SingleTenant_By_Id_Action(item.id));
                    navigation.navigate("SingleTenant")
                }}
            >
                <View>
                    <Text style={styles.textStyle}>{item.Tenant }</Text>
                    <Text style={{ ...styles.textStyle, fontSize: 14 }}>{item.RoomNumber} { item.PropertyName }</Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>Bal:{ item.Balance }</Text>
                    <Text style={{ ...styles.textStyle, fontSize: 14, alignSelf:'flex-end' }}>{moment().format('MMMyy') }</Text>
                    
                    
                </View>
            </TouchableOpacity>
        )
    }
    const HandleFilterByApartMent = (item) => {
        setSelected(item)
        
        dispatch(Filter_Tenant_By_Property_Action(item.label))
    }
    const onBalanceSearch = (item) => {
        setSearchBalance(item)
        dispatch(Filter_Tenant_By_BalanceAmount_Action(item))
    }

    // function to add rent to tents immedietely after one month
    const AddRentToAllTenantMonthly = async () => {
        // check if its new month using moment and async
        // if true check each tenant collecion
            // 1. check overdraft
            // 2. update balance
            // 3. update async storage
        // else ignore
        let month = new Date().getMonth() +1;
        // console.log(month, "month men");

        let storedMonth = await AsyncStorage.getItem("storedMonth");
        // console.log(storedMonth, "our pride as a nation");
        if (storedMonth !== null ) {
           await AsyncStorage.setItem("storedMonth", JSON.stringify(month))
            
           
            if (JSON.parse(storedMonth) !== month) {
              console.log("wewe ni nani bwana");
                await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").get().then(res => {
                
                    res.docs.map( async docs => {
                     
                        try {
                            if (docs.data().OverDraft > 0) {
                                let Bal = docs.data().OverDraft - docs.data().RentalFees;
                                await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").doc(docs.id).update({
                                    Balance: Bal <= 0 ? Math.abs(Bal) : 0,
                                    OverDraft: Bal <= 0 ? 0 : Math.abs(Bal),
                                    ActualBalance: Bal <= 0 ? Math.abs(Bal) : 0
                                }).then(res => { }).catch(err => {
                                    console.log(err, "kwanza");
                                })

                                dispatch(Update_Tenant_By_Name_Action({
                                    ...docs.data(),
                                    id: docs.id,
                                    Balance: Bal <= 0 ? Math.abs(Bal) : 0,
                                    OverDraft: Bal <= 0 ? 0 : Math.abs(Bal),
                                    ActualBalance:Bal <= 0 ? Math.abs(Bal) : 0
                                    }))
                                    
                            } else {
                             
                                    await firestore().collection("Properties").doc(Landlord[0].OwnerId).collection("tenants").doc(docs.id).update({
                                        Balance: Number(docs.data().RentalFees) + Number(docs.data().Balance),
                                        OverDraft: 0,
                                        ActualBalance:Number(docs.data().RentalFees) + Number(docs.data().Balance),
                                    }).then(res => { }).catch(err => {
                                        console.log(err, "azimio");
                                    })
                                dispatch(Update_Tenant_By_Name_Action({
                                    ...docs.data(),
                                    id: docs.id,
                                    Balance: Number(docs.data().RentalFees) + Number(docs.data().Balance),
                                    OverDraft: 0,
                                    ActualBalance:Number(docs.data().RentalFees) + Number(docs.data().Balance),
                                    }))
                                }
                            
                        } catch (error) {
                            console.log(error);
                        }
                       
                       
                    })
                }).catch(err=>{console.log(err);})
            } 
           

        } else {
            // console.log("naskia");

           await AsyncStorage.setItem("storedMonth", JSON.stringify(month))

        }

    }
    useEffect(() => {
      
        AddRentToAllTenantMonthly()
        // navigation.navigate("Hom")
    
        return () => {
        
        }
    }, []);
    // console.log("amcalled, amback");

    
  return (
    <View style ={styles.container}>
          <View style={{width:'100%', height:60}} >
              <Header Title="Dashboard" toHome="none" navigation={navigation} showIcons="Yes" iconName="arrow-left-bold" />
          </View>

          <View style={{
              flexDirection: 'row',
              width: '100%',
              height: 40,
              paddingHorizontal:20,
              marginTop:30,

              
          }}>
                 <Searchbar
                     placeholder="Search Tenant..."
                  onChangeText={onChangeSearch}
                  inputStyle={{
                  paddingTop:0,
                      marginTop: 0,
                      fontSize: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10,
                      height: 40,
                      fontWeight:'900'
                 }}
                  
                  value={searchQuery}
                  style={{
                      width: '70%', 
                      textAlign: 'center',
                      fontSize:10,
                     marginTop:0,
                      height:40
                      
            }}
              />
              <TouchableOpacity style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '30%',
                  height:40
              }}
                //   onPress={() => {
                //       dispatch(Add_Auth_Landord_action([]))
                //   }}
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
          {showFilters ? 
              <View style={{
                flexDirection: 'row',
                width: '100%',
                alignSelf: "center"
                ,height:100
                
            }}>
                      <TouchableOpacity
                          onPress={() => {
                            dispatch(Filter_Tenant_By_Name_Action(""));
                          }}
                          style={{
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
             
                    <DropDown1 label='Apartment' data={DropdownProperties} onSelect={HandleFilterByApartMent} />
                          <Text style={{ fontWeight: '900', fontSize: 18, marginHorizontal: 5,  }}>{DropdownProperties.length }</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '40%',
                
                    alignItems:'center'
                }}>
                   <TextInput
                              placeholder="Balance"
                              mode='outlined'
                     onChangeText={onBalanceSearch}
                  value={SearchBalance}
                  style={{
                      width: '90%',
                      padding: 0,
                      fontSize: 14,
                      alignSelf:'center'
                      
            }}
              />
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
                          {moment().format("MMMYYYY")}
                      </Text>
                  </View>

              </View>
              <View style={{marginBottom:20}}>
                  <Text style={{ fontSize: 18 }}>Total rent for { moment(Date.now()).format("MMMYYYY") }</Text>
                  <Text style={{
                      fontWeight: '900',
                      fontSize:16
                  }}>Ksh {ActulaBalanceState}</Text>
              </View>
              <View style={{width:'100%', padding:10}}>
                  <ProgressBar progress={ProgressState} color="green" style={{
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
                          Ksh {  ActulaBalanceState-PaidBalanceState}
                      </Text>
                  </View>
                  <View>
                      <Text style={{
                          color:'red'
                      }}>Pending</Text>
                      <Text style={{fontWeight: '900',
                      fontSize:16}}>
                          Ksh {PaidBalanceState}
                      </Text>
                  </View>
                  
            </View>

          </View>
          {/* TENANTS */}
          <FlatList data={AllTenants} renderItem={({item})=> <RenderItem  item={item}/>} keyExtractor={(item)=> item?.id + item.Tenant} />
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