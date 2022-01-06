import React,{useState} from 'react'
import { StyleSheet, Text, View,Image, TextInput,TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as firebase from "firebase";


       
const Signuppage = ({ navigation: { navigate } }) => {
    const [email,setemail ]= React.useState('');
    const [pass,setpass ]= React.useState('');
    const [conpass,setconpass ]= React.useState('');
    const handleSignUp = () => {
       
        firebase
              .auth()
              .createUserWithEmailAndPassword(email, pass)
              .then(() => alert("Account Created"))
              .catch(error => alert(error));
          };    
    return (
        <View style={styles.container}>
        <View>
<Image
  source={require("../assets/signup1.png")}
  style={styles.mainimage}
/>   
</View> 
<View style={styles.inputcontainer}> 
<TextInput
placeholder='Enter Your Email'
onChangeText={(input)=>{setemail(input)}}
style={styles.inputfield}
/>
<TextInput
placeholder='Enter Password'
onChangeText={(input)=>{setpass(input)}}

style={styles.inputfield}
/>
<TextInput
placeholder='Confirm Password'
onChangeText={(input)=>{setconpass(input)}}

style={styles.inputfield}
/>
    

        </View>
        <View>
        <TouchableWithoutFeedback ><Text style={{color:'blue',paddingTop:20}}>Forgot Password?</Text></TouchableWithoutFeedback>
        </View>
        <View style={styles.buttoncontainer}>
            <TouchableOpacity  onPress={handleSignUp} style={styles.button}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
        </View>
        <View>
           
            <TouchableWithoutFeedback onPress={() => navigate('Login')}>
            <Text style={{color:'blue',paddingTop:20}}>  Already Got account?</Text></TouchableWithoutFeedback>
        </View>
        
        </View>
    )
}

export default Signuppage

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    mainimage:
        { width:240, 
            height: 240,
            justifyContent:'center',
            alignSelf:'center',
            marginBottom:50 }
        ,
        inputcontainer:{
            width:'80%'
        },
        inputfield:{
            backgroundColor:'white',
            paddingVertical:10,
            paddingHorizontal:15,
            borderRadius:10,
            marginTop:15,
           
        },
        buttoncontainer:{
            width:'80%',
            justifyContent:'center',
            alignItems:'center',
            marginTop:40
        },
        button:{
            backgroundColor:'#50C2C9',
            width:'100%',
            padding:20,
            borderRadius:10,
            alignItems:'center',
            

        }
        ,buttonText:
        {
            color:'white',
            marginTop:0,
            fontWeight:'700',
            fontSize:18,
        }
    
    
})
