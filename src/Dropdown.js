import React, { FC, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , FlatList, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const Dropdown = ({ label, data, onSelect }) => {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
                <Text style={{
                fontWeight:'800', textAlign:'center'
            }}>{item.label}</Text>
          </TouchableOpacity>
        )
    }
    const onItemPress = (item)=> {
        setSelected(item);
        onSelect(item);
        setVisible(false);
      };
    const DropdownButton = useRef();

    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownXposition, setDropdownXposition] = useState(0);
const [dropdownWidth, setDropdownWidth] = useState(0);
    
    
    const openDropdown = () => {
  
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownTop(py + h);
        setDropdownXposition(_px)
        setDropdownWidth(_w *1.35)
        

    });
    setVisible(true);
    };
    React.useEffect(() => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
            setDropdownXposition(_px)
           
        });
       
        
    },[])
    const renderDropdown = () => {
     
          return (
            <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity
              style={{...styles.overlay, marginLeft:dropdownXposition, width:dropdownWidth}}
                      onPress={() => setVisible(false)}
                     
            >
              <View style={[styles.dropdown, { top: dropdownTop }]}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        );
      
    };
  return (
    
       <TouchableOpacity
      style={styles.button}
          onPress={toggleDropdown}
          ref ={DropdownButton}
      >
        
      {renderDropdown()}
      <Text style={styles.buttonText}>{(selected && selected.label) || label}</Text>
      <Icon size={25} name='angle-down'/>
    </TouchableOpacity>
    
  )
}

export default Dropdown

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        width: '80%',
        paddingHorizontal: 10,
        zIndex: 1,
    borderRadius: 5,
    borderWidth: 1,
       borderColor:'black'
        


    },
    overlay: {
        elevation: 10,
        width: '70%',
        padding: 20,
        margin: 20,
        borderRadius: 20,
       
    
    }, 
      buttonText: {
        flex: 1,
        textAlign: 'center',
      },
    //   dropdown: {
    //     position: 'absolute',
    //     backgroundColor: '#fff',
    //       top: 50,
    //       width: '120%',
         
    //       padding: 5,
    //       borderBottomWidth: 1,
    //     borderBottomColor:'black'
    //   },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        
      },
})