
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
import Login from './src/Login';
import Register from './src/Register';
import BottomNavigationScreen from './src/BottomNavigation';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import thunk from 'redux-thunk';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';



// import {createDrawerNavigator} from '@react-navigation/drawer';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import { createStore } from 'redux';
import AllReducers from './src/redux/AllReducers';
import Routes from './Routes';
import AuthScreenController from './AuthScreenController';
const Stack = createNativeStackNavigator();

const App= () => {
  let store = createStore(AllReducers, applyMiddleware(thunk))
  GoogleSignin.configure();
 
  
  let persistor = persistStore(store)


  return (  
    <NavigationContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
    <PaperProvider>
      <ToastProvider>
        <AuthScreenController />
      </ToastProvider>  
    </PaperProvider>
      </PersistGate>
    </Provider>
      </NavigationContainer>
  );
};


export default App;
