
import React from 'react';

import {
  SafeAreaView,
  Platform ,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ToastProvider } from 'react-native-toast-notifications'
import { Provider as PaperProvider } from 'react-native-paper';
import AddRent from './src/AddRent';
import AddTenant from './src/AddTenant';
import AddRooms from './src/AddRooms';
import AddProperty from './src/AddProperty';
import SingleTenant from './src/SingleTenant';
import PaymentsHistory from './src/PaymentsHistory';
import SingleTenantBalances from './src/SingleTenantBalances';
import Home from './src/Home';
import BottomNavigationScreen from './src/BottomNavigation';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import thunk from 'redux-thunk';


// import {createDrawerNavigator} from '@react-navigation/drawer';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import { createStore } from 'redux';
import AllReducers from './src/redux/AllReducers';
const Stack = createNativeStackNavigator();

const App= () => {
  let store = createStore(AllReducers, applyMiddleware(thunk))
  
  let persistor = persistStore(store)


  return (  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
    <PaperProvider>
      <ToastProvider>
      <NavigationContainer>
     <Stack.Navigator initialRouteName='BottomNavigationScreen'>
            <Stack.Screen name="addrent" component={AddRent} options={{ header: () => null }} />
        <Stack.Screen name="AddRooms" component={AddRooms} options={{header: () => null}} />
        <Stack.Screen name="AddTenant" component={AddTenant} options={{header: () => null}} />
            <Stack.Screen name="AddProperty" component={AddProperty} options={{ header: () => null }} />
            <Stack.Screen name="SingleTenant" component={SingleTenant} options={{ header: () => null }} />
            <Stack.Screen name="SingleTenantBalances" component={SingleTenantBalances} options={{ header: () => null }} />
            <Stack.Screen name="PaymentsHistory" component={PaymentsHistory} options={{ header: () => null }} />
            <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
            <Stack.Screen name="BottomNavigationScreen" component={BottomNavigationScreen} options={{ header: () => null }} />
 
      </Stack.Navigator>
    </NavigationContainer>
       
      </ToastProvider>  
    
    </PaperProvider>
      </PersistGate>

    </Provider>
  );
};


export default App;
