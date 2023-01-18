import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React from 'react'
import { BottomNavigation } from 'react-native-paper'
const AddTenant = React.lazy(() => import('./AddTenant'));
const AddRooms = React.lazy(() => import('./AddRooms'));
const AddProperty = React.lazy(() => import('./AddProperty'));
const Home = React.lazy(() => import('./Home'));
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const BottomNavigationScreen = ({ navigation }) => {
  let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
  
//   React.useEffect(() => {
//     if (Landlord.length > 0) {
// console.log("am a genuis in miraa");
//        navigation.dispatch(StackActions.replace("Home"))
//     } else {
//       console.log("sasa izi ni gani");
//       navigation.dispatch(StackActions.replace("Login"));

//     }


//   },[])
  
    const AddTenantRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <AddTenant navigation={navigation} />
        </React.Suspense>
    );
    const AddRoomsRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <AddRooms navigation={navigation} />
        </React.Suspense>
    );
    const HomeRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <Home navigation={navigation} />
        </React.Suspense>
    );
    const AddPropertyRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <AddProperty navigation={navigation} />
        </React.Suspense>
      );
   


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'Home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'heart-outline'},
      { key: 'AddTenant', title: 'Add Tenant', focusedIcon: 'human-queue' },
      { key: 'AddRooms', title: 'AddRooms', focusedIcon: 'hoop-house' },
        { key: 'AddProperty', title: 'AddProperty', focusedIcon: 'warehouse' },
       
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      Home: HomeRoute,
      AddTenant: AddTenantRoute,
      AddRooms: AddRoomsRoute,
      AddProperty: AddPropertyRoute,
    });

  return (
    <BottomNavigation
    navigationState={{ index, routes }}
    onIndexChange={setIndex}
    renderScene={renderScene}
  />
  )
}

export default BottomNavigationScreen

const styles = StyleSheet.create({})