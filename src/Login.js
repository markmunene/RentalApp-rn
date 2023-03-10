// MD5: 62:2B:06:EB:FA:5C:24:74:31:94:05:46:3D:BD:4A:F1
// SHA1: 57:09:A4:68:76:F9:CB:FD:07:9D:7C:87:18:20:E0:50:7C:3D:BA:88
// SHA-256: 85:8C:06:F4:8A:82:02:09:17:99:CE:29:92:65:92:F0:D3:60:12:40:7F:25:3D:E2:0B:8F:09:AB:77:EF:AC:CA
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
// import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Icon from  'react-native-vector-icons/MaterialCommunityIcons'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useToast } from 'react-native-toast-notifications';
import SpinnerModal from './SpinnerModal';
import { useDispatch } from 'react-redux';
import { Add_Auth_Screen_Action, Add_Auth_Landord_action } from './redux/OwnersReducer';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const Login = ({ navigation }) => {
    
    const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [showModal, setshowModal] = useState(false);

    const toast = useToast();

    useEffect(() => {
        dispatch(Add_Auth_Screen_Action("Login"))
    },[])
    
    const HandleSignUpWithEmail = async() => {
        if (Email != '' && Password !=="") {
            setshowModal(true);    

            await auth().signInWithEmailAndPassword(Email, Password).then( async res => {
                setshowModal(false);   
                setEmail("");
                setPassword("");
                await firestore().collection("Owners").doc(res.user.uid).get().then(doc => {
                    let tempArray = [];
                    tempArray.push({
                        ...doc.data(),
                    })
                    dispatch(Add_Auth_Landord_action(tempArray));
                }).catch(err => {
                    console.log(err);
                })

            }).catch(error => {
                toast.show(error.code, {
                    type: "danger",
                    placement: "bottom",
                    duration: 3000,
                    offset: 30,
                    animationType: "zoom-in",
                });
                setshowModal(false);    
                
            })
          
        }
        else {
            toast.show("All fields must be filled!", {
                type: "danger",
                placement: "bottom",
                duration: 2900,
                offset: 30,
                animationType: "zoom-in",
            });
        }
    }

    const HandleSignWIthGoogle = async () => {
         // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
        const idToken = await GoogleSignin.signIn();
        setEmail(idToken.user.email)
        // console.log(idToken);

  // Create a Google credential with the token
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//         console.log(googleCredential);

//   // Sign-in the user with the credential
//         auth().signInWithCredential(googleCredential);
        
        

        console.log(auth().currentUser);
    }

  return (
    <View style={styles.container} >
      <View style={{
        width: '100%',
              height: 70, 
        padding:20
        
      }}>
              <Text style={{
                  fontWeight: '900',
                  fontSize:20
    }}>Welcome to</Text>
<Text style={{
                  fontWeight: '900',
                  fontSize:20
              }}> Landlord Calc </Text>
    <Text style={{
                  fontWeight: '900',
                  fontSize:20
    }}> Login </Text>
      </View>
      
          <View style={{ width: '100%' }}>
              <SpinnerModal showModal={showModal} title="Please wait..." />
                
       <TextInput
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20   
        }}
              onChangeText={text => setEmail(text)}
              label="Email"
              value={Email}
              mode="outlined"
          />
           
          <TextInput
              secureTextEntry={true}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop:20   
        }}
              onChangeText={text => setPassword(text)}
              label="Password"
              value={Password}
              mode="outlined"
      />
     
          <TouchableOpacity
              style={{
                  alignSelf: 'center', height: 40, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10,
                      backgroundColor: 'grey',
                  marginTop:20
              }}
              onPress={HandleSignUpWithEmail}
          >
              <Text style={{fontWeight:'800', fontSize:18, color:'white'}}>
                  Login
              </Text>
          </TouchableOpacity>
          <View style={{
                  width: "100%", padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20,
             alignItems:'center'
          }}>
              <View style={{ backgroundColor: 'black', width: '40%', height: 7, }}></View>
                  <Text style={{ fontWeight: '800', fontSize: 18 }}>or</Text>
              <View style={{ backgroundColor: 'black', width: '40%', height: 7, }}></View>
                  
              
          </View>
          {/* signin with google */}
          <View style={{width:'100%'}}>
                  <TouchableOpacity
                      onPress={HandleSignWIthGoogle}
                      style={{
                  width: 50, 
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'grey',
                      alignSelf: 'center',
                  borderRadius:10
                  
              }}>
                  <Icon name ="google" color ="white" size={25} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                      onPress={() => {
                        dispatch(Add_Auth_Screen_Action("Register"))   
                      }}
                      style={{ marginTop: 20, width: '70%', alignSelf: 'center', borderBottomColor: 'blue', borderBottomWidth: 1, }}>
                      <Text style={{color:"blue",textAlign:'center' }}>
                          Dont Have an Account ? signUp here
                      </Text>
                  </TouchableOpacity>
          </View>
  </View>
      
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
    alignItems:'center'
  }
  
})