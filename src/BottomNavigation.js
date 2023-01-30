import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const AddTenant = React.lazy(() => import('./AddTenant'));
const AddRooms = React.lazy(() => import('./AddRooms'));
const AddProperty = React.lazy(() => import('./AddProperty'));
const Home = React.lazy(() => import('./Home'));
const Login = React.lazy(() => import("./Login"));
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Routes from '../Routes';

const Tab = createBottomTabNavigator();
const BottomNavigationScreen = () => {
 
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);

    // const [routes] = React.useState([
    //     { key: 'Home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'heart-outline'},
    //     { key: 'AddTenant', title: 'Add Tenant', focusedIcon: 'human-queue' },
    //     { key: 'AddRooms', title: 'AddRooms', focusedIcon: 'hoop-house' },
    //       { key: 'AddProperty', title: 'AddProperty', focusedIcon: 'warehouse' },
         
    //   ]);

  
    

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveBackgroundColor: 'pink',
      tabBarLabelStyle: { fontWeight: '900', fontSize: 14 },
      
    }}
      initialRouteName={Landlord.length ==0 ? "Login" : "Hom"}
    
    >
      {
        Landlord.length == 0 ?
        <Tab.Screen name="Login" component={Login}
        options={{
         tabBarIcon: ({ focused }) => (
           <Icon name ="login" size={25} color="black" />
         ),  
       }}
          /> : 
          <>
     
      <Tab.Screen name="Hom" component={Routes}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name ="home" size={25} color="black" />
          ),  
        }}
      />
      <Tab.Screen name="Tenants" component={AddTenant}
         options={{
          tabBarIcon: ({ focused }) => (
            <Icon name ="human-queue" size={25} color="black" />
          ),  
        }}
      />
      <Tab.Screen name="Rooms" component={AddRooms}
         options={{
          tabBarIcon: ({ focused }) => (
            <Icon name ="hoop-house" size={25} color="black" />
          ),  
        }}
      />
      <Tab.Screen name="Property" component={AddProperty}
         options={{
          tabBarIcon: ({ focused }) => (
            <Icon name ="warehouse" size={25} color="black" />
          ),  
        }}
            />
            </>
    }
       


    </Tab.Navigator>
  )
}

export default BottomNavigationScreen

const styles = StyleSheet.create({})