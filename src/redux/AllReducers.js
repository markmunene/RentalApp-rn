import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import PropertyReducer from './PropertyReducer';
import TenantReducer from './TenanantsReducer';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistConfig1 = {
    key: 'root2',
    storage: AsyncStorage,
};
  
export default combineReducers({
    Tenants: persistReducer(persistConfig, TenantReducer),
    Propertys:persistReducer(persistConfig1, PropertyReducer)
})