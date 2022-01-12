import React,{useState} from 'react';
import { LogBox,KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

// Ignore log notification by message

import {Text ,  ImageBackground,
  StatusBar,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import { DataTable,Card,Avatar, Button,  Title, Paragraph  } from "react-native-paper";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
import db from '../db/firebase'

import HomeScreen from './HomeScreen';
import { registerRootComponent } from 'expo';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
LogBox.ignoreAllLogs();



const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({ navigation }) => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={StartHome}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'rgba(255,0,0,0.8)',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
       
       
       <Tab.Screen
        name="Form"
        component={userForm}
        options={{
          tabBarLabel: 'User Form',
          tabBarColor: 'red',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={ViewDetails}
        options={{
          tabBarLabel: 'Alerts',
          tabBarColor: 'red',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Case}
        options={{
          tabBarLabel: 'Case',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
     
    </Tab.Navigator>
);


const Case = ({navigation,route}) =>{
  const [data, setData] = React.useState(route.params.item);
  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Card style = {{padding: 20, width: 300,}}>
      <View style = {{justifyContent: 'center', alignItems:'center'}}>
     
      </View>
      <Avatar.Image size={270} source={require('../assets/checkf.png')} />
        <Card.Title
          title={data.fname}
          subtitle= {data.Emergency}
        />
        <Card.Content>
          <Paragraph><Text style = {{fontWeight: 'bold'}}>First Name:</Text> {data.fname}</Paragraph>
          <Paragraph><Text style = {{fontWeight: 'bold'}}>Last Name:</Text> {data.lname}</Paragraph>
          <Paragraph><Text style = {{fontWeight: 'bold'}}>Emergency Type:</Text> {data.Emergency}</Paragraph>
          <Paragraph><Text style = {{fontWeight: 'bold'}}>Address:</Text> {data.address}</Paragraph>
          <Paragraph><Text style = {{fontWeight: 'bold'}}>CNIC:</Text> {data.cnic}</Paragraph>
          <Paragraph><Text style = {{fontWeight: 'bold'}}>Contact:</Text> {data.contact}</Paragraph>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }} style = {{backgroundColor: 'green', justifyContent: 'center', padding: 10, marginTop: 10, borderRadius: 10}}>
            <Text style= {{color: '#fff', textAlign: 'center'}}>Back</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
}


const ViewDetails = ({navigation}) => {
  const [task1, setTask] = React.useState([]);
  React.useEffect(() => {
    
    db.collection("Alerts").onSnapshot({
      next: (querySnapshot) => {
        const tasks = querySnapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ID: docSnapshot.data().id,
          firstname: docSnapshot.data().first_name,
          lastname: docSnapshot.data().last_name,
          Emergency: docSnapshot.data().emergencyType,
          contact: docSnapshot.data().contact,
          address: docSnapshot.data().address1,
        }));
        setTask(tasks);
      },
      error: (err) => console.log(err),
    });
  }, []);
  return (
    <SafeAreaView style={{backgroundColor:'red'}}>
       <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

{/* Top Image */}
<Image
  source={require('../assets/checkf.png')}
  style={styles.imageTop}
/>
    <View style = {styles.formbox}>
      
      

      <ScrollView>
      {task1.map((task) => ( 
        <TouchableOpacity
        onPress={() => {navigation.jumpTo('Profile', {item: {id: task.id, fname: task.firstname, lname: task.lastname, cnic: task.ID, contact: task.contact, address :task.address, Emergency: task.Emergency}})}}>
      <View style={styles.Notification}>
       
        
        <Text style={{fontSize:20,color:'white'}}><MaterialIcons name="notifications-on" size={24} color="yellow" />   { task.Emergency}</Text>
        
      </View>
      </TouchableOpacity>))

      } 
      </ScrollView>
      
      
    </View>
    </SafeAreaView>
  );
}




{/* Here is the code for the  Form */}
const userForm = ({navigation}) =>{
  const data = [
    {label: 'Medical Emergency', value: 'Medical Emergency'},
    {label: 'Heart Attack', value: 'Heart Attack'},
    {label: 'Accident', value: 'Accident'},
    {label: 'First Aid +', value: 'First Aid +'},
    {label: 'Flood', value: 'Flood'},
   
    {label: 'other', value: 'other'},
];
const [fname,setfname] = React.useState('');
const [lname,setlname] = React.useState('');
const [id,setid] = React.useState('');
const [address1,setaddress1] = React.useState('');

const [contact,setcontact] = React.useState('');
const [emer,setEmer] = React.useState('');
const [dropdown, setDropdown] = useState(null);
const _renderItem = item => {
  return (
    
  <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
       
  </View>
  )
  }
  const reporter = ()=>{
    db.collection('Alerts').add({
      id: id,
     first_name: fname,
     last_name: lname,
    address1:address1,
   contact:contact,
    emergencyType:emer,
     
    }).then(result => navigation.jumpTo('Home'))
    .catch(err => console.log(err))
   }
  
  return(
    <SafeAreaView style={{backgroundColor:'red'}}>
       <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

{/* Top Image */}
<Image
  source={require('../assets/form-top.png')}
  style={styles.imageTop}
/>
<View style = {styles.formbox}>
<Text style = {{color:'white',fontSize:22,alignSelf:'center',fontWeight:'bold',backgroundColor:'red',padding:10,marginTop:10,borderRadius:30}}> Emergency Form</Text>




<TextInput
  placeholder='First Name'
   style={styles.inputfield}
   onChangeText={(fname)=>setfname(fname)}
   >
  </TextInput>
  <TextInput
  placeholder='Last Name'
   style={styles.inputfield}
   onChangeText={(lname)=>setlname(lname)}
   >
  </TextInput>
  <TextInput
  placeholder='ID Card No'
   style={styles.inputfield}
   onChangeText={(id)=>setid(id)}
   >
     </TextInput>
     <TextInput
  placeholder='Address Line '
   style={styles.inputfield}
   onChangeText={(add)=>setaddress1(add)}
   >
  </TextInput>
  <TextInput
  placeholder='Contact No'
   style={styles.inputfield}
   onChangeText={(add2)=>setcontact(add2)}
   >
  </TextInput>
  
  <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    data={data}
                   
                    name="Drop down"
                    
                    labelField="label"
                    valueField="value"
                    label="Dropdown"
                    placeholder="Emergency Type"
                    value={dropdown}
                    onChange={item => {
                    setDropdown(item.value);
                    setEmer(item.value);
                    }}
                    renderItem={item => _renderItem(item)}
                    textError="Error"
                />
                <TouchableOpacity style={styles.madad} onPress={reporter}>
                  <Text style={styles.madadText}> Submit</Text>
                </TouchableOpacity>
  </View>



  
  

    </SafeAreaView>
  )
}

const StartHome = ({ navigation }) => {

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

    {/* Onboarding Image */}
    <Image
      source={require('../assets/image2.jpg')}
      style={styles.imagess}
    />

    {/* Indicator container */}
    <View style={styles.indicatorContainer}>
      <View style={styles.indicator} />
      <View style={styles.indicator} />
      <View style={[styles.indicator, styles.indicatorActive]} />
    </View>

    {/* Title and text container */}
    <View style={{paddingHorizontal: 20, paddingTop: 20}}>
      {/* Title container */}
      <View>
        <Text style={{color:'red',fontSize:37,fontWeight:'bold'}}>MADAD !</Text>
        <Text style={{color:'rgba(0,0,0,0.5)',fontSize:22,paddingLeft:50,fontWeight:'bold'}}>Har dam Hazir. </Text>
       
      </View>
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
      
      <Text style={{color:'rgba(0,0,0,0.5)',fontSize:14,paddingLeft:0,fontWeight:'bold'}}><AntDesign name="rightcircle" size={14} color="black" />  Service Available for all kind of Hazards. </Text>
      <Text style={{color:'rgba(0,0,0,0.5)',fontSize:14,paddingLeft:0,paddingTop:10,fontWeight:'bold'}}><AntDesign name="rightcircle" size={14} color="black" />  Simple form and Help on its way. </Text>
      <Text style={{color:'rgba(0,0,0,0.5)',fontSize:14,paddingLeft:0,paddingTop:10,fontWeight:'bold'}}><AntDesign name="rightcircle" size={14} color="black" />  If you are in trouble Get intouch with us. </Text>
  
      </View>
      {/* Text container */}
      <TouchableOpacity  onPress={()=>navigation.jumpTo('Notifications')}>
    <View style={{marginTop: 30,alignItems:'center',justifyContent:'center',marginLeft:80,borderRadius:80,borderWidth:1,borderColor:'red',backgroundColor:'red',height:140,width:140}}>
      
        <Text style={{color:'white',fontWeight:'bold',fontSize:22}}>
         Report Now 
        </Text>
      </View>
      </TouchableOpacity>
    </View>

    {/* Button container */}
    
  </SafeAreaView>
  )
}
  
const styles = StyleSheet.create({
  _start:{
    backgroundColor:'#1D256E',
    width:'100%',
    height:'100%',
    
   
  },formbox:{
    width:357,
    height:'100%',
    backgroundColor:'rgba(255,255,255,1)',
    
    
    borderTopLeftRadius:50,
    borderWidth:2,
    borderColor:'rgba(255,255,255,1)',
    borderTopRightRadius:50,
    marginTop:10,
    shadowColor: "#0000",
    shadowOffset: {
         width: 1,
        height: 4,
         },
    shadowOpacity: 1,
    shadowRadius: 4.84,

     elevation: 5,
  },
  imagess: {
    height: 320,
    
    width: 400,
    borderBottomLeftRadius: 120,
   
  },
  imageTop: {
    height: 100,
    marginTop:40,
    width: 150,
   alignSelf:'center'
   
  },

  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: '#000',
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: '#A9A9A9'},
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  box:{
    backgroundColor: '#fff',
     width: '95%',
     height:'100%',
     borderRadius: 30,
     alignItems: 'center',
     margin: 8,
     padding: 10,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'5%',
    
   
     shadowColor: "#0000",
     shadowOffset: {
          width: 1,
         height: 4,
          },
     shadowOpacity: 1,
     shadowRadius: 4.84,

      elevation: 5,
},bigone: {
  flex: 1,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor: '#262927',
  width: '100%',
  height:'20%',
  shadowColor: "#ffff",
  shadowOffset: {
       width: 1,
      height: 4,
       },
  shadowOpacity: 1,
  shadowRadius: 10.84,

   elevation: 5,
  padding: 8,
},

imagelogo:{
          width:330, 
            height: 200,
            justifyContent:'center',
            alignSelf:'center',
            marginBottom:410,
            borderRadius:10,
            borderColor:'black',
            borderWidth:1,
},dropdown: {
  backgroundColor: 'white',
  borderColor: 'rgba(0,0,0,0.5)',
  borderWidth: 0.5,
  borderRadius:20,
 
  padding:5,
  marginBottom:20,
  color:'black',

  width:'90%',
  marginTop: 20,
  marginLeft:10,
},
icon: {
  marginRight: 5,
  width: 18,
  height: 18,
},
item: {
  

  marginTop:10,
  padding:10,
  backgroundColor:'red',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
textItem: {
  flex: 1,
  fontSize: 13,
  
  color:'white',
  fontWeight:'bold'
},
shadow: {
  shadowColor: 'red',
  shadowOffset: {
  width: 0,
  height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
},
inputfield:{
  
  marginBottom:10,
  
  backgroundColor:'rgba(255,255,255,0.8)',
  width:'90%',
  height:50,
  marginTop:10,
  
  textAlign:'left',
  marginLeft:10,
  borderRadius:20,
  borderColor:'rgba(0,0,0,0.5)',
  borderWidth:0.5,
  color:'black',
  padding:10,
 
},
madad:{
  textAlign:'center',
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  backgroundColor:'red',
  height:60,
  width:200,
  borderRadius:100,
 
},
madadText:{
fontSize:24,

color:'white'
},
Notification:{



color:'white',
backgroundColor:'red',
borderColor:'black',

marginTop:15,
marginLeft:30,
width:'85%',
padding:10,
borderRadius:30,
},
});

export  default MainTabScreen;