import {StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
// import Icon from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import {useDrawerStatus} from '@react-navigation/drawer';

// import { ChangeSalesSecret } from '../Reducers/SalesReducer';

// import { useDispatch } from 'react-redux';

 

const Header = ({ navigation, Title, where, iconName }) => {

 const [count, setcount] = useState(0)
  
//   const dispatch = useDispatch();
  const HandleSaleSecret = () => {

    setcount(count + 1)
    if (count >= 3) {
    //   console.log(count);
    //   dispatch(ChangeSalesSecret({saleType : "Cash"}))
      
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: '20%'}}>
          <Icon name={iconName} size={25} color="white" fontWeight="600"  />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableWithoutFeedback onPress ={()=>HandleSaleSecret()}>
          <Text style={{color: count >=4?  "red" : 'white', fontWeight: '800', fontSize:18}}>{Title}</Text>

          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    width: '100%',
    height: 80,
    alignItems: 'center',
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: 'black',
    padding: 10,
  },
});
