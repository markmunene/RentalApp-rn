import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TextInput,
    ActivityIndicator,
 
} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import Icon from 'react-native-ionicons';

import {useDispatch} from 'react-redux';
// import {COLORS, SIZES} from '../constants';

const SpinnerModal = ({showModal, title}) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    setModalVisible(showModal);
  }, [showModal]);

  const pressed = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <ActivityIndicator color='#ffbb00' size="large" />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={pressed}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    width: 300- 50,
    height: 200,
    justifyContent: 'center',
    // paddingHorizontal: 100,
    // paddingVertical: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 2,
    elevation: 2,
    marginTop: 20,
    width: 100,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#FFBB00',
  },
  buttonClose: {
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    width: '100%',
    marginTop: 15,
    color: '#000000',
    alignContent: 'center',

    height: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    paddingLeft: 28,
  },
});

export default React.memo(SpinnerModal);
